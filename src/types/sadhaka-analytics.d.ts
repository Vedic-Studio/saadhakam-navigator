export { };

/**
 * Canonical allowed values for the `source_template` analytics property.
 * Identifies which page-template surface a cta_click or quiz_start originated
 * from. A later workstream passes these into ctaClick / quizStart. Keep this in
 * sync with docs/analytics/event-taxonomy.md.
 */
type SadhakaSourceTemplate =
    | "homepage"
    | "concept-essay"
    | "article"
    | "comparison"
    | "biography"
    | "mantra"
    | "verse"
    | "evidence"
    | "dynasty"
    | "panchang"
    | "stotra"
    | "hub"
    | "faith-finder"
    | "today";

type SadhakaJourneyContext = {
    journeyId?: string;
    attributionToken?: string;
    sourceArticleRoute?: string;
    sourceArticleSlug?: string;
    sourcePillar?: string;
    pageArchetype?: string;
    pageTemplate?: string;
    ctaSlot?: string;
    ctaLabel?: string;
    ctaDestination?: string;
    pathName?: string;
    primaryPath?: string;
    source?: string;
    variant?: string;
    bridgeType?: string;
};

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        sadhaka?: {
            pageView?: (path?: string, title?: string) => void;
            quizStart?: (context?: SadhakaJourneyContext, sourceTemplate?: SadhakaSourceTemplate) => void;
            quizComplete?: (path: string, scores: unknown, context?: SadhakaJourneyContext) => void;
            emailCapture?: (path: string, context?: SadhakaJourneyContext) => void;
            quizResultView?: (path: string, source?: string, context?: SadhakaJourneyContext) => void;
            shareResult?: (path: string, source?: string, context?: SadhakaJourneyContext) => void;
            articleRead?: (slug: string, pillar?: string, context?: SadhakaJourneyContext) => void;
            ctaClick?: (label: string, destination?: string, context?: SadhakaJourneyContext, sourceTemplate?: SadhakaSourceTemplate) => void;
            appOpen?: () => void;
            pathExplore?: (path: string, context?: SadhakaJourneyContext) => void;
            setJourneyContext?: (context?: SadhakaJourneyContext) => SadhakaJourneyContext;
            getJourneyContext?: () => SadhakaJourneyContext;
            clearJourneyContext?: () => void;
        };
    }
}
