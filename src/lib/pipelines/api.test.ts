import { afterEach, describe, expect, it, vi } from "vitest";
import {
    advancePipeline,
    BackendUnavailableError,
    createPipeline,
    getTechniques,
    listPipelines,
    revisePipeline,
} from "./api";

describe("pipelines api client", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("throws BackendUnavailableError for synthetic backend-unavailable responses", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(
                JSON.stringify({
                    error: "Content agent unavailable",
                    detail: "Content agent is unreachable at https://content-agent.opensadhaka.com/api/pipelines.",
                    code: "BACKEND_UNAVAILABLE",
                }),
                {
                    status: 503,
                    headers: { "Content-Type": "application/json" },
                },
            ),
        );

        const rejection = listPipelines();

        await expect(rejection).rejects.toBeInstanceOf(BackendUnavailableError);
        await expect(rejection).rejects.toMatchObject({ code: "BACKEND_UNAVAILABLE" });
    });

    it("preserves ordinary API errors as generic Error instances", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(JSON.stringify({ error: "Validation failed" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }),
        );

        await expect(createPipeline({ topic: "Vedanta", pageType: "topic_hub" })).rejects.toThrow("Validation failed");
    });

    it("posts richer intake fields on pipeline creation", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(JSON.stringify({ id: "pipeline-1", status: "queued" }), {
                status: 202,
                headers: { "Content-Type": "application/json" },
            }),
        );

        await createPipeline({
            topic: "Vedanta for beginners",
            pageType: "topic_hub",
            description: "Foundational explainer",
            referenceLinks: ["https://example.com/ref-1"],
            keyAngles: ["historical context", "core ideas"],
            sourceNotes: "Prefer primary sources.",
            goal: "clarity",
            audience: "new seekers",
            qualityThreshold: 7,
            revisionLimit: 3,
        });

        expect(fetchSpy).toHaveBeenCalledWith(
            "/api/pipelines",
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({
                    topic: "Vedanta for beginners",
                    page_type: "topic_hub",
                    description: "Foundational explainer",
                    reference_links: ["https://example.com/ref-1"],
                    key_angles: ["historical context", "core ideas"],
                    source_notes: "Prefer primary sources.",
                    goal: "clarity",
                    audience: "new seekers",
                    quality_threshold: 7,
                    revision_limit: 3,
                }),
            }),
        );
    });

    it("returns parsed successful payloads", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(
                JSON.stringify({
                    techniques: [{ source: "Upanishads", type: "scripture", text: "Tat tvam asi" }],
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                },
            ),
        );

        await expect(getTechniques()).resolves.toEqual([
            { source: "Upanishads", type: "scripture", text: "Tat tvam asi" },
        ]);
    });

    it("posts advance payloads to the pipeline action endpoint", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(JSON.stringify({ id: "pipeline-1", status: "draft_review" }), {
                status: 202,
                headers: { "Content-Type": "application/json" },
            }),
        );

        await advancePipeline("pipeline-1", { notes: "Move ahead" });

        expect(fetchSpy).toHaveBeenCalledWith(
            "/api/pipelines/pipeline-1/advance",
            expect.objectContaining({ method: "POST" }),
        );
    });

    it("posts revise payloads with target dimensions", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(JSON.stringify({ id: "pipeline-1", status: "draft_review" }), {
                status: 202,
                headers: { "Content-Type": "application/json" },
            }),
        );

        await revisePipeline("pipeline-1", { notes: "Tighten voice", targetDimensions: ["voice_consistency"] });

        expect(fetchSpy).toHaveBeenCalledWith(
            "/api/pipelines/pipeline-1/revise",
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({ notes: "Tighten voice", target_dimensions: ["voice_consistency"] }),
            }),
        );
    });
});