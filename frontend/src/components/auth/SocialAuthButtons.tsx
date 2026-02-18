"use client";

import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SocialAuthButtons() {

    const handleLogin = async (provider: "google" | "github" | "discord") => {
        try {
            console.log(`[Auth] Attempting login with ${provider}...`);
            const result = await signIn(provider, {
                callbackUrl: "/dashboard",
                redirect: true
            });
            console.log(`[Auth] Result for ${provider}:`, result);
        } catch (error) {
            console.error(`[Auth] Error logging in with ${provider}:`, error);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                onClick={() => handleLogin("google")}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98] cursor-pointer"
            >
                <FaGoogle className="text-xl" />
                <span>Continue with Google</span>
            </button>
            <button
                type="button"
                onClick={() => handleLogin("github")}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98] cursor-pointer"
            >
                <FaGithub className="text-xl" />
                <span>Continue with GitHub</span>
            </button>
            <button
                type="button"
                onClick={() => handleLogin("discord")}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98] cursor-pointer"
            >
                <FaDiscord className="text-xl" />
                <span>Continue with Discord</span>
            </button>
        </div>
    );
}
