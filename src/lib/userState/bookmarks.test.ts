import { describe, it, expect } from "vitest";
import {
  addBookmark,
  removeBookmark,
  toggleBookmark,
  hasBookmark,
  normalizeBookmarks,
  type Bookmark,
} from "./bookmarks";

const bg611: Bookmark = { verseId: "bg-6-11", cluster: "bhagavad-gita", savedAt: 1000 };
const vsn83: Bookmark = { verseId: "vsn-shloka-83", cluster: "vishnu-sahasranama", savedAt: 2000 };

describe("hasBookmark", () => {
  it("reports presence by verseId", () => {
    expect(hasBookmark([bg611], "bg-6-11")).toBe(true);
    expect(hasBookmark([bg611], "bg-6-12")).toBe(false);
    expect(hasBookmark([], "bg-6-11")).toBe(false);
  });
});

describe("addBookmark", () => {
  it("appends a new verse with the given timestamp", () => {
    const result = addBookmark([], "bg-6-11", "bhagavad-gita", 1000);
    expect(result).toEqual([bg611]);
  });

  it("dedupes by verseId and keeps the original entry (no timestamp churn)", () => {
    const existing = [bg611];
    const result = addBookmark(existing, "bg-6-11", "bhagavad-gita", 9999);
    // Same reference back (no write needed) and the original savedAt is kept.
    expect(result).toBe(existing);
    expect(result[0].savedAt).toBe(1000);
  });

  it("preserves insertion order (oldest first)", () => {
    const result = addBookmark(addBookmark([], "bg-6-11", "bhagavad-gita", 1000), "vsn-shloka-83", "vishnu-sahasranama", 2000);
    expect(result.map((b) => b.verseId)).toEqual(["bg-6-11", "vsn-shloka-83"]);
  });
});

describe("removeBookmark", () => {
  it("removes the matching verse", () => {
    const result = removeBookmark([bg611, vsn83], "bg-6-11");
    expect(result).toEqual([vsn83]);
  });

  it("returns the same reference unchanged when the verse is absent", () => {
    const list = [bg611];
    expect(removeBookmark(list, "bg-6-99")).toBe(list);
  });
});

describe("toggleBookmark", () => {
  it("adds when absent", () => {
    const result = toggleBookmark([], "bg-6-11", "bhagavad-gita", 1000);
    expect(hasBookmark(result, "bg-6-11")).toBe(true);
  });

  it("removes when present", () => {
    const result = toggleBookmark([bg611], "bg-6-11", "bhagavad-gita");
    expect(hasBookmark(result, "bg-6-11")).toBe(false);
    expect(result).toEqual([]);
  });

  it("round-trips: add then toggle off returns to empty", () => {
    const added = toggleBookmark([], "bg-6-11", "bhagavad-gita", 1000);
    const removed = toggleBookmark(added, "bg-6-11", "bhagavad-gita");
    expect(removed).toEqual([]);
  });
});

describe("normalizeBookmarks", () => {
  it("returns an empty array for non-array input", () => {
    expect(normalizeBookmarks(null)).toEqual([]);
    expect(normalizeBookmarks("nope")).toEqual([]);
    expect(normalizeBookmarks({ verseId: "x" })).toEqual([]);
  });

  it("drops entries missing a usable verseId or cluster", () => {
    const input = [
      { verseId: "bg-6-11", cluster: "bhagavad-gita", savedAt: 1000 },
      { verseId: "", cluster: "bhagavad-gita", savedAt: 1 },
      { verseId: "bg-6-12", cluster: "", savedAt: 1 },
      { cluster: "bhagavad-gita" },
      42,
      null,
    ];
    expect(normalizeBookmarks(input)).toEqual([bg611]);
  });

  it("dedupes by verseId, keeping the first occurrence", () => {
    const input = [
      { verseId: "bg-6-11", cluster: "bhagavad-gita", savedAt: 1000 },
      { verseId: "bg-6-11", cluster: "OTHER", savedAt: 5000 },
    ];
    expect(normalizeBookmarks(input)).toEqual([bg611]);
  });

  it("defaults a missing or non-finite savedAt to 0", () => {
    const input = [{ verseId: "bg-6-11", cluster: "bhagavad-gita" }];
    expect(normalizeBookmarks(input)).toEqual([
      { verseId: "bg-6-11", cluster: "bhagavad-gita", savedAt: 0 },
    ]);
  });
});
