import { describe, expect, it } from "vitest";
import { getBgShlokaById, resolveVerseSeo, type BgShloka } from "@/data/bgShlokas";

// A minimal shloka factory so the resolver contract is tested in isolation,
// independent of which verses happen to carry overrides in the dataset.
function makeShloka(overrides: Partial<BgShloka> = {}): BgShloka {
    return {
        id: "2.47",
        chapter: 2,
        verse: 47,
        sanskritDevanagari: "...",
        transliteration: "...",
        synonyms: "...",
        translation: "You have a right to action alone, never to its fruits.",
        commentaries: [],
        practicalApplication: "...",
        ...overrides,
    };
}

describe("resolveVerseSeo", () => {
    it("returns the per-verse override when seoTitle/seoDescription are set", () => {
        const shloka = makeShloka({
            seoTitle: "Bhagavad Gita 2.47: Right to Action",
            seoDescription: "The most quoted verse on duty without attachment to results.",
        });
        const seo = resolveVerseSeo(shloka);
        expect(seo.title).toBe("Bhagavad Gita 2.47: Right to Action");
        expect(seo.description).toBe(
            "The most quoted verse on duty without attachment to results.",
        );
    });

    it("falls back to the generic templated title when no override is set", () => {
        const seo = resolveVerseSeo(makeShloka());
        expect(seo.title).toBe(
            "Bhagavad Gita Chapter 2 Verse 47 | Meaning & Translation",
        );
        // Description is intentionally undefined so the caller composes its own
        // fallback (composeMetaDescription) from the translation.
        expect(seo.description).toBeUndefined();
    });

    it("uses an override title even if the description is left to fall back", () => {
        const seo = resolveVerseSeo(makeShloka({ seoTitle: "Custom Title Only" }));
        expect(seo.title).toBe("Custom Title Only");
        expect(seo.description).toBeUndefined();
    });

    it("applies the approved override to the real BG 6.11 verse", () => {
        const shloka = getBgShlokaById("6.11");
        expect(shloka).toBeDefined();
        const seo = resolveVerseSeo(shloka!);
        expect(seo.title).toBe("Bhagavad Gita 6.11: Translation & Word Meaning");
        expect(seo.title.length).toBeLessThanOrEqual(60);
        expect(seo.description).toBeDefined();
        expect(seo.description!.length).toBeLessThanOrEqual(160);
        // The full translation must NOT be the whole description (it was
        // relocated off the meta); the description names the seat prescription.
        expect(seo.description).toContain("meditation seat");
    });

    it("leaves verses without an override on the generic title", () => {
        const shloka = getBgShlokaById("6.12");
        expect(shloka).toBeDefined();
        const seo = resolveVerseSeo(shloka!);
        expect(seo.title).toBe(
            "Bhagavad Gita Chapter 6 Verse 12 | Meaning & Translation",
        );
    });
});
