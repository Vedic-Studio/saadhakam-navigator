import { beforeEach, describe, expect, it, vi } from "vitest";

const proxyContentAgentJson = vi.fn();

const articleStore = new Map<string, { slug: string; content: string; version: number; headline: string; pipelineId?: string }>();
const pipelineLinkStore = new Map<string, string>();

vi.mock("@/lib/content-agent/backend", () => ({
    proxyContentAgentJson,
}));

vi.mock("@/lib/cms/storage", () => ({
    findCmsArticleSlugByPipelineId: vi.fn(async (pipelineId: string) => pipelineLinkStore.get(pipelineId) || null),
    generateUniqueCmsSlug: vi.fn(async (topic: string) => topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")),
    getCmsArticleDetail: vi.fn(async (slug: string) => {
        const article = articleStore.get(slug);
        if (!article) return null;
        return {
            article: {
                slug,
                headline: article.headline,
                batch: "pipeline-long_form",
                format: "pipeline draft",
                stage: "review",
                wordCount: article.content.split(/\s+/).filter(Boolean).length,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                published: false,
                sourceKind: "api-pipeline",
                hasCmsContent: true,
                canPublish: false,
                intake: { pipelineId: article.pipelineId },
            },
            meta: undefined,
            content: article.content,
            versions: [{ version: article.version, filename: `v${String(article.version).padStart(3, "0")}.md`, content: article.content, createdAt: new Date().toISOString() }],
            reviews: [],
            score: null,
            migrationState: "cms-native",
        };
    }),
    upsertCmsArticleDraft: vi.fn(async (params: { slug: string; content: string; headline: string; pipelineId?: string }) => {
        const current = articleStore.get(params.slug);
        const version = (current?.version || 0) + 1;
        articleStore.set(params.slug, {
            slug: params.slug,
            content: params.content,
            version,
            headline: params.headline,
            pipelineId: params.pipelineId,
        });
        if (params.pipelineId) {
            pipelineLinkStore.set(params.pipelineId, params.slug);
        }
        return { slug: params.slug, version: { version } };
    }),
}));

describe("pipeline approval → materialize → CMS detail integration", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        articleStore.clear();
        pipelineLinkStore.clear();
    });

    it("materializes an approved pipeline into retrievable CMS state", async () => {
        proxyContentAgentJson.mockResolvedValue({
            ok: true,
            json: async () => ({
                id: "pipeline-1",
                topic: "What is Vedanta",
                page_type: "topic_hub",
                status: "approved",
                revision_count: 1,
                final_score: 8.9,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                description: "An introduction to Vedanta",
                reference_links: [],
                key_angles: [],
                source_notes: null,
                goal: "Explain basics",
                audience: "seekers",
                context_module: "long_form",
                quality_threshold: 7,
                revision_limit: 2,
                error_message: null,
                outputs: [
                    {
                        id: "out-2",
                        version: 2,
                        stage: "final",
                        agent: "editor",
                        content: "# What is Vedanta\n\nVedanta is a school of inquiry.",
                        revision_notes: null,
                        scorecard_json: null,
                        created_at: new Date().toISOString(),
                    },
                ],
                feedback: [],
            }),
        });

        const { POST } = await import("./[id]/materialize/route");
        const materializeResponse = await POST(new Request("http://localhost/api/pipelines/pipeline-1/materialize", { method: "POST" }), {
            params: Promise.resolve({ id: "pipeline-1" }),
        });
        const materialized = await materializeResponse.json();

        expect(materializeResponse.status).toBe(200);
        expect(materialized.slug).toBe("what-is-vedanta");

        const { GET } = await import("../cms/articles/[slug]/route");
        const cmsResponse = await GET(new Request(`http://localhost/api/cms/articles/${materialized.slug}`), {
            params: Promise.resolve({ slug: materialized.slug }),
        });
        const cmsBody = await cmsResponse.json();

        expect(cmsResponse.status).toBe(200);
        expect(cmsBody.article.slug).toBe("what-is-vedanta");
        expect(cmsBody.content).toContain("Vedanta is a school of inquiry");
        expect(cmsBody.article.intake.pipelineId).toBe("pipeline-1");
    });
});