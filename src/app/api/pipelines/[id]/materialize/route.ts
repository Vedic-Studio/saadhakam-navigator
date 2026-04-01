import { NextResponse } from "next/server";
import { findCmsArticleSlugByPipelineId, generateUniqueCmsSlug, getCmsArticleDetail, upsertCmsArticleDraft } from "@/lib/cms/storage";
import { proxyContentAgentJson } from "@/lib/content-agent/backend";
import { canMaterializePipeline, getApprovedPipelineArtifact, type PipelineDetail } from "@/lib/pipelines/types";

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const response = await proxyContentAgentJson(`/pipelines/${id}`);
        const pipeline = (await response.json()) as PipelineDetail;

        if (!response.ok) {
            return NextResponse.json(
                { error: (pipeline as { detail?: string }).detail || "Failed to load pipeline detail" },
                { status: response.status },
            );
        }

        if (!canMaterializePipeline(pipeline)) {
            return NextResponse.json(
                {
                    error: pipeline.error_message
                        ? "Failed pipelines cannot be materialized into CMS drafts"
                        : `Pipeline must be approved before CMS materialization. Current status: ${pipeline.status}`,
                },
                { status: 422 },
            );
        }

        const artifact = getApprovedPipelineArtifact(pipeline.outputs);
        if (!artifact?.output.content) {
            return NextResponse.json({ error: "Pipeline has no approved artifact to materialize" }, { status: 422 });
        }

        const existingSlug = await findCmsArticleSlugByPipelineId(pipeline.id);
        if (existingSlug) {
            const existingDetail = await getCmsArticleDetail(existingSlug);
            if (!existingDetail) {
                return NextResponse.json(
                    { error: `Pipeline ${pipeline.id} is already linked to missing CMS draft '${existingSlug}'` },
                    { status: 409 },
                );
            }

            return NextResponse.json({
                slug: existingSlug,
                version: existingDetail.versions[existingDetail.versions.length - 1]?.version || 0,
                existing: true,
            });
        }

        const slug = await generateUniqueCmsSlug(pipeline.topic);
        const result = await upsertCmsArticleDraft({
            slug,
            headline: pipeline.topic,
            content: artifact.output.content,
            format: "pipeline draft",
            batch: `pipeline-${pipeline.context_module || "default"}`,
            topic: pipeline.topic,
            goal: pipeline.goal || undefined,
            audience: pipeline.audience || undefined,
            pageType: pipeline.page_type,
            note: `Materialized from pipeline ${pipeline.id} (${artifact.stage})`,
            pipelineId: pipeline.id,
            contextModule: pipeline.context_module || undefined,
            qualityThreshold: pipeline.quality_threshold,
            finalScore: pipeline.final_score || undefined,
            sourceKind: "api-pipeline",
        });

        return NextResponse.json({ slug: result.slug, version: result.version.version, existing: false });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to materialize pipeline" },
            { status: 500 },
        );
    }
}