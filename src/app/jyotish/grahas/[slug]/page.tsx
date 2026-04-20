import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggeredList } from "@/components/animations/StaggeredList";
import { LazyPlanetOrbit } from "@/components/jyotish/visuals/LazyPlanetOrbit";
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata, buildUrl, buildWebPageSchema } from "@/lib/seo";
import { composeMetaDescription } from "@/lib/seo/metaDescription";
import { getDeityBySlug } from "@/data/deities";
import { getGrahaBySlug, grahas } from "@/data/grahas";
import { getMantraBySlug } from "@/data/mantras";
import { getRelatedNakshatrasForGraha, getRelatedRashisForGraha } from "@/lib/jyotish";

export async function generateStaticParams() {
    return grahas.map((graha) => ({ slug: graha.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const graha = getGrahaBySlug(slug);
    if (!graha) return {};
    return buildPageMetadata({
        title: `${graha.name} in Jyotish`,
        description: composeMetaDescription(
            [`${graha.name} graha in Jyotish — symbolism, mantra, and practice`, graha.description],
            {
                fallback:
                    "Explore the nature, ruling rashis, related nakshatras, and contemplative guidance for this graha on Sadhaka.",
            },
        ),
        path: `/jyotish/grahas/${graha.slug}`,
    });
}

export default async function GrahaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const graha = getGrahaBySlug(slug);
    if (!graha) notFound();

    const deity = getDeityBySlug(graha.deitySlug);
    const rashis = getRelatedRashisForGraha(graha.slug);
    const nakshatras = getRelatedNakshatrasForGraha(graha.slug);
    const mantras = graha.mantraSlugs.map(getMantraBySlug).filter(Boolean);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Grahas", href: "/jyotish/grahas" },
        { label: graha.name, href: `/jyotish/grahas/${graha.slug}` },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        buildWebPageSchema({
                            name: `${graha.name} in Jyotish`,
                            description: graha.description,
                            url: buildUrl(`/jyotish/grahas/${graha.slug}`),
                            breadcrumbItems: breadcrumbItems,
                        })
                    ),
                }}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(graha.faq)) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <ScrollReveal>
                        <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Graha Guide</p>
                        <h1 className="font-display text-4xl md:text-6xl font-black mb-6">{graha.name}</h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-orange-500/30 pl-6">
                            {graha.aeoBlock}
                        </p>
                        <div className="mb-8">
                            <JyotishDisclaimer compact />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="mb-12">
                            <LazyPlanetOrbit
                                name={graha.name}
                                exaltation={graha.exaltation}
                                debilitation={graha.debilitation}
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <section className="grid md:grid-cols-2 gap-6 mb-10">
                            <div className="rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/30 transition-colors duration-300">
                                <h2 className="text-2xl font-display font-bold mb-4">Core attributes</h2>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li><strong className="text-foreground">Weekday:</strong> {graha.weekday}</li>
                                    <li><strong className="text-foreground">Exaltation:</strong> {graha.exaltation}</li>
                                    <li><strong className="text-foreground">Debilitation:</strong> {graha.debilitation}</li>
                                    <li><strong className="text-foreground">Gemstone:</strong> {graha.gemstone}</li>
                                    <li><strong className="text-foreground">Metal:</strong> {graha.metal}</li>
                                    <li><strong className="text-foreground">Element:</strong> {graha.element}</li>
                                </ul>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/30 transition-colors duration-300">
                                <h2 className="text-2xl font-display font-bold mb-4">Significations</h2>
                                <div className="flex flex-wrap gap-3">
                                    {graha.significations.map((item) => (
                                        <span key={item} className="px-3 py-1 rounded-full bg-muted text-sm hover:bg-orange-500/10 transition-colors">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">Associated deity and mantras</h2>
                            <div className="space-y-3 text-muted-foreground">
                                {deity && <Link href={`/deities/${deity.slug}`} className="block text-orange-400 hover:underline">{deity.name}</Link>}
                                {mantras.map((mantra) => (
                                    <Link key={mantra!.slug} href={`/mantras/${mantra!.slug}`} className="block text-orange-400 hover:underline">
                                        {mantra!.name}
                                    </Link>
                                ))}
                                <Link href="/stotras/navagraha-stotram" className="block text-orange-400 hover:underline">Navagraha Stotram</Link>
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.25}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">Related rashis</h2>
                            <StaggeredList className="flex flex-wrap gap-3">
                                {rashis.map((rashi) => (
                                    <Link key={rashi.slug} href={`/jyotish/rashis/${rashi.slug}`} className="px-4 py-2 rounded-xl border border-border hover:border-orange-500/50 hover:scale-105 transition-all duration-200">
                                        {rashi.name}
                                    </Link>
                                ))}
                            </StaggeredList>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <section>
                            <h2 className="text-2xl font-display font-bold mb-4">Related nakshatras</h2>
                            <StaggeredList className="flex flex-wrap gap-3">
                                {nakshatras.map((nakshatra) => (
                                    <Link key={nakshatra.slug} href={`/jyotish/nakshatras/${nakshatra.slug}`} className="px-4 py-2 rounded-xl border border-border hover:border-orange-500/50 hover:scale-105 transition-all duration-200">
                                        {nakshatra.name}
                                    </Link>
                                ))}
                            </StaggeredList>
                        </section>
                    </ScrollReveal>
                </div>
            </main>
            <Footer />
        </div>
    );
}