"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usersApi } from "@/lib/api";

export default function GeneralSettingsPage() {
    const { data: session } = useSession();
    const user = session?.user as { id?: string; email?: string; image?: string } | undefined;

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Form state
    const [displayName, setDisplayName] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [preferences, setPreferences] = useState<Record<string, any>>({
        language: "English (US)",
        timezone: "(GMT-08:00) Pacific Time",
        isPublic: false,
        showOnlineStatus: false,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id || !user?.email) return;
            try {
                const data = await usersApi.getMe({ userId: user.id, userEmail: user.email });
                setDisplayName(data.displayName || "");
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
                displayName,
                preferences
            }, { userId: user.id, userEmail: user.email });

            setSaveMessage({ type: "success", text: "Settings saved successfully!" });
            setTimeout(() => setSaveMessage(null), 3000);
        } catch (error) {
            console.error("Failed to save settings", error);
            setSaveMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to save settings" });
        } finally {
            setIsSaving(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                                            style={{ backgroundImage: `url("${user?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeYGw7v1mUdJ-bJ6owM3ER4R7xTdEoB01VCc3tqxrRZW4zk17qSLpsEA4AqhvQNCf9PfHq0H3YwhEYkrKvMNPxxd4w3LM5boJUD6gpfM7MujzQmiu2ezx7A4p2l66-KaZ6g6wdkIndZcgNao1aijvahANEtPALviyjK1Atd7TRy_iVdiPr0qN4hnvMhqCabLlkXltbAcm5t-UDqnvrbzvXFJn0cZhIJsc_esGfRMS5aw5-ewK0281iQOOSoQjHdtLDxvWGkjD0iOc'}")` }}
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
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email Address</label>
                                            <input
                                                id="email"
                                                className="bg-background border border-border text-text-muted text-sm rounded-lg block p-2.5 w-full outline-none cursor-not-allowed opacity-70"
                                                type="email"
                                                value={user?.email || ""}
                                                disabled
                                            />
                                            <span className="text-xs text-text-muted mt-1">Managed by your login provider</span>
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
                                            value={preferences.language || "English (US)"}
                                            onChange={(e) => handlePreferenceChange("language", e.target.value)}
                                        >
                                            <option value="English (US)">English (US)</option>
                                            <option value="English (UK)">English (UK)</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="French">French</option>
                                            <option value="Japanese">Japanese</option>
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
                                            value={preferences.timezone || "(GMT-08:00) Pacific Time"}
                                            onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
                                        >
                                            <option value="(GMT-08:00) Pacific Time">(GMT-08:00) Pacific Time</option>
                                            <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                                            <option value="(GMT+00:00) London">(GMT+00:00) London</option>
                                            <option value="(GMT+01:00) Paris">(GMT+01:00) Paris</option>
                                            <option value="(GMT+09:00) Tokyo">(GMT+09:00) Tokyo</option>
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
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={!!preferences.isPublic}
                                                onChange={(e) => handlePreferenceChange("isPublic", e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-6">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-foreground font-medium">Show Online Status</h4>
                                            <p className="text-text-muted text-sm">Let collaborators see when you are active on the platform.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={!!preferences.showOnlineStatus}
                                                onChange={(e) => handlePreferenceChange("showOnlineStatus", e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-surface-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Security - Static placeholder since Auth.js manages passwords */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-foreground text-xl font-bold border-b border-border pb-4">Account Security</h3>
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                                <p className="text-sm text-text-secondary mb-4">
                                    Your authentication is managed securely via Auth.js. Password changes and 2FA must be performed through your OAuth provider if you logged in via Google/GitHub/Discord.
                                </p>
                                <div className="flex flex-wrap gap-4 opacity-50 pointer-events-none">
                                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-bold hover:bg-surface-elevated hover:text-foreground transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">lock</span>
                                        Change Password
                                    </button>
                                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-bold hover:bg-primary/10 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">security</span>
                                        Enable Two-Factor Authentication (2FA)
                                    </button>
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
