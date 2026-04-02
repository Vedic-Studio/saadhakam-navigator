import { describe, expect, it } from "vitest";
import { authenticityDeduction, scanContent, type ViolationType } from "./exclusion-scan";

function expectViolation(content: string, type: ViolationType) {
    const result = scanContent(content);
    const found = result.violations.filter((v) => v.type === type);
    expect(found.length, `Expected ${type} violation in: "${content}"`).toBeGreaterThan(0);
    expect(result.passed).toBe(false);
}

function expectClean(content: string) {
    const result = scanContent(content);
    expect(result.violations, `Expected no violations in: "${content.slice(0, 80)}..."`).toHaveLength(0);
    expect(result.passed).toBe(true);
}

describe("exclusion scan — CONCESSION", () => {
    it("catches 'to be fair'", () => {
        expectViolation("To be fair, the argument has merit.", "CONCESSION");
    });

    it("catches 'make no mistake'", () => {
        expectViolation("Make no mistake, this is a complex topic.", "CONCESSION");
    });

    it("catches 'there is no denying'", () => {
        expectViolation("There's no denying the influence of Shankara.", "CONCESSION");
    });

    it("catches 'credit where it's due'", () => {
        expectViolation("Credit where it's due, the text is well-preserved.", "CONCESSION");
    });
});

describe("exclusion scan — EM_DASH", () => {
    it("catches unicode em dash", () => {
        expectViolation("The truth \u2014 if we dare call it that \u2014 is simple.", "EM_DASH");
    });

    it("catches double-dash with spaces", () => {
        expectViolation("The truth -- if we dare call it that -- is simple.", "EM_DASH");
    });

    it("does not flag single hyphen", () => {
        expectClean("The well-known text describes liberation.");
    });
});

describe("exclusion scan — BINARY_CONTRAST", () => {
    it("catches 'it's not X, it's Y'", () => {
        expectViolation("It's not just a philosophy, it's a way of life.", "BINARY_CONTRAST");
    });

    it("catches 'less about X, more about Y'", () => {
        expectViolation("Vedanta is less about ritual, more about understanding.", "BINARY_CONTRAST");
    });
});

describe("exclusion scan — THROAT_CLEARING", () => {
    it("catches 'here's the thing'", () => {
        expectViolation("Here's the thing about Advaita Vedanta.", "THROAT_CLEARING");
    });

    it("catches 'the reality is'", () => {
        expectViolation("The reality is that most seekers start with questions.", "THROAT_CLEARING");
    });

    it("catches 'let's be honest'", () => {
        expectViolation("Let's be honest about the challenges of practice.", "THROAT_CLEARING");
    });

    it("does not flag mid-sentence usage", () => {
        expectClean("Many scholars believe the reality is more nuanced.");
    });
});

describe("exclusion scan — FILLER_ADVERB", () => {
    it("catches 'essentially'", () => {
        expectViolation("Brahman is essentially the ground of all being.", "FILLER_ADVERB");
    });

    it("catches 'literally'", () => {
        expectViolation("The text literally says that atman is Brahman.", "FILLER_ADVERB");
    });

    it("catches 'undoubtedly'", () => {
        expectViolation("Shankara is undoubtedly the most influential commentator.", "FILLER_ADVERB");
    });
});

describe("exclusion scan — FALSE_AGENCY", () => {
    it("catches 'the tradition demands'", () => {
        expectViolation("The tradition demands complete surrender from the seeker.", "FALSE_AGENCY");
    });

    it("catches 'the text speaks'", () => {
        expectViolation("The text speaks to the deepest human yearning.", "FALSE_AGENCY");
    });

    it("does not flag human subjects with human verbs", () => {
        expectClean("Shankara argues that Brahman alone is real.");
    });
});

describe("exclusion scan — NEGATIVE_LISTING", () => {
    it("catches 'Not X. Not Y. But Z'", () => {
        expectViolation("Not philosophy. Not religion. But direct experience.", "NEGATIVE_LISTING");
    });
});

describe("exclusion scan — DRAMATIC_FRAGMENTATION", () => {
    it("catches 3+ consecutive short sentences", () => {
        expectViolation("It worked.\nThey knew.\nIt changed.\nForever.", "DRAMATIC_FRAGMENTATION");
    });

    it("does not flag normal paragraphs", () => {
        expectClean("The Upanishads form the philosophical core of the Vedas. They explore questions of consciousness, identity, and the nature of reality through dialogue between teacher and student.");
    });
});

describe("exclusion scan — MIC_DROP", () => {
    it("catches short metaphorical endings before section break", () => {
        expectViolation("And that's enough said.\n\n## Next Section", "MIC_DROP");
    });

    it("catches end-of-content mic drops", () => {
        expectViolation("That's the end of story.", "MIC_DROP");
    });
});

describe("exclusion scan — TRICOLON", () => {
    it("catches three parallel comma-separated phrases with same opener", () => {
        expectViolation("seeking truth, seeking peace, seeking liberation in every moment.", "TRICOLON");
    });
});

describe("exclusion scan — frontmatter handling", () => {
    it("strips YAML frontmatter before scanning", () => {
        const content = `---
title: What is Vedanta
slug: what-is-vedanta
---

Vedanta is one of the six orthodox schools of Hindu philosophy.`;
        expectClean(content);
    });

    it("scans content after frontmatter", () => {
        const content = `---
title: Test
---

Here's the thing about Vedanta.`;
        expectViolation(content, "THROAT_CLEARING");
    });
});

describe("exclusion scan — clean content passes", () => {
    it("passes well-written content", () => {
        const content = `## What is Vedanta?

Vedanta is one of the six orthodox schools of Hindu philosophy. The word comes from two Sanskrit roots: veda (knowledge) and anta (end), meaning "the end of the Vedas."

The Upanishads, which form the concluding portions of the Vedas, contain the core teachings. Shankara's commentaries on these texts established Advaita Vedanta as the dominant interpretation.

Three texts form the foundation: the Upanishads, the Brahma Sutras, and the Bhagavad Gita. Together they are called the prasthanatraya.`;
        expectClean(content);
    });
});

describe("exclusion scan — summary format", () => {
    it("reports PASS for clean content", () => {
        const result = scanContent("Vedanta is a school of Hindu philosophy.");
        expect(result.summary).toContain("PASS");
    });

    it("reports FAIL with violation counts", () => {
        const result = scanContent("To be fair, the tradition demands complete surrender.");
        expect(result.summary).toContain("FAIL");
        expect(result.summary).toMatch(/\d+ violation/);
    });
});

describe("authenticityDeduction", () => {
    it("returns 0 for clean content", () => {
        const result = scanContent("Vedanta is a school of Hindu philosophy.");
        expect(authenticityDeduction(result)).toBe(0);
    });

    it("deducts 0.5 per violation", () => {
        const result = scanContent("To be fair, the tradition demands complete surrender.");
        expect(authenticityDeduction(result)).toBeGreaterThanOrEqual(0.5);
    });

    it("caps deduction at 3 points", () => {
        // Content with many violations
        const content = `To be fair, the tradition demands complete surrender.
Here's the thing about this philosophy.
It's essentially the ultimate truth.
Make no mistake, there's no denying the power.
The text speaks to everyone.
Let's be honest about the reality.
The narrative insists on this interpretation.`;
        const result = scanContent(content);
        expect(authenticityDeduction(result)).toBeLessThanOrEqual(3);
    });
});
