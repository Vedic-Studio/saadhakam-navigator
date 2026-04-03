import { describe, expect, it } from "vitest";
import {
    canAdvancePipeline,
    canApprovePipeline,
    canMaterializePipeline,
    canRevisePipeline,
    getDefaultFeedbackStage,
    getApprovedPipelineArtifact,
    type PipelineDetail,
} from "./types";

function buildDetail(overrides: Partial<PipelineDetail> = {}): PipelineDetail {
    return {
        id: "pipeline-1",
        topic: "What is Vedanta",
        page_type: "topic_hub",
        status: "needs_review",
        revision_count: 0,
        quality_threshold: 7,
        revision_limit: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        outputs: [],
        feedback: [],
        ...overrides,
    };
}

describe("pipeline workflow helpers", () => {
    it("only allows approval from explicit review state", () => {
        expect(canApprovePipeline("final_review")).toBe(true);
        expect(canApprovePipeline("needs_review")).toBe(true);
        expect(canApprovePipeline("approved")).toBe(false);
        expect(canApprovePipeline("editing")).toBe(false);
    });

    it("allows advance only on pre-final review gates", () => {
        expect(canAdvancePipeline("research_review")).toBe(true);
        expect(canAdvancePipeline("draft_review")).toBe(true);
        expect(canAdvancePipeline("edit_review")).toBe(true);
        expect(canAdvancePipeline("final_review")).toBe(false);
    });

    it("allows revise on any review gate", () => {
        expect(canRevisePipeline("research_review")).toBe(true);
        expect(canRevisePipeline("draft_review")).toBe(true);
        expect(canRevisePipeline("edit_review")).toBe(true);
        expect(canRevisePipeline("final_review")).toBe(true);
        expect(canRevisePipeline("writing")).toBe(false);
    });

    it("requires approved status, no error, and a writer draft before materialization", () => {
        const withDraft = buildDetail({
            status: "approved",
            outputs: [
                {
                    id: "out-1",
                    version: 1,
                    stage: "writer_draft",
                    agent: "writer",
                    content: "draft content",
                    created_at: new Date().toISOString(),
                },
            ],
        });

        expect(canMaterializePipeline(withDraft)).toBe(true);
        expect(canMaterializePipeline({ ...withDraft, error_message: "boom" })).toBe(false);
        expect(canMaterializePipeline({ ...withDraft, status: "needs_review" })).toBe(false);
        expect(canMaterializePipeline({ ...withDraft, outputs: [] })).toBe(false);
    });

    it("prefers an explicit final artifact and falls back to writer draft", () => {
        const createdAt = new Date().toISOString();

        expect(
            getApprovedPipelineArtifact([
                {
                    id: "out-1",
                    version: 1,
                    stage: "writer_draft",
                    agent: "writer",
                    content: "writer draft",
                    created_at: createdAt,
                },
                {
                    id: "out-2",
                    version: 2,
                    stage: "final",
                    agent: "editor",
                    content: "approved final artifact",
                    created_at: createdAt,
                },
            ]),
        ).toMatchObject({ stage: "final", output: { content: "approved final artifact" } });

        expect(
            getApprovedPipelineArtifact([
                {
                    id: "out-1",
                    version: 1,
                    stage: "writer_draft",
                    agent: "writer",
                    content: "writer draft",
                    created_at: createdAt,
                },
            ]),
        ).toMatchObject({ stage: "writer_draft", output: { content: "writer draft" } });

        expect(getApprovedPipelineArtifact([])).toBeNull();
    });

    it("maps feedback to the latest concrete artifact stage", () => {
        expect(
            getDefaultFeedbackStage(
                buildDetail({
                    outputs: [
                        {
                            id: "out-1",
                            version: 1,
                            stage: "research_brief",
                            agent: "research",
                            content: "brief",
                            created_at: new Date().toISOString(),
                        },
                    ],
                }),
            ),
        ).toBe("research_review");

        expect(
            getDefaultFeedbackStage(
                buildDetail({
                    outputs: [
                        {
                            id: "out-1",
                            version: 1,
                            stage: "writer_draft",
                            agent: "writer",
                            content: "draft",
                            created_at: new Date().toISOString(),
                        },
                        {
                            id: "out-2",
                            version: 2,
                            stage: "editor_score",
                            agent: "editor",
                            content: "draft",
                            created_at: new Date().toISOString(),
                        },
                    ],
                }),
            ),
        ).toBe("edit_review");
    });

    it("maps polished artifacts to final review feedback stage", () => {
        expect(
            getDefaultFeedbackStage(
                buildDetail({
                    outputs: [
                        {
                            id: "out-1",
                            version: 1,
                            stage: "polished_draft",
                            agent: "writer",
                            content: "polished",
                            created_at: new Date().toISOString(),
                        },
                    ],
                }),
            ),
        ).toBe("final_review");
    });
});