export default function AuthDivider({ text = "Or continue with email" }: { text?: string }) {
    return (
        <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 px-4 text-xs font-medium uppercase tracking-widest text-text-muted">
                {text}
            </span>
            <div className="flex-grow border-t border-white/10"></div>
        </div>
    );
}
