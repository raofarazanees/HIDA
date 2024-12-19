provider "aws" {
  region                    = var.region
  profile                   = var.aws_profile
  shared_credentials_file   = var.aws_creds
  
  default_tags {
    tags = {
      Product               = var.product
      Component             = "${var.app_family}-${var.app_name}"
      Environment           = var.env_name
      "tr:appFamily"        = var.app_family
      "tr:appName"          = "${var.app_family}-${var.app_name}"
      "tr:environment-type" = var.env_name
      git_repo              = var.git_repo
      git_revision          = var.git_revision
      version               = "${var.app_version}"
    }
  }
}
