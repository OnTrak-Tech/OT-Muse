# ------------------------------------------------------------------------------
# DynamoDB Table for Auth.js
# Single-table design with pk/sk keys and GSI1 index
# ------------------------------------------------------------------------------

resource "aws_dynamodb_table" "auth" {
  name         = var.table_name
  billing_mode = "PAY_PER_REQUEST"

  # Primary keys
  # Note: hash_key/range_key show deprecation warnings in AWS provider 5.x,
  # but this is the only supported syntax. Safe to ignore until replacement is available.
  hash_key  = "pk"
  range_key = "sk"

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }

  attribute {
    name = "GSI1PK"
    type = "S"
  }

  attribute {
    name = "GSI1SK"
    type = "S"
  }

  # Required by @auth/dynamodb-adapter for lookups (e.g. session by token)
  global_secondary_index {
    name            = "GSI1"
    hash_key        = "GSI1PK"
    range_key       = "GSI1SK"
    projection_type = "ALL"
  }

  # Auto-expire sessions and verification tokens
  ttl {
    attribute_name = "expires"
    enabled        = true
  }

  # Point-in-time recovery
  point_in_time_recovery {
    enabled = true
  }

  tags = var.tags

  lifecycle {
    prevent_destroy = true
  }
}
