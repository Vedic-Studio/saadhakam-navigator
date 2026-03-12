import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("platos-cave-and-maya")!;

export const metadata = buildArticleMetadata(meta);

export default function PlatosCaveAndMayaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Plato's cave and Vedantic <em>maya</em> are often compared because both describe a human condition of mistaken seeing. In
                Plato's <em>Republic</em>, prisoners mistake shadows for reality; in Vedanta, the mind mistakes name-form appearance for
                ultimate truth. Both frameworks begin with the same warning: normal perception is not neutral—it is conditioned.
            </p>

            <h2>Where the Parallel Is Strong</h2>
            <p>
                The cave model and maya doctrine both emphasize epistemic humility. What appears obvious may be derivative, projected,
                or partial. They also agree that transformation is costly: the move from conditioned perception to truth creates friction
                with familiar identity and social norms.
            </p>

            <h2>Where Vedanta Goes Further</h2>
            <p>
                Plato's ascent is primarily about true knowledge of enduring forms. Vedanta includes knowledge, but asks a deeper
                question: who is the knower? This shifts the inquiry from "what is real?" to "what is the nature of consciousness that
                knows reality?" That is why <Link href="/what-is-maya">maya</Link> is paired with Atman-Brahman inquiry.
            </p>

            <h2>Liberation: Return vs Recognition</h2>
            <p>
                In Plato, liberation culminates in returning to the cave to educate others. In Advaita Vedanta, liberation culminates in
                recognition of one's true nature as non-separate awareness. Ethical service remains important, but it arises from
                ontological clarity rather than civic obligation alone.
            </p>

            <h2>Modern Application</h2>
            <p>
                Today the "cave" can mean algorithmic feeds, ideological bubbles, identity narratives, and compulsive productivity
                frameworks. Vedantic practice adds a stabilizing step: before correcting the world, examine the structure of your own
                seeing. This bridges classical philosophy with practical contemplative life.
            </p>
        </ArticleLayout>
    );
}
