'use client';
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Sidebar() {
    const { data: session, status } = useSession();

    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d121c] fixed left-0 top-0 z-50">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                    <span className="material-symbols-outlined text-white text-[20px]">auto_awesome</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight">OT-Muse</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-hidden flex flex-col">
                <p className="px-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 mt-2">Platform</p>
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl transition-all group border border-primary/20">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">grid_view</span>
                    <span className="font-medium">My Worlds</span>
                </Link>
                <Link href="/community" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-hover rounded-xl transition-colors group">
                    <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">hub</span>
                    <span className="font-medium">Community</span>
                </Link>
                <Link href="/generators" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-hover rounded-xl transition-colors group">
                    <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">psychology</span>
                    <span className="font-medium">Generators</span>
                </Link>
                <Link href="/assets" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-hover rounded-xl transition-colors group">
                    <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">library_books</span>
                    <span className="font-medium">Assets Library</span>
                </Link>

                <div className="my-6 border-t border-slate-200 dark:border-slate-800"></div>

                <p className="px-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Settings</p>
                <Link href="/preferences" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-hover rounded-xl transition-colors group">
                    <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">tune</span>
                    <span className="font-medium">Preferences</span>
                </Link>
                <Link href="/team" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-hover rounded-xl transition-colors group">
                    <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">group_add</span>
                    <span className="font-medium">Team & Collab</span>
                </Link>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 mt-auto shrink-0">
                <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-surface-hover transition-colors text-left">
                    {session?.user?.image ? (
                        <img
                            src={session.user.image}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center ring-2 ring-primary/20 shrink-0">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                        </div>
                    )}
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">
                            {status === "loading" ? "Loading..." : session?.user?.name || "Guest Creator"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {session?.user?.email || "No Title Set"}
                        </p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">more_vert</span>
                </button>
            </div>
        </aside>
    );
}
