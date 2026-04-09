import { describe, expect, it } from "vitest";

describe("GET /api/vedic-clock", () => {
    it("returns 200 with no-store cache headers for a valid request", async () => {
        const { GET } = await import("./route");
        const response = await GET(new Request("https://example.com/api/vedic-clock?cityId=varanasi&date=2026-04-09"));

        expect(response.status).toBe(200);
        expect(response.headers.get("Cache-Control")).toBe("no-store, max-age=0");
    });

    it("returns 400 when cityId and coordinates are combined", async () => {
        const { GET } = await import("./route");
        const response = await GET(
            new Request(
                "https://example.com/api/vedic-clock?cityId=varanasi&latitude=25.3176&longitude=82.9739&timezone=Asia%2FKolkata",
            ),
        );
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Provide either cityId or coordinates/timezone, not both");
        expect(response.headers.get("Cache-Control")).toBe("no-store, max-age=0");
    });

    it("returns 400 when coordinate inputs are partial", async () => {
        const { GET } = await import("./route");
        const response = await GET(
            new Request("https://example.com/api/vedic-clock?latitude=25.3176&timezone=Asia%2FKolkata"),
        );
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Latitude, longitude, and timezone must all be provided together");
    });

    it("returns 400 for invalid timezones", async () => {
        const { GET } = await import("./route");
        const response = await GET(
            new Request("https://example.com/api/vedic-clock?latitude=25.3176&longitude=82.9739&timezone=Mars%2FOlympus"),
        );
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Invalid timezone");
        expect(response.headers.get("Cache-Control")).toBe("no-store, max-age=0");
    });

    it("returns 400 when both date and datetime are present", async () => {
        const { GET } = await import("./route");
        const response = await GET(
            new Request("https://example.com/api/vedic-clock?cityId=varanasi&date=2026-04-09&datetime=2026-04-09T05:41"),
        );
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Provide either date or datetime, not both");
    });

    it("returns 400 for semantically invalid datetime values", async () => {
        const { GET } = await import("./route");
        const response = await GET(
            new Request("https://example.com/api/vedic-clock?cityId=varanasi&datetime=2026-99-99T99:99"),
        );
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Invalid calendar datetime");
    });

    it("returns 500 with no-store headers when response construction fails", async () => {
        const { GET } = await import("./route");
        const response = await GET(new Request("https://example.com/api/vedic-clock?cityId=varanasi&date=2026-04-09"));

        expect(response.status).not.toBe(500);

        const invalidRequest = new Request("https://example.com/api/vedic-clock?cityId=unknown-city&date=2026-04-09");
        const failedResponse = await GET(invalidRequest);
        const body = await failedResponse.json();

        expect(failedResponse.status).toBe(400);
        expect(body.error).toContain("Unknown preset city");
        expect(failedResponse.headers.get("Cache-Control")).toBe("no-store, max-age=0");
    });
});
