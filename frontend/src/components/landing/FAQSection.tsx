import React from "react";

export default function FAQSection() {
    return (
        <section className="py-24 bg-background z-10 relative">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-foreground mb-16">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div className="group bg-surface rounded-xl p-6 border border-border hover:border-text-muted transition-colors">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-foreground">
                                <span>Can I switch plans later?</span>
                                <span className="transition group-open:rotate-180">
                                    <span className="material-symbols-outlined text-text-muted">expand_more</span>
                                </span>
                            </summary>
                            <p className="text-text-secondary mt-3 group-open:animate-fadeIn leading-relaxed text-sm">
                                Absolutely. You can upgrade or downgrade your plan at any time. If you upgrade, the prorated amount will be charged immediately. If you downgrade, credit will be applied to your next billing cycle.
                            </p>
                        </details>
                    </div>
                    <div className="group bg-surface rounded-xl p-6 border border-border hover:border-text-muted transition-colors">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-foreground">
                                <span>What happens to my data if I cancel?</span>
                                <span className="transition group-open:rotate-180">
                                    <span className="material-symbols-outlined text-text-muted">expand_more</span>
                                </span>
                            </summary>
                            <p className="text-text-secondary mt-3 group-open:animate-fadeIn leading-relaxed text-sm">
                                Your worlds are yours. If you cancel your subscription, your account will revert to the Free/Explorer tier. Any data exceeding the free limits will be locked (read-only) but not deleted for 6 months. You can export your data at any time.
                            </p>
                        </details>
                    </div>
                    <div className="group bg-surface rounded-xl p-6 border border-border hover:border-text-muted transition-colors">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-foreground">
                                <span>How does the Free Tier token limit work?</span>
                                <span className="transition group-open:rotate-180">
                                    <span className="material-symbols-outlined text-text-muted">expand_more</span>
                                </span>
                            </summary>
                            <p className="text-text-secondary mt-3 group-open:animate-fadeIn leading-relaxed text-sm">
                                We give free users a generous daily token budget to explore and generate world lore. When you hit your cap, you just need to wait for the 24-hour cooldown before generating more content.
                            </p>
                        </details>
                    </div>
                    <div className="group bg-surface rounded-xl p-6 border border-border hover:border-text-muted transition-colors">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-foreground">
                                <span>Do you offer discounts for students or non-profits?</span>
                                <span className="transition group-open:rotate-180">
                                    <span className="material-symbols-outlined text-text-muted">expand_more</span>
                                </span>
                            </summary>
                            <p className="text-text-secondary mt-3 group-open:animate-fadeIn leading-relaxed text-sm">
                                Yes! We offer a 50% discount on the Pro plan for students with a valid .edu email address and registered non-profit organizations. Contact our support team to apply.
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </section>
    );
}
