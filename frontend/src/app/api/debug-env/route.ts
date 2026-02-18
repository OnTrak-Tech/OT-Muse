import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json({
        env: {
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            AUTH_URL: process.env.AUTH_URL,
            NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
            AWS_REGION: process.env.AWS_REGION,
            DYNAMODB_USERS_TABLE: process.env.DYNAMODB_USERS_TABLE,
            // Check if secrets exists (don't reveal values)
            HAS_AUTH_SECRET: !!process.env.AUTH_SECRET,
            HAS_GOOGLE_ID: !!process.env.AUTH_GOOGLE_ID,
            HAS_GOOGLE_SECRET: !!process.env.AUTH_GOOGLE_SECRET,
            NODE_ENV: process.env.NODE_ENV,
        },
        url: process.env.VERCEL_URL // Fallback often used by frameworks
    });
}
