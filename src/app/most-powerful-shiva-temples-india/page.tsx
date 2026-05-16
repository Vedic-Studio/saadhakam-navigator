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
    title: "The Most Powerful Shiva Temples in India: Jyotirlingas Guide",
    description:
        "The 12 Jyotirlingas are India's most sacred Shiva temples — sites where Shiva appeared as an infinite column of light. Kedarnath, Kashi Vishwanath, Somnath: what each site offers and why it matters.",
    alternates: {
        canonical: "https://www.opensadhaka.com/most-powerful-shiva-temples-india",
    },
    openGraph: {
        title: "The Jyotirlingas: India's Most Powerful Shiva Temples",
        description:
            "12 shrines where Shiva appeared as an infinite pillar of light. The ascetic Himalayan trek to Kedarnath. Liberation at death in Kashi. The science of consecration explained.",
        url: "https://www.opensadhaka.com/most-powerful-shiva-temples-india",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is a Jyotirlinga?",
        answer:
            "A Jyotirlinga (Sanskrit: jyoti = light, linga = column/symbol) is one of 12 shrines in India where Shiva is believed to have appeared as a self-manifested column of infinite light, rather than being installed by human hands. The mythology originates from the Shiva Purana: when Brahma and Vishnu disputed supremacy, Shiva appeared as an endless pillar of fire to demonstrate his infinite nature. The 12 Jyotirlingas are distributed across India from Gujarat to the Himalayas.",
    },
    {
        question: "What is the spiritual significance of Kedarnath?",
        answer:
            "Kedarnath in Uttarakhand (3,583 meters altitude) is one of the most austere pilgrimage sites in Hinduism. The approach requires a 16-km mountain trek through severe terrain. The temple is accessible only May–November; it is buried in snow the rest of the year. Its significance lies in Shiva's aspect as the cosmic destroyer and ascetic — the extreme pilgrimage itself is considered the purification. The 2013 Kedarnath floods, which killed thousands, deepened its mythic weight.",
    },
    {
        question: "What is Kashi Vishwanath temple and why is Varanasi sacred for death?",
        answer:
            "Kashi Vishwanath in Varanasi is the most important Jyotirlinga for moksha. Hindu tradition holds that dying in Kashi (Varanasi) grants liberation regardless of karma because Shiva himself whispers the Taraka mantra (liberation mantra) into the ear of the dying. The temple has been destroyed and rebuilt multiple times — most recently by the Mughal emperor Aurangzeb and later by Maharani Ahilyabai Holkar in 1780. The golden spire above the current shrine is gilded with approximately 800 kg of gold.",
    },
];

const JYOTIRLINGAS: Array<{
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    addressLocality: string;
    addressRegion: string;
}> = [
    {
        name: "Somnath Jyotirlinga",
        description: "The first of the 12 Jyotirlingas, on the Arabian Sea coast of Gujarat. Reconstructed multiple times after historical raids; presently in its modern form rebuilt in 1951.",
        latitude: 20.8880,
        longitude: 70.4011,
        addressLocality: "Prabhas Patan",
        addressRegion: "Gujarat",
    },
    {
        name: "Mallikarjuna Jyotirlinga",
        description: "Hilltop Shiva shrine at Srisailam on the Krishna River, sacred to both Shaiva and Shakta traditions.",
        latitude: 16.0731,
        longitude: 78.8687,
        addressLocality: "Srisailam",
        addressRegion: "Andhra Pradesh",
    },
    {
        name: "Mahakaleshwar Jyotirlinga",
        description: "Self-manifested (Swayambhu) Shiva shrine in Ujjain, famous for the Bhasma Aarti performed before dawn.",
        latitude: 23.1828,
        longitude: 75.7681,
        addressLocality: "Ujjain",
        addressRegion: "Madhya Pradesh",
    },
    {
        name: "Omkareshwar Jyotirlinga",
        description: "Shiva shrine on Mandhata island in the Narmada River, shaped like the sacred syllable Om.",
        latitude: 22.2410,
        longitude: 76.1500,
        addressLocality: "Omkareshwar",
        addressRegion: "Madhya Pradesh",
    },
    {
        name: "Kedarnath Jyotirlinga",
        description: "Himalayan shrine at 3,583 meters, reached by a 16 km mountain trek and open only between May and November. Survived the 2013 Uttarakhand floods.",
        latitude: 30.7346,
        longitude: 79.0669,
        addressLocality: "Kedarnath",
        addressRegion: "Uttarakhand",
    },
    {
        name: "Bhimashankar Jyotirlinga",
        description: "Shiva shrine in the Sahyadri hills of Maharashtra, source of the Bhima River.",
        latitude: 19.0728,
        longitude: 73.5363,
        addressLocality: "Bhimashankar",
        addressRegion: "Maharashtra",
    },
    {
        name: "Kashi Vishwanath Jyotirlinga",
        description: "Varanasi's central Shiva shrine; tradition holds that dying in Kashi grants moksha because Shiva himself whispers the Taraka mantra to the dying. Rebuilt in 1780 by Maharani Ahilyabai Holkar.",
        latitude: 25.3109,
        longitude: 83.0107,
        addressLocality: "Varanasi",
        addressRegion: "Uttar Pradesh",
    },
    {
        name: "Trimbakeshwar Jyotirlinga",
        description: "Shiva shrine near Nashik at the source of the Godavari River, distinctive for its three faces representing Brahma, Vishnu, and Rudra.",
        latitude: 19.9322,
        longitude: 73.5302,
        addressLocality: "Trimbak",
        addressRegion: "Maharashtra",
    },
    {
        name: "Vaidyanath Jyotirlinga",
        description: "Shiva shrine in Deoghar, Jharkhand, associated with healing (Vaidya = physician). Major destination during the Shravan Mela.",
        latitude: 24.4925,
        longitude: 86.7000,
        addressLocality: "Deoghar",
        addressRegion: "Jharkhand",
    },
    {
        name: "Nageshwar Jyotirlinga",
        description: "Shiva shrine near Dwarka on the Gujarat coast, presided over by a giant outdoor Shiva statue.",
        latitude: 22.2585,
        longitude: 69.0852,
        addressLocality: "Dwarka",
        addressRegion: "Gujarat",
    },
    {
        name: "Rameshwaram Jyotirlinga",
        description: "Shiva shrine on Pamban island, Tamil Nadu, associated with Rama's worship of Shiva before crossing to Lanka. Features the longest temple corridor in India.",
        latitude: 9.2881,
        longitude: 79.3174,
        addressLocality: "Rameshwaram",
        addressRegion: "Tamil Nadu",
    },
    {
        name: "Grishneshwar Jyotirlinga",
        description: "The twelfth Jyotirlinga, located near the Ellora Caves in Maharashtra and reconstructed in the 18th century by Ahilyabai Holkar.",
        latitude: 20.0237,
        longitude: 75.1796,
        addressLocality: "Ellora",
        addressRegion: "Maharashtra",
    },
];

export default function MostPowerfulShivaTemplesIndiaPage() {
    const article = getArticleBySlug("most-powerful-shiva-temples-india")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);
    const jyotirlingasItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "The 12 Jyotirlingas of India",
        itemListElement: JYOTIRLINGAS.map((j, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Place",
                name: j.name,
                description: j.description,
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: j.latitude,
                    longitude: j.longitude,
                },
                address: {
                    "@type": "PostalAddress",
                    addressLocality: j.addressLocality,
                    addressRegion: j.addressRegion,
                    addressCountry: "IN",
                },
            },
        })),
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jyotirlingasItemList) }} />
            <ContentPageTracker slug="most-powerful-shiva-temples-india" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Kailasa Temple Ellora", href: "/kailasa-temple-ellora" },
                            { label: "Most Powerful Shiva Temples", href: "/most-powerful-shiva-temples-india" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Where Shiva <span className="text-orange-500 italic">Appeared</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> The most sacred Shiva temples in India are the 12 Jyotirlingas — shrines where Shiva is believed to have appeared as a self-manifested infinite column of light, rather than being installed by human hands. The most spiritually significant are Kedarnath (in the Himalayas, accessible only by grueling mountain trek) and Kashi Vishwanath in Varanasi, where tradition holds that dying in the city grants moksha because Shiva himself whispers the liberation mantra to the departing soul.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The Jyotirlinga is not a statue. It is the point where Shiva&apos;s infinite nature made itself perceptible.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Kedarnath: Where Shiva Tests Devotion</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Kedarnath represents Shiva in his most austere aspect — the cosmic ascetic, the world-dissolver, the force that strips away all comfort and pretense. The 16-kilometer mountain trek to the shrine (at 3,583 meters) through snow-capped passes, glacier streams, and thin altitude air is not incidental to the pilgrimage — it is the pilgrimage. The physical ordeal is the practice. Arriving at Kedarnath in pre-dawn hours to the sound of bells and chanting, after hours of mountain walking, creates a quality of openness and intensity that is difficult to access any other way.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The 2013 Uttarakhand floods devastated the Kedarnath valley, killing thousands of pilgrims and destroying the surrounding infrastructure. The shrine itself survived. For many devotees, the temple&apos;s survival deepened its sacred status rather than diminishing it. The trek is now also accessible by helicopter for those unable to walk, though traditionalists consider the physical journey inseparable from the pilgrimage. {/* EXPAND */}
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">Kashi Vishwanath: Shiva as the Granter of Liberation</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Varanasi (Kashi) is considered Shiva&apos;s eternal city — the place where his cosmic dance intersects with human mortality. The Kashi Vishwanath temple is built over the precise spot where this intersection is believed to be most intense. The ancient texts are explicit: dying in Kashi is dying in Shiva&apos;s lap. The soul does not pass through the normal cycle of rebirth but is met at the moment of death by Shiva himself, who whispers the Taraka mantra — the bridge between manifest and unmanifest — directly into the dying person&apos;s ear.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The cremation ghats at Manikarnika, a short walk from the temple, have burned continuously for thousands of years. For practitioners who have been meditating on impermanence abstractly, Varanasi and Kashi Vishwanath make it concrete. The science of temple consecration (Prana Pratishtha) holds that a properly consecrated temple functions as an energetic battery — not merely a symbol but an active transmitter of the deity&apos;s presence for centuries after the installation. {/* EXPAND */}
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
                            <Link href="/sacred-sites-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Sacred Sites in India <ArrowRight size={16} />
                            </Link>
                            <Link href="/south-india-temple-architecture" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                South India Temple Architecture <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Plan Your Pilgrimage.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The pilgrimage is not the destination. It is what you become along the way.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/sacred-sites-india"
                                eventLabel="shiva_temples:footer:sacred-sites"
                                trackPathName="sacred-sites-india"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                India Sacred Sites Guide
                            </TrackedLink>
                            <TrackedLink
                                href="/spiritual-travel-india-guide"
                                eventLabel="shiva_temples:footer:travel"
                                trackPathName="spiritual-travel-india-guide"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Spiritual Travel India
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
