const BACKEND_UNAVAILABLE_STATUS = 503;
const BACKEND_UNAVAILABLE_CODE = "BACKEND_UNAVAILABLE";

function createBackendUnavailableResponse(detail: string) {
    return new Response(
        JSON.stringify({
            error: "Content agent unavailable",
            detail,
            code: BACKEND_UNAVAILABLE_CODE,
        }),
        {
            status: BACKEND_UNAVAILABLE_STATUS,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
}

export function isContentAgentConfigured() {
    return Boolean(process.env.CONTENT_AGENT_API_BASE ?? process.env.NEXT_PUBLIC_CONTENT_AGENT_API_BASE) || process.env.NODE_ENV !== "production";
}

export function getContentAgentApiBase() {
    const configuredBase = process.env.CONTENT_AGENT_API_BASE ?? process.env.NEXT_PUBLIC_CONTENT_AGENT_API_BASE;

    if (configuredBase) {
        return configuredBase.replace(/\/$/, "");
    }

    if (process.env.NODE_ENV !== "production") {
        return "http://localhost:8000/api";
    }

    throw new Error(
        "CONTENT_AGENT_API_BASE is not configured. Set CONTENT_AGENT_API_BASE to your content agent API base URL (production: https://content-agent.opensadhaka.com/api).",
    );
}

export async function proxyContentAgentJson(path: string, init?: RequestInit) {
    if (!isContentAgentConfigured()) {
        return createBackendUnavailableResponse(
            "CONTENT_AGENT_API_BASE is not configured. Set CONTENT_AGENT_API_BASE to your content agent API base URL (production: https://content-agent.opensadhaka.com/api).",
        );
    }

    const apiBase = getContentAgentApiBase();
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    try {
        return await fetch(`${apiBase}${normalizedPath}`, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                ...(init?.headers ?? {}),
            },
            cache: "no-store",
        });
    } catch (error) {
        const detail =
            error instanceof Error
                ? `Content agent is unreachable at ${apiBase}${normalizedPath}. ${error.message}`
                : `Content agent is unreachable at ${apiBase}${normalizedPath}.`;

        return createBackendUnavailableResponse(detail);
    }
}