import Link from "next/link";
import {
    MdPublic,
    MdAlternateEmail,
} from "react-icons/md";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                                <MdPublic className="text-white text-xs" />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-foreground">
                                OT-Muse
                            </span>
                        </div>
                        <p className="text-sm text-text-muted mb-6 max-w-xs leading-relaxed">
                            Empowering the next generation of storytellers with AI-driven
                            world-building tools.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="text-text-muted hover:text-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="text-xl" />
                            </Link>
                            <Link
                                href="#"
                                className="text-text-muted hover:text-primary transition-colors"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-xl" />
                            </Link>
                            <Link
                                href="#"
                                className="text-text-muted hover:text-primary transition-colors"
                                aria-label="Discord"
                            >
                                <FaDiscord className="text-xl" />
                            </Link>
                            <Link
                                href="#"
                                className="text-text-muted hover:text-primary transition-colors"
                                aria-label="Email"
                            >
                                <MdAlternateEmail className="text-xl" />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li>
                                <Link
                                    href="#features"
                                    className="hover:text-primary transition-colors"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Lore Engine
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Canvas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="hover:text-primary transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/changelog"
                                    className="hover:text-primary transition-colors"
                                >
                                    Changelog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li>
                                <Link
                                    href="/docs"
                                    className="hover:text-primary transition-colors"
                                >
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="hover:text-primary transition-colors">
                                    API Reference
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/community"
                                    className="hover:text-primary transition-colors"
                                >
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#showcase"
                                    className="hover:text-primary transition-colors"
                                >
                                    Showcase
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-primary transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="hover:text-primary transition-colors"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Legal
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-primary transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-text-muted text-center md:text-left">
                        © 2026 OT-Muse. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-text-muted">
                        <Link href="/privacy" className="hover:text-primary">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
