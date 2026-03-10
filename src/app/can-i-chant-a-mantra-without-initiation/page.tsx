import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("can-i-chant-a-mantra-without-initiation")!;

export const metadata = buildArticleMetadata(meta);

export default function CanIChantMantraWithoutInitiationPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Practical Practices" pillarHref="/practical-spiritual-practices">
            <p>
                Yes — you can chant many mantras without initiation. Beginners can safely start with universal mantras like Om, So&apos;ham, or Om Shanti with sincerity and consistency.
            </p>
            <p>
                Initiation is valuable, but not a blocker. Think of it as an amplifier, not a permission slip.
            </p>

            <h2>Best for / Not best for / Where to start</h2>
            <ul>
                <li><strong>Best for:</strong> beginners building a daily practice, anxious minds needing a stable anchor, and householders with limited time.</li>
                <li><strong>Not best for:</strong> people constantly switching mantras every few days.</li>
                <li><strong>Where to start:</strong> one universal mantra, one fixed time, one 40-day cycle.</li>
            </ul>

            <h2>Which mantras are usually safe without initiation?</h2>
            <ul>
                <li>Om</li>
                <li>So&apos;ham</li>
                <li>Om Shanti</li>
                <li>Om Namah Shivaya (widely practiced as a public mantra)</li>
            </ul>

            <h2>When initiation helps</h2>
            <p>
                Initiation can help when your practice is stable and you want lineage guidance, pronunciation correction, and deeper transmission.
                But consistency matters more than waiting for the perfect setup.
            </p>

            <p>
                Next step: follow <Link href="/how-to-start-japa">How to Start Japa</Link>, then refine choice with <Link href="/how-to-choose-a-mantra">How to Choose a Mantra</Link>.
            </p>
        </ArticleLayout>
    );
}
