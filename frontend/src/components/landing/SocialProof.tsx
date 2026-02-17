import { MdHexagon, MdAllInclusive, MdBolt, MdWaves } from "react-icons/md";

export default function SocialProof() {
    return (
        <section className="py-10 border-y border-white/5 bg-[#0A0F0D]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm text-text-muted font-medium mb-6 uppercase tracking-widest">
                    Powering narrative teams at
                </p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2 text-xl font-bold font-sans text-white hover:text-primary transition-colors cursor-default">
                        <MdHexagon className="text-2xl" /> NEXUS
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold font-sans text-white hover:text-primary transition-colors cursor-default">
                        <MdAllInclusive className="text-2xl" /> InfinityLoops
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold font-sans text-white hover:text-primary transition-colors cursor-default">
                        <MdBolt className="text-2xl" /> STRIKE
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold font-sans text-white hover:text-primary transition-colors cursor-default">
                        <MdWaves className="text-2xl" /> FlowState
                    </div>
                </div>
            </div>
        </section>
    );
}
