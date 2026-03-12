import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("how-to-read-upanishads-western-beginner")!;

export const metadata = buildArticleMetadata(meta);

export default function HowToReadUpanishadsWesternBeginnerPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Sacred Texts" pillarHref="/sacred-texts-teachings">
            <p>
                Most beginners fail with the Upanishads for one reason: they try to read them like modern linear philosophy.
                Upanishadic teaching is dialogic, symbolic, compressed, and contemplative. You read slowly, not aggressively.
            </p>

            <h2>A Beginner Sequence That Works</h2>
            <ol>
                <li>Start with orientation in <Link href="/what-are-the-upanishads">What Are the Upanishads?</Link>.</li>
                <li>Read one short text first (Isha or Katha).</li>
                <li>Choose one translation and stay with it for 30 days.</li>
                <li>Journal one practical insight per reading session.</li>
            </ol>

            <h2>How to Avoid Overwhelm</h2>
            <p>
                Treat each passage as contemplative instruction, not trivia. Ask: what identity assumption is this verse
                challenging? what does this imply for fear, attachment, or agency? Pair with foundational context from
                <Link href="/what-is-vedanta"> What is Vedanta?</Link>.
            </p>

            <h2>Do You Need Sanskrit First?</h2>
            <p>
                No. Sanskrit refines nuance, but reliable translation plus disciplined reflection is enough to begin.
                Depth comes from regular encounter and application, not from collecting commentaries faster than you can digest.
            </p>
        </ArticleLayout>
    );
}
