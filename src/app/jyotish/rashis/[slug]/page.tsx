import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { ZodiacWheel } from "@/components/jyotish/visuals/ZodiacWheel";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getRashiBySlug, rashis } from "@/data/rashis";
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata, buildUrl, buildWebPageSchema } from "@/lib/seo";
import { getRelatedGrahaForRashi, getRelatedNakshatrasForRashi } from "@/lib/jyotish";

export async function generateStaticParams() {
    return rashis.map((rashi) => ({ slug: rashi.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const rashi = getRashiBySlug(slug);
    if (!rashi) return {};
    return buildPageMetadata({
        title: `${rashi.name} in Jyotish`,
        description: rashi.description,
        path: `/jyotish/rashis/${rashi.slug}`,
    });
}

export default async function RashiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const rashi = getRashiBySlug(slug);
    if (!rashi) notFound();

    const rulingGraha = getRelatedGrahaForRashi(rashi.slug);
    const relatedNakshatras = getRelatedNakshatrasForRashi(rashi.slug);
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Rashis", href: "/jyotish/rashis" },
        { label: rashi.name, href: `/jyotish/rashis/${rashi.slug}` },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        buildWebPageSchema({
                            name: `${rashi.name} in Jyotish`,
                            description: rashi.description,
                            url: buildUrl(`/jyotish/rashis/${rashi.slug}`),
                            breadcrumbItems,
                        })
                    ),
                }}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(rashi.faq)) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <ScrollReveal>
                        <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Rashi Guide</p>
                        <h1 className="font-display text-4xl md:text-6xl font-black mb-6">{rashi.name}</h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-orange-500/30 pl-6">
                            {rashi.aeoBlock}
                        </p>
                        <div className="mb-8"><JyotishDisclaimer compact /></div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div className="mb-12 flex justify-center">
                            <ZodiacWheel activeSlug={rashi.slug} size={320} />
                        </div>
                    </ScrollReveal>

                    <section className="grid md:grid-cols-2 gap-6 mb-10">
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Core attributes</h2>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><strong className="text-foreground">Symbol:</strong> {rashi.symbol}</li>
                                <li><strong className="text-foreground">Element:</strong> {rashi.element}</li>
                                <li><strong className="text-foreground">Modality:</strong> {rashi.modality}</li>
                                {rulingGraha && (
                                    <li>
                                        <strong className="text-foreground">Ruling graha:</strong>{" "}
                                        <Link href={`/jyotish/grahas/${rulingGraha.slug}`} className="text-orange-400 hover:underline">{rulingGraha.name}</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Practice cues</h2>
                            <p className="text-muted-foreground leading-relaxed">{rashi.description}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold mb-4">Nakshatras spanning {rashi.name}</h2>
                        <div className="flex flex-wrap gap-3">
                            {relatedNakshatras.map((nakshatra) => (
                                <Link key={nakshatra.slug} href={`/jyotish/nakshatras/${nakshatra.slug}`} className="px-4 py-2 rounded-xl border border-border hover:border-orange-500/50">
                                    {nakshatra.name}
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}