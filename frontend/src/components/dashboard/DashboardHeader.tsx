import React from "react";
import Link from "next/link";

interface DashboardHeaderProps {
    breadcrumbItems: Array<{ label: string; href?: string }>;
}

export default function DashboardHeader({ breadcrumbItems }: DashboardHeaderProps) {
    return (
        <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10">
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 text-text-secondary hover:text-foreground">
                    <span className="material-symbols-outlined">menu</span>
                </button>

                <nav className="hidden md:flex items-center text-sm text-text-secondary">
                    {breadcrumbItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.href ? (
                                <Link href={item.href} className="hover:text-primary transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-foreground font-medium">{item.label}</span>
                            )}

                            {index < breadcrumbItems.length - 1 && (
                                <span className="material-symbols-outlined text-base mx-2 text-text-muted">
                                    chevron_right
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
                {/* Search */}
                <div className="relative hidden md:block group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-[20px]">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search worlds..."
                        className="w-64 lg:w-80 pl-10 pr-4 py-2.5 bg-surface border border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-sm transition-all outline-none placeholder:text-text-muted text-foreground"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-text-secondary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-background"></span>
                </button>

                {/* Create Button */}
                <Link
                    href="/worlds/create"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-0.5"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span className="hidden sm:inline">Create New World</span>
                    <span className="sm:hidden">Create</span>
                </Link>
            </div>
        </header>
    );
}
