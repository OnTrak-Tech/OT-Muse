import { NextRequest, NextResponse } from "next/server";
import { dynamoClient } from "@/lib/db";
import { GetCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(
                new URL("/login?error=missing-token", request.url)
            );
        }

        // Look up verification token
        const tokenResult = await dynamoClient.send(
            new GetCommand({
                TableName:
                    process.env.DYNAMODB_VERIFICATION_TOKENS_TABLE ??
                    "ot-muse-verification-tokens",
                Key: { pk: `TOKEN#${token}`, sk: `TOKEN#${token}` },
            })
        );

        const tokenRecord = tokenResult.Item;

        if (!tokenRecord) {
            return NextResponse.redirect(
                new URL("/login?error=invalid-token", request.url)
            );
        }

        // Check expiry
        if (new Date(tokenRecord.expires) < new Date()) {
            // Clean up expired token
            await dynamoClient.send(
                new DeleteCommand({
                    TableName:
                        process.env.DYNAMODB_VERIFICATION_TOKENS_TABLE ??
                        "ot-muse-verification-tokens",
                    Key: { pk: `TOKEN#${token}`, sk: `TOKEN#${token}` },
                })
            );
            return NextResponse.redirect(
                new URL("/login?error=token-expired", request.url)
            );
        }

        const email = tokenRecord.identifier;

        // Mark user as verified
        await dynamoClient.send(
            new UpdateCommand({
                TableName: process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users",
                Key: { pk: `USER#${email}`, sk: `USER#${email}` },
                UpdateExpression:
                    "SET emailVerified = :now, updatedAt = :now",
                ExpressionAttributeValues: {
                    ":now": new Date().toISOString(),
                },
            })
        );

        // Delete the used token
        await dynamoClient.send(
            new DeleteCommand({
                TableName:
                    process.env.DYNAMODB_VERIFICATION_TOKENS_TABLE ??
                    "ot-muse-verification-tokens",
                Key: { pk: `TOKEN#${token}`, sk: `TOKEN#${token}` },
            })
        );

        // Redirect to login with success
        return NextResponse.redirect(
            new URL("/login?verified=true", request.url)
        );
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.redirect(
            new URL("/login?error=verification-failed", request.url)
        );
    }
}
