import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("can-i-practice-vedanta-without-converting")!;

export const metadata = buildArticleMetadata(meta);

export default function CanPracticeVedantaWithoutConvertingPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Yes — you can practice Vedanta without converting. Vedanta is a path of inquiry into consciousness, identity, and reality, not a conversion ritual.
                If you are sincere, disciplined, and open to learning, you can begin today.
            </p>
            <p>
                A practical rule: treat Vedanta as a living discipline, not an aesthetic identity. Read a small amount daily, reflect, and apply one insight in ordinary life.
            </p>

            <h2>Best for / Not best for / Where to start</h2>
            <ul>
                <li><strong>Best for:</strong> analytical seekers, contemplative readers, and people asking “Who am I beyond roles?”</li>
                <li><strong>Not best for:</strong> people looking only for instant mystical experiences without study or consistency.</li>
                <li><strong>Where to start:</strong> Bhagavad Gita chapters 2 and 12, plus a simple daily reflection practice.</li>
            </ul>

            <h2>What Vedanta asks from you</h2>
            <p>
                Vedanta asks for three things: honest inquiry, consistency, and humility. You do not need a new label, but you do need daily attention.
                Start with 20 minutes: 10 minutes reading, 10 minutes reflection.
            </p>

            <h2>What to avoid in the first month</h2>
            <ul>
                <li>Trying to debate advanced metaphysics before establishing a daily practice.</li>
                <li>Collecting terminology without applying anything to your emotional life.</li>
                <li>Using “everything is one” language to avoid responsibility.</li>
            </ul>

            <p>
                Next step: read <Link href="/what-is-vedanta">What is Vedanta?</Link>, then continue with <Link href="/advaita-vedanta-explained">Advaita Vedanta Explained</Link>.
                If you want a practical daily entry point, use <Link href="/starting-spiritual-practice">Starting Spiritual Practice</Link>.
            </p>
        </ArticleLayout>
    );
}
