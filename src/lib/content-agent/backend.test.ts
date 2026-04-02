import { afterEach, describe, expect, it, vi } from "vitest";
import { getContentAgentApiBase, isContentAgentConfigured, proxyContentAgentJson } from "./backend";

describe("content-agent backend proxy", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
    });

    it("reports config as unavailable in production when the API base is missing", () => {
        vi.stubEnv("NODE_ENV", "production");
        vi.stubEnv("CONTENT_AGENT_API_BASE", undefined);
        vi.stubEnv("NEXT_PUBLIC_CONTENT_AGENT_API_BASE", undefined);

        expect(isContentAgentConfigured()).toBe(false);
    });

    it("uses localhost fallback in non-production when the API base is missing", () => {
        vi.stubEnv("NODE_ENV", "test");
        vi.stubEnv("CONTENT_AGENT_API_BASE", undefined);
        vi.stubEnv("NEXT_PUBLIC_CONTENT_AGENT_API_BASE", undefined);

        expect(isContentAgentConfigured()).toBe(true);
        expect(getContentAgentApiBase()).toBe("http://localhost:8000/api");
    });

    it("returns a synthetic BACKEND_UNAVAILABLE response when config is missing in production", async () => {
        vi.stubEnv("NODE_ENV", "production");
        vi.stubEnv("CONTENT_AGENT_API_BASE", undefined);
        vi.stubEnv("NEXT_PUBLIC_CONTENT_AGENT_API_BASE", undefined);

        const response = await proxyContentAgentJson("/pipelines");
        const payload = await response.json();

        expect(response.status).toBe(503);
        expect(payload.code).toBe("BACKEND_UNAVAILABLE");
        expect(payload.detail).toContain("CONTENT_AGENT_API_BASE is not configured");
    });

    it("returns a synthetic BACKEND_UNAVAILABLE response when the backend is unreachable", async () => {
        vi.stubEnv("NODE_ENV", "production");
        vi.stubEnv("CONTENT_AGENT_API_BASE", "https://content-agent.opensadhaka.com/api");
        vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("connect ECONNREFUSED"));

        const response = await proxyContentAgentJson("/pipelines");
        const payload = await response.json();

        expect(response.status).toBe(503);
        expect(payload.code).toBe("BACKEND_UNAVAILABLE");
        expect(payload.detail).toContain("Content agent is unreachable");
        expect(payload.detail).toContain("connect ECONNREFUSED");
    });
});