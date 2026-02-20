"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        // Allow only numbers
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-advance
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);

        if (/^\d+$/.test(pastedData)) {
            const newCode = [...code];
            pastedData.split("").forEach((char, i) => {
                if (i < 6) newCode[i] = char;
            });
            setCode(newCode);

            // Focus last filled input
            const lastIndex = Math.min(pastedData.length, 6) - 1;
            if (lastIndex >= 0) {
                inputRefs.current[lastIndex]?.focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fullCode = code.join("");
        if (fullCode.length !== 6) {
            toast.error("Please enter the 6-digit code.");
            return;
        }

        if (!email) {
            toast.error("Missing email address. Please try signing up again.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: fullCode }),
            });

            if (res.ok) {
                toast.success("Email verified exactly! Redirecting to login...");
                setTimeout(() => router.push("/login?verified=true"), 2000);
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to verify code.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Card Header */}
            <div className="px-8 pt-10 pb-2 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                    <span className="material-symbols-outlined text-[32px]">
                        mark_email_unread
                    </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                    Verify your email
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    We&apos;ve sent a 6-digit verification code to <br />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                        {email || "your email address"}
                    </span>.
                    <br />
                    Please enter it below to unlock your world.
                </p>
            </div>

            {/* Input Form */}
            <div className="px-8 py-6">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <fieldset className="flex justify-between gap-2 sm:gap-3" disabled={isSubmitting}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                autoFocus={index === 0}
                                autoComplete="one-time-code"
                                aria-label={`Digit ${index + 1}`}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="flex h-12 w-10 sm:h-14 sm:w-12 text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xl sm:text-2xl font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-slate-300 dark:placeholder-slate-600 caret-primary disabled:opacity-50"
                            />
                        ))}
                    </fieldset>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 disabled:bg-blue-400 text-white text-base font-bold tracking-wide shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
                    >
                        {isSubmitting ? "Verifying..." : "Verify Email"}
                    </button>
                </form>
            </div>

            {/* Footer / Resend */}
            <div className="px-8 pb-8 pt-2">
                <div className="flex flex-col items-center justify-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Didn&apos;t receive the code?
                        <button
                            className="ml-1 font-semibold text-slate-400 dark:text-slate-500 cursor-not-allowed transition-colors"
                            disabled
                        >
                            Resend functionality coming soon
                        </button>
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            arrow_back
                        </span>
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </>
    );
}
