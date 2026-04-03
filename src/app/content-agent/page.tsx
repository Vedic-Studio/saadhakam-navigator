import type { Metadata } from "next";
import Link from "next/link";

import { GenerateWorkbench } from "@/components/content-agent/GenerateWorkbench";

export const metadata: Metadata = {
    title: "Content Agent Workbench",
    description:
        "Create richer editorial briefs and move directly into the pipeline review workspace.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ContentAgentPage() {
    return (
        <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-semibold tracking-tight">Content Agent Workbench</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Start with a richer intake brief, then continue each run inside the editorial review workspace.
                </p>
                <div className="mt-4">
                    <Link
                        href="/content-agent/editor-desk"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                        View all pipelines →
                    </Link>
                </div>
                <div className="mt-8">
                    <GenerateWorkbench />
                </div>
            </div>
        </main>
    );
}
