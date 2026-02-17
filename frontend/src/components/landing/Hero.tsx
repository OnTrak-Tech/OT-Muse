"use client";

import Image from "next/image";
import Link from "next/link";
import {
    MdArrowForward,
    MdPlayCircle,
    MdPlace,
    MdLightbulb,
    MdNearMe,
    MdHandshake,
    MdAdd,
    MdImage,
    MdRefresh,
    MdFolder,
    MdFolderOpen,
    MdAutoAwesome,
} from "react-icons/md";

export default function Hero() {
    return (
        <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A0F0D]">
            {/* Background decorative glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-50 animate-pulse"></div>
                <div className="absolute top-40 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] opacity-40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
                    Your Imagination, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                        Architected.
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                    The infinite canvas for AI-assisted world-building. Generate lore, map
                    relationships, and simulate histories in a single collaborative
                    workspace.
                </p>

                <div className="flex justify-center gap-4 mb-16">
                    <Link
                        href="/signup"
                        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-base font-semibold transition-all shadow-xl shadow-primary/30 flex items-center gap-2 group hover:-translate-y-1"
                    >
                        Enter the Editor
                        <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="bg-surface-elevated hover:bg-surface border border-white/10 text-white px-8 py-4 rounded-lg text-base font-semibold transition-all flex items-center gap-2 hover:border-primary/50">
                        <MdPlayCircle className="text-xl text-primary" />
                        Watch Demo
                    </button>
                </div>
            </div>

            {/* THE EDITOR MOCKUP */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="relative rounded-xl border border-white/10 bg-[#161b22] shadow-2xl overflow-hidden aspect-[16/9] lg:aspect-[21/9] transform lg:rotate-x-2 hover:rotate-0 transition-transform duration-700 group perspective-1000">
                    {/* Mockup Toolbar */}
                    <div className="h-12 border-b border-white/10 bg-[#0d1117] flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
                            <div className="px-3 py-1 rounded-full bg-white/5 cursor-pointer hover:text-primary hover:bg-white/10 transition-colors">
                                Project: Aethelgard
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                                Online
                            </div>
                        </div>
                        <div className="w-16"></div> {/* Spacer */}
                    </div>

                    {/* Mockup Body */}
                    <div className="flex h-full">
                        {/* Sidebar (Left) */}
                        <div className="w-64 border-r border-white/10 bg-[#0d1117] p-4 hidden md:flex flex-col gap-4">
                            <div className="flex items-center justify-between text-xs font-bold uppercase text-text-muted tracking-wider mb-2">
                                Assets
                                <MdAdd className="text-sm cursor-pointer hover:text-white" />
                            </div>
                            <div className="space-y-1">
                                <div className="p-2 rounded hover:bg-white/5 cursor-pointer flex items-center gap-3 text-sm text-text-secondary hover:text-white transition-colors">
                                    <MdFolder className="text-primary text-base" /> Characters
                                </div>
                                <div className="p-2 rounded bg-primary/10 border-l-2 border-primary cursor-pointer flex items-center gap-3 text-sm font-medium text-primary">
                                    <MdFolderOpen className="text-base" /> Locations
                                </div>
                                <div className="pl-9 text-xs text-text-muted py-1 cursor-pointer hover:text-white transition-colors">
                                    The Crystal Spire
                                </div>
                                <div className="pl-9 text-xs text-text-muted py-1 cursor-pointer hover:text-white transition-colors">
                                    Sunken Market
                                </div>
                                <div className="p-2 rounded hover:bg-white/5 cursor-pointer flex items-center gap-3 text-sm text-text-secondary hover:text-white transition-colors">
                                    <MdFolder className="text-orange-400 text-base" /> Factions
                                </div>
                                <div className="p-2 rounded hover:bg-white/5 cursor-pointer flex items-center gap-3 text-sm text-text-secondary hover:text-white transition-colors">
                                    <MdAutoAwesome className="text-purple-400 text-base" /> Lore Endine
                                </div>
                            </div>
                            <div className="mt-auto border-t border-white/10 pt-4">
                                <div className="text-xs font-mono text-text-muted mb-2">
                                    AI TOKENS: 8,402 / 10k
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[84%] bg-primary"></div>
                                </div>
                            </div>
                        </div>

                        {/* Main Canvas (Center) */}
                        <div className="flex-1 relative bg-[#0b0e14] overflow-hidden mockup-scroll group-hover:cursor-grab active:cursor-grabbing">
                            {/* Grid Pattern Background */}
                            <div
                                className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(#10B981 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                }}
                            ></div>

                            {/* Canvas Content: Node Graph */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-10 transform scale-90 group-hover:scale-100 transition-transform duration-700">
                                {/* Connection Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                    <path
                                        className="opacity-30"
                                        d="M400,300 C500,300 500,150 650,150"
                                        fill="none"
                                        stroke="#34D399"
                                        strokeWidth="2"
                                    ></path>
                                    <path
                                        className="opacity-30"
                                        d="M400,300 C500,300 500,450 650,450"
                                        fill="none"
                                        stroke="#34D399"
                                        strokeWidth="2"
                                    ></path>
                                    <path
                                        className="opacity-30"
                                        d="M650,150 C750,150 750,100 850,100"
                                        fill="none"
                                        stroke="#34D399"
                                        strokeWidth="2"
                                    ></path>
                                </svg>

                                {/* Center Node */}
                                <div className="absolute top-[300px] left-[400px] -translate-x-1/2 -translate-y-1/2 w-64 bg-[#161b22] border border-primary shadow-[0_0_30px_rgba(16,185,129,0.15)] rounded-lg p-4 z-10 group cursor-pointer hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white flex items-center gap-2">
                                            <MdPlace className="text-primary text-sm" /> Capital City
                                        </h3>
                                        <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-mono">
                                            HUB
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-secondary mb-3 line-clamp-2 leading-relaxed">
                                        The sprawling metropolis of glass and steel where the High
                                        Council meets to determine the fate of the outer rim.
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-6 h-6 rounded-full bg-surface border border-white/10 flex items-center justify-center text-[10px] text-text-muted">
                                            A
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-surface border border-white/10 -ml-3 flex items-center justify-center text-[10px] text-text-muted">
                                            B
                                        </div>
                                        <span className="text-[10px] text-text-muted ml-1 italic">
                                            Editing...
                                        </span>
                                    </div>
                                    {/* Connector dots */}
                                    <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-primary rounded-full border-2 border-[#0b0e14]"></div>
                                </div>

                                {/* Linked Node 1 */}
                                <div className="absolute top-[150px] left-[650px] -translate-x-1/2 -translate-y-1/2 w-48 bg-[#0d1117] border border-white/10 hover:border-primary/50 rounded-lg p-3 z-10 cursor-pointer transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-white/90 text-sm">
                                            Iron District
                                        </h4>
                                    </div>
                                    <p className="text-[10px] text-text-muted leading-relaxed">
                                        Industrial zone, heavy pollution, worker unrest.
                                    </p>
                                    <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-text-muted rounded-full border-2 border-[#0b0e14]"></div>
                                    <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-text-muted rounded-full border-2 border-[#0b0e14]"></div>
                                </div>

                                {/* Linked Node 2 */}
                                <div className="absolute top-[450px] left-[650px] -translate-x-1/2 -translate-y-1/2 w-48 bg-[#0d1117] border border-white/10 hover:border-primary/50 rounded-lg p-3 z-10 cursor-pointer transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-white/90 text-sm">
                                            Cloud Gardens
                                        </h4>
                                    </div>
                                    <p className="text-[10px] text-text-muted leading-relaxed">
                                        Elite residence, floating platforms, atmospheric generators.
                                    </p>
                                    <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-text-muted rounded-full border-2 border-[#0b0e14]"></div>
                                </div>

                                {/* Linked Node 3 (Far) - AI Suggestion */}
                                <div className="absolute top-[100px] left-[850px] -translate-x-1/2 -translate-y-1/2 w-40 bg-[#0d1117]/50 border border-white/10 border-dashed rounded-lg p-3 z-0 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <MdLightbulb className="text-yellow-500 text-xs" />
                                        <h4 className="font-medium text-text-muted text-xs italic">
                                            AI Suggestion
                                        </h4>
                                    </div>
                                    <p className="text-[10px] text-text-secondary leading-relaxed">
                                        Possible conflict: Resource shortage due to blockade?
                                    </p>
                                    <button className="mt-2 w-full bg-primary/20 hover:bg-primary/30 text-primary text-[10px] py-1 rounded transition-colors font-medium">
                                        Accept
                                    </button>
                                </div>
                            </div>

                            {/* Floating Action Bar (Bottom Center) */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#161b22]/90 backdrop-blur border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 shadow-xl z-20">
                                <button
                                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary hover:text-white text-text-muted flex items-center justify-center transition-colors tooltip"
                                    title="Select"
                                >
                                    <MdNearMe className="text-sm" />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary hover:text-white text-text-muted flex items-center justify-center transition-colors">
                                    <MdHandshake className="text-sm" />
                                </button>
                                <div className="w-px h-4 bg-white/10"></div>
                                <button className="w-8 h-8 rounded-full bg-primary hover:bg-primary-light text-white flex items-center justify-center shadow-lg shadow-primary/40 transition-colors">
                                    <MdAdd className="text-xl" />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary hover:text-white text-text-muted flex items-center justify-center transition-colors">
                                    <MdImage className="text-sm" />
                                </button>
                            </div>
                        </div>

                        {/* Inspector (Right) */}
                        <div className="w-72 border-l border-white/10 bg-[#0d1117] p-4 hidden xl:block overflow-y-auto mockup-scroll">
                            <h5 className="text-xs font-bold uppercase text-text-muted tracking-wider mb-4">
                                Properties
                            </h5>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-medium text-text-muted mb-1">
                                        NAME
                                    </label>
                                    <input
                                        className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        type="text"
                                        defaultValue="Capital City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-medium text-text-muted mb-1">
                                        TYPE
                                    </label>
                                    <select className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-primary transition-all">
                                        <option>Metropolis</option>
                                        <option>Village</option>
                                        <option>Outpost</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-medium text-text-muted mb-1">
                                        DESCRIPTION
                                    </label>
                                    <textarea
                                        className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none leading-relaxed transition-all resize-none"
                                        rows={4}
                                        defaultValue="The sprawling metropolis of glass and steel where the High Council meets to determine the fate of the outer rim."
                                    ></textarea>
                                </div>
                                <div className="pt-2 border-t border-white/10">
                                    <label className="block text-[10px] font-medium text-text-muted mb-2">
                                        GENERATED IMAGE
                                    </label>
                                    <div className="rounded-lg overflow-hidden border border-white/10 h-32 w-full bg-[#161b22] relative group cursor-pointer">
                                        <Image
                                            alt="Generated concept art"
                                            src="/hero-world.png"
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                                            <MdRefresh className="text-white text-2xl animate-spin-slow" />
                                        </div>
                                    </div>
                                    <button className="mt-2 w-full py-1.5 bg-primary hover:bg-primary-light text-white rounded text-xs font-medium transition-colors">
                                        Regenerate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
