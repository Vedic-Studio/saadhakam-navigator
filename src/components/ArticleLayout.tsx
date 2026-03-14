import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleReadTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";
import { ArticleMeta } from "@/data/articles";
import { buildArticleSchemas } from "@/lib/seo";

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
    const schemas = buildArticleSchemas(meta, pillarLabel, pillarHref);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
            <ArticleReadTracker slug={meta.slug} pillar={meta.pillar} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
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
                        <div className="mb-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400 mb-2">
                                Direct answer
                            </p>
                            <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-0">
                                {meta.aeoAnswer || `${meta.metaDescription} This guide explains ${meta.primaryKeyword} with clear source-grounded distinctions, practical examples, and next-step links for deeper study.`}
                            </p>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {meta.metaDescription}
                        </p>
                    </header>

                    {/* Article Body */}
                    <LongformContent className="mb-16">
                        {children}
                    </LongformContent>

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
                                        <TrackedLink
                                            href={link.href}
                                            eventLabel={`article_related_link:${meta.slug}:${link.href}`}
                                            trackPathName={meta.pillar}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                        >
                                            <span className="text-sm font-medium group-hover:text-orange-400 transition-colors">
                                                {link.text}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                                        </TrackedLink>
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
                            {meta.footerCta?.title || "Ready to find your path?"}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            {meta.footerCta?.description || "Take the Faith Finder, a 5-minute quiz that maps your temperament to the specific tradition, practice, and philosophy within Sanatan Dharma that fits you."}
                        </p>
                        <TrackedLink
                            href={meta.footerCta?.href || "/faith-finder"}
                            eventLabel={`article_cta:${meta.slug}:${meta.footerCta?.href || "/faith-finder"}`}
                            trackPathName={meta.pillar}
                            className="inline-flex items-center justify-center bg-orange-500 text-white hover:bg-orange-600 h-14 px-8 rounded-full text-lg shadow-lg shadow-orange-900/20 transition-transform hover:scale-105"
                        >
                            {meta.footerCta?.label || "Start the Faith Finder"}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </TrackedLink>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
