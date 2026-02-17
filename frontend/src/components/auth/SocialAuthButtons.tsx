import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";

export default function SocialAuthButtons() {
    return (
        <div className="flex flex-col gap-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98]">
                <FaGoogle className="text-xl" />
                <span>Continue with Google</span>
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98]">
                <FaGithub className="text-xl" />
                <span>Continue with GitHub</span>
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#161b22] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1c2128] hover:border-white/20 hover:text-primary active:scale-[0.98]">
                <FaDiscord className="text-xl" />
                <span>Continue with Discord</span>
            </button>
        </div>
    );
}
