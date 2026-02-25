"use client";

import React, { useState, useEffect, useCallback } from "react";
import StatsCards from "@/components/dashboard/StatsCards";
import WorldFilters from "@/components/dashboard/WorldFilters";
import WorldCard from "@/components/dashboard/WorldCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { worldsApi, World } from "@/lib/api";
import { getVocabulary } from "@/lib/domainVocabulary";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [worlds, setWorlds] = useState<World[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const archetype = (session?.user as { archetype?: string })?.archetype;
    const vocab = getVocabulary(archetype);

    const fetchWorlds = useCallback(async () => {
        if (!session?.user) return;

        try {
            setLoading(true);
            setError(null);
            const user = session.user as { id?: string; email?: string };
            const result = await worldsApi.list({}, {
                userId: user.id,
                userEmail: user.email ?? undefined,
            });
            setWorlds(result.worlds);
        } catch (err) {
            console.error("Failed to fetch worlds:", err);
            setError("Could not load your " + vocab.worlds.toLowerCase() + ". The backend may not be running yet.");
        } finally {
            setLoading(false);
        }
    }, [session, vocab.worlds]);

    useEffect(() => {
        fetchWorlds();
    }, [fetchWorlds]);

    // Format dates for display
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return "Edited just now";
        if (diffHours < 24) return `Edited ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
        if (diffDays < 7) return `Edited ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
        return `Edited ${date.toLocaleDateString()}`;
    };

    return (
        <div className="pb-10">
            <StatsCards
                totalWorlds={worlds.length}
                totalGenerations={worlds.reduce((sum, w) => sum + (w.generationCount ?? 0), 0)}
                vocabWorlds={vocab.worlds}
            />
            <WorldFilters />

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
                        <p className="text-text-secondary">Loading your {vocab.worlds.toLowerCase()}...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {!loading && error && (
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4 max-w-md text-center">
                        <span className="material-symbols-outlined text-4xl text-text-muted">cloud_off</span>
                        <p className="text-text-secondary">{error}</p>
                        <button
                            onClick={fetchWorlds}
                            className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[16px]">refresh</span>
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && worlds.length === 0 && (
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4 max-w-md text-center">
                        <span className="material-symbols-outlined text-6xl text-text-muted">explore</span>
                        <h2 className="text-2xl font-bold text-foreground">No {vocab.worlds.toLowerCase()} yet</h2>
                        <p className="text-text-secondary">
                            Create your first {vocab.world.toLowerCase()} to get started with AI-powered generation.
                        </p>
                        <Link
                            href="/worlds/create"
                            className="mt-2 bg-primary hover:bg-primary-light text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">add</span>
                            {vocab.createWorld}
                        </Link>
                    </div>
                </div>
            )}

            {/* Grid Layout */}
            {!loading && !error && worlds.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {worlds.map((world) => (
                        <WorldCard
                            key={world.worldId}
                            title={world.title}
                            imageUrl={world.thumbnailUrl || ""}
                            theme={world.style}
                            lastEdited={formatDate(world.updatedAt)}
                            collaboratorCount={world.collaboratorCount ?? 0}
                            generationCount={world.generationCount ?? 0}
                        />
                    ))}

                    {/* Create New Card */}
                    <Link
                        href="/worlds/create"
                        className="group bg-transparent rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center h-full min-h-[340px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-surface-elevated group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                            <span className="material-symbols-outlined text-3xl text-text-muted group-hover:text-primary">add</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{vocab.createWorld}</h3>
                        <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors text-center px-8">
                            Generate a setting from scratch or use a template
                        </p>
                    </Link>
                </div>
            )}
        </div>
    );
}
