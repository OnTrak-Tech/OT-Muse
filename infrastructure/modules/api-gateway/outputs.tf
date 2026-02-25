output "api_endpoint" {
  description = "Base URL of the API Gateway (use this as NEXT_PUBLIC_API_URL)"
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "api_id" {
  description = "ID of the API Gateway"
  value       = aws_apigatewayv2_api.api.id
}
