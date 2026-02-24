"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SettingsSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    // Default avatar if none provided by session
    const avatarUrl = session?.user?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDeYGw7v1mUdJ-bJ6owM3ER4R7xTdEoB01VCc3tqxrRZW4zk17qSLpsEA4AqhvQNCf9PfHq0H3YwhEYkrKvMNPxxd4w3LM5boJUD6gpfM7MujzQmiu2ezx7A4p2l66-KaZ6g6wdkIndZcgNao1aijvahANEtPALviyjK1Atd7TRy_iVdiPr0qN4hnvMhqCabLlkXltbAcm5t-UDqnvrbzvXFJn0cZhIJsc_esGfRMS5aw5-ewK0281iQOOSoQjHdtLDxvWGkjD0iOc";

    const navItems = [
        { href: "/settings", icon: "settings", label: "General", exact: true },
        { href: "/settings/ai-engine", icon: "psychology", label: "AI Engine", exact: false },
        { href: "/settings/interface", icon: "desktop_windows", label: "Interface", exact: false },
        { href: "/settings/collaboration", icon: "group", label: "Collaboration", exact: false },
        { type: "divider" },
        { href: "/settings/billing", icon: "credit_card", label: "Billing", exact: false },
    ];

    return (
        <aside className="w-64 border-r border-border bg-background hidden md:flex flex-col py-6 px-4 gap-6 shrink-0 overflow-y-auto">
            {/* User Profile Header */}
            <div className="flex gap-3 items-center px-2">
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-lg"
                    style={{ backgroundImage: `url("${avatarUrl}")` }}
                    aria-label="User avatar"
                />
                <div className="flex flex-col">
                    <h1 className="text-foreground text-base font-medium leading-normal">Preferences</h1>
                    <p className="text-text-muted text-xs font-normal leading-normal">Manage settings</p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1">
                {navItems.map((item, index) => {
                    if (item.type === "divider") {
                        return <div key={`divider-${index}`} className="h-px bg-border my-2 mx-3" />;
                    }

                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href as string);

                    return (
                        <Link
                            key={item.label}
                            href={item.href as string}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive
                                ? "bg-surface-elevated text-primary shadow-sm border border-border"
                                : "text-text-secondary hover:bg-surface-elevated hover:text-foreground"
                                }`}
                        >
                            <span
                                className={`material-symbols-outlined text-[20px] transition-colors ${isActive ? "text-primary" : "text-text-muted group-hover:text-foreground"
                                    }`}
                            >
                                {item.icon}
                            </span>
                            <span className={`text-sm font-medium leading-normal ${isActive ? "text-primary" : ""}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
