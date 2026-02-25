# ------------------------------------------------------------------------------
# IAM Role for OT-Muse Lambda Backend
# Least-privilege: DynamoDB (worlds table), S3 (assets bucket), Bedrock (Nova)
# ------------------------------------------------------------------------------

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

resource "aws_iam_role" "lambda_backend" {
  name = var.role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowLambdaAssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = var.tags
}

# ── DynamoDB: Scoped to the users table + indexes ────────────────────────────
resource "aws_iam_policy" "dynamodb_access" {
  name        = "${var.role_name}-dynamodb"
  description = "Scoped DynamoDB access for OT-Muse Lambda backend"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "DynamoDBReadWrite"
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem"
        ]
        Resource = [
          var.dynamodb_table_arn,
          "${var.dynamodb_table_arn}/index/*"
        ]
      }
    ]
  })

  tags = var.tags
}

# ── S3: Read/write only to the assets bucket ─────────────────────────────────
resource "aws_iam_policy" "s3_access" {
  name        = "${var.role_name}-s3"
  description = "Scoped S3 access for generated assets"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3AssetReadWrite"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${var.s3_bucket_arn}/*"
      },
      {
        Sid    = "S3BucketList"
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = var.s3_bucket_arn
      }
    ]
  })

  tags = var.tags
}

# ── Bedrock: Invoke only the specific Nova models ────────────────────────────
resource "aws_iam_policy" "bedrock_access" {
  name        = "${var.role_name}-bedrock"
  description = "Scoped Bedrock access for Amazon Nova model invocation only"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "BedrockInvokeNova"
        Effect = "Allow"
        Action = [
          "bedrock:InvokeModel"
        ]
        Resource = [
          "arn:aws:bedrock:${data.aws_region.current.name}::foundation-model/amazon.nova-pro-v1:0",
          "arn:aws:bedrock:${data.aws_region.current.name}::foundation-model/amazon.nova-canvas-v1:0"
        ]
      }
    ]
  })

  tags = var.tags
}

# ── CloudWatch Logs: Allow Lambda to write logs ──────────────────────────────
resource "aws_iam_policy" "cloudwatch_logs" {
  name        = "${var.role_name}-logs"
  description = "Allow Lambda to write CloudWatch logs"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "CloudWatchLogs"
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/${var.role_name}*"
      }
    ]
  })

  tags = var.tags
}

# ── Attach all policies to the role ──────────────────────────────────────────
resource "aws_iam_role_policy_attachment" "dynamodb" {
  role       = aws_iam_role.lambda_backend.name
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

resource "aws_iam_role_policy_attachment" "s3" {
  role       = aws_iam_role.lambda_backend.name
  policy_arn = aws_iam_policy.s3_access.arn
}

resource "aws_iam_role_policy_attachment" "bedrock" {
  role       = aws_iam_role.lambda_backend.name
  policy_arn = aws_iam_policy.bedrock_access.arn
}

resource "aws_iam_role_policy_attachment" "cloudwatch" {
  role       = aws_iam_role.lambda_backend.name
  policy_arn = aws_iam_policy.cloudwatch_logs.arn
}
