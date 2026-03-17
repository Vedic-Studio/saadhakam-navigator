import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { getNakshatraBySlug, nakshatras } from "@/data/nakshatras";
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata, buildUrl, buildWebPageSchema } from "@/lib/seo";
import { getDeityBySlug } from "@/data/deities";
import { getGrahaBySlug, getRashiBySlug } from "@/lib/jyotish";

export async function generateStaticParams() {
    return nakshatras.map((nakshatra) => ({ slug: nakshatra.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const nakshatra = getNakshatraBySlug(slug);
    if (!nakshatra) return {};
    return buildPageMetadata({
        title: `${nakshatra.name} Nakshatra`,
        description: nakshatra.description,
        path: `/jyotish/nakshatras/${nakshatra.slug}`,
    });
}

export default async function NakshatraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const nakshatra = getNakshatraBySlug(slug);
    if (!nakshatra) notFound();

    const graha = getGrahaBySlug(nakshatra.rulingGraha);
    const deity = getDeityBySlug(nakshatra.deitySlug);
    const rashiLinks = nakshatra.rashiSlugs.map(getRashiBySlug).filter(Boolean);
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Nakshatras", href: "/jyotish/nakshatras" },
        { label: nakshatra.name, href: `/jyotish/nakshatras/${nakshatra.slug}` },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        buildWebPageSchema({
                            name: `${nakshatra.name} Nakshatra`,
                            description: nakshatra.description,
                            url: buildUrl(`/jyotish/nakshatras/${nakshatra.slug}`),
                            breadcrumbItems,
                        })
                    ),
                }}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(nakshatra.faq)) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Nakshatra Guide</p>
                    <h1 className="font-display text-4xl md:text-6xl font-black mb-6">{nakshatra.name}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-orange-500/30 pl-6">
                        {nakshatra.aeoBlock}
                    </p>
                    <div className="mb-8"><JyotishDisclaimer compact /></div>

                    <section className="grid md:grid-cols-2 gap-6 mb-10">
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Core attributes</h2>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><strong className="text-foreground">Span:</strong> {nakshatra.span}</li>
                                <li><strong className="text-foreground">Gana:</strong> {nakshatra.gana}</li>
                                <li><strong className="text-foreground">Guna:</strong> {nakshatra.guna}</li>
                                <li><strong className="text-foreground">Tattva:</strong> {nakshatra.tattva}</li>
                                <li><strong className="text-foreground">Symbol:</strong> {nakshatra.symbol}</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Qualities and shadow qualities</h2>
                            <p className="text-sm text-muted-foreground mb-3"><strong className="text-foreground">Qualities:</strong> {nakshatra.qualities.join(", ")}</p>
                            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Shadow qualities:</strong> {nakshatra.shadowQualities.join(", ")}</p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-display font-bold mb-4">Ruling graha and deity</h2>
                        <div className="space-y-3 text-muted-foreground">
                            {graha && <Link href={`/jyotish/grahas/${graha.slug}`} className="block text-orange-400 hover:underline">{graha.name}</Link>}
                            {deity && <Link href={`/deities/${deity.slug}`} className="block text-orange-400 hover:underline">{deity.name}</Link>}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold mb-4">Rashis covered</h2>
                        <div className="flex flex-wrap gap-3">
                            {rashiLinks.map((rashi) => (
                                <Link key={rashi!.slug} href={`/jyotish/rashis/${rashi!.slug}`} className="px-4 py-2 rounded-xl border border-border hover:border-orange-500/50">
                                    {rashi!.name}
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