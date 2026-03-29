import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadStotra } from "@/lib/stotras";
import { buildBreadcrumbSchema, buildCollectionSchema } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Navagraha Stotram: 9 Verses Honoring the Planetary Forces | Opensadhaka",
    description:
        "The Navagraha Stotram: a nine-verse hymn from the Smarta liturgical tradition honoring the nine grahas (Surya through Ketu) with Sanskrit, transliteration, and contemplative commentary.",
    alternates: {
        canonical: "https://www.opensadhaka.com/stotras/navagraha-stotram",
    },
    openGraph: {
        title: "Navagraha Stotram: 9 Verses Honoring the Planetary Forces",
        description:
            "Nine verses honoring the nine grahas of Jyotish. Sanskrit, transliteration, and contemplative commentary for each planetary force.",
        url: "https://www.opensadhaka.com/stotras/navagraha-stotram",
        type: "article",
    },
};

export default function NavagrahaStotramPage() {
    const stotra = loadStotra("navagraha-stotram");

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Stotras", href: "/stotras" },
        { label: "Navagraha Stotram", href: "/stotras/navagraha-stotram" },
    ]);

    const collectionSchema = buildCollectionSchema({
        name: "Navagraha Stotram — 9 Verses Honoring the Grahas",
        description: "The Navagraha Stotram: a nine-verse hymn honoring the grahas with translation and commentary.",
        url: "https://www.opensadhaka.com/stotras/navagraha-stotram",
        items: stotra.verses.map((verse) => ({
            name: `Verse ${verse.verse}`,
            url: `https://www.opensadhaka.com/stotras/navagraha-stotram/${verse.slug}`,
            description: verse.translation || `Verse ${verse.verse} of the Navagraha Stotram`,
        })),
    });

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Stotras", href: "/stotras/shiva-tandava-stotram" },
                            { label: "Navagraha Stotram", href: "/stotras/navagraha-stotram" },
                        ]}
                    />
                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Navagraha <span className="text-orange-400 italic">Stotram</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>About this text:</strong> The Navagraha Stotram is a nine-verse hymn, one for each graha (planetary force) in the Jyotish system: Surya, Chandra, Mangala, Budha, Brihaspati, Shukra, Shani, Rahu, and Ketu. The text appears in various Puranic and liturgical compilations within the Smarta tradition. Each verse invokes the graha not as an astronomical body but as a karmic and psychological force governing specific dimensions of human experience.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            &ldquo;One who recites these nine verses at dawn, facing the sun, is freed from the obstacles born of planetary affliction.&rdquo;
                        </p>
                    </header>

                    <section>
                        <h2 className="font-display text-2xl font-bold mb-6 text-orange-400/80">Verse-by-Verse Study</h2>
                        <p className="text-muted-foreground text-sm mb-6">Click any verse to read the full Sanskrit, transliteration, translation, and contemplative commentary.</p>
                        <div className="space-y-3">
                            {stotra.verses.map((verse) => (
                                <Link key={verse.slug} href={`/stotras/navagraha-stotram/${verse.slug}`} className="block rounded-2xl border border-border/40 bg-card/30 p-6 hover:border-orange-500/40 hover:bg-card/50 transition-all group">
                                    <div className="flex items-start gap-5">
                                        <span className="text-orange-500/60 font-mono text-sm mt-1 min-w-[2.5rem]">{verse.verse.toString().padStart(2, "0")}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-serif text-lg text-foreground leading-relaxed mb-2 line-clamp-2">{verse.sanskritDevanagari.split("\n")[0]}</p>
                                            <p className="text-sm text-muted-foreground italic line-clamp-1">{verse.transliteration.split("\n")[0]}</p>
                                        </div>
                                        <span className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium shrink-0">Read →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <div className="mt-16 p-8 bg-muted/30 rounded-3xl border border-border/50">
                        <h2 className="text-2xl font-display font-bold mb-4">About the Navagraha Stotram</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The nine grahas in Jyotish do not map directly to the Western astronomical concept of planets. They include the Sun (Surya) and Moon (Chandra), which are luminaries, and Rahu and Ketu, which are the lunar nodes with no physical body. The Brihat Parashara Hora Shastra, the foundational text of Jyotish attributed to the sage Parashara, describes each graha as a manifestation of Vishnu governing specific aspects of karma and temporal experience.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            The stotram is traditionally recited on Saturdays and during Navagraha Puja, particularly when a practitioner is undergoing a difficult planetary period (dasha or transit). The practice is not fatalistic petition but a contemplative reframing: each graha represents an internal principle (discipline, desire, intellect, expansion) that can be understood and worked with rather than feared.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4 text-sm">
                            <Link href="/jyotish" className="text-orange-400 hover:text-orange-300 transition-colors">
                                What is Jyotish?
                            </Link>
                            <Link href="/mantras" className="text-orange-400 hover:text-orange-300 transition-colors">
                                Mantras for Practice
                            </Link>
                            <Link href="/practical-spiritual-practices" className="text-orange-400 hover:text-orange-300 transition-colors">
                                The Graded Curriculum
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
