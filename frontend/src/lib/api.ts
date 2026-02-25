/**
 * API client for communicating with the OT-Muse Lambda backend.
 * Injects Auth.js session headers (x-user-id, x-user-email) automatically.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface ApiClientOptions {
    userId?: string;
    userEmail?: string;
}

async function apiFetch<T>(
    path: string,
    options: RequestInit & ApiClientOptions = {}
): Promise<T> {
    const { userId, userEmail, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(userId ? { "x-user-id": userId } : {}),
        ...(userEmail ? { "x-user-email": userEmail } : {}),
        ...(fetchOptions.headers as Record<string, string> ?? {}),
    };

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...fetchOptions,
        headers,
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message = errorBody?.error?.message ?? `API error: ${response.status}`;
        const error = new Error(message) as Error & { status: number; code: string };
        error.status = response.status;
        error.code = errorBody?.error?.code ?? "UNKNOWN";
        throw error;
    }

    return response.json();
}

// ---------------------------------------------------------------------------
// World types (matching backend)
// ---------------------------------------------------------------------------
export interface World {
    worldId: string;
    title: string;
    description: string;
    style: string;
    status: "draft" | "active" | "archived";
    ownerId: string;
    thumbnailUrl?: string;
    collaboratorCount: number;
    generationCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface WorldListResponse {
    worlds: World[];
    nextToken?: string;
    totalCount: number;
}

export interface GenerationJob {
    jobId: string;
    status: "processing" | "completed" | "failed";
    stages: { name: string; status: string }[];
    progress: number;
    estimatedDurationSeconds?: number;
    result?: {
        nodesCreated: string[];
        thumbnailUrl: string;
        worldData: {
            overview: string;
            locations: { name: string; description: string }[];
            factions: { name: string; description: string }[];
            history: string;
        };
    };
    error?: string;
    completedAt?: string;
}

// ---------------------------------------------------------------------------
// Worlds API
// ---------------------------------------------------------------------------
export const worldsApi = {
    create: (data: { title: string; description?: string; style?: string }, auth: ApiClientOptions) =>
        apiFetch<World>("/worlds", {
            method: "POST",
            body: JSON.stringify(data),
            ...auth,
        }),

    list: (params: { status?: string; limit?: number } = {}, auth: ApiClientOptions) => {
        const query = new URLSearchParams();
        if (params.status) query.set("status", params.status);
        if (params.limit) query.set("limit", String(params.limit));
        const qs = query.toString();
        return apiFetch<WorldListResponse>(`/worlds${qs ? `?${qs}` : ""}`, { ...auth });
    },

    get: (worldId: string, auth: ApiClientOptions) =>
        apiFetch<World>(`/worlds/${worldId}`, { ...auth }),

    update: (worldId: string, data: Partial<World>, auth: ApiClientOptions) =>
        apiFetch<World>(`/worlds/${worldId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            ...auth,
        }),

    delete: (worldId: string, auth: ApiClientOptions) =>
        apiFetch<{ message: string; worldId: string }>(`/worlds/${worldId}`, {
            method: "DELETE",
            ...auth,
        }),

    archive: (worldId: string, archived: boolean, auth: ApiClientOptions) =>
        apiFetch<{ worldId: string; status: string }>(`/worlds/${worldId}/archive`, {
            method: "PATCH",
            body: JSON.stringify({ archived }),
            ...auth,
        }),
};

// ---------------------------------------------------------------------------
// Generation API
// ---------------------------------------------------------------------------
export const generationApi = {
    generate: (worldId: string, data: { prompt: string; options?: { style?: string } }, auth: ApiClientOptions) =>
        apiFetch<GenerationJob>(`/worlds/${worldId}/generate`, {
            method: "POST",
            body: JSON.stringify(data),
            ...auth,
        }),

    getJob: (worldId: string, jobId: string, auth: ApiClientOptions) =>
        apiFetch<GenerationJob>(`/worlds/${worldId}/generate/${jobId}`, { ...auth }),
};

// ---------------------------------------------------------------------------
// Users API
// ---------------------------------------------------------------------------
export const usersApi = {
    getMe: (auth: ApiClientOptions) =>
        apiFetch<{
            userId: string;
            email: string;
            displayName: string;
            archetype: string | null;
            preferences: Record<string, unknown>;
            stats: { worldsCreated: number; totalPrompts: number };
        }>("/users/me", { ...auth }),

    updateMe: (data: { displayName?: string; preferences?: Record<string, unknown> }, auth: ApiClientOptions) =>
        apiFetch<{ userId: string; updatedAt: string }>("/users/me", {
            method: "PUT",
            body: JSON.stringify(data),
            ...auth,
        }),
};
