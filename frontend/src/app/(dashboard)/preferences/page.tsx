'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const PRESET_AVATARS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBEMNCDE-X0zn7qU8_kK46BX6zVuJRGGQ9iJv-nn_BKfXtouLUa0tGjIey4tz3HfueJE8zvywPj0s523MHUbebC51DDHcuX1VMsfT8hUQOtTp7i30KE__ek2vDdgGXwISOcRDR_oiEkQuCO9l09YjkTiLdjt-szOFAHDMr2R2Pu3pSpMagzeCHjLH-gU5GiSu7IVwVWilTUsimJkD3vlPiaRfGV6kDtN18Juogx1LJo9bSU4PZf6u7xgQ_8BJv6kUH9mKJgiBNHPzE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCKPtRE0mB228vVm4N55oSlvvm3cdHYokmG0Rd7f1Ksvi-twd_twCOLx8fhTSf2XImQA2dzU2IWJiwS_VeZfatABu-F3YpoADO8SBRcDezL2gYi99UJvYEkyLY5hhPF6x4pT7qTB2ZI0VcK07g7ipBcYkDOD26hcu50Nwtu3YUD9SVVKh_Xy3ITTwUDxyHdxav1Z7LITji2gDSrql_mSdlkwLWhWpxVQq_8h_kpLRE6GbKpnu2At8E8rPAhFjOUZAeKikdEiRze5P8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD8lqogPM15Tpgr8k1Cm6lkvtn0urr6D1Nm-UU9ZpVDe_qlthkmUIoOXr6aWq8SuB2iqogV4xk3UyOAc02PO1zwjnUIehteeocvik1aBqqRLzYZsfsDUGMpwhiM_SZUX5905VQBVc1dRelPUB6Y8X2yWMmScCshDA9NyWkLfQIHp2BMdR9tBtpog41u8NHmRTvV9Bg_GVtX0Y_wmNwE6IwD2_HENK86VtQQO44N7Af4G6tcv8X0ajSJxC2CHneiroOIh6jLXeQ_hKw',
    'https://placehold.co/150x150/111827/ffffff?text=AV1',
    'https://placehold.co/150x150/1d4ed8/ffffff?text=AV2',
    'https://placehold.co/150x150/047857/ffffff?text=AV3'
];

export default function PreferencesPage() {
    const { data: session } = useSession();
    const [selectedAvatar, setSelectedAvatar] = useState(session?.user?.image || PRESET_AVATARS[0]);
    const [bio, setBio] = useState('');
    const [profession, setProfession] = useState('Creator');
    const [theme, setTheme] = useState('System');

    return (
        <div data-testid="preferences-page" className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 p-8 md:p-12 relative">
            <div className="max-w-4xl mx-auto space-y-12 pb-12">

                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Preferences</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your profile, visual settings, and workspace data.</p>
                </div>

                {/* Profile Section */}
                <section className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
                    <h2 className="text-xl font-semibold border-b border-slate-200 dark:border-surface-border pb-4">Public Profile</h2>

                    {/* Avatar Picker */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Choose Avatar</label>
                        <div className="flex flex-wrap gap-4">
                            {PRESET_AVATARS.map((url, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedAvatar(url)}
                                    className={`relative w-20 h-20 rounded-full overflow-hidden border-2 transition-all ${selectedAvatar === url
                                        ? 'border-primary ring-4 ring-primary/20 scale-105'
                                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                                        }`}
                                >
                                    <img src={url} alt={`Avatar option ${idx + 1}`} className="w-full h-full object-cover" />
                                    {selectedAvatar === url && (
                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-[24px] drop-shadow-md">check_circle</span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bio Input */}
                    <div>
                        <label htmlFor="bio-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bio</label>
                        <textarea
                            id="bio-input"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell the community about your firm or creative goals..."
                            rows={3}
                            className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                        />
                    </div>

                    {/* Profession Select */}
                    <div>
                        <label htmlFor="profession-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Profession</label>
                        <div className="relative">
                            <select
                                id="profession-select"
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none transition-shadow"
                            >
                                <option value="Creator">Creator / General</option>
                                <option value="Architect">Architect</option>
                                <option value="Urban Planner">Urban Planner</option>
                                <option value="Game Developer">Game Developer</option>
                                <option value="Realtor">Realtor</option>
                                <option value="Civil Engineer">Civil Engineer</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                </section>

                {/* App Settings Section */}
                <section className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
                    <h2 className="text-xl font-semibold border-b border-slate-200 dark:border-surface-border pb-4">App Settings</h2>

                    {/* Theme Toggle */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">App Theme</label>
                        <div className="flex bg-slate-100 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-800 rounded-xl p-1 max-w-md">
                            {['Light', 'Dark', 'System'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setTheme(opt)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${theme === opt
                                        ? 'bg-white dark:bg-surface-dark text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-800'
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {opt === 'Light' ? 'light_mode' : opt === 'Dark' ? 'dark_mode' : 'settings_brightness'}
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Session Actions */}
                <section className="pt-6">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 font-semibold transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Sign Out
                    </button>
                </section>

                {/* Version Tag */}
                <div className="absolute bottom-6 right-8 opacity-50 select-none">
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-600 track-widest">OT-Muse v1.0.0</p>
                </div>
            </div>
        </div>
    );
}
