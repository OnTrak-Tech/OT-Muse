output "amplify_ssr_role_arn" {
  description = "ARN of the IAM role for Amplify SSR (attach to Amplify app)"
  value       = aws_iam_role.amplify_ssr.arn
}

output "amplify_ssr_role_name" {
  description = "Name of the IAM role for Amplify SSR"
  value       = aws_iam_role.amplify_ssr.name
}
