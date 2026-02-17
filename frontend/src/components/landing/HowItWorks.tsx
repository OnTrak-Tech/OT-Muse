import { MdAutoFixHigh, MdTune, MdHub } from "react-icons/md";

export default function HowItWorks() {
    return (
        <section className="py-24 bg-[#11161d] relative overflow-hidden" id="features">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#1E3A30 1px, transparent 1px), linear-gradient(90deg, #1E3A30 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        From thought to theory in seconds.
                    </h2>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        OT-Muse streamlines the chaotic process of world-building into a
                        structured, AI-enhanced workflow.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

                    {/* Step 1 */}
                    <div className="relative z-10 group">
                        <div className="w-24 h-24 mx-auto bg-[#11161d] border-4 border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                            <span className="text-4xl font-bold text-text-muted group-hover:text-primary transition-colors">
                                01
                            </span>
                        </div>
                        <div className="bg-[#161b22] p-8 rounded-xl shadow-lg border border-white/10 hover:-translate-y-2 transition-transform duration-300 hover:shadow-primary/5 hover:border-primary/30">
                            <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                <MdAutoFixHigh className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Prompt</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Describe your realm&apos;s vibe, genre, or constraints. Our LLM
                                engine generates a foundational bible of lore, geography, and
                                factions instantly.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 group">
                        <div className="w-24 h-24 mx-auto bg-[#11161d] border-4 border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                            <span className="text-4xl font-bold text-text-muted group-hover:text-primary transition-colors">
                                02
                            </span>
                        </div>
                        <div className="bg-[#161b22] p-8 rounded-xl shadow-lg border border-white/10 hover:-translate-y-2 transition-transform duration-300 hover:shadow-primary/5 hover:border-primary/30">
                            <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                <MdTune className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Refine</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Use the Canvas to visualize connections. Drag, drop, and edit
                                nodes. Ask the AI to resolve logical inconsistencies in your
                                timeline.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 group">
                        <div className="w-24 h-24 mx-auto bg-[#11161d] border-4 border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                            <span className="text-4xl font-bold text-text-muted group-hover:text-primary transition-colors">
                                03
                            </span>
                        </div>
                        <div className="bg-[#161b22] p-8 rounded-xl shadow-lg border border-white/10 hover:-translate-y-2 transition-transform duration-300 hover:shadow-primary/5 hover:border-primary/30">
                            <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 text-emerald-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                <MdHub className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Collaborate</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Invite your team. Assign roles. Build history together in
                                real-time with granular permissions and version control for
                                every entity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
