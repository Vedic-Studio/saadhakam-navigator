import { beforeEach, describe, expect, it, vi } from "vitest";

const proxyContentAgentJson = vi.fn();

vi.mock("@/lib/content-agent/backend", () => ({
    proxyContentAgentJson,
}));

describe("GET /api/pipelines/[id]", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns validated pipeline detail payload", async () => {
        proxyContentAgentJson.mockResolvedValue({
            ok: true,
            json: async () => ({
                id: "pipeline-1",
                topic: "What is Vedanta",
                page_type: "topic_hub",
                status: "approved",
                revision_count: 1,
                final_score: 8.4,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                description: "An introduction to Vedanta",
                reference_links: [],
                key_angles: [],
                source_notes: null,
                goal: null,
                audience: "seekers",
                context_module: "long_form",
                quality_threshold: 7,
                revision_limit: 2,
                error_message: null,
                outputs: [],
                feedback: [],
            }),
        });

        const { GET } = await import("./route");
        const response = await GET(new Request("http://localhost/api/pipelines/pipeline-1"), {
            params: Promise.resolve({ id: "pipeline-1" }),
        });
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.id).toBe("pipeline-1");
    });

    it("fails closed on detail schema drift", async () => {
        proxyContentAgentJson.mockResolvedValue({
            ok: true,
            json: async () => ({ id: "pipeline-1", topic: "Broken detail" }),
        });

        const { GET } = await import("./route");
        const response = await GET(new Request("http://localhost/api/pipelines/pipeline-1"), {
            params: Promise.resolve({ id: "pipeline-1" }),
        });
        const body = await response.json();

        expect(response.status).toBe(502);
        expect(body.error).toContain("schema validation");
    });
});