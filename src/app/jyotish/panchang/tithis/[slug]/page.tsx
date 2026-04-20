import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata, buildUrl, buildWebPageSchema } from "@/lib/seo";
import { composeMetaDescription } from "@/lib/seo/metaDescription";
import { getTithiBySlug, tithis } from "@/lib/jyotish";

export async function generateStaticParams() {
    return tithis.map((tithi) => ({ slug: tithi.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tithi = getTithiBySlug(slug);
    if (!tithi) return {};
    return buildPageMetadata({
        title: `${tithi.name} Tithi`,
        description: composeMetaDescription(
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
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Panchang", href: "/jyotish/panchang" },
        { label: "Tithis", href: "/jyotish/panchang" },
        { label: tithi.name, href: `/jyotish/panchang/tithis/${tithi.slug}` },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageSchema({ name: `${tithi.name} Tithi`, description: tithi.description, url: buildUrl(`/jyotish/panchang/tithis/${tithi.slug}`), breadcrumbItems })) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(tithi.faq)) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Tithi Guide</p>
                    <h1 className="font-display text-4xl md:text-6xl font-black mb-6">{tithi.name}</h1>
                    <p className="text-lg text-muted-foreground mb-8 border-l-4 border-orange-500/30 pl-6">{tithi.aeoBlock}</p>
                    <div className="mb-8"><JyotishDisclaimer compact /></div>
                    <div className="rounded-2xl border border-border/50 bg-card p-6 text-muted-foreground space-y-3">
                        <p><strong className="text-foreground">Meaning:</strong> {tithi.meaning}</p>
                        <p><strong className="text-foreground">Paksha:</strong> {tithi.paksha}</p>
                        <p><strong className="text-foreground">Deity:</strong> {tithi.deity}</p>
                        <p>{tithi.description}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}