import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("vedanta-vs-buddhism")!;

export const metadata = buildArticleMetadata(meta);

export default function VedantaVsBuddhismPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Vedanta and Buddhism are often treated as interchangeable “Eastern non-duality.” That shortcut hides both
                traditions. They share depth, discipline, and a rigorous diagnosis of suffering — but differ in crucial metaphysical claims.
            </p>

            <h2>Where They Converge</h2>
            <ul>
                <li>Both identify misperception as root of suffering.</li>
                <li>Both prioritize direct contemplative insight over mere belief.</li>
                <li>Both train ethics, attention, and deconditioning of reactive mind patterns.</li>
            </ul>

            <h2>Where They Diverge</h2>
            <p>
                In Advaita Vedanta, ultimate identity is Atman-Brahman. In many Buddhist schools, no permanent self-essence
                is affirmed (Anatman). This is not a minor vocabulary variation — it reshapes metaphysical interpretation,
                soteriology, and doctrinal language.
            </p>

            <h2>How to Study Without Confusion</h2>
            <p>
                Learn each tradition on its own terms first. Then compare. Start with
                <Link href="/what-is-vedanta"> Vedanta basics</Link> and only then perform cross-reading with Buddhist concepts.
                Precision protects depth.
            </p>
        </ArticleLayout>
    );
}
