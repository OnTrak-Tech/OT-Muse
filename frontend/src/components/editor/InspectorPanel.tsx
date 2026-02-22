/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function InspectorPanel() {
    return (
        <aside data-testid="inspector-panel" className="w-80 bg-white dark:bg-surface-dark border-l border-gray-200 dark:border-surface-border flex flex-col z-40 shadow-xl shrink-0">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-surface-border flex justify-between items-center">
                <h2 className="font-bold text-lg">Inspector</h2>
                <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-white"><span className="material-symbols-outlined text-[16px]">history</span></button>
                    <button className="text-gray-400 hover:text-white"><span className="material-symbols-outlined text-[16px]">more_horiz</span></button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">

                {/* Selected Element Info */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        Selected Element
                    </div>
                    <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-gray-200 dark:border-surface-border flex gap-3 items-center">
                        <div className="w-12 h-12 rounded bg-gray-700 overflow-hidden shrink-0">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW3Loy69T3jhIBqSHs6ofCk5to0DFotiXS4krl6WM7Cbc-rxokTM-Nw27BJkM1H3zA31uh4VB-utft2A8twWuNQTjnbPjTBsqaBJyNj9t_WEm2ak4lNXCIOPhw5b-po7Bgpmu8Or2kp0bLvw1aBSaHjAon8pUUpKaNOEA-roym3u8rF2qyqh1EGe8XHgUug9i01IiKlIYaUMN2cadJhw3i-oRNtwAXhfxlxbDOBlw2s7ZCmti64-zi8xJq6zXAGR7DEC1x7UaZ1uI" alt="Detail thumbnail" className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Scrap Metal Silo</h3>
                            <p className="text-xs text-gray-500">ID: #NVA-8922</p>
                        </div>
                    </div>
                </div>

                {/* Prompt Input */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Refinement Prompt</label>
                    <div className="relative">
                        <textarea
                            className="w-full bg-background-light dark:bg-background-dark border border-gray-200 dark:border-surface-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px] resize-none leading-relaxed"
                            placeholder="Describe changes..."
                            defaultValue="A towering, rusted water silo covered in glowing neon graffiti. Volumetric fog swirling at the base. Cyberpunk aesthetic, hyper-realistic textures, 8k resolution."
                        ></textarea>
                        <div className="absolute bottom-2 right-2">
                            <button className="text-xs bg-primary/20 text-primary hover:bg-primary hover:text-white px-2 py-1 rounded transition-colors">Enhance</button>
                        </div>
                    </div>
                </div>

                {/* Parameters */}
                <div className="space-y-4">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Generation Parameters</label>

                    {/* Slider 1 */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Chaos</span>
                            <span className="text-primary font-mono">0.45</span>
                        </div>
                        <input type="range" min="0" max="100" defaultValue="45" className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                    </div>

                    {/* Slider 2 */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Style Strength</span>
                            <span className="text-primary font-mono">0.80</span>
                        </div>
                        <input type="range" min="0" max="100" defaultValue="80" className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                    </div>

                    {/* Toggles */}
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-300">Preserve Structure</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:bg-primary right-5 border-gray-600" />
                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"></label>
                        </div>
                    </div>
                </div>

                {/* Variations History */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Variations</label>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square rounded-lg bg-background-dark border-2 border-primary overflow-hidden relative cursor-pointer">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7IhGdK71e6SZcpHzK0S3T1Z_HeJrwmZq0LSRqtX6Wg5IqN7PDFx69eQCztGXK8zpAT2X_LE91IomDCW_-D6F_YHGiBM7GogU4cBaCXRzZRFnjCpFNNbq3ewVwjo3KuCaRxKwrUO7xtAQuHR3HED7b2Xe2VkAPUeemorgOwjczWojbq1V_pxm72CWv8AIkoZLG1a8kUvUGyOh7a8V-6TRZq-hbLqfvB9rwAOivUF4zIA_HJF2AdnyrKE1YUT0tpKYeBWD5nn7NMEE" alt="Variation 1" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-primary/20"></div>
                        </div>
                        <div className="aspect-square rounded-lg bg-background-dark border border-gray-700 overflow-hidden cursor-pointer hover:border-gray-500 transition-colors">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy9qHbAfEWoL8JkKyS5ZXBaPGQ-u2QWzcYytoD6Qy-drycbDuLzhlypr1BIXTzXWCMShQm1YF-ar3hwlqvWgPyVipJBoKtLcxiuiBP8HMI4hdLMtk4tgLD2RCHKygAJF-CyikmLOhCAZN534p5eGisCT26Eak7raPYd7ugHuJ7svbKRDbDyf23dILLpCBZy2jkqsrvv10p-Z9lo9CEICTu4CUY27B87Wcm_yQEs_yVXqXm9U4QKSHAmFfQblaM69yORNlJ1aTnFGc" alt="Variation 2" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="aspect-square rounded-lg bg-background-dark border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors text-gray-500">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-surface-border bg-background-light dark:bg-background-dark/50 mt-auto">
                <button className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all">
                    <span className="material-symbols-outlined animate-pulse text-[18px]">auto_awesome</span>
                    Generate Changes
                </button>
                <div className="text-center mt-2 text-[10px] text-gray-500">Cost: 4 credits</div>
            </div>
        </aside>
    );
}
