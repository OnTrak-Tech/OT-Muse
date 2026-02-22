/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

export default function CreateWorldPage() {
    return (
        <div data-testid="create-world-page" className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 antialiased selection:bg-primary selection:text-white">
            {/* Navigation Header */}
            <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10 shrink-0">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-2 text-slate-500 hover:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div className="hidden md:flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Link href="/dashboard" className="hover:text-primary transition-colors cursor-pointer">Worlds</Link>
                        <span className="material-symbols-outlined text-[16px] mx-2 text-slate-600">chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-medium">Create New</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                    <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start pt-12 pb-12 px-4 relative">
                {/* Abstract Background Glows */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none mix-blend-screen opacity-50"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-30"></div>

                {/* Background Grid Effect */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2d3748 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                {/* Central Interface */}
                <div className="w-full max-w-4xl z-10 animate-fade-in-up mt-8">
                    {/* Header Text */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">Architect Your Reality</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-light max-w-2xl mx-auto">
                            Describe the foundations of your universe. The Nova Engine will extrapolate the history, geography, and inhabitants.
                        </p>
                    </div>

                    {/* Main Input Card */}
                    <div className="bg-white/70 dark:bg-[#1a202e]/70 backdrop-blur-xl rounded-2xl p-1 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-black/5 dark:shadow-black/20">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 md:p-8">

                            {/* Label & Magic Wand */}
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-medium text-slate-400 uppercase tracking-widest" htmlFor="world-prompt">Initial Prompt</label>
                                <button className="flex items-center gap-1.5 text-xs text-primary hover:text-primary-light transition-colors group">
                                    <span className="material-symbols-outlined text-[16px] group-hover:rotate-12 transition-transform">lightbulb</span>
                                    <span>Inspire Me</span>
                                </button>
                            </div>

                            {/* Text Area */}
                            <div className="relative group rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/30">
                                <textarea
                                    id="world-prompt"
                                    rows={6}
                                    placeholder="In a realm where gravity is optional and time flows backward, a civilization built entirely on the backs of giant migratory cloud-whales struggles to maintain..."
                                    className="w-full bg-slate-50 dark:bg-[#13161c] text-slate-800 dark:text-slate-200 text-lg md:text-xl p-6 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-primary transition-all placeholder-slate-400 dark:placeholder-slate-600 resize-none font-light leading-relaxed"
                                ></textarea>

                                {/* Character Count */}
                                <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
                                    0 / 2048
                                </div>
                            </div>

                            {/* Configuration Parameters */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                                {/* World Type Selector */}
                                <div className="space-y-3">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Archetype</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button className="relative group overflow-hidden rounded-lg aspect-[16/9] border-2 border-primary ring-2 ring-primary/20 transition-all">
                                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0fGBqhZd0YksHYTmWxUhCJ3D6Vd952RYhiHtLnjRfzKip9JmWi7XNRxdyrd1FPHjyKj7sLP58eAlJcoxchOhKZ1uUeEcvVeWA11iV8bQNic70dy_XyPoqUVjlYlYyI55AMB0W58Voq1Ykpo5kiKpmmTGDCP7__BCgJ8n8M6FHSP_bog45d6DDZ6uwM3Nzh4CMF5Q3x1zbZNsUBJSP-08-6SSairJAgOS6JlJ9Dkx8pbIDikIoqyZzJDhWwpdlI8oo2AITIzgAgSM" alt="Sci-Fi" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-2">
                                                <span className="text-xs font-bold text-white tracking-wide">Sci-Fi</span>
                                            </div>
                                            <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(19,91,236,0.8)]"></div>
                                        </button>
                                        <button className="relative group overflow-hidden rounded-lg aspect-[16/9] border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all opacity-70 hover:opacity-100">
                                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW7kBfaIi3wb027xaxaSyK-tOqnR_CggML-6MqNfdo6Ve-OL3QKURuKzSZXyYvQFf2Rz2yBAHeYn2w5tyyRncuIg82ywdl-vpOQ2YRClCQ6350pUxqTb131i1UYKzF1jIPr61ARlMK9dwioGFPl3sHzy0KRC3zb1G18GCWHlBhRe3eGrScDH7yXg5n2r2EttosWm1BuM6gx1YPOp7pvPHeSdAOtD46tK01Sujjeob4ChaSMu_8hzwpoLtRRoGA1xkIx5aV5ha5iA4" alt="Fantasy" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-2">
                                                <span className="text-xs font-bold text-white tracking-wide">Fantasy</span>
                                            </div>
                                        </button>
                                        <button className="relative group overflow-hidden rounded-lg aspect-[16/9] border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all opacity-70 hover:opacity-100">
                                            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[24px] text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">add</span>
                                            </div>
                                            <div className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none">
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white tracking-wide transition-colors">Custom</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Aesthetic Style Selector */}
                                <div className="space-y-3">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Visual Style</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button className="px-4 py-2 rounded-lg bg-primary/10 border border-primary text-primary text-sm font-medium transition-all hover:bg-primary/20">
                                            Cinematic Realistic
                                        </button>
                                        <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                            Cyberpunk Noir
                                        </button>
                                        <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                            Watercolor
                                        </button>
                                        <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                            Low Poly
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-center mt-8">
                                <Link href="/editor/1" className="relative group w-full md:w-auto md:min-w-[320px] overflow-hidden rounded-xl bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-0.5">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                                    <div className="relative px-8 py-4 flex items-center justify-center gap-3">
                                        <span className="material-symbols-outlined text-[24px] animate-pulse">auto_awesome</span>
                                        <span className="text-lg font-bold tracking-wide">GENERATE WORLD</span>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>

                    {/* Footer Hints */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs text-slate-500 pb-12">
                        <div className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-slate-600">history_edu</span>
                            <span>Generates Lore & History</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-slate-600">public</span>
                            <span>Builds 3D Geography</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-slate-600">groups</span>
                            <span>Populates Factions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
