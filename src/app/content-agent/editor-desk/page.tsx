import type { Metadata } from "next";
import { QueuePage } from "@/components/cms/editor-desk/QueuePage";

export const metadata: Metadata = {
    title: "Editorial CMS",
    description: "Review queue and editorial workspace for CMS-managed Sadhaka articles.",
    alternates: {
        canonical: "https://www.opensadhaka.com/content-agent/editor-desk",
    },
};

export default function EditorDeskPage() {
    return (
        <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur">
                <div className="mb-8 border-b border-white/10 pb-4">
                    <div className="text-sm font-semibold text-white">Sadhaka</div>
                    <div className="text-xs text-white/60">Editorial CMS</div>
                </div>
                <QueuePage />
            </div>
        </main>
    );
}