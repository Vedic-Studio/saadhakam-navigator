import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useStreak, useBookmarks, useVisitCount } from "./hooks";
import {
  USER_STATE_STORAGE_KEY,
  RETURN_VISIT_STORAGE_KEY,
  readUserState,
} from "./storage";

describe("useStreak", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("hydrates from localStorage on mount", () => {
    window.localStorage.setItem(
      USER_STATE_STORAGE_KEY,
      JSON.stringify({
        streak: { count: 7, lastActiveYmd: "2026-06-14", graceUsed: false },
        bookmarks: [],
      }),
    );
    const { result } = renderHook(() => useStreak());
    expect(result.current.count).toBe(7);
  });

  it("starts at 0 when nothing is stored (matches SSR empty state)", () => {
    const { result } = renderHook(() => useStreak());
    expect(result.current.count).toBe(0);
  });

  it("recordToday starts a streak and persists it", () => {
    vi.setSystemTime(new Date("2026-06-15T08:00:00"));
    const { result } = renderHook(() => useStreak());

    act(() => {
      result.current.recordToday();
    });

    expect(result.current.count).toBe(1);
    expect(readUserState().streak).toEqual({
      count: 1,
      lastActiveYmd: "2026-06-15",
      graceUsed: false,
    });
  });

  it("recordToday is idempotent within the same calendar day", () => {
    vi.setSystemTime(new Date("2026-06-15T08:00:00"));
    const { result } = renderHook(() => useStreak());

    act(() => {
      result.current.recordToday();
    });
    act(() => {
      result.current.recordToday();
    });

    expect(result.current.count).toBe(1);
  });

  it("recordToday increments across consecutive days", () => {
    vi.setSystemTime(new Date("2026-06-15T08:00:00"));
    const { result } = renderHook(() => useStreak());
    act(() => {
      result.current.recordToday();
    });

    vi.setSystemTime(new Date("2026-06-16T08:00:00"));
    act(() => {
      result.current.recordToday();
    });

    expect(result.current.count).toBe(2);
    expect(readUserState().streak.lastActiveYmd).toBe("2026-06-16");
  });
});

describe("useBookmarks", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts empty and reflects a toggle-on then toggle-off", () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([]);
    expect(result.current.isBookmarked("bg-6-11")).toBe(false);

    act(() => {
      result.current.toggle("bg-6-11", "bhagavad-gita");
    });
    expect(result.current.isBookmarked("bg-6-11")).toBe(true);
    expect(result.current.bookmarks).toHaveLength(1);
    expect(readUserState().bookmarks[0]).toMatchObject({
      verseId: "bg-6-11",
      cluster: "bhagavad-gita",
    });

    act(() => {
      result.current.toggle("bg-6-11", "bhagavad-gita");
    });
    expect(result.current.isBookmarked("bg-6-11")).toBe(false);
    expect(readUserState().bookmarks).toEqual([]);
  });

  it("hydrates existing bookmarks from storage", () => {
    window.localStorage.setItem(
      USER_STATE_STORAGE_KEY,
      JSON.stringify({
        streak: { count: 0, lastActiveYmd: null, graceUsed: false },
        bookmarks: [{ verseId: "vsn-shloka-83", cluster: "vishnu-sahasranama", savedAt: 1000 }],
      }),
    );
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.isBookmarked("vsn-shloka-83")).toBe(true);
  });

  it("does not disturb the streak when toggling a bookmark", () => {
    window.localStorage.setItem(
      USER_STATE_STORAGE_KEY,
      JSON.stringify({
        streak: { count: 4, lastActiveYmd: "2026-06-15", graceUsed: true },
        bookmarks: [],
      }),
    );
    const { result } = renderHook(() => useBookmarks());
    act(() => {
      result.current.toggle("bg-2-47", "bhagavad-gita");
    });
    expect(readUserState().streak).toEqual({
      count: 4,
      lastActiveYmd: "2026-06-15",
      graceUsed: true,
    });
  });
});

describe("useVisitCount", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns 0 when the return-visit key is absent", () => {
    const { result } = renderHook(() => useVisitCount());
    expect(result.current).toBe(0);
  });

  it("reads the visit count AnalyticsTracker stored", () => {
    window.localStorage.setItem(
      RETURN_VISIT_STORAGE_KEY,
      JSON.stringify({ lastVisit: Date.now(), visitCount: 6 }),
    );
    const { result } = renderHook(() => useVisitCount());
    expect(result.current).toBe(6);
  });
});
