/* eslint-disable @next/next/no-img-element */
import React from "react";

interface WorldCardProps {
    title: string;
    imageUrl: string;
    theme: string;
    lastEdited: string;
    collaboratorCount: number;
    generationCount: number;
}

export default function WorldCard({
    title,
    imageUrl,
    theme,
    lastEdited,
    collaboratorCount,
    generationCount,
}: WorldCardProps) {
    return (
        <div data-testid="world-card" className="group bg-surface rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col shadow-lg shadow-black/20 hover:shadow-primary/10 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                </div>
                <div className="absolute bottom-3 left-4 z-20">
                    <span className="px-2 py-1 rounded bg-primary/20 text-primary-light text-[10px] font-bold uppercase tracking-wider border border-primary/30 backdrop-blur-sm">
                        {theme}
                    </span>
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col bg-background/50">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {title}
                    </h3>
                </div>
                <p className="text-xs text-text-secondary mb-4">{lastEdited}</p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-text-muted text-xs" title="Collaborators">
                            <span className="material-symbols-outlined text-[16px]">{collaboratorCount === 1 ? 'person' : 'group'}</span>
                            <span>{collaboratorCount > 1 ? collaboratorCount : 'Solo'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-text-muted text-xs" title="Generations">
                            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                            <span>{generationCount}</span>
                        </div>
                    </div>
                    {/* Mock user avatars for preview */}
                    {collaboratorCount > 1 && (
                        <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full border border-surface bg-surface-elevated flex items-center justify-center text-[10px] font-bold text-foreground">
                                +{collaboratorCount}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
