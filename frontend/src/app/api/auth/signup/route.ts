import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { dynamoClient } from "@/lib/db";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { signupSchema } from "@/lib/validations/auth";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION ?? "us-east-1" });

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input with Zod
        const result = signupSchema.safeParse(body);
        if (!result.success) {
            const firstError = result.error.issues[0];
            return NextResponse.json(
                { error: firstError.message },
                { status: 400 }
            );
        }

        const { email, password } = result.data;

        // Check if user already exists
        const existing = await dynamoClient.send(
            new GetCommand({
                TableName: process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users",
                Key: { pk: `USER#${email}`, sk: `USER#${email}` },
            })
        );

        if (existing.Item) {
            return NextResponse.json(
                { error: "An account with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 12);
        const userId = randomUUID();
        const now = new Date().toISOString();

        // Create user (unverified)
        await dynamoClient.send(
            new PutCommand({
                TableName: process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users",
                Item: {
                    pk: `USER#${email}`,
                    sk: `USER#${email}`,
                    id: userId,
                    email,
                    password: hashedPassword,
                    name: email.split("@")[0],
                    emailVerified: null,
                    image: null,
                    createdAt: now,
                    updatedAt: now,
                },
            })
        );

        // Generate verification token
        const token = randomUUID();
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

        await dynamoClient.send(
            new PutCommand({
                TableName:
                    process.env.DYNAMODB_VERIFICATION_TOKENS_TABLE ??
                    "ot-muse-verification-tokens",
                Item: {
                    pk: `TOKEN#${token}`,
                    sk: `TOKEN#${token}`,
                    identifier: email,
                    token,
                    expires,
                },
            })
        );

        // Send verification email via SES
        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
        const verifyUrl = `${appUrl}/api/auth/verify?token=${token}`;

        try {
            await ses.send(
                new SendEmailCommand({
                    Source: process.env.SES_FROM_EMAIL ?? "noreply@otmuse.ai",
                    Destination: { ToAddresses: [email] },
                    Message: {
                        Subject: {
                            Data: "Verify your OT-Muse account",
                            Charset: "UTF-8",
                        },
                        Body: {
                            Html: {
                                Data: `
                                    <div style="max-width:480px;margin:0 auto;font-family:sans-serif;color:#e5e7eb;background:#0A0F0D;padding:32px;border-radius:12px;">
                                        <h1 style="color:#10B981;font-size:24px;margin-bottom:8px;">Welcome to OT-Muse</h1>
                                        <p style="margin-bottom:24px;line-height:1.6;">Click the button below to verify your email and start building worlds.</p>
                                        <a href="${verifyUrl}" style="display:inline-block;background:#10B981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
                                            Verify Email
                                        </a>
                                        <p style="margin-top:24px;font-size:12px;color:#6b7280;">This link expires in 24 hours. If you didn't create an account, ignore this email.</p>
                                    </div>
                                `,
                                Charset: "UTF-8",
                            },
                        },
                    },
                })
            );
        } catch (emailError) {
            console.error("SES email error:", emailError);
            // Don't fail signup if email fails — user can request resend
        }

        return NextResponse.json(
            {
                message:
                    "Account created! Please check your email to verify your account.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
