import { beforeEach, describe, expect, it, vi } from "vitest";

const setCmsPublished = vi.fn();

vi.mock("@/lib/cms/storage", () => ({
    setCmsPublished,
}));

describe("POST /api/cms/articles/[slug]/publish", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("toggles published state via storage", async () => {
        const { POST } = await import("./route");
        const response = await POST(
            new Request("http://localhost/api/cms/articles/test/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: true }),
            }),
            { params: Promise.resolve({ slug: "test" }) },
        );
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(setCmsPublished).toHaveBeenCalledWith("test", true);
        expect(body).toEqual({ ok: true });
    });

    it("returns 422 when the article is not eligible for publication", async () => {
        setCmsPublished.mockRejectedValue(new Error("Only approved articles on known public routes can be published"));

        const { POST } = await import("./route");
        const response = await POST(
            new Request("http://localhost/api/cms/articles/test/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: true }),
            }),
            { params: Promise.resolve({ slug: "test" }) },
        );
        const body = await response.json();

        expect(response.status).toBe(422);
        expect(body).toEqual({ error: "Only approved articles on known public routes can be published" });
    });

    it("returns 422 when CMS-native drafts try to publish without route support", async () => {
        setCmsPublished.mockRejectedValue(new Error("Publishing is disabled for CMS-native drafts until public route support is added"));

        const { POST } = await import("./route");
        const response = await POST(
            new Request("http://localhost/api/cms/articles/test/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: true }),
            }),
            { params: Promise.resolve({ slug: "test" }) },
        );
        const body = await response.json();

        expect(response.status).toBe(422);
        expect(body).toEqual({ error: "Publishing is disabled for CMS-native drafts until public route support is added" });
    });
});