import { ReactNode } from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: ReactNode;
    error?: string;
}

export default function AuthInput({ label, icon, id, error, className = "", ...props }: AuthInputProps) {
    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={id} className="ml-1 text-xs font-semibold text-text-secondary">
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    className={`block w-full rounded-lg border bg-[#0A0F0D]/50 py-3 text-white placeholder-text-muted focus:bg-[#0A0F0D]/80 focus:ring-1 transition-all sm:text-sm sm:leading-6 ${error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-white/10 focus:border-primary focus:ring-primary"
                        } ${icon ? "pl-10" : "px-4"} ${className}`}
                    {...props}
                />
            </div>
            {error && (
                <p className="ml-1 text-xs text-red-400">{error}</p>
            )}
        </div>
    );
}
