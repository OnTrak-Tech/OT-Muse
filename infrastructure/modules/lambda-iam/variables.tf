variable "role_name" {
  description = "Name for the Lambda execution IAM role"
  type        = string
  default     = "ot-muse-lambda-backend"
}

variable "dynamodb_table_arn" {
  description = "ARN of the DynamoDB table"
  type        = string
}

variable "s3_bucket_arn" {
  description = "ARN of the S3 assets bucket"
  type        = string
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
