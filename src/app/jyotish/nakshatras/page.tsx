import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { nakshatras } from "@/data/nakshatras";
import { buildBreadcrumbSchema, buildCollectionSchema, buildPageMetadata, buildUrl } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Nakshatras in Jyotish",
    description: "Explore the 27 nakshatras through ruling grahas, deities, qualities, shadow qualities, and contemplative practice guidance.",
    path: "/jyotish/nakshatras",
});

export default function NakshatrasHubPage() {
    const collectionSchema = buildCollectionSchema({
        name: "Nakshatras in Jyotish",
        description: "A symbolic and practice-oriented guide to the 27 nakshatras.",
        url: buildUrl("/jyotish/nakshatras"),
        items: nakshatras.map((nakshatra) => ({
            name: nakshatra.name,
            url: buildUrl(`/jyotish/nakshatras/${nakshatra.slug}`),
            description: nakshatra.description,
        })),
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Nakshatras", href: "/jyotish/nakshatras" },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-6xl mx-auto">
                    <header className="mb-12 mt-6">
                        <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Nakshatra Guide</p>
                        <h1 className="font-display text-4xl md:text-6xl font-black mb-6">Nakshatras in Jyotish</h1>
                        <p className="text-xl text-muted-foreground max-w-4xl mb-8">
                            The 27 nakshatras can be used as a subtle symbolic map for attention, temperament, shadow patterns, and practice emphasis.
                        </p>
                        <JyotishDisclaimer compact />
                    </header>

                    <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {nakshatras.map((nakshatra) => (
                            <Link key={nakshatra.slug} href={`/jyotish/nakshatras/${nakshatra.slug}`} className="block rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/40 transition-colors">
                                <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">{nakshatra.rulingGraha} • {nakshatra.span}</p>
                                <h2 className="text-2xl font-display font-bold mb-3">{nakshatra.name}</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">{nakshatra.description}</p>
                            </Link>
                        ))}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}