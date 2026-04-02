import type { Metadata } from "next";
import { ReviewPage } from "@/components/cms/editor-desk/ReviewPage";

export const metadata: Metadata = {
    title: "Editorial Review Workspace",
    description: "Review, edit, version, and publish CMS-managed Sadhaka articles.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function EditorDeskReviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur">
                <div className="mb-8 border-b border-white/10 pb-4">
                    <div className="text-sm font-semibold text-white">Sadhaka</div>
                    <div className="text-xs text-white/60">Editorial CMS</div>
                </div>
                <ReviewPage slug={slug} />
            </div>
        </main>
    );
}