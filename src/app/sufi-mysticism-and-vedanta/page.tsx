import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("sufi-mysticism-and-vedanta")!;

export const metadata = buildArticleMetadata(meta);

export default function SufiMysticismAndVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Sufi mysticism and Vedanta both point inward, but through distinct lineages and theological vocabularies.
                Each offers disciplined methods for softening ego, refining attention, and deepening sacred orientation.
            </p>

            <h2>Shared Practice Logic</h2>
            <ul>
                <li>Sacred repetition (zikr and japa) as attentional purification.</li>
                <li>Devotional love as method, not sentimentality.</li>
                <li>Transformation through disciplined remembrance, not occasional inspiration.</li>
            </ul>

            <h2>Difference Matters</h2>
            <p>
                Unity-language appears in both traditions, but doctrinal framing differs by lineage and theology.
                Comparative work is most useful when it increases clarity rather than collapsing traditions into one abstraction.
            </p>

            <h2>Where to Continue</h2>
            <p>
                If you are entering this through a Western lens, pair this with
                <Link href="/western-philosophy-and-vedanta"> the broader bridge page</Link>, then move into disciplined
                practice via <Link href="/how-to-start-japa">japa</Link>.
            </p>
        </ArticleLayout>
    );
}
