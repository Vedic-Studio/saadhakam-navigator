import { describe, expect, it } from "vitest";
import { practices, getPracticeBySlug, type Practice } from "./practices";

describe("practices data integrity", () => {
  it("has at least one practice", () => {
    // The /practices hub renders an empty grid (and signals nothing to crawl)
    // if this array is ever emptied. Guard the hub's reason to exist.
    expect(practices.length).toBeGreaterThan(0);
  });

  it("has no duplicate slugs", () => {
    // Hub cards key on slug and link to /practices/<slug>. A duplicate slug
    // means a React key collision and two cards pointing at the same detail
    // page, so this invariant is load-bearing for the index page.
    const slugs = practices.map((p) => p.slug);
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });

  it("slugs are URL-safe (lowercase, hyphens only)", () => {
    for (const practice of practices) {
      expect(
        /^[a-z0-9-]+$/.test(practice.slug),
        `Practice slug "${practice.slug}" is not URL-safe`
      ).toBe(true);
    }
  });

  it("every practice has the fields the hub card renders", () => {
    const required: (keyof Practice)[] = [
      "slug",
      "title",
      "sanskritName",
      "summary",
      "tags",
    ];

    for (const practice of practices) {
      for (const field of required) {
        expect(
          practice[field],
          `Practice "${practice.slug}" missing field "${field}"`
        ).toBeDefined();
      }
      expect(
        practice.summary.length,
        `Practice "${practice.slug}" has empty summary`
      ).toBeGreaterThan(0);
      expect(
        Array.isArray(practice.tags),
        `Practice "${practice.slug}" tags is not an array`
      ).toBe(true);
    }
  });

  it("getPracticeBySlug resolves a known slug and returns undefined for unknown", () => {
    const first = practices[0];
    expect(getPracticeBySlug(first.slug)).toEqual(first);
    expect(getPracticeBySlug("not-a-real-practice")).toBeUndefined();
  });
});
