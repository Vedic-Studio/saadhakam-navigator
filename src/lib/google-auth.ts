import "server-only";

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createSign } from "node:crypto";

type ServiceAccountKey = {
    client_email: string;
    private_key: string;
};

type CachedToken = {
    accessToken: string;
    expiresAt: number;
};

const DEFAULT_SERVICE_ACCOUNT_PATH = resolve(process.cwd(), ".data", "google-service-account.json");
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const tokenCache = new Map<string, CachedToken>();
const GOOGLE_SERVICE_ACCOUNT_JSON_BASE64_ENV = "GOOGLE_SERVICE_ACCOUNT_JSON_BASE64";

export function resolveGoogleServiceAccountFile() {
    return process.env.GOOGLE_SERVICE_ACCOUNT_FILE || DEFAULT_SERVICE_ACCOUNT_PATH;
}

function normalizeServiceAccountKey(parsed: Partial<ServiceAccountKey>, sourceLabel: string): ServiceAccountKey {
    if (!parsed.client_email || !parsed.private_key) {
        throw new Error(`Service account key from ${sourceLabel} is missing client_email or private_key`);
    }

    return {
        client_email: parsed.client_email,
        private_key: parsed.private_key,
    };
}

function readGoogleServiceAccountKeyFromEnv(): ServiceAccountKey | null {
    const encoded = process.env[GOOGLE_SERVICE_ACCOUNT_JSON_BASE64_ENV]?.trim();
    if (!encoded) return null;

    try {
        const raw = Buffer.from(encoded, "base64").toString("utf-8");
        if (!raw.trim()) {
            throw new Error("decoded value was empty");
        }

        const parsed = JSON.parse(raw) as Partial<ServiceAccountKey>;
        return normalizeServiceAccountKey(parsed, GOOGLE_SERVICE_ACCOUNT_JSON_BASE64_ENV);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to read Google service account key from ${GOOGLE_SERVICE_ACCOUNT_JSON_BASE64_ENV}: ${message}`,
        );
    }
}

export function readGoogleServiceAccountKey(filePath = resolveGoogleServiceAccountFile()): ServiceAccountKey {
    const envKey = readGoogleServiceAccountKeyFromEnv();
    if (envKey) {
        return envKey;
    }

    try {
        const raw = readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw) as Partial<ServiceAccountKey>;
        return normalizeServiceAccountKey(parsed, filePath);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to read Google service account key from ${filePath}: ${message}`);
    }
}

function buildSignedJwt(keyData: ServiceAccountKey, scopes: string[]) {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
        iss: keyData.client_email,
        scope: scopes.join(" "),
        aud: GOOGLE_TOKEN_URL,
        iat: now,
        exp: now + 3600,
    };

    const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
    const unsignedJwt = `${encode(header)}.${encode(payload)}`;
    const signer = createSign("RSA-SHA256");
    signer.update(unsignedJwt);
    signer.end();

    return `${unsignedJwt}.${signer.sign(keyData.private_key, "base64url")}`;
}

export async function getGoogleAccessToken(scopes: string[]) {
    if (!Array.isArray(scopes) || scopes.length === 0) {
        throw new Error("getGoogleAccessToken requires at least one scope");
    }

    const normalizedScopes = [...new Set(scopes)].sort();
    const cacheKey = normalizedScopes.join(" ");
    const cached = tokenCache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now() + 60_000) {
        return cached.accessToken;
    }

    const keyData = readGoogleServiceAccountKey();
    const assertion = buildSignedJwt(keyData, normalizedScopes);
    const body = new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
    });

    const response = await fetch(GOOGLE_TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
        cache: "no-store",
    });

    const text = await response.text();
    if (!response.ok) {
        throw new Error(`Google token exchange failed (${response.status}): ${text}`);
    }

    const data = JSON.parse(text) as { access_token?: string; expires_in?: number };
    if (!data.access_token) {
        throw new Error("Google token exchange succeeded but no access_token was returned");
    }

    tokenCache.set(cacheKey, {
        accessToken: data.access_token,
        expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
    });

    return data.access_token;
}