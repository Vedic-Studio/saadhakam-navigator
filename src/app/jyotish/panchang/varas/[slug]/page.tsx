import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata, buildUrl, buildWebPageSchema } from "@/lib/seo";
import { composeMetaDescription } from "@/lib/seo/metaDescription";
import { getGrahaBySlug, getVaraBySlug, varas } from "@/lib/jyotish";
import { resolveVaraSeo } from "@/data/panchang";
import { PanchangTodayBlock } from "../../PanchangTodayBlock";
import { buildTodayBlockProps, resolveTodayYmd } from "../../_lib/todayBlock";

export async function generateStaticParams() {
    return varas.map((vara) => ({ slug: vara.slug }));
}

// Statically generate every vara route, revalidating hourly so the live
// "Today" block tracks the current weekday without a redeploy.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const vara = getVaraBySlug(slug);
    if (!vara) return {};
    const seo = resolveVaraSeo(vara);
    return buildPageMetadata({
        title: seo.title,
        description: vara.seoDescription
            ? seo.description
            : composeMetaDescription(
                  [`${vara.name} vara — ruling graha, significance, and practice`, vara.description],
                  {
                      fallback:
                          "Explore the ruling graha, presiding qualities, and contemplative guidance for this weekday on Sadhaka.",
                  },
              ),
        path: `/jyotish/panchang/varas/${vara.slug}`,
    });
}

export default async function VaraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const vara = getVaraBySlug(slug);
    if (!vara) notFound();
    const graha = getGrahaBySlug(vara.rulingGraha);
    const todayBlockProps = buildTodayBlockProps({
        limb: "vara",
        slug: vara.slug,
        entityName: vara.name,
        todayYmd: resolveTodayYmd(),
    });
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Panchang", href: "/jyotish/panchang" },
        { label: "Varas", href: "/jyotish/panchang" },
        { label: vara.name, href: `/jyotish/panchang/varas/${vara.slug}` },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageSchema({ name: `${vara.name} Vara`, description: vara.description, url: buildUrl(`/jyotish/panchang/varas/${vara.slug}`), breadcrumbItems })) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(vara.faq)) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Vara Guide</p>
                    <h1 className="font-display text-4xl md:text-6xl font-black mb-6">{vara.name}</h1>
                    <p className="text-lg text-muted-foreground mb-8 border-l-4 border-orange-500/30 pl-6">{vara.aeoBlock}</p>
                    <PanchangTodayBlock {...todayBlockProps} />
                    {vara.seoFacts && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-3">{vara.seoFacts.heading}</h2>
                            <p className="text-muted-foreground leading-relaxed">{vara.seoFacts.body}</p>
                        </section>
                    )}
                    <div className="mb-8"><JyotishDisclaimer compact /></div>
                    <div className="rounded-2xl border border-border/50 bg-card p-6 text-muted-foreground space-y-3">
                        <p>{vara.description}</p>
                        {graha && <p><strong className="text-foreground">Ruling graha:</strong> {graha.name}</p>}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}