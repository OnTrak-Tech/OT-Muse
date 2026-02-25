import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import * as worldService from "../services/worldService";

export const worldRoutes = Router();

// All world routes require authentication
worldRoutes.use(requireAuth);

// ---------------------------------------------------------------------------
// POST /worlds — Create a new world
// ---------------------------------------------------------------------------
worldRoutes.post("/", async (req: AuthenticatedRequest, res, next) => {
    try {
        const { title, description, style, settings } = req.body;

        if (!title || typeof title !== "string" || title.trim().length === 0) {
            throw new ApiError(400, "INVALID_INPUT", "Title is required.");
        }

        const world = await worldService.createWorld(req.userId!, {
            title: title.trim(),
            description,
            style,
            settings,
        });

        res.status(201).json(world);
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// GET /worlds — List user's worlds
// ---------------------------------------------------------------------------
worldRoutes.get("/", async (req: AuthenticatedRequest, res, next) => {
    try {
        const { filter, status, limit, nextToken } = req.query;

        const result = await worldService.listWorlds(req.userId!, {
            filter: filter as "owned" | "shared" | "all" | undefined,
            status: status as "active" | "archived" | "all" | undefined,
            limit: limit ? parseInt(limit as string, 10) : undefined,
            nextToken: nextToken as string | undefined,
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// GET /worlds/:worldId — Get a single world
// ---------------------------------------------------------------------------
worldRoutes.get("/:worldId", async (req: AuthenticatedRequest, res, next) => {
    try {
        const worldId = req.params.worldId as string;
        const world = await worldService.getWorld(worldId);

        if (!world) {
            throw new ApiError(404, "WORLD_NOT_FOUND", "World does not exist.");
        }

        // Verify access (owner or collaborator)
        if (world.ownerId !== req.userId) {
            throw new ApiError(403, "ACCESS_DENIED", "You do not have access to this world.");
        }

        res.json(world);
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// PUT /worlds/:worldId — Update world metadata
// ---------------------------------------------------------------------------
worldRoutes.put("/:worldId", async (req: AuthenticatedRequest, res, next) => {
    try {
        const { title, description, style, settings, thumbnailUrl } = req.body;

        const worldId = req.params.worldId as string;

        const updated = await worldService.updateWorld(req.userId!, worldId, {
            title,
            description,
            style,
            settings,
            thumbnailUrl,
        });

        if (!updated) {
            throw new ApiError(404, "WORLD_NOT_FOUND", "World does not exist or you are not the owner.");
        }

        res.json(updated);
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// DELETE /worlds/:worldId — Delete a world
// ---------------------------------------------------------------------------
worldRoutes.delete("/:worldId", async (req: AuthenticatedRequest, res, next) => {
    try {
        const worldId = req.params.worldId as string;
        const deleted = await worldService.deleteWorld(req.userId!, worldId);

        if (!deleted) {
            throw new ApiError(404, "WORLD_NOT_FOUND", "World does not exist or you are not the owner.");
        }

        res.json({ message: "World deleted successfully.", worldId });
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// PATCH /worlds/:worldId/archive — Archive or unarchive
// ---------------------------------------------------------------------------
worldRoutes.patch("/:worldId/archive", async (req: AuthenticatedRequest, res, next) => {
    try {
        const { archived } = req.body;

        if (typeof archived !== "boolean") {
            throw new ApiError(400, "INVALID_INPUT", "\"archived\" must be a boolean.");
        }

        const worldId = req.params.worldId as string;
        const updated = await worldService.archiveWorld(req.userId!, worldId, archived);

        if (!updated) {
            throw new ApiError(404, "WORLD_NOT_FOUND", "World does not exist or you are not the owner.");
        }

        res.json({
            worldId,
            status: updated.status,
            updatedAt: updated.updatedAt,
        });
    } catch (err) {
        next(err);
    }
});
