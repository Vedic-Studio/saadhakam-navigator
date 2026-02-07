import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    dark?: boolean;
}

export function GlassCard({ children, className, dark = true, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border transition-all duration-300",
                dark
                    ? "bg-card/40 backdrop-blur-xl border-white/5 shadow-2xl hover:bg-card/60 hover:border-white/10 hover:shadow-primary/5 hover:-translate-y-1"
                    : "bg-white/40 backdrop-blur-xl border-white/20 shadow-lg hover:bg-white/60",
                className
            )}
            {...props}
        >
            {/* Internal shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {children}
        </div>
    );
}
