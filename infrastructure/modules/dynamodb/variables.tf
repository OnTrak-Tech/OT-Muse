variable "table_name" {
  description = "Name of the DynamoDB table for Auth.js"
  type        = string
  default     = "ot-muse-users"
}

variable "tags" {
  description = "Tags to apply to the DynamoDB table"
  type        = map(string)
  default     = {}
}
