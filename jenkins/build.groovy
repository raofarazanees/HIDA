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
        timestamps()
    }
    triggers {
        pollSCM('')     // allows build to be triggered by BitBucket Webhook
    }
    parameters {
        booleanParam (name: 'build_only', defaultValue: false, description: '', )
        string (name: 'region', defaultValue: 'us-west-2', description: 'AWS Region')
    }

    stages {
        stage('Setup Workspace') {
            steps {
                cleanWs()
            }
        }

        stage("Checkout") {
            steps {
                dir("application") {
                    git(url: env.GIT_URL, branch: env.GIT_BRANCH, credentialsId: "git-clarivate-io-tk")
                    script {
                        git_rev_count = sh(script: "git rev-list --all --count", returnStdout: true).trim()
                    }
                }
                dir("buildtools") {
                    git(url: 'https://git.clarivate.io/scm/ccdev/cc-devops-buildtools.git', branch: "master", credentialsId: "git-clarivate-io-tk")
                }
            }
        }

        // read all properties from top level setting file
        stage("Setup Project Properties") {
            steps {
                script {
                    project_setting_file = "${WORKSPACE}/application/project_setting.yml"
                    build_settings_file ="${WORKSPACE}/application/build_setting.yml"
                    sh("${env.WORKSPACE}/buildtools/tools/create_build_setting.py -f ${project_setting_file} -e dev -r ${AWS_DEFAULT_REGION} -b ${GIT_BRANCH}")
                    sh("cat ${build_settings_file}")
                    def props = readYaml file: build_settings_file
                    app_name = props.config.app_name
                    app_family = props.config.app_family
                    account_name = props.config.account_name
                    angular_dist_path = props.config.angular_dist_path
                    jenkins_status_email = props.config.jenkins_status_email
                    region = props.config.region
                    deploy_target = props.config.deploy_target
                    // use git rev count to get full version number
                    version = props.config.version.toString()
                    if(env.GIT_BRANCH == "develop") {
                         version = '0.0'
                     } else if (env.GIT_BRANCH == "feature/*") {
                         version = '0.1'
                     }
                    if(env.GIT_BRANCH == "hotfix") {
                      full_version = version + "." + git_rev_count + "-hotfix"
                    } else {
                      full_version = version + "." + git_rev_count
                    }

                    println("""
                        app_name = ${app_name}
                        app_family = ${app_family}
                        version = ${full_version}
                        deploy_target = ${deploy_target}
                        account_name = ${account_name}
                    """)

                    // veracode settingss
                    veracode_id = props.config.tools_veracode_id
                    veracode_key = props.config.tools_veracode_key
                }
            }
        }

        stage("Veracode") {
            when { expression { env.GIT_BRANCH == 'master' } }
            steps {
                dir("application") {
                  script {
                    sh("zip -r application.zip *")
                  }
                  veracode applicationName: 'sing' + '-' + app_family + '-' + app_name, createProfile: true, criticality: 'VeryHigh', fileNamePattern: '', replacementPattern: '', sandboxName: '', scanExcludesPattern: '', scanIncludesPattern: '', scanName: '', teams: 'Singularity', uploadExcludesPattern: '', uploadIncludesPattern: 'application.zip', vid: veracode_id, vkey: veracode_key
                }
            }
        }

        // use dockerhub container "docker-proxy.repo.clarivate.io/node:14" to setup 'ng' and run angular distribution build
        // then pull dist out of container and zip it up as a single artifact
        stage("Build Angular Distribution") {
            steps {
                script {
                    build_container_name = sh(script: "echo ${env.WORKSPACE} | cksum | cut -d ' ' -f 1", returnStdout: true).trim()
                    // clean up if build container already exists
                    sh("docker kill ${build_container_name} >/dev/null || true")
                    sh("docker rm ${build_container_name} >/dev/null || true")
                    // create new build container and add source
                    sh("docker create --name ${build_container_name} --entrypoint /bin/bash -it docker-proxy.repo.clarivate.io/node:14")
                    sh("docker start ${build_container_name}")
                    sh("docker exec ${build_container_name} mkdir -p /build")
                    sh("docker cp application ${build_container_name}:/build/src")
                    // install chrome on docker for karma testing
                    sh("docker exec ${build_container_name} sh -c 'wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'")
                    sh("docker exec ${build_container_name} sh -c 'echo deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main >> /etc/apt/sources.list.d/google.list'")
                    sh("docker exec ${build_container_name} sh -c 'apt-get update'")
                    sh("docker exec ${build_container_name} apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget google-chrome-stable")
                    // run build from inside container and pull distribution files out
                    sh("docker exec ${build_container_name} sh -c 'cd /build/src && yarn install --network-timeout=600000'")
                    // sh("docker cp ${build_container_name}:/build/src/reports application")
                    sh("docker exec ${build_container_name} sh -c 'cd /build/src && yarn build'")
                    sh("docker exec ${build_container_name} sh -c 'cd /build/src && ls -l'")
                    sh("docker cp ${build_container_name}:/build/src/${angular_dist_path} distribution")
                    // clean up created build container so we don't fill up jenkins with bunch of stray containers
                    sh("docker stop ${build_container_name}")
                    sh("docker rm ${build_container_name}")
                    // zip up distribution
                    sh("cd distribution/ && zip -q -r ${WORKSPACE}/${app_family}-${app_name}-${full_version}.zip *")
                }
            }
            
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Sonar-AWS') {
                  dir("application") {
                    sh("ls -l")
                    // ======== PUT THESE LINES BACK AS SOON AS TESTING IS IMPLEMENTED ========
                    // // fix paths in lcov report so it can be properly used by sonar
                    // sh("sed -i 's#/build/src#.#g' reports/test-coverage/instanbul-lcov.info")
                    // sh("docker run --rm --user \$(id -u):\$(id -g) -v ${env.WORKSPACE}/application:/usr/src rnesbit/sonar-scanner-with-typescript -X \
                    //     -Dsonar.host.url=${SONAR_HOST_URL} \
                    //     -Dsonar.login=${SONAR_AUTH_TOKEN} \
                    //     -Dsonar.projectKey=cc:${app_family}-${app_name} \
                    //     -Dsonar.projectName=${app_family}-${app_name} \
                    //     -Dsonar.projectBaseDir=/usr/src \
                    //     -Dsonar.sources=/usr/src/src \
                    //     -Dsonar.tests=/usr/src/src \
                    //     -Dsonar.test.inclusions=**/*.spec.ts \
                    //     -Dsonar.typescript.node=/usr/bin/node \
                    //     -Dsonar.typescript.lcov.reportPaths=reports/test-coverage/instanbul-lcov.info \
                    //   ")
                   }
                }
            }
        }

        stage ("Publish") {
            steps {
                script {
                    def artifactory_server = Artifactory.server('Artifactory')
                    def artifact_spec = """
                    {
                        "files" : [{
                            "pattern" : "${WORKSPACE}/${app_family}-${app_name}-(*).zip",
                            "target" : "cc-release-local/${app_family}/${app_name}/${app_name}-{1}.zip",
                            "props" : "git_url=${GIT_URL};git_branch=${GIT_BRANCH};git_commit=${GIT_COMMIT}"
                        }]
                    }
                    """
                    def artifactinfo = artifactory_server.upload(artifact_spec)
                    // artifactinfo.retention maxBuilds: 20, deleteBuildArtifacts: true
                    artifactinfo.name = "${app_family}-${app_name}"
                    artifactory_server.publishBuildInfo(artifactinfo)
                }
            }
        }

        // run deploy build
        stage("Deploy") {
            when {
              expression { env.GIT_BRANCH == 'master' || env.GIT_BRANCH == 'develop' }
            }
            steps {
                script {
                    if(params.build_only == false) {
                        build job: '../deploy/' + env.JOB_BASE_NAME, parameters: [
                            string(name: 'version', value: full_version),
                            string(name: 'environment', value: deploy_target),
                            string(name: 'region', value: region),
                        ]
                    }
                }
            }
        }

    }

    post {
        always {
            addShortText(full_version)
            cleanWs()
        }
        // success {
        //     emailext (
        //         to: jenkins_status_email,
        //         subject: "SUCCESSFUL: Jenkings Job ${app_family} ${app_name} [${env.BUILD_NUMBER}]",
        //         body: """<p>SUCCESSFUL:</p><p>Jenkings Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]</p>
        //                 <p>Src: ${env.GIT_URL} [${env.GIT_COMMIT}]</p>
        //             <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
        //         recipientProviders: [[$class: 'DevelopersRecipientProvider']]
        //     )
        // }

        failure {
            emailext (
                to: jenkins_status_email,
                subject: "FAILED: Jenkings Job ${app_family} ${app_name} [${env.BUILD_NUMBER}]",
                body: """<p>FAILED:</p><p>Jenkings Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]</p>
                        <p>Src: ${env.GIT_URL} [${env.GIT_COMMIT}]</p>
                    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                    recipientProviders: [[$class: 'FailingTestSuspectsRecipientProvider']]
                // see reciepients at
                // https://github.com/jenkinsci/email-ext-plugin/tree/master/src/main/java/hudson/plugins/emailext/plugins/recipients
                // https://jenkins.io/doc/pipeline/steps/email-ext/
            )
        }
    }
}
