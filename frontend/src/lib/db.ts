import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: process.env.APP_AWS_REGION ?? process.env.AWS_REGION ?? "us-east-1",
    ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN,
        }
    } : {})
});

export const dynamoClient = DynamoDBDocument.from(client, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
});
