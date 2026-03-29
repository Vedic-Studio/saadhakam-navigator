import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { articles } from "@/data/articles";
import {
    buildCollectionSchema,
    buildPageMetadata,
    buildUrl,
    buildBreadcrumbSchema,
} from "@/lib/seo";
import { ArticleGrid } from "./ArticleGrid";

export const metadata = buildPageMetadata({
    title: "Articles on Sanatan Dharma, Vedanta, and Hindu Philosophy",
    description:
        "Research-grounded articles on Vedanta, yoga, meditation, mantras, sacred texts, and Hindu philosophy for sincere seekers.",
    path: "/articles",
});

export default function ArticlesHubPage() {
    const collectionSchema = buildCollectionSchema({
        name: "Sadhaka Articles",
        description:
            "Research-grounded articles on Sanatan Dharma, Vedanta, yoga, mantras, sacred texts, and Hindu philosophy.",
        url: buildUrl("/articles"),
        items: articles.map((a) => ({
            name: a.title,
            url: buildUrl(a.route),
            description: a.metaDescription,
        })),
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Articles", href: "/articles" },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-6xl mx-auto">
                    <header className="mb-14">
                        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight leading-[0.9] mb-6">
                            Articles
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                            {articles.length} guides on Vedanta, yoga, meditation, mantras, sacred
                            texts, and Hindu philosophy. Each article is research-grounded and
                            written for readers who want substance over sentiment.
                        </p>
                    </header>

                    <ArticleGrid articles={articles} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
