import type { ArticleMeta } from "@/data/articles";

export type CmsStage = "draft" | "edit" | "review" | "approved" | "published" | "rejected" | "legacy";
export type CmsSourceKind = "pilot-import" | "legacy-page" | "cms-native" | "api-pipeline";
export type CmsReviewAction = "approve" | "revise" | "reject";

export interface CmsScoreViolation {
    type: string;
    line: number;
    matched: string;
    context: string;
    fix: string;
}

export interface CmsConsistencyIssue {
    slug: string;
    kind: "missing-current-file" | "missing-version-file" | "missing-version-content" | "missing-article-row";
    detail: string;
}

export interface CmsConsistencyReport {
    ok: boolean;
    issues: CmsConsistencyIssue[];
}

export interface CmsArticleIntake {
    topic?: string;
    goal?: string;
    audience?: string;
    pageType?: string;
    pipelineId?: string;
    contextModule?: string;
    qualityThreshold?: number;
    finalScore?: number;
}

export interface CmsQueueArticle {
    slug: string;
    headline: string;
    batch: string;
    format: string;
    stage: CmsStage;
    wordCount: number;
    createdAt: string;
    updatedAt: string;
    published: boolean;
    sourceKind: CmsSourceKind;
    hasCmsContent: boolean;
    canPublish: boolean;
    intake?: CmsArticleIntake;
}

export interface CmsVersion {
    version: number;
    filename: string;
    content: string;
    createdAt: string;
    note?: string;
}

export interface CmsReview {
    action: CmsReviewAction;
    comment: string;
    version: number;
    createdAt: string;
}

export interface CmsScore {
    directness: number;
    rhythm: number;
    trust: number;
    authenticity: number;
    density: number;
    focus: number;
    total: number;
    verdict: "PASS" | "REVISE" | "REJECT";
    violations: CmsScoreViolation[];
}

export interface CmsArticleDetail {
    article: CmsQueueArticle;
    meta?: ArticleMeta;
    content: string;
    versions: CmsVersion[];
    reviews: CmsReview[];
    score: CmsScore | null;
    migrationState: "cms" | "legacy-fallback" | "cms-native";
}

export interface ParsedCmsMarkdown {
    frontmatter: Record<string, string>;
    body: string;
}