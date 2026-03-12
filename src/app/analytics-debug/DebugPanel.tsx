"use client";

import { Button } from "@/components/ui/button";

const sampleScores = {
    inquiry: 18,
    devotion: 11,
    ritual: 7,
    discipline: 14,
};

export default function DebugPanel() {
    const safeRun = (fn: () => void) => {
        try {
            fn();
        } catch (error) {
            console.error("Analytics debug trigger failed", error);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Analytics Debug Panel</h1>
                <p className="text-muted-foreground">
                    Open GA4 DebugView, then trigger the events below one by one.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                    <Button onClick={() => safeRun(() => window.sadhaka?.appOpen?.())}>app_open</Button>
                    <Button onClick={() => safeRun(() => window.sadhaka?.quizStart?.())}>faith_finder_quiz_start</Button>
                    <Button
                        onClick={() =>
                            safeRun(() =>
                                window.sadhaka?.quizComplete?.("inquiry", sampleScores),
                            )
                        }
                    >
                        faith_finder_quiz_complete
                    </Button>
                    <Button
                        onClick={() => safeRun(() => window.sadhaka?.emailCapture?.("inquiry"))}
                    >
                        faith_finder_email_capture
                    </Button>
                    <Button
                        onClick={() =>
                            safeRun(() => window.sadhaka?.quizResultView?.("inquiry", "debug_page"))
                        }
                    >
                        faith_finder_result_view
                    </Button>
                    <Button
                        onClick={() =>
                            safeRun(() => window.sadhaka?.shareResult?.("inquiry", "debug_page"))
                        }
                    >
                        faith_finder_result_share
                    </Button>
                    <Button
                        onClick={() =>
                            safeRun(() => window.sadhaka?.articleRead?.("what-is-vedanta", "ancient-wisdom"))
                        }
                    >
                        seo_article_read
                    </Button>
                    <Button
                        onClick={() =>
                            safeRun(() =>
                                window.sadhaka?.ctaClick?.("debug_cta", "/faith-finder"),
                            )
                        }
                    >
                        cta_click
                    </Button>
                    <Button
                        onClick={() => safeRun(() => window.sadhaka?.pathExplore?.("debug_path"))}
                    >
                        path_explore
                    </Button>
                </div>
            </div>
        </main>
    );
}