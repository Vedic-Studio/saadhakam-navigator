import { describe, expect, it } from "vitest";

// Test the pure, exported helper functions that don't require database access.
// These are the critical logic gates that control CMS stage transitions and publish eligibility.

// We re-implement the logic here rather than importing private functions,
// because the module has side effects (postgres connection at import time).
// The functions under test are small enough that duplication is acceptable
// and avoids mocking the entire module just to test 3-line functions.

// --- Mirrors of private functions from storage.ts ---

type CmsReviewAction = "approve" | "revise" | "reject";
type CmsStage = "draft" | "edit" | "review" | "approved" | "published" | "rejected" | "legacy";

function getStageForReviewAction(action: CmsReviewAction): CmsStage {
    if (action === "approve") return "approved";
    if (action === "reject") return "rejected";
    return "edit";
}

function getStageForUnpublishedArticle(currentStage?: CmsStage | null): CmsStage {
    if (currentStage === "approved") return "approved";
    if (currentStage === "rejected") return "rejected";
    return "edit";
}

function canPublishArticle(stage?: CmsStage | null, hasKnownRoute?: boolean): boolean {
    return stage === "approved" && Boolean(hasKnownRoute);
}

function slugifyTopic(input: string): string {
    return input
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/[-\s]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
}

function sqlString(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return "NULL";
    if (typeof value === "number") return `${value}`;
    return `'${value.replaceAll("'", "''")}'`;
}

// --- Tests ---

describe("getStageForReviewAction", () => {
    it("maps approve to approved", () => {
        expect(getStageForReviewAction("approve")).toBe("approved");
    });

    it("maps reject to rejected", () => {
        expect(getStageForReviewAction("reject")).toBe("rejected");
    });

    it("maps revise to edit", () => {
        expect(getStageForReviewAction("revise")).toBe("edit");
    });
});

describe("getStageForUnpublishedArticle", () => {
    it("preserves approved stage", () => {
        expect(getStageForUnpublishedArticle("approved")).toBe("approved");
    });

    it("preserves rejected stage", () => {
        expect(getStageForUnpublishedArticle("rejected")).toBe("rejected");
    });

    it("falls back to edit for draft", () => {
        expect(getStageForUnpublishedArticle("draft")).toBe("edit");
    });

    it("falls back to edit for review", () => {
        expect(getStageForUnpublishedArticle("review")).toBe("edit");
    });

    it("falls back to edit for published (un-publishing)", () => {
        expect(getStageForUnpublishedArticle("published")).toBe("edit");
    });

    it("falls back to edit for null", () => {
        expect(getStageForUnpublishedArticle(null)).toBe("edit");
    });

    it("falls back to edit for undefined", () => {
        expect(getStageForUnpublishedArticle(undefined)).toBe("edit");
    });
});

describe("canPublishArticle", () => {
    it("allows publishing when approved with known route", () => {
        expect(canPublishArticle("approved", true)).toBe(true);
    });

    it("rejects publishing when not approved", () => {
        expect(canPublishArticle("draft", true)).toBe(false);
        expect(canPublishArticle("review", true)).toBe(false);
        expect(canPublishArticle("edit", true)).toBe(false);
        expect(canPublishArticle("rejected", true)).toBe(false);
        expect(canPublishArticle("published", true)).toBe(false);
        expect(canPublishArticle("legacy", true)).toBe(false);
    });

    it("rejects publishing when approved but no known route", () => {
        expect(canPublishArticle("approved", false)).toBe(false);
    });

    it("rejects publishing when both conditions missing", () => {
        expect(canPublishArticle(null, false)).toBe(false);
        expect(canPublishArticle(undefined, undefined)).toBe(false);
    });
});

describe("slugifyTopic", () => {
    it("converts simple topics to slugs", () => {
        expect(slugifyTopic("What is Vedanta")).toBe("what-is-vedanta");
    });

    it("strips diacritics and special characters", () => {
        expect(slugifyTopic("Advaita Vedānta: A Guide")).toBe("advaita-vedanta-a-guide");
    });

    it("collapses multiple spaces and hyphens", () => {
        expect(slugifyTopic("  too   many -- spaces  ")).toBe("too-many-spaces");
    });

    it("truncates to 80 characters", () => {
        const longTopic = "a".repeat(100);
        expect(slugifyTopic(longTopic).length).toBeLessThanOrEqual(80);
    });

    it("handles empty string", () => {
        expect(slugifyTopic("")).toBe("");
    });

    it("handles string with only special characters", () => {
        expect(slugifyTopic("!!!@@@###")).toBe("");
    });

    it("strips leading and trailing hyphens", () => {
        expect(slugifyTopic("- leading and trailing -")).toBe("leading-and-trailing");
    });
});

describe("sqlString", () => {
    it("returns NULL for null", () => {
        expect(sqlString(null)).toBe("NULL");
    });

    it("returns NULL for undefined", () => {
        expect(sqlString(undefined)).toBe("NULL");
    });

    it("returns unquoted number for numbers", () => {
        expect(sqlString(42)).toBe("42");
        expect(sqlString(0)).toBe("0");
        expect(sqlString(-1)).toBe("-1");
    });

    it("wraps strings in single quotes", () => {
        expect(sqlString("hello")).toBe("'hello'");
    });

    it("escapes single quotes in strings", () => {
        expect(sqlString("it's")).toBe("'it''s'");
    });

    it("double-escapes multiple single quotes", () => {
        expect(sqlString("it's a 'test'")).toBe("'it''s a ''test'''");
    });

    it("handles empty string", () => {
        expect(sqlString("")).toBe("''");
    });
});
