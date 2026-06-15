/**
 * SSR-safe localStorage persistence for the client user-state store.
 *
 * App Router renders components on the server, so every access here guards
 * `typeof window`. Nothing in this module runs at import time and nothing should
 * be called during render: hooks call these inside useEffect only. All reads and
 * writes are wrapped in try/catch because localStorage throws in private mode and
 * when the quota is exceeded; a storage failure must never break navigation.
 *
 * Two keys are involved:
 *   - sadhaka_user_state_v1  (owned here): the streak + bookmarks blob.
 *   - sadhaka_return_visit_v1 (owned by AnalyticsTracker): read-only here for the
 *     visit count. We never write it, so AnalyticsTracker's write path is intact.
 */

import {
  INITIAL_STREAK_STATE,
  type StreakState,
} from "@/lib/userState/streak";
import { normalizeBookmarks, type Bookmark } from "@/lib/userState/bookmarks";

/** Versioned storage key for the streak + bookmarks blob owned by this store. */
export const USER_STATE_STORAGE_KEY = "sadhaka_user_state_v1";

/**
 * Key written by AnalyticsTracker (`src/components/AnalyticsTracker.tsx`) via the
 * pure `returnVisit` module. We only ever READ it here.
 */
export const RETURN_VISIT_STORAGE_KEY = "sadhaka_return_visit_v1";

/** The full persisted user-state blob. */
export type UserState = {
  streak: StreakState;
  bookmarks: Bookmark[];
};

/** A fresh, empty user state. */
export function createInitialUserState(): UserState {
  return { streak: { ...INITIAL_STREAK_STATE }, bookmarks: [] };
}

function normalizeStreak(stored: unknown): StreakState {
  if (!stored || typeof stored !== "object") {
    return { ...INITIAL_STREAK_STATE };
  }
  const candidate = stored as Record<string, unknown>;
  const count =
    typeof candidate.count === "number" && Number.isFinite(candidate.count) && candidate.count >= 0
      ? Math.floor(candidate.count)
      : 0;
  const lastActiveYmd =
    typeof candidate.lastActiveYmd === "string" && candidate.lastActiveYmd.length > 0
      ? candidate.lastActiveYmd
      : null;
  const graceUsed = candidate.graceUsed === true;
  // A zero/absent count with no recorded day is the clean initial state.
  if (lastActiveYmd === null) {
    return { ...INITIAL_STREAK_STATE };
  }
  return { count: count === 0 ? 1 : count, lastActiveYmd, graceUsed };
}

/**
 * Coerce arbitrary parsed JSON into a valid UserState. Exported so the pure
 * normalisation is unit-testable without touching the DOM.
 */
export function normalizeUserState(stored: unknown): UserState {
  if (!stored || typeof stored !== "object") {
    return createInitialUserState();
  }
  const candidate = stored as Record<string, unknown>;
  return {
    streak: normalizeStreak(candidate.streak),
    bookmarks: normalizeBookmarks(candidate.bookmarks),
  };
}

/**
 * Read the persisted user state. Returns a clean initial state on the server,
 * in private mode, or when the stored value is missing or corrupt. Never throws.
 */
export function readUserState(): UserState {
  if (typeof window === "undefined") {
    return createInitialUserState();
  }
  try {
    const raw = window.localStorage.getItem(USER_STATE_STORAGE_KEY);
    if (!raw) {
      return createInitialUserState();
    }
    return normalizeUserState(JSON.parse(raw));
  } catch {
    return createInitialUserState();
  }
}

/**
 * Persist the user state. Best-effort: silently no-ops on the server and on any
 * storage failure (private mode, quota). Never throws.
 */
export function writeUserState(state: UserState): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(USER_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // no-op: persistence is best-effort.
  }
}

/**
 * Read the current visit count from the return-visit key that AnalyticsTracker
 * maintains. Returns 0 on the server, in private mode, or when the key is absent
 * or corrupt (i.e. before AnalyticsTracker has run once). This is read-only: it
 * never writes the key, so the AnalyticsTracker write path is untouched.
 */
export function readVisitCount(): number {
  if (typeof window === "undefined") {
    return 0;
  }
  try {
    const raw = window.localStorage.getItem(RETURN_VISIT_STORAGE_KEY);
    if (!raw) {
      return 0;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return 0;
    }
    const visitCount = (parsed as Record<string, unknown>).visitCount;
    if (typeof visitCount === "number" && Number.isFinite(visitCount) && visitCount >= 0) {
      return Math.floor(visitCount);
    }
    return 0;
  } catch {
    return 0;
  }
}
