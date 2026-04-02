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
                    title: `Faith Finder Result: ${pm.name} | Sadhaka`,
                    description: `A Faith Finder result page showing ${pm.name} as the strongest current orientation, with score breakdown and suggested next steps.`,
                    openGraph: {
                        title: `Faith Finder Result: ${pm.name}`,
                        description: `A Faith Finder result page showing ${pm.name} as the strongest current orientation, with score breakdown and suggested next steps.`,
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
        description: 'Review your strongest yoga orientation, score breakdown, and suggested next steps.'
    };
}

export default function FaithFinderResultsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
