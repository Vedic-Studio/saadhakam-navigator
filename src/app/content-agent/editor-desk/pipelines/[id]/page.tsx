import type { Metadata } from "next";
import { PipelineReviewPage } from "@/components/cms/editor-desk/PipelineReviewPage";

export const metadata: Metadata = {
    title: "Pipeline Review Workspace",
    description: "Review async content pipeline runs before materializing them into the CMS.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function EditorDeskPipelineReviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur">
                <div className="mb-8 border-b border-white/10 pb-4">
                    <div className="text-sm font-semibold text-white">Sadhaka</div>
                    <div className="text-xs text-white/60">Editorial Desk · Pipeline Review</div>
                </div>
                <PipelineReviewPage pipelineId={id} />
            </div>
        </main>
    );
}