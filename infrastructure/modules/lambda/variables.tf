variable "function_name" {
  description = "Name of the Lambda function"
  type        = string
  default     = "ot-muse-api"
}

variable "role_arn" {
  description = "ARN of the IAM execution role for the Lambda"
  type        = string
}

variable "zip_path" {
  description = "Path to the deployment zip file"
  type        = string
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB users table"
  type        = string
}

variable "s3_bucket_name" {
  description = "Name of the S3 assets bucket"
  type        = string
}

variable "frontend_url" {
  description = "Frontend URL for CORS configuration"
  type        = string
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
