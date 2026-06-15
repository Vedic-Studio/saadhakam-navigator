import { describe, expect, it } from "vitest";
import { getTithiBySlug, resolveTithiSeo, tithis, type Tithi } from "@/data/panchang";

function makeTithi(overrides: Partial<Tithi> = {}): Tithi {
    return {
        slug: "shukla-test",
        name: "Shukla Test",
        paksha: "Shukla",
        number: 1,
        deity: "Agni",
        meaning: "A test tithi.",
        description: "Generic description used as the fallback meta source.",
        aeoBlock: "Generic aeo block.",
        practiceSlugs: [],
        faq: [],
        ...overrides,
    };
}

describe("resolveTithiSeo", () => {
    it("returns the per-tithi override when seoTitle/seoDescription are set", () => {
        const tithi = makeTithi({
            seoTitle: "Custom Tithi Title",
            seoDescription: "Custom tithi description for the SERP snippet.",
        });
        const seo = resolveTithiSeo(tithi);
        expect(seo.title).toBe("Custom Tithi Title");
        expect(seo.description).toBe("Custom tithi description for the SERP snippet.");
    });

    it("falls back to the templated title and narrative description when no override is set", () => {
        const seo = resolveTithiSeo(makeTithi());
        expect(seo.title).toBe("Shukla Test Tithi");
        expect(seo.description).toBe(
            "Generic description used as the fallback meta source.",
        );
    });

    it("applies the approved override to the real Shukla Panchami tithi", () => {
        const tithi = getTithiBySlug("shukla-panchami");
        expect(tithi).toBeDefined();
        const seo = resolveTithiSeo(tithi!);
        expect(seo.title).toBe(
            "Shukla Panchami: What This Tithi Means (Nagas, Day 5)",
        );
        expect(seo.description.length).toBeLessThanOrEqual(160);
        // The unique facts (Nagas, day 5) must be surfaced on-page via seoFacts.
        expect(tithi!.seoFacts).toBeDefined();
        expect(tithi!.seoFacts!.heading).toBe(
            "What Is Shukla Panchami and What Is It For?",
        );
        expect(tithi!.seoFacts!.body).toMatch(/Naga/);
        expect(tithi!.seoFacts!.body).toMatch(/fifth/i);
    });

    it("leaves other generated tithis on the generic title", () => {
        const tithi = getTithiBySlug("krishna-panchami");
        expect(tithi).toBeDefined();
        expect(tithi!.seoTitle).toBeUndefined();
        const seo = resolveTithiSeo(tithi!);
        expect(seo.title).toBe("Krishna Panchami Tithi");
    });

    it("does not leak overrides across generated tithis", () => {
        const withOverride = tithis.filter((t) => t.seoTitle !== undefined);
        // Only Shukla Panchami is seeded this round.
        expect(withOverride.map((t) => t.slug)).toEqual(["shukla-panchami"]);
    });
});
