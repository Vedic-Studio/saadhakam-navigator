import { createHmac } from "crypto";

const TOKEN_PREFIX = "st_";

type StatelessResultPayload = {
    createdAt: string;
    result: unknown;
};

function getTokenSecret() {
    return process.env.FAITH_FINDER_RESULT_TOKEN_SECRET || "dev-faith-finder-secret";
}

function base64UrlEncode(input: string) {
    return Buffer.from(input, "utf8").toString("base64url");
}

function base64UrlDecode(input: string) {
    return Buffer.from(input, "base64url").toString("utf8");
}

function sign(payloadB64: string) {
    return createHmac("sha256", getTokenSecret()).update(payloadB64).digest("base64url");
}

export function createStatelessFaithFinderResultId(result: unknown, createdAt = new Date().toISOString()) {
    const payload: StatelessResultPayload = { createdAt, result };
    const payloadB64 = base64UrlEncode(JSON.stringify(payload));
    const signature = sign(payloadB64);
    return `${TOKEN_PREFIX}${payloadB64}.${signature}`;
}

export function parseStatelessFaithFinderResultId(id: string): StatelessResultPayload | null {
    if (!id.startsWith(TOKEN_PREFIX)) return null;

    const raw = id.slice(TOKEN_PREFIX.length);
    const [payloadB64, signature] = raw.split(".");
    if (!payloadB64 || !signature) return null;

    const expected = sign(payloadB64);
    if (signature !== expected) return null;

    try {
        const json = base64UrlDecode(payloadB64);
        const parsed = JSON.parse(json) as StatelessResultPayload;

        if (!parsed || typeof parsed !== "object") return null;
        if (typeof parsed.createdAt !== "string") return null;

        return parsed;
    } catch {
        return null;
    }
}
