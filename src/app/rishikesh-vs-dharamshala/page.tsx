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
    title: "Rishikesh vs Dharamshala: Choosing Your Spiritual Basecamp in India",
    description:
        "Rishikesh is Hindu yoga on the Ganges. Dharamshala is Tibetan Buddhist in the Himalayas. Which is right for your practice? A practical comparison with ashrams, costs, safety, and vibe.",
    alternates: {
        canonical: "https://www.opensadhaka.com/rishikesh-vs-dharamshala",
    },
    openGraph: {
        title: "Rishikesh vs Dharamshala: Which Spiritual Hub Fits You?",
        description:
            "Hindu yoga capital vs Little Tibet. A detailed comparison to help you choose your spiritual home in India.",
        url: "https://www.opensadhaka.com/rishikesh-vs-dharamshala",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is Rishikesh known for spiritually?",
        answer:
            "Rishikesh (Uttarakhand) is known as the 'World Capital of Yoga' — a designation earned through its dense concentration of ashrams, yoga schools, and the presence of the Ganges River, considered sacred in Hinduism. It was made internationally famous when The Beatles visited the Maharishi Mahesh Yogi ashram in 1968 (now ruins open for tours). It is the primary global hub for Hatha Yoga teacher trainings (200-hour YTT programs) and houses major ashrams including Parmarth Niketan, Swarg Ashram, and Phool Chatti.",
    },
    {
        question: "Is Rishikesh safe for solo female travelers?",
        answer:
            "Generally yes — Rishikesh has a well-established international spiritual tourism infrastructure and is experienced with solo female travelers. The key precautions: dress modestly (cover shoulders and knees at minimum, loose trousers better than shorts), avoid isolated areas after dark, use established transportation rather than solo walks along the river at night, and stay in accommodation with good reviews. Areas like Laxman Jhula, Ram Jhula, and Swarg Ashram are the most frequented and safest zones for international visitors.",
    },
    {
        question: "What is the cost of a yoga retreat in Rishikesh?",
        answer:
            "Costs vary enormously by type. Drop-in yoga classes: 200–500 rupees (~$2.50–6 USD). Comfortable ashram accommodation with meals: 800–2000 rupees/day (~$10–25 USD). 200-hour Yoga Teacher Training (YTT) programs: $500–2000 USD depending on school quality and accommodation standard. 28-30 day YTT programs at mid-range schools with accommodation and meals typically cost $800–1200 USD. Rishikesh remains significantly more affordable than equivalent yoga teacher training programs in Europe, USA, or Bali.",
    },
    {
        question: "What is McLeod Ganj in Dharamshala?",
        answer:
            "McLeod Ganj is the upper district of Dharamshala (Himachal Pradesh) — a small hill town that has been home to the Tibetan government-in-exile since the Dalai Lama took residence there in 1960. It is sometimes called 'Little Tibet' or 'Little Lhasa' for its distinctive Tibetan cultural atmosphere: prayer flags everywhere, Tibetan monasteries, monks in robes, momos (dumplings) in every cafe, and a distinctive sense of quiet dignity. It is the primary destination for Tibetan Buddhism-based practice, including Vipassana retreats and Vajrayana courses.",
    },
];

const comparison = [
    { dimension: "Spiritual tradition", rishikesh: "Hindu Yoga — Hatha, Kriya, Vedanta", dharamshala: "Tibetan Buddhism — Vipassana, Mahayana, Vajrayana" },
    { dimension: "Primary river/mountain", rishikesh: "Ganges River — sacred to Hinduism", dharamshala: "Dhauladhar mountain range — Himalayan foothills" },
    { dimension: "Best for", rishikesh: "Yoga teacher training, asana depth, Vedanta study", dharamshala: "Silent meditation retreat, Vipassana, Tibetan Buddhist study" },
    { dimension: "Atmosphere", rishikesh: "Busy, commercial, international — chaotic but exciting", dharamshala: "Quieter, contemplative, strong refugee community presence" },
    { dimension: "Famous ritual", rishikesh: "Ganga Aarti at sunset — lamps on the river", dharamshala: "Tibetan prayer ceremonies, kora (circumambulation)" },
    { dimension: "Altitude", rishikesh: "372m — hot in summer, mild in winter", dharamshala: "1457m (McLeod) — cool year-round, snow in winter" },
    { dimension: "YTT programs", rishikesh: "Hundreds of programs — highly competitive", dharamshala: "Buddhist study programs, fewer yoga schools" },
    { dimension: "Best season", rishikesh: "October–March (avoid May–September heat)", dharamshala: "March–June, Sept–Nov (avoid December–February snow)" },
];

const rishikeshAshrams = [
    {
        name: "Parmarth Niketan",
        character: "Large, international, daily Ganga Aarti ceremony. Good balance of structure and openness for beginners.",
        bestFor: "First-time visitors, yoga beginners, weekend retreats",
    },
    {
        name: "Sivananda Ashram",
        character: "Founded by Swami Sivananda's disciple. Traditional structure, strict schedule (5am wake-up), Vedanta philosophy.",
        bestFor: "Serious practitioners wanting authentic Sivananda-style yoga",
    },
    {
        name: "Phool Chatti Ashram",
        character: "Smaller, more intimate. Hatha yoga focus, vegetarian meals, traditional atmosphere without heavy commercialization.",
        bestFor: "Practitioners seeking authentic experience without tourist crowds",
    },
];

export default function RishikeshVsDharamsalaPage() {
    const article = getArticleBySlug("rishikesh-vs-dharamshala")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="rishikesh-vs-dharamshala" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Spiritual Travel India Guide", href: "/spiritual-travel-india-guide" },
                            { label: "Rishikesh vs Dharamshala", href: "/rishikesh-vs-dharamshala" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The Ganges or the <span className="text-orange-500 italic">Himalayas?</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Rishikesh is India&apos;s Hindu yoga capital — dense with yoga schools, Ganges ceremonies, and Vedanta study. Dharamshala (McLeod Ganj) is &quot;Little Tibet&quot; — home of the Dalai Lama, Tibetan Buddhist monasteries, and Vipassana retreats. Choose Rishikesh for yoga teacher training and Hindu philosophy. Choose Dharamshala for silent meditation, Buddhist study, and mountain contemplation.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Both are transformative — but for completely different reasons. The question is which tradition you are called to.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Side-by-Side Comparison</h2>
                            <div className="overflow-x-auto rounded-2xl border border-border/30">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-background/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Dimension</th>
                                            <th className="p-4 font-bold text-orange-400">Rishikesh</th>
                                            <th className="p-4 font-bold text-muted-foreground">Dharamshala / McLeod Ganj</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20 text-muted-foreground">
                                        {comparison.map((row) => (
                                            <tr key={row.dimension}>
                                                <td className="p-4 font-medium text-foreground">{row.dimension}</td>
                                                <td className="p-4 text-foreground">{row.rishikesh}</td>
                                                <td className="p-4">{row.dharamshala}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Rishikesh: The Yoga Capital</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Rishikesh sits where the Ganges emerges from the Himalayas into the plains — a point of power in the Hindu cosmology for thousands of years. It was the destination for rishis (sages) seeking a pure environment for practice, and the sacred geography still carries that quality despite the commercial overlay.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                The Ganga Aarti ceremony at sunset — priests swinging large ceremonial lamps over the flowing river while hundreds watch from the ghats — is one of the most powerful ritual experiences available to visitors regardless of their own tradition. It is not a performance for tourists; it has been conducted every evening for centuries.
                            </p>

                            <h3 className="text-2xl font-display font-bold mb-6">Notable Ashrams for Westerners</h3>
                            <div className="space-y-4 mb-8">
                                {rishikeshAshrams.map((a) => (
                                    <div key={a.name} className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h4 className="font-bold text-orange-400 mb-2">{a.name}</h4>
                                        <p className="text-sm text-muted-foreground mb-2">{a.character}</p>
                                        <p className="text-xs text-muted-foreground italic border-l-2 border-orange-500/20 pl-3"><strong>Best for:</strong> {a.bestFor}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Dharamshala: Little Tibet</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                When the Dalai Lama and approximately 80,000 Tibetan refugees arrived in India in 1959–60, they settled in what had been a British hill station above Dharamshala. Over six decades, McLeod Ganj transformed into a distinct world: functioning Tibetan Buddhist monasteries, the Tibetan Institute of Performing Arts, the Library of Tibetan Works and Archives, and a community of practitioners from around the world who come to study with Tibetan teachers.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The atmosphere is notably different from Rishikesh: slower, more contemplative, tinged with the particular quality of a culture that has survived displacement and carries both grief and profound dignity. For practitioners drawn to Vipassana, Tibetan Buddhist philosophy, or the specific kind of stillness that comes from proximity to the Dalai Lama&apos;s presence (he is occasionally available for public teachings), Dharamshala has no equivalent.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The Tushita Meditation Centre above McLeod Ganj offers structured 10-day Introduction to Buddhism courses that are among the best-organized entry points for the tradition available to Western practitioners anywhere in the world.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/silent-meditation-retreats-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Silent Retreat Guide <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Your Spiritual Basecamp Awaits.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Pack for your destination and prepare for what India always delivers: yourself, more clearly than before.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/indian-ashram-etiquette-packing"
                                eventLabel="rishikesh_dharamshala:footer:packing"
                                trackPathName="indian-ashram-etiquette-packing"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Ashram Packing Guide
                            </TrackedLink>
                            <TrackedLink
                                href="/silent-meditation-retreats-india"
                                eventLabel="rishikesh_dharamshala:footer:retreats"
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
