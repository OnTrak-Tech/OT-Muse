import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-20 bg-background relative overflow-hidden border-t border-border">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
                    Start building your universe today.
                </h2>
                <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of creators using OT-Muse to bring their stories to
                    life. Free for individuals, powerful for teams.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/signup"
                        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-xl shadow-primary/20 transition-all transform hover:scale-105"
                    >
                        Get Started for Free
                    </Link>
                    <Link
                        href="/pricing"
                        className="bg-surface-elevated hover:bg-surface text-foreground border border-border px-8 py-4 rounded-lg text-lg font-semibold shadow-sm transition-all hover:border-primary/50"
                    >
                        View Enterprise Plans
                    </Link>
                </div>
            </div>
        </section>
    );
}
