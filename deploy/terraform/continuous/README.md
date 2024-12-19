For AWS Artifact that are intended to be a part of the CI/CD cycle

# setup
* Create env vars
  ```bash
  tf_env=dev
  build_tools_path=/mnt/d/devops/devcc/cc-devops-buildtools/tools/
  tf_dir=$PWD
  ${build_tools_path}/create_build_setting.py -f ../../../project_setting.yml -e ${tf_env} -r us-west-2 -b develop -t ${tf_dir}/template-terraform.tfvars,${tf_dir}/template-backend.tfvars
  ```

# run
* Initialize
  ```bash
  terraform init -backend-config=profile=sing_dev_clarivate_admin -backend-config=backend.tfvars -reconfigure
  ```
* Create a Plan
  ```bash
  terraform plan -var app_version=0.0.0 -var aws_profile=sing_dev_clarivate_admin -out tfplan
  ```
* Run the plan
  ```bash
  terraform apply tfplan
  ```
* (Optional) Destroy all resources
  ```bash
  terraform destroy -var app_version=latest -var aws_profile=ca_cc_dev_clarivate_admin -var-file=dev.tfvars
  ```
