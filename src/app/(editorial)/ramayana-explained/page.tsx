import Link from "next/link";
import { requireArticleMeta } from "@/features/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = requireArticleMeta("ramayana-explained");

export const metadata = buildArticleMetadata(meta);

export default function RamayanaExplainedPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Sacred Texts" pillarHref="/sacred-texts-teachings">
            <p>
                The Ramayana is one of the foundational epics of Indian civilization. At story level, it follows exile,
                abduction, alliance, battle, and return. At spiritual level, it explores how dharma is lived when every
                available choice is emotionally costly.
            </p>

            <h2>The Essential Story Arc</h2>
            <ul>
                <li>Rama is exiled despite being rightful heir.</li>
                <li>Sita and Lakshmana accompany him into forest life.</li>
                <li>Ravana abducts Sita, triggering the central crisis.</li>
                <li>Hanuman becomes the decisive bridge of devotion and action.</li>
                <li>Rama’s alliance restores order after intense moral conflict.</li>
            </ul>

            <h2>Main Characters as Ethical Archetypes</h2>
            <p>
                <Link href="/deities/rama">Rama</Link> represents principled action under pressure,
                <Link href="/deities/sita"> Sita</Link> embodies dignity and strength,
                <Link href="/deities/hanuman"> Hanuman</Link> models egoless service, and Ravana demonstrates the
                collapse that follows brilliance without restraint.
            </p>

            <h2>When Did the Ramayana Take Place?</h2>
            <p>
                Archaeoastronomical analysis by Nilesh Oak dates the Ramayana events to approximately 12,209 BCE,
                based on over 200 astronomical observations embedded in the text. Explore the full
                {" "}<Link href="/sanatan-history#timeline">evidence-based timeline of Sanatan history</Link> for
                how the Ramayana fits within the broader arc of Indian civilization.
            </p>

            <h2>Why the Ramayana Still Matters</h2>
            <p>
                Modern readers often expect morality tales with clean outcomes. The Ramayana offers something harder and
                truer: layered duties, imperfect situations, and the need for discernment rather than slogans.
                That is exactly why it remains alive in contemporary ethical and spiritual life.
            </p>
        </ArticleLayout>
    );
}
