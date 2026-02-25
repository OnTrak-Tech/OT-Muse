import { v4 as uuid } from "uuid";
import { dynamodb, USERS_TABLE } from "../config/aws";
import { QueryCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface World {
    worldId: string;
    title: string;
    description: string;
    style: string;
    status: "draft" | "active" | "archived";
    ownerId: string;
    thumbnailUrl?: string;
    worldGraph: {
        nodes: WorldNode[];
        edges: WorldEdge[];
    };
    settings: {
        isPublic: boolean;
        maxCollaborators: number;
    };
    generationCount: number;
    collaboratorCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface WorldNode {
    id: string;
    type: string;
    name: string;
    description: string;
    position: { x: number; y: number };
    assets: Record<string, { key: string; url: string }>;
    metadata: {
        generatedFrom: string;
        version: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface WorldEdge {
    id: string;
    from: string;
    to: string;
    relationship: string;
    label: string;
}

export interface CreateWorldInput {
    title: string;
    description?: string;
    style?: string;
    settings?: {
        isPublic?: boolean;
        maxCollaborators?: number;
    };
}

export interface ListWorldsOptions {
    filter?: "owned" | "shared" | "all";
    status?: "active" | "archived" | "all";
    limit?: number;
    nextToken?: string;
}

// ---------------------------------------------------------------------------
// DynamoDB Key Schema
// ---------------------------------------------------------------------------
// World record:
//   pk: USER#{ownerId}
//   sk: WORLD#{worldId}
//   GSI1PK: WORLD#{worldId}
//   GSI1SK: WORLD#{worldId}
// ---------------------------------------------------------------------------

/**
 * Create a new world.
 */
export async function createWorld(ownerId: string, input: CreateWorldInput): Promise<World> {
    const worldId = `wld_${uuid().replace(/-/g, "").substring(0, 12)}`;
    const now = new Date().toISOString();

    const world: World = {
        worldId,
        title: input.title,
        description: input.description ?? "",
        style: input.style ?? "fantasy",
        status: "draft",
        ownerId,
        worldGraph: { nodes: [], edges: [] },
        settings: {
            isPublic: input.settings?.isPublic ?? false,
            maxCollaborators: input.settings?.maxCollaborators ?? 5,
        },
        generationCount: 0,
        collaboratorCount: 0,
        createdAt: now,
        updatedAt: now,
    };

    await dynamodb.send(
        new PutCommand({
            TableName: USERS_TABLE,
            Item: {
                pk: `USER#${ownerId}`,
                sk: `WORLD#${worldId}`,
                GSI1PK: `WORLD#${worldId}`,
                GSI1SK: `WORLD#${worldId}`,
                type: "WORLD",
                ...world,
            },
        })
    );

    return world;
}

/**
 * List all worlds for a user.
 */
export async function listWorlds(userId: string, options: ListWorldsOptions = {}): Promise<{
    worlds: World[];
    nextToken?: string;
    totalCount: number;
}> {
    const limit = Math.min(options.limit ?? 20, 50);

    const result = await dynamodb.send(
        new QueryCommand({
            TableName: USERS_TABLE,
            KeyConditionExpression: "pk = :pk AND begins_with(sk, :skPrefix)",
            ExpressionAttributeValues: {
                ":pk": `USER#${userId}`,
                ":skPrefix": "WORLD#",
            },
            Limit: limit,
            ...(options.nextToken ? { ExclusiveStartKey: JSON.parse(Buffer.from(options.nextToken, "base64").toString()) } : {}),
        })
    );

    let worlds = (result.Items ?? []) as World[];

    // Filter by status if not "all"
    if (options.status && options.status !== "all") {
        worlds = worlds.filter((w) => w.status === options.status);
    }

    return {
        worlds,
        nextToken: result.LastEvaluatedKey
            ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString("base64")
            : undefined,
        totalCount: worlds.length,
    };
}

/**
 * Get a single world by its ID (via GSI1).
 */
export async function getWorld(worldId: string): Promise<World | null> {
    const result = await dynamodb.send(
        new QueryCommand({
            TableName: USERS_TABLE,
            IndexName: "GSI1",
            KeyConditionExpression: "GSI1PK = :pk AND GSI1SK = :sk",
            ExpressionAttributeValues: {
                ":pk": `WORLD#${worldId}`,
                ":sk": `WORLD#${worldId}`,
            },
            Limit: 1,
        })
    );

    if (!result.Items || result.Items.length === 0) return null;
    return result.Items[0] as World;
}

/**
 * Update a world's metadata (title, description, settings, status).
 */
export async function updateWorld(
    ownerId: string,
    worldId: string,
    updates: Partial<Pick<World, "title" | "description" | "style" | "settings" | "thumbnailUrl">>
): Promise<World | null> {
    const expressionParts: string[] = ["#updatedAt = :updatedAt"];
    const names: Record<string, string> = { "#updatedAt": "updatedAt" };
    const values: Record<string, unknown> = { ":updatedAt": new Date().toISOString() };

    if (updates.title !== undefined) {
        expressionParts.push("#title = :title");
        names["#title"] = "title";
        values[":title"] = updates.title;
    }
    if (updates.description !== undefined) {
        expressionParts.push("#description = :description");
        names["#description"] = "description";
        values[":description"] = updates.description;
    }
    if (updates.style !== undefined) {
        expressionParts.push("#style = :style");
        names["#style"] = "style";
        values[":style"] = updates.style;
    }
    if (updates.settings !== undefined) {
        expressionParts.push("#settings = :settings");
        names["#settings"] = "settings";
        values[":settings"] = updates.settings;
    }
    if (updates.thumbnailUrl !== undefined) {
        expressionParts.push("#thumbnailUrl = :thumbnailUrl");
        names["#thumbnailUrl"] = "thumbnailUrl";
        values[":thumbnailUrl"] = updates.thumbnailUrl;
    }

    const result = await dynamodb.send(
        new UpdateCommand({
            TableName: USERS_TABLE,
            Key: {
                pk: `USER#${ownerId}`,
                sk: `WORLD#${worldId}`,
            },
            UpdateExpression: `SET ${expressionParts.join(", ")}`,
            ExpressionAttributeNames: names,
            ExpressionAttributeValues: values,
            ReturnValues: "ALL_NEW",
            ConditionExpression: "attribute_exists(pk)",
        })
    );

    return (result.Attributes as World) ?? null;
}

/**
 * Delete a world.
 */
export async function deleteWorld(ownerId: string, worldId: string): Promise<boolean> {
    try {
        await dynamodb.send(
            new DeleteCommand({
                TableName: USERS_TABLE,
                Key: {
                    pk: `USER#${ownerId}`,
                    sk: `WORLD#${worldId}`,
                },
                ConditionExpression: "attribute_exists(pk)",
            })
        );
        return true;
    } catch (err: unknown) {
        if ((err as { name?: string }).name === "ConditionalCheckFailedException") {
            return false;
        }
        throw err;
    }
}

/**
 * Archive or unarchive a world.
 */
export async function archiveWorld(ownerId: string, worldId: string, archived: boolean): Promise<World | null> {
    const result = await dynamodb.send(
        new UpdateCommand({
            TableName: USERS_TABLE,
            Key: {
                pk: `USER#${ownerId}`,
                sk: `WORLD#${worldId}`,
            },
            UpdateExpression: "SET #status = :status, #updatedAt = :updatedAt",
            ExpressionAttributeNames: {
                "#status": "status",
                "#updatedAt": "updatedAt",
            },
            ExpressionAttributeValues: {
                ":status": archived ? "archived" : "active",
                ":updatedAt": new Date().toISOString(),
            },
            ReturnValues: "ALL_NEW",
            ConditionExpression: "attribute_exists(pk)",
        })
    );

    return (result.Attributes as World) ?? null;
}
