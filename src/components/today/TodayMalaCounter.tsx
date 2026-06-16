"use client";

/**
 * One-tap 108-bead mala counter for the /today planetary-mantra card.
 *
 * This is the "investment" step of the daily Hook loop: each tap is a tiny,
 * frictionless commitment, and the ring toward 108 gives a goal-gradient pull to
 * finish the round. It is distinct from the generic `MantraCounter` because it
 * also drives the streak: on the FIRST tap of the day it records the day and
 * fires `streak_day`.
 *
 * Store / analytics stay separated per the foundation contract:
 *   1. `recordToday()` persists the active day (no analytics inside the store).
 *   2. We SEPARATELY fire `trackStreakDay(count, 'navagraha-mantra')`.
 * Because `useStreak().count` is React state (not fresh synchronously inside the
 * tap handler), we derive the exact post-record count from the pure
 * `recordActiveDay` over a fresh `readUserState()`, which is precisely what
 * `recordToday()` will persist. That also tells us whether today is the first tap
 * (so the streak fires once per day, on the first bead).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useStreak, readUserState, recordActiveDay } from "@/lib/userState";
import { trackStreakDay } from "@/lib/analytics/events";

const MALA_COUNT = 108;
const STREAK_CLUSTER = "navagraha-mantra";

/** Today's date as YYYY-MM-DD in the visitor's local timezone. */
function todayLocalYmd(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export interface TodayMalaCounterProps {
    /** Display name of the bound mantra (for the aria-label and celebration). */
    mantraName: string;
    /** Visitor-local storage key suffix; keeps the day's count distinct. */
    storageKey?: string;
    /**
     * Called the first time the visitor records a bead today, with the streak
     * length AFTER recording. The page wires this to nudge the streak banner.
     * Optional; the component fires `streak_day` itself regardless.
     */
    onFirstTapToday?: (streakLen: number) => void;
}

export function TodayMalaCounter({
    mantraName,
    storageKey = "today-mala",
    onFirstTapToday,
}: TodayMalaCounterProps) {
    const { recordToday } = useStreak();
    const reduceMotion = useReducedMotion();

    const [count, setCount] = useState(0);
    const [malaComplete, setMalaComplete] = useState(false);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const dayKey = `sadhaka_${storageKey}_count`;

    // Restore the in-progress bead count for today only (a fresh day starts at 0).
    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(dayKey);
            if (!raw) return;
            const parsed = JSON.parse(raw) as { ymd?: string; count?: number };
            if (parsed.ymd === todayLocalYmd() && typeof parsed.count === "number") {
                setCount(Math.min(parsed.count, MALA_COUNT));
            }
        } catch {
            // ignore malformed storage
        }
    }, [dayKey]);

    useEffect(() => {
        return () => {
            if (resetTimer.current) clearTimeout(resetTimer.current);
        };
    }, []);

    const persistCount = useCallback(
        (next: number) => {
            try {
                window.localStorage.setItem(dayKey, JSON.stringify({ ymd: todayLocalYmd(), count: next }));
            } catch {
                // ignore storage errors
            }
        },
        [dayKey],
    );

    const increment = useCallback(() => {
        // First tap of the day: record the streak day, then fire streak_day with
        // the exact post-record count. Detect "first today" from storage BEFORE
        // recordToday() mutates it, so this runs at most once per calendar day.
        const today = todayLocalYmd();
        const before = readUserState();
        const isFirstTapToday = before.streak.lastActiveYmd !== today;
        if (isFirstTapToday) {
            const after = recordActiveDay(before.streak, today);
            recordToday();
            trackStreakDay(after.count, STREAK_CLUSTER);
            onFirstTapToday?.(after.count);
        }

        setCount((prev) => {
            const next = prev + 1;
            if (next >= MALA_COUNT) {
                setMalaComplete(true);
                persistCount(0);
                resetTimer.current = setTimeout(() => {
                    setMalaComplete(false);
                    setCount(0);
                }, 2200);
                return MALA_COUNT;
            }
            persistCount(next);
            return next;
        });
    }, [onFirstTapToday, persistCount, recordToday]);

    const reset = useCallback(() => {
        if (resetTimer.current) clearTimeout(resetTimer.current);
        setMalaComplete(false);
        setCount(0);
        persistCount(0);
    }, [persistCount]);

    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const progress = count / MALA_COUNT;
    const dashOffset = circumference - circumference * progress;

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                type="button"
                onClick={increment}
                disabled={malaComplete}
                className="relative h-40 w-40 select-none rounded-full transition-transform duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95 disabled:cursor-default"
                aria-label={`Count one repetition of ${mantraName}. Currently ${count} of ${MALA_COUNT}.`}
            >
                <svg viewBox="0 0 128 128" className="absolute inset-0 h-full w-full" aria-hidden>
                    <circle cx={64} cy={64} r={radius} fill="none" stroke="currentColor" strokeWidth={3} opacity={0.12} />
                    <motion.circle
                        cx={64}
                        cy={64}
                        r={radius}
                        fill="none"
                        stroke="rgb(251 146 60)"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        transform="rotate(-90 64 64)"
                        initial={false}
                        animate={{ strokeDashoffset: dashOffset }}
                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 22 }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={count}
                            initial={reduceMotion ? false : { y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={reduceMotion ? { opacity: 0 } : { y: -8, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="font-display text-4xl font-bold tabular-nums text-foreground"
                        >
                            {count}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">of {MALA_COUNT}</span>
                </div>
            </button>

            <AnimatePresence>
                {malaComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center"
                        role="status"
                    >
                        <p className="font-display font-bold text-amber-300">Mala complete</p>
                        <p className="text-xs text-muted-foreground">One full round of 108. Om shanti.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {count > 0 && !malaComplete && (
                <button
                    type="button"
                    onClick={reset}
                    className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                    Reset count
                </button>
            )}
        </div>
    );
}
