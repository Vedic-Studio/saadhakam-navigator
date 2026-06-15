"use client";

/**
 * SSR-safe React hooks over the client user-state store.
 *
 * App Router renders these on the server first, so every hook starts from a
 * deterministic empty state (matching what the server produces) and only reads
 * localStorage inside useEffect after mount. This avoids hydration mismatches
 * and the "localStorage is not defined" server error. Writes also happen in
 * effects/handlers, never during render.
 *
 * The hooks compose the pure modules (`streak`, `bookmarks`) with the persistence
 * layer (`storage`). Event firing is intentionally NOT done here: feature
 * components call the typed wrappers in `@/lib/analytics/events` themselves, so
 * the store stays free of analytics coupling.
 */

import { useCallback, useEffect, useState } from "react";
import { recordActiveDay } from "@/lib/userState/streak";
import {
  hasBookmark,
  toggleBookmark,
  type Bookmark,
} from "@/lib/userState/bookmarks";
import {
  createInitialUserState,
  readUserState,
  readVisitCount,
  writeUserState,
  type UserState,
} from "@/lib/userState/storage";

/** Today's date as a YYYY-MM-DD string in the visitor's local timezone. */
function todayLocalYmd(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Shared hook that hydrates the persisted user state once on mount and exposes a
 * setter that both updates React state and writes through to localStorage.
 */
function useUserState(): [UserState, (next: UserState) => void] {
  // Start empty so server and first client render agree (no hydration mismatch).
  const [state, setState] = useState<UserState>(createInitialUserState);

  useEffect(() => {
    setState(readUserState());
  }, []);

  const update = useCallback((next: UserState) => {
    setState(next);
    writeUserState(next);
  }, []);

  return [state, update];
}

/**
 * Daily-streak hook.
 *
 * @returns `count` — current consecutive-day streak (0 until hydrated / first day).
 * @returns `recordToday()` — records today as an active day, applying the
 *   one-grace-day rule, and persists. Idempotent within the same calendar day.
 *   Does NOT fire `streak_day`; the caller fires it with the returned count.
 */
export function useStreak(): { count: number; recordToday: () => void } {
  const [state, update] = useUserState();

  const recordToday = useCallback(() => {
    // Read fresh from storage so concurrent surfaces in the same session do not
    // clobber each other with a stale in-memory copy.
    const current = readUserState();
    const nextStreak = recordActiveDay(current.streak, todayLocalYmd());
    update({ ...current, streak: nextStreak });
  }, [update]);

  return { count: state.streak.count, recordToday };
}

/**
 * Verse-bookmark hook.
 *
 * @returns `bookmarks` — the saved verses, oldest first (empty until hydrated).
 * @returns `isBookmarked(verseId)` — whether a verse is currently saved.
 * @returns `toggle(verseId, cluster)` — add when absent / remove when present,
 *   persisting the result. Does NOT fire `verse_bookmark`; the caller fires it.
 */
export function useBookmarks(): {
  bookmarks: Bookmark[];
  isBookmarked: (verseId: string) => boolean;
  toggle: (verseId: string, cluster: string) => void;
} {
  const [state, update] = useUserState();

  const isBookmarked = useCallback(
    (verseId: string) => hasBookmark(state.bookmarks, verseId),
    [state.bookmarks],
  );

  const toggle = useCallback(
    (verseId: string, cluster: string) => {
      const current = readUserState();
      const nextBookmarks = toggleBookmark(current.bookmarks, verseId, cluster);
      update({ ...current, bookmarks: nextBookmarks });
    },
    [update],
  );

  return { bookmarks: state.bookmarks, isBookmarked, toggle };
}

/**
 * Read-only visit-count hook. Reads the count AnalyticsTracker maintains in
 * `sadhaka_return_visit_v1`; returns 0 on the server and until hydrated. Never
 * writes that key.
 */
export function useVisitCount(): number {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    setVisitCount(readVisitCount());
  }, []);

  return visitCount;
}
