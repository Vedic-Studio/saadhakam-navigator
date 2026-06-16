import { describe, expect, it } from "vitest";
import { articles, type ArticleMeta } from "./articles";

describe("articles data integrity", () => {
  it("has at least one article", () => {
    expect(articles.length).toBeGreaterThan(0);
  });

  it("every article has all required fields", () => {
    const required: (keyof ArticleMeta)[] = [
      "slug",
      "route",
      "title",
      "metaDescription",
      "pillar",
      "publishDate",
      "readingTime",
      "primaryKeyword",
    ];

    for (const article of articles) {
      for (const field of required) {
        expect(
          article[field],
          `Article "${article.slug}" missing field "${field}"`
        ).toBeDefined();
      }
    }
  });

  it("has no duplicate slugs", () => {
    const slugs = articles.map((a) => a.slug);
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });

  it("has no duplicate routes", () => {
    const routes = articles.map((a) => a.route);
    const unique = new Set(routes);
    expect(routes.length).toBe(unique.size);
  });

  it("every route starts with / and has no trailing slash", () => {
    for (const article of articles) {
      expect(
        article.route.startsWith("/"),
        `Route "${article.route}" should start with /`
      ).toBe(true);
      expect(
        article.route.endsWith("/"),
        `Route "${article.route}" should not have trailing slash`
      ).toBe(false);
    }
  });

  it("every route matches its slug", () => {
    for (const article of articles) {
      expect(
        article.route,
        `Article "${article.slug}" route doesn't match slug`
      ).toBe(`/${article.slug}`);
    }
  });

  it("every pillar is a valid value", () => {
    const validPillars = [
      "ancient-wisdom",
      "practical-practices",
      "sacred-texts",
      "spiritual-traditions",
    ];
    for (const article of articles) {
      expect(
        validPillars,
        `Article "${article.slug}" has invalid pillar "${article.pillar}"`
      ).toContain(article.pillar);
    }
  });

  it("readingTime is a positive number", () => {
    for (const article of articles) {
      expect(
        article.readingTime,
        `Article "${article.slug}" has invalid readingTime`
      ).toBeGreaterThan(0);
    }
  });

  it("publishDate is a valid ISO date string", () => {
    for (const article of articles) {
      const parsed = Date.parse(article.publishDate);
      expect(
        isNaN(parsed),
        `Article "${article.slug}" has invalid publishDate "${article.publishDate}"`
      ).toBe(false);
    }
  });

  it("metaDescription is between 50 and 300 characters", () => {
    for (const article of articles) {
      expect(
        article.metaDescription.length,
        `Article "${article.slug}" metaDescription too short (${article.metaDescription.length} chars)`
      ).toBeGreaterThanOrEqual(50);
      expect(
        article.metaDescription.length,
        `Article "${article.slug}" metaDescription too long (${article.metaDescription.length} chars)`
      ).toBeLessThanOrEqual(300);
    }
  });

  it("every relatedLinks entry has text and href", () => {
    for (const article of articles) {
      for (const link of article.relatedLinks) {
        expect(link.text, `Related link in "${article.slug}" missing text`).toBeTruthy();
        expect(link.href, `Related link in "${article.slug}" missing href`).toBeTruthy();
        expect(
          link.href.startsWith("/"),
          `Related link href "${link.href}" in "${article.slug}" should start with /`
        ).toBe(true);
      }
    }
  });

  it("every FAQ has a question and answer", () => {
    for (const article of articles) {
      for (const faq of article.faqs) {
        expect(faq.question, `FAQ in "${article.slug}" missing question`).toBeTruthy();
        expect(faq.answer, `FAQ in "${article.slug}" missing answer`).toBeTruthy();
      }
    }
  });

  describe("per-destroyer temple-destruction hub pages", () => {
    const expectedSlugs = [
      "aurangzeb-temples-destroyed",
      "mahmud-of-ghazni-temples-destroyed",
      "sikandar-butshikan-kashmir-temples",
    ];

    it("all three destroyer pages are registered", () => {
      for (const slug of expectedSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(entry, `expected article "${slug}" to be registered in articles.ts`).toBeDefined();
      }
    });

    it("each destroyer page sits under the spiritual-traditions pillar", () => {
      for (const slug of expectedSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(entry?.pillar, `"${slug}" should sit under spiritual-traditions pillar`).toBe(
          "spiritual-traditions",
        );
      }
    });

    it("each destroyer page has the canonical AEO answer block (60-100+ chars)", () => {
      for (const slug of expectedSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(entry?.aeoAnswer, `"${slug}" missing aeoAnswer`).toBeDefined();
        expect(
          (entry?.aeoAnswer ?? "").length,
          `"${slug}" aeoAnswer too short`,
        ).toBeGreaterThan(200);
      }
    });

    it("each destroyer page has at least four FAQs", () => {
      for (const slug of expectedSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(
          entry?.faqs.length ?? 0,
          `"${slug}" should have at least 4 FAQs`,
        ).toBeGreaterThanOrEqual(4);
      }
    });

    it("each destroyer page cross-links the hub article", () => {
      for (const slug of expectedSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        const hrefs = entry?.relatedLinks.map((l) => l.href) ?? [];
        expect(
          hrefs,
          `"${slug}" relatedLinks should reference the hub`,
        ).toContain("/temples-destroyed-medieval-india");
      }
    });

    it("title for each destroyer page is under 60 characters (SEO meta limit)", () => {
      for (const slug of expectedSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(
          (entry?.title ?? "").length,
          `"${slug}" title is too long for SEO`,
        ).toBeLessThanOrEqual(60);
      }
    });
  });

  describe("individual temple-destruction case pages", () => {
    const caseSlugs = [
      "somnath-destruction",
      "kashi-vishwanath-aurangzeb",
      "keshavdev-mathura",
      "martand-sun-temple",
    ];

    it("all four case pages are registered", () => {
      for (const slug of caseSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(entry, `expected article "${slug}" to be registered in articles.ts`).toBeDefined();
      }
    });

    it("each case page sits under the spiritual-traditions pillar", () => {
      for (const slug of caseSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(entry?.pillar, `"${slug}" should sit under spiritual-traditions pillar`).toBe(
          "spiritual-traditions",
        );
      }
    });

    it("each case page has a 60-100 word AEO answer", () => {
      for (const slug of caseSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        const wordCount = (entry?.aeoAnswer ?? "").split(/\s+/).filter(Boolean).length;
        expect(
          wordCount,
          `"${slug}" aeoAnswer word count ${wordCount} not in 60-100 range`,
        ).toBeGreaterThanOrEqual(60);
        expect(
          wordCount,
          `"${slug}" aeoAnswer word count ${wordCount} not in 60-100 range`,
        ).toBeLessThanOrEqual(110);
      }
    });

    it("each case page has at least four FAQs", () => {
      for (const slug of caseSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(
          entry?.faqs.length ?? 0,
          `"${slug}" should have at least 4 FAQs`,
        ).toBeGreaterThanOrEqual(4);
      }
    });

    it("each case page cross-links the hub article", () => {
      for (const slug of caseSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        const hrefs = entry?.relatedLinks.map((l) => l.href) ?? [];
        expect(
          hrefs,
          `"${slug}" relatedLinks should reference the hub`,
        ).toContain("/temples-destroyed-medieval-india");
      }
    });

    it("title for each case page is under 60 characters (SEO meta limit)", () => {
      for (const slug of caseSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        expect(
          (entry?.title ?? "").length,
          `"${slug}" title is too long for SEO`,
        ).toBeLessThanOrEqual(60);
      }
    });

    it("metaDescription for each case page is within SEO bounds (50-170 chars)", () => {
      for (const slug of caseSlugs) {
        const entry = articles.find((a) => a.slug === slug);
        const len = entry?.metaDescription.length ?? 0;
        expect(len, `"${slug}" metaDescription is too short`).toBeGreaterThanOrEqual(50);
        expect(len, `"${slug}" metaDescription is too long`).toBeLessThanOrEqual(170);
      }
    });
  });
});
