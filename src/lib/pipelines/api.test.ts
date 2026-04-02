import { afterEach, describe, expect, it, vi } from "vitest";
import { BackendUnavailableError, createPipeline, getTechniques, listPipelines } from "./api";

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
});