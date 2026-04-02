import { beforeEach, describe, expect, it, vi } from "vitest";

const proxyContentAgentJson = vi.fn();

vi.mock("@/lib/content-agent/backend", () => ({
    proxyContentAgentJson,
}));

describe("GET /api/pipelines", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns validated pipeline list payload", async () => {
        proxyContentAgentJson.mockResolvedValue({
            ok: true,
            json: async () => ({
                pipelines: [
                    {
                        id: "pipeline-1",
                        topic: "What is Vedanta",
                        page_type: "topic_hub",
                        status: "approved",
                        revision_count: 1,
                        final_score: 8.4,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    },
                ],
                total: 1,
            }),
        });

        const { GET } = await import("./route");
        const response = await GET(new Request("http://localhost/api/pipelines"));
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.total).toBe(1);
        expect(body.pipelines[0].id).toBe("pipeline-1");
    });

    it("fails closed on schema drift", async () => {
        proxyContentAgentJson.mockResolvedValue({
            ok: true,
            json: async () => ({ pipelines: [{ id: "broken" }] }),
        });

        const { GET } = await import("./route");
        const response = await GET(new Request("http://localhost/api/pipelines"));
        const body = await response.json();

        expect(response.status).toBe(502);
        expect(body.error).toContain("schema validation");
    });
});