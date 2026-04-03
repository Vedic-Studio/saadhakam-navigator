import { beforeEach, describe, expect, it, vi } from "vitest";

const proxyContentAgentJson = vi.fn();

vi.mock("@/lib/content-agent/backend", () => ({
    proxyContentAgentJson,
}));

describe("POST /api/pipelines/[id]/revise", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("proxies revise requests", async () => {
        proxyContentAgentJson.mockResolvedValue({
            status: 202,
            json: async () => ({ ok: true }),
        });

        const body = { notes: "Fix voice", target_dimensions: ["voice_consistency"] };
        const { POST } = await import("./route");
        const response = await POST(new Request("http://localhost/api/pipelines/p-1/revise", {
            method: "POST",
            body: JSON.stringify(body),
        }), {
            params: Promise.resolve({ id: "p-1" }),
        });

        expect(response.status).toBe(202);
        expect(proxyContentAgentJson).toHaveBeenCalledWith(
            "/pipelines/p-1/revise",
            expect.objectContaining({ method: "POST", body: JSON.stringify(body) }),
        );
    });
});