export { };

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        sadhaka?: {
            quizStart?: () => void;
            quizComplete?: (path: string, scores: unknown) => void;
            emailCapture?: (path: string) => void;
            quizResultView?: (path: string, source?: string) => void;
            shareResult?: (path: string, source?: string) => void;
            articleRead?: (slug: string, pillar?: string) => void;
            ctaClick?: (label: string, destination?: string) => void;
            appOpen?: () => void;
            pathExplore?: (path: string) => void;
        };
    }
}
