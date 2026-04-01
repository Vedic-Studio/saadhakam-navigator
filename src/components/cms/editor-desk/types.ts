export type CmsArticle = {
    slug: string;
    headline: string;
    batch: string;
    format: string;
    stage: "draft" | "edit" | "review" | "published" | "rejected" | "legacy";
    wordCount: number;
    createdAt: string;
    updatedAt: string;
    published: boolean;
    sourceKind: "pilot-import" | "legacy-page" | "cms-native";
    hasCmsContent: boolean;
    canPublish: boolean;
    intake?: {
        topic?: string;
        goal?: string;
        audience?: string;
        pageType?: string;
    };
};

export type CmsVersion = {
    version: number;
    filename: string;
    content: string;
    createdAt: string;
    note?: string;
};

export type CmsReview = {
    action: "approve" | "revise" | "reject";
    comment: string;
    version: number;
    createdAt: string;
};

export type CmsScore = {
    directness: number;
    rhythm: number;
    trust: number;
    authenticity: number;
    density: number;
    focus: number;
    total: number;
    verdict: "PASS" | "REVISE" | "REJECT";
};

export type CmsArticleDetail = {
    article: CmsArticle;
    meta?: {
        slug: string;
        route: string;
        title: string;
    };
    content: string;
    versions: CmsVersion[];
    reviews: CmsReview[];
    score: CmsScore | null;
    migrationState: "cms" | "legacy-fallback" | "cms-native";
};