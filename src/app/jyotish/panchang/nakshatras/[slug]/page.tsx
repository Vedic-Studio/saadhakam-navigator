import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata, buildUrl, buildWebPageSchema } from "@/lib/seo";
import { composeMetaDescription } from "@/lib/seo/metaDescription";
import { getNakshatraBySlug, nakshatras } from "@/data/nakshatras";
import { getGrahaBySlug } from "@/data/grahas";
import { PanchangTodayBlock } from "../../PanchangTodayBlock";
import { buildTodayBlockProps, resolveTodayYmd } from "../../_lib/todayBlock";

export async function generateStaticParams() {
    return nakshatras.map((nakshatra) => ({ slug: nakshatra.slug }));
}

// Statically generate every nakshatra route, revalidating hourly so the live
// "Today" block reflects the current lunar mansion without a redeploy.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const nakshatra = getNakshatraBySlug(slug);
    if (!nakshatra) return {};
    return buildPageMetadata({
        title: `${nakshatra.name} Nakshatra`,
        description: composeMetaDescription(
            [`${nakshatra.name} nakshatra — ruling graha, symbol, and qualities`, nakshatra.description],
            {
                fallback:
                    "Explore the ruling graha, symbol, deity, and contemplative qualities of this lunar mansion on Sadhaka.",
            },
        ),
        path: `/jyotish/panchang/nakshatras/${nakshatra.slug}`,
    });
}

export default async function NakshatraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const nakshatra = getNakshatraBySlug(slug);
    if (!nakshatra) notFound();
    const graha = getGrahaBySlug(nakshatra.rulingGraha);
    const todayBlockProps = buildTodayBlockProps({
        limb: "nakshatra",
        slug: nakshatra.slug,
        entityName: nakshatra.name,
        todayYmd: resolveTodayYmd(),
    });
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Panchang", href: "/jyotish/panchang" },
        { label: "Nakshatras", href: "/jyotish/panchang" },
        { label: nakshatra.name, href: `/jyotish/panchang/nakshatras/${nakshatra.slug}` },
    ];
    const pageUrl = buildUrl(`/jyotish/panchang/nakshatras/${nakshatra.slug}`);

    // Article schema whose subject (`about`) is the lunar mansion itself.
    // Nakshatra data carries no per-record dates, so stable site-level
    // published/updated dates are used, matching the tithi template.
    const articleSchema = buildArticleSchema({
        headline: `${nakshatra.name} Nakshatra: Meaning, Ruling Graha, and Qualities`,
        description: nakshatra.description,
        url: pageUrl,
        datePublished: "2025-01-01",
        dateModified: "2026-03-15",
        section: "Panchang",
        keywords: [`${nakshatra.name} nakshatra`, "Nakshatra", "Panchang", "lunar mansion"],
        about: {
            name: `${nakshatra.name} Nakshatra`,
            type: "Thing",
            description: nakshatra.aeoBlock,
        },
    });

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageSchema({ name: `${nakshatra.name} Nakshatra`, description: nakshatra.description, url: pageUrl, breadcrumbItems })) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(nakshatra.faq)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Nakshatra Guide</p>
                    <h1 className="font-display text-4xl md:text-6xl font-black mb-6">{nakshatra.name}</h1>
                    <p className="text-lg text-muted-foreground mb-8 border-l-4 border-orange-500/30 pl-6">{nakshatra.aeoBlock}</p>
                    <PanchangTodayBlock {...todayBlockProps} />
                    <div className="mb-8"><JyotishDisclaimer compact /></div>
                    <div className="rounded-2xl border border-border/50 bg-card p-6 text-muted-foreground space-y-3">
                        <p><strong className="text-foreground">Symbol:</strong> {nakshatra.symbol}</p>
                        <p><strong className="text-foreground">Span:</strong> {nakshatra.span}</p>
                        {graha && <p><strong className="text-foreground">Ruling graha:</strong> {graha.name}</p>}
                        <p><strong className="text-foreground">Qualities:</strong> {nakshatra.qualities.join(", ")}</p>
                        <p>{nakshatra.description}</p>
                    </div>

                    <section className="mt-12">
                        <h2 className="text-xl font-semibold mb-4">All 27 nakshatras</h2>
                        <ul className="grid gap-1 text-sm sm:grid-cols-2">
                            {nakshatras.map((n) => (
                                <li key={n.slug}>
                                    <Link
                                        href={`/jyotish/panchang/nakshatras/${n.slug}`}
                                        className={n.slug === nakshatra.slug ? "font-semibold text-primary" : "hover:text-primary"}
                                    >
                                        {n.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
