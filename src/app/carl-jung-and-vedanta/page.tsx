import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("carl-jung-and-vedanta")!;

export const metadata = buildArticleMetadata(meta);

export default function CarlJungAndVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Carl Jung and Vedanta are often brought together because both map inner life beyond surface personality. Jung offers a
                rigorous language for psyche, complexes, and symbolic integration. Vedanta offers a metaphysical inquiry into the
                witnessing consciousness that is not reducible to psychological content.
            </p>

            <h2>Individuation and Self-Inquiry</h2>
            <p>
                Jung's individuation process integrates fragmented psyche into relative wholeness. Vedantic inquiry asks a different
                question: who is aware of all psychic movement? Individuation can stabilize the instrument; Vedanta then examines the
                nature of the experiencer.
            </p>

            <h2>Shadow and Spiritual Bypassing</h2>
            <p>
                Jung's shadow framework helps prevent premature spiritual claims. Without shadow work, seekers may use non-dual language
                to avoid unresolved fear, anger, or shame. This is why psychological honesty strengthens—not weakens—serious Vedantic
                practice.
            </p>

            <h2>Archetypes and Deity Symbolism</h2>
            <p>
                Jungian archetypes and Hindu deity forms can productively dialogue at the symbolic level. For example, Shiva can be read
                psychologically as transformative force and philosophically as pointer to consciousness. Symbolic literacy and metaphysical
                clarity can coexist.
            </p>

            <p>
                If this bridge is useful, continue with <Link href="/what-is-maya">What is Maya?</Link> and
                <Link href="/deities/shiva"> Who is Shiva?</Link>.
            </p>
        </ArticleLayout>
    );
}
