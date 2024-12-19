pipeline {
    agent {
        label 'docker'
    }

    environment {
        AWS_SHARED_CREDENTIALS_FILE = "${env.WORKSPACE}/awsconfig"
        AWS_DEFAULT_REGION  = "us-west-2"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20', daysToKeepStr: '90'))
        disableConcurrentBuilds()
    }

    parameters {
        string (name: 'version', description: 'Artifact Version')
        choice (name: 'environment', choices: ["dev", "int", "uat", "prod"], description: 'Deployment Environment')
        choice (name: 'region', choices: ["us-west-2"], description: 'AWS Region')
        booleanParam (name: 'skip_terraform', defaultValue: false, description: 'Skip running of Terraform', )
    }

    stages {
        stage('Setup Workspace') {
            steps {
                cleanWs()
                script {
                   // make sure params are populated in jenkins (first run always fails)
                    if(params.environment == null || params.environment.length() == 0) {
                        currentBuild.result = 'ABORTED'
                        error("environment param is empty")
                    }
                    // insure PROD and UAT deployment only works from master/hotfix branch
                    if(params.environment == 'uat' || params.environment == 'prod') {
                        if(env.GIT_BRANCH != 'master' && env.GIT_BRANCH != 'hotfix') {
                            currentBuild.result = 'ABORTED'
                            error("Deployment to uat or prod can only be run from master branch")
                        }
                    }
                }
            }
        }

        stage("Checkout") {
            steps {
                dir("application") {
                    git(url: env.GIT_URL, branch: env.GIT_BRANCH, credentialsId: "git-clarivate-io-tk")
                    script {
                        if(params.environment == "prod") {
                              deploy_date = sh(script: "date", returnStdout: true)
                              git_repo_url = sh(script: "echo ${env.GIT_URL}|cut -c 9-", returnStdout: true)
                              sh("git tag -a v${params.version} -m '${deploy_date}' || true ")
                              withCredentials([usernamePassword(credentialsId: 'git-clarivate-io-tk', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                              sh("git push --tags https://${GIT_USERNAME}:${GIT_PASSWORD}@${git_repo_url}")
                            }
                          }
                    }
                }
            }
        }

        // read all properties from top level setting file
        stage("Setup Project Properties") {
            steps {
                script {
                    project_setting_file = "${WORKSPACE}/application/project_setting.yml"
                    def local_props = get_local_props(readYaml(file: project_setting_file), 'dev')
                    buildtools_docker_command = "docker run -e AWS_DEFAULT_REGION=${region} -e AWS_SHARED_CREDENTIALS_FILE --rm --user \$(id -u):\$(id -g) -v ${env.WORKSPACE}:${env.WORKSPACE} -w \$(pwd) \${DOCKER_EXTRA_ARGS} ${local_props[1]}"
                    build_settings_file ="${WORKSPACE}/application/build_setting.yml"
                    terraform_templates = "${WORKSPACE}/application/deploy/terraform/continuous/template-*.tfvars"
                    sh("${buildtools_docker_command} create_build_setting.py -f ${project_setting_file} -e ${environment} -r ${region} -b ${GIT_BRANCH} -t '${terraform_templates}'")
                    sh("cat ${build_settings_file}")
                    def props = readYaml file: build_settings_file
                    app_name = props.config.app_name
                    app_family = props.config.app_family
                    account_name = props.config.account_name
                    jenkins_status_email = props.config.jenkins_status_email
                    dns_suffix = props.config.env_dns
                    buildtools_image = props.config.buildtools_image
                    println("""
                        app_name = ${app_name}
                        app_family = ${app_family}
                        version = ${version}
                        deploy_target = ${environment}
                        account_name = ${account_name}
                    """)
                  
                    tailor_taskInboxUrl = props.config.taskInboxUrl
                    tailor_hidaBaseUrl = props.config.hidaBaseUrl
                    tailor_ontologyUrl = props.config.ontologyUrl
                    tailor_taskInboxApp = props.config.taskInboxApp
                  
		    // extra values from setting
                    terraform_version = props.config.terraform_version

                    // dora metrics settings
                    dora_api_url = props.config.dora_api
                    product = props.config.product
                }
            }
        }

        // set up aws evironment using local cred file
        stage("Assume AWS Role") {
            steps {
                script {
                    deploy_role_cred_id = account_name + '-deploy-role'
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: deploy_role_cred_id, usernameVariable: 'JUNK', passwordVariable: 'AWS_ASSUME_ROLE']]) {
                        profile_name = 'build_deploy'
                        sh("${buildtools_docker_command} assume_role.py --role ${AWS_ASSUME_ROLE} --session ${profile_name} --file ${AWS_SHARED_CREDENTIALS_FILE}")
                        sh("${buildtools_docker_command} aws --profile ${profile_name} sts get-caller-identity")
                    }
                }
            }
        }

        // download
        stage("Download Distribution") {
            steps {
                script {
                    def artifactory_server = Artifactory.server('Artifactory')
                    def artifact_spec = """
                    {
                        "files" : [{
                            "pattern" : "cc-release-local/${app_family}/${app_name}/${app_name}-${params.version}.zip",
                            "target"  :  "application/download/distribution.zip"
                        }]
                    }
                    """
                    def artifactinfo = artifactory_server.download(artifact_spec)
                }
            }
        }

        stage("Tailor Distribution") {
            steps {
                script {
                    println("Tailoring distribution")
                    dir("application") {
                        cloudfront_distribution_path = "distribution"
                        sh("mkdir ${cloudfront_distribution_path}")
                        sh("ls -l && find . | fgrep .zip  | xargs ls -ld || true")
                        sh("echo ${params.version} > ${cloudfront_distribution_path}/version.html")
                        sh("unzip -q download/${app_family}/${app_name}/distribution.zip -d ${cloudfront_distribution_path}")
                        lb_host_name = "${app_family}-common.${dns_suffix}"
                        sh("sed -i -e 's/%%LB_HOST_NAME%%/${lb_host_name}/g' ${cloudfront_distribution_path}/*.js")
                      
                      
                        sh("sed -i -e 's|%%taskInboxUrl%%|${tailor_taskInboxUrl}|g' ${cloudfront_distribution_path}/*.js")
                        sh("sed -i -e 's|%%hidaBaseUrl%%|${tailor_hidaBaseUrl}|g' ${cloudfront_distribution_path}/*.js")
                        sh("sed -i -e 's|%%ontologyUrl%%|${tailor_ontologyUrl}|g' ${cloudfront_distribution_path}/*.js")
                        sh("sed -i -e 's|%%taskInboxApp%%|${tailor_taskInboxApp}|g' ${cloudfront_distribution_path}/*.js")
                    }
                }
            }
        }

        // publish
        stage("Copy Distribution to Target") {
            steps {
                script {
                    // upload extracted distribution to s3
                    dir("application") {
                        bucket_name = account_name + "-cloudfront-ui"
                        s3_cloudfront_path = "/cloudfront/" + app_family + "/" + app_name + "/" + params.environment
                        s3_cloudfront_uri = "s3://" + bucket_name + s3_cloudfront_path
                        sh("${buildtools_docker_command} aws --profile ${profile_name} s3 cp --quiet --recursive ${cloudfront_distribution_path} ${s3_cloudfront_uri}")
                    }
                }
            }
        }

        // deploy artifacts and create/update aws resources
        stage("Deploy Terraform") {
            when { expression { params.skip_terraform == false } }
            environment {
                DOCKER_EXTRA_ARGS="-e GIT_PASSWORD -e GIT_USERNAME -e AWS_PROFILE=${profile_name}"
            }
            steps {
                script {
                    dir("application/deploy/terraform/continuous") {
                        withCredentials([usernamePassword(credentialsId: 'git-clarivate-io-tk', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                            sh("${buildtools_docker_command} terraform.sh -v ${terraform_version} init -backend-config='profile=${profile_name}' -backend-config='shared_credentials_file=${AWS_SHARED_CREDENTIALS_FILE}' -backend-config=backend.tfvars -reconfigure")
                            sh("${buildtools_docker_command} terraform.sh -v ${terraform_version} plan -var app_version=${version} -var cloudfront_bucket=${bucket_name} -var cloudfront_path=${s3_cloudfront_path} -var aws_profile=${profile_name} -var aws_creds=${AWS_SHARED_CREDENTIALS_FILE} -var git_repo=${GIT_URL} -var git_revision=${GIT_COMMIT} -out tfplan")
                            sh("${buildtools_docker_command} terraform.sh -v ${terraform_version} apply tfplan")
                        }
                    }
                }
            }
        }

        stage("Clear Cloudfront Cache") {
            environment {
                DOCKER_EXTRA_ARGS="-e AWS_PROFILE=${profile_name}"
            }
            steps {
                script {
                    dir("application/deploy/terraform/continuous") {
                        dist_id = sh(script: "${buildtools_docker_command} terraform.sh -v ${terraform_version} output cloudfront_id", returnStdout: true).trim()
                        sh("${buildtools_docker_command} aws --profile ${profile_name} cloudfront create-invalidation --distribution-id ${dist_id} --paths '/index.html' '/assets/*.json'")
                    }
                }
            }
        }
    }

    post {
        always {
            addShortText(params.version)
            addShortText(params.environment)
            script {
                try {
                    wrap([$class: 'BuildUser']) {
                        def body = [
                        'type':         'application',
                        'source':       'jenkins',
                        'id':           currentBuild.absoluteUrl,
                        'timestamp':    currentBuild.startTimeInMillis,
                        'status':       currentBuild.currentResult == 'SUCCESS' ? 'SUCCEEDED' : 'TERMINAL',
                        'sbu':          'Singularity (A&G)',
                        'bu':           'Academia & Government',
                        'app_name':     app_name,
                        'app_family':   app_family,
                        'product':      product,
                        'user':         env.BUILD_USER_ID,
                        'scm': [
                            'branch':     env.GIT_BRANCH,
                            'remote_url': env.GIT_URL,
                            'sha1':       env.GIT_COMMIT,
                        ],
                        ]
                        httpRequest(
                            consoleLogResponseBody: true,
                            contentType: 'APPLICATION_JSON',
                            httpMode: 'POST',
                            requestBody: writeJSON(returnText: true, json: body),
                            url: dora_api_url,
                            validResponseCodes: '200,201'
                        )
                        sh (" echo 'dora message sent: ${body}' ")
                    }
                } 
                catch (Exception e) {
                    sh (" echo ${e}")
                }
            }
            cleanWs()
        }
        failure {
            emailext (
                to: jenkins_status_email,
                subject: "FAILED: Jenkings Job ${app_family} ${app_name} ${environment} [${env.BUILD_NUMBER}]",
                body: """<p>FAILED:</p><p>Jenkings Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]</p>
                        <p>Src: ${env.GIT_URL} [${env.GIT_COMMIT}]</p>
                    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
}

@NonCPS
def get_local_props(yaml, environment) {
    account_name_arg = ''
    buildtools_image = 'cc-docker.repo.clarivate.io/singularity/shared-buildtools:latest'
    if(yaml.config.project."${environment}") {
        if(yaml.config.project."${environment}".account_name) {
            account_name_arg = '-a ' + yaml.config.project."${environment}".account_name
        }
    }
    if(yaml.config.project.buildtools_image) {
        buildtools_image = yaml.config.project.buildtools_image
    }
    return [account_name_arg, buildtools_image]
}
