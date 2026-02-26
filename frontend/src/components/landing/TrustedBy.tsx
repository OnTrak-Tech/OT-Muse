import React from "react";

export default function TrustedBy() {
    return (
        <section className="py-10 border-y border-border bg-surface-elevated z-10 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm text-text-muted font-medium mb-6 uppercase tracking-widest">Trusted by creative teams at</p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2 text-xl font-bold font-display text-foreground">
                        <span className="material-symbols-outlined text-2xl">hexagon</span> NEXUS
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold font-display text-foreground">
                        <span className="material-symbols-outlined text-2xl">all_inclusive</span> InfinityLoops
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold font-display text-foreground">
                        <span className="material-symbols-outlined text-2xl">bolt</span> STRIKE
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold font-display text-foreground">
                        <span className="material-symbols-outlined text-2xl">waves</span> FlowState
                    </div>
                </div>
            </div>
        </section>
    );
}
