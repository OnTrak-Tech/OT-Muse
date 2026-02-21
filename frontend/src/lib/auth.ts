import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
import { dynamoClient } from "@/lib/db";
import { compare } from "bcryptjs";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const adapter = DynamoDBAdapter(dynamoClient, {
    tableName: process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users",
    partitionKey: "pk",
    sortKey: "sk",
    indexName: "GSI1",
    indexPartitionKey: "GSI1PK",
    indexSortKey: "GSI1SK",
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    trustHost: true,
    secret: process.env.AUTH_SECRET, // Explicitly set secret to avoid auto-detection failure
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: true, // Enable verbose logging for debugging
    logger: {
        error(code, ...message) {
            console.error(code, message);
        },
        warn(code, ...message) {
            console.warn(code, message);
        },
        debug(code, ...message) {
            console.log(code, message);
        },
    },
    pages: {
        signIn: "/login",
        newUser: "/signup",
        error: "/login",
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Discord({
            clientId: process.env.AUTH_DISCORD_ID,
            clientSecret: process.env.AUTH_DISCORD_SECRET,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                // Look up user by email in DynamoDB
                const result = await dynamoClient.send(
                    new GetCommand({
                        TableName: process.env.DYNAMODB_USERS_TABLE ?? "ot-muse-users",
                        Key: { pk: `USER#${email}`, sk: `USER#${email}` },
                    })
                );

                const user = result.Item;
                if (!user) {
                    throw new Error("Invalid email or password");
                }

                // Check email verification
                if (!user.emailVerified) {
                    throw new Error("Please verify your email before logging in");
                }

                // Verify password
                const isValid = await compare(password, user.password);
                if (!isValid) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});
