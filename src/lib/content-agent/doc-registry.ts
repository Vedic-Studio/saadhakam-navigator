export type EditorialDoc = {
    id: string;
    title: string;
    path: string;
    summary: string;
    category: "skill-spec" | "seo-spec" | "operating-model";
};

export const EDITORIAL_DOC_REGISTRY: EditorialDoc[] = [
    {
        id: "article-skill-spec",
        title: "Article skill spec",
        path: "docs/agents/02-article-content.md",
        summary: "Core long-form article generation brief and quality requirements.",
        category: "skill-spec",
    },
    {
        id: "seo-indexing-spec",
        title: "SEO / indexing spec",
        path: "docs/agents/04-seo-indexing.md",
        summary: "Search visibility, indexing, and on-page optimization constraints.",
        category: "seo-spec",
    },
    {
        id: "editorial-queue-model",
        title: "Editorial queue operating model",
        path: "docs/handover/2026-04-01-phase3-editorial-queues.md",
        summary: "Reference for queue, review, and publishing operations in the editorial desk.",
        category: "operating-model",
    },
];

export function getContextPackDocs(contextModule?: string | null) {
    if (contextModule === "long_form") {
        return EDITORIAL_DOC_REGISTRY;
    }

    return EDITORIAL_DOC_REGISTRY;
}