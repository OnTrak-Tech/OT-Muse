"use client";

import React from "react";

export default function CollaborationSettingsPage() {
    return (
        <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-20 scroll-smooth">
                <div className="max-w-4xl mx-auto pb-24">
                    {/* Header Section */}
                    <div className="flex flex-col gap-2 mb-10">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                            <span className="material-symbols-outlined text-[18px]">group</span>
                            <span>Collaboration Settings</span>
                        </div>
                        <h1 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight">Collaboration &amp; Sharing</h1>
                        <p className="text-text-secondary text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                            Manage how you work with others on your world-building projects and control visibility.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {/* Default Permissions */}
                        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-primary bg-primary/10 flex items-center justify-center rounded-lg shrink-0 size-12">
                                        <span className="material-symbols-outlined text-[24px]">lock_open</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-foreground text-lg font-semibold leading-normal">Default Permissions</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed mt-1">Set the baseline access level for new collaborators when they join a world.</p>
                                    </div>
                                </div>
                                <div className="relative min-w-[180px]">
                                    <select
                                        className="appearance-none w-full bg-background border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block p-3 pr-10 outline-none transition-colors cursor-pointer"
                                        defaultValue="commenter"
                                    >
                                        <option value="viewer">Viewer</option>
                                        <option value="commenter">Commenter</option>
                                        <option value="editor">Editor</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Presence Settings */}
                        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-text-muted">visibility</span>
                                <h3 className="text-foreground text-lg font-semibold">Presence Settings</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-foreground font-medium">Show Cursor Activity</span>
                                        <span className="text-text-secondary text-sm">Allow others to see your real-time mouse movement in the editor.</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-foreground font-medium">Show Active Collaborators List</span>
                                        <span className="text-text-secondary text-sm">Display a list of who is currently viewing the world.</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Edit Notifications */}
                        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-text-muted">notifications_active</span>
                                <h3 className="text-foreground text-lg font-semibold">Edit Notifications</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="mt-1 size-5 rounded border-border bg-background text-primary focus:ring-1 focus:ring-primary accent-primary cursor-pointer"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-foreground font-medium text-sm">New Element Added</span>
                                        <span className="text-text-secondary text-xs mt-1">Get notified when characters or locations are created.</span>
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="mt-1 size-5 rounded border-border bg-background text-primary focus:ring-1 focus:ring-primary accent-primary cursor-pointer"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-foreground font-medium text-sm">Lore Conflict Detected</span>
                                        <span className="text-text-secondary text-xs mt-1">Alert when AI detects inconsistencies in collaborator edits.</span>
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="mt-1 size-5 rounded border-border bg-background text-primary focus:ring-1 focus:ring-primary accent-primary cursor-pointer"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-foreground font-medium text-sm">Direct Mention</span>
                                        <span className="text-text-secondary text-xs mt-1">Notifications for @mentions in lore notes or comments.</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Active Sessions */}
                        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-text-muted">lan</span>
                                    <h3 className="text-foreground text-lg font-semibold">Active Sessions</h3>
                                </div>
                                <span className="text-xs font-medium text-text-muted uppercase tracking-wider">3 Worlds Shared</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* Session 1 */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-background border border-border gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="size-10 rounded-lg bg-cover bg-center shrink-0"
                                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvKmgE69sV7V6h8oYGxdEHfePw4Ab_d4CzcEnLPskepi2RPxhomc6ZiDXxdI-UNUkOqaB1ILoA1FVizThbicWXDH35Xx0Sp_7v3_-nTq7JVGxbvrg-Wz_xebxYLvKUgloSOSRbRnaPp02CEk-O0KNmrZopkWEKKvMQFs0ToDAOKl1w-YDjDfyYdHUeKjNOIIl8xWWt0e3fnbfpjOuRHSK5vH8ORSjMO9wPqfPaMj-BJp_bkRRN_eq377cA7cWfKs0yOwG53A-hps')" }}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-foreground font-medium">Neo-Tokyo Drift</span>
                                            <span className="text-text-secondary text-xs">8 Collaborators • Last activity 2h ago</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-xs font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors sm:w-auto w-full text-left sm:text-center">
                                        Revoke All Access
                                    </button>
                                </div>
                                {/* Session 2 */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-background border border-border gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="size-10 rounded-lg bg-cover bg-center shrink-0"
                                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDp-lEMeEKvP2nm35EZWBu7CoJlPomh-FOCDpQSt9aGW1Qo7x_kGc1C-fZObNmKghI7cfbrPPUG7fGOhgZXfB4S1660e01Z51M-NxHwyBIMeuzbK0y2SKWE7siZhKcGxXpYEpngU_KfzmBlryIbQlCFqnkSp9arO9B4Gq2bA-li17uwSVhk4TSVvcugwoCn8_wPut3McigIF0MqlLKoaHKs_zMq9e3nM3obQPQG476xUunvdUIFx2uCzkGODXnsiGCgxUEzV75wR7M')" }}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-foreground font-medium">Aetheria Chronicles</span>
                                            <span className="text-text-secondary text-xs">3 Collaborators • Last activity 1d ago</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-xs font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors sm:w-auto w-full text-left sm:text-center">
                                        Revoke All Access
                                    </button>
                                </div>
                                {/* Session 3 */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-background border border-border gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="size-10 rounded-lg bg-cover bg-center shrink-0"
                                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6DpMb8Kis_w352jNtp5Nmun-XoZ3PpeH2gAhOEGBVBuxyjwnOg9OtkRpF5n9yGaymStvEvKDZNygCXWK5ji6bHbrqUd3lTfAwytMxrpfFc1V2lXIfPERIiPJCHl3cvpLnp17RxAxsSDj2yT0Ow06p_M6YOFeyNc-yVj-5KlS7IDnTIj1eddsZWxw3Os2e9YSjcly81TwVveU8UEryQNgtx2ec0n33s-NyHnls0WgnNNoOPXIKfmnI7TTWm3-PW1GDLcNPEbUV858')" }}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-foreground font-medium">The Rust Wastes</span>
                                            <span className="text-text-secondary text-xs">12 Collaborators • Last activity 15m ago</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-xs font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors sm:w-auto w-full text-left sm:text-center">
                                        Revoke All Access
                                    </button>
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
