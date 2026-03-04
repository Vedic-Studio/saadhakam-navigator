import { Metadata } from "next";
import { getFaithFinderSubmission } from "@/lib/faithFinderStorage";
import { pathMetadata, QuizResult } from "@/data/faithFinderQuiz";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    try {
        const { id } = await params;
        const submission = await getFaithFinderSubmission(id);

        if (submission && submission.result) {
            const result = submission.result as QuizResult;
            const pm = pathMetadata[result.primaryPath];

            if (pm) {
                return {
                    title: `My Spiritual Path: ${pm.name} | Sadhaka Faith Finder`,
                    description: `I discovered I am "${pm.archetype}". Take the Faith Finder Quiz to uncover your path.`,
                    openGraph: {
                        title: `My Spiritual Path: ${pm.name}`,
                        description: `I discovered I am "${pm.archetype}". Take the Faith Finder Quiz to uncover your path.`,
                        type: 'website',
                    }
                };
            }
        }
    } catch (e) {
        console.error("Failed to generate metadata for Faith Finder result:", e);
    }

    return {
        title: 'Faith Finder Results | Sadhaka',
        description: 'Discover your Dharmic Archetype and specific path.'
    };
}

export default function FaithFinderResultsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
