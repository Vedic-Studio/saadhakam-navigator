import { describe, it, expect } from "vitest";
import {
    dayOfYear,
    pickForDay,
    getVerseForDay,
    getPracticeForDay,
    verseHref,
    TODAY_VERSES,
    TODAY_PRACTICES,
} from "./rotation";

describe("dayOfYear", () => {
    it("returns 1 for January 1", () => {
        expect(dayOfYear("2026-01-01")).toBe(1);
    });

    it("returns 365 for December 31 in a non-leap year", () => {
        expect(dayOfYear("2026-12-31")).toBe(365);
    });

    it("returns 366 for December 31 in a leap year", () => {
        expect(dayOfYear("2024-12-31")).toBe(366);
    });

    it("accounts for the leap day (Mar 1 is day 61 in 2024, day 60 in 2026)", () => {
        expect(dayOfYear("2024-03-01")).toBe(61);
        expect(dayOfYear("2026-03-01")).toBe(60);
    });

    it("reads a Date in UTC so a fixed instant maps to a stable day", () => {
        // Late-evening UTC instant still resolves to its UTC calendar day.
        expect(dayOfYear(new Date("2026-06-16T23:30:00Z"))).toBe(dayOfYear("2026-06-16"));
    });

    it("throws on a malformed string", () => {
        expect(() => dayOfYear("June 16")).toThrow();
    });
});

describe("pickForDay", () => {
    const list = ["a", "b", "c"] as const;

    it("is stable for the same day", () => {
        expect(pickForDay(list, "2026-06-16")).toBe(pickForDay(list, "2026-06-16"));
    });

    it("advances by one index per consecutive day", () => {
        const d1 = pickForDay(list, "2026-06-16");
        const d2 = pickForDay(list, "2026-06-17");
        expect(d1).not.toBe(d2);
    });

    it("cycles back to the start after the list length", () => {
        // day-of-year 1 and day-of-year (1 + len) land on the same element.
        expect(pickForDay(list, "2026-01-01")).toBe(pickForDay(list, "2026-01-04"));
    });

    it("covers every element across consecutive days", () => {
        const seen = new Set<string>();
        // Days 1..3 of 2026 (Jan 1-3) cover indices 0,1,2 of a length-3 list.
        for (const day of ["2026-01-01", "2026-01-02", "2026-01-03"]) {
            seen.add(pickForDay(list, day));
        }
        expect(seen).toEqual(new Set(list));
    });

    it("throws on an empty list", () => {
        expect(() => pickForDay([], "2026-06-16")).toThrow();
    });
});

describe("curated rotation lists", () => {
    it("has non-empty verse and practice lists", () => {
        expect(TODAY_VERSES.length).toBeGreaterThan(0);
        expect(TODAY_PRACTICES.length).toBeGreaterThan(0);
    });

    it("verses have unique ids and matching chapter.verse", () => {
        const ids = TODAY_VERSES.map((v) => v.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const v of TODAY_VERSES) {
            expect(v.id).toBe(`${v.chapter}.${v.verse}`);
            expect(v.gloss.length).toBeGreaterThan(0);
        }
    });

    it("practices have unique keys and non-empty prompts and hrefs", () => {
        const keys = TODAY_PRACTICES.map((p) => p.key);
        expect(new Set(keys).size).toBe(keys.length);
        for (const p of TODAY_PRACTICES) {
            expect(p.prompt.length).toBeGreaterThan(0);
            expect(p.href.startsWith("/")).toBe(true);
        }
    });

    it("getVerseForDay / getPracticeForDay resolve a real entry", () => {
        expect(TODAY_VERSES).toContainEqual(getVerseForDay("2026-06-16"));
        expect(TODAY_PRACTICES).toContainEqual(getPracticeForDay("2026-06-16"));
    });
});

describe("verseHref", () => {
    it("builds the canonical Bhagavad Gita verse route", () => {
        expect(verseHref({ id: "2.47", chapter: 2, verse: 47, gloss: "" })).toBe(
            "/texts/bhagavad-gita/chapter-2/shloka-47",
        );
    });
});
