# ------------------------------------------------------------------------------
# Lambda Function — OT-Muse Backend API
# Deploys the Express/serverless-http app as a single Lambda function
# ------------------------------------------------------------------------------

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${var.function_name}"
  retention_in_days = 14

  tags = var.tags
}

resource "aws_lambda_function" "api" {
  function_name = var.function_name
  role          = var.role_arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  timeout       = 30
  memory_size   = 256

  filename         = var.zip_path
  source_code_hash = filebase64sha256(var.zip_path)

  environment {
    variables = {
      NODE_ENV             = "production"
      DYNAMODB_USERS_TABLE = var.dynamodb_table_name
      S3_ASSETS_BUCKET     = var.s3_bucket_name
      FRONTEND_URL         = var.frontend_url
    }
  }

  depends_on = [aws_cloudwatch_log_group.lambda]

  tags = var.tags
}
