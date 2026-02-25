# ------------------------------------------------------------------------------
# Outputs -- Values needed for Amplify configuration
# Run: terraform output -json
# ------------------------------------------------------------------------------

output "dynamodb_table_name" {
  description = "DynamoDB table name (add as DYNAMODB_USERS_TABLE in Amplify)"
  value       = module.dynamodb.table_name
}

output "dynamodb_table_arn" {
  description = "DynamoDB table ARN"
  value       = module.dynamodb.table_arn
}

output "amplify_ssr_role_arn" {
  description = "IAM role ARN (attach to Amplify app as service role)"
  value       = module.iam.amplify_ssr_role_arn
}

output "amplify_ssr_role_name" {
  description = "IAM role name"
  value       = module.iam.amplify_ssr_role_name
}

output "ses_from_email" {
  description = "Verified SES sender email"
  value       = var.ses_from_email
}

# ── Phase 4: Lambda + API Gateway ────────────────────────────────────────────

output "api_endpoint" {
  description = "API Gateway base URL (set as NEXT_PUBLIC_API_URL in Amplify)"
  value       = module.api_gateway.api_endpoint
}

output "lambda_function_name" {
  description = "Lambda function name"
  value       = module.lambda.function_name
}
