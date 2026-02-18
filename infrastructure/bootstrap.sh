#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# OT-Muse Infrastructure Bootstrap
# Creates: S3 state bucket, DynamoDB lock table, GitHub OIDC provider + role
# Idempotent — safe to run multiple times
# =============================================================================

AWS_REGION="us-east-1"
STATE_BUCKET="ot-muse-terraform-state"
LOCK_TABLE="ot-muse-terraform-locks"
GITHUB_ORG="OnTrak-Tech"
GITHUB_REPO="OT-Muse"
ROLE_NAME="ot-muse-github-actions"
POLICY_NAME="ot-muse-github-actions-policy"
OIDC_PROVIDER_URL="token.actions.githubusercontent.com"
OIDC_THUMBPRINT="6938fd4d98bab03faadb97b34396831e3780aea1"

echo "🚀 OT-Muse Infrastructure Bootstrap"
echo "====================================="
echo ""

# -----------------------------------------------------------------------------
# 1. S3 State Bucket
# -----------------------------------------------------------------------------
echo "📦 Step 1: S3 state bucket..."

if aws s3api head-bucket --bucket "$STATE_BUCKET" --region "$AWS_REGION" 2>/dev/null; then
    echo "   ✅ Bucket '$STATE_BUCKET' already exists"
else
    echo "   Creating bucket '$STATE_BUCKET'..."
    aws s3api create-bucket \
        --bucket "$STATE_BUCKET" \
        --region "$AWS_REGION" \
        2>/dev/null
    echo "   ✅ Bucket created"
fi

# Enable versioning
aws s3api put-bucket-versioning \
    --bucket "$STATE_BUCKET" \
    --versioning-configuration Status=Enabled \
    --region "$AWS_REGION"
echo "   ✅ Versioning enabled"

# Block public access
aws s3api put-public-access-block \
    --bucket "$STATE_BUCKET" \
    --public-access-block-configuration \
        BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true \
    --region "$AWS_REGION"
echo "   ✅ Public access blocked"

# Enable encryption
aws s3api put-bucket-encryption \
    --bucket "$STATE_BUCKET" \
    --server-side-encryption-configuration '{
        "Rules": [{
            "ApplyServerSideEncryptionByDefault": {
                "SSEAlgorithm": "aws:kms"
            },
            "BucketKeyEnabled": true
        }]
    }' \
    --region "$AWS_REGION"
echo "   ✅ Server-side encryption enabled"

echo ""

# -----------------------------------------------------------------------------
# 2. DynamoDB Lock Table
# -----------------------------------------------------------------------------
echo "🔐 Step 2: DynamoDB lock table..."

if aws dynamodb describe-table --table-name "$LOCK_TABLE" --region "$AWS_REGION" 2>/dev/null | grep -q "ACTIVE"; then
    echo "   ✅ Table '$LOCK_TABLE' already exists"
else
    echo "   Creating table '$LOCK_TABLE'..."
    aws dynamodb create-table \
        --table-name "$LOCK_TABLE" \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
        --region "$AWS_REGION" \
        > /dev/null
    aws dynamodb wait table-exists --table-name "$LOCK_TABLE" --region "$AWS_REGION"
    echo "   ✅ Table created"
fi

echo ""

# -----------------------------------------------------------------------------
# 3. GitHub OIDC Provider
# -----------------------------------------------------------------------------
echo "🔑 Step 3: GitHub OIDC provider..."

OIDC_ARN=$(aws iam list-open-id-connect-providers --region "$AWS_REGION" \
    | grep -o "arn:aws:iam::[0-9]*:oidc-provider/${OIDC_PROVIDER_URL}" || true)

if [ -n "$OIDC_ARN" ]; then
    echo "   ✅ OIDC provider already exists: $OIDC_ARN"
else
    echo "   Creating OIDC provider..."
    OIDC_ARN=$(aws iam create-open-id-connect-provider \
        --url "https://${OIDC_PROVIDER_URL}" \
        --client-id-list "sts.amazonaws.com" \
        --thumbprint-list "$OIDC_THUMBPRINT" \
        --query 'OpenIDConnectProviderArn' \
        --output text)
    echo "   ✅ OIDC provider created: $OIDC_ARN"
fi

echo ""

# -----------------------------------------------------------------------------
# 4. GitHub Actions IAM Role
# -----------------------------------------------------------------------------
echo "👤 Step 4: GitHub Actions IAM role..."

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

TRUST_POLICY=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::${ACCOUNT_ID}:oidc-provider/${OIDC_PROVIDER_URL}"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "${OIDC_PROVIDER_URL}:aud": "sts.amazonaws.com"
                },
                "StringLike": {
                    "${OIDC_PROVIDER_URL}:sub": "repo:${GITHUB_ORG}/${GITHUB_REPO}:*"
                }
            }
        }
    ]
}
EOF
)

if aws iam get-role --role-name "$ROLE_NAME" 2>/dev/null | grep -q "$ROLE_NAME"; then
    echo "   ✅ Role '$ROLE_NAME' already exists"
    # Update trust policy in case it changed
    aws iam update-assume-role-policy \
        --role-name "$ROLE_NAME" \
        --policy-document "$TRUST_POLICY"
    echo "   ✅ Trust policy updated"
else
    echo "   Creating role '$ROLE_NAME'..."
    aws iam create-role \
        --role-name "$ROLE_NAME" \
        --assume-role-policy-document "$TRUST_POLICY" \
        --description "GitHub Actions OIDC role for OT-Muse Terraform" \
        > /dev/null
    echo "   ✅ Role created"
fi

# Attach permissions policy
PERMISSIONS_POLICY=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "TerraformState",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::${STATE_BUCKET}",
                "arn:aws:s3:::${STATE_BUCKET}/*"
            ]
        },
        {
            "Sid": "TerraformLock",
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:DeleteItem"
            ],
            "Resource": "arn:aws:dynamodb:${AWS_REGION}:${ACCOUNT_ID}:table/${LOCK_TABLE}"
        },
        {
            "Sid": "DynamoDBManagement",
            "Effect": "Allow",
            "Action": [
                "dynamodb:CreateTable",
                "dynamodb:DeleteTable",
                "dynamodb:DescribeTable",
                "dynamodb:DescribeTimeToLive",
                "dynamodb:UpdateTimeToLive",
                "dynamodb:UpdateTable",
                "dynamodb:UpdateContinuousBackups",
                "dynamodb:DescribeContinuousBackups",
                "dynamodb:ListTagsOfResource",
                "dynamodb:TagResource",
                "dynamodb:UntagResource"
            ],
            "Resource": "arn:aws:dynamodb:${AWS_REGION}:${ACCOUNT_ID}:table/ot-muse-*"
        },
        {
            "Sid": "IAMManagement",
            "Effect": "Allow",
            "Action": [
                "iam:CreateUser",
                "iam:DeleteUser",
                "iam:GetUser",
                "iam:ListUserTags",
                "iam:TagUser",
                "iam:UntagUser",
                "iam:CreateAccessKey",
                "iam:DeleteAccessKey",
                "iam:ListAccessKeys",
                "iam:CreatePolicy",
                "iam:DeletePolicy",
                "iam:GetPolicy",
                "iam:GetPolicyVersion",
                "iam:ListPolicyVersions",
                "iam:CreatePolicyVersion",
                "iam:DeletePolicyVersion",
                "iam:AttachUserPolicy",
                "iam:DetachUserPolicy",
                "iam:ListAttachedUserPolicies",
                "iam:ListRolePolicies",
                "iam:PutRolePolicy",
                "iam:DeleteRolePolicy"
            ],
            "Resource": [
                "arn:aws:iam::${ACCOUNT_ID}:user/ot-muse-*",
                "arn:aws:iam::${ACCOUNT_ID}:policy/ot-muse-*"
            ]
        },
        {
            "Sid": "SESManagement",
            "Effect": "Allow",
            "Action": [
                "ses:VerifyEmailIdentity",
                "ses:DeleteIdentity",
                "ses:GetIdentityVerificationAttributes",
                "ses:ListIdentities"
            ],
            "Resource": "*"
        }
    ]
}
EOF
)

# Check if policy exists, create or update
POLICY_ARN="arn:aws:iam::${ACCOUNT_ID}:policy/${POLICY_NAME}"
if aws iam get-policy --policy-arn "$POLICY_ARN" 2>/dev/null | grep -q "$POLICY_NAME"; then
    echo "   ✅ Policy '$POLICY_NAME' already exists"
    # Create new version (delete oldest if at limit)
    VERSIONS=$(aws iam list-policy-versions --policy-arn "$POLICY_ARN" --query 'Versions[?!IsDefaultVersion].VersionId' --output text)
    for v in $VERSIONS; do
        aws iam delete-policy-version --policy-arn "$POLICY_ARN" --version-id "$v" 2>/dev/null || true
    done
    aws iam create-policy-version \
        --policy-arn "$POLICY_ARN" \
        --policy-document "$PERMISSIONS_POLICY" \
        --set-as-default > /dev/null
    echo "   ✅ Policy updated"
else
    aws iam create-policy \
        --policy-name "$POLICY_NAME" \
        --policy-document "$PERMISSIONS_POLICY" \
        --description "Permissions for OT-Muse GitHub Actions Terraform" \
        > /dev/null
    echo "   ✅ Policy created"
fi

# Attach policy to role
aws iam attach-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-arn "$POLICY_ARN" 2>/dev/null || true
echo "   ✅ Policy attached to role"

echo ""
echo "====================================="
echo "✅ Bootstrap complete!"
echo ""
echo "OIDC Provider: $OIDC_ARN"
echo "IAM Role ARN:  arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"
echo "State Bucket:  s3://${STATE_BUCKET}"
echo "Lock Table:    ${LOCK_TABLE}"
echo ""
echo "Next steps:"
echo "  1. cd infrastructure"
echo "  2. terraform init"
echo "  3. terraform plan"
echo "  4. terraform apply"
echo "====================================="
