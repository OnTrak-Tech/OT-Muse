import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";

const region = process.env.AWS_REGION ?? "us-east-1";

// ---------------------------------------------------------------------------
// DynamoDB
// ---------------------------------------------------------------------------
const ddbClient = new DynamoDBClient({ region });

export const dynamodb = DynamoDBDocument.from(ddbClient, {
    marshallOptions: { removeUndefinedValues: true },
});

export const USERS_TABLE = process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users";

// ---------------------------------------------------------------------------
// S3
// ---------------------------------------------------------------------------
export const s3 = new S3Client({ region });

export const ASSETS_BUCKET = process.env.S3_ASSETS_BUCKET ?? "ot-muse-assets";

// ---------------------------------------------------------------------------
// Bedrock (Amazon Nova)
// ---------------------------------------------------------------------------
export const bedrock = new BedrockRuntimeClient({ region });

export const NOVA_TEXT_MODEL = "amazon.nova-pro-v1:0";
export const NOVA_IMAGE_MODEL = "amazon.nova-canvas-v1:0";
