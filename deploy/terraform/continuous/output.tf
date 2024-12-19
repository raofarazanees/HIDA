output "cloudfront_dns" {
  value = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
}

output "cloudfront_route53" {
  value = "${aws_route53_record.cloudfront_alias.fqdn}"
}

output "origin_access_identity" {
  value = "${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"
}

output "cloudfront_id" {
  value = "${aws_cloudfront_distribution.s3_distribution.id}"
}
