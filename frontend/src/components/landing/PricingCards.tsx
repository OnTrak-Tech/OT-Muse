"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PricingCards() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section className="pb-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl mx-auto">
            {/* Header / Toggle */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
                    Build your world <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">without boundaries.</span>
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                    Choose the perfect plan for your storytelling needs. From solo creators to studio teams, we scale with your imagination.
                </p>
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-text-muted'}`}>Monthly</span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="relative w-14 h-8 bg-surface-elevated rounded-full p-1 transition-colors focus:outline-none border border-border"
                        aria-pressed={isAnnual}
                    >
                        <div className={`w-6 h-6 bg-primary rounded-full shadow-md transform transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-text-muted'}`}>Annual</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">Save 20%</span>
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 items-start">
                {/* Explorer Plan */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-xl flex flex-col h-full hover:border-text-muted transition-colors">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">Explorer</h3>
                        <p className="text-sm text-text-secondary">Perfect for hobbyists and first-time world builders.</p>
                    </div>
                    <div className="mb-8">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-bold text-foreground">$0</span>
                            <span className="text-text-secondary ml-2">/ month</span>
                        </div>
                    </div>
                    <Link className="block w-full py-3 px-4 bg-surface-elevated hover:bg-border text-foreground text-center font-bold rounded-lg transition-colors mb-8 border border-border" href="/signup">
                        Start for Free
                    </Link>
                    <div className="flex-1">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Features</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-green-500 text-[18px] shrink-0">check</span>
                                <span>1 Project</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-green-500 text-[18px] shrink-0">check</span>
                                <span>Token-limited </span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-green-500 text-[18px] shrink-0">check</span>
                                <span>Standard Lore Templates</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-green-500 text-[18px] shrink-0">check</span>
                                <span>Community Support</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-text-muted opacity-50">
                                <span className="material-symbols-outlined text-text-muted text-[18px] shrink-0">close</span>
                                <span>Collaboration</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="bg-surface-elevated rounded-2xl p-8 border-2 border-primary shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] relative flex flex-col h-full transform md:scale-105 md:-mt-4 md:mb-4 z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg">
                        Most Popular
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                            Pro
                        </h3>
                        <p className="text-sm text-text-secondary">For engineers, architects, and game masters who need power.</p>
                    </div>
                    <div className="mb-8">
                        <div className="flex items-baseline">
                            <span className="text-5xl font-bold text-foreground">{isAnnual ? '$15' : '$19'}</span>
                            <span className="text-text-secondary ml-2">/ month</span>
                        </div>
                        {isAnnual && <p className="text-xs text-text-muted mt-1">Billed annually ($180)</p>}
                    </div>
                    <Link className="block w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white text-center font-bold rounded-lg transition-all shadow-lg shadow-primary/25 mb-8" href="/signup?plan=pro">
                        Get Pro Access
                    </Link>
                    <div className="flex-1">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Everything in Explorer, plus:</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                <span>Unlimited World Projects</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                <span><strong>Unlimited</strong> AI Text Generations</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                <span>AI Image Generation (500/mo)</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                <span>Private Worlds &amp; Export Options</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                                <span>Standard Support</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-text-muted opacity-50">
                                <span className="material-symbols-outlined text-text-muted text-[18px] shrink-0">close</span>
                                <span>Collaboration</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-xl flex flex-col h-full hover:border-text-muted transition-colors">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">Enterprise</h3>
                        <p className="text-sm text-text-secondary">For studios and collaborative teams requiring scale.</p>
                    </div>
                    <div className="mb-8">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-bold text-foreground">{isAnnual ? '$79' : '$99'}</span>
                            <span className="text-text-secondary ml-2">/ month</span>
                        </div>
                        {isAnnual && <p className="text-xs text-text-muted mt-1">Billed annually ($948)</p>}
                    </div>
                    <Link className="block w-full py-3 px-4 bg-foreground hover:bg-slate-300 text-background text-center font-bold rounded-lg transition-colors mb-8" href="/#contact">
                        Contact Sales
                    </Link>
                    <div className="flex-1">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Everything in Pro, plus:</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-purple-500 text-[18px] shrink-0">verified</span>
                                <span><strong>Collaboration</strong></span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-purple-500 text-[18px] shrink-0">verified</span>
                                <span><strong>Team Roles &amp; Permissions</strong></span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-purple-500 text-[18px] shrink-0">verified</span>
                                <span><strong>Shared Team Library</strong></span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-purple-500 text-[18px] shrink-0">verified</span>
                                <span>SSO &amp; Advanced Security</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-purple-500 text-[18px] shrink-0">verified</span>
                                <span>Priority 24/7 Support</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-foreground">
                                <span className="material-symbols-outlined text-purple-500 text-[18px] shrink-0">verified</span>
                                <span>API Access</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
