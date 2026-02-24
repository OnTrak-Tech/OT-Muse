"use client";

import React from "react";

export default function BillingSettingsPage() {
    return (
        <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-20 scroll-smooth">
                <div className="max-w-5xl mx-auto pb-24">
                    {/* Header Section */}
                    <div className="flex flex-col gap-2 mb-10">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                            <span className="material-symbols-outlined text-[18px]">credit_card</span>
                            <span>Billing &amp; Subscription</span>
                        </div>
                        <h1 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight">Subscription Plan</h1>
                        <p className="text-text-secondary text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                            Manage your billing details, view past invoices, and track your resource usage.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {/* Plan & Usage Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Current Plan Card */}
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6 lg:col-span-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-foreground text-lg font-semibold">Current Plan</h3>
                                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 uppercase tracking-wide">Active</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-foreground">Pro</span>
                                        <span className="text-text-secondary text-sm">/ month</span>
                                    </div>
                                    <p className="text-text-secondary text-sm">Next billing date: <span className="text-foreground font-medium">Nov 24, 2026</span></p>
                                </div>
                                <div className="flex flex-col gap-3 mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-foreground">
                                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                                        <span>Unlimited Worlds</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-foreground">
                                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                                        <span>Priority Rendering</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-foreground">
                                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                                        <span>4k Export</span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2.5 rounded-lg border border-border text-foreground text-sm font-bold hover:bg-surface-elevated transition-colors">
                                    Manage Subscription
                                </button>
                            </div>

                            {/* Usage Metrics Card */}
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6 lg:col-span-2">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-foreground text-lg font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-text-muted">bar_chart</span>
                                        Usage Metrics
                                    </h3>
                                    <span className="text-xs text-text-muted">Refreshes daily</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-end text-sm">
                                        <span className="text-foreground font-medium">AI Generations Used</span>
                                        <span className="text-foreground font-bold">2,450 / 5,000</span>
                                    </div>
                                    <div className="w-full bg-surface-elevated rounded-full h-2.5">
                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "49%" }}></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-end text-sm">
                                        <span className="text-foreground font-medium">Storage Space</span>
                                        <span className="text-foreground font-bold">12.4 GB / 50 GB</span>
                                    </div>
                                    <div className="w-full bg-surface-elevated rounded-full h-2.5">
                                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-end text-sm">
                                        <span className="text-foreground font-medium">Active Collaborators</span>
                                        <span className="text-foreground font-bold">3 / 10 Seats</span>
                                    </div>
                                    <div className="w-full bg-surface-elevated rounded-full h-2.5">
                                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <section className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-foreground text-lg font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-text-muted">payments</span>
                                        Payment Method
                                    </h3>
                                    <p className="text-text-secondary text-sm">Securely managed via Stripe</p>
                                </div>
                                <div className="flex items-center gap-4 bg-background p-3 rounded-lg border border-border flex-1 md:max-w-md">
                                    <div className="bg-white dark:bg-slate-800 p-2 rounded border border-border">
                                        {/* Simple placeholder for a credit card icon / real logo */}
                                        <svg className="h-6 w-8 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-foreground">Visa ending in 4242</span>
                                        <span className="text-xs text-text-secondary">Expires 12/2026</span>
                                    </div>
                                    <button className="ml-auto text-sm font-medium text-primary hover:text-primary-light transition-colors">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Billing History */}
                        <section className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-border flex justify-between items-center">
                                <h3 className="text-foreground text-lg font-semibold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-text-muted">history</span>
                                    Billing History
                                </h3>
                                <button className="text-sm text-primary hover:text-primary-light transition-colors font-medium">
                                    Download All
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-background text-xs uppercase text-text-muted font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">Invoice ID</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        <tr className="hover:bg-surface-elevated transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">INV-2026-0012</td>
                                            <td className="px-6 py-4 text-text-secondary">Oct 24, 2026</td>
                                            <td className="px-6 py-4 text-foreground font-medium">$29.00</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                                    <span className="size-1.5 rounded-full bg-green-500"></span>
                                                    Paid
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-text-muted hover:text-primary transition-colors inline-flex items-center justify-end gap-1">
                                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                                    PDF
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-surface-elevated transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">INV-2026-0011</td>
                                            <td className="px-6 py-4 text-text-secondary">Sep 24, 2026</td>
                                            <td className="px-6 py-4 text-foreground font-medium">$29.00</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                                    <span className="size-1.5 rounded-full bg-green-500"></span>
                                                    Paid
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-text-muted hover:text-primary transition-colors inline-flex items-center justify-end gap-1">
                                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                                    PDF
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-surface-elevated transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">INV-2026-0010</td>
                                            <td className="px-6 py-4 text-text-secondary">Aug 24, 2026</td>
                                            <td className="px-6 py-4 text-foreground font-medium">$29.00</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                                    <span className="size-1.5 rounded-full bg-green-500"></span>
                                                    Paid
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-text-muted hover:text-primary transition-colors inline-flex items-center justify-end gap-1">
                                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                                    PDF
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border px-6 lg:px-20 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
                <button className="text-text-muted hover:text-foreground text-sm font-medium transition-colors">
                    Need Help?
                </button>
                <div className="flex gap-4 w-full sm:w-auto">
                    {/* The original mockup had an empty div here, but usually Billing footers 
                        have a contact support / view plans button or nothing. We will keep it minimal. */}
                </div>
            </div>
        </main>
    );
}
