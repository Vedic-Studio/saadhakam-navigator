import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { mantras } from "@/data/mantras";
import { buildCollectionSchema, buildPageMetadata, buildBreadcrumbSchema, buildUrl } from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Mantras Explained",
    description: "Explore core Hindu mantras with meaning, pronunciation notes, practice context, and beginner-friendly guidance.",
    path: "/mantras",
});

export default function MantrasHubPage() {
    const collectionSchema = buildCollectionSchema({
        name: "Mantras Explained",
        description: "A curated hub of foundational mantras with context, purpose, and practical usage.",
        url: buildUrl("/mantras"),
        items: mantras.map((m) => ({
            name: m.name,
            url: buildUrl(`/mantras/${m.slug}`),
            description: m.oneLineMeaning,
        })),
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Mantras", href: "/mantras" },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-6xl mx-auto">
                    <header className="mb-12 mt-6">
                        <h1 className="font-display text-4xl md:text-6xl font-black mb-5">Mantras Explained</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl">
                            Start with high-signal foundational mantras used across traditions. Each page includes meaning, context,
                            usage guidance, and related paths.
                        </p>
                    </header>

                    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mantras.map((mantra) => (
                            <Link key={mantra.slug} href={`/mantras/${mantra.slug}`} className="block rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/50 transition-colors">
                                <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">{mantra.tradition.join(" • ")}</p>
                                <h2 className="text-2xl font-display font-bold mb-3">{mantra.name}</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">{mantra.oneLineMeaning}</p>
                            </Link>
                        ))}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
