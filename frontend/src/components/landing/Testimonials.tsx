import { MdStar } from "react-icons/md";

// Simulating avatars with initials for privacy/performance
const Avatar = ({ initials }: { initials: string }) => (
    <div className="w-10 h-10 rounded-full bg-surface-elevated border border-white/10 flex items-center justify-center text-sm font-bold text-primary">
        {initials}
    </div>
);

export default function Testimonials() {
    return (
        <section className="py-24 bg-[#0A0F0D] border-t border-white/5" id="community">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-16 text-white">
                    Built for serious creators
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Testimonial 1 */}
                    <div className="p-6 rounded-2xl bg-[#161b22] border border-white/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-1 text-primary mb-4">
                            {[...Array(5)].map((_, i) => (
                                <MdStar key={i} className="text-sm" />
                            ))}
                        </div>
                        <p className="text-text-secondary mb-6 text-sm font-medium leading-relaxed italic">
                            &quot;OT-Muse cut our pre-production time in half. The ability to
                            visualize the political relationships between factions on the
                            canvas is a game changer for our narrative team.&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <Avatar initials="SJ" />
                            <div>
                                <div className="text-sm font-bold text-white">
                                    Sarah Jenkins
                                </div>
                                <div className="text-xs text-text-muted">
                                    Lead Narrative Designer, RPG Studio
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="p-6 rounded-2xl bg-[#161b22] border border-white/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-1 text-primary mb-4">
                            {[...Array(5)].map((_, i) => (
                                <MdStar key={i} className="text-sm" />
                            ))}
                        </div>
                        <p className="text-text-secondary mb-6 text-sm font-medium leading-relaxed italic">
                            &quot;Finally, a tool that understands context. I can ask it
                            &apos;what happens if this character dies?&apos; and it updates
                            the entire web of relationships instantly.&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <Avatar initials="MC" />
                            <div>
                                <div className="text-sm font-bold text-white">Marcus Chen</div>
                                <div className="text-xs text-text-muted">Indie Game Dev</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="p-6 rounded-2xl bg-[#161b22] border border-white/10 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-1 text-primary mb-4">
                            {[...Array(5)].map((_, i) => (
                                <MdStar key={i} className="text-sm" />
                            ))}
                        </div>
                        <p className="text-text-secondary mb-6 text-sm font-medium leading-relaxed italic">
                            &quot;The collaborative features are robust. We have writers in
                            three different time zones working on the same lore bible
                            simultaneously without conflicts.&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <Avatar initials="ER" />
                            <div>
                                <div className="text-sm font-bold text-white">
                                    Elena Rodriguez
                                </div>
                                <div className="text-xs text-text-muted">
                                    Showrunner, Netflix Animation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
