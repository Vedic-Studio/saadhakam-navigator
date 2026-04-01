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

const STOTRA_DOC_REGISTRY: EditorialDoc[] = [
    {
        id: "stotra-skill-spec",
        title: "Stotra skill spec",
        path: "docs/agents/01-stotra-content.md",
        summary: "Structured stotra content schema, analysis requirements, and quality checklist.",
        category: "skill-spec",
    },
    {
        id: "seo-indexing-spec",
        title: "SEO / indexing spec",
        path: "docs/agents/04-seo-indexing.md",
        summary: "Search visibility, indexing, and on-page optimization constraints.",
        category: "seo-spec",
    },
];

const PSEO_DOC_REGISTRY: EditorialDoc[] = [
    {
        id: "pseo-skill-spec",
        title: "Programmatic SEO spec",
        path: "docs/agents/06-pseo-pages.md",
        summary: "Programmatic SEO route, schema, and LLM-ingestion requirements for scalable pages.",
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

export const CONTEXT_PACK_DOCS: Record<string, EditorialDoc[]> = {
    long_form: EDITORIAL_DOC_REGISTRY,
    sacred_text: [EDITORIAL_DOC_REGISTRY[0], ...STOTRA_DOC_REGISTRY],
    pseo: PSEO_DOC_REGISTRY,
};

export function getContextPackDocs(contextModule?: string | null) {
    if (contextModule && CONTEXT_PACK_DOCS[contextModule]) {
        return CONTEXT_PACK_DOCS[contextModule];
    }
    return EDITORIAL_DOC_REGISTRY;
}