import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { v4 as uuid } from "uuid";
import { dynamodb, USERS_TABLE, bedrock, s3, ASSETS_BUCKET, NOVA_TEXT_MODEL, NOVA_IMAGE_MODEL } from "../config/aws";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export const generationRoutes = Router();

// All generation routes require authentication
generationRoutes.use(requireAuth);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface GenerationJob {
    jobId: string;
    worldId: string;
    userId: string;
    status: "processing" | "completed" | "failed";
    stages: { name: string; status: string }[];
    progress: number;
    result?: Record<string, unknown>;
    error?: string;
    createdAt: string;
    completedAt?: string;
}

// ---------------------------------------------------------------------------
// POST /worlds/:worldId/generate — Trigger AI generation
// ---------------------------------------------------------------------------
generationRoutes.post("/:worldId/generate", async (req: AuthenticatedRequest, res, next) => {
    try {
        const worldId = req.params.worldId as string;
        const { prompt, options } = req.body;

        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            throw new ApiError(400, "INVALID_PROMPT", "A prompt is required to generate content.");
        }

        const jobId = `job_${uuid().replace(/-/g, "").substring(0, 12)}`;
        const now = new Date().toISOString();

        // Create the job record in DynamoDB
        const job: GenerationJob = {
            jobId,
            worldId,
            userId: req.userId!,
            status: "processing",
            stages: [
                { name: "textRefine", status: "pending" },
                { name: "imageGen", status: "pending" },
                { name: "graphUpdate", status: "pending" },
            ],
            progress: 0,
            createdAt: now,
        };

        await dynamodb.send(
            new PutCommand({
                TableName: USERS_TABLE,
                Item: {
                    pk: `WORLD#${worldId}`,
                    sk: `JOB#${jobId}`,
                    GSI1PK: `JOB#${jobId}`,
                    GSI1SK: `JOB#${jobId}`,
                    type: "GENERATION_JOB",
                    ...job,
                },
            })
        );

        // Kick off generation asynchronously (don't await — return 202 immediately)
        runGeneration(worldId, jobId, prompt, req.userId!, options).catch((err) => {
            console.error(`[Generation] Job ${jobId} failed:`, err);
        });

        res.status(202).json({
            jobId,
            status: "processing",
            stages: job.stages,
            estimatedDurationSeconds: 30,
            createdAt: now,
        });
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// GET /worlds/:worldId/generate/:jobId — Poll generation status
// ---------------------------------------------------------------------------
generationRoutes.get("/:worldId/generate/:jobId", async (req: AuthenticatedRequest, res, next) => {
    try {
        const worldId = req.params.worldId as string;
        const jobId = req.params.jobId as string;

        const result = await dynamodb.send(
            new GetCommand({
                TableName: USERS_TABLE,
                Key: {
                    pk: `WORLD#${worldId}`,
                    sk: `JOB#${jobId}`,
                },
            })
        );

        if (!result.Item) {
            throw new ApiError(404, "NOT_FOUND", "Generation job not found.");
        }

        const job = result.Item as GenerationJob;

        res.json({
            jobId: job.jobId,
            status: job.status,
            stages: job.stages,
            progress: job.progress,
            ...(job.result ? { result: job.result } : {}),
            ...(job.error ? { error: job.error } : {}),
            ...(job.completedAt ? { completedAt: job.completedAt } : {}),
        });
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// Asynchronous Generation Pipeline
// ---------------------------------------------------------------------------
async function runGeneration(
    worldId: string,
    jobId: string,
    prompt: string,
    userId: string,
    options?: { style?: string }
) {
    const updateJob = async (updates: Partial<GenerationJob>) => {
        const expressionParts: string[] = [];
        const names: Record<string, string> = {};
        const values: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(updates)) {
            const attrName = `#${key}`;
            const attrValue = `:${key}`;
            expressionParts.push(`${attrName} = ${attrValue}`);
            names[attrName] = key;
            values[attrValue] = value;
        }

        await dynamodb.send(
            new UpdateCommand({
                TableName: USERS_TABLE,
                Key: { pk: `WORLD#${worldId}`, sk: `JOB#${jobId}` },
                UpdateExpression: `SET ${expressionParts.join(", ")}`,
                ExpressionAttributeNames: names,
                ExpressionAttributeValues: values,
            })
        );
    };

    try {
        // ── Stage 1: Text Refinement (Nova Pro) ──────────────────────────
        await updateJob({
            stages: [
                { name: "textRefine", status: "in_progress" },
                { name: "imageGen", status: "pending" },
                { name: "graphUpdate", status: "pending" },
            ],
            progress: 10,
        });

        const textPayload = {
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            text: `You are a world-building AI. Given the following creative prompt, generate a structured world description with:\n1. An expanded world overview (2–3 paragraphs)\n2. 3–5 key locations (each with a name, description, and visual prompt for image generation)\n3. 2–3 factions or groups\n4. A brief history (1 paragraph)\n\nOutput as JSON with keys: overview, locations[], factions[], history.\n\nStyle: ${options?.style ?? "fantasy"}\n\nPrompt: "${prompt}"\n\nRespond ONLY with valid JSON.`,
                        },
                    ],
                },
            ],
            inferenceConfig: {
                maxTokens: 4096,
                temperature: 0.7,
            },
        };

        const textResponse = await bedrock.send(
            new InvokeModelCommand({
                modelId: NOVA_TEXT_MODEL,
                contentType: "application/json",
                accept: "application/json",
                body: JSON.stringify(textPayload),
            })
        );

        const textResult = JSON.parse(new TextDecoder().decode(textResponse.body));
        const assistantMessage = textResult.output?.message?.content?.[0]?.text ?? "{}";

        // Try to parse the JSON from Nova's response
        let worldData;
        try {
            // Extract JSON from potential markdown code blocks
            const jsonMatch = assistantMessage.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            worldData = JSON.parse(jsonMatch ? jsonMatch[1] : assistantMessage);
        } catch {
            worldData = {
                overview: assistantMessage,
                locations: [],
                factions: [],
                history: "",
            };
        }

        await updateJob({
            stages: [
                { name: "textRefine", status: "completed" },
                { name: "imageGen", status: "in_progress" },
                { name: "graphUpdate", status: "pending" },
            ],
            progress: 40,
        });

        // ── Stage 2: Image Generation (Nova Canvas) ──────────────────────
        let thumbnailUrl = "";
        try {
            const imagePrompt = `${prompt}. Cinematic wide-angle establishing shot, ${options?.style ?? "fantasy"} style, dramatic lighting, highly detailed.`;

            const imagePayload = {
                taskType: "TEXT_IMAGE",
                textToImageParams: {
                    text: imagePrompt,
                },
                imageGenerationConfig: {
                    numberOfImages: 1,
                    height: 1024,
                    width: 1024,
                    cfgScale: 8.0,
                },
            };

            const imageResponse = await bedrock.send(
                new InvokeModelCommand({
                    modelId: NOVA_IMAGE_MODEL,
                    contentType: "application/json",
                    accept: "application/json",
                    body: JSON.stringify(imagePayload),
                })
            );

            const imageResult = JSON.parse(new TextDecoder().decode(imageResponse.body));
            const base64Image = imageResult.images?.[0];

            if (base64Image) {
                const imageKey = `worlds/${worldId}/thumbnail.png`;
                await s3.send(
                    new PutObjectCommand({
                        Bucket: ASSETS_BUCKET,
                        Key: imageKey,
                        Body: Buffer.from(base64Image, "base64"),
                        ContentType: "image/png",
                    })
                );
                thumbnailUrl = `https://${ASSETS_BUCKET}.s3.amazonaws.com/${imageKey}`;
            }
        } catch (imgErr) {
            console.error(`[Generation] Image generation failed for job ${jobId}:`, imgErr);
            // Continue without image — text content is still valuable
        }

        await updateJob({
            stages: [
                { name: "textRefine", status: "completed" },
                { name: "imageGen", status: thumbnailUrl ? "completed" : "failed" },
                { name: "graphUpdate", status: "in_progress" },
            ],
            progress: 70,
        });

        // ── Stage 3: Update World Graph ──────────────────────────────────
        const nodes = (worldData.locations ?? []).map((loc: { name: string; description: string; visualPrompt?: string }, i: number) => ({
            id: `nde_${uuid().replace(/-/g, "").substring(0, 8)}`,
            type: "location",
            name: loc.name,
            description: loc.description,
            position: { x: 200 + i * 250, y: 200 + (i % 2) * 150 },
            assets: {},
            metadata: {
                generatedFrom: loc.visualPrompt ?? loc.description,
                version: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        }));

        // Update the world record with generated content
        await dynamodb.send(
            new UpdateCommand({
                TableName: USERS_TABLE,
                Key: { pk: `USER#${userId}`, sk: `WORLD#${worldId}` },
                UpdateExpression: "SET #status = :status, #worldGraph = :worldGraph, #thumbnailUrl = :thumbnailUrl, #description = :description, #generationCount = if_not_exists(#generationCount, :zero) + :one, #updatedAt = :updatedAt",
                ExpressionAttributeNames: {
                    "#status": "status",
                    "#worldGraph": "worldGraph",
                    "#thumbnailUrl": "thumbnailUrl",
                    "#description": "description",
                    "#generationCount": "generationCount",
                    "#updatedAt": "updatedAt",
                },
                ExpressionAttributeValues: {
                    ":status": "active",
                    ":worldGraph": { nodes, edges: [] },
                    ":thumbnailUrl": thumbnailUrl,
                    ":description": worldData.overview ?? "",
                    ":zero": 0,
                    ":one": 1,
                    ":updatedAt": new Date().toISOString(),
                },
            })
        );

        // ── Mark job complete ────────────────────────────────────────────
        await updateJob({
            status: "completed",
            stages: [
                { name: "textRefine", status: "completed" },
                { name: "imageGen", status: thumbnailUrl ? "completed" : "failed" },
                { name: "graphUpdate", status: "completed" },
            ],
            progress: 100,
            result: {
                nodesCreated: nodes.map((n: { id: string }) => n.id),
                edgesCreated: [],
                thumbnailUrl,
                worldData,
            },
            completedAt: new Date().toISOString(),
        });
    } catch (err) {
        console.error(`[Generation] Pipeline failed for job ${jobId}:`, err);
        await updateJob({
            status: "failed",
            error: (err as Error).message,
            progress: 0,
        });
    }
}
