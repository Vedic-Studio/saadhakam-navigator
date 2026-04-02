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
    const sortedArticles = [...articles].sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );

    const collectionSchema = buildCollectionSchema({
        name: "Sadhaka Articles",
        description:
            "Research-grounded articles on Sanatan Dharma, Vedanta, yoga, mantras, sacred texts, and Hindu philosophy.",
        url: buildUrl("/articles"),
        items: sortedArticles.map((a) => ({
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
                            {articles.length} research-grounded guides on Vedanta, yoga, meditation,
                            mantras, sacred texts, and Hindu philosophy for readers who want clear
                            doctrinal substance, practical orientation, and attributable claims.
                        </p>
                    </header>

                    <section className="grid gap-4 md:grid-cols-3 mb-10" aria-label="Article collection overview">
                        <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                            <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">
                                What you will find
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Topic clusters that move from first-principles philosophy to daily
                                practice, scripture study, and major traditions.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                            <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">
                                How to use this hub
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Start with a category filter if you already know your intent, or scan
                                the full list chronologically to see the latest additions.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                            <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">
                                Editorial standard
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Every article is written to be specific, attributable, and useful for
                                real study rather than vague inspiration.
                            </p>
                        </div>
                    </section>

                    <ArticleGrid articles={sortedArticles} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
