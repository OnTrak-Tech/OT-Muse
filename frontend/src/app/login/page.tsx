"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdPublic } from "react-icons/md";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthInput from "@/components/auth/AuthInput";
import { loginSchema } from "@/lib/validations/auth";

export default function LoginPage() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = loginSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
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

    return (
        <div className="flex min-h-screen w-full bg-[#0A0F0D] text-white font-sans">
            {/* Left Panel: Hero Image */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden p-12">
                <Image
                    src="/login-hero.png"
                    alt="Futuristic glowing AI city landscape in teal and emerald"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/40 to-transparent"></div>

                {/* Logo Area */}
                <div className="relative z-10 flex items-center gap-3">
                    <span className="text-xl font-bold tracking-wide text-white">OT-Muse</span>
                </div>

                {/* Quote */}
                <div className="relative z-10 max-w-md">
                    <blockquote className="text-2xl font-medium leading-relaxed text-white">
                        &quot;The universe is not made of atoms; it&apos;s made of stories waiting to be told.&quot;
                    </blockquote>
                    <p className="mt-4 text-base font-normal text-text-muted">— The Architect</p>
                </div>
            </div>

            {/* Right Panel: Auth Form */}
            <div className="flex w-full flex-col justify-center lg:w-1/2 bg-[#0A0F0D] p-6 sm:p-12 xl:p-24 relative">
                {/* Mobile Background (Absolute) */}
                <div className="absolute inset-0 lg:hidden z-0">
                    <Image
                        src="/login-hero.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-[#0A0F0D]/90"></div>
                </div>

                <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                            <MdPublic className="text-xl text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-wide text-white">OT-Muse</span>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Enter the Nexus
                        </h1>
                        <p className="mt-2 text-base text-text-secondary">
                            Welcome back to your creative sanctuary.
                        </p>
                    </div>

                    {/* Social Auth */}
                    <SocialAuthButtons />

                    {/* Divider */}
                    <AuthDivider />

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                        <AuthInput
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="name@otmuse.ai"
                            error={errors.email}
                            onChange={() => errors.email && setErrors((e) => ({ ...e, email: "" }))}
                        />
                        <div className="space-y-1">
                            <AuthInput
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password}
                                onChange={() => errors.password && setErrors((e) => ({ ...e, password: "" }))}
                            />
                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-primary hover:text-primary-light transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-5 py-3.5 text-base font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20 active:scale-[0.98]"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-sm text-text-muted">
                            New to OT-Muse?{" "}
                            <Link
                                href="/signup"
                                className="font-bold text-primary hover:text-primary-light transition-colors ml-1"
                            >
                                Sign Up
                            </Link>
                        </p>
                        <p className="text-xs text-text-muted/60 max-w-xs leading-relaxed">
                            By continuing, you agree to our{" "}
                            <Link href="/terms" className="underline hover:text-text-secondary">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="underline hover:text-text-secondary">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
