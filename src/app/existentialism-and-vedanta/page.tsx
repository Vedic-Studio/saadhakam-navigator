import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("existentialism-and-vedanta")!;

export const metadata = buildArticleMetadata(meta);

export default function ExistentialismAndVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Existentialism and Vedanta meet at the edge of human anxiety: mortality, freedom, meaning, and alienation. Existential
                thinkers foreground lived urgency in a seemingly indifferent world. Vedanta accepts this urgency but asks whether the
                anxious self is being correctly identified.
            </p>

            <h2>Meaning: Constructed or Discovered?</h2>
            <p>
                Existentialism often treats meaning as something authored through choice and responsibility. Vedanta suggests meaning is
                uncovered when confusion about identity dissolves. In this framing, ethical action still matters, but it arises from
                clarity rather than compensatory self-construction.
            </p>

            <h2>Anxiety as Signal, Not Failure</h2>
            <p>
                Existential dread can be read as a breakdown of inherited narratives. Vedanta interprets this as an opening: when outer
                structures fail, one can investigate the witness of fear itself. That move links existential honesty with contemplative
                rigor.
            </p>

            <h2>Practical Bridge for Modern Seekers</h2>
            <p>
                Use existentialism to sharpen responsibility and psychological honesty. Use Vedanta to examine the ontological status of
                the one who claims, suffers, and seeks. This combined approach is often more stable than either abstract philosophy or
                technique-only spirituality.
            </p>

            <p>
                For neighboring comparisons, continue with <Link href="/nietzsche-and-vedanta">Nietzsche and Vedanta</Link> and
                <Link href="/carl-jung-and-vedanta"> Carl Jung and Vedanta</Link>.
            </p>
        </ArticleLayout>
    );
}
