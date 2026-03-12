import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("vedas-vs-upanishads-explained")!;

export const metadata = buildArticleMetadata(meta);

export default function VedasVsUpanishadsExplainedPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Sacred Texts" pillarHref="/sacred-texts-teachings">
            <p>
                The Vedas and Upanishads are not competing scriptures. The Upanishads are the culminating philosophical
                sections of the broader Vedic corpus. Think structure, not rivalry.
            </p>

            <h2>Simple Structural Difference</h2>
            <ul>
                <li><strong>Vedas:</strong> large scriptural body including hymns, ritual, and cosmological frameworks.</li>
                <li><strong>Upanishads:</strong> contemplative-philosophical culmination focused on Self and ultimate reality.</li>
            </ul>

            <h2>Why This Distinction Matters</h2>
            <p>
                Without this clarity, beginners either reduce Hindu scripture to ritual formalism or jump into metaphysics
                without context. A cleaner path is: orientation through
                <Link href="/vedas-upanishads-bhagavad-gita-guide"> Vedas-Upanishads-Gita overview</Link>, then focused
                Upanishadic reading.
            </p>

            <h2>Where Vedanta Fits</h2>
            <p>
                Vedanta literally means “end of the Veda.” It is both textual location and philosophical culmination.
                For practical continuity, pair this page with <Link href="/what-is-vedanta">What is Vedanta?</Link> and
                <Link href="/how-to-read-upanishads-western-beginner"> how to read Upanishads</Link>.
            </p>
        </ArticleLayout>
    );
}
