export type PipelinePageType =
    | "topic_hub"
    | "combinatorial"
    | "sacred_text_chapter"
    | "sacred_text_shloka"
    | "sanskrit_lexicon";

export type PipelineStatus =
    | "queued"
    | "researching"
    | "research_review"
    | "writing"
    | "draft_review"
    | "editing"
    | "edit_review"
    | "polishing"
    | "final_review"
    | "needs_review"
    | "approved"
    | "rejected"
    | "failed";

export type PipelineFeedbackAction = "approve" | "reject" | "edit";

export type PipelineOutputStage = "research_brief" | "writer_draft" | "editor_score" | "final" | string;

export type PipelineFeedbackStage = "research_review" | "draft_review" | "edit_review" | "final_review" | "final";

export const PIPELINE_REVIEWABLE_STATUSES: PipelineStatus[] = [
    "research_review",
    "draft_review",
    "edit_review",
    "final_review",
    "needs_review",
];
export const PIPELINE_TERMINAL_STATUSES: PipelineStatus[] = ["approved", "rejected", "failed"];
export const PIPELINE_PROGRESS_STEPS: Array<Exclude<PipelineStatus, "approved" | "rejected" | "failed">> = [
    "queued",
    "researching",
    "research_review",
    "writing",
    "draft_review",
    "editing",
    "edit_review",
    "polishing",
    "final_review",
    "needs_review",
];

export const PIPELINE_ACTIVE_REVIEW_STATUSES: PipelineStatus[] = [
    "research_review",
    "draft_review",
    "edit_review",
    "final_review",
];

export interface PipelineOutput {
    id: string;
    version: number;
    stage: PipelineOutputStage;
    agent: string;
    content: string;
    revision_notes?: string | null;
    scorecard_json?: string | null;
    created_at: string;
}

export interface PipelineFeedbackEntry {
    id: string;
    stage: PipelineFeedbackStage | string;
    action: PipelineFeedbackAction;
    diff?: string | null;
    notes?: string | null;
    created_at: string;
}

export interface PipelineListItem {
    id: string;
    topic: string;
    page_type: PipelinePageType | string;
    status: PipelineStatus | string;
    revision_count: number;
    final_score?: number | null;
    created_at: string;
    updated_at: string;
}

export interface PipelineDetail extends PipelineListItem {
    goal?: string | null;
    audience?: string | null;
    context_module?: string | null;
    quality_threshold: number;
    revision_limit: number;
    error_message?: string | null;
    outputs: PipelineOutput[];
    feedback: PipelineFeedbackEntry[];
}

export interface PipelineListResponse {
    pipelines: PipelineListItem[];
    total: number;
}

export interface PipelineCreateInput {
    topic: string;
    pageType: PipelinePageType;
    goal?: string;
    audience?: string;
    qualityThreshold?: number;
    revisionLimit?: number;
}

export interface PipelineFeedbackInput {
    stage: PipelineFeedbackStage;
    action: PipelineFeedbackAction;
    diff?: string;
    notes?: string;
}

export interface PipelineReviewDecisionInput {
    notes?: string;
}

export interface PipelineAdvanceInput {
    notes?: string;
}

export interface PipelineReviseInput {
    notes: string;
    targetDimensions?: string[];
}

export interface MaterializePipelineResponse {
    slug: string;
    version: number;
    existing: boolean;
}

export interface TechniqueItem {
    source: string;
    type: string;
    text: string;
}

export type PipelineCard = {
    id: string;
    topic: string;
    pageType: string;
    status: string;
    revisionCount: number;
    finalScore?: number | null;
    createdAt: string;
    updatedAt: string;
};

export type PipelineStageView = {
    latestResearchBrief?: PipelineOutput;
    latestWriterDraft?: PipelineOutput;
    latestEditorScore?: PipelineOutput;
    latestPolishedDraft?: PipelineOutput;
    latestPolishScore?: PipelineOutput;
    latestRevisionNotes?: string;
};

export type ApprovedPipelineArtifact = {
    output: PipelineOutput;
    stage: "final" | "writer_draft";
};

function coerceOptionalString(value?: string | null) {
    return value ?? undefined;
}

export function toPipelineCard(pipeline: PipelineListItem | PipelineDetail): PipelineCard {
    return {
        id: pipeline.id,
        topic: pipeline.topic,
        pageType: pipeline.page_type,
        status: pipeline.status,
        revisionCount: pipeline.revision_count,
        finalScore: pipeline.final_score,
        createdAt: pipeline.created_at,
        updatedAt: pipeline.updated_at,
    };
}

export function getLatestPipelineOutput(outputs: PipelineOutput[], stage: string) {
    return [...outputs]
        .filter((output) => output.stage === stage)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
}

export function getPipelineStageView(detail: PipelineDetail): PipelineStageView {
    const latestResearchBrief = getLatestPipelineOutput(detail.outputs, "research_brief");
    const latestWriterDraft = getLatestPipelineOutput(detail.outputs, "writer_draft");
    const latestEditorScore = getLatestPipelineOutput(detail.outputs, "editor_score");
    const latestPolishedDraft = getLatestPipelineOutput(detail.outputs, "polished_draft");
    const latestPolishScore = getLatestPipelineOutput(detail.outputs, "polish_score");

    return {
        latestResearchBrief,
        latestWriterDraft,
        latestEditorScore,
        latestPolishedDraft,
        latestPolishScore,
        latestRevisionNotes: coerceOptionalString(
            latestPolishScore?.revision_notes
            || latestPolishedDraft?.revision_notes
            || latestEditorScore?.revision_notes
            || latestWriterDraft?.revision_notes
            || latestResearchBrief?.revision_notes,
        ),
    };
}

export function parseEditorScore(output?: PipelineOutput) {
    if (!output?.scorecard_json) {
        return null;
    }

    try {
        return JSON.parse(output.scorecard_json) as {
            total_score?: number;
            passed?: boolean;
            dimensions?: Record<string, { score: number; weight: number; notes: string }>;
            violations?: string[];
        };
    } catch {
        return null;
    }
}

export function isPipelineTerminal(status: PipelineStatus | string) {
    return PIPELINE_TERMINAL_STATUSES.includes(status as PipelineStatus);
}

export function canReviewPipeline(status: PipelineStatus | string) {
    return PIPELINE_REVIEWABLE_STATUSES.includes(status as PipelineStatus);
}

export function canApprovePipeline(status: PipelineStatus | string) {
    return ["final_review", "needs_review"].includes(status as PipelineStatus);
}

export function canRejectPipeline(status: PipelineStatus | string) {
    return canReviewPipeline(status);
}

export function canAdvancePipeline(status: PipelineStatus | string) {
    return ["research_review", "draft_review", "edit_review"].includes(status as PipelineStatus);
}

export function canRevisePipeline(status: PipelineStatus | string) {
    return canReviewPipeline(status);
}

export function getApprovedPipelineArtifact(outputs: PipelineOutput[]): ApprovedPipelineArtifact | null {
    const latestFinal = getLatestPipelineOutput(outputs, "final");
    if (latestFinal?.content) {
        return { output: latestFinal, stage: "final" };
    }

    const latestPolishedDraft = getLatestPipelineOutput(outputs, "polished_draft");
    if (latestPolishedDraft?.content) {
        return { output: latestPolishedDraft, stage: "writer_draft" };
    }

    const latestWriterDraft = getLatestPipelineOutput(outputs, "writer_draft");
    if (latestWriterDraft?.content) {
        return { output: latestWriterDraft, stage: "writer_draft" };
    }

    return null;
}

export function canMaterializePipeline(detail: Pick<PipelineDetail, "status" | "error_message" | "outputs">) {
    if (detail.status !== "approved" || Boolean(detail.error_message)) {
        return false;
    }

    return Boolean(getApprovedPipelineArtifact(detail.outputs));
}

export function getDefaultFeedbackStage(detail: Pick<PipelineDetail, "outputs">): PipelineFeedbackStage {
    if (getLatestPipelineOutput(detail.outputs, "polish_score") || getLatestPipelineOutput(detail.outputs, "polished_draft")) {
        return "final_review";
    }
    if (getLatestPipelineOutput(detail.outputs, "editor_score")) {
        return "edit_review";
    }
    if (getLatestPipelineOutput(detail.outputs, "writer_draft")) {
        return "draft_review";
    }
    if (getLatestPipelineOutput(detail.outputs, "research_brief")) {
        return "research_review";
    }

    return "final";
}