import type {
    MaterializePipelineResponse,
    PipelineCreateInput,
    PipelineDetail,
    PipelineFeedbackInput,
    PipelineListItem,
    PipelineListResponse,
    PipelineReviewDecisionInput,
    TechniqueItem,
} from "./types";

export class BackendUnavailableError extends Error {
    code = "BACKEND_UNAVAILABLE" as const;

    constructor(message = "Content agent is unavailable") {
        super(message);
        this.name = "BackendUnavailableError";
    }
}

async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Unknown error" }));

        if (response.status === 503 && error?.code === "BACKEND_UNAVAILABLE") {
            throw new BackendUnavailableError(error.detail || error.error || "Content agent is unavailable");
        }

        throw new Error(error.error || error.detail || "Request failed");
    }

    return response.json() as Promise<T>;
}

export async function listPipelines(status?: string) {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    const response = await fetch(`/api/pipelines${query}`, { cache: "no-store" });
    return parseResponse<PipelineListResponse>(response).then((data) => data.pipelines);
}

export async function getPipelineDetail(id: string) {
    const response = await fetch(`/api/pipelines/${id}`, { cache: "no-store" });
    return parseResponse<PipelineDetail>(response);
}

export async function createPipeline(input: PipelineCreateInput) {
    const response = await fetch("/api/pipelines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            topic: input.topic,
            page_type: input.pageType,
            goal: input.goal,
            audience: input.audience,
            quality_threshold: input.qualityThreshold,
            revision_limit: input.revisionLimit,
        }),
    });
    return parseResponse<PipelineDetail>(response);
}

async function postPipelineAction<T>(id: string, action: string, body: object) {
    const response = await fetch(`/api/pipelines/${id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return parseResponse<T>(response);
}

export async function approvePipeline(id: string, input: PipelineReviewDecisionInput = {}) {
    return postPipelineAction<PipelineDetail>(id, "approve", input);
}

export async function rejectPipeline(id: string, input: Required<Pick<PipelineReviewDecisionInput, "notes">>) {
    return postPipelineAction<PipelineDetail>(id, "reject", input);
}

export async function addPipelineFeedback(id: string, input: PipelineFeedbackInput) {
    return postPipelineAction<PipelineDetail>(id, "feedback", input);
}

export async function materializePipeline(id: string) {
    const response = await fetch(`/api/pipelines/${id}/materialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    return parseResponse<MaterializePipelineResponse>(response);
}

export async function getTechniques() {
    const response = await fetch("/api/pipelines/techniques", { cache: "no-store" });
    return parseResponse<{ techniques: TechniqueItem[] }>(response).then((data) => data.techniques);
}

export type { PipelineDetail, PipelineListItem };