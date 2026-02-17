"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthInput from "@/components/auth/AuthInput";
import { signupSchema } from "@/lib/validations/auth";

export default function SignupPage() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setServerError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        };

        // Client-side validation
        const result = signupSchema.safeParse(data);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0] as string;
                if (!fieldErrors[key]) fieldErrors[key] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                }),
            });

            const body = await res.json();

            if (!res.ok) {
                setServerError(body.error ?? "Something went wrong");
            } else {
                setSuccess(true);
            }
        } catch {
            setServerError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function clearError(field: string) {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    }

    // Success state — check your email
    if (success) {
        return (
            <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0F0D] font-sans">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/signup-bg.jpg"
                        alt="Abstract dark nebula space background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#0A0F0D]/80 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-10 w-full max-w-md mx-4 p-8 rounded-2xl border border-white/10 bg-[#161b22]/70 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-6 text-center animate-fade-in shadow-primary/10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                        We&apos;ve sent a verification link to your email. Click it to activate your account, then come back to log in.
                    </p>
                    <Link
                        href="/login"
                        className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white text-center shadow-lg shadow-primary/20 hover:bg-primary-light transition-all"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0F0D] font-sans">
            {/* Background Image with Blur Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/signup-bg.jpg"
                    alt="Abstract dark nebula space background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-[#0A0F0D]/80 backdrop-blur-sm"></div>
            </div>

            {/* Main Card Container */}
            <div className="relative z-10 w-full max-w-md mx-4 p-8 rounded-2xl border border-white/10 bg-[#161b22]/70 backdrop-blur-xl shadow-2xl flex flex-col gap-6 animate-fade-in shadow-primary/10">
                {/* Header Section */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">OT-Muse</h1>
                    <p className="text-text-muted text-sm">
                        Return to your universe. Build worlds together.
                    </p>
                </div>

                {/* Server Error Banner */}
                {serverError && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {serverError}
                    </div>
                )}

                {/* SSO Buttons */}
                <SocialAuthButtons />

                {/* Divider */}
                <AuthDivider text="Or create account with email" />

                {/* Email / Password Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                    <AuthInput
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="creator@otmuse.ai"
                        error={errors.email}
                        onChange={() => clearError("email")}
                    />
                    <AuthInput
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password}
                        onChange={() => clearError("password")}
                    />
                    <AuthInput
                        id="confirm-password"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.confirmPassword}
                        onChange={() => clearError("confirmPassword")}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-light hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Enter World"}
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-text-muted">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-primary hover:text-primary-light transition-colors"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Decorative Orbs */}
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none"></div>
        </div>
    );
}
