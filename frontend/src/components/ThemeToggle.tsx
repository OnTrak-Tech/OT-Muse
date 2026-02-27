"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevents hydration mismatch
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9"></div>; // Placeholder space for SSR
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" || theme === "oled" ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-full text-text-secondary hover:text-foreground hover:bg-surface-elevated transition-colors border border-transparent hover:border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === "dark" || theme === "oled" ? "Light" : "Dark"} Mode`}
        >
            <span className="material-symbols-outlined text-[20px]">
                {theme === "dark" || theme === "oled" ? "light_mode" : "dark_mode"}
            </span>
        </button>
    );
}
