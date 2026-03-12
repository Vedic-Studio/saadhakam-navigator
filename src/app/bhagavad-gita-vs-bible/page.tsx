import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("bhagavad-gita-vs-bible")!;

export const metadata = buildArticleMetadata(meta);

export default function BhagavadGitaVsBiblePage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Sacred Texts" pillarHref="/sacred-texts-teachings">
            <p>
                Comparing the Bhagavad Gita and the Bible is best done with respect, not reduction. Both are civilizational
                anchors, but they emerge from different theological architectures and scriptural ecosystems.
            </p>

            <h2>Key Similarities</h2>
            <ul>
                <li>Both guide ethical life under pressure.</li>
                <li>Both shape devotional identity and moral imagination.</li>
                <li>Both are read liturgically and personally across generations.</li>
            </ul>

            <h2>Key Differences</h2>
            <p>
                The <Link href="/bhagavad-gita-complete-guide">Bhagavad Gita</Link> is a 700-verse dialogue embedded in
                epic context, while the Bible is a larger canon of many books and genres. Gita teaching emphasizes yoga paths
                and liberation through disciplined realization; Biblical traditions often emphasize covenantal relation,
                grace, and salvation history.
            </p>

            <h2>Can They Be Studied Together?</h2>
            <p>
                Yes. Comparative study can deepen sincerity in both traditions when differences are honored rather than flattened.
                For seekers asking about non-conversion access, see
                <Link href="/can-i-practice-vedanta-without-converting"> Vedanta without converting</Link>.
            </p>
        </ArticleLayout>
    );
}
