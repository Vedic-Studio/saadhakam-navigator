/**
 * Unit tests for schema builders added for the AEO/LLM ingestion push:
 *   - buildHowToSchema        (practice articles)
 *   - buildDefinedTermSchema  (Sanskrit lexicon)
 *   - buildQuotationSchema    (verse / shloka quotes)
 *   - buildClaimReviewSchema  (kb/claims public route)
 *
 * Each test verifies the JSON-LD shape Google's structured-data validator
 * expects — `@context`, `@type`, and required fields per Schema.org docs —
 * plus our convention overlays (Organization author, link-back URL).
 */
import { describe, expect, it } from "vitest";

import {
    buildClaimReviewSchema,
    buildDefinedTermSchema,
    buildHowToSchema,
    buildQuotationSchema,
} from "./index";

describe("buildHowToSchema", () => {
    it("emits a minimal HowTo with numbered steps", () => {
        const schema = buildHowToSchema({
            name: "How to Start Japa",
            description: "A 7-step beginner guide to japa meditation.",
            url: "https://www.opensadhaka.com/how-to-start-japa",
            steps: [
                { name: "Choose a mantra", text: "Pick a mantra that resonates." },
                { name: "Use a mala", text: "Hold a 108-bead japa mala." },
            ],
        });

        expect(schema["@context"]).toBe("https://schema.org");
        expect(schema["@type"]).toBe("HowTo");
        expect(schema.name).toBe("How to Start Japa");
        expect(schema.url).toBe("https://www.opensadhaka.com/how-to-start-japa");

        const steps = schema.step as Array<Record<string, unknown>>;
        expect(steps).toHaveLength(2);
        expect(steps[0]).toMatchObject({
            "@type": "HowToStep",
            position: 1,
            name: "Choose a mantra",
            text: "Pick a mantra that resonates.",
        });
        expect(steps[1].position).toBe(2);
    });

    it("includes optional tools / totalTime / estimatedCost when provided", () => {
        const schema = buildHowToSchema({
            name: "How to Start Japa",
            description: "Step-by-step.",
            url: "https://www.opensadhaka.com/how-to-start-japa",
            steps: [{ name: "Step 1", text: "Do the thing." }],
            tools: ["108-bead japa mala", "Quiet space"],
            totalTime: "PT15M",
            estimatedCost: { currency: "USD", value: 0 },
        });

        expect(schema.totalTime).toBe("PT15M");
        expect(schema.tool).toEqual([
            { "@type": "HowToTool", name: "108-bead japa mala" },
            { "@type": "HowToTool", name: "Quiet space" },
        ]);
        expect(schema.estimatedCost).toMatchObject({
            "@type": "MonetaryAmount",
            currency: "USD",
            value: 0,
        });
    });

    it("omits optional fields when not provided", () => {
        const schema = buildHowToSchema({
            name: "Title",
            description: "Desc",
            url: "https://example.com",
            steps: [{ name: "S", text: "T" }],
        });
        expect("tool" in schema).toBe(false);
        expect("totalTime" in schema).toBe(false);
        expect("estimatedCost" in schema).toBe(false);
    });
});

describe("buildDefinedTermSchema", () => {
    it("emits a Wiktionary-style DefinedTerm linked to the Sanskrit lexicon set", () => {
        const schema = buildDefinedTermSchema({
            name: "Karma",
            description: "Action and its consequences in Sanatan philosophy.",
            url: "https://www.opensadhaka.com/learn/sanskrit/karma",
        });

        expect(schema["@type"]).toBe("DefinedTerm");
        expect(schema.name).toBe("Karma");
        expect(schema.inDefinedTermSet).toMatchObject({
            "@type": "DefinedTermSet",
            name: "Sanskrit Lexicon",
            url: "https://www.opensadhaka.com/learn/sanskrit",
        });
    });

    it("includes alternateName transliterations when supplied", () => {
        const schema = buildDefinedTermSchema({
            name: "Karma",
            description: "Action.",
            url: "https://www.opensadhaka.com/learn/sanskrit/karma",
            alternateName: ["कर्म", "karman"],
        });
        expect(schema.alternateName).toEqual(["कर्म", "karman"]);
    });

    it("omits alternateName when not supplied", () => {
        const schema = buildDefinedTermSchema({
            name: "Karma",
            description: "Action.",
            url: "https://www.opensadhaka.com/learn/sanskrit/karma",
        });
        expect("alternateName" in schema).toBe(false);
    });
});

describe("buildQuotationSchema", () => {
    it("emits Quotation with default Sanskrit language", () => {
        const schema = buildQuotationSchema({
            text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
        });
        expect(schema["@type"]).toBe("Quotation");
        expect(schema.text).toContain("कर्मण्ये");
        expect(schema.inLanguage).toBe("sa");
    });

    it("attaches creator + isPartOf when provided", () => {
        const schema = buildQuotationSchema({
            text: "You have a right to action only, never to its fruits.",
            creator: "Krishna",
            isPartOf: "Bhagavad Gita 2.47",
            url: "https://www.opensadhaka.com/texts/bhagavad-gita/chapter-2/shloka-47",
            inLanguage: "en",
        });
        expect(schema.creator).toMatchObject({ "@type": "Person", name: "Krishna" });
        expect(schema.isPartOf).toMatchObject({
            "@type": "CreativeWork",
            name: "Bhagavad Gita 2.47",
        });
        expect(schema.inLanguage).toBe("en");
    });
});

describe("buildClaimReviewSchema", () => {
    it("emits ClaimReview with Sadhaka as Organization author + a 1-5 rating", () => {
        const schema = buildClaimReviewSchema({
            claimReviewed: "Sushruta invented plastic surgery",
            verdict: "partial",
            url: "https://www.opensadhaka.com/claims/sushruta-plastic-surgery",
            datePublished: "2026-05-19",
        });

        expect(schema["@type"]).toBe("ClaimReview");
        expect(schema.claimReviewed).toBe("Sushruta invented plastic surgery");
        expect(schema.author).toMatchObject({ "@type": "Organization", name: "Sadhaka" });
        const rating = schema.reviewRating as Record<string, unknown>;
        expect(rating["@type"]).toBe("Rating");
        expect(rating.ratingValue).toBe(3);
        expect(rating.bestRating).toBe(5);
        expect(rating.worstRating).toBe(1);
        expect(rating.alternateName).toBe("Partial truth, popular framing overstates");
    });

    it("maps each verdict to a distinct numeric rating", () => {
        const ratings = (["true", "mostly-true", "partial", "disputed", "false"] as const).map(
            (verdict) => {
                const schema = buildClaimReviewSchema({
                    claimReviewed: "x",
                    verdict,
                    url: "https://example.com",
                    datePublished: "2026-05-19",
                });
                return (schema.reviewRating as Record<string, number>).ratingValue;
            },
        );
        expect(ratings).toEqual([5, 4, 3, 2, 1]);
    });

    it("includes itemReviewed firstAppearance / author when supplied", () => {
        const schema = buildClaimReviewSchema({
            claimReviewed: "x",
            verdict: "false",
            url: "https://example.com",
            datePublished: "2026-05-19",
            itemReviewedAuthor: "Anonymous internet meme",
            itemReviewedUrl: "https://reddit.com/r/hinduism/post/123",
        });
        const item = schema.itemReviewed as Record<string, unknown>;
        expect(item.author).toMatchObject({ name: "Anonymous internet meme" });
        expect(item.firstAppearance).toBe("https://reddit.com/r/hinduism/post/123");
    });
});
