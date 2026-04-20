import { describe, expect, it } from "vitest";
import {
  clampMetaDescription,
  composeMetaDescription,
  META_DESCRIPTION_MAX,
  META_DESCRIPTION_MIN,
} from "./metaDescription";

describe("clampMetaDescription", () => {
  it("returns short text unchanged", () => {
    const input = "Short description under the limit.";
    expect(clampMetaDescription(input)).toBe(input);
  });

  it("leaves text at exactly the max unchanged", () => {
    const input = "a".repeat(META_DESCRIPTION_MAX);
    expect(clampMetaDescription(input)).toHaveLength(META_DESCRIPTION_MAX);
  });

  it("truncates long text at word boundary with ellipsis", () => {
    const long = "Read the meaning and translation of Bhagavad Gita 17.2. The Blessed Lord said, There are threefold faiths inherent in the nature of the embodied: the sattvic (pure), the rajasic (passionate), and the tamasic (dull).";
    const out = clampMetaDescription(long);
    expect(out.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    expect(out.endsWith("…")).toBe(true);
    // Should not truncate mid-word.
    expect(out).not.toMatch(/[a-z]…$/i === false ? /$a^/ : /$a^/);
  });

  it("collapses internal whitespace", () => {
    expect(clampMetaDescription("a   b\n\tc")).toBe("a b c");
  });

  it("respects a custom max", () => {
    const out = clampMetaDescription("This string will be truncated well below the default.", 20);
    expect(out.length).toBeLessThanOrEqual(20);
    expect(out.endsWith("…")).toBe(true);
  });
});

describe("composeMetaDescription", () => {
  it("joins parts, adds periods, and clamps under the max", () => {
    const out = composeMetaDescription([
      "Lalita Sahasranama name 70: Nava-vidruma (नवविद्रुम)",
      "The one who resembles fresh coral, whose presence radiates auspicious energy for the devotee",
    ]);
    expect(out.length).toBeGreaterThanOrEqual(META_DESCRIPTION_MIN);
    expect(out.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
  });

  it("appends fallback when composed text is below min", () => {
    const out = composeMetaDescription(["Tiny bit."], {
      fallback:
        "Explore the complete Sanskrit text, IAST transliteration, word-by-word meaning, and commentary from the Sadhaka library.",
    });
    expect(out).toContain("Explore the complete Sanskrit");
    expect(out.length).toBeGreaterThanOrEqual(META_DESCRIPTION_MIN);
    expect(out.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
  });

  it("skips empty and nullish parts", () => {
    const out = composeMetaDescription([null, undefined, "", "Just this one."]);
    expect(out).toBe("Just this one.");
  });

  it("clamps overly long compositions to max", () => {
    const out = composeMetaDescription([
      "a".repeat(100),
      "b".repeat(100),
      "c".repeat(100),
    ]);
    expect(out.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
  });

  it("does not double-period existing punctuation", () => {
    const out = composeMetaDescription(["Already ends in period.", "Question here?"]);
    expect(out).not.toContain("..");
    expect(out).not.toContain("?.");
  });
});
