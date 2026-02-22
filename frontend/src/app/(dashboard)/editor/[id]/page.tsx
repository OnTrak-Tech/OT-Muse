/* eslint-disable @next/next/no-img-element */
import React from "react";
import EditorToolbar from "@/components/editor/EditorToolbar";
import InspectorPanel from "@/components/editor/InspectorPanel";
import Link from "next/link";

export default function EditorPage() {
    return (
        <div data-testid="editor-page" className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100">
            {/* Top Navigation Bar */}
            <nav className="h-16 border-b border-gray-200 dark:border-surface-border bg-white/80 dark:bg-surface-dark/95 backdrop-blur-md flex items-center justify-between px-6 z-50 shrink-0">
                {/* Left: Branding & Breadcrumbs */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tighter">
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                        <span className="hidden sm:inline">NOVA MUSE</span>
                    </div>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Link href="/dashboard" className="hover:text-primary cursor-pointer transition-colors">Projects</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="hover:text-primary cursor-pointer transition-colors hidden sm:inline">Sector 7</span>
                        <span className="material-symbols-outlined text-[16px] hidden sm:inline">chevron_right</span>
                        <span className="text-gray-900 dark:text-white font-medium">The Rust Outpost</span>
                    </div>
                </div>

                {/* Right: Collaboration & Actions */}
                <div className="flex items-center gap-4">
                    {/* Collaborators */}
                    <div className="flex items-center -space-x-2">
                        <div className="relative w-8 h-8 rounded-full ring-2 ring-white dark:ring-background-dark overflow-hidden bg-indigo-500 flex items-center justify-center text-xs font-bold text-white z-20" title="Alex">
                            AL
                        </div>
                        <div className="relative w-8 h-8 rounded-full ring-2 ring-white dark:ring-background-dark overflow-hidden z-10">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8lqogPM15Tpgr8k1Cm6lkvtn0urr6D1Nm-UU9ZpVDe_qlthkmUIoOXr6aWq8SuB2iqogV4xk3UyOAc02PO1zwjnUIehteeocvik1aBqqRLzYZsfsDUGMpwhiM_SZUX5905VQBVc1dRelPUB6Y8X2yWMmScCshDA9NyWkLfQIHp2BMdR9tBtpog41u8NHmRTvV9Bg_GVtX0Y_wmNwE6IwD2_HENK86VtQQO44N7Af4G6tcv8X0ajSJxC2CHneiroOIh6jLXeQ_hKw" alt="Collaborator" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative w-8 h-8 rounded-full ring-2 ring-white dark:ring-background-dark overflow-hidden bg-surface-border flex items-center justify-center text-xs text-gray-400 z-0">
                            +3
                        </div>
                    </div>

                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                    </button>
                    <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">ios_share</span>
                        Share
                    </button>
                </div>
            </nav>

            {/* Main Workspace */}
            <div className="flex-1 flex relative overflow-hidden">
                <EditorToolbar />

                {/* Central Canvas */}
                <div className="flex-1 bg-gray-900 relative overflow-hidden flex items-center justify-center group cursor-grab active:cursor-grabbing">
                    {/* Grid Background Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#135bec 1px, transparent 1px), radial-gradient(#135bec 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>

                    {/* Main Image Container */}
                    <div className="relative w-full max-w-[1200px] aspect-[3/2] shadow-2xl rounded-lg overflow-hidden transition-transform duration-200 ease-out transform scale-90">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKPtRE0mB228vVm4N55oSlvvm3cdHYokmG0Rd7f1Ksvi-twd_twCOLx8fhTSf2XImQA2dzU2IWJiwS_VeZfatABu-F3YpoADO8SBRcDezL2gYi99UJvYEkyLY5hhPF6x4pT7qTB2ZI0VcK07g7ipBcYkDOD26hcu50Nwtu3YUD9SVVKh_Xy3ITTwUDxyHdxav1Z7LITji2gDSrql_mSdlkwLWhWpxVQq_8h_kpLRE6GbKpnu2At8E8rPAhFjOUZAeKikdEiRze5P8" alt="Base Canvas" className="w-full h-full object-cover" />

                        {/* Interactive Node 1: Selected */}
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative group/node cursor-pointer">
                                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping opacity-75"></div>
                                <div className="w-6 h-6 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center relative z-10 ring-4 ring-primary/30">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                {/* Hover Tooltip */}
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-surface-dark/90 backdrop-blur border border-surface-border text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-100 transition-opacity">
                                    Scrap Metal Silo
                                </div>
                            </div>
                        </div>

                        {/* Interactive Node 2: Unselected */}
                        <div className="absolute bottom-1/4 right-1/3">
                            <div className="relative group/node cursor-pointer">
                                <div className="w-4 h-4 rounded-full bg-white/20 border border-white/60 hover:bg-primary hover:border-white shadow-lg flex items-center justify-center transition-all"></div>
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-surface-dark/90 backdrop-blur border border-surface-border text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none">
                                    Abandoned Rover
                                </div>
                            </div>
                        </div>

                        {/* Interactive Node 3: Unselected */}
                        <div className="absolute top-1/4 left-1/4">
                            <div className="relative group/node cursor-pointer">
                                <div className="w-4 h-4 rounded-full bg-white/20 border border-white/60 hover:bg-primary hover:border-white shadow-lg flex items-center justify-center transition-all"></div>
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-surface-dark/90 backdrop-blur border border-surface-border text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none">
                                    Distant Smoke
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Canvas Controls (Scale) */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface-dark/80 backdrop-blur px-4 py-1.5 rounded-full border border-surface-border text-xs font-mono text-gray-400 flex gap-4">
                        <span>1200 x 800px</span>
                        <span>|</span>
                        <span>Scale: 90%</span>
                    </div>
                </div>

                <InspectorPanel />
            </div>
        </div>
    );
}
