"use client";

import React from "react";

export default function InterfaceSettingsPage() {
    return (
        <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-20 scroll-smooth">
                <div className="max-w-4xl mx-auto pb-24">
                    {/* Header Section */}
                    <div className="flex flex-col gap-2 mb-10">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                            <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
                            <span>Interface Configuration</span>
                        </div>
                        <h1 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight">Interface Settings</h1>
                        <p className="text-text-secondary text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                            Personalize your workspace aesthetic, performance, and accessibility for a better world-building experience.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {/* Theme Selection */}
                        <section className="flex flex-col gap-4">
                            <h3 className="text-foreground text-lg font-semibold flex items-center gap-2">
                                <span className="material-symbols-outlined text-text-muted">palette</span>
                                Theme Selection
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* System Theme */}
                                <button className="group flex flex-col gap-3 p-4 rounded-xl border-2 border-border bg-surface-elevated hover:border-primary/50 transition-all text-left">
                                    <div className="aspect-video w-full rounded-md bg-gradient-to-br from-slate-200 to-slate-800 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white">devices</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary group-hover:text-foreground">System</span>
                                </button>
                                {/* Light Theme */}
                                <button className="group flex flex-col gap-3 p-4 rounded-xl border-2 border-border bg-surface-elevated hover:border-primary/50 transition-all text-left">
                                    <div className="aspect-video w-full rounded-md bg-white border border-border flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-slate-400">light_mode</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary group-hover:text-foreground">Light</span>
                                </button>
                                {/* Dark Theme (Active) */}
                                <button className="group flex flex-col gap-3 p-4 rounded-xl border-2 border-primary bg-primary/10 transition-all text-left relative">
                                    <div className="aspect-video w-full rounded-md bg-background border border-border flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">dark_mode</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">Dark</span>
                                    <div className="absolute top-2 right-2 size-5 bg-primary rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[14px]">check</span>
                                    </div>
                                </button>
                                {/* OLED Theme */}
                                <button className="group flex flex-col gap-3 p-4 rounded-xl border-2 border-border bg-surface-elevated hover:border-primary/50 transition-all text-left">
                                    <div className="aspect-video w-full rounded-md bg-black flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-slate-500">brightness_low</span>
                                    </div>
                                    <span className="text-sm font-medium text-text-secondary group-hover:text-foreground">OLED</span>
                                </button>
                            </div>
                        </section>

                        {/* Performance & Density Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Canvas Performance */}
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-text-muted">speed</span>
                                    <h3 className="text-foreground text-lg font-semibold">Canvas Performance</h3>
                                </div>
                                <p className="text-text-secondary text-sm">Optimize how the canvas engine handles world maps and large textures.</p>
                                <div className="relative mt-2">
                                    <select
                                        className="appearance-none w-full bg-background border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block p-3 pr-10 outline-none transition-colors cursor-pointer"
                                        defaultValue="Balanced"
                                    >
                                        <option>Balanced</option>
                                        <option>High Performance (Smoother Zooming)</option>
                                        <option>High Fidelity (Better Textures)</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            {/* UI Density */}
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-text-muted">density_medium</span>
                                    <h3 className="text-foreground text-lg font-semibold">UI Density</h3>
                                </div>
                                <div className="flex flex-col gap-5 mt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-foreground">Compact Sidebar</span>
                                            <span className="text-xs text-text-muted">Reduce sidebar width for more workspace</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-foreground">Show Gridlines</span>
                                            <span className="text-xs text-text-muted">Display subtle grid in main viewport</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accessibility */}
                        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-text-muted">accessibility_new</span>
                                <h3 className="text-foreground text-lg font-semibold">Accessibility</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-foreground">Color Blind Mode</span>
                                        <span className="text-xs text-text-muted">Enhanced contrast and patterns for UI elements</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                    </label>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-foreground">UI Scaling</span>
                                        <span className="text-xs font-bold text-primary">100% (Normal)</span>
                                    </div>
                                    <div className="px-1">
                                        <input
                                            className="w-full h-2 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary outline-none"
                                            max="150"
                                            min="80"
                                            step="10"
                                            type="range"
                                            defaultValue="100"
                                        />
                                        <div className="flex justify-between text-[10px] text-text-muted mt-2 uppercase tracking-widest font-bold">
                                            <span>80%</span>
                                            <span>110%</span>
                                            <span>150%</span>
                                        </div>
                                    </div>
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
