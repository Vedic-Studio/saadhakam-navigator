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

/**
 * Mirror of the share-destination union in src/lib/analytics/events.ts. Kept here
 * (rather than imported) because ambient .d.ts files must not import runtime
 * modules. The events.ts module is the canonical source; keep these in sync.
 */
type SadhakaSharePlatform =
    | "twitter"
    | "whatsapp"
    | "facebook"
    | "copy_link"
    | "native_share"
    | "other";

/** Mirror of the share content-type union in src/lib/analytics/events.ts. */
type SadhakaShareContentType =
    | "comparison"
    | "fact_card"
    | "article"
    | "verse"
    | "mantra";

/** Mirror of PanchangViewParams in src/lib/analytics/events.ts. */
type SadhakaPanchangViewParams = {
    date: string;
    tithi: string;
    vara: string;
    nakshatra?: string;
};

/** Mirror of OutboundShareParams in src/lib/analytics/events.ts. */
type SadhakaOutboundShareParams = {
    platform: SadhakaSharePlatform;
    contentType: SadhakaShareContentType;
    url: string;
};

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
            // Phase 2 deferred events. The canonical contract is the TypeScript
            // module src/lib/analytics/events.ts (feature components import that
            // directly). These optional signatures exist only so the inline
            // layout.tsx bridge can mirror them later if it ever needs to.
            streakDay?: (streakLen: number, cluster: string) => void;
            mantraAudioPlay?: (mantraId: string, deity: string, durationPct: number) => void;
            panchangView?: (params: SadhakaPanchangViewParams) => void;
            pathStepComplete?: (pathId: string, stepN: number, totalSteps: number) => void;
            verseBookmark?: (verseId: string, cluster: string) => void;
            outboundShare?: (params: SadhakaOutboundShareParams) => void;
        };
    }
}
