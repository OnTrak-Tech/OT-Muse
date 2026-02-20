import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { dynamoClient } from "@/lib/db";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { signupSchema } from "@/lib/validations/auth";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION ?? "us-east-1" });

export async function POST(request: NextRequest) {
    console.log("[Signup] Start processing request");

    try {
        const body = await request.json();
        console.log("[Signup] Body parsed");

        // Validate input with Zod
        const result = signupSchema.safeParse(body);
        if (!result.success) {
            console.warn("[Signup] Validation failed", result.error);
            const firstError = result.error.issues[0];
            return NextResponse.json(
                { error: firstError.message },
                { status: 400 }
            );
        }

        const { email, password } = result.data;
        const tableName = process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users";
        console.log(`[Signup] Using table: ${tableName}`);

        // Check if user already exists
        console.log(`[Signup] Checking if user exists: ${email}`);
        try {
            const existing = await dynamoClient.send(
                new GetCommand({
                    TableName: tableName,
                    Key: { pk: `USER#${email}`, sk: `USER#${email}` },
                })
            );

            if (existing.Item) {
                console.warn(`[Signup] User already exists: ${email}`);
                return NextResponse.json(
                    { error: "An account with this email already exists" },
                    { status: 409 }
                );
            }
        } catch (dbError) {
            console.error("[Signup] DynamoDB GetCommand failed:", dbError);
            throw dbError; // Re-throw to be caught by outer catch
        }

        // Hash password
        console.log("[Signup] Hashing password");
        const hashedPassword = await hash(password, 12);
        const userId = randomUUID();
        const now = new Date().toISOString();

        // Create user (unverified)
        console.log("[Signup] Creating user in DynamoDB");
        try {
            await dynamoClient.send(
                new PutCommand({
                    TableName: tableName,
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
        } catch (putError) {
            console.error("[Signup] DynamoDB PutCommand (User) failed:", putError);
            throw putError;
        }

        // Generate a 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        // Expire in 15 minutes
        const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        // Hash the OTP before storing
        const hashedOtp = await hash(otpCode, 12);

        console.log("[Signup] Storing hashed OTP token");
        try {
            await dynamoClient.send(
                new PutCommand({
                    TableName: tableName,
                    Item: {
                        pk: `VERIFY#${email}`,
                        sk: `VERIFY#${email}`,
                        identifier: email,
                        token: hashedOtp, // Store the HASH, not the plaintext code
                        expires,
                        type: "VERIFICATION",
                    },
                })
            );
        } catch (tokenError) {
            console.error("[Signup] DynamoDB PutCommand (Token) failed:", tokenError);
            throw tokenError;
        }

        // Send verification email via SES
        const fromEmail = process.env.SES_FROM_EMAIL ?? "noreply@otmuse.ai";

        console.log(`[Signup] Sending SES email from ${fromEmail}`);
        try {
            await ses.send(
                new SendEmailCommand({
                    Source: fromEmail,
                    Destination: { ToAddresses: [email] },
                    Message: {
                        Subject: {
                            Data: "Your OT-Muse Verification Code",
                            Charset: "UTF-8",
                        },
                        Body: {
                            Html: {
                                Data: `
                                    <div style="max-width:480px;margin:0 auto;font-family:sans-serif;color:#e5e7eb;background:#0A0F0D;padding:32px;border-radius:12px;">
                                        <h1 style="color:#10B981;font-size:24px;margin-bottom:8px;">Welcome to Nova Muse</h1>
                                        <p style="margin-bottom:24px;line-height:1.6;">Use the verification code below to confirm your email and unlock your world.</p>
                                        <div style="font-size:32px;font-weight:bold;letter-spacing:4px;color:#10B981;text-align:center;padding:16px;border:1px dashed #10B981;border-radius:8px;margin-bottom:24px;">
                                            ${otpCode}
                                        </div>
                                        <p style="margin-top:24px;font-size:12px;color:#6b7280;">This code expires in 15 minutes. If you didn't create an account, ignore this email.</p>
                                    </div>
                                `,
                                Charset: "UTF-8",
                            },
                        },
                    },
                })
            );
            console.log("[Signup] Email sent successfully");
        } catch (emailError) {
            console.error("[Signup] SES email error:", emailError);
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
        console.error("[Signup] Global error handler:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
