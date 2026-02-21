import { NextRequest, NextResponse } from "next/server";
import { dynamoClient } from "@/lib/db";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";

const ses = new SESClient({
    region: process.env.AWS_REGION ?? "us-east-1",
    ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN,
        }
    } : {})
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }

        const tableName = process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users";

        // 1. Verify user exists and is NOT already verified
        const result = await dynamoClient.send(
            new GetCommand({
                TableName: tableName,
                Key: { pk: `USER#${email}`, sk: `USER#${email}` },
            })
        );

        const user = result.Item;
        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 }
            );
        }

        if (user.emailVerified) {
            return NextResponse.json(
                { error: "Email is already verified. Please sign in." },
                { status: 400 }
            );
        }

        // 2. Generate new OTP token
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await hash(otpCode, 12);
        const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        // 3. Store new token in DB
        await dynamoClient.send(
            new PutCommand({
                TableName: tableName,
                Item: {
                    pk: `VERIFY#${email}`,
                    sk: `VERIFY#${email}`,
                    identifier: email,
                    token: hashedOtp,
                    expires,
                    type: "VERIFICATION",
                },
            })
        );

        // 4. Send the email via SES
        const emailParams = {
            Source: "noreply@ontrakmuse.com", // Replace with your verified SES domain
            Destination: { ToAddresses: [email] },
            Message: {
                Subject: { Data: "Your New Verification Code - OT-Muse" },
                Body: {
                    Text: { Data: `Your new verification code is: ${otpCode}. It will expire in 15 minutes.` },
                    Html: {
                        Data: `
                        <div style="font-family: sans-serif; max-w-md; margin: auto;">
                            <h2>Verify your email</h2>
                            <p>Here is your new 6-digit verification code:</p>
                            <h1 style="background: #f4f4f5; padding: 12px; text-align: center; letter-spacing: 4px; border-radius: 8px;">
                                ${otpCode}
                            </h1>
                            <p>This code will expire in 15 minutes.</p>
                        </div>
                        `,
                    },
                },
            },
        };

        await ses.send(new SendEmailCommand(emailParams));

        return NextResponse.json(
            { message: "A new verification code has been sent." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Resend verification error:", error);
        return NextResponse.json(
            { error: "Failed to resend verification code. Please try again later." },
            { status: 500 }
        );
    }
}
