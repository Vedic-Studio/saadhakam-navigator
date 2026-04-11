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
    title: "How to Plan a Spiritual Trip to India: The Complete Guide",
    description:
        "Plan a spiritual trip to India without getting scammed or burnt out. Best time to go, Ayush Visa vs tourist visa, how to choose an authentic ashram, and what to expect culturally.",
    alternates: {
        canonical: "https://www.opensadhaka.com/spiritual-travel-india-guide",
    },
    openGraph: {
        title: "How to Plan a Spiritual Trip to India",
        description:
            "The complete practical guide: best season, visa types, how to choose an authentic ashram vs yoga resort, health prep, and managing expectations for India travel.",
        url: "https://www.opensadhaka.com/spiritual-travel-india-guide",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is the best time of year for spiritual travel to India?",
        answer:
            "October through March is the best window for most spiritual destinations in India — temperatures are moderate across most of the country, and the major festivals (Diwali, Kumbh Mela cycle, Maha Shivaratri) occur in this period. The summer months (April–June) are extremely hot in the plains and most suitable only for high-altitude destinations like Dharamshala and upper Himalayas. Monsoon season (July–September) brings beauty but significant travel disruption, particularly for the Himalayan region.",
    },
    {
        question: "Do I need a special visa to study yoga or Ayurveda in India?",
        answer:
            "India offers an e-Ayush Visa specifically for wellness tourism — including yoga, Ayurveda, Unani, and Siddha treatments. For visits under 60 days at recognized institutions, an e-Tourist visa typically suffices. For longer-term study programs (90+ days, formal yoga teacher trainings at institutions recognized by the Ministry of AYUSH), the e-Ayush Visa or Student Visa is more appropriate. Check current regulations via the Indian government's official visa portal, as requirements change periodically.",
    },
    {
        question: "What is the difference between an ashram and a yoga retreat?",
        answer:
            "A traditional ashram is a residential spiritual community centered on disciplined practice, service (seva), and study — typically with a clear teacher-student structure, a specific philosophical tradition, and modest accommodation. A yoga retreat is a commercial hospitality product offering yoga classes and wellness experiences in a resort setting. Both have value; they serve different needs. An ashram asks you to adapt to its rhythm; a retreat adapts to your preferences. For serious spiritual study, an authentic ashram is the appropriate setting.",
    },
    {
        question: "Is it safe to travel to India alone for spiritual purposes?",
        answer:
            "India is generally safe for solo travelers, including solo women, particularly in the spiritual travel circuits (Rishikesh, Dharamshala, Varanasi, Tiruvannamalai, Kerala). Standard precautions apply: research your destination thoroughly, stay in accommodation with good reviews, dress modestly at spiritual sites, be cautious in tourist-heavy areas, and inform trusted contacts of your itinerary. The ashram circuits in particular have well-established hosting traditions and are experienced in receiving international visitors.",
    },
];

const seasons = [
    {
        season: "October – March",
        rating: "Best",
        destinations: "Rishikesh, Varanasi, Kerala, Tamil Nadu, Rajasthan",
        notes: "Cool to mild temperatures. Major festivals. Peak tourist season for spiritual circuits.",
    },
    {
        season: "April – June",
        rating: "Good (Hills only)",
        destinations: "Dharamshala, Rishikesh (before May), Leh, Manali",
        notes: "Extreme heat in plains. Himalayan foothills pleasant. Good for Dharamshala.",
    },
    {
        season: "July – September",
        rating: "Avoid (Himalayas)",
        destinations: "Kerala (unique), South India generally",
        notes: "Monsoon season. Travel disruption in mountains. Kerala's Ayurveda season begins.",
    },
];

const ashramChecklist = [
    {
        category: "Verify",
        items: [
            "Clear lineage (Parampara) — can the ashram name its teacher-chain?",
            "Transparent fee structure with no hidden upgrade pressure",
            "The daily schedule is published and publicly available",
            "Reviews from long-term residents (not just tourists)",
        ],
    },
    {
        category: "Red Flags",
        items: [
            "Teacher claims direct divine appointment with no human lineage",
            "Significant portion of content behind paid progression walls",
            "Discouragement from outside reading or other teachers",
            "Volunteer/karma yoga presented as mandatory rather than optional",
        ],
    },
    {
        category: "Practical Questions",
        items: [
            "Is vegetarian food provided and included?",
            "What language is the teaching in? (Translation available?)",
            "Private vs shared accommodation options?",
            "Can you leave freely if the program isn't right for you?",
        ],
    },
];

export default function SpiritualTravelIndiaGuidePage() {
    const article = getArticleBySlug("spiritual-travel-india-guide")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="spiritual-travel-india-guide" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Spiritual Travel India Guide", href: "/spiritual-travel-india-guide" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            India Without the <span className="text-orange-500 italic">Illusions</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> The best time for spiritual travel to India is October–March. For stays over 60 days at recognized institutions, use an Ayush Visa rather than a tourist visa. Authentic ashrams have transparent fees, clear lineage, and published daily schedules — commercial yoga resorts do not. Managing the expectation of &quot;instant enlightenment&quot; is the most important preparation of all.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            India does not deliver transcendence on a schedule. It delivers confrontation with yourself — which is, eventually, the same thing.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">When to Go: The Seasonal Guide</h2>
                            <div className="overflow-x-auto rounded-2xl border border-border/30 mb-8">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-background/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Season</th>
                                            <th className="p-4 font-bold text-orange-400">Rating</th>
                                            <th className="p-4 font-bold text-foreground">Best Destinations</th>
                                            <th className="p-4 font-bold text-muted-foreground">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20 text-muted-foreground">
                                        {seasons.map((s) => (
                                            <tr key={s.season}>
                                                <td className="p-4 font-medium text-foreground">{s.season}</td>
                                                <td className="p-4 text-orange-400 font-bold">{s.rating}</td>
                                                <td className="p-4">{s.destinations}</td>
                                                <td className="p-4">{s.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                For the Kumbh Mela — the world&apos;s largest gathering, held on a 12-year cycle in Prayagraj — attendance requires separate planning, as the event draws tens of millions of pilgrims to a small geographic area. The 2025 Maha Kumbh at Prayagraj was a once-in-12-years event; the next will be in 2037.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Navigating Visas</h2>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-3">e-Tourist Visa</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Up to 90 days per visit (60-day and 30-day options)</li>
                                        <li>• Multiple entries available</li>
                                        <li>• Suitable for short retreats, yoga drop-ins, temple tours</li>
                                        <li>• Cannot be extended in-country</li>
                                        <li>• Apply online via indianvisaonline.gov.in</li>
                                    </ul>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-3">e-Ayush Visa</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Specifically for yoga, Ayurveda, Unani, and Siddha</li>
                                        <li>• Valid for stays at Ministry of AYUSH-registered institutions</li>
                                        <li>• Required documentation from the institution</li>
                                        <li>• Best for 200-hour/300-hour yoga teacher trainings</li>
                                        <li>• Duration matched to program length</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-orange-500/20 pl-4">
                                <strong className="text-orange-400">Important:</strong> Visa requirements change frequently. Always verify current requirements at the official Indian government visa portal or your country&apos;s embassy in India before travel.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How to Choose an Ashram</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                The critical distinction: authentic ashrams vs commercial yoga resorts. Both have value — they simply serve different needs. If your intent is serious study and practice rather than wellness tourism, use this checklist:
                            </p>
                            <div className="grid sm:grid-cols-3 gap-6">
                                {ashramChecklist.map((c) => (
                                    <div key={c.category} className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                                        <h3 className={`font-bold mb-3 ${c.category === "Red Flags" ? "text-orange-400" : "text-foreground"}`}>{c.category}</h3>
                                        <ul className="space-y-2">
                                            {c.items.map((item) => (
                                                <li key={item} className="text-sm text-muted-foreground flex gap-2">
                                                    <span className="text-orange-500 mt-0.5">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Managing Expectations</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The most common and predictable disappointment in spiritual travel to India: arriving with an expectation of dramatic, rapid transformation and encountering instead a culture shock, intestinal illness, bureaucratic complexity, and the same internal landscape you brought with you.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Health Preparation is Non-Negotiable</h3>
                                    <p className="text-muted-foreground leading-relaxed">Traveler&apos;s diarrhea affects 30–70% of visitors to India. Practical preparation: probiotics for 3–4 weeks before travel, water purification tablets or a portable filter, oral rehydration salts, anti-diarrheal medication (not to suppress infection but to manage acute episodes during transit). An ounce of prevention allows your spiritual practice to actually occur.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">The Transformation is Not What You Imagined</h3>
                                    <p className="text-muted-foreground leading-relaxed">The productive insight most long-term India travellers arrive at: the transformation doesn&apos;t look like a meditation experience. It looks like meeting your own impatience in a chai shop that takes 45 minutes to serve you. Meeting your own entitlement in an ashram that expects you to clean toilets before morning practice. Meeting your own loneliness in a culture that is utterly indifferent to your spiritual ambitions. This is the teaching.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Build in Unstructured Time</h3>
                                    <p className="text-muted-foreground leading-relaxed">The spiritual riches of India require slow absorption. Over-scheduling — three cities, two ashrams, one retreat, two weeks — produces exhaustion, not enlightenment. A more effective approach: one primary base for the majority of your trip, with one or two short excursions. Depth over breadth, in a culture where depth is the entire point.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/rishikesh-vs-dharamshala" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Rishikesh vs Dharamshala <ArrowRight size={16} />
                                </Link>
                                <Link href="/silent-meditation-retreats-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Silent Retreat Guide <ArrowRight size={16} />
                                </Link>
                                <Link href="/indian-ashram-etiquette-packing" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Ashram Packing & Etiquette <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Go Prepared. Come Back Changed.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            India is the ultimate accelerant for genuine seekers. Prepare wisely — and choose your destination.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/rishikesh-vs-dharamshala"
                                eventLabel="india_guide:footer:rishikesh"
                                trackPathName="rishikesh-vs-dharamshala"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Rishikesh vs Dharamshala
                            </TrackedLink>
                            <TrackedLink
                                href="/silent-meditation-retreats-india"
                                eventLabel="india_guide:footer:retreats"
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
