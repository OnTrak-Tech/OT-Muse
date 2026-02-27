"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                            OT-Muse
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="#features"
                            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/community"
                            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        >
                            Community
                        </Link>
                        <Link
                            href="/docs"
                            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        >
                            Docs
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <Link
                            href="/login"
                            className="hidden md:block text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 block"
                        >
                            Start Building
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
