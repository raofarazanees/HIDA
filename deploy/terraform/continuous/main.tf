
#----------------------------------------
# CloudFront Distribution
#----------------------------------------
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "${var.cloudfront_bucket}.s3.amazonaws.com"
    origin_id   = "${var.cloudfront_bucket}"
    origin_path = "${var.cloudfront_path}"
    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = "${var.account_name}-logging.s3.us-west-2.amazonaws.com"
    prefix          = "${var.app_family}/${var.env_name}/ui/cloudfront/"
  }

  aliases = ["${var.app_family}.${var.route53_zone_name}"]

  custom_error_response   {
    error_code = "404"
    error_caching_min_ttl = "300"
    response_code = "200"
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code = "403"
    error_caching_min_ttl = "300"
    response_code = "200"
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.cloudfront_bucket}"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  price_class = "PriceClass_200"

  viewer_certificate {
    cloudfront_default_certificate  = true
    acm_certificate_arn             = "${var.acm_certificate_arn}"
    ssl_support_method              = "sni-only"
  }

  # tags are not yet standard for this resource type
  tags = "${merge(
    var.tags,
    local.common_tags,
    tomap({"Name" = "${var.app_family}-${var.app_name}-${var.env_name}"}),
    tomap({"tr:role" = "cloudfront"}),
    tomap({"Layer" = "cloudfront"}),
  )}"

}


#----------------------------------------
# S3 Origin Access Identity
#----------------------------------------
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "Origin Access Identity for ${var.cloudfront_bucket}"
}


#----------------------------------------
# route53
#----------------------------------------
resource "aws_route53_record" "cloudfront_alias" {
  zone_id = "${data.aws_route53_zone.public_hosted_zone.zone_id}"
  name    = "${var.app_family}.${data.aws_route53_zone.public_hosted_zone.name}"
  type    = "A"
  alias {
    name                   = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.s3_distribution.hosted_zone_id}"
    evaluate_target_health = true
  }
}


#----------------------------------------
# terraform backend stub - DO NOT MODIFY
#----------------------------------------
terraform {
  required_version = "0.12.6"

  backend "s3" {
    bucket         = "unset"
    key            = "unset/unset.tfstate"
    region         = "unset"
    dynamodb_table = "unset"
  }
}
