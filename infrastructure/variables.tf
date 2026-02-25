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

variable "s3_assets_bucket_name" {
  description = "Name of the S3 bucket for generated assets"
  type        = string
  default     = "ot-muse-assets"
}

variable "s3_allowed_origins" {
  description = "Allowed CORS origins for frontend access to S3"
  type        = list(string)
  default     = ["https://main.d23iuljt6mvkva.amplifyapp.com", "http://localhost:3000"]
}

variable "frontend_url" {
  description = "Frontend URL for Lambda CORS configuration"
  type        = string
  default     = "https://main.d23iuljt6mvkva.amplifyapp.com"
}

variable "lambda_zip_path" {
  description = "Path to the backend deployment zip file"
  type        = string
  default     = "../backend/deploy.zip"
}
