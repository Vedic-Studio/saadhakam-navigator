import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { karanas, tithis, varas, yogas } from "@/data/panchang";
import { nakshatras } from "@/data/nakshatras";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Panchang in Jyotish",
    description: "Explore panchang through tithis, varas, yogas, and karanas as reflective sacred timing markers for practice and observance.",
    path: "/jyotish/panchang",
});

export default function PanchangHubPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Panchang", href: "/jyotish/panchang" },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-6xl mx-auto">
                    <header className="mb-12 mt-6">
                        <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Panchang</p>
                        <h1 className="font-display text-4xl md:text-6xl font-black mb-6">Panchang as sacred timing</h1>
                        <p className="text-xl text-muted-foreground max-w-4xl mb-8">
                            Panchang combines weekday, lunar day, yoga, and karana to create a richer sense of ritual and contemplative timing.
                            Here it is presented as a rhythm and observance framework, not deterministic fortune-telling.
                        </p>
                        <JyotishDisclaimer compact />
                    </header>

                    <section className="grid md:grid-cols-3 gap-6 mb-10">
                        <Link href="/jyotish/panchang/varas/ravivara" className="rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/40 transition-colors">
                            <h2 className="text-2xl font-display font-bold mb-3">Varas</h2>
                            <p className="text-muted-foreground">Explore the 7 weekday archetypes and their ruling grahas.</p>
                        </Link>
                        <Link href="/jyotish/panchang/tithis/shukla-pratipada" className="rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/40 transition-colors">
                            <h2 className="text-2xl font-display font-bold mb-3">Tithis</h2>
                            <p className="text-muted-foreground">Explore the 30 lunar days used in observance, fasting, prayer, and reflection.</p>
                        </Link>
                        <Link href="/jyotish/panchang/nakshatras/ashvini" className="rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/40 transition-colors">
                            <h2 className="text-2xl font-display font-bold mb-3">Nakshatras</h2>
                            <p className="text-muted-foreground">Explore the 27 lunar mansions, their ruling grahas, symbols, and qualities.</p>
                        </Link>
                    </section>

                    <section className="grid lg:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">7 varas</h2>
                            <div className="flex flex-wrap gap-2">
                                {varas.map((vara) => (
                                    <Link key={vara.slug} href={`/jyotish/panchang/varas/${vara.slug}`} className="px-3 py-1 rounded-full bg-muted text-sm hover:text-orange-400">
                                        {vara.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">30 tithis</h2>
                            <div className="flex flex-wrap gap-2">
                                {tithis.slice(0, 8).map((tithi) => (
                                    <Link key={tithi.slug} href={`/jyotish/panchang/tithis/${tithi.slug}`} className="px-3 py-1 rounded-full bg-muted text-sm hover:text-orange-400">
                                        {tithi.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">27 nakshatras</h2>
                            <div className="flex flex-wrap gap-2">
                                {nakshatras.slice(0, 9).map((nakshatra) => (
                                    <Link key={nakshatra.slug} href={`/jyotish/panchang/nakshatras/${nakshatra.slug}`} className="px-3 py-1 rounded-full bg-muted text-sm hover:text-orange-400">
                                        {nakshatra.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Yogas</h2>
                            <p className="text-muted-foreground leading-relaxed">{yogas.join(", ")}</p>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Karanas</h2>
                            <p className="text-muted-foreground leading-relaxed">{karanas.join(", ")}</p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}