"use client";

import React from "react";

export default function GeneralSettingsPage() {
    return (
        <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-20 scroll-smooth">
                <div className="max-w-4xl mx-auto pb-24">

                    {/* Header */}
                    <div className="flex flex-col gap-2 mb-10">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                            <span className="material-symbols-outlined text-[18px]">settings</span>
                            <span>General Account Settings</span>
                        </div>
                        <h1 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight">Personal Preferences</h1>
                        <p className="text-text-secondary text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                            Manage your profile information, language preferences, and security settings for the Nova Muse platform.
                        </p>
                    </div>

                    <div className="flex flex-col gap-10">
                        {/* Profile Settings */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-foreground text-xl font-bold border-b border-border pb-4">Profile Settings</h3>
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex flex-col items-center gap-4">
                                        <div
                                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 ring-4 ring-border/50 shadow-xl"
                                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDeYGw7v1mUdJ-bJ6owM3ER4R7xTdEoB01VCc3tqxrRZW4zk17qSLpsEA4AqhvQNCf9PfHq0H3YwhEYkrKvMNPxxd4w3LM5boJUD6gpfM7MujzQmiu2ezx7A4p2l66-KaZ6g6wdkIndZcgNao1aijvahANEtPALviyjK1Atd7TRy_iVdiPr0qN4hnvMhqCabLlkXltbAcm5t-UDqnvrbzvXFJn0cZhIJsc_esGfRMS5aw5-ewK0281iQOOSoQjHdtLDxvWGkjD0iOc")' }}
                                        />
                                        <button className="text-xs font-bold text-primary hover:text-primary-light uppercase tracking-wider transition-colors">
                                            Change Avatar
                                        </button>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="username" className="text-sm font-medium text-text-secondary">Username</label>
                                            <input
                                                id="username"
                                                className="bg-background border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block p-2.5 w-full outline-none transition-colors"
                                                type="text"
                                                defaultValue="Aria_Stark"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email Address</label>
                                            <input
                                                id="email"
                                                className="bg-background border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block p-2.5 w-full outline-none transition-colors"
                                                type="email"
                                                defaultValue="aria.s@novamuse.ai"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Language & Region */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-foreground text-xl font-bold border-b border-border pb-4">Language & Region</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-text-muted">language</span>
                                        <label className="text-sm font-medium text-text-secondary">Display Language</label>
                                    </div>
                                    <div className="relative">
                                        <select
                                            className="appearance-none w-full bg-background border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block p-3 pr-10 outline-none transition-colors cursor-pointer"
                                            defaultValue="English (US)"
                                        >
                                            <option>English (US)</option>
                                            <option>English (UK)</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                            <option>Japanese</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-text-muted">schedule</span>
                                        <label className="text-sm font-medium text-text-secondary">Timezone</label>
                                    </div>
                                    <div className="relative">
                                        <select
                                            className="appearance-none w-full bg-background border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block p-3 pr-10 outline-none transition-colors cursor-pointer"
                                            defaultValue="(GMT-08:00) Pacific Time"
                                        >
                                            <option>(GMT-08:00) Pacific Time</option>
                                            <option>(GMT-05:00) Eastern Time</option>
                                            <option>(GMT+00:00) London</option>
                                            <option>(GMT+01:00) Paris</option>
                                            <option>(GMT+09:00) Tokyo</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Privacy Settings */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-foreground text-xl font-bold border-b border-border pb-4">Privacy Settings</h3>
                            <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                                <div className="divide-y divide-border">
                                    <div className="flex items-center justify-between p-6">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-foreground font-medium">Make Profile Public</h4>
                                            <p className="text-text-muted text-sm">Allow other creators to see your profile and published worlds.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-6">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-foreground font-medium">Show Online Status</h4>
                                            <p className="text-text-muted text-sm">Let collaborators see when you are active on the platform.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Security */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-foreground text-xl font-bold border-b border-border pb-4">Account Security</h3>
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                                <div className="flex flex-wrap gap-4">
                                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-bold hover:bg-surface-elevated hover:text-foreground transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">lock</span>
                                        Change Password
                                    </button>
                                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-bold hover:bg-primary/10 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">security</span>
                                        Enable Two-Factor Authentication (2FA)
                                    </button>
                                </div>
                                <p className="mt-4 text-xs text-text-muted">Last password change: 3 months ago. We recommend changing it every 6 months.</p>
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
