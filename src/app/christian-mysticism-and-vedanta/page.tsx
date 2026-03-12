import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("christian-mysticism-and-vedanta")!;

export const metadata = buildArticleMetadata(meta);

export default function ChristianMysticismAndVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Christian mysticism and Vedanta meet in contemplative seriousness: both insist that transformation requires
                interior reorientation, not just external conformity. Yet they operate inside different theological grammars.
            </p>

            <h2>Real Areas of Resonance</h2>
            <ul>
                <li>Interior prayer and contemplative silence.</li>
                <li>Ego-softening through surrender, humility, and discipline.</li>
                <li>Language of union, purification, and spiritual maturation.</li>
            </ul>

            <h2>Important Differences</h2>
            <p>
                Vedantic non-dual realization and Christian union-with-God discourse can sound similar, but differ in doctrinal
                architecture around personhood, grace, and creator-creation relation. Respectful comparison requires preserving
                these differences.
            </p>

            <h2>A Practical Comparative Path</h2>
            <p>
                Read one primary text from each stream and keep conceptual boundaries clear. For many readers,
                <Link href="/can-i-practice-vedanta-without-converting"> this non-conversion guide</Link> is the right starting point.
            </p>
        </ArticleLayout>
    );
}
