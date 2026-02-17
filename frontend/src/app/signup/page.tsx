"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdPublic } from "react-icons/md";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthInput from "@/components/auth/AuthInput";
import { signupSchema } from "@/lib/validations/auth";

export default function SignupPage() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = signupSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        });

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
        // TODO: Submit to backend API
    }

    function clearError(field: string) {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
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
                        className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-light hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 active:scale-[0.98]"
                    >
                        Enter World
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
