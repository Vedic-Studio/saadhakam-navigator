import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  USER_STATE_STORAGE_KEY,
  RETURN_VISIT_STORAGE_KEY,
  createInitialUserState,
  normalizeUserState,
  readUserState,
  writeUserState,
  readVisitCount,
} from "./storage";

describe("createInitialUserState", () => {
  it("returns an empty, isolated state", () => {
    const a = createInitialUserState();
    const b = createInitialUserState();
    expect(a).toEqual({ streak: { count: 0, lastActiveYmd: null, graceUsed: false }, bookmarks: [] });
    // Distinct object graphs so mutating one cannot leak into the other.
    expect(a.streak).not.toBe(b.streak);
    expect(a.bookmarks).not.toBe(b.bookmarks);
  });
});

describe("normalizeUserState (pure)", () => {
  it("returns initial state for non-object input", () => {
    expect(normalizeUserState(null)).toEqual(createInitialUserState());
    expect(normalizeUserState("garbage")).toEqual(createInitialUserState());
  });

  it("recovers a valid streak and bookmark list", () => {
    const stored = {
      streak: { count: 5, lastActiveYmd: "2026-06-15", graceUsed: true },
      bookmarks: [{ verseId: "bg-6-11", cluster: "bhagavad-gita", savedAt: 1000 }],
    };
    expect(normalizeUserState(stored)).toEqual(stored);
  });

  it("repairs a streak whose lastActiveYmd is missing back to the initial streak", () => {
    const result = normalizeUserState({ streak: { count: 9, graceUsed: true }, bookmarks: [] });
    expect(result.streak).toEqual({ count: 0, lastActiveYmd: null, graceUsed: false });
  });

  it("coerces a count of 0 with a real lastActiveYmd up to 1", () => {
    const result = normalizeUserState({
      streak: { count: 0, lastActiveYmd: "2026-06-15", graceUsed: false },
      bookmarks: [],
    });
    expect(result.streak).toEqual({ count: 1, lastActiveYmd: "2026-06-15", graceUsed: false });
  });

  it("drops corrupt bookmark entries via normalizeBookmarks", () => {
    const result = normalizeUserState({
      streak: { count: 1, lastActiveYmd: "2026-06-15", graceUsed: false },
      bookmarks: [{ verseId: "ok", cluster: "c", savedAt: 1 }, { bad: true }, 5],
    });
    expect(result.bookmarks).toEqual([{ verseId: "ok", cluster: "c", savedAt: 1 }]);
  });
});

describe("readUserState / writeUserState (jsdom localStorage)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns initial state when nothing is stored", () => {
    expect(readUserState()).toEqual(createInitialUserState());
  });

  it("persists and reads back a round-trip", () => {
    const state = {
      streak: { count: 3, lastActiveYmd: "2026-06-15", graceUsed: false },
      bookmarks: [{ verseId: "bg-6-11", cluster: "bhagavad-gita", savedAt: 1000 }],
    };
    writeUserState(state);
    expect(readUserState()).toEqual(state);
  });

  it("recovers from corrupt JSON without throwing", () => {
    window.localStorage.setItem(USER_STATE_STORAGE_KEY, "{not valid json");
    expect(() => readUserState()).not.toThrow();
    expect(readUserState()).toEqual(createInitialUserState());
  });

  it("swallows a localStorage write failure (quota / private mode)", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => writeUserState(createInitialUserState())).not.toThrow();
    spy.mockRestore();
  });
});

describe("readVisitCount (reads AnalyticsTracker's key, never writes it)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it("returns 0 before AnalyticsTracker has run (key absent)", () => {
    expect(readVisitCount()).toBe(0);
  });

  it("reads the visitCount written in the return-visit shape", () => {
    window.localStorage.setItem(
      RETURN_VISIT_STORAGE_KEY,
      JSON.stringify({ lastVisit: Date.now(), visitCount: 4 }),
    );
    expect(readVisitCount()).toBe(4);
  });

  it("returns 0 for a corrupt or non-numeric visitCount", () => {
    window.localStorage.setItem(RETURN_VISIT_STORAGE_KEY, JSON.stringify({ visitCount: "lots" }));
    expect(readVisitCount()).toBe(0);
    window.localStorage.setItem(RETURN_VISIT_STORAGE_KEY, "{broken");
    expect(readVisitCount()).toBe(0);
  });

  it("does not write the return-visit key (AnalyticsTracker write path is untouched)", () => {
    const setSpy = vi.spyOn(Storage.prototype, "setItem");
    readVisitCount();
    expect(setSpy).not.toHaveBeenCalled();
    setSpy.mockRestore();
  });
});
