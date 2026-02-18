variable "role_name" {
  description = "Name of the IAM role for Amplify SSR"
  type        = string
  default     = "ot-muse-amplify-ssr"
}

variable "dynamodb_table_arn" {
  description = "ARN of the DynamoDB table to grant access to"
  type        = string
}

variable "ses_from_email" {
  description = "The verified SES sender email address"
  type        = string
}

variable "tags" {
  description = "Tags to apply to IAM resources"
  type        = map(string)
  default     = {}
}
