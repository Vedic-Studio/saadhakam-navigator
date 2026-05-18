import { describe, expect, it } from "vitest";
import { practices, getPracticeBySlug, type Practice } from "./practices";
import { practiceGoals } from "./practiceGoals";

describe("practices data integrity", () => {
  it("has at least one practice", () => {
    expect(practices.length).toBeGreaterThan(0);
  });

  it("every practice has the required core fields", () => {
    const required: (keyof Practice)[] = [
      "slug",
      "title",
      "sanskritName",
      "summary",
      "whatItIs",
      "whoItSuits",
      "howToBegin",
      "benefits",
      "timeCommitment",
      "tags",
      "icon",
    ];
    for (const p of practices) {
      for (const field of required) {
        expect(
          p[field],
          `Practice "${p.slug}" missing field "${String(field)}"`,
        ).toBeDefined();
      }
    }
  });

  it("has no duplicate practice slugs", () => {
    const slugs = practices.map((p) => p.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it("practice slugs are URL-safe", () => {
    for (const p of practices) {
      expect(
        /^[a-z0-9-]+$/.test(p.slug),
        `Practice slug "${p.slug}" is not URL-safe`,
      ).toBe(true);
    }
  });

  it("getPracticeBySlug returns the right practice for a known slug", () => {
    expect(getPracticeBySlug("japa")?.title).toBe("Japa");
    expect(getPracticeBySlug("nonexistent")).toBeUndefined();
  });
});

describe("practice availableGoals matrix", () => {
  it("every goal slug in availableGoals exists in practiceGoals", () => {
    const goalSlugs = new Set(practiceGoals.map((g) => g.slug));
    for (const p of practices) {
      for (const goalSlug of p.availableGoals ?? []) {
        expect(
          goalSlugs.has(goalSlug),
          `Practice "${p.slug}" references unknown goal "${goalSlug}"`,
        ).toBe(true);
      }
    }
  });

  it("japa includes the four expected goals (orphan recovery contract)", () => {
    const japa = getPracticeBySlug("japa");
    const goals = japa?.availableGoals ?? [];
    expect(goals).toEqual(
      expect.arrayContaining(["anxiety", "focus", "devotion", "sleep"]),
    );
  });

  it("kirtan and puja expose devotion as an available goal", () => {
    expect(getPracticeBySlug("kirtan")?.availableGoals).toContain("devotion");
    expect(getPracticeBySlug("puja")?.availableGoals).toContain("devotion");
  });
});
