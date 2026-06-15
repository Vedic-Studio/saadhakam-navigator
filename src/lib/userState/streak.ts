/**
 * Pure daily-streak logic for the client user-state store.
 *
 * This module holds NO side effects: it never touches localStorage, window, or
 * gtag. The caller reads the previously stored streak state, passes it in with
 * today's date as a YYYY-MM-DD string, persists the returned state, and (when a
 * day is newly recorded) fires the `streak_day` event separately. Keeping the
 * logic pure makes the grace-day and calendar-boundary behaviour fully testable
 * and trivially tunable.
 *
 * Grace rule (one grace day per streak, non-replenishing):
 *   - Each streak gets exactly ONE missed day it can absorb without breaking.
 *   - The first single-day miss in a streak consumes the grace and the streak
 *     continues. A second miss (or any miss after grace is used) resets it.
 *   - graceUsed resets to false only when the streak itself resets to 1.
 */

/** Persisted streak state. `lastActiveYmd` is the last recorded active day. */
export type StreakState = {
  /** Consecutive-day count including the last active day. >= 0. */
  count: number;
  /** Last active day as YYYY-MM-DD, or null when no day has been recorded. */
  lastActiveYmd: string | null;
  /** Whether this streak has already absorbed its one grace day. */
  graceUsed: boolean;
};

/** A fresh streak with nothing recorded yet. */
export const INITIAL_STREAK_STATE: StreakState = {
  count: 0,
  lastActiveYmd: null,
  graceUsed: false,
};

const YMD_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Convert a YYYY-MM-DD string to a UTC-midnight epoch-ms value. Returns null for
 * any string that is not a well-formed calendar date (including impossible dates
 * like 2026-02-30, which Date.UTC would silently roll over). Computing the gap
 * from UTC-midnight date parts (not raw "now" ms) is what keeps the streak free
 * of timezone drift: two calls on the same calendar day always read as gap 0.
 */
function ymdToUtcMs(ymd: string): number | null {
  const match = YMD_PATTERN.exec(ymd);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const ms = Date.UTC(year, month - 1, day);
  const check = new Date(ms);
  // Reject rolled-over dates (e.g. month 13, day 32) by round-tripping.
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }
  return ms;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Whole calendar days between two YYYY-MM-DD strings (today minus last). Computed
 * from UTC-midnight date parts so it is exact and timezone-independent. Returns
 * null when either date is malformed.
 */
export function calendarDaysBetween(lastYmd: string, todayYmd: string): number | null {
  const lastMs = ymdToUtcMs(lastYmd);
  const todayMs = ymdToUtcMs(todayYmd);
  if (lastMs === null || todayMs === null) {
    return null;
  }
  return Math.round((todayMs - lastMs) / MS_PER_DAY);
}

/**
 * Record today as an active day and return the next streak state.
 *
 * Branches (gap = calendar days between lastActiveYmd and todayYmd):
 *   - first ever (lastActiveYmd null)  -> { count: 1, today, graceUsed: false }
 *   - gap 0  (same day, idempotent)    -> state unchanged
 *   - gap 1  (consecutive)             -> { count+1, today, graceUsed unchanged }
 *   - gap 2  (one missed day)          -> grace available: { count+1, today, graceUsed: true }
 *                                         grace already used: reset { count: 1, today, graceUsed: false }
 *   - gap >= 3 (multiple missed days)  -> reset { count: 1, today, graceUsed: false }
 *
 * A malformed todayYmd is treated as a no-op (state returned unchanged) so a bad
 * caller can never corrupt a real streak. A malformed stored lastActiveYmd is
 * treated as a fresh first day.
 *
 * @param state    Previously persisted streak state.
 * @param todayYmd Today as a YYYY-MM-DD string (caller supplies, for testability).
 */
export function recordActiveDay(state: StreakState, todayYmd: string): StreakState {
  // A malformed "today" must not mutate a valid streak.
  if (ymdToUtcMs(todayYmd) === null) {
    return state;
  }

  // First ever active day, or unrecoverable prior state.
  if (state.lastActiveYmd === null) {
    return { count: 1, lastActiveYmd: todayYmd, graceUsed: false };
  }

  const gap = calendarDaysBetween(state.lastActiveYmd, todayYmd);

  // Corrupt stored date -> treat as a clean first day.
  if (gap === null) {
    return { count: 1, lastActiveYmd: todayYmd, graceUsed: false };
  }

  // Same calendar day: idempotent. (Also covers a clock that went backwards:
  // a negative gap is not a new forward day, so leave the streak untouched.)
  if (gap <= 0) {
    return state;
  }

  // Consecutive day.
  if (gap === 1) {
    return {
      count: state.count + 1,
      lastActiveYmd: todayYmd,
      graceUsed: state.graceUsed,
    };
  }

  // Exactly one missed day: spend the single grace if it is still available.
  if (gap === 2 && !state.graceUsed) {
    return {
      count: state.count + 1,
      lastActiveYmd: todayYmd,
      graceUsed: true,
    };
  }

  // Grace already spent on a 2-day gap, or a gap of 3+ days: reset.
  return { count: 1, lastActiveYmd: todayYmd, graceUsed: false };
}
