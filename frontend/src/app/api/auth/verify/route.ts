import { NextRequest, NextResponse } from "next/server";
import { dynamoClient } from "@/lib/db";
import { GetCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, code } = body;

        if (!email || !code || code.length !== 6) {
            return NextResponse.json(
                { error: "Valid email and 6-digit code are required." },
                { status: 400 }
            );
        }

        const tableName = process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users";

        // 1. Look up the verification token
        const tokenResult = await dynamoClient.send(
            new GetCommand({
                TableName: tableName,
                Key: { pk: `VERIFY#${email}`, sk: `VERIFY#${email}` },
            })
        );

        const tokenRecord = tokenResult.Item;

        if (!tokenRecord) {
            return NextResponse.json(
                { error: "Verification code not found or expired." },
                { status: 404 }
            );
        }

        // 2. Check expiry
        if (new Date(tokenRecord.expires) < new Date()) {
            await dynamoClient.send(
                new DeleteCommand({
                    TableName: tableName,
                    Key: { pk: `VERIFY#${email}`, sk: `VERIFY#${email}` },
                })
            );
            return NextResponse.json(
                { error: "Verification code has expired. Please sign up again." },
                { status: 410 }
            );
        }

        // 3. Verify the code against the hashed token
        const isValid = await compare(code, tokenRecord.token);

        if (!isValid) {
            return NextResponse.json(
                { error: "Incorrect verification code." },
                { status: 401 }
            );
        }

        // 4. Mark user as verified
        await dynamoClient.send(
            new UpdateCommand({
                TableName: tableName,
                Key: { pk: `USER#${email}`, sk: `USER#${email}` },
                UpdateExpression:
                    "SET emailVerified = :now, updatedAt = :now",
                ExpressionAttributeValues: {
                    ":now": new Date().toISOString(),
                },
            })
        );

        // 5. Delete the used token record
        await dynamoClient.send(
            new DeleteCommand({
                TableName: tableName,
                Key: { pk: `VERIFY#${email}`, sk: `VERIFY#${email}` },
            })
        );

        return NextResponse.json(
            { message: "Email verified successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { error: "Failed to verify email. Please try again." },
            { status: 500 }
        );
    }
}
