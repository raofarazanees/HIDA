bucket         = "%%tf_state_bucket%%"
key            = "devsng/%%app_family%%/%%app_name%%/deploy/terraform/continuous/%%environment%%.tfstate"
region         = "%%tf_region%%"
dynamodb_table = "%%tf_state_table%%"
