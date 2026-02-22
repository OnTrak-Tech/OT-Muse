import React from 'react';

export default function EditorToolbar() {
    return (
        <aside data-testid="editor-toolbar" className="absolute left-6 top-6 z-40 flex flex-col gap-2">
            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-2 rounded-full shadow-lg flex flex-col gap-2 w-12 items-center">
                <button className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors tooltip-wrapper relative group">
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                    <span className="absolute left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Select (V)</span>
                </button>
                <button className="w-8 h-8 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center group relative">
                    <span className="material-symbols-outlined text-[18px]">pan_tool</span>
                    <span className="absolute left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Pan (H)</span>
                </button>
                <button className="w-8 h-8 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center group relative">
                    <span className="material-symbols-outlined text-[18px]">brush</span>
                    <span className="absolute left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Inpaint (I)</span>
                </button>

                <div className="w-6 h-px bg-gray-200 dark:bg-gray-700 my-1"></div>

                <button className="w-8 h-8 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center group relative">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span className="absolute left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Zoom In</span>
                </button>
                <button className="w-8 h-8 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center group relative">
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                    <span className="absolute left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Zoom Out</span>
                </button>
            </div>

            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-2 rounded-full shadow-lg flex flex-col gap-2 w-12 items-center mt-2">
                <button className="w-8 h-8 rounded-full text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30 transition-colors flex items-center justify-center group relative">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    <span className="absolute left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Explore Mode</span>
                </button>
            </div>
        </aside>
    );
}
