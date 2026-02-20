/** @jest-environment node */
import { NextRequest } from "next/server";
import { POST } from "../route";
import { dynamoClient } from "@/lib/db";
import { compare } from "bcryptjs";

// Mock external dependencies
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
        UpdateCommand: jest.fn(),
        DeleteCommand: jest.fn(),
    };
});

jest.mock("bcryptjs", () => {
    return {
        compare: jest.fn(),
    };
});

// Mock environment variables
process.env.DYNAMODB_USERS_TABLE = "test-users-table";

describe("Verify POST API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const createMockRequest = (body: any) => {
        return {
            json: async () => body,
            method: "POST",
            url: "http://localhost:3000/api/auth/verify"
        } as unknown as NextRequest;
    };

    test("returns 400 for missing email or code", async () => {
        const req = createMockRequest({ email: "test@example.com" }); // Missing code
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBe("Valid email and 6-digit code are required.");
    });

    test("returns 404 if token record not found", async () => {
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({ Item: undefined });

        const req = createMockRequest({ email: "test@example.com", code: "123456" });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(404);
        expect(data.error).toBe("Verification code not found or expired.");
    });

    test("returns 410 if token is expired", async () => {
        const pastDate = new Date(Date.now() - 10000).toISOString();
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({
            Item: { identifier: "test@example.com", expires: pastDate, token: "hashed_code" }
        });

        const req = createMockRequest({ email: "test@example.com", code: "123456" });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(410);
        expect(data.error).toMatch(/expired/);
    });

    test("returns 401 for incorrect code", async () => {
        const futureDate = new Date(Date.now() + 10000).toISOString();
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({
            Item: { identifier: "test@example.com", expires: futureDate, token: "hashed_code" }
        });
        (compare as jest.Mock).mockResolvedValueOnce(false); // Code does not match hash

        const req = createMockRequest({ email: "test@example.com", code: "654321" });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(401);
        expect(data.error).toBe("Incorrect verification code.");
    });

    test("verifies email successfully and deletes token", async () => {
        const futureDate = new Date(Date.now() + 10000).toISOString();

        // Mock GetCommand finding the valid token
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({
            Item: { identifier: "test@example.com", expires: futureDate, token: "hashed_code" }
        });

        // Mock compare succeeding
        (compare as jest.Mock).mockResolvedValueOnce(true);

        // Mock UpdateCommand (mark user verified)
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({});

        // Mock DeleteCommand (delete token)
        (dynamoClient.send as jest.Mock).mockResolvedValueOnce({});

        const req = createMockRequest({ email: "test@example.com", code: "123456" });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.message).toBe("Email verified successfully.");
        expect(dynamoClient.send).toHaveBeenCalledTimes(3);
    });
});
