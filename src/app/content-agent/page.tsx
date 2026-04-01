import type { Metadata } from "next";
import Link from "next/link";

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
                <div className="mt-4">
                    <Link
                        href="/content-agent/editor-desk"
                        className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 hover:bg-orange-500/15"
                    >
                        Open Editorial CMS
                    </Link>
                </div>
                <div className="mt-8">
                    <GenerateWorkbench />
                </div>
            </div>
        </main>
    );
}
