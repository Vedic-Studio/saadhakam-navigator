import type { Metadata } from "next";

import { GenerateWorkbench } from "@/components/content-agent/GenerateWorkbench";

export const metadata: Metadata = {
    title: "Content Agent Workbench",
    description:
        "Phase 1 workbench for topic-to-content generation and quality scoring.",
    alternates: {
        canonical: "https://www.opensadhaka.com/content-agent",
    },
};

export default function ContentAgentPage() {
    return (
        <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-semibold tracking-tight">Content Agent Workbench</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Phase 1 core loop: Topic → Content → Score
                </p>
                <div className="mt-8">
                    <GenerateWorkbench />
                </div>
            </div>
        </main>
    );
}
