import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { deities } from "@/data/deities";
import {
    buildCollectionSchema,
    buildPageMetadata,
    buildUrl,
    buildBreadcrumbSchema,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
    title: "Hindu Deities Explained",
    description:
        "Who is Shiva, Krishna, Ganesha, Lakshmi, and Hanuman? Explore deity symbolism, philosophy, mythology, and mantras in clear western-friendly language.",
    path: "/deities",
});

export default function DeitiesHubPage() {
    const collectionSchema = buildCollectionSchema({
        name: "Hindu Deities Explained",
        description:
            "A structured guide to major Hindu deities with meaning, iconography, mythology, and philosophical context.",
        url: buildUrl("/deities"),
        items: deities.map((deity) => ({
            name: deity.name,
            url: buildUrl(`/deities/${deity.slug}`),
            description: deity.description,
        })),
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Deities", href: "/deities" },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-6xl mx-auto">
                    <header className="mb-14 mt-6">
                        <h1 className="font-display text-4xl md:text-6xl font-black leading-tight mb-6">
                            Hindu Gods Explained
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed border-l-4 border-orange-500/30 pl-6 mb-6">
                            In Sanatan Dharma, deities are not arbitrary figures of worship but precise maps of consciousness.
                            Each form encodes a philosophical principle, a psychological state, and a path of practice.
                        </p>
                        <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                The tradition of devata-upasana (deity meditation) operates on a foundational insight:
                                the formless absolute (nirguna Brahman) becomes accessible through form (saguna Brahman).
                                Shiva as the ascetic yogi, Vishnu as the sustaining intelligence, Devi as creative power,
                                Ganesha as threshold guardian. These are not competing gods but complementary lenses
                                through which a single reality is approached from different angles of human need.
                            </p>
                            <p>
                                The concept of ishta-devata (chosen deity) reflects this. A practitioner selects the form
                                that most naturally draws their mind inward. The Bhagavad Gita states that whatever
                                form a devotee worships with faith, that faith is made steady by the divine itself (7.21).
                                The form is a starting point, not a ceiling.
                            </p>
                            <p>
                                Each deity page below covers iconography, mythology, philosophical meaning, associated
                                mantras and texts, and common questions. Start wherever your curiosity leads.
                            </p>
                        </div>
                    </header>

                    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deities.map((deity) => (
                            <Link
                                key={deity.slug}
                                href={`/deities/${deity.slug}`}
                                className="block rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/50 transition-colors"
                            >
                                <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">{deity.category}</p>
                                <h2 className="text-2xl font-display font-bold mb-3">{deity.name}</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">{deity.description}</p>
                            </Link>
                        ))}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
