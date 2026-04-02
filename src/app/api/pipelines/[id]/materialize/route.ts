import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { findCmsArticleSlugByPipelineId, generateUniqueCmsSlug, getCmsArticleDetail, upsertCmsArticleDraft } from "@/lib/cms/storage";
import { proxyContentAgentJson } from "@/lib/content-agent/backend";
import { formatSchemaValidationError, validateMaterializationContract, validatePipelineDetail } from "@/lib/pipelines/schemas";
import { canMaterializePipeline, getApprovedPipelineArtifact } from "@/lib/pipelines/types";

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const response = await proxyContentAgentJson(`/pipelines/${id}`);
        const rawData: unknown = await response.json();

        if (!response.ok) {
            const errorPayload = rawData as { detail?: string };
            return NextResponse.json(
                { error: errorPayload.detail || "Failed to load pipeline detail" },
                { status: response.status },
            );
        }

        // Validate backend response against Zod schema — catch contract drift early
        let pipeline;
        try {
            pipeline = validatePipelineDetail(rawData);
        } catch (validationError) {
            const zodError = validationError instanceof ZodError ? validationError : null;
            const fieldErrors = zodError ? formatSchemaValidationError(zodError) : "unknown";
            return NextResponse.json(
                { error: `Pipeline backend response failed schema validation: ${fieldErrors}` },
                { status: 502 },
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

        let materializationContract;
        try {
            materializationContract = validateMaterializationContract(pipeline);
        } catch (validationError) {
            const zodError = validationError instanceof ZodError ? validationError : null;
            const fieldErrors = zodError ? formatSchemaValidationError(zodError) : "unknown";
            return NextResponse.json(
                { error: `Pipeline materialization contract failed validation: ${fieldErrors}` },
                { status: 502 },
            );
        }

        const artifact = getApprovedPipelineArtifact(materializationContract.outputs);
        if (!artifact?.output.content) {
            return NextResponse.json({ error: "Pipeline has no approved artifact to materialize" }, { status: 422 });
        }

        const existingSlug = await findCmsArticleSlugByPipelineId(materializationContract.id);
        if (existingSlug) {
            const existingDetail = await getCmsArticleDetail(existingSlug);
            if (!existingDetail) {
                return NextResponse.json(
                    { error: `Pipeline ${materializationContract.id} is already linked to missing CMS draft '${existingSlug}'` },
                    { status: 409 },
                );
            }

            return NextResponse.json({
                slug: existingSlug,
                version: existingDetail.versions[existingDetail.versions.length - 1]?.version || 0,
                existing: true,
            });
        }

        const slug = await generateUniqueCmsSlug(materializationContract.topic);
        const result = await upsertCmsArticleDraft({
            slug,
            headline: materializationContract.topic,
            content: artifact.output.content,
            format: "pipeline draft",
            batch: `pipeline-${materializationContract.context_module || "default"}`,
            topic: materializationContract.topic,
            goal: materializationContract.goal || undefined,
            audience: materializationContract.audience || undefined,
            pageType: materializationContract.page_type,
            note: `Materialized from pipeline ${materializationContract.id} (${artifact.stage})`,
            pipelineId: materializationContract.id,
            contextModule: materializationContract.context_module || undefined,
            qualityThreshold: materializationContract.quality_threshold,
            finalScore: materializationContract.final_score || undefined,
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