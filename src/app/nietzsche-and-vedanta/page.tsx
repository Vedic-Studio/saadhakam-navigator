import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("nietzsche-and-vedanta")!;

export const metadata = buildArticleMetadata(meta);

export default function NietzscheAndVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Nietzsche and Vedanta both challenge passive conformity, but they diagnose the human problem differently. Nietzsche sees
                reactive morality and ressentiment as central pathologies. Vedanta sees misidentification with ego-personality as the
                root confusion. Both demand transformation; they disagree on what is ultimately transformed.
            </p>

            <h2>Shared Pressure Against Mediocrity</h2>
            <p>
                Nietzsche's critique of herd mentality mirrors Vedanta's warning against unconscious social identity. In both systems,
                inherited scripts must be examined, not obeyed mechanically. This is why many modern readers use Nietzschean honesty as
                preparatory discipline before deeper contemplative work.
            </p>

            <h2>Will to Power vs Freedom from Ego</h2>
            <p>
                Nietzsche emphasizes life-affirmation through creative power. Vedanta emphasizes freedom through disidentification from
                the claiming-self. One intensifies authorship; the other interrogates the author. In Advaita, the endpoint is not
                stronger ego-structure but recognition of awareness prior to ego.
            </p>

            <h2>Meaning, Suffering, and Transcendence</h2>
            <p>
                Nietzsche seeks a courageous yes to becoming. Vedanta seeks stable knowledge of the Self beneath becoming. These are not
                mutually useless: one sharpens existential courage, the other addresses metaphysical ground. Together they can prevent
                both sentimental spirituality and nihilistic collapse.
            </p>

            <p>
                Continue with <Link href="/existentialism-and-vedanta">Existentialism and Vedanta</Link> to see how this tension plays
                out in anxiety, meaning, and modern identity.
            </p>
        </ArticleLayout>
    );
}
