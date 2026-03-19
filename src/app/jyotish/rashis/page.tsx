import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { rashis } from "@/data/rashis";
import { RASHI_ICONS } from "@/components/jyotish/icons/rashis";
import { buildBreadcrumbSchema, buildCollectionSchema, buildPageMetadata, buildUrl } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Rashis in Jyotish",
    description: "Explore the 12 rashis through ruling grahas, elemental qualities, nakshatra coverage, and practice-oriented interpretation.",
    path: "/jyotish/rashis",
});

export default function RashisHubPage() {
    const collectionSchema = buildCollectionSchema({
        name: "Rashis in Jyotish",
        description: "A contemplative guide to the 12 rashis in Jyotish.",
        url: buildUrl("/jyotish/rashis"),
        items: rashis.map((rashi) => ({
            name: rashi.name,
            url: buildUrl(`/jyotish/rashis/${rashi.slug}`),
            description: rashi.description,
        })),
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Rashis", href: "/jyotish/rashis" },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-6xl mx-auto">
                    <header className="mb-12 mt-6">
                        <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Rashi Guide</p>
                        <h1 className="font-display text-4xl md:text-6xl font-black mb-6">Rashis in Jyotish</h1>
                        <p className="text-xl text-muted-foreground max-w-4xl mb-8">
                            The rashis here are presented as symbolic environments of attention, rhythm, and orientation rather than rigid personality labels.
                        </p>
                        <JyotishDisclaimer compact />
                    </header>

                    <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {rashis.map((rashi) => (
                            <Link key={rashi.slug} href={`/jyotish/rashis/${rashi.slug}`} className="block rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/40 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    {RASHI_ICONS[rashi.slug] && (
                                        <img src={RASHI_ICONS[rashi.slug]} alt={rashi.name} className="w-10 h-10 rounded-lg" />
                                    )}
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold">{rashi.element} • {rashi.modality}</p>
                                        <h2 className="text-2xl font-display font-bold">{rashi.name}</h2>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{rashi.description}</p>
                            </Link>
                        ))}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}