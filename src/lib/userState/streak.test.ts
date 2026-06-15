import { describe, it, expect } from "vitest";
import {
  recordActiveDay,
  calendarDaysBetween,
  INITIAL_STREAK_STATE,
  type StreakState,
} from "./streak";

const fresh = (): StreakState => ({ ...INITIAL_STREAK_STATE });

describe("calendarDaysBetween", () => {
  it("counts whole calendar days regardless of timezone", () => {
    expect(calendarDaysBetween("2026-06-15", "2026-06-16")).toBe(1);
    expect(calendarDaysBetween("2026-06-15", "2026-06-15")).toBe(0);
    expect(calendarDaysBetween("2026-06-15", "2026-06-20")).toBe(5);
  });

  it("crosses month and year boundaries correctly", () => {
    // Jan 31 -> Feb 1 is one day.
    expect(calendarDaysBetween("2026-01-31", "2026-02-01")).toBe(1);
    // Dec 31 -> Jan 1 (next year) is one day.
    expect(calendarDaysBetween("2025-12-31", "2026-01-01")).toBe(1);
    // 2024 is a leap year: Feb 28 -> Feb 29 -> Mar 1 spans 2 days.
    expect(calendarDaysBetween("2024-02-28", "2024-03-01")).toBe(2);
  });

  it("returns negative for a date going backwards", () => {
    expect(calendarDaysBetween("2026-06-16", "2026-06-15")).toBe(-1);
  });

  it("returns null for malformed dates", () => {
    expect(calendarDaysBetween("not-a-date", "2026-06-15")).toBeNull();
    expect(calendarDaysBetween("2026-06-15", "2026-13-40")).toBeNull();
    expect(calendarDaysBetween("2026-02-30", "2026-03-01")).toBeNull();
  });
});

describe("recordActiveDay", () => {
  it("starts a streak at 1 on the first ever active day", () => {
    const next = recordActiveDay(fresh(), "2026-06-15");
    expect(next).toEqual({ count: 1, lastActiveYmd: "2026-06-15", graceUsed: false });
  });

  it("is idempotent for the same calendar day (gap 0)", () => {
    const state: StreakState = { count: 4, lastActiveYmd: "2026-06-15", graceUsed: false };
    const next = recordActiveDay(state, "2026-06-15");
    expect(next).toEqual(state);
  });

  it("increments on a consecutive day (gap 1) and leaves graceUsed unchanged", () => {
    const state: StreakState = { count: 4, lastActiveYmd: "2026-06-15", graceUsed: false };
    const next = recordActiveDay(state, "2026-06-16");
    expect(next).toEqual({ count: 5, lastActiveYmd: "2026-06-16", graceUsed: false });
  });

  it("preserves an already-used grace flag across a normal consecutive day", () => {
    const state: StreakState = { count: 4, lastActiveYmd: "2026-06-15", graceUsed: true };
    const next = recordActiveDay(state, "2026-06-16");
    expect(next).toEqual({ count: 5, lastActiveYmd: "2026-06-16", graceUsed: true });
  });

  it("spends the one grace day on a single missed day (gap 2) and continues", () => {
    const state: StreakState = { count: 4, lastActiveYmd: "2026-06-15", graceUsed: false };
    // Missed the 16th, returns on the 17th.
    const next = recordActiveDay(state, "2026-06-17");
    expect(next).toEqual({ count: 5, lastActiveYmd: "2026-06-17", graceUsed: true });
  });

  it("resets on a second single-day miss after grace is already used (gap 2, graceUsed)", () => {
    const state: StreakState = { count: 5, lastActiveYmd: "2026-06-17", graceUsed: true };
    // Missed the 18th, returns on the 19th: grace gone, so reset.
    const next = recordActiveDay(state, "2026-06-19");
    expect(next).toEqual({ count: 1, lastActiveYmd: "2026-06-19", graceUsed: false });
  });

  it("resets on a gap of 3+ days even when grace is available", () => {
    const state: StreakState = { count: 9, lastActiveYmd: "2026-06-15", graceUsed: false };
    const next = recordActiveDay(state, "2026-06-18");
    expect(next).toEqual({ count: 1, lastActiveYmd: "2026-06-18", graceUsed: false });
  });

  it("runs the full grace-then-reset lifecycle: build, miss-and-recover, miss-again-and-reset", () => {
    // Day 1.
    let s = recordActiveDay(fresh(), "2026-06-10");
    expect(s).toEqual({ count: 1, lastActiveYmd: "2026-06-10", graceUsed: false });
    // Day 2 consecutive.
    s = recordActiveDay(s, "2026-06-11");
    expect(s.count).toBe(2);
    // Miss the 12th, return on the 13th: grace spent, streak continues to 3.
    s = recordActiveDay(s, "2026-06-13");
    expect(s).toEqual({ count: 3, lastActiveYmd: "2026-06-13", graceUsed: true });
    // Consecutive day 14: streak 4, grace stays used.
    s = recordActiveDay(s, "2026-06-14");
    expect(s).toEqual({ count: 4, lastActiveYmd: "2026-06-14", graceUsed: true });
    // Miss the 15th, return on the 16th: grace already gone, so reset to 1
    // with a FRESH grace for the new streak.
    s = recordActiveDay(s, "2026-06-16");
    expect(s).toEqual({ count: 1, lastActiveYmd: "2026-06-16", graceUsed: false });
    // The new streak can absorb its own grace again: miss 17th, return 18th.
    s = recordActiveDay(s, "2026-06-18");
    expect(s).toEqual({ count: 2, lastActiveYmd: "2026-06-18", graceUsed: true });
  });

  it("applies the grace rule across a month boundary", () => {
    const state: StreakState = { count: 3, lastActiveYmd: "2026-01-31", graceUsed: false };
    // Miss Feb 1, return Feb 2: one missed day -> grace spent.
    const next = recordActiveDay(state, "2026-02-02");
    expect(next).toEqual({ count: 4, lastActiveYmd: "2026-02-02", graceUsed: true });
  });

  it("applies the grace rule across a year boundary", () => {
    const state: StreakState = { count: 7, lastActiveYmd: "2025-12-31", graceUsed: false };
    // Miss Jan 1, return Jan 2: gap 2 -> grace spent.
    const next = recordActiveDay(state, "2026-01-02");
    expect(next).toEqual({ count: 8, lastActiveYmd: "2026-01-02", graceUsed: true });
  });

  it("treats a malformed today as a no-op so a bad caller cannot corrupt a streak", () => {
    const state: StreakState = { count: 6, lastActiveYmd: "2026-06-15", graceUsed: true };
    expect(recordActiveDay(state, "garbage")).toEqual(state);
  });

  it("treats a corrupt stored lastActiveYmd as a clean first day", () => {
    const state: StreakState = { count: 99, lastActiveYmd: "not-a-date", graceUsed: true };
    const next = recordActiveDay(state, "2026-06-15");
    expect(next).toEqual({ count: 1, lastActiveYmd: "2026-06-15", graceUsed: false });
  });

  it("ignores a backwards clock (negative gap) without mutating the streak", () => {
    const state: StreakState = { count: 5, lastActiveYmd: "2026-06-16", graceUsed: false };
    expect(recordActiveDay(state, "2026-06-15")).toEqual(state);
  });
});
