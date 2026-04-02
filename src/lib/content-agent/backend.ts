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
    const apiBase = getContentAgentApiBase();

    try {
        return await fetch(`${apiBase}${path.startsWith("/") ? path : `/${path}`}`, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                ...(init?.headers ?? {}),
            },
            cache: "no-store",
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? `Content agent is unreachable at ${apiBase}${path}. ${error.message}`
                : `Content agent is unreachable at ${apiBase}${path}.`;

        throw new Error(message);
    }
}