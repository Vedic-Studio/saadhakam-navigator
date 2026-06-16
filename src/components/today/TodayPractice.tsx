"use client";

/**
 * Client composition of the daily practice loop: the loss-aversion streak banner
 * sits directly above the one-tap mala counter, sharing a single `useStreak()`
 * instance so the banner updates live the moment the day is recorded. This keeps
 * the trigger (banner) and the investment (counter) in one visual unit, which is
 * how the Hook loop is meant to read.
 *
 * The counter still owns persistence (`recordToday`) and the `streak_day` event;
 * here we only listen for "first tap today" to refresh the shared count so the
 * banner re-renders from "Begin today" into the live streak.
 */

import { useCallback, useState } from "react";
import { useStreak } from "@/lib/userState";
import { StreakBanner } from "@/components/today/StreakBanner";
import { TodayMalaCounter } from "@/components/today/TodayMalaCounter";

export interface TodayPracticeProps {
    mantraName: string;
}

export function TodayPractice({ mantraName }: TodayPracticeProps) {
    const { count } = useStreak();
    // After the first tap of the day the counter reports the new streak length;
    // we surface it immediately so the banner doesn't wait for a remount.
    const [recordedCount, setRecordedCount] = useState<number | null>(null);

    const handleFirstTapToday = useCallback((streakLen: number) => {
        setRecordedCount(streakLen);
    }, []);

    const liveCount = recordedCount ?? count;

    return (
        <div className="flex flex-col gap-6">
            <StreakBanner count={liveCount} />
            <TodayMalaCounter mantraName={mantraName} onFirstTapToday={handleFirstTapToday} />
        </div>
    );
}
