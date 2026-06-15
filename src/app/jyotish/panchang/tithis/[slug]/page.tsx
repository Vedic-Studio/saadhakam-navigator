import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata, buildUrl, buildWebPageSchema } from "@/lib/seo";
import { composeMetaDescription } from "@/lib/seo/metaDescription";
import { getTithiBySlug, resolveTithiSeo, tithis } from "@/lib/jyotish";
import { PanchangTodayBlock } from "../../PanchangTodayBlock";
import { buildTodayBlockProps, resolveTodayYmd } from "../../_lib/todayBlock";

export async function generateStaticParams() {
    return tithis.map((tithi) => ({ slug: tithi.slug }));
}

// Statically generate every tithi route, then revalidate hourly so the live
// "Today" block reflects the current civil day without a redeploy. The static
// content (meaning, deity, FAQ) is unchanged between revalidations.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tithi = getTithiBySlug(slug);
    if (!tithi) return {};
    const seo = resolveTithiSeo(tithi);
    return buildPageMetadata({
        title: seo.title,
        description: tithi.seoDescription
            ? seo.description
            : composeMetaDescription(
                  [`${tithi.name} tithi — meaning, significance, and practice`, tithi.description],
                  {
                      fallback:
                          "Explore the meaning, presiding deity, and contemplative guidance for this lunar day on Sadhaka.",
                  },
              ),
        path: `/jyotish/panchang/tithis/${tithi.slug}`,
    });
}

export default async function TithiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tithi = getTithiBySlug(slug);
    if (!tithi) notFound();
    const todayBlockProps = buildTodayBlockProps({
        limb: "tithi",
        slug: tithi.slug,
        entityName: tithi.name,
        todayYmd: resolveTodayYmd(),
    });
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Panchang", href: "/jyotish/panchang" },
        { label: "Tithis", href: "/jyotish/panchang" },
        { label: tithi.name, href: `/jyotish/panchang/tithis/${tithi.slug}` },
    ];
    const pageUrl = buildUrl(`/jyotish/panchang/tithis/${tithi.slug}`);

    // Article schema whose subject (`about`) is the lunar day itself. The
    // tithi is the date entity this page principally describes. Tithi data
    // carries no per-record dates, so stable site-level published/updated
    // dates are used. WebPage / Breadcrumb / FAQPage are already emitted above
    // and intentionally not duplicated here.
    const articleSchema = buildArticleSchema({
        headline: `${tithi.name} Tithi: Meaning, Deity, and Significance`,
        description: tithi.description,
        url: pageUrl,
        datePublished: "2025-01-01",
        dateModified: "2026-03-15",
        section: "Panchang",
        keywords: [`${tithi.name} tithi`, `${tithi.paksha} Paksha`, "Panchang", "lunar day"],
        about: {
            name: `${tithi.name} Tithi`,
            type: "Thing",
            description: tithi.meaning,
        },
    });

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageSchema({ name: `${tithi.name} Tithi`, description: tithi.description, url: buildUrl(`/jyotish/panchang/tithis/${tithi.slug}`), breadcrumbItems })) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(tithi.faq)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Tithi Guide</p>
                    <h1 className="font-display text-4xl md:text-6xl font-black mb-6">{tithi.name}</h1>
                    <p className="text-lg text-muted-foreground mb-8 border-l-4 border-orange-500/30 pl-6">{tithi.aeoBlock}</p>
                    <PanchangTodayBlock {...todayBlockProps} />
                    {tithi.seoFacts && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-3">{tithi.seoFacts.heading}</h2>
                            <p className="text-muted-foreground leading-relaxed">{tithi.seoFacts.body}</p>
                        </section>
                    )}
                    <div className="mb-8"><JyotishDisclaimer compact /></div>
                    <div className="rounded-2xl border border-border/50 bg-card p-6 text-muted-foreground space-y-3">
                        <p><strong className="text-foreground">Meaning:</strong> {tithi.meaning}</p>
                        <p><strong className="text-foreground">Paksha:</strong> {tithi.paksha}</p>
                        <p><strong className="text-foreground">Deity:</strong> {tithi.deity}</p>
                        <p>{tithi.description}</p>
                    </div>

                    <section className="mt-12">
                        <h2 className="text-xl font-semibold mb-4">All 30 tithis</h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {(["shukla", "krishna"] as const).map((paksha) => (
                                <div key={paksha}>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                        {paksha === "shukla" ? "Shukla Paksha (Waxing)" : "Krishna Paksha (Waning)"}
                                    </h3>
                                    <ul className="space-y-1 text-sm">
                                        {tithis
                                            .filter((t) => t.paksha.toLowerCase().includes(paksha))
                                            .map((t) => (
                                                <li key={t.slug}>
                                                    <Link
                                                        href={`/jyotish/panchang/tithis/${t.slug}`}
                                                        className={
                                                            t.slug === tithi.slug
                                                                ? "font-semibold text-primary"
                                                                : "hover:text-primary"
                                                        }
                                                    >
                                                        {t.name}
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}