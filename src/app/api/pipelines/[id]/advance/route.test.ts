import { beforeEach, describe, expect, it, vi } from "vitest";

const proxyContentAgentJson = vi.fn();

vi.mock("@/lib/content-agent/backend", () => ({
    proxyContentAgentJson,
}));

describe("POST /api/pipelines/[id]/advance", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("proxies advance requests", async () => {
        proxyContentAgentJson.mockResolvedValue({
            status: 202,
            json: async () => ({ ok: true }),
        });

        const { POST } = await import("./route");
        const response = await POST(new Request("http://localhost/api/pipelines/p-1/advance", {
            method: "POST",
            body: JSON.stringify({ notes: "Proceed" }),
        }), {
            params: Promise.resolve({ id: "p-1" }),
        });

        expect(response.status).toBe(202);
        expect(proxyContentAgentJson).toHaveBeenCalledWith(
            "/pipelines/p-1/advance",
            expect.objectContaining({ method: "POST", body: JSON.stringify({ notes: "Proceed" }) }),
        );
    });
});