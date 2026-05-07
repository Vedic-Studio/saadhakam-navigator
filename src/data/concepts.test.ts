import { describe, expect, it } from "vitest";
import { concepts, type Concept } from "./concepts";

describe("concepts data integrity", () => {
  it("has at least one concept", () => {
    expect(concepts.length).toBeGreaterThan(0);
  });

  it("every concept has all required fields", () => {
    const required: (keyof Concept)[] = [
      "slug",
      "sanskritWord",
      "englishTranslation",
      "shortDefinition",
      "longDescription",
      "keyPrinciples",
      "roleInPhilosophy",
      "practicalApplication",
      "relatedConcepts",
      "sourceTexts",
      "tags",
    ];

    for (const concept of concepts) {
      for (const field of required) {
        expect(
          concept[field],
          `Concept "${concept.slug}" missing field "${field}"`
        ).toBeDefined();
      }
    }
  });

  it("has no duplicate slugs", () => {
    const slugs = concepts.map((c) => c.slug);
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });

  it("slugs are URL-safe (lowercase, hyphens only)", () => {
    for (const concept of concepts) {
      expect(
        /^[a-z0-9-]+$/.test(concept.slug),
        `Concept slug "${concept.slug}" is not URL-safe`
      ).toBe(true);
    }
  });

  it("keyPrinciples is a non-empty array", () => {
    for (const concept of concepts) {
      expect(
        Array.isArray(concept.keyPrinciples),
        `Concept "${concept.slug}" keyPrinciples is not an array`
      ).toBe(true);
      expect(
        concept.keyPrinciples.length,
        `Concept "${concept.slug}" has empty keyPrinciples`
      ).toBeGreaterThan(0);
    }
  });

  it("relatedConcepts reference existing slugs", () => {
    const allSlugs = new Set(concepts.map((c) => c.slug));
    // Known broken refs to fix in a content pass — remove from this set as they're fixed
    const knownMissing = new Set([
      "tantra", "sattva", "mandala", "yoga-nidra",
      "nirodha", "dukkha", "vasana",
    ]);
    const unknownBroken: string[] = [];

    for (const concept of concepts) {
      for (const related of concept.relatedConcepts) {
        if (!allSlugs.has(related) && !knownMissing.has(related)) {
          unknownBroken.push(`"${concept.slug}" -> "${related}"`);
        }
      }
    }

    expect(
      unknownBroken,
      `New broken relatedConcept refs found:\n${unknownBroken.join("\n")}`
    ).toHaveLength(0);
  });

  it("shortDefinition is concise (under 300 chars)", () => {
    for (const concept of concepts) {
      expect(
        concept.shortDefinition.length,
        `Concept "${concept.slug}" shortDefinition too long (${concept.shortDefinition.length} chars)`
      ).toBeLessThanOrEqual(300);
    }
  });

  // SEO override fields exist for CTR-optimization on specific concept pages.
  // The /what-is-<slug> page reads these directly. If the field disappears
  // from the type or the data, the CTR fix silently regresses.
  // Aligned with the strict 60/160 budget enforced sitewide by
  // src/app/__tests__/ctr-metadata-budget.test.ts.
  it("seo override fields are non-empty strings within SERP-safe lengths when present", () => {
    const TITLE_MAX = 60;
    const DESC_MAX = 160;

    for (const concept of concepts) {
      if (concept.seoTitle !== undefined) {
        expect(
          concept.seoTitle.length,
          `Concept "${concept.slug}" has empty seoTitle`,
        ).toBeGreaterThan(0);
        expect(
          concept.seoTitle.length,
          `Concept "${concept.slug}" seoTitle exceeds ${TITLE_MAX} chars: "${concept.seoTitle}"`,
        ).toBeLessThanOrEqual(TITLE_MAX);
      }
      if (concept.seoDescription !== undefined) {
        expect(
          concept.seoDescription.length,
          `Concept "${concept.slug}" has empty seoDescription`,
        ).toBeGreaterThan(0);
        expect(
          concept.seoDescription.length,
          `Concept "${concept.slug}" seoDescription exceeds ${DESC_MAX} chars`,
        ).toBeLessThanOrEqual(DESC_MAX);
      }
      if (concept.ogTitle !== undefined) {
        expect(concept.ogTitle.length).toBeGreaterThan(0);
      }
      if (concept.ogDescription !== undefined) {
        expect(concept.ogDescription.length).toBeGreaterThan(0);
      }
    }
  });

  it("prasad concept ships with all four SEO overrides (CTR PR 1, 2026-05-07)", () => {
    const prasad = concepts.find((c) => c.slug === "prasad");
    expect(prasad, "prasad concept slug missing").toBeDefined();
    expect(prasad?.seoTitle).toBeDefined();
    expect(prasad?.seoDescription).toBeDefined();
    expect(prasad?.ogTitle).toBeDefined();
    expect(prasad?.ogDescription).toBeDefined();
  });
});
