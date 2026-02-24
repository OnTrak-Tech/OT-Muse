"use client";

import React from "react";

export default function AIEngineSettingsPage() {
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
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
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
                                        defaultValue="Sci-Fi Realism"
                                    >
                                        <option>Cyberpunk Noir</option>
                                        <option>High Fantasy Watercolor</option>
                                        <option>Sci-Fi Realism</option>
                                        <option>Steampunk Etching</option>
                                        <option>Low Poly 3D</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    <div
                                        className="aspect-square rounded-lg bg-cover bg-center border-2 border-primary cursor-pointer opacity-100 transition-opacity"
                                        aria-label="Abstract sci-fi landscape with neon lights"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvKmgE69sV7V6h8oYGxdEHfePw4Ab_d4CzcEnLPskepi2RPxhomc6ZiDXxdI-UNUkOqaB1ILoA1FVizThbicWXDH35Xx0Sp_7v3_-nTq7JVGxbvrg-Wz_xebxYLvKUgloSOSRbRnaPp02CEk-O0KNmrZopkWEKKvMQFs0ToDAOKl1w-YDjDfyYdHUeKjNOIIl8xWWt0e3fnbfpjOuRHSK5vH8ORSjMO9wPqfPaMj-BJp_bkRRN_eq377cA7cWfKs0yOwG53A-hps')" }}
                                    />
                                    <div
                                        className="aspect-square rounded-lg bg-cover bg-center border border-transparent cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                                        aria-label="Dark moody cyberpunk city street"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDp-lEMeEKvP2nm35EZWBu7CoJlPomh-FOCDpQSt9aGW1Qo7x_kGc1C-fZObNmKghI7cfbrPPUG7fGOhgZXfB4S1660e01Z51M-NxHwyBIMeuzbK0y2SKWE7siZhKcGxXpYEpngU_KfzmBlryIbQlCFqnkSp9arO9B4Gq2bA-li17uwSVhk4TSVvcugwoCn8_wPut3McigIF0MqlLKoaHKs_zMq9e3nM3obQPQG476xUunvdUIFx2uCzkGODXnsiGCgxUEzV75wR7M')" }}
                                    />
                                    <div
                                        className="aspect-square rounded-lg bg-cover bg-center border border-transparent cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
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
                                        defaultValue="65"
                                    />
                                    <div className="flex justify-between text-xs text-text-muted mt-3 font-medium uppercase tracking-wider">
                                        <span>Strict Logic</span>
                                        <span className="text-primary">Balanced (65%)</span>
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
                                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Pro Feature</span>
                                </div>
                                <p className="text-text-secondary text-sm max-w-3xl">
                                    Determine how much of the conversation history the AI considers when generating new responses. Higher context allows for better continuity in long campaigns.
                                </p>
                                <div className="w-full bg-surface-elevated rounded-full h-2.5 mb-1 mt-2">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "75%" }}></div>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-text-muted">
                                    <span>4k Tokens</span>
                                    <span className="text-foreground whitespace-nowrap">12k Tokens</span>
                                    <span>32k Tokens</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border px-6 lg:px-20 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
                <button className="text-text-muted hover:text-foreground text-sm font-medium transition-colors">
                    Reset Defaults
                </button>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-bold hover:bg-surface-elevated hover:text-foreground transition-colors">
                        Cancel
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/25 hover:from-primary-light hover:to-primary transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </main>
    );
}
