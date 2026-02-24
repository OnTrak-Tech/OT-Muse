"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUserArchetype } from "@/app/actions/user";

export default function OnboardingClient() {
    const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const archetypes = [
        {
            id: "Architecture",
            title: "Architecture & Real Estate",
            description: "Design buildings, urban layouts, and visual pitch concepts with precise structure.",
            icon: "location_city",
        },
        {
            id: "Game Dev",
            title: "Game Studios & Indie Devs",
            description: "Generate consistent environmental asset pipelines and unified 'World Bibles'.",
            icon: "sports_esports",
        },
        {
            id: "Urban Planning",
            title: "Urban Planning & Civil",
            description: "Map macro-level city layouts, transit nodes, and simulated zoning boundaries.",
            icon: "alt_route",
        },
        {
            id: "Creatives",
            title: "Creatives, Authors & Tabletop",
            description: "Sandbox storytelling with localized history, lore, and sprawling fantasy maps.",
            icon: "menu_book",
        },
        {
            id: "Other",
            title: "Other / Custom",
            description: "I'm using OT-Muse for something entirely unique.",
            icon: "dashboard_customize",
        }
    ];

    const handleContinue = async () => {
        if (!selectedArchetype) return;

        setIsSubmitting(true);
        try {
            // Save choice to backend
            await saveUserArchetype(selectedArchetype);

            // Redirect to dashboard where their UI will be tailored based on this choice
            router.push("/dashboard");
        } catch (error) {
            console.error("Failed to save archetype:", error);
            setIsSubmitting(false);
            // Optionally could show a toast error here
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
                {archetypes.map((archetype) => {
                    const isSelected = selectedArchetype === archetype.id;
                    return (
                        <button
                            key={archetype.id}
                            onClick={() => setSelectedArchetype(archetype.id)}
                            className={`relative bg-surface rounded-2xl p-6 text-left transition-all duration-300 border-2 overflow-hidden flex flex-col group ${isSelected
                                ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:bg-surface-elevated hover:shadow-lg hover:-translate-y-1 hover:shadow-primary/5"
                                }`}
                        >
                            {isSelected && (
                                <div className="absolute top-4 right-4 text-primary">
                                    <span className="material-symbols-outlined filled text-[24px]">check_circle</span>
                                </div>
                            )}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${isSelected ? "bg-primary text-white" : "bg-surface-elevated text-text-muted group-hover:text-primary"
                                }`}>
                                <span className="material-symbols-outlined text-[24px]">{archetype.icon}</span>
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${isSelected ? "text-primary-light" : "text-foreground group-hover:text-primary transition-colors"}`}>
                                {archetype.title}
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                {archetype.description}
                            </p>
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleContinue}
                disabled={!selectedArchetype || isSubmitting}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all ${selectedArchetype && !isSubmitting
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/20 hover:scale-[1.02] cursor-pointer"
                    : "bg-surface-elevated text-text-muted cursor-not-allowed border border-border"
                    }`}
            >
                {isSubmitting ? (
                    <>
                        <span className="material-symbols-outlined animate-spin">refresh</span>
                        Personalizing Setup...
                    </>
                ) : (
                    <>
                        Continue to Dashboard
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                )}
            </button>
            <p className="text-xs text-text-muted mt-4">
                Don&apos;t worry, you can always switch this later.
            </p>
        </div>
    );
}
