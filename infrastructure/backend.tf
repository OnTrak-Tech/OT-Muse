# ------------------------------------------------------------------------------
# Terraform Backend — S3 + DynamoDB locking
# Created by bootstrap.sh before first terraform init
# ------------------------------------------------------------------------------

terraform {
  backend "s3" {
    bucket         = "ot-muse-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "ot-muse-terraform-locks"
    encrypt        = true
  }
}
