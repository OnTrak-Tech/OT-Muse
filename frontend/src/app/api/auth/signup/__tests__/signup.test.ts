/** @jest-environment node */
import { NextRequest } from "next/server";
import { POST } from "../route";
import { dynamoClient } from "@/lib/db";
// @ts-expect-error - mSend is a custom mock added in jest.mock
import { mSend } from "@aws-sdk/client-ses";
import { hash } from "bcryptjs";

// Mock external dependencies
jest.mock("@aws-sdk/client-ses", () => {
    const mSend = jest.fn().mockResolvedValue({});
    return {
        SESClient: jest.fn().mockImplementation(() => ({
            send: mSend,
        })),
        SendEmailCommand: jest.fn(),
        mSend, // exported for assertions
    };
});

jest.mock("@/lib/db", () => {
    return {
        dynamoClient: {
            send: jest.fn(),
        },
    };
});

jest.mock("@aws-sdk/lib-dynamodb", () => {
    return {
        GetCommand: jest.fn(),
        PutCommand: jest.fn(),
    };
});

// Partial mock for bcryptjs to avoid slow operations in tests
jest.mock("bcryptjs", () => {
    return {
        hash: jest.fn().mockResolvedValue("hashed_password_or_otp"),
    };
});

// Mock environment variables
process.env.DYNAMODB_USERS_TABLE = "test-users-table";
process.env.SES_FROM_EMAIL = "test@example.com";

describe("Signup POST API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const createMockRequest = (body: Record<string, unknown>) => {
        return {
            json: async () => body,
            method: "POST",
            url: "http://localhost:3000/api/auth/signup"
        } as unknown as NextRequest;
    };

    test("returns 400 for invalid input", async () => {
        const req = createMockRequest({ email: "invalid-email" });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBeDefined();
    });

    test("returns 409 if user already exists", async () => {
        // Mock GetCommand returning an existing user
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({ Item: { email: "test@example.com" } });

        const req = createMockRequest({ email: "test@example.com", password: "Password123!", confirmPassword: "Password123!" });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(409);
        expect(data.error).toBe("An account with this email already exists");
    });

    test("creates user, generates OTP, stores hash, and sends email on successful signup", async () => {
        // Mock GetCommand returning no existing user
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({ Item: undefined });

        // Mock PutCommands for User and Token
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({}); // User Put
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({}); // Token Put

        const req = createMockRequest({ email: "newuser@example.com", password: "Password123!", confirmPassword: "Password123!" });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data.message).toMatch(/Account created!/);

        // Verify dynamoClient was called with Get (check existing), Put (User), Put (Token)
        expect(dynamoClient.send).toHaveBeenCalledTimes(3);

        // Verify bcrypt was used for password AND OTP
        expect(hash).toHaveBeenCalledTimes(2);

        // Ensure SES was called
        expect(mSend).toHaveBeenCalledTimes(1);
    });
});
