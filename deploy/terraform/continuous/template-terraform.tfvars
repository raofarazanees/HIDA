env_name            = "%%environment%%"
app_name            = "%%app_name%%"
app_family          = "%%app_family%%"
product             = "%%product%%"
region              = "%%region%%"
jenkins_cidr        = "%%tools_jenkins_cidr%%"
vpc_id              = "%%vpc%%"
public_subnets      = "%%public_subnets%%"
private_subnets     = "%%private_subnets%%"
account_id          = "%%account_number%%"
account_name        = "%%account_name%%"
route53_zone_name   = "%%env_dns%%"
acm_certificate_arn = "%%cloudfront_acm%%"

tags                = {
   "ca:created-by" = "jenkins"
}
