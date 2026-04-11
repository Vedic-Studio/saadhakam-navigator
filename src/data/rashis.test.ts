import { describe, expect, it } from "vitest";
import { rashis } from "@/data/rashis";

describe("rashis", () => {
    it("defines twelve rashis with unique slugs and required fields", () => {
        expect(rashis).toHaveLength(12);

        const slugs = rashis.map((rashi) => rashi.slug);
        expect(new Set(slugs).size).toBe(12);

        for (const rashi of rashis) {
            expect(rashi.name).toBeTruthy();
            expect(rashi.sanskritName).toBeTruthy();
            expect(rashi.transliteration).toBeTruthy();
            expect(rashi.symbol).toBeTruthy();
            expect(rashi.rulingGraha).toBeTruthy();
            expect(rashi.nakshatraSlugs.length).toBeGreaterThan(0);
            expect(rashi.description).toBeTruthy();
            expect(rashi.aeoBlock).toBeTruthy();
            expect(rashi.practiceSlugs.length).toBeGreaterThan(0);
            expect(rashi.faq.length).toBeGreaterThan(0);
        }
    });
});