"use client";

import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SocialAuthButtons() {
    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98] cursor-pointer"
            >
                <FaGoogle className="text-xl" />
                <span>Continue with Google</span>
            </button>
            <button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98] cursor-pointer"
            >
                <FaGithub className="text-xl" />
                <span>Continue with GitHub</span>
            </button>
            <button
                type="button"
                onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98] cursor-pointer"
            >
                <FaDiscord className="text-xl" />
                <span>Continue with Discord</span>
            </button>
        </div>
    );
}
