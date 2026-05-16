import type { Metadata } from "next";
import { getArticleBySlug, getPillarConfig } from "@/features/articles";
import { buildArticleSchemas } from "@/lib/seo";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Kailasa Temple vs Ajanta Caves: Which Should You Visit?",
    description:
        "Ajanta has India's greatest ancient paintings. Ellora has the Kailasa Temple — the world's largest monolithic carving. Both are UNESCO sites near Aurangabad. Here is how to choose.",
    alternates: {
        canonical: "https://www.opensadhaka.com/kailasa-vs-ajanta-caves",
    },
    openGraph: {
        title: "Kailasa vs Ajanta: Painting vs Carving",
        description:
            "Ajanta's Buddhist frescoes vs Ellora's Hindu rock-cut temples. Both near Aurangabad. Both UNESCO heritage sites. Different in every other way.",
        url: "https://www.opensadhaka.com/kailasa-vs-ajanta-caves",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is the main difference between Ajanta and Ellora?",
        answer:
            "Ajanta is a Buddhist site famous for its extraordinary interior fresco paintings depicting the life of the Buddha — the finest ancient paintings in India. Ellora is a multi-religion site (Buddhist, Hindu, Jain) famous for its sculptural architecture, culminating in the Kailasa Temple. Ajanta is about painting; Ellora is about stone carving. Both are UNESCO World Heritage Sites near Aurangabad, Maharashtra.",
    },
    {
        question: "Which should I visit first — Ajanta or Ellora?",
        answer:
            "Visit Ajanta first if paintings and Buddhist history are your priority. Visit Ellora (specifically the Kailasa Temple) first if you want the single most impressive individual structure. Most travelers with limited time choose Ellora because the Kailasa Temple is a singular experience impossible to replicate elsewhere, while excellent Buddhist painting can also be seen at other sites.",
    },
    {
        question: "How far are Ajanta and Ellora from each other?",
        answer:
            "Ajanta and Ellora are approximately 100 km apart, both accessible from Aurangabad city. Ajanta is about 100 km northeast of Aurangabad; Ellora is about 30 km northwest. It is possible to visit both in a two-day trip from Aurangabad, though rushing both in a single day is not recommended — each deserves at least 3–4 hours of focused attention.",
    },
];

export default function KailasaVsAjantaCavesPage() {
    const article = getArticleBySlug("kailasa-vs-ajanta-caves")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);
    const placesItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Ajanta and Ellora Caves",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "Place",
                    name: "Ajanta Caves",
                    description:
                        "A UNESCO World Heritage Site of 30 Buddhist rock-cut caves above the Waghora River, celebrated for ceiling-to-floor fresco paintings of Jataka tales executed from the 2nd century BCE onward.",
                    url: "https://www.opensadhaka.com/kailasa-vs-ajanta-caves",
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: 20.5519,
                        longitude: 75.7000,
                    },
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Ajanta",
                        addressRegion: "Maharashtra",
                        addressCountry: "IN",
                    },
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "Place",
                    name: "Ellora Caves (Kailasa Temple, Cave 16)",
                    description:
                        "A UNESCO World Heritage Site of 34 Buddhist, Hindu, and Jain rock-cut caves, anchored by the 8th-century CE Kailasa Temple — the world's largest monolithic carved structure.",
                    url: "https://www.opensadhaka.com/kailasa-temple-ellora",
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: 20.0258,
                        longitude: 75.1797,
                    },
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Ellora",
                        addressRegion: "Maharashtra",
                        addressCountry: "IN",
                    },
                },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placesItemList) }} />
            <ContentPageTracker slug="kailasa-vs-ajanta-caves" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Kailasa Temple Ellora", href: "/kailasa-temple-ellora" },
                            { label: "Kailasa vs Ajanta", href: "/kailasa-vs-ajanta-caves" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Painting vs <span className="text-orange-500 italic">Carving</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Ajanta and Ellora are both UNESCO World Heritage sites near Aurangabad, Maharashtra, but they serve completely different purposes. Ajanta (30 Buddhist caves, 2nd century BCE) is celebrated for its breathtaking interior fresco paintings — India&apos;s finest surviving ancient art. Ellora (34 caves, Buddhist/Hindu/Jain) is celebrated for sculptural rock-cut architecture, most dramatically the Kailasa Temple — the world&apos;s largest monolithic carved structure. Travelers focused on painting choose Ajanta; those focused on stone architecture choose Ellora.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Both are extraordinary. They are not comparable — they are complementary.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Ajanta: Where Paint Became Eternal</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Ajanta Caves were carved into a horseshoe-shaped cliff above the Waghora River over several centuries, beginning around the 2nd century BCE. What makes Ajanta unique is not the caves themselves but what was painted inside them: ceiling-to-floor fresco murals depicting the Jataka tales (stories of the Buddha&apos;s past lives), court scenes, celestial beings, and floral patterns executed with a mastery of color, perspective, and human emotion that was not matched in European painting for another thousand years.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Many paintings survived because the caves were sealed and forgotten for over a millennium, rediscovered by British officers in 1819. The humidity and bat colonies have damaged sections, but what remains — particularly in Caves 1, 2, 16, and 17 — is staggering. Visiting Ajanta requires entering dark caves with limited torch light, which creates an intimate encounter with ancient Buddhist devotion that no outdoor site can replicate. {/* EXPAND */}
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">Ellora: The Religious Harmony of Three Faiths in Stone</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                What makes Ellora remarkable beyond the Kailasa Temple is its representation of three religions coexisting in the same cliff. The 12 Buddhist caves (roughly 400–700 CE) came first, representing a late flourishing of Maharashtra Buddhism. The 17 Hindu caves (600–900 CE) followed, culminating in the Kailasa Temple under the Rashtrakutas. The 5 Jain caves (800–1000 CE) complete the complex. The faiths never competed — they shared the same rock face, each creating masterworks within its own tradition.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                For most first-time visitors, Ellora&apos;s open-air setting — you walk through a vast complex of temples, elephants, and galleries under open sky — makes it more immediately accessible than Ajanta&apos;s interior cave experience. The Kailasa Temple alone justifies the journey from anywhere in India. {/* EXPAND */}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-4xl font-display font-bold mb-12 text-center tracking-tight uppercase">Common Questions</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {faqs.map((faq) => (
                                    <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm">
                                        <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                                        <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-orange-500/20">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/kailasa-temple-ellora" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                The Kailasa Temple in Detail <ArrowRight size={16} />
                            </Link>
                            <Link href="/south-india-temple-architecture" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                South India Temple Architecture <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Go Deeper Into Indian Sacred Architecture.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            India&apos;s temples are not monuments — they are living cosmologies encoded in stone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/kailasa-temple-ellora"
                                eventLabel="ajanta_ellora:footer:kailasa"
                                trackPathName="kailasa-temple-ellora"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                The Kailasa Temple
                            </TrackedLink>
                            <TrackedLink
                                href="/most-powerful-shiva-temples-india"
                                eventLabel="ajanta_ellora:footer:shiva-temples"
                                trackPathName="most-powerful-shiva-temples-india"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Most Powerful Shiva Temples
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
