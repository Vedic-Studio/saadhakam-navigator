import type { CmsArticleDetail, CmsReview, CmsVersion } from "./types";

export type CmsGenerateDraftInput = {
    topic: string;
    pageType: string;
    goal?: string;
    audience?: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || "Request failed");
    }
    return response.json() as Promise<T>;
}

export async function getQueue() {
    const response = await fetch("/api/cms/queue", { cache: "no-store" });
    return parseResponse<{ articles: CmsArticleDetail["article"][] }>(response).then((data) => data.articles);
}

export async function getArticleDetail(slug: string) {
    const response = await fetch(`/api/cms/articles/${slug}`, { cache: "no-store" });
    return parseResponse<CmsArticleDetail>(response);
}

export async function saveContent(slug: string, content: string, note?: string) {
    const response = await fetch(`/api/cms/articles/${slug}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, note }),
    });
    return parseResponse<{ version: CmsVersion }>(response).then((data) => data.version);
}

export async function submitReview(slug: string, action: CmsReview["action"], comment: string) {
    const response = await fetch(`/api/cms/articles/${slug}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, comment }),
    });
    return parseResponse<{ review: CmsReview }>(response).then((data) => data.review);
}

export async function setPublished(slug: string, published: boolean) {
    const response = await fetch(`/api/cms/articles/${slug}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
    });
    return parseResponse<{ ok: true }>(response);
}

export async function generateDraft(input: CmsGenerateDraftInput) {
    const response = await fetch("/api/cms/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    return parseResponse<{ slug: string }>(response);
}