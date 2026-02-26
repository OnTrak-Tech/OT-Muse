import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { dynamodb, USERS_TABLE } from "../config/aws";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export const userRoutes = Router();

// All user routes require authentication
userRoutes.use(requireAuth);

// ---------------------------------------------------------------------------
// GET /users/me — Get current user's profile
// ---------------------------------------------------------------------------
userRoutes.get("/me", async (req: AuthenticatedRequest, res, next) => {
    try {
        const userId = req.userId!;
        const email = req.userEmail;

        // The Auth.js DynamoDB adapter stores:
        //   OAuth users  → pk: USER#<uuid>,  sk: USER#<uuid>
        //   Creds users  → pk: USER#<email>, sk: USER#<email>
        // We try both key formats to find the user record.
        let userRecord;

        // Try by userId (UUID) first — covers OAuth users
        const byId = await dynamodb.send(
            new GetCommand({
                TableName: USERS_TABLE,
                Key: { pk: `USER#${userId}`, sk: `USER#${userId}` },
            })
        );
        userRecord = byId.Item;

        // If not found by UUID, try by email — covers Credentials users
        if (!userRecord && email) {
            const byEmail = await dynamodb.send(
                new GetCommand({
                    TableName: USERS_TABLE,
                    Key: { pk: `USER#${email}`, sk: `USER#${email}` },
                })
            );
            userRecord = byEmail.Item;
        }

        if (!userRecord) {
            throw new ApiError(404, "NOT_FOUND", "User profile not found.");
        }

        res.json({
            userId: userRecord.id ?? userId,
            email: userRecord.email,
            displayName: userRecord.name ?? userRecord.email?.split("@")[0],
            avatarUrl: userRecord.image ?? null,
            archetype: userRecord.archetype ?? null,
            onboardingCompleted: userRecord.onboardingCompleted ?? false,
            preferences: userRecord.preferences ?? {
                defaultStyle: "fantasy",
                theme: "dark",
            },
            stats: userRecord.stats ?? {
                worldsCreated: 0,
                totalPrompts: 0,
            },
            createdAt: userRecord.createdAt,
        });
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// PUT /users/me — Update profile and preferences
// ---------------------------------------------------------------------------
userRoutes.put("/me", async (req: AuthenticatedRequest, res, next) => {
    try {
        const userId = req.userId!;
        const email = req.userEmail;

        // Determine the correct DynamoDB key for this user.
        // OAuth users  → pk: USER#<uuid>
        // Creds users  → pk: USER#<email>
        let userKey: string | null = null;

        // Try UUID first
        const byId = await dynamodb.send(
            new GetCommand({
                TableName: USERS_TABLE,
                Key: { pk: `USER#${userId}`, sk: `USER#${userId}` },
            })
        );
        if (byId.Item) {
            userKey = userId;
        }

        // Fall back to email
        if (!userKey && email) {
            const byEmail = await dynamodb.send(
                new GetCommand({
                    TableName: USERS_TABLE,
                    Key: { pk: `USER#${email}`, sk: `USER#${email}` },
                })
            );
            if (byEmail.Item) {
                userKey = email;
            }
        }

        if (!userKey) {
            throw new ApiError(404, "NOT_FOUND", "User profile not found.");
        }

        const { displayName, preferences, archetype } = req.body;

        const expressionParts: string[] = ["#updatedAt = :updatedAt"];
        const names: Record<string, string> = { "#updatedAt": "updatedAt" };
        const values: Record<string, unknown> = { ":updatedAt": new Date().toISOString() };

        if (displayName !== undefined) {
            expressionParts.push("#name = :name");
            names["#name"] = "name";
            values[":name"] = displayName;
        }
        if (preferences !== undefined) {
            expressionParts.push("#preferences = :preferences");
            names["#preferences"] = "preferences";
            values[":preferences"] = preferences;
        }
        if (archetype !== undefined) {
            expressionParts.push("#archetype = :archetype");
            names["#archetype"] = "archetype";
            values[":archetype"] = archetype;
        }

        const result = await dynamodb.send(
            new UpdateCommand({
                TableName: USERS_TABLE,
                Key: {
                    pk: `USER#${userKey}`,
                    sk: `USER#${userKey}`,
                },
                UpdateExpression: `SET ${expressionParts.join(", ")}`,
                ExpressionAttributeNames: names,
                ExpressionAttributeValues: values,
                ReturnValues: "ALL_NEW",
            })
        );

        const updated = result.Attributes;

        res.json({
            userId: updated?.id ?? req.userId,
            displayName: updated?.name,
            preferences: updated?.preferences,
            archetype: updated?.archetype,
            updatedAt: updated?.updatedAt,
        });
    } catch (err) {
        next(err);
    }
});
