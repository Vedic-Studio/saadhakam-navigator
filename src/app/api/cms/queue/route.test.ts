import { describe, expect, it, vi } from "vitest";

const getCmsQueue = vi.fn();

vi.mock("@/lib/cms/storage", () => ({
    getCmsQueue,
}));

describe("GET /api/cms/queue", () => {
    it("returns queue articles", async () => {
        getCmsQueue.mockResolvedValue([
            {
                slug: "what-is-vedanta",
                headline: "What is Vedanta?",
                batch: "ancient-wisdom",
                format: "long-form article",
                stage: "published",
                wordCount: 2200,
                createdAt: "2026-03-04",
                updatedAt: "2026-03-04",
                published: true,
                sourceKind: "pilot-import",
                hasCmsContent: true,
            },
        ]);

        const { GET } = await import("./route");
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.articles).toHaveLength(1);
        expect(body.articles[0].slug).toBe("what-is-vedanta");
    });

    it("returns a 500 payload when the queue layer fails", async () => {
        getCmsQueue.mockRejectedValue(new Error("Queue unavailable"));

        const { GET } = await import("./route");
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body).toEqual({ error: "Queue unavailable" });
    });
});