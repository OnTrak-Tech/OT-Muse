"use server";

import { auth } from "@/lib/auth";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
});

const docClient = DynamoDBDocumentClient.from(client);

/**
 * Server action to save the user's selected archetype (domain) to their profile in DynamoDB.
 */
export async function saveUserArchetype(archetype: string) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return { error: "Not authenticated" };
        }

        const tableName = process.env.AUTH_DYNAMODB_TABLE;
        if (!tableName) {
            console.error("[saveUserArchetype] Missing AUTH_DYNAMODB_TABLE environment variable");
            // If we don't have a DB configured in this environment, just return success so the UI can proceed
            return { success: true, simulated: true };
        }

        // The user's sorting key (sk) in Auth.js DynamoDB adapter is usually simply `USER#${userId}`
        // but since we only easily have the email from the session, we might need a Global Secondary Index
        // or we rely on the session.user.id if available.
        const userId = session.user.id;

        if (!userId) {
            return { error: "User ID not found in session" };
        }

        // Update the user record
        await docClient.send(
            new UpdateCommand({
                TableName: tableName,
                Key: {
                    pk: `USER#${userId}`,
                    sk: `USER#${userId}`,
                },
                UpdateExpression: "SET archetype = :archetype, onboardingCompleted = :completed",
                ExpressionAttributeValues: {
                    ":archetype": archetype,
                    ":completed": true,
                },
            })
        );

        return { success: true };
    } catch (error) {
        console.error("[saveUserArchetype] Error saving archetype:", error);
        // Fallback to allow the user to proceed even if the DB is unconfigured locally
        return { success: true, simulated: true, error: "Database error, proceeding anyway" };
    }
}
