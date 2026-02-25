"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { worldsApi, generationApi } from "@/lib/api";
import { getVocabulary, getArchetypes } from "@/lib/domainVocabulary";

type GenerationStage = {
    name: string;
    status: string;
};

export default function CreateWorldPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStages, setGenerationStages] = useState<GenerationStage[]>([]);
    const [generationProgress, setGenerationProgress] = useState(0);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [localArchetype, setLocalArchetype] = useState<string | null>(null);
    const [isArchetypeModalOpen, setIsArchetypeModalOpen] = useState(false);

    // Use local archetype override if set, otherwise fallback to user's profile archetype or Game Dev
    const currentArchetype = localArchetype ?? (session?.user as { archetype?: string })?.archetype ?? "Game Dev";
    const vocab = getVocabulary(currentArchetype);

    const getIconForArchetype = (type: string) => {
        switch (type) {
            case "Architecture": return "location_city";
            case "Game Dev": return "sports_esports";
            case "Urban Planning": return "alt_route";
            case "Tabletop & Creative Writing": return "menu_book";
            case "Other": return "dashboard_customize";
            default: return "category";
        }
    };

    const getStageLabel = (name: string) => {
        switch (name) {
            case "textRefine": return "Generating Lore & Descriptions";
            case "imageGen": return "Creating Concept Art";
            case "graphUpdate": return "Building World Graph";
            default: return name;
        }
    };

    const getStageIcon = (status: string) => {
        switch (status) {
            case "completed": return "check_circle";
            case "in_progress": return "progress_activity";
            case "failed": return "error";
            default: return "radio_button_unchecked";
        }
    };

    // Poll generation job status
    const pollJob = async (worldId: string, jobId: string, auth: { userId: string; userEmail: string }) => {
        const maxPolls = 60; // 2 minutes max
        let polls = 0;

        while (polls < maxPolls) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            polls++;

            try {
                const job = await generationApi.getJob(worldId, jobId, auth);
                setGenerationStages(job.stages);
                setGenerationProgress(job.progress);

                if (job.status === "completed") {
                    return job;
                }
                if (job.status === "failed") {
                    throw new Error(job.error || "Generation failed");
                }
            } catch (err) {
                throw err;
            }
        }

        throw new Error("Generation timed out");
    };

    const handleGenerate = async () => {
        if (!prompt.trim() || !session?.user) return;

        const user = session.user as { id?: string; email?: string };
        const auth = { userId: user.id ?? "", userEmail: user.email ?? "" };

        setIsGenerating(true);
        setGenerationError(null);

        try {
            // Step 1: Create the world
            const world = await worldsApi.create(
                { title: prompt.trim().substring(0, 60), description: prompt.trim(), style: currentArchetype },
                auth
            );

            // Step 2: Start generation
            const genJob = await generationApi.generate(
                world.worldId,
                { prompt: prompt.trim(), options: { style: currentArchetype } },
                auth
            );

            setGenerationStages(genJob.stages);
            setGenerationProgress(0);

            // Step 3: Poll for completion
            await pollJob(world.worldId, genJob.jobId, auth);

            // Step 4: Redirect to dashboard (or future world detail page)
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "An unexpected error occurred";
            setGenerationError(message);
            console.error("Generation failed:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-background min-h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 lg:ml-72 flex flex-col h-screen relative">
                <DashboardHeader
                    breadcrumbItems={[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: `My ${vocab.worlds}`, href: "/dashboard" },
                        { label: "Create New" }
                    ]}
                />

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth flex justify-center">
                    <div className="max-w-4xl w-full">
                        {/* Title Section — Domain-Adaptive */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-foreground mb-4">{vocab.createPageTitle}</h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {vocab.createPageSubtitle}
                            </p>
                        </div>

                        {/* Generation Progress Overlay */}
                        {isGenerating && (
                            <div className="bg-surface border border-primary/30 rounded-2xl p-8 mb-8 shadow-xl shadow-primary/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined text-2xl text-primary animate-spin">progress_activity</span>
                                    <h2 className="text-xl font-bold text-foreground">Generating your {vocab.world.toLowerCase()}...</h2>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-background rounded-full mb-6 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
                                        style={{ width: `${generationProgress}%` }}
                                    />
                                </div>

                                {/* Stage Status */}
                                <div className="space-y-3">
                                    {generationStages.map((stage) => (
                                        <div key={stage.name} className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined text-[20px] ${stage.status === "completed" ? "text-primary" :
                                                stage.status === "in_progress" ? "text-primary animate-spin" :
                                                    stage.status === "failed" ? "text-red-400" :
                                                        "text-text-muted"
                                                }`}>
                                                {getStageIcon(stage.status)}
                                            </span>
                                            <span className={`text-sm ${stage.status === "completed" ? "text-text-primary" :
                                                stage.status === "in_progress" ? "text-foreground font-medium" :
                                                    "text-text-muted"
                                                }`}>
                                                {getStageLabel(stage.name)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Error Banner */}
                        {generationError && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                                <span className="material-symbols-outlined text-red-400">error</span>
                                <div>
                                    <p className="text-sm text-red-300 font-medium">Generation failed</p>
                                    <p className="text-sm text-red-400/80 mt-1">{generationError}</p>
                                </div>
                                <button
                                    onClick={() => setGenerationError(null)}
                                    className="ml-auto text-red-400 hover:text-red-300"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>
                        )}

                        {/* Form Container */}
                        <div className={`bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-xl shadow-black/20 ${isGenerating ? "opacity-50 pointer-events-none" : ""}`}>

                            {/* Prompt Input */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-3">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Initial Prompt</label>
                                    <button className="text-primary text-sm font-medium hover:text-primary-light transition-colors flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                                        Inspire Me
                                    </button>
                                </div>
                                <div className="relative">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder={vocab.promptHint}
                                        className="w-full h-40 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-4 text-foreground placeholder:text-text-muted/50 resize-none transition-all outline-none"
                                        disabled={isGenerating}
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs bg-surface-elevated px-2 py-1 rounded text-text-muted font-mono">
                                        {prompt.length} / 2048
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Archetype Selection */}
                                <div>
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-3">Archetype</label>
                                    <div className="flex gap-4 pb-2">
                                        {/* Current Default Archetype Card */}
                                        <button
                                            type="button"
                                            className="relative w-32 h-20 rounded-xl flex items-center justify-center flex-col gap-1 transition-all overflow-hidden shrink-0 border-2 border-primary shadow-lg shadow-primary/20 bg-surface"
                                        >
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                                            <span className="material-symbols-outlined text-primary">
                                                {getIconForArchetype(currentArchetype)}
                                            </span>
                                            <span className="text-sm font-bold text-foreground text-center px-1 leading-tight">
                                                {currentArchetype}
                                            </span>
                                        </button>

                                        {/* Change/Add Archetype Button */}
                                        <button
                                            type="button"
                                            onClick={() => setIsArchetypeModalOpen(true)}
                                            className="relative w-20 h-20 rounded-xl flex items-center justify-center flex-col gap-1 transition-all overflow-hidden shrink-0 border-2 border-dashed border-border hover:border-text-secondary hover:bg-surface-elevated group"
                                        >
                                            <span className="material-symbols-outlined text-text-muted group-hover:text-foreground transition-colors text-[24px]">
                                                add
                                            </span>
                                            <span className="text-[10px] font-bold text-text-muted group-hover:text-foreground transition-colors uppercase tracking-wider mt-1">
                                                Change
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Configuration Accordion */}
                            <div className="border-t border-border pt-6 mb-8">
                                <button
                                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                                    className="flex items-center justify-center gap-2 w-full text-sm text-text-muted hover:text-foreground transition-colors"
                                >
                                    Advanced Configuration
                                    <span className="material-symbols-outlined text-[18px]">
                                        {isAdvancedOpen ? 'expand_less' : 'expand_more'}
                                    </span>
                                </button>

                                {isAdvancedOpen && (
                                    <div className="mt-4 p-4 bg-background rounded-xl border border-border text-sm text-text-secondary text-center">
                                        Advanced settings parameters will be available in a future update.
                                    </div>
                                )}
                            </div>

                            {/* Generate Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !prompt.trim()}
                                    className={`font-bold py-4 px-12 rounded-xl shadow-lg transition-all transform flex items-center gap-3 ${isGenerating || !prompt.trim()
                                        ? "bg-surface-elevated text-text-muted cursor-not-allowed shadow-none"
                                        : "bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white shadow-primary/30 hover:-translate-y-1"
                                        }`}
                                >
                                    <span className="material-symbols-outlined">
                                        {isGenerating ? "progress_activity" : "auto_awesome"}
                                    </span>
                                    {isGenerating ? "GENERATING..." : vocab.generateCta}
                                </button>
                            </div>
                        </div>

                        {/* Bottom Feature Badges */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-text-muted">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">history_edu</span>
                                Generates {vocab.lore}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">public</span>
                                Builds 3D Geography
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">groups</span>
                                Populates {vocab.factions}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
