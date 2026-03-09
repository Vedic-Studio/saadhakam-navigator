import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleMeta } from "@/data/articles";

interface ArticleLayoutProps {
    meta: ArticleMeta;
    pillarLabel: string;
    pillarHref: string;
    children: React.ReactNode; // long-form article body
}

export function ArticleLayout({
    meta,
    pillarLabel,
    pillarHref,
    children,
}: ArticleLayoutProps) {
    const pageUrl = `https://opensadhaka.com${meta.route}`;
    const pillarUrl = `https://opensadhaka.com${pillarHref}`;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: meta.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: meta.title,
        description: meta.metaDescription,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: meta.publishDate,
        dateModified: meta.publishDate,
        articleSection: pillarLabel,
        keywords: [meta.primaryKeyword],
        about: [{ "@type": "Thing", name: meta.primaryKeyword }],
        isPartOf: {
            "@type": "WebPage",
            name: pillarLabel,
            url: pillarUrl,
        },
        inLanguage: "en",
        author: { "@type": "Organization", name: "Sadhaka" },
        publisher: { "@type": "Organization", name: "Sadhaka", url: "https://opensadhaka.com" },
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <article className="container-padding max-w-3xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: pillarLabel, href: pillarHref },
                            { label: meta.title, href: meta.route },
                        ]}
                    />

                    {/* Article Header */}
                    <header className="mb-12 mt-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                                {pillarLabel}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground text-sm">
                                <Clock className="w-3.5 h-3.5" />
                                {meta.readingTime} min read
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
                            {meta.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {meta.metaDescription}
                        </p>
                    </header>

                    {/* Article Body */}
                    <div className="prose prose-invert prose-orange max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5 prose-h3:text-2xl prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-li:text-lg prose-strong:text-foreground prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300 mb-16">
                        {children}
                    </div>

                    {/* Related Links */}
                    {meta.relatedLinks.length > 0 && (
                        <div className="mb-16 p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
                            <h2 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-orange-400" />
                                Explore Further
                            </h2>
                            <ul className="space-y-3">
                                {meta.relatedLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                        >
                                            <span className="text-sm font-medium group-hover:text-orange-400 transition-colors">
                                                {link.text}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* FAQ Section */}
                    <section className="mb-16">
                        <h2 className="font-display text-3xl font-bold mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            {meta.faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl border border-border/50 bg-card"
                                >
                                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-orange-950/30 to-background rounded-3xl border border-orange-900/30 p-10 text-center">
                        <h2 className="text-3xl font-display font-bold mb-4">
                            Ready to find your path?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Take the Faith Finder — a 5-minute quiz that maps your temperament to the specific tradition, practice, and philosophy within Sanatan Dharma that fits you.
                        </p>
                        <Link href="/faith-finder">
                            <Button
                                size="lg"
                                className="bg-orange-500 text-white hover:bg-orange-600 h-14 px-8 rounded-full text-lg shadow-lg shadow-orange-900/20 transition-transform hover:scale-105"
                            >
                                Start the Faith Finder
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
