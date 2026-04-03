/**
 * Zod schemas for pipeline backend responses.
 *
 * These enforce a contract at the proxy boundary between the Python backend
 * and the Next.js frontend. If the backend changes its output format, these
 * schemas will throw a clear ZodError instead of silently ingesting bad data.
 */

import { z } from "zod";

// --- Shared enums ---

export const PipelinePageTypeSchema = z.enum([
    "topic_hub",
    "combinatorial",
    "sacred_text_chapter",
    "sacred_text_shloka",
    "sanskrit_lexicon",
]);

export const PipelineStatusSchema = z.enum([
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
    "approved",
    "rejected",
    "failed",
]);

export const PipelineFeedbackActionSchema = z.enum(["approve", "reject", "edit"]);

// --- Output schemas ---

export const PipelineOutputSchema = z.object({
    id: z.string(),
    version: z.number(),
    stage: z.string(), // Intentionally loose — backend may add new stages
    agent: z.string(),
    content: z.string(),
    revision_notes: z.string().nullish(),
    scorecard_json: z.string().nullish(),
    created_at: z.string(),
});

export const PipelineFeedbackEntrySchema = z.object({
    id: z.string(),
    stage: z.string(),
    action: PipelineFeedbackActionSchema,
    diff: z.string().nullish(),
    notes: z.string().nullish(),
    created_at: z.string(),
});

// --- List item schema ---

export const PipelineListItemSchema = z.object({
    id: z.string(),
    topic: z.string(),
    page_type: z.string(), // Loose — may include new types from backend
    status: z.string(),
    revision_count: z.number(),
    final_score: z.number().nullish(),
    created_at: z.string(),
    updated_at: z.string(),
});

// --- Detail schema (used by materialize route) ---

export const PipelineDetailSchema = PipelineListItemSchema.extend({
    description: z.string().nullish(),
    reference_links: z.array(z.string()),
    key_angles: z.array(z.string()),
    source_notes: z.string().nullish(),
    goal: z.string().nullish(),
    audience: z.string().nullish(),
    context_module: z.string().nullish(),
    quality_threshold: z.number(),
    revision_limit: z.number(),
    error_message: z.string().nullish(),
    outputs: z.array(PipelineOutputSchema),
    feedback: z.array(PipelineFeedbackEntrySchema),
});

// --- List response schema ---

export const PipelineListResponseSchema = z.object({
    pipelines: z.array(PipelineListItemSchema),
    total: z.number(),
});

// --- Materialization contract ---
// What the materialize endpoint expects from a validated pipeline detail

export const MaterializationContractSchema = z.object({
    id: z.string().min(1),
    topic: z.string().min(1),
    status: z.literal("approved"),
    page_type: z.string(),
    description: z.string().nullish(),
    reference_links: z.array(z.string()),
    key_angles: z.array(z.string()),
    source_notes: z.string().nullish(),
    goal: z.string().nullish(),
    audience: z.string().nullish(),
    context_module: z.string().nullish(),
    quality_threshold: z.number(),
    final_score: z.number().nullish(),
    error_message: z.string().nullish(),
    outputs: z.array(PipelineOutputSchema).min(1, "Pipeline must have at least one output to materialize"),
});

// --- Type exports inferred from schemas ---

export type ValidatedPipelineDetail = z.infer<typeof PipelineDetailSchema>;
export type ValidatedPipelineListResponse = z.infer<typeof PipelineListResponseSchema>;
export type ValidatedMaterializationContract = z.infer<typeof MaterializationContractSchema>;

export function formatSchemaValidationError(error: z.ZodError): string {
    return error.issues.map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`).join("; ");
}

// --- Validation helpers ---

/**
 * Validate a pipeline detail response from the backend.
 * Throws ZodError with clear field-level messages on mismatch.
 */
export function validatePipelineDetail(data: unknown): ValidatedPipelineDetail {
    return PipelineDetailSchema.parse(data);
}

/**
 * Validate a pipeline list response from the backend.
 */
export function validatePipelineListResponse(data: unknown): ValidatedPipelineListResponse {
    return PipelineListResponseSchema.parse(data);
}

export function validateMaterializationContract(data: unknown): ValidatedMaterializationContract {
    return MaterializationContractSchema.parse(data);
}

/**
 * Safe validation — returns { success, data, error } instead of throwing.
 */
export function safeParsePipelineDetail(data: unknown) {
    return PipelineDetailSchema.safeParse(data);
}
