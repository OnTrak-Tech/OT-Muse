import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? "us-east-1",
});

export const dynamoClient = DynamoDBDocument.from(client, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
});
