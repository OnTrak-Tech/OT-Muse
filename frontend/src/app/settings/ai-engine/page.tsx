"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usersApi } from "@/lib/api";

export default function AIEngineSettingsPage() {
    const { data: session } = useSession();
    const user = session?.user as { id?: string; email?: string } | undefined;

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Form state
    const [preferences, setPreferences] = useState<Record<string, any>>({
        highQualityGenerations: true,
        defaultArtStyle: "Sci-Fi Realism",
        creativityVsLogic: 65,
        contextMemoryLimit: 12000,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id || !user?.email) return;
            try {
                const data = await usersApi.getMe({ userId: user.id, userEmail: user.email });
                if (data.preferences) {
                    setPreferences(prev => ({ ...prev, ...data.preferences }));
                }
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const handleSave = async () => {
        if (!user?.id || !user?.email) return;

        setIsSaving(true);
        setSaveMessage(null);

        try {
            await usersApi.updateMe({
                preferences
            }, { userId: user.id, userEmail: user.email });

            setSaveMessage({ type: "success", text: "Settings saved successfully!" });
            setTimeout(() => setSaveMessage(null), 3000);
        } catch (error: any) {
            console.error("Failed to save settings", error);
            setSaveMessage({ type: "error", text: error.message || "Failed to save settings" });
        } finally {
            setIsSaving(false);
        }
    };

    const handlePreferenceChange = (key: string, value: any) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <main className="flex-1 flex flex-col items-center justify-center bg-background">
                <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-20 scroll-smooth">
                <div className="max-w-4xl mx-auto pb-24">
                    {/* Header Section */}
                    <div className="flex flex-col gap-2 mb-10">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                            <span className="material-symbols-outlined text-[18px]">psychology</span>
                            <span>AI Configuration</span>
                        </div>
                        <h1 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight">AI Engine Settings</h1>
                        <p className="text-text-secondary text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                            Configure how the AI generates your world content, interacts with your prompts, and manages creative freedom.
                        </p>
                    </div>

                    {/* Settings Sections */}
                    <div className="flex flex-col gap-8">
                        {/* Generation Quality Card */}
                        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="text-primary bg-primary/10 flex items-center justify-center rounded-lg shrink-0 size-12">
                                        <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-foreground text-lg font-semibold leading-normal">High-Quality Generations</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed mt-1 max-w-md">
                                            Uses advanced models (GPT-4o equivalent) for more detailed outputs. This consumes more tokens and has a slower generation time.
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 pt-2">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={!!preferences.highQualityGenerations}
                                            onChange={(e) => handlePreferenceChange("highQualityGenerations", e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Art Style & Creativity Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Art Style */}
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="material-symbols-outlined text-text-muted">palette</span>
                                    <h3 className="text-foreground text-lg font-semibold">Default Art Style</h3>
                                </div>
                                <p className="text-text-secondary text-sm mb-2">Select the visual aesthetic for generated location images and character portraits.</p>
                                <div className="relative">
                                    <select
                                        className="appearance-none w-full bg-background border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block p-3 pr-10 outline-none transition-colors cursor-pointer"
                                        value={preferences.defaultArtStyle || "Sci-Fi Realism"}
                                        onChange={(e) => handlePreferenceChange("defaultArtStyle", e.target.value)}
                                    >
                                        <option value="Cyberpunk Noir">Cyberpunk Noir</option>
                                        <option value="High Fantasy Watercolor">High Fantasy Watercolor</option>
                                        <option value="Sci-Fi Realism">Sci-Fi Realism</option>
                                        <option value="Steampunk Etching">Steampunk Etching</option>
                                        <option value="Low Poly 3D">Low Poly 3D</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    <div
                                        className={`aspect-square rounded-lg bg-cover bg-center border-2 cursor-pointer transition-opacity ${preferences.defaultArtStyle === "Cyberpunk Noir" || preferences.defaultArtStyle === "Sci-Fi Realism" ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}
                                        onClick={() => handlePreferenceChange("defaultArtStyle", "Sci-Fi Realism")}
                                        aria-label="Abstract sci-fi landscape with neon lights"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvKmgE69sV7V6h8oYGxdEHfePw4Ab_d4CzcEnLPskepi2RPxhomc6ZiDXxdI-UNUkOqaB1ILoA1FVizThbicWXDH35Xx0Sp_7v3_-nTq7JVGxbvrg-Wz_xebxYLvKUgloSOSRbRnaPp02CEk-O0KNmrZopkWEKKvMQFs0ToDAOKl1w-YDjDfyYdHUeKjNOIIl8xWWt0e3fnbfpjOuRHSK5vH8ORSjMO9wPqfPaMj-BJp_bkRRN_eq377cA7cWfKs0yOwG53A-hps')" }}
                                    />
                                    <div
                                        className={`aspect-square rounded-lg bg-cover bg-center border-2 cursor-pointer transition-opacity ${preferences.defaultArtStyle === "Steampunk Etching" || preferences.defaultArtStyle === "Low Poly 3D" ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}
                                        onClick={() => handlePreferenceChange("defaultArtStyle", "Low Poly 3D")}
                                        aria-label="Dark moody cyberpunk city street"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDp-lEMeEKvP2nm35EZWBu7CoJlPomh-FOCDpQSt9aGW1Qo7x_kGc1C-fZObNmKghI7cfbrPPUG7fGOhgZXfB4S1660e01Z51M-NxHwyBIMeuzbK0y2SKWE7siZhKcGxXpYEpngU_KfzmBlryIbQlCFqnkSp9arO9B4Gq2bA-li17uwSVhk4TSVvcugwoCn8_wPut3McigIF0MqlLKoaHKs_zMq9e3nM3obQPQG476xUunvdUIFx2uCzkGODXnsiGCgxUEzV75wR7M')" }}
                                    />
                                    <div
                                        className={`aspect-square rounded-lg bg-cover bg-center border-2 cursor-pointer transition-opacity ${preferences.defaultArtStyle === "High Fantasy Watercolor" ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}
                                        onClick={() => handlePreferenceChange("defaultArtStyle", "High Fantasy Watercolor")}
                                        aria-label="Detailed fantasy book illustration style"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6DpMb8Kis_w352jNtp5Nmun-XoZ3PpeH2gAhOEGBVBuxyjwnOg9OtkRpF5n9yGaymStvEvKDZNygCXWK5ji6bHbrqUd3lTfAwytMxrpfFc1V2lXIfPERIiPJCHl3cvpLnp17RxAxsSDj2yT0Ow06p_M6YOFeyNc-yVj-5KlS7IDnTIj1eddsZWxw3Os2e9YSjcly81TwVveU8UEryQNgtx2ec0n33s-NyHnls0WgnNNoOPXIKfmnI7TTWm3-PW1GDLcNPEbUV858')" }}
                                    />
                                </div>
                            </div>

                            {/* Creativity vs Logic */}
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="material-symbols-outlined text-text-muted">tune</span>
                                        <h3 className="text-foreground text-lg font-semibold">Creativity vs. Logic</h3>
                                    </div>
                                    <p className="text-text-secondary text-sm mb-6">Balance between wild, imaginative hallucinations and strict adherence to established world rules.</p>
                                </div>
                                <div className="px-2">
                                    <input
                                        className="w-full h-2 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary outline-none"
                                        max="100"
                                        min="0"
                                        type="range"
                                        value={preferences.creativityVsLogic || 65}
                                        onChange={(e) => handlePreferenceChange("creativityVsLogic", parseInt(e.target.value))}
                                    />
                                    <div className="flex justify-between text-xs text-text-muted mt-3 font-medium uppercase tracking-wider">
                                        <span>Strict Logic</span>
                                        <span className="text-primary">{preferences.creativityVsLogic == 65 ? "Balanced (65%)" : `${preferences.creativityVsLogic}%`}</span>
                                        <span>Pure Chaos</span>
                                    </div>
                                </div>
                                <div className="mt-8 bg-background rounded-lg p-4 border border-border">
                                    <div className="flex gap-2 items-start">
                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
                                        <p className="text-xs text-text-secondary">Higher creativity values may result in inconsistencies with previously generated lore but provide more unique concepts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Context Memory */}
                        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-text-muted">history</span>
                                        <h3 className="text-foreground text-lg font-semibold">Context Memory Limit</h3>
                                    </div>
                                </div>
                                <p className="text-text-secondary text-sm max-w-3xl">
                                    Determine how much of the conversation history the AI considers when generating new responses. Higher context allows for better continuity in long campaigns.
                                </p>

                                <div className="px-1 mt-4">
                                    <input
                                        className="w-full h-2 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary outline-none"
                                        max="32000"
                                        min="4000"
                                        step="4000"
                                        type="range"
                                        value={preferences.contextMemoryLimit || 12000}
                                        onChange={(e) => handlePreferenceChange("contextMemoryLimit", parseInt(e.target.value))}
                                    />
                                    <div className="flex justify-between text-sm font-medium text-text-muted mt-3">
                                        <span>4k Tokens</span>
                                        <span className="text-foreground whitespace-nowrap">{preferences.contextMemoryLimit ? `${(preferences.contextMemoryLimit / 1000)}k` : "12k"} Tokens</span>
                                        <span>32k Tokens</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border px-6 lg:px-20 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-10 transition-all">
                <div className="flex items-center gap-2 flex-1">
                    {saveMessage && (
                        <div className={`text-sm font-medium flex items-center gap-2 ${saveMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                            <span className="material-symbols-outlined text-[18px]">
                                {saveMessage.type === 'success' ? 'check_circle' : 'error'}
                            </span>
                            {saveMessage.text}
                        </div>
                    )}
                </div>

                <div className="flex gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-bold hover:bg-surface-elevated hover:text-foreground transition-colors"
                        disabled={isSaving}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/25 hover:from-primary-light hover:to-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                                Saving...
                            </>
                        ) : "Save Changes"}
                    </button>
                </div>
            </div>
        </main>
    );
}
