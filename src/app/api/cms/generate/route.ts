import { NextResponse } from "next/server";
import { z } from "zod";
import { generateUniqueCmsSlug, upsertCmsArticleDraft } from "@/lib/cms/storage";

function getContentAgentApiBase() {
    const configuredBase = process.env.CONTENT_AGENT_API_BASE ?? process.env.NEXT_PUBLIC_CONTENT_AGENT_API_BASE;

    if (configuredBase) {
        return configuredBase.replace(/\/$/, "");
    }

    if (process.env.NODE_ENV !== "production") {
        return "http://localhost:8000/api";
    }

    throw new Error(
        "CONTENT_AGENT_API_BASE is not configured. Set CONTENT_AGENT_API_BASE to your content agent API base URL.",
    );
}

const generateDraftSchema = z.object({
    topic: z.string().min(3),
    pageType: z.string().min(1),
    goal: z.string().optional(),
    audience: z.string().optional(),
});

type ContentAgentResponse = {
    topic?: string;
    page_type?: string;
    generated_content?: string;
};

function toHeadline(topic: string) {
    return topic.trim();
}

async function requestGeneratedDraft(payload: {
    topic: string;
    pageType: string;
    goal?: string;
    audience?: string;
}) {
    const apiBase = getContentAgentApiBase();

    try {
        return await fetch(`${apiBase}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                topic: payload.topic,
                page_type: payload.pageType,
                goal: payload.goal || undefined,
                audience: payload.audience || undefined,
            }),
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? `Content agent is unreachable at ${apiBase}/generate. ${error.message}`
                : `Content agent is unreachable at ${apiBase}/generate.`;

        throw new Error(message);
    }
}

export async function POST(request: Request) {
    try {
        const payload = generateDraftSchema.parse(await request.json());

        const response = await requestGeneratedDraft(payload);

        if (!response.ok) {
            const fallback = `Generation failed (${response.status})`;
            const errorBody = (await response.json().catch(() => ({}))) as { detail?: string };
            return NextResponse.json({ error: errorBody.detail || fallback }, { status: response.status });
        }

        const generated = (await response.json()) as ContentAgentResponse;
        if (!generated.generated_content) {
            return NextResponse.json({ error: "Content agent returned empty content" }, { status: 502 });
        }

        const slug = await generateUniqueCmsSlug(payload.topic);

        await upsertCmsArticleDraft({
            slug,
            headline: toHeadline(generated.topic || payload.topic),
            content: generated.generated_content,
            format: "generated draft",
            batch: "cms-generated",
            topic: payload.topic,
            goal: payload.goal,
            audience: payload.audience,
            pageType: generated.page_type || payload.pageType,
            note: "Initial generated draft",
        });

        return NextResponse.json({ slug });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0]?.message || "Invalid request" }, { status: 400 });
        }

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to generate CMS draft" },
            { status: 500 },
        );
    }
}