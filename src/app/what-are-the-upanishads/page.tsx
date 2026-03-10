import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("what-are-the-upanishads")!;

export const metadata = buildArticleMetadata(meta);

export default function WhatAreTheUpanishadsPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Sacred Texts" pillarHref="/sacred-texts-teachings">
            <p>
                The Upanishads are the philosophical heart of the Vedic tradition. They ask one central question: what is ultimately real, and who are you beneath body, mind, and story?
            </p>
            <p>
                If you are spiritually curious but overwhelmed, start with one beginner-friendly Upanishad and one commentary — not ten books at once.
            </p>

            <h2>Best for / Not best for / Where to start</h2>
            <ul>
                <li><strong>Best for:</strong> seekers interested in consciousness, identity, and contemplative philosophy.</li>
                <li><strong>Not best for:</strong> readers looking for quick motivational quotes without reflection.</li>
                <li><strong>Where to start:</strong> Isha or Katha Upanishad with clear modern commentary.</li>
            </ul>

            <h2>What the Upanishads actually do</h2>
            <p>
                They move from ritual to insight. Earlier Vedic material emphasizes sacred action; the Upanishads emphasize direct understanding of Atman (Self), Brahman (ultimate reality), and liberation.
            </p>

            <h2>How to read them without getting lost</h2>
            <ul>
                <li>Read short passages slowly (10–20 lines).</li>
                <li>Note one core claim and one practical implication.</li>
                <li>Pair reading with silence or journaling for 10 minutes.</li>
            </ul>

            <p>
                Continue with <Link href="/what-is-vedanta">What is Vedanta?</Link> and then <Link href="/best-bhagavad-gita-translation-for-beginners">Best Bhagavad Gita Translation for Beginners</Link> for a practical study path.
            </p>
        </ArticleLayout>
    );
}
