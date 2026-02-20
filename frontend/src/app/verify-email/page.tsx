import React from "react";
import VerifyEmailForm from "../../components/auth/VerifyEmailForm";


export default function VerifyEmailPage() {
    return (
        <main className="relative flex-grow flex items-center justify-center min-h-screen p-4 pt-20 overflow-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary/30 selection:text-primary">
            {/* Background with Blur and Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Background Image - Using the same URL from the mockup */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 dark:opacity-40"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0DsE0cOSS2g_2jW-hqrvnMT_ThEefk0wYQooIGN_ipCqJdyHRTzvpMF-0A3IEl87q1k-RzzkoZcOBZKzXAhl4Db8guWkDIjxlfKO2cuDpAXztY5PjEcJIlFwP7a_hnKYYzpYr839XRkp1kzwAE5dsJw0jDO_TgRnzGHTy4BaQoQfhSrF7FqYmhWZRFhzaC14h8WzDxB8ZrQjO4clcnDOiKztARNgRBbCf3xHx7x0wKEuB1G2vI_MsYsDAcZP7BADYpSD3k4PDzkw')",
                    }}
                />
                {/* Heavy Blur Overlay */}
                <div className="absolute inset-0 backdrop-blur-xl bg-background-light/40 dark:bg-background-dark/60" />
                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-light/20 to-background-light dark:via-background-dark/50 dark:to-background-dark" />
            </div>

            {/* Verification Card */}
            <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm">
                    {/* Card Header and Form handled by client component for interactivity */}
                    <React.Suspense fallback={<div className="p-8 text-center text-slate-500">Loading form...</div>}>
                        <VerifyEmailForm />
                    </React.Suspense>

                    {/* Decorative bottom bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-primary" />
                </div>

                {/* Security Badge */}
                <div className="mt-8 flex justify-center gap-6 text-slate-500/60 dark:text-slate-400/50 text-xs font-medium uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">
                            lock
                        </span>
                        Secure Encryption
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">
                            verified_user
                        </span>
                        Verified System
                    </div>
                </div>
            </div>
        </main>
    );
}
