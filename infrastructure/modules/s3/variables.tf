variable "bucket_name" {
  description = "Name of the S3 bucket for generated assets"
  type        = string
  default     = "ot-muse-assets"
}

variable "allowed_origins" {
  description = "Allowed CORS origins for frontend access"
  type        = list(string)
  default     = ["https://main.d23iuljt6mvkva.amplifyapp.com", "http://localhost:3000"]
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
