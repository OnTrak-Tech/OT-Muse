# ------------------------------------------------------------------------------
# SES Email Identity
# Verifies the sender email for transactional emails (verification, etc.)
# ------------------------------------------------------------------------------

resource "aws_ses_email_identity" "sender" {
  email = var.sender_email
}
