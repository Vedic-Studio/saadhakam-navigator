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
    title: "South India Temple Architecture: Brihadeeswarar, Meenakshi & Dravidian Design",
    description:
        "South Indian Dravidian temples feature towering Gopurams, city-sized complexes, and engineering feats like the Brihadeeswarar's shadowless 80-ton capstone. A guide to Tamil Nadu's living temple architecture.",
    alternates: {
        canonical: "https://www.opensadhaka.com/south-india-temple-architecture",
    },
    openGraph: {
        title: "South India Temple Architecture: The Dravidian Tradition",
        description:
            "Gopurams covered in thousands of deities. An 80-ton granite capstone raised 216 feet without cranes. The living goddess-city of Madurai. South India's temples are theology made stone.",
        url: "https://www.opensadhaka.com/south-india-temple-architecture",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is Dravidian temple architecture?",
        answer:
            "Dravidian architecture is the South Indian temple style characterized by massive Gopurams (towering gateways covered in painted sculptures), Vimanas (pyramidal towers over the main shrine), Mandapas (pillared halls), and large temple tanks. Temples are built as complete city-complexes rather than single structures. The style dominated Tamil Nadu, Karnataka, and Andhra Pradesh and reached its peak under the Chola, Pandya, and Vijayanagara dynasties.",
    },
    {
        question: "How was the Brihadeeswarar Temple capstone placed without cranes?",
        answer:
            "Scholars believe the 80-ton granite capstone (Kalasha) was raised using an earthen ramp — a technique used across ancient India for lifting large stones. Workers would have built a gradual ramp from ground level to the top of the 216-foot Vimana, dragged the capstone up the ramp using pulleys and manpower, then removed the ramp after placement. The same ramp method is proposed for Egypt's pyramids.",
    },
    {
        question: "What is special about the Meenakshi Temple in Madurai?",
        answer:
            "The Meenakshi Amman Temple in Madurai is a living city-within-a-city dedicated to the goddess Meenakshi (a form of Parvati). It has 14 Gopurams, the tallest at 52 meters, covered in approximately 33,000 painted sculptures. It operates as a functioning religious institution with daily rituals, festivals, and tens of thousands of visitors. The temple has been continuously active for at least 2,000 years and remains one of India's most visited shrines.",
    },
];

export default function SouthIndiaTempleArchitecturePage() {
    const article = getArticleBySlug("south-india-temple-architecture")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);
    const templesItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "South Indian Dravidian Temples",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "Place",
                    name: "Brihadeeswarar Temple (Peruvudaiyar Kovil)",
                    description:
                        "Built by Raja Raja Chola I around 1010 CE in Thanjavur. Its 216-foot Vimana is capped by a single 80-ton granite Kalasha. A UNESCO 'Great Living Chola Temples' World Heritage Site, still in continuous ritual use.",
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: 10.7828,
                        longitude: 79.1318,
                    },
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Thanjavur",
                        addressRegion: "Tamil Nadu",
                        addressCountry: "IN",
                    },
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "Place",
                    name: "Meenakshi Amman Temple",
                    description:
                        "A living goddess-city in Madurai dedicated to Meenakshi (a form of Parvati). Fourteen Gopurams — the tallest 52 meters — covered in approximately 33,000 painted sculptures. Continuously active for at least 2,000 years.",
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: 9.9195,
                        longitude: 78.1193,
                    },
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Madurai",
                        addressRegion: "Tamil Nadu",
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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(templesItemList) }} />
            <ContentPageTracker slug="south-india-temple-architecture" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Kailasa Temple Ellora", href: "/kailasa-temple-ellora" },
                            { label: "South India Temple Architecture", href: "/south-india-temple-architecture" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Theology in <span className="text-orange-500 italic">Stone</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> South Indian Dravidian temple architecture is defined by towering Gopuram gateways covered in thousands of painted deities, city-scale complexes, and engineering feats that remain difficult to explain with simple tools. The Brihadeeswarar Temple in Thanjavur raised an 80-ton granite capstone 216 feet high without modern cranes, and its shadow never falls on its own base at noon. The Meenakshi Temple in Madurai operates as a living city-within-a-city of 33,000 sculptures and continuous daily ritual.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            South Indian temples were not built to house God. They were built to be God.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Brihadeeswarar Temple: Chola Engineering at Its Peak</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Built by King Raja Raja Chola I around 1010 CE in Thanjavur, the Brihadeeswarar (Big Temple) was the tallest structure in India at its completion. Its Vimana — the tower directly above the main Shiva Lingam — rises 216 feet and is capped by a single 80-ton dome of granite. The shadow of this tower never falls on the surrounding courtyard at noon, a feat of orientation that required extraordinarily precise solar calculations from its architects.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The temple is one of the &quot;Great Living Chola Temples&quot; listed as a UNESCO World Heritage Site and remains fully active — daily pujas, priests, and pilgrims have maintained an unbroken ritual continuity for over a thousand years. The frescoes in the circumambulatory passage around the inner sanctum, painted by Chola-era artists, are among the finest surviving examples of South Indian painting. {/* EXPAND */}
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The Meenakshi Temple: A Living Goddess-City</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Meenakshi Amman Temple in Madurai functions less like a monument and more like a small city organized around the divine feminine. Its 14 Gopurams — gateway towers — are visible from across Madurai, the tallest rising 52 meters and covered in approximately 33,000 individually painted and sculpted figures. Inside, the complex contains multiple temples, shrines, mandapas (pillared halls), a sacred tank, and the famous Hall of a Thousand Pillars.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The temple has been continuously inhabited and active for at least 2,000 years. Unlike Brihadeeswarar&apos;s stark architectural grandeur, Meenakshi is overwhelming in sensory richness — incense, flower garlands, chanting, sacred elephants, and the vivid colors of freshly painted deities create an environment unlike any other in India. Visiting requires patience and an unhurried pace. Come early, move slowly, and hire a local guide. {/* EXPAND */}
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
                            <Link href="/most-powerful-shiva-temples-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Most Powerful Shiva Temples in India <ArrowRight size={16} />
                            </Link>
                            <Link href="/kailasa-temple-ellora" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                The Kailasa Temple at Ellora <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Continue the Temple Trail.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            India&apos;s sacred architecture is a living map of theology. Every tower, every pillar, every sculpture is intentional.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/most-powerful-shiva-temples-india"
                                eventLabel="south_india_temples:footer:shiva"
                                trackPathName="most-powerful-shiva-temples-india"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                The Jyotirlingas
                            </TrackedLink>
                            <TrackedLink
                                href="/sacred-sites-india"
                                eventLabel="south_india_temples:footer:sacred-sites"
                                trackPathName="sacred-sites-india"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Sacred Sites in India
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
