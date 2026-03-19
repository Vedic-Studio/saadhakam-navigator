import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { LazySolarSystem } from "@/components/jyotish/visuals/LazySolarSystem";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggeredList } from "@/components/animations/StaggeredList";
import { grahas } from "@/data/grahas";
import { GRAHA_ICONS } from "@/components/jyotish/icons/grahas";
import { buildBreadcrumbSchema, buildCollectionSchema, buildPageMetadata, buildUrl } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Grahas in Jyotish",
    description: "Explore the Navagraha as symbolic and practice-oriented forces in Jyotish: Surya, Chandra, Mangala, Budha, and more.",
    path: "/jyotish/grahas",
});

export default function GrahasHubPage() {
    const collectionSchema = buildCollectionSchema({
        name: "Grahas in Jyotish",
        description: "A guide to the nine grahas as contemplative archetypes and practice companions.",
        url: buildUrl("/jyotish/grahas"),
        items: grahas.map((graha) => ({
            name: graha.name,
            url: buildUrl(`/jyotish/grahas/${graha.slug}`),
            description: graha.description,
        })),
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Grahas", href: "/jyotish/grahas" },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-6xl mx-auto">
                    <ScrollReveal>
                        <header className="mb-12 mt-6">
                            <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Navagraha</p>
                            <h1 className="font-display text-4xl md:text-6xl font-black mb-6">Grahas in Jyotish</h1>
                            <p className="text-xl text-muted-foreground max-w-4xl mb-8">
                                These graha pages interpret the Navagraha as symbolic and practice-oriented principles for attention, ethics,
                                rhythm, and inner work.
                            </p>
                            <JyotishDisclaimer compact />
                        </header>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="mb-16">
                            <LazySolarSystem />
                        </div>
                    </ScrollReveal>

                    <StaggeredList className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {grahas.map((graha) => (
                            <Link
                                key={graha.slug}
                                href={`/jyotish/grahas/${graha.slug}`}
                                className="block rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/40 hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    {GRAHA_ICONS[graha.slug] && (
                                        <img src={GRAHA_ICONS[graha.slug]} alt={graha.name} className="w-10 h-10 rounded-lg" />
                                    )}
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold">{graha.weekday}</p>
                                        <h2 className="text-2xl font-display font-bold">{graha.name}</h2>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{graha.description}</p>
                            </Link>
                        ))}
                    </StaggeredList>
                </div>
            </main>
            <Footer />
        </div>
    );
}