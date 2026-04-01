import { beforeEach, describe, expect, it, vi } from "vitest";

const submitCmsReview = vi.fn();

vi.mock("@/lib/cms/storage", () => ({
    submitCmsReview,
}));

describe("POST /api/cms/articles/[slug]/review", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("forwards approval review actions without publishing", async () => {
        submitCmsReview.mockResolvedValue({
            action: "approve",
            comment: "Looks good",
            version: 2,
            createdAt: new Date().toISOString(),
        });

        const { POST } = await import("./route");
        const response = await POST(
            new Request("http://localhost/api/cms/articles/test/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "approve", comment: "Looks good" }),
            }),
            { params: Promise.resolve({ slug: "test" }) },
        );
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(submitCmsReview).toHaveBeenCalledWith("test", "approve", "Looks good");
        expect(body.review.action).toBe("approve");
    });
});