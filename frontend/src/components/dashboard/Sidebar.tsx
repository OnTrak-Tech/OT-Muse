/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d121c] fixed left-0 top-0 z-50">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                    <span className="material-symbols-outlined text-white text-[20px]">auto_awesome</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight">Nova Muse</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
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
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEMNCDE-X0zn7qU8_kK46BX6zVuJRGGQ9iJv-nn_BKfXtouLUa0tGjIey4tz3HfueJE8zvywPj0s523MHUbebC51DDHcuX1VMsfT8hUQOtTp7i30KE__ek2vDdgGXwISOcRDR_oiEkQuCO9l09YjkTiLdjt-szOFAHDMr2R2Pu3pSpMagzeCHjLH-gU5GiSu7IVwVWilTUsimJkD3vlPiaRfGV6kDtN18Juogx1LJo9bSU4PZf6u7xgQ_8BJv6kUH9mKJgiBNHPzE"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">Alex Chen</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Pro Plan Creator</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">more_vert</span>
                </button>
            </div>
        </aside>
    );
}
