import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("consciousness-hard-problem-vedanta")!;

export const metadata = buildArticleMetadata(meta);

export default function ConsciousnessHardProblemVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                The hard problem asks why subjective experience exists at all, not just how cognition computes information. Vedanta
                treats this as a framing issue: consciousness is not produced by matter but is the condition in which matter appears,
                is known, and is interpreted.
            </p>

            <h2>Two Different Starting Assumptions</h2>
            <p>
                Materialist models start with physical processes and attempt to explain awareness as an emergent output. Vedanta starts
                with undeniable first-person awareness and asks how apparent limitation and multiplicity arise within it.
            </p>

            <h2>Why the Debate Persists</h2>
            <p>
                Third-person science excels at correlations and prediction. It is less decisive on the ontological status of subjectivity.
                Vedanta does not reject science; it argues for epistemic pluralism: empirical methods for objects, contemplative methods
                for direct examination of awareness.
            </p>

            <h2>Practical Implication</h2>
            <p>
                This is not abstract metaphysics alone. Your implicit consciousness model shapes how you approach suffering, death,
                identity, ethics, and contemplative practice. That is why this debate belongs in serious spiritual education.
            </p>

            <p>
                Continue with <Link href="/western-philosophy-and-vedanta">Western Philosophy and Vedanta</Link> and
                <Link href="/neuroscience-of-meditation-hinduism"> Neuroscience of Meditation and Hinduism</Link>.
            </p>
        </ArticleLayout>
    );
}
