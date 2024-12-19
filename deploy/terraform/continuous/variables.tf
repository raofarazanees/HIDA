variable "vpc_id"                     { }
variable "account_id"                 { }
variable "account_name"               { }
variable "product"                    { }
variable "private_subnets" { }
variable "public_subnets" { }
variable "route53_zone_name"          { }
variable "acm_certificate_arn"        { }
variable "app_name"                   { }
variable "app_family"                 { }
variable "app_version"                { }
variable "cloudfront_bucket"          { }
variable "cloudfront_path"            { }
variable "region"           { }
variable "git_repo"         { default = "https://norepo" }
variable "git_revision"     { default = "000000" }
variable "aws_profile"      { }
variable "aws_creds"        { default = "~/.aws/credentials" }
variable "env_name"         { }
variable "tags" { type="map" }
locals {
  common_tags = {
    Name                  = "${var.app_family}-${var.app_name}-${var.env_name}"
    "tr:appName"          = "${var.app_family}-${var.app_name}"
    "tr:appFamily"        = "${var.app_family}"
    "tr:environment-type" = "${var.env_name}"
    git_repo              = "${var.git_repo}"
    git_revision          = "${var.git_revision}"
    singularity           = "true"
    version               = "${var.app_version}"
  }
}
