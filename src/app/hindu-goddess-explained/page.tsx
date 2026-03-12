import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("hindu-goddess-explained")!;

export const metadata = buildArticleMetadata(meta);

export default function HinduGoddessExplainedPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Spiritual Traditions" pillarHref="/spiritual-traditions-paths">
            <p>
                When people ask what a Hindu goddess is, the shortest accurate answer is this: many goddesses, one
                divine feminine principle. In Sanskrit terms, that principle is often called <em>Devi</em> or <em>Shakti</em>
                — the living power through which consciousness becomes cosmos, body, relationship, and transformation.
            </p>

            <h2>One Devi, Many Forms</h2>
            <p>
                Traditions may approach goddess worship devotionally, philosophically, ritually, or psychologically.
                But the common thread is coherence: <Link href="/deities/durga">Durga</Link>,
                <Link href="/deities/lakshmi"> Lakshmi</Link>, <Link href="/deities/saraswati">Saraswati</Link>,
                <Link href="/deities/kali"> Kali</Link>, and <Link href="/deities/parvati">Parvati</Link> are not random
                figures. They map distinct dimensions of sacred power.
            </p>

            <h2>How to Understand Major Goddesses Quickly</h2>
            <ul>
                <li><strong>Durga:</strong> protective strength and boundary power.</li>
                <li><strong>Lakshmi:</strong> auspicious prosperity and ethical abundance.</li>
                <li><strong>Saraswati:</strong> knowledge, language, and refinement of mind.</li>
                <li><strong>Kali:</strong> radical transformation and ego-cutting grace.</li>
                <li><strong>Parvati:</strong> relational devotion, tapas, and sacred household balance.</li>
            </ul>

            <h2>Is Goddess Worship Symbolic or Literal?</h2>
            <p>
                Both approaches are valid inside the tradition. Some practitioners experience goddesses as archetypal
                symbolic frameworks for inner development. Others experience direct devotional relationship through puja,
                mantra, and pilgrimage. In practical life, these often overlap.
            </p>

            <h2>How Beginners Can Start Responsibly</h2>
            <p>
                Start with one form that resonates, not all forms at once. Read one profile deeply in the
                <Link href="/deities"> deities hub</Link>, choose a simple associated mantra, and build consistency.
                Depth comes from repetition and reverence, not content volume.
            </p>
        </ArticleLayout>
    );
}
