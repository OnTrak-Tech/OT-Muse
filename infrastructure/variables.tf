variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table for Auth.js"
  type        = string
  default     = "ot-muse-users"
}

variable "ses_from_email" {
  description = "Verified email address for sending transactional emails"
  type        = string
}
