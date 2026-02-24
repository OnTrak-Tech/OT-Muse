"use client";

import React, { useState } from "react";

export default function WorldFilters() {
    const [activeFilter, setActiveFilter] = useState("All Worlds");
    const filters = ["All Worlds", "Favorites", "Shared with Me", "Archived"];

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                                ? "bg-primary text-white border border-primary shadow-sm shadow-primary/20"
                                : "bg-surface border border-border hover:border-text-muted text-text-secondary hover:text-foreground"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3 ml-auto shrink-0">
                <span className="text-sm text-text-muted">Sort by:</span>
                <div className="relative group cursor-pointer">
                    <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                        Last Modified
                        <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                    </button>
                </div>

                <div className="w-px h-4 bg-border mx-2"></div>

                <button className="text-primary" title="Grid View">
                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
                <button className="text-text-muted hover:text-text-secondary transition-colors" title="List View">
                    <span className="material-symbols-outlined text-[20px]">list</span>
                </button>
            </div>
        </div>
    );
}
