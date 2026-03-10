import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("best-bhagavad-gita-translation-for-beginners")!;

export const metadata = buildArticleMetadata(meta);

const options = [
    {
        label: "Readable modern translation",
        bestFor: "first-time readers who want clarity",
        notBestFor: "readers seeking strict Sanskrit literalism",
    },
    {
        label: "Traditional commentary-heavy edition",
        bestFor: "readers who want deep Vedantic framing",
        notBestFor: "people overwhelmed by long notes",
    },
    {
        label: "Compact study edition",
        bestFor: "busy readers building daily habit",
        notBestFor: "those looking for chapter-by-chapter philosophical depth",
    },
];

export default function BestBhagavadGitaTranslationForBeginnersPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Sacred Texts" pillarHref="/sacred-texts-teachings">
            <p>
                For most beginners, the best Bhagavad Gita translation is the one you can read daily for 30 days: clear language, short notes, and steady readability.
                Do not optimize for perfection on day one — optimize for consistency.
            </p>

            <h2>Best for / Not best for / Where to start</h2>
            <ul>
                <li><strong>Best for:</strong> readers who want to apply the Gita in daily life, not just collect interpretations.</li>
                <li><strong>Not best for:</strong> readers trying to compare ten editions before reading chapter one.</li>
                <li><strong>Where to start:</strong> choose one beginner-friendly edition and read chapters 2, 12, and 3 in that order.</li>
            </ul>

            <h2>Quick chooser matrix</h2>
            <ul>
                {options.map((option) => (
                    <li key={option.label}>
                        <strong>{option.label}:</strong> best for {option.bestFor}; not best for {option.notBestFor}.
                    </li>
                ))}
            </ul>

            <h2>How to avoid beginner overwhelm</h2>
            <ul>
                <li>Read 5–10 verses per day.</li>
                <li>Write one practical takeaway after each session.</li>
                <li>Apply one verse to a real decision that day.</li>
            </ul>

            <p>
                Next: use <Link href="/bhagavad-gita-complete-guide">Bhagavad Gita Complete Guide</Link> for context, then connect teachings to routine with <Link href="/starting-spiritual-practice">Starting Spiritual Practice</Link>.
            </p>
        </ArticleLayout>
    );
}
