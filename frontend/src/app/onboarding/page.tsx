import React from "react";
import OnboardingClient from "./OnboardingClient";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements (matching signup/login) */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="z-10 w-full max-w-5xl">
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20 mb-6">
                        <span className="material-symbols-outlined text-white text-[32px]">auto_awesome</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Welcome to OT-Muse</h1>
                    <p className="text-xl text-text-secondary max-w-2xl">
                        To tailor your experience, tell us how you'll primarily be using the Nova Engine.
                    </p>
                </div>

                <OnboardingClient />
            </div>
        </div>
    );
}
