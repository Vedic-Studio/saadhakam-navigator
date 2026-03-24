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
});
