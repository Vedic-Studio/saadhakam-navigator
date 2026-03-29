import { describe, expect, it } from "vitest";
import { mantras, type Mantra } from "./mantras";

describe("mantras data integrity", () => {
  it("has at least one mantra", () => {
    expect(mantras.length).toBeGreaterThan(0);
  });

  it("every mantra has all required fields", () => {
    const required: (keyof Mantra)[] = [
      "id",
      "slug",
      "name",
      "transliteration",
      "oneLineMeaning",
      "tradition",
      "purpose",
      "source",
      "practice",
      "relatedMantras",
      "relatedLinks",
      "faq",
    ];

    for (const mantra of mantras) {
      for (const field of required) {
        expect(
          mantra[field],
          `Mantra "${mantra.slug}" missing field "${field}"`
        ).toBeDefined();
      }
    }
  });

  it("has no duplicate slugs", () => {
    const slugs = mantras.map((m) => m.slug);
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });

  it("slugs are URL-safe (lowercase, hyphens only)", () => {
    for (const mantra of mantras) {
      expect(
        /^[a-z0-9-]+$/.test(mantra.slug),
        `Mantra slug "${mantra.slug}" is not URL-safe`
      ).toBe(true);
    }
  });

  it("faq entries have question and answer", () => {
    for (const mantra of mantras) {
      expect(
        mantra.faq.length,
        `Mantra "${mantra.slug}" has no FAQ entries`
      ).toBeGreaterThan(0);
      for (const item of mantra.faq) {
        expect(
          item.question.length,
          `Mantra "${mantra.slug}" has empty FAQ question`
        ).toBeGreaterThan(0);
        expect(
          item.answer.length,
          `Mantra "${mantra.slug}" has empty FAQ answer`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("practice has bestTime, repetitions, and notes", () => {
    for (const mantra of mantras) {
      expect(mantra.practice.bestTime.length).toBeGreaterThan(0);
      expect(mantra.practice.repetitions.length).toBeGreaterThan(0);
      expect(mantra.practice.notes.length).toBeGreaterThan(0);
    }
  });

  it("etymology has valid structure when present", () => {
    for (const mantra of mantras) {
      if (mantra.etymology) {
        expect(
          mantra.etymology.wordByWord.length,
          `Mantra "${mantra.slug}" etymology has empty wordByWord`
        ).toBeGreaterThan(0);
        expect(
          mantra.etymology.overallMeaning.length,
          `Mantra "${mantra.slug}" etymology has empty overallMeaning`
        ).toBeGreaterThan(0);
        for (const entry of mantra.etymology.wordByWord) {
          expect(entry.word.length).toBeGreaterThan(0);
          expect(entry.meaning.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("shastraContext is non-empty when present", () => {
    for (const mantra of mantras) {
      if (mantra.shastraContext !== undefined) {
        expect(
          mantra.shastraContext.length,
          `Mantra "${mantra.slug}" has empty shastraContext`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("relatedMantras reference existing slugs", () => {
    const allSlugs = new Set(mantras.map((m) => m.slug));
    const broken: string[] = [];

    for (const mantra of mantras) {
      for (const related of mantra.relatedMantras) {
        if (!allSlugs.has(related)) {
          broken.push(`"${mantra.slug}" -> "${related}"`);
        }
      }
    }

    expect(
      broken,
      `Broken relatedMantras refs:\n${broken.join("\n")}`
    ).toHaveLength(0);
  });
});
