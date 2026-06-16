"use client";

/**
 * Daily-streak banner — the loss-aversion trigger of the Hook loop.
 *
 * Behavioural design: a running streak is accumulated investment, and people
 * feel a loss roughly twice as strongly as the equivalent gain (Kahneman /
 * prospect theory). So once a streak exists we frame the call around what is at
 * risk ("Don't break your N-day streak") rather than a neutral gain. With no
 * streak yet, we use a low-pressure invitation instead, since there is nothing to
 * lose and pressure would only add friction to the first step.
 *
 * `count` comes from `useStreak()`, which is 0 on the server and until hydration.
 * To avoid a hydration mismatch and a flash of the wrong copy, the streak-aware
 * text is gated behind a `mounted` flag and only the neutral invitation renders
 * until the client has read localStorage. The banner does not fire analytics; the
 * mala counter owns `streak_day` when the day is actually recorded.
 */

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { useStreak } from "@/lib/userState";
import { cn } from "@/lib/utils";

export interface StreakBannerProps {
    className?: string;
    /**
     * Optional externally-driven streak count. When a parent already owns a
     * `useStreak()` instance (so the banner can update live after a mala tap), it
     * passes the count here and the banner skips its own hook. When omitted the
     * banner is self-contained and reads the streak itself.
     */
    count?: number;
}

export function StreakBanner({ className, count: countProp }: StreakBannerProps) {
    const ownStreak = useStreak();
    const count = countProp ?? ownStreak.count;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const hasStreak = mounted && count > 0;

    const headline = !mounted
        ? "Begin today"
        : count > 0
          ? `${count}-day streak`
          : "Begin today";

    const subline = !mounted
        ? "Tap a bead to start your daily practice."
        : count > 0
          ? `Don't break your ${count}-day streak. One round of the mala keeps it alive.`
          : "Tap a bead below to begin. Come back tomorrow and the day after to build a streak.";

    return (
        <div
            className={cn(
                "flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur-md transition-colors",
                hasStreak
                    ? "border-amber-400/40 bg-amber-500/10"
                    : "border-border bg-card/40",
                className,
            )}
            role="status"
            aria-live="polite"
        >
            <span
                aria-hidden
                className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                    hasStreak ? "bg-amber-500/20 text-amber-300" : "bg-muted text-muted-foreground",
                )}
            >
                <Flame className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="min-w-0">
                <p className="font-display text-lg font-bold leading-tight text-foreground">
                    {headline}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{subline}</p>
            </div>
        </div>
    );
}
