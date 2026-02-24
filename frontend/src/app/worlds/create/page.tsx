"use client";

import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { useSession } from "next-auth/react";

export default function CreateWorldPage() {
    const { data: session } = useSession();
    const [prompt, setPrompt] = useState("");
    // Default to Sci-Fi, but will be overwritten if user has an archetype in session
    const [archetype, setArchetype] = useState("Sci-Fi");
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    useEffect(() => {
        // In a real app the archetype would be returned as part of the customized session.user object.
        // For now, if we detect one in the session, we set it.
        const userArchetype = (session?.user as { archetype?: string })?.archetype;
        if (userArchetype) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setArchetype(userArchetype);
        }
    }, [session]);

    const getIconForArchetype = (type: string) => {
        switch (type) {
            case "Architecture": return "location_city";
            case "Game Dev": return "sports_esports";
            case "Urban Planning": return "alt_route";
            case "Creatives": return "menu_book";
            case "Other": return "dashboard_customize";
            default: return "category"; // fallback
        }
    };

    return (
        <div className="bg-background min-h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 lg:ml-72 flex flex-col h-screen relative">
                <DashboardHeader
                    breadcrumbItems={[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "My Worlds", href: "/dashboard" },
                        { label: "Create New" }
                    ]}
                />

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth flex justify-center">
                    <div className="max-w-4xl w-full">
                        {/* Title Section */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-foreground mb-4">Architect Your Reality</h1>
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                Describe the foundations of your universe. The Nova Engine will extrapolate the history, geography, and inhabitants.
                            </p>
                        </div>

                        {/* Form Container */}
                        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-xl shadow-black/20">

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
                                        placeholder="In a realm where gravity is optional and time flows backward, a civilization built entirely on the backs of giant migratory cloud-whales struggles to maintain..."
                                        className="w-full h-40 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-4 text-foreground placeholder:text-text-muted/50 resize-none transition-all outline-none"
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
                                                {getIconForArchetype(archetype)}
                                            </span>
                                            <span className="text-sm font-bold text-foreground text-center px-1 leading-tight">
                                                {archetype}
                                            </span>
                                        </button>

                                        {/* Change/Add Archetype Button */}
                                        <button
                                            type="button"
                                            onClick={() => alert("Archetype switcher modal will open here")}
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
                                        Advanced settings parameters will be available in Phase 2.
                                    </div>
                                )}
                            </div>

                            {/* Generate Button */}
                            <div className="flex justify-center">
                                <button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1 flex items-center gap-3">
                                    <span className="material-symbols-outlined">auto_awesome</span>
                                    GENERATE WORLD
                                </button>
                            </div>
                        </div>

                        {/* Bottom Feature Badges */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-text-muted">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">history_edu</span>
                                Generates Lore & History
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">public</span>
                                Builds 3D Geography
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">groups</span>
                                Populates Factions
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
