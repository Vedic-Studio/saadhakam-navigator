export { };

declare global {
    interface Window {
        sadhaka?: {
            quizStart?: () => void;
            quizComplete?: (path: string, scores: unknown) => void;
            emailCapture?: (path: string) => void;
            articleRead?: (slug: string, pillar?: string) => void;
            ctaClick?: (label: string, destination?: string) => void;
            appOpen?: () => void;
            pathExplore?: (path: string) => void;
        };
    }
}
