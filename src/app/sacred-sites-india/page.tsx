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
    title: "Sacred Sites in India: Varanasi, Tiruvannamalai, Auroville & Kerala",
    description:
        "Beyond yoga capitals: Varanasi for confronting mortality, Tiruvannamalai for self-inquiry, Auroville for integral yoga, and Kerala for Ayurvedic Panchakarma. The advanced spiritual itinerary.",
    alternates: {
        canonical: "https://www.opensadhaka.com/sacred-sites-india",
    },
    openGraph: {
        title: "India's Sacred Sites: The Advanced Itinerary",
        description:
            "Varanasi's cremation ghats, Ramana's Arunachala, Auroville's experimental community, and Kerala's Panchakarma. For practitioners ready to go deeper.",
        url: "https://www.opensadhaka.com/sacred-sites-india",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is the spiritual significance of Varanasi?",
        answer:
            "Varanasi (also Kashi or Benares) is considered the oldest continuously inhabited city in the world and the most sacred city in Hinduism. It is said that dying in Varanasi grants Moksha (liberation) regardless of one's karma, because the city itself is Shiva's eternal abode. The Manikarnika Ghat — where cremation pyres burn 24 hours a day, 365 days a year — is considered the point where souls transition. For pilgrims, witnessing the cremation ceremonies is not morbid tourism but a direct encounter with the reality of impermanence that every meditation practice points toward.",
    },
    {
        question: "What is the Sri Ramana Ashram (Ramanasramam) like to visit?",
        answer:
            "The Ramanasramam in Tiruvannamalai (Tamil Nadu) maintains a permanent atmosphere of mouna (sacred silence). The ashram is open to visitors for stays of several days to several weeks. Key elements: twice-daily Vedic chanting and aarti, the meditation hall (Dhyanasala) with Ramana's samadhi shrine, the still-living presence of Arunachala mountain visible from the grounds, and an extremely well-maintained library of Ramana's talks and collected teachings. The atmosphere is considered by practitioners of Advaita Vedanta to be among the most powerful in India — a direct continuation of Ramana's living transmission.",
    },
    {
        question: "What is Auroville and who is it for?",
        answer:
            "Auroville is an international township founded in 1968 near Pondicherry, Tamil Nadu, based on the teachings of Sri Aurobindo and the Mother (Mirra Alfassa). It was envisioned as a place where people of all nationalities could live together in pursuit of human unity and 'integral yoga' — Aurobindo's yoga of transformation that incorporates and transcends the physical, vital, mental, and spiritual dimensions. Today it is home to approximately 3,000 residents from 55+ countries. Volunteers can apply for stays of 1–4 weeks in various community projects.",
    },
    {
        question: "What is Panchakarma and what should I expect?",
        answer:
            "Panchakarma ('five actions') is Ayurveda's classical purification program — a multi-week protocol of oil treatments, steam therapies, herbal preparations, and dietary interventions designed to remove deep-seated toxins (ama) from the tissues, rebalance the doshas (constitutional elements), and restore nervous system function. Kerala is considered the global center of authentic Panchakarma — the specific climate, availability of authentic Kerala herbs, and unbroken lineage of Ayurvedic physicians (Vaidyas) make it the best environment for the treatment. Expect 7–28 days minimum; shorter 'spa-style' Panchakarma is not genuine treatment.",
    },
];

const sites = [
    {
        site: "Varanasi (Kashi)",
        state: "Uttar Pradesh",
        tradition: "Shaivism / All of Hinduism",
        essence: "The oldest living city. Sacred to Shiva. Continuous cremation pyres at Manikarnika Ghat. The direct confrontation with death as spiritual practice.",
        bestFor: "Anyone whose spiritual path includes working with impermanence, mortality, or the Shaivite tradition",
        bestTime: "October–March (avoid May–June extreme heat)",
        warning: "Extremely intense environment. Not a gentle introduction to India. Requires prior experience with Indian travel.",
    },
    {
        site: "Tiruvannamalai",
        state: "Tamil Nadu",
        tradition: "Advaita Vedanta / Shaivism",
        essence: "Home of the Ramanasramam (Ramana Maharshi's ashram) and sacred Arunachala mountain. The permanent environment of mouna (sacred silence) and self-inquiry.",
        bestFor: "Practitioners of Advaita Vedanta, Ramana Maharshi's teachings, or self-inquiry (Atma Vichara)",
        bestTime: "November for Karthigai Deepam (mountain fire festival). October–March generally.",
        warning: "Town is crowded during festival periods. Book accommodation well in advance for Karthigai Deepam.",
    },
    {
        site: "Auroville",
        state: "Tamil Nadu",
        tradition: "Integral Yoga (Sri Aurobindo and the Mother)",
        essence: "International experimental township of 3,000+ residents from 55 nations. The Matrimandir — a golden meditation sphere — is the spiritual center. Volunteer programs in sustainable agriculture, education, and community building.",
        bestFor: "Practitioners of Sri Aurobindo's integral yoga, those interested in conscious community and sustainable development",
        bestTime: "November–February (avoid March–May heat)",
        warning: "Not a traditional ashram or meditation retreat. Requires genuine alignment with the community&apos;s vision rather than tourism approach.",
    },
    {
        site: "Kerala (Panchakarma)",
        state: "Kerala",
        tradition: "Ayurveda",
        essence: "The global center of authentic Ayurvedic medicine and Panchakarma purification treatments. The unique Kerala climate, endemic herbs, and living lineages of Ayurvedic physicians (Vaidyas) cannot be replicated elsewhere.",
        bestFor: "Anyone seeking serious Ayurvedic treatment for chronic conditions, stress/burnout recovery, or deep physical-spiritual integration",
        bestTime: "June–September (Monsoon season is actually the optimal period for Panchakarma — the climate opens the body&apos;s pores optimally)",
        warning: "Genuine Panchakarma requires 14–28 days minimum. Avoid 3-day 'Panchakarma spa' experiences that use the name without the clinical depth.",
    },
];

export default function SacredSitesIndiaPage() {
    const article = getArticleBySlug("sacred-sites-india")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);
    const sacredSitesItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Sacred Sites in India",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "Place",
                    name: "Varanasi (Kashi)",
                    description:
                        "The oldest continuously inhabited city in the world, sacred to Shiva. Tradition holds that dying in Kashi grants moksha. The Manikarnika and Harishchandra cremation ghats have burned continuously for thousands of years.",
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: 25.3176,
                        longitude: 82.9739,
                    },
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Varanasi",
                        addressRegion: "Uttar Pradesh",
                        addressCountry: "IN",
                    },
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "Place",
                    name: "Tiruvannamalai (Ramanasramam and Arunachala)",
                    description:
                        "Home of the Sri Ramanasramam — Ramana Maharshi's ashram — and the sacred Arunachala mountain, considered an embodiment of Shiva as the fire of consciousness. The 14 km pradakshina circumambulation of Arunachala is a major practice.",
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: 12.2253,
                        longitude: 79.0747,
                    },
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Tiruvannamalai",
                        addressRegion: "Tamil Nadu",
                        addressCountry: "IN",
                    },
                },
            },
            {
                "@type": "ListItem",
                position: 3,
                item: {
                    "@type": "Place",
                    name: "Auroville",
                    description:
                        "International experimental township founded in 1968 near Pondicherry, based on Sri Aurobindo and the Mother's integral yoga. Home to approximately 3,000 residents from 55+ countries, centred on the Matrimandir meditation sphere.",
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: 12.0050,
                        longitude: 79.8100,
                    },
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Auroville",
                        addressRegion: "Tamil Nadu",
                        addressCountry: "IN",
                    },
                },
            },
            {
                "@type": "ListItem",
                position: 4,
                item: {
                    "@type": "Place",
                    name: "Kerala",
                    description:
                        "The global centre of authentic Ayurvedic Panchakarma. The climate, endemic herbs, and unbroken Vaidya lineages make Kerala the optimal environment for the classical 14–28 day purification protocol.",
                    address: {
                        "@type": "PostalAddress",
                        addressRegion: "Kerala",
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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sacredSitesItemList) }} />
            <ContentPageTracker slug="sacred-sites-india" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Spiritual Travel India Guide", href: "/spiritual-travel-india-guide" },
                            { label: "Sacred Sites in India", href: "/sacred-sites-india" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Beyond the <span className="text-orange-500 italic">Yoga Capital</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> India&apos;s most powerful spiritual destinations extend far beyond Rishikesh. Varanasi confronts you with death and impermanence on the Ganges. Tiruvannamalai&apos;s Ramanasramam maintains Ramana Maharshi&apos;s permanent atmosphere of self-inquiry. Auroville is an experimental integral yoga community of 3,000 people from 55 nations. Kerala is the authentic home of Panchakarma Ayurveda. Each serves a different intent.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            India calibrates you to what matters. The question is: which lens do you need?
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-8">The Four Sacred Sites</h2>
                            <div className="space-y-8">
                                {sites.map((site) => (
                                    <div key={site.site} className="rounded-2xl border border-border/40 bg-card/30 p-8">
                                        <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                                            <div>
                                                <h3 className="text-2xl font-bold text-foreground">{site.site}</h3>
                                                <p className="text-sm text-muted-foreground">{site.state} · {site.tradition}</p>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed mb-4">{site.essence}</p>
                                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-xs text-orange-400 uppercase tracking-widest mb-1">Best for</p>
                                                <p className="text-muted-foreground">{site.bestFor}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-orange-400 uppercase tracking-widest mb-1">Best time</p>
                                                <p className="text-muted-foreground">{site.bestTime}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-orange-400 uppercase tracking-widest mb-1">Know before you go</p>
                                                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: site.warning }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Varanasi: Where Life and Death Coexist</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Every spiritual tradition&apos;s deepest practices involve some confrontation with impermanence. Most Western spiritual seekers encounter this conceptually — through meditation instructions, philosophical readings, or death-awareness practices. Varanasi removes the conceptual layer entirely.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                The ghats (stepped riverbanks) of Varanasi stretch for several kilometers along the Ganges. At Manikarnika Ghat and Harishchandra Ghat, cremation fires burn continuously — maintained without interruption for thousands of years, according to tradition. Bodies are brought wrapped in cloth, carried on bamboo stretchers, briefly submerged in the Ganges, and then placed on the pyres.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Witnessing this is not morbid. For practitioners who have been meditating on impermanence abstractly, Varanasi makes it viscerally, undeniably real. The city&apos;s particular effect — described consistently across centuries of spiritual travelers — is a stripping away of the layers of distraction that normally insulate us from the central fact of existence. This is Varanasi&apos;s gift.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Tiruvannamalai: Where Silence Is Sacred</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Ramanasramam in Tiruvannamalai maintains what practitioners describe as the most powerful meditation atmosphere in India — not because of spectacular ceremony or elaborate ritual, but because of its simplicity and the specific quality of the silence that pervades the grounds.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Arunachala mountain rises directly behind the ashram. In the Shaivite tradition, Arunachala is not merely a sacred mountain — it is considered the embodiment of Shiva as the fire of consciousness (Jyotilinga). Ramana Maharshi himself never left the mountain after arriving at age 16. He described it as his guru. Walking the 14-kilometer pradakshina (circumambulation) around the mountain — done barefoot, traditionally at dawn — is one of the most profoundly reported spiritual practices available to visitors.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The ashram&apos;s library contains one of the most comprehensive collections of Advaita Vedanta texts available anywhere, with Ramana&apos;s own recorded talks and conversations available in multiple languages. Stays of several weeks are common and welcomed.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/ramana-maharshi-who-am-i" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Ramana&apos;s &quot;Who Am I?&quot; Technique <ArrowRight size={16} />
                                </Link>
                                <Link href="/spiritual-travel-india-guide" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Full India Travel Guide <ArrowRight size={16} />
                                </Link>
                            </div>
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
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Go Deeper.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            India&apos;s sacred geography is not backdrop — it is the teaching. Prepare properly and let each site do its work.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/indian-ashram-etiquette-packing"
                                eventLabel="sacred_sites:footer:packing"
                                trackPathName="indian-ashram-etiquette-packing"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Ashram Etiquette & Packing
                            </TrackedLink>
                            <TrackedLink
                                href="/silent-meditation-retreats-india"
                                eventLabel="sacred_sites:footer:retreats"
                                trackPathName="silent-meditation-retreats-india"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Silent Retreat Guide
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
