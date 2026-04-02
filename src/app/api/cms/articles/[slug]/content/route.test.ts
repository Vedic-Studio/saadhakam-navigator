import { beforeEach, describe, expect, it, vi } from "vitest";

const saveCmsContent = vi.fn();

vi.mock("@/lib/cms/storage", () => ({
    saveCmsContent,
}));

describe("POST /api/cms/articles/[slug]/content", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns advisory exclusion scan results with saved version", async () => {
        saveCmsContent.mockResolvedValue({
            version: 2,
            filename: "v002.md",
            content: "saved",
            createdAt: new Date().toISOString(),
            note: "updated",
        });

        const { POST } = await import("./route");
        const response = await POST(
            new Request("http://localhost/api/cms/articles/test/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: "Here is the thing: this is essentially a test.", note: "updated" }),
            }),
            { params: Promise.resolve({ slug: "test" }) },
        );
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.version.version).toBe(2);
        expect(body.advisoryScan.passed).toBe(false);
        expect(body.advisoryScan.violations.length).toBeGreaterThan(0);
    });
});