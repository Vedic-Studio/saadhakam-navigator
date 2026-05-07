import { describe, expect, it } from "vitest";
import { sanskritVocab, getSanskritWordBySlug } from "./sanskritVocab";

describe("sanskritVocab data integrity", () => {
  it("has at least one entry", () => {
    expect(sanskritVocab.length).toBeGreaterThan(0);
  });

  it("has no duplicate slugs", () => {
    const slugs = sanskritVocab.map((w) => w.slug);
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });

  it("slugs are URL-safe (lowercase, hyphens only)", () => {
    for (const word of sanskritVocab) {
      expect(
        /^[a-z0-9-]+$/.test(word.slug),
        `Sanskrit slug "${word.slug}" is not URL-safe`,
      ).toBe(true);
    }
  });

  it("getSanskritWordBySlug returns the right entry", () => {
    const dharma = getSanskritWordBySlug("dharma");
    expect(dharma).toBeDefined();
    expect(dharma?.wordEnglish).toBe("Dharma");
  });

  it("getSanskritWordBySlug returns undefined for unknown slug", () => {
    expect(getSanskritWordBySlug("definitely-not-a-word")).toBeUndefined();
  });
});

describe("sanskritVocab SEO overrides", () => {
  // The /learn/sanskrit/[word] page reads seoTitle/seoDescription/ogTitle/
  // ogDescription directly. CTR fixes regress silently if these fields are
  // dropped or stretched past SERP-safe lengths. Aligned with the strict
  // 60/160 budget enforced by src/app/__tests__/ctr-metadata-budget.test.ts.
  const TITLE_MAX = 60;
  const DESC_MAX = 160;

  it("seo override fields are SERP-safe when present", () => {
    for (const word of sanskritVocab) {
      if (word.seoTitle !== undefined) {
        expect(
          word.seoTitle.length,
          `"${word.slug}" has empty seoTitle`,
        ).toBeGreaterThan(0);
        expect(
          word.seoTitle.length,
          `"${word.slug}" seoTitle exceeds ${TITLE_MAX} chars: "${word.seoTitle}"`,
        ).toBeLessThanOrEqual(TITLE_MAX);
      }
      if (word.seoDescription !== undefined) {
        expect(word.seoDescription.length).toBeGreaterThan(0);
        expect(
          word.seoDescription.length,
          `"${word.slug}" seoDescription exceeds ${DESC_MAX} chars`,
        ).toBeLessThanOrEqual(DESC_MAX);
      }
      if (word.ogTitle !== undefined) {
        expect(word.ogTitle.length).toBeGreaterThan(0);
      }
      if (word.ogDescription !== undefined) {
        expect(word.ogDescription.length).toBeGreaterThan(0);
      }
    }
  });

  it("bhakti entry ships with all four SEO overrides (CTR PR 1, 2026-05-07)", () => {
    const bhakti = getSanskritWordBySlug("bhakti");
    expect(bhakti).toBeDefined();
    expect(bhakti?.seoTitle).toBeDefined();
    expect(bhakti?.seoDescription).toBeDefined();
    expect(bhakti?.ogTitle).toBeDefined();
    expect(bhakti?.ogDescription).toBeDefined();
  });
});
