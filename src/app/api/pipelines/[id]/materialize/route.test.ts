import { beforeEach, describe, expect, it, vi } from "vitest";

const findCmsArticleSlugByPipelineId = vi.fn();
const generateUniqueCmsSlug = vi.fn();
const getCmsArticleDetail = vi.fn();
const upsertCmsArticleDraft = vi.fn();
const proxyContentAgentJson = vi.fn();

vi.mock("@/lib/cms/storage", () => ({
    findCmsArticleSlugByPipelineId,
    generateUniqueCmsSlug,
    getCmsArticleDetail,
    upsertCmsArticleDraft,
}));

vi.mock("@/lib/content-agent/backend", () => ({
    proxyContentAgentJson,
}));

describe("POST /api/pipelines/[id]/materialize", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("materializes the explicit final artifact when present", async () => {
        proxyContentAgentJson.mockResolvedValue({
            ok: true,
            json: async () => ({
                id: "pipeline-1",
                topic: "What is Vedanta",
                page_type: "topic_hub",
                status: "approved",
                revision_count: 1,
                description: "An introduction to Vedanta",
                reference_links: [],
                key_angles: [],
                source_notes: null,
                quality_threshold: 7,
                revision_limit: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                outputs: [
                    {
                        id: "out-1",
                        version: 1,
                        stage: "writer_draft",
                        agent: "writer",
                        content: "writer draft",
                        revision_notes: null,
                        scorecard_json: null,
                        created_at: new Date().toISOString(),
                    },
                    {
                        id: "out-2",
                        version: 2,
                        stage: "final",
                        agent: "editor",
                        content: "approved final",
                        revision_notes: null,
                        scorecard_json: null,
                        created_at: new Date().toISOString(),
                    },
                ],
                feedback: [],
            }),
        });
        findCmsArticleSlugByPipelineId.mockResolvedValue(null);
        generateUniqueCmsSlug.mockResolvedValue("what-is-vedanta");
        upsertCmsArticleDraft.mockResolvedValue({
            slug: "what-is-vedanta",
            version: { version: 3 },
        });

        const { POST } = await import("./route");
        const response = await POST(new Request("http://localhost/api/pipelines/pipeline-1/materialize", { method: "POST" }), {
            params: Promise.resolve({ id: "pipeline-1" }),
        });
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(upsertCmsArticleDraft).toHaveBeenCalledWith(expect.objectContaining({
            content: "approved final",
            note: "Materialized from pipeline pipeline-1 (final)",
        }));
        expect(body).toEqual({ slug: "what-is-vedanta", version: 3, existing: false });
    });

    it("returns an existing linked slug without rematerializing", async () => {
        proxyContentAgentJson.mockResolvedValue({
            ok: true,
            json: async () => ({
                id: "pipeline-1",
                topic: "What is Vedanta",
                page_type: "topic_hub",
                status: "approved",
                revision_count: 1,
                description: "An introduction to Vedanta",
                reference_links: [],
                key_angles: [],
                source_notes: null,
                quality_threshold: 7,
                revision_limit: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                outputs: [{ id: "out-1", version: 1, stage: "writer_draft", agent: "writer", content: "draft", revision_notes: null, scorecard_json: null, created_at: new Date().toISOString() }],
                feedback: [],
            }),
        });
        findCmsArticleSlugByPipelineId.mockResolvedValue("what-is-vedanta");
        getCmsArticleDetail.mockResolvedValue({ versions: [{ version: 4 }] });

        const { POST } = await import("./route");
        const response = await POST(new Request("http://localhost/api/pipelines/pipeline-1/materialize", { method: "POST" }), {
            params: Promise.resolve({ id: "pipeline-1" }),
        });
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(upsertCmsArticleDraft).not.toHaveBeenCalled();
        expect(body).toEqual({ slug: "what-is-vedanta", version: 4, existing: true });
    });

    it("rejects materialization when the pipeline is not approved", async () => {
        proxyContentAgentJson.mockResolvedValue({
            ok: true,
            json: async () => ({
                id: "pipeline-1",
                topic: "What is Vedanta",
                page_type: "topic_hub",
                status: "needs_review",
                revision_count: 1,
                description: "An introduction to Vedanta",
                reference_links: [],
                key_angles: [],
                source_notes: null,
                quality_threshold: 7,
                revision_limit: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                outputs: [
                    {
                        id: "out-1",
                        version: 1,
                        stage: "writer_draft",
                        agent: "writer",
                        content: "writer draft",
                        revision_notes: null,
                        scorecard_json: null,
                        created_at: new Date().toISOString(),
                    },
                ],
                feedback: [],
            }),
        });

        const { POST } = await import("./route");
        const response = await POST(new Request("http://localhost/api/pipelines/pipeline-1/materialize", { method: "POST" }), {
            params: Promise.resolve({ id: "pipeline-1" }),
        });
        const body = await response.json();

        expect(response.status).toBe(422);
        expect(upsertCmsArticleDraft).not.toHaveBeenCalled();
        expect(body).toEqual({
            error: "Pipeline must be approved before CMS materialization. Current status: needs_review",
        });
    });
});