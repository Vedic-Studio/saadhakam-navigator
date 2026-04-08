import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DailyPracticeCard } from "@/components/jyotish/DailyPracticeCard";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { ZodiacWheel } from "@/components/jyotish/visuals/ZodiacWheel";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggeredList } from "@/components/animations/StaggeredList";
import { buildBreadcrumbSchema, buildCollectionSchema, buildPageMetadata, buildUrl } from "@/lib/seo";

const sections = [
    {
        name: "Nakshatras",
        href: "/jyotish/nakshatras",
        description: "27 lunar mansions explained through qualities, ruling grahas, deities, and practice bundles.",
    },
    {
        name: "Rashis",
        href: "/jyotish/rashis",
        description: "12 rashis framed as symbolic fields of temperament, rhythm, and spiritual orientation.",
    },
    {
        name: "Grahas",
        href: "/jyotish/grahas",
        description: "The Navagraha understood as contemplative archetypes, not deterministic prediction engines.",
    },
    {
        name: "Panchang",
        href: "/jyotish/panchang",
        description: "Tithi, vara, yoga, and karana as sacred timing frameworks for reflection and practice.",
    },
    {
        name: "Today",
        href: "/jyotish/today",
        description: "Daily vara-led guidance with graceful 2026 calendar enrichment for nakshatra and tithi.",
    },
    {
        name: "Vedic Clock",
        href: "/vedic-clock",
        description: "Live sunrise-based muhūrta clock with location-aware pañchānga fields, preset cities, geolocation, and visible calculation provenance.",
    },
];

export const metadata = buildPageMetadata({
    title: "Jyotish for Practice and Reflection",
    description:
        "Explore Jyotish through nakshatras, rashis, grahas, and panchang as a symbolic, contemplative, non-predictive spiritual framework.",
    path: "/jyotish",
});

export default function JyotishHubPage() {
    const collectionSchema = buildCollectionSchema({
        name: "Jyotish Hub",
        description: "A contemplative and practice-oriented introduction to Jyotish through grahas, rashis, nakshatras, and panchang.",
        url: buildUrl("/jyotish"),
        items: sections.map((section) => ({
            name: section.name,
            url: buildUrl(section.href),
            description: section.description,
        })),
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
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
                            <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Jyotish Hub</p>
                            <h1 className="font-display text-4xl md:text-6xl font-black mb-6">Jyotish as reflection, rhythm, and practice</h1>
                            <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed mb-8">
                                This section presents Jyotish as a contemplative language of timing, temperament, and spiritual orientation.
                                It is intentionally non-predictive in framing: use these pages to deepen attention, ritual rhythm, self-observation,
                                and practice integrity.
                            </p>
                            <JyotishDisclaimer />
                        </header>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="mb-12">
                            <DailyPracticeCard />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="mb-16 flex justify-center">
                            <ZodiacWheel size={380} />
                        </div>
                    </ScrollReveal>

                    <StaggeredList className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sections.map((section) => (
                            <Link
                                key={section.href}
                                href={section.href}
                                className="block rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/40 hover:scale-[1.02] transition-all duration-300"
                            >
                                <h2 className="text-2xl font-display font-bold mb-3">{section.name}</h2>
                                <p className="text-muted-foreground leading-relaxed">{section.description}</p>
                            </Link>
                        ))}
                    </StaggeredList>
                </div>
            </main>
            <Footer />
        </div>
    );
}
