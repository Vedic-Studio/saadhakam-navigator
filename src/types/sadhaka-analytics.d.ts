export { };

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
            quizStart?: (context?: SadhakaJourneyContext) => void;
            quizComplete?: (path: string, scores: unknown, context?: SadhakaJourneyContext) => void;
            emailCapture?: (path: string, context?: SadhakaJourneyContext) => void;
            quizResultView?: (path: string, source?: string, context?: SadhakaJourneyContext) => void;
            shareResult?: (path: string, source?: string, context?: SadhakaJourneyContext) => void;
            articleRead?: (slug: string, pillar?: string, context?: SadhakaJourneyContext) => void;
            ctaClick?: (label: string, destination?: string, context?: SadhakaJourneyContext) => void;
            appOpen?: () => void;
            pathExplore?: (path: string, context?: SadhakaJourneyContext) => void;
            setJourneyContext?: (context?: SadhakaJourneyContext) => SadhakaJourneyContext;
            getJourneyContext?: () => SadhakaJourneyContext;
            clearJourneyContext?: () => void;
        };
    }
}
