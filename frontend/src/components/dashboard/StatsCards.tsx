import React from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    description?: string;
    icon?: string;
}

export function StatCard({ title, value, trend, description, icon }: StatCardProps) {
    return (
        <div className="bg-surface p-6 rounded-2xl border border-border relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-primary/10"></div>
            <div className="relative z-10">
                <p className="text-text-secondary text-sm font-medium mb-1 flex items-center gap-2">
                    {icon && <span className="material-symbols-outlined text-[16px]">{icon}</span>}
                    {title}
                </p>
                <h3 className="text-4xl font-bold text-foreground mb-2">{value}</h3>

                {trend && (
                    <div className={`flex items-center gap-2 text-xs px-2 py-1 rounded w-fit ${trend.isPositive ? 'text-primary bg-primary/10' : 'text-red-400 bg-red-400/10'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                            {trend.isPositive ? 'trending_up' : 'trending_down'}
                        </span>
                        <span>{trend.value}</span>
                    </div>
                )}

                {description && (
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                        <span>{description}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
                title="Total Worlds"
                value="12"
                trend={{ value: "+2 this month", isPositive: true }}
                icon="public"
            />

            <StatCard
                title="Generations"
                value="8,402"
                description="Assets created across all worlds"
                icon="auto_awesome"
            />

            {/* Weekly Challenge Banner */}
            <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-lg shadow-primary/20 relative overflow-hidden text-white group cursor-pointer hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-1">Weekly Challenge</h3>
                        <p className="text-white/80 text-sm">Theme: Cyber-Noir Detective</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-primary-dark bg-surface flex items-center justify-center relative overflow-hidden">
                                <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-primary-dark bg-surface flex items-center justify-center relative overflow-hidden">
                                <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-primary-dark bg-surface flex items-center justify-center relative overflow-hidden">
                                <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-primary-dark bg-primary-light flex items-center justify-center text-xs font-bold text-white">
                                +42
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
