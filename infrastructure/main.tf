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
