import { beforeEach, describe, expect, it, vi } from "vitest";

const readFileSyncMock = vi.fn();
const createSignMock = vi.fn();

vi.mock("node:fs", async (importOriginal) => {
    const actual = await importOriginal<typeof import("node:fs")>();
    return {
        ...actual,
        default: {
            ...((actual as { default?: object }).default ?? {}),
            readFileSync: readFileSyncMock,
        },
        readFileSync: readFileSyncMock,
    };
});

vi.mock("node:crypto", async (importOriginal) => {
    const actual = await importOriginal<typeof import("node:crypto")>();
    return {
        ...actual,
        default: {
            ...((actual as { default?: object }).default ?? {}),
            createSign: createSignMock,
        },
        createSign: createSignMock,
    };
});

describe("google-auth", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        delete process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
        delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
        global.fetch = vi.fn();

        createSignMock.mockReturnValue({
            update: vi.fn(),
            end: vi.fn(),
            sign: vi.fn(() => "signed.jwt"),
        });
    });

    it("uses GOOGLE_SERVICE_ACCOUNT_FILE when provided", async () => {
        process.env.GOOGLE_SERVICE_ACCOUNT_FILE = "/tmp/custom-service-account.json";
        const mod = await import("@/lib/google-auth");

        expect(mod.resolveGoogleServiceAccountFile()).toBe("/tmp/custom-service-account.json");
    });

    it("falls back to .data/google-service-account.json when env var is absent", async () => {
        const mod = await import("@/lib/google-auth");

        expect(mod.resolveGoogleServiceAccountFile()).toContain(".data/google-service-account.json");
    });

    it("prefers GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 over file-based loading", async () => {
        process.env.GOOGLE_SERVICE_ACCOUNT_FILE = "/tmp/custom-service-account.json";
        process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 = Buffer.from(
            JSON.stringify({
                client_email: "env-svc@example.com",
                private_key: "-----BEGIN PRIVATE KEY-----\nenv\n-----END PRIVATE KEY-----",
            }),
        ).toString("base64");

        const mod = await import("@/lib/google-auth");

        expect(mod.readGoogleServiceAccountKey()).toEqual({
            client_email: "env-svc@example.com",
            private_key: "-----BEGIN PRIVATE KEY-----\nenv\n-----END PRIVATE KEY-----",
        });
        expect(readFileSyncMock).not.toHaveBeenCalled();
    });

    it("throws a helpful error when GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is invalid", async () => {
        process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 = "not-json";

        const mod = await import("@/lib/google-auth");

        expect(() => mod.readGoogleServiceAccountKey()).toThrow(
            "Failed to read Google service account key from GOOGLE_SERVICE_ACCOUNT_JSON_BASE64",
        );
        expect(readFileSyncMock).not.toHaveBeenCalled();
    });

    it("falls back to file-based loading when GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is absent", async () => {
        readFileSyncMock.mockReturnValue(
            JSON.stringify({
                client_email: "file-svc@example.com",
                private_key: "-----BEGIN PRIVATE KEY-----\nfile\n-----END PRIVATE KEY-----",
            }),
        );

        const mod = await import("@/lib/google-auth");

        expect(mod.readGoogleServiceAccountKey()).toEqual({
            client_email: "file-svc@example.com",
            private_key: "-----BEGIN PRIVATE KEY-----\nfile\n-----END PRIVATE KEY-----",
        });
        expect(readFileSyncMock).toHaveBeenCalledTimes(1);
    });

    it("exchanges a signed JWT for an access token", async () => {
        readFileSyncMock.mockReturnValue(
            JSON.stringify({
                client_email: "svc@example.com",
                private_key: "-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----",
            }),
        );

        vi.mocked(global.fetch).mockResolvedValue(
            new Response(JSON.stringify({ access_token: "token-123", expires_in: 3600 }), { status: 200 }),
        );

        const { getGoogleAccessToken } = await import("@/lib/google-auth");
        const token = await getGoogleAccessToken([
            "https://www.googleapis.com/auth/webmasters.readonly",
        ]);

        expect(token).toBe("token-123");
        expect(readFileSyncMock).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            "https://oauth2.googleapis.com/token",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }),
        );
    });

    it("throws a helpful error when token exchange fails", async () => {
        readFileSyncMock.mockReturnValue(
            JSON.stringify({
                client_email: "svc@example.com",
                private_key: "-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----",
            }),
        );

        vi.mocked(global.fetch).mockResolvedValue(new Response("bad request", { status: 400 }));

        const { getGoogleAccessToken } = await import("@/lib/google-auth");

        await expect(
            getGoogleAccessToken(["https://www.googleapis.com/auth/webmasters.readonly"]),
        ).rejects.toThrow("Google token exchange failed (400)");
    });

    it("throws a helpful error when env-provided JSON is missing required fields", async () => {
        process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 = Buffer.from(
            JSON.stringify({ client_email: "svc@example.com" }),
        ).toString("base64");

        const mod = await import("@/lib/google-auth");

        expect(() => mod.readGoogleServiceAccountKey()).toThrow(
            "Service account key from GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is missing client_email or private_key",
        );
    });
});