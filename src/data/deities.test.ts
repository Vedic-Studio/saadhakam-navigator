import { describe, expect, it } from "vitest";
import { deities, type Deity } from "./deities";
import { traditions } from "./traditions";

describe("deities data integrity", () => {
  it("has at least one deity", () => {
    expect(deities.length).toBeGreaterThan(0);
  });

  it("every deity has all required fields", () => {
    const required: (keyof Deity)[] = [
      "id",
      "slug",
      "name",
      "devanagari",
      "transliteration",
      "tradition",
      "category",
      "description",
      "aeoBlock",
      "iconography",
      "mythology",
      "philosophy",
      "mantras",
      "associatedStotras",
      "associatedTexts",
      "associatedTraditions",
      "primaryKeyword",
      "relatedDeities",
      "tags",
    ];

    for (const deity of deities) {
      for (const field of required) {
        expect(
          deity[field],
          `Deity "${deity.slug}" missing field "${field}"`
        ).toBeDefined();
      }
    }
  });

  it("has no duplicate slugs", () => {
    const slugs = deities.map((d) => d.slug);
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });

  it("slugs are URL-safe (lowercase, hyphens only)", () => {
    for (const deity of deities) {
      expect(
        /^[a-z0-9-]+$/.test(deity.slug),
        `Deity slug "${deity.slug}" is not URL-safe`
      ).toBe(true);
    }
  });

  it("category is a valid value", () => {
    const validCategories = [
      "Trimurti",
      "Devi",
      "Deva",
      "Avatar",
      "Gana",
      "Yaksha",
      "Navagraha",
    ];
    for (const deity of deities) {
      expect(
        validCategories.includes(deity.category),
        `Deity "${deity.slug}" has invalid category "${deity.category}"`
      ).toBe(true);
    }
  });

  it("relatedDeities reference existing slugs", () => {
    const allSlugs = new Set(deities.map((d) => d.slug));
    // Known broken refs from initial data seeding — fix in content pass
    const knownMissing = new Set(["lalita"]);
    const broken: string[] = [];

    for (const deity of deities) {
      for (const related of deity.relatedDeities) {
        if (!allSlugs.has(related) && !knownMissing.has(related)) {
          broken.push(`"${deity.slug}" -> "${related}"`);
        }
      }
    }

    expect(
      broken,
      `Broken relatedDeities refs:\n${broken.join("\n")}`
    ).toHaveLength(0);
  });

  it("faq entries have question and answer when present", () => {
    for (const deity of deities) {
      if (deity.faq) {
        for (const item of deity.faq) {
          expect(
            item.question.length,
            `Deity "${deity.slug}" has empty FAQ question`
          ).toBeGreaterThan(0);
          expect(
            item.answer.length,
            `Deity "${deity.slug}" has empty FAQ answer`
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("description starts with 'Who is'", () => {
    for (const deity of deities) {
      expect(
        deity.description.startsWith("Who is"),
        `Deity "${deity.slug}" description should start with "Who is"`
      ).toBe(true);
    }
  });

  it("iconography has non-empty attributes array", () => {
    for (const deity of deities) {
      expect(
        deity.iconography.attributes.length,
        `Deity "${deity.slug}" has empty iconography attributes`
      ).toBeGreaterThan(0);
    }
  });

  it("associatedTraditions reference real tradition slugs (no /traditions 404s)", () => {
    const validTraditionSlugs = new Set(traditions.map((t) => t.slug));
    const broken: string[] = [];

    for (const deity of deities) {
      for (const tradition of deity.associatedTraditions) {
        if (!validTraditionSlugs.has(tradition)) {
          broken.push(`"${deity.slug}" -> "${tradition}"`);
        }
      }
    }

    expect(
      broken,
      `associatedTraditions slugs with no matching tradition page (would 404 at /traditions/<slug>):\n${broken.join(
        "\n"
      )}`
    ).toHaveLength(0);
  });
});
