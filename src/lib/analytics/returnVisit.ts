/**
 * Pure return-visit computation for the `return_visit` analytics event.
 *
 * This module holds NO side effects. It does not touch localStorage, gtag,
 * or window. The caller reads the previously stored state, passes it in with
 * the current epoch-ms, and persists the returned `nextStored`. Keeping the
 * logic pure makes the day-boundary and corruption handling fully testable.
 *
 * Event contract: `return_visit` fires once per session when isReturn is true,
 * carrying { days_since_last, visit_count }. visit_count increments per session;
 * days_since_last is whole days between now and the last visit (0 if same day);
 * isReturn is true when visitCount > 1.
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * State persisted between sessions. `lastVisit` is epoch-ms of the previous
 * session start; `visitCount` is the number of sessions counted so far.
 */
export type ReturnVisitState = {
  lastVisit: number;
  visitCount: number;
};

export type ReturnVisitResult = {
  /** True when this is at least the second counted session (visitCount > 1). */
  isReturn: boolean;
  /** Session count including the current session. */
  visitCount: number;
  /** Whole calendar-agnostic days between the last visit and now (0 if same day). */
  daysSinceLast: number;
  /** State to persist back to storage for the next session. */
  nextStored: ReturnVisitState;
};

/**
 * Whole days elapsed between two epoch-ms timestamps, floored to an integer and
 * never negative. Uses elapsed-time division (24h windows), so a visit less than
 * 24 hours later reads as 0 even across a midnight boundary. This matches the
 * "0 if same day" intent without needing a timezone.
 */
function wholeDaysBetween(lastMs: number, nowMs: number): number {
  const delta = nowMs - lastMs;
  if (!Number.isFinite(delta) || delta <= 0) {
    return 0;
  }
  return Math.floor(delta / MS_PER_DAY);
}

/**
 * Coerce arbitrary stored input (possibly null, corrupt, or partially typed)
 * into a valid prior state, or null when there is no usable prior visit. A
 * stored value only counts as a prior visit when it carries a finite, positive
 * lastVisit timestamp.
 */
function normalizePriorState(stored: unknown): ReturnVisitState | null {
  if (!stored || typeof stored !== "object") {
    return null;
  }
  const candidate = stored as Record<string, unknown>;
  const lastVisit = candidate.lastVisit;
  const visitCount = candidate.visitCount;

  if (typeof lastVisit !== "number" || !Number.isFinite(lastVisit) || lastVisit <= 0) {
    return null;
  }

  const safeCount =
    typeof visitCount === "number" && Number.isFinite(visitCount) && visitCount >= 1
      ? Math.floor(visitCount)
      : 1;

  return { lastVisit, visitCount: safeCount };
}

/**
 * Compute the return-visit result for the current session.
 *
 * @param nowMs   Current time as epoch milliseconds.
 * @param stored  Previously persisted state, or null/corrupt for a first visit.
 * @returns       The computed result plus the state to persist.
 */
export function computeReturnVisit(
  nowMs: number,
  stored: unknown,
): ReturnVisitResult {
  const safeNow = Number.isFinite(nowMs) ? nowMs : Date.now();
  const prior = normalizePriorState(stored);

  if (!prior) {
    // First (or unrecoverable) visit: count starts at 1, nothing to compare.
    return {
      isReturn: false,
      visitCount: 1,
      daysSinceLast: 0,
      nextStored: { lastVisit: safeNow, visitCount: 1 },
    };
  }

  const visitCount = prior.visitCount + 1;
  const daysSinceLast = wholeDaysBetween(prior.lastVisit, safeNow);

  return {
    isReturn: visitCount > 1,
    visitCount,
    daysSinceLast,
    nextStored: { lastVisit: safeNow, visitCount },
  };
}
