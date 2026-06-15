import { describe, expect, it } from "vitest";
import {
    getTithiBySlug,
    getVaraBySlug,
    resolveTithiSeo,
    resolveVaraSeo,
    tithis,
    varas,
    type Tithi,
    type Vara,
} from "@/data/panchang";

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

    it("seeds overrides only on the curated high-value tithis", () => {
        const seeded = tithis.filter((t) => t.seoTitle !== undefined).map((t) => t.slug).sort();
        expect(seeded).toEqual(
            [
                "krishna-amavasya",
                "krishna-chaturthi",
                "krishna-ekadashi",
                "krishna-trayodashi",
                "shukla-ashtami",
                "shukla-chaturthi",
                "shukla-ekadashi",
                "shukla-panchami",
                "shukla-purnima",
            ].sort(),
        );
    });

    it("gives every seeded tithi a complete, well-formed override", () => {
        const seeded = tithis.filter((t) => t.seoTitle !== undefined);
        for (const t of seeded) {
            // SERP title within Google's typical pixel budget; description within snippet length.
            expect(t.seoTitle!.length, `${t.slug} title length`).toBeLessThanOrEqual(60);
            expect(t.seoTitle!.length, `${t.slug} title non-empty`).toBeGreaterThan(10);
            expect(t.seoDescription!.length, `${t.slug} description length`).toBeLessThanOrEqual(160);
            expect(t.seoDescription!.length, `${t.slug} description non-empty`).toBeGreaterThan(50);
            // The on-page answer block must be a real H2 + substantive body.
            expect(t.seoFacts, `${t.slug} seoFacts`).toBeDefined();
            expect(t.seoFacts!.heading.length, `${t.slug} heading`).toBeGreaterThan(10);
            expect(t.seoFacts!.body.length, `${t.slug} body`).toBeGreaterThan(200);
            // Sadhaka guardrail: tithis are framed as rhythm markers, not prediction.
            expect(t.seoFacts!.body, `${t.slug} non-predictive framing`).toMatch(/rather than|not (as |a )?predictive/i);
        }
    });

    it("surfaces the defining fact for the marquee fasting tithi (Ekadashi → Vishnu, fast)", () => {
        const ekadashi = getTithiBySlug("shukla-ekadashi");
        expect(ekadashi?.seoFacts?.body).toMatch(/Vishnu/);
        expect(ekadashi?.seoFacts?.body).toMatch(/fast/i);
    });

    it("surfaces the defining fact for the new-moon tithi (Amavasya → ancestors)", () => {
        const amavasya = getTithiBySlug("krishna-amavasya");
        expect(amavasya?.seoFacts?.body).toMatch(/new moon/i);
        expect(amavasya?.seoFacts?.body).toMatch(/Pitrs|ancest/i);
    });
});

function makeVara(overrides: Partial<Vara> = {}): Vara {
    return {
        slug: "testavara",
        name: "Testavara",
        sanskritName: "टेस्ट",
        weekdayNumber: 0,
        rulingGraha: "surya",
        description: "Generic vara description used as the fallback meta source.",
        aeoBlock: "Generic vara aeo block.",
        practiceSlugs: [],
        faq: [],
        ...overrides,
    };
}

describe("resolveVaraSeo", () => {
    it("returns the per-vara override when seoTitle/seoDescription are set", () => {
        const vara = makeVara({
            seoTitle: "Custom Vara Title",
            seoDescription: "Custom vara description for the SERP snippet.",
        });
        const seo = resolveVaraSeo(vara);
        expect(seo.title).toBe("Custom Vara Title");
        expect(seo.description).toBe("Custom vara description for the SERP snippet.");
    });

    it("falls back to the templated title and narrative description when no override is set", () => {
        const seo = resolveVaraSeo(makeVara());
        expect(seo.title).toBe("Testavara Vara");
        expect(seo.description).toBe("Generic vara description used as the fallback meta source.");
    });

    it("applies the override to the real Somavara (Monday → Chandra, Shiva)", () => {
        const vara = getVaraBySlug("somavara");
        expect(vara).toBeDefined();
        const seo = resolveVaraSeo(vara!);
        expect(seo.title).toMatch(/Monday/);
        expect(vara!.seoFacts?.body).toMatch(/Shiva/);
        expect(vara!.seoFacts?.body).toMatch(/Chandra|Moon/);
    });

    it("seeds vara overrides only on the curated weekdays (not Ravivara)", () => {
        const seeded = varas.filter((v) => v.seoTitle !== undefined).map((v) => v.slug).sort();
        expect(seeded).toEqual(
            ["guruvara", "mangalavara", "shanivara", "shukravara", "somavara"].sort(),
        );
        // Ravivara intentionally left on the generic template this round.
        expect(getVaraBySlug("ravivara")!.seoTitle).toBeUndefined();
    });

    it("gives every seeded vara a complete, well-formed override", () => {
        const seeded = varas.filter((v) => v.seoTitle !== undefined);
        for (const v of seeded) {
            expect(v.seoTitle!.length, `${v.slug} title length`).toBeLessThanOrEqual(60);
            expect(v.seoDescription!.length, `${v.slug} description length`).toBeLessThanOrEqual(160);
            expect(v.seoFacts, `${v.slug} seoFacts`).toBeDefined();
            expect(v.seoFacts!.body.length, `${v.slug} body`).toBeGreaterThan(200);
            expect(v.seoFacts!.body, `${v.slug} non-predictive framing`).toMatch(/rather than|not (as |a )?predictive/i);
        }
    });
});
