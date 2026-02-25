# ------------------------------------------------------------------------------
# Root Module — Composes all infrastructure modules
# ------------------------------------------------------------------------------

module "dynamodb" {
  source = "./modules/dynamodb"

  table_name = var.dynamodb_table_name

  tags = {
    Component = "auth"
  }
}

module "iam" {
  source = "./modules/iam"

  dynamodb_table_arn = module.dynamodb.table_arn
  ses_from_email     = var.ses_from_email

  tags = {
    Component = "auth"
  }
}

module "ses" {
  source = "./modules/ses"

  sender_email = var.ses_from_email
}

# ── Phase 3: Backend Infrastructure ──────────────────────────────────────────

module "s3" {
  source = "./modules/s3"

  bucket_name     = var.s3_assets_bucket_name
  allowed_origins = var.s3_allowed_origins

  tags = {
    Component = "backend"
  }
}

module "lambda_iam" {
  source = "./modules/lambda-iam"

  dynamodb_table_arn = module.dynamodb.table_arn
  s3_bucket_arn      = module.s3.bucket_arn

  tags = {
    Component = "backend"
  }
}

module "lambda" {
  source = "./modules/lambda"

  function_name       = "ot-muse-api"
  role_arn            = module.lambda_iam.role_arn
  zip_path            = var.lambda_zip_path
  dynamodb_table_name = var.dynamodb_table_name
  s3_bucket_name      = var.s3_assets_bucket_name
  frontend_url        = var.frontend_url

  tags = {
    Component = "backend"
  }
}

module "api_gateway" {
  source = "./modules/api-gateway"

  api_name             = "ot-muse-api"
  lambda_function_name = module.lambda.function_name
  lambda_invoke_arn    = module.lambda.invoke_arn
  cors_origins         = var.s3_allowed_origins

  tags = {
    Component = "backend"
  }
}
