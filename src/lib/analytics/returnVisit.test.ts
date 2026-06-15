import { describe, it, expect } from "vitest";
import { computeReturnVisit, type ReturnVisitState } from "./returnVisit";

const DAY = 24 * 60 * 60 * 1000;
// Fixed anchor so day-boundary math is deterministic regardless of wall clock.
const NOW = Date.UTC(2026, 5, 15, 12, 0, 0); // 2026-06-15T12:00:00Z

describe("computeReturnVisit", () => {
  it("treats a first visit (no stored state) as not a return, count 1", () => {
    const result = computeReturnVisit(NOW, null);

    expect(result.isReturn).toBe(false);
    expect(result.visitCount).toBe(1);
    expect(result.daysSinceLast).toBe(0);
    expect(result.nextStored).toEqual({ lastVisit: NOW, visitCount: 1 });
  });

  it("treats a second visit on the same day as a return, count 2, days 0", () => {
    // Prior session was the first visit, earlier the same day (2 hours ago).
    const prior: ReturnVisitState = { lastVisit: NOW - 2 * 60 * 60 * 1000, visitCount: 1 };

    const result = computeReturnVisit(NOW, prior);

    expect(result.isReturn).toBe(true);
    expect(result.visitCount).toBe(2);
    expect(result.daysSinceLast).toBe(0);
    expect(result.nextStored).toEqual({ lastVisit: NOW, visitCount: 2 });
  });

  it("reports the correct whole-day gap after N days and increments the count", () => {
    const prior: ReturnVisitState = { lastVisit: NOW - 5 * DAY, visitCount: 3 };

    const result = computeReturnVisit(NOW, prior);

    expect(result.isReturn).toBe(true);
    expect(result.daysSinceLast).toBe(5);
    expect(result.visitCount).toBe(4);
    expect(result.nextStored.lastVisit).toBe(NOW);
  });

  it("floors a partial-day gap so 3.5 days reads as 3", () => {
    const prior: ReturnVisitState = { lastVisit: NOW - (3 * DAY + DAY / 2), visitCount: 1 };

    const result = computeReturnVisit(NOW, prior);

    expect(result.daysSinceLast).toBe(3);
    expect(result.visitCount).toBe(2);
  });

  it("reads a sub-24h gap across midnight as 0 days (elapsed-time semantics)", () => {
    // 23 hours earlier, crossing a calendar midnight but under one full day.
    const prior: ReturnVisitState = { lastVisit: NOW - 23 * 60 * 60 * 1000, visitCount: 1 };

    const result = computeReturnVisit(NOW, prior);

    expect(result.daysSinceLast).toBe(0);
    expect(result.isReturn).toBe(true);
  });

  it("falls back to a clean first visit when stored state is missing", () => {
    const result = computeReturnVisit(NOW, undefined);

    expect(result.isReturn).toBe(false);
    expect(result.visitCount).toBe(1);
    expect(result.nextStored.visitCount).toBe(1);
  });

  it("recovers gracefully from corrupt stored shapes", () => {
    const corruptInputs: unknown[] = [
      "not-json-at-all",
      42,
      {},
      { lastVisit: "yesterday" },
      { lastVisit: NaN, visitCount: 4 },
      { lastVisit: -1, visitCount: 4 },
      { visitCount: 9 }, // missing timestamp -> cannot be a real prior visit
    ];

    for (const bad of corruptInputs) {
      const result = computeReturnVisit(NOW, bad);
      expect(result.isReturn).toBe(false);
      expect(result.visitCount).toBe(1);
      expect(result.daysSinceLast).toBe(0);
      expect(result.nextStored).toEqual({ lastVisit: NOW, visitCount: 1 });
    }
  });

  it("repairs a valid timestamp paired with a corrupt count by resetting count to 1 then incrementing", () => {
    // lastVisit is usable, but visitCount is garbage. The prior session still
    // counts as one real visit, so this session becomes the second.
    const result = computeReturnVisit(NOW, { lastVisit: NOW - 2 * DAY, visitCount: -5 });

    expect(result.isReturn).toBe(true);
    expect(result.visitCount).toBe(2);
    expect(result.daysSinceLast).toBe(2);
  });

  it("falls back to the current value when nowMs is not finite, without throwing", () => {
    const prior: ReturnVisitState = { lastVisit: NOW - DAY, visitCount: 1 };

    const result = computeReturnVisit(Number.NaN, prior);

    // daysSinceLast is computed against a real Date.now(), so it stays non-negative.
    expect(result.visitCount).toBe(2);
    expect(result.daysSinceLast).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(result.nextStored.lastVisit)).toBe(true);
  });
});
