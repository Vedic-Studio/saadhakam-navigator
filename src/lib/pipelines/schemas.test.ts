import { describe, expect, it } from "vitest";
import {
    PipelineDetailSchema,
    PipelineListResponseSchema,
    PipelineOutputSchema,
    MaterializationContractSchema,
    validatePipelineDetail,
    safeParsePipelineDetail,
} from "./schemas";

const validOutput = {
    id: "out-1",
    version: 1,
    stage: "writer_draft",
    agent: "writer",
    content: "draft content here",
    revision_notes: null,
    scorecard_json: null,
    created_at: "2026-04-01T10:00:00Z",
};

const validDetail = {
    id: "pipeline-1",
    topic: "What is Vedanta",
    page_type: "topic_hub",
    status: "needs_review",
    revision_count: 1,
    final_score: null,
    created_at: "2026-04-01T10:00:00Z",
    updated_at: "2026-04-01T11:00:00Z",
    goal: "Explain Vedanta basics",
    audience: "spiritual seekers",
    context_module: "long_form",
    quality_threshold: 7,
    revision_limit: 3,
    error_message: null,
    outputs: [validOutput],
    feedback: [],
};

describe("PipelineOutputSchema", () => {
    it("accepts a valid output", () => {
        expect(PipelineOutputSchema.parse(validOutput)).toEqual(validOutput);
    });

    it("rejects missing required fields", () => {
        expect(() => PipelineOutputSchema.parse({ id: "x" })).toThrow();
    });

    it("accepts null for optional fields", () => {
        const result = PipelineOutputSchema.parse({ ...validOutput, revision_notes: null, scorecard_json: null });
        expect(result.revision_notes).toBeNull();
    });
});

describe("PipelineDetailSchema", () => {
    it("accepts a valid pipeline detail", () => {
        const result = PipelineDetailSchema.parse(validDetail);
        expect(result.id).toBe("pipeline-1");
        expect(result.outputs).toHaveLength(1);
    });

    it("rejects when quality_threshold is missing", () => {
        const { quality_threshold: _, ...withoutThreshold } = validDetail;
        expect(() => PipelineDetailSchema.parse(withoutThreshold)).toThrow();
    });

    it("rejects when outputs is not an array", () => {
        expect(() => PipelineDetailSchema.parse({ ...validDetail, outputs: "not-array" })).toThrow();
    });

    it("accepts unknown page_type strings (backend may add new types)", () => {
        const result = PipelineDetailSchema.parse({ ...validDetail, page_type: "new_future_type" });
        expect(result.page_type).toBe("new_future_type");
    });

    it("rejects completely wrong shapes", () => {
        expect(() => PipelineDetailSchema.parse(42)).toThrow();
        expect(() => PipelineDetailSchema.parse(null)).toThrow();
        expect(() => PipelineDetailSchema.parse("string")).toThrow();
    });
});

describe("PipelineListResponseSchema", () => {
    it("accepts a valid list response", () => {
        const result = PipelineListResponseSchema.parse({
            pipelines: [
                {
                    id: "p-1",
                    topic: "Karma",
                    page_type: "topic_hub",
                    status: "approved",
                    revision_count: 2,
                    final_score: 8.5,
                    created_at: "2026-04-01T10:00:00Z",
                    updated_at: "2026-04-01T12:00:00Z",
                },
            ],
            total: 1,
        });
        expect(result.pipelines).toHaveLength(1);
        expect(result.total).toBe(1);
    });

    it("rejects missing total field", () => {
        expect(() => PipelineListResponseSchema.parse({ pipelines: [] })).toThrow();
    });
});

describe("MaterializationContractSchema", () => {
    it("accepts an approved pipeline with outputs", () => {
        const result = MaterializationContractSchema.parse({
            ...validDetail,
            status: "approved",
        });
        expect(result.status).toBe("approved");
    });

    it("rejects non-approved status", () => {
        expect(() => MaterializationContractSchema.parse({ ...validDetail, status: "needs_review" })).toThrow();
    });

    it("rejects empty outputs array", () => {
        expect(() => MaterializationContractSchema.parse({ ...validDetail, status: "approved", outputs: [] })).toThrow();
    });

    it("rejects empty topic", () => {
        expect(() => MaterializationContractSchema.parse({ ...validDetail, status: "approved", topic: "" })).toThrow();
    });
});

describe("validatePipelineDetail", () => {
    it("returns validated data on success", () => {
        const result = validatePipelineDetail(validDetail);
        expect(result.id).toBe("pipeline-1");
    });

    it("throws ZodError on invalid data", () => {
        expect(() => validatePipelineDetail({ id: 123 })).toThrow();
    });
});

describe("safeParsePipelineDetail", () => {
    it("returns success: true for valid data", () => {
        const result = safeParsePipelineDetail(validDetail);
        expect(result.success).toBe(true);
    });

    it("returns success: false with error for invalid data", () => {
        const result = safeParsePipelineDetail({ broken: true });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues.length).toBeGreaterThan(0);
        }
    });
});
