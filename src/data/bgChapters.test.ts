import { describe, expect, it } from "vitest";
import {
  bgChapters,
  getBgChapterByNumber,
  getAdjacentBgChapters,
  type BgChapter,
} from "./bgChapters";

describe("bgChapters data integrity", () => {
  it("contains exactly 18 chapters", () => {
    expect(bgChapters.length).toBe(18);
  });

  it("chapter numbers are 1-18 in order, no duplicates", () => {
    const numbers = bgChapters.map((c) => c.chapterNumber);
    expect(numbers).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
  });

  it("every chapter has all required fields", () => {
    const required: (keyof BgChapter)[] = [
      "chapterNumber",
      "nameSanskrit",
      "nameEnglish",
      "summary",
      "oneSentenceTheme",
      "keyThemes",
      "yogaPath",
      "totalVerses",
    ];
    for (const ch of bgChapters) {
      for (const field of required) {
        expect(
          ch[field],
          `Chapter ${ch.chapterNumber} missing field "${String(field)}"`,
        ).toBeDefined();
      }
    }
  });

  it("oneSentenceTheme is non-empty and reads as a single sentence", () => {
    for (const ch of bgChapters) {
      expect(
        ch.oneSentenceTheme.length,
        `Chapter ${ch.chapterNumber} oneSentenceTheme is empty`,
      ).toBeGreaterThan(0);
      // Single-sentence rule: at most one terminal period/colon (not counting
      // mid-sentence punctuation). Reject obvious multi-sentence content.
      const sentenceTerminators = (
        ch.oneSentenceTheme.match(/[.!?]\s+[A-Z]/g) ?? []
      ).length;
      expect(
        sentenceTerminators,
        `Chapter ${ch.chapterNumber} oneSentenceTheme contains multiple sentences: "${ch.oneSentenceTheme}"`,
      ).toBe(0);
      // Cap so hub cards render tidily.
      expect(
        ch.oneSentenceTheme.length,
        `Chapter ${ch.chapterNumber} oneSentenceTheme is too long (${ch.oneSentenceTheme.length} chars)`,
      ).toBeLessThanOrEqual(220);
    }
  });

  it("keyThemes is a non-empty string array", () => {
    for (const ch of bgChapters) {
      expect(Array.isArray(ch.keyThemes)).toBe(true);
      expect(ch.keyThemes.length).toBeGreaterThan(0);
      for (const theme of ch.keyThemes) {
        expect(typeof theme).toBe("string");
        expect(theme.length).toBeGreaterThan(0);
      }
    }
  });

  it("totalVerses is a positive integer", () => {
    for (const ch of bgChapters) {
      expect(Number.isInteger(ch.totalVerses)).toBe(true);
      expect(ch.totalVerses).toBeGreaterThan(0);
    }
  });

  it("getBgChapterByNumber returns the correct chapter", () => {
    expect(getBgChapterByNumber(1)?.nameSanskrit).toBe("अर्जुनविषादयोग");
    expect(getBgChapterByNumber(18)?.totalVerses).toBe(78);
  });

  it("getBgChapterByNumber returns undefined for unknown numbers", () => {
    expect(getBgChapterByNumber(0)).toBeUndefined();
    expect(getBgChapterByNumber(19)).toBeUndefined();
    expect(getBgChapterByNumber(-1)).toBeUndefined();
  });

  describe("getAdjacentBgChapters", () => {
    it("chapter 1 has no prev and chapter 2 as next", () => {
      const { prev, next } = getAdjacentBgChapters(1);
      expect(prev).toBeUndefined();
      expect(next?.chapterNumber).toBe(2);
    });

    it("chapter 9 has chapter 8 as prev and chapter 10 as next", () => {
      const { prev, next } = getAdjacentBgChapters(9);
      expect(prev?.chapterNumber).toBe(8);
      expect(next?.chapterNumber).toBe(10);
    });

    it("chapter 18 has chapter 17 as prev and no next", () => {
      const { prev, next } = getAdjacentBgChapters(18);
      expect(prev?.chapterNumber).toBe(17);
      expect(next).toBeUndefined();
    });

    it("returns both undefined for out-of-range chapter numbers", () => {
      const { prev, next } = getAdjacentBgChapters(99);
      expect(prev).toBeUndefined();
      expect(next).toBeUndefined();
    });
  });
});
