import React from "react";
import Link from "next/link";
import WorldCard from "@/components/dashboard/WorldCard";

// Mock Data
const mockWorlds = [
    {
        id: "1",
        title: "Neo-Veridia Prime",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7kTTiFi9oB6z06zCGXUDgDnf5GXlP6jlUz1GB7ciqWW8re16ICT3x1K_ZxctsBWg51P7oMZut3q1kdpWkhNQgUE4jYy9wqA6DWP3w4t4fCczknd-pdDS7v1aqaamSMDHoU7aW-ECTVVe_nyTOMkI9ytf8ZvsUjLJ4IQl0Yh-Sm6_A-no_gHKYedGiMX-szSBvNC2unRQsyrEnh6E1xS6Z1ORMoIX1_KKpNmqV2uvuhmtgcqr3KszoWGTXml6rbC5AfPP-7GHSclM",
        theme: "Sci-Fi",
        lastEdited: "Edited 2 hours ago",
        collaboratorCount: 3,
        generationCount: 142
    },
    {
        id: "2",
        title: "The Whispering Glades",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL-Yc_1vrzdKX5Mb3h5bC7_StsauWC3eYJdrEHySqoXrdvd9kZJULHdkd-zydl3ILem7-l30H3ACyjji6KTNdXP3ow_kw6AQ5WJvTMiezJY0bzKQrz0qlshmTTQmUt1IVlsUkaOj4reOdF4AKpkC0RpUJFiPEPFhDub0wKhsc7MYYbAZPlCehB1hN8LPsR9ERKXucqnR_DxAigbD_E0lZ_KUT9yvCNJ2Tq593m2AgcECDjTioZUlK7yIrJ_Y17BVTRwpGoumcgYxw",
        theme: "Fantasy",
        lastEdited: "Edited 1 day ago",
        collaboratorCount: 1,
        generationCount: 45
    }
];

export default function DashboardPage() {
    return (
        <div data-testid="dashboard-page" className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* Top Header */}
            <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10 shrink-0">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-2 text-slate-500 hover:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <nav className="hidden md:flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <span className="hover:text-primary transition-colors cursor-pointer">Dashboard</span>
                        <span className="material-symbols-outlined text-[16px] mx-2 text-slate-600">chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-medium">My Worlds</span>
                    </nav>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                    {/* Search */}
                    <div className="relative hidden md:block group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Search worlds..."
                            className="w-64 lg:w-80 pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-surface-dark border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-sm transition-all outline-none placeholder:text-slate-500 dark:text-white"
                        />
                    </div>
                    {/* Notifications */}
                    <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-background-dark"></span>
                    </button>
                    {/* Create Button */}
                    <Link href="/create" className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>Create New World</span>
                    </Link>
                </div>
            </header>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
                {/* Welcome/Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-gradient-to-br from-surface-dark to-background-dark p-6 rounded-2xl border border-slate-800 relative overflow-hidden group shadow-lg">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-primary/20"></div>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm font-medium mb-1">Total Worlds</p>
                            <h3 className="text-4xl font-bold text-white mb-2">12</h3>
                            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded w-fit font-medium">
                                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                <span>+2 this month</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-surface-dark to-background-dark p-6 rounded-2xl border border-slate-800 relative overflow-hidden group shadow-lg">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/20"></div>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm font-medium mb-1">Generations</p>
                            <h3 className="text-4xl font-bold text-white mb-2">8,402</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span>Assets created across all worlds</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-blue-700 p-6 rounded-2xl shadow-lg shadow-primary/20 relative overflow-hidden text-white group cursor-pointer transition-transform hover:-translate-y-1">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-1">Weekly Challenge</h3>
                                <p className="text-blue-100 text-sm">Theme: Cyber-Noir Detective</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">+42 Participants</span>
                                <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Sort */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
                        <button className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium whitespace-nowrap shadow-md shadow-primary/20">All Worlds</button>
                        <button className="px-4 py-1.5 rounded-full bg-surface-dark border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-colors whitespace-nowrap">Favorites</button>
                        <button className="px-4 py-1.5 rounded-full bg-surface-dark border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-colors whitespace-nowrap">Shared with Me</button>
                        <button className="px-4 py-1.5 rounded-full bg-surface-dark border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-colors whitespace-nowrap">Archived</button>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <span className="text-sm text-slate-500">Sort by:</span>
                        <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Last Modified
                            <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                        </button>
                        <div className="w-px h-4 bg-slate-700 mx-2"></div>
                        <button className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">grid_view</span></button>
                        <button className="text-slate-600 hover:text-slate-400 transition-colors"><span className="material-symbols-outlined text-[20px]">list</span></button>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                    {mockWorlds.map((world) => (
                        <WorldCard key={world.id} {...world} />
                    ))}

                    {/* Create New Card (Placeholder) */}
                    <Link href="/create" className="group bg-transparent rounded-2xl border-2 border-dashed border-slate-700 hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center h-full min-h-[340px]">
                        <div className="w-16 h-16 rounded-full bg-slate-800 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">add</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-300 group-hover:text-white mb-2 transition-colors">Start a New World</h3>
                        <p className="text-sm text-slate-500 group-hover:text-slate-400 text-center px-8 transition-colors">Generate a setting from scratch or use a template</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
