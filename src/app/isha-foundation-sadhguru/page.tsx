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
    title: "Isha Foundation & Sadhguru: Criticisms, Cult Accusations, and Shambhavi Mahamudra",
    description:
        "Is Isha Foundation a cult? A neutral, factual look at Sadhguru's background, the common criticisms of his organization, and whether the core practice — Shambhavi Mahamudra — actually works.",
    alternates: {
        canonical: "https://www.opensadhaka.com/isha-foundation-sadhguru",
    },
    openGraph: {
        title: "Investigating Sadhguru and Isha Foundation",
        description:
            "Separating the practice from the personality. What does the evidence say about Sadhguru's teachings, his critics, and Shambhavi Mahamudra?",
        url: "https://www.opensadhaka.com/isha-foundation-sadhguru",
        type: "article",
    },
};

const faqs = [
    {
        question: "Who is Sadhguru (Jaggi Vasudev)?",
        answer:
            "Sadhguru (born Jaggi Vasudev, 1957) is a South Indian yogi, author, and public speaker who founded the Isha Foundation in Coimbatore, Tamil Nadu, in 1992. He claims a spontaneous spiritual awakening experience at age 25 on Chamundi Hill in Mysore. He is not the inheritor of a specific traditional lineage — he describes himself as having received no formal initiation and teaching from his own experience. He gained global prominence through his TED Talks, his New York Times bestselling book 'Inner Engineering,' and his environmental campaign 'Save Soil.'",
    },
    {
        question: "Is Isha Foundation a cult?",
        answer:
            "The organization explicitly denies being a cult and has issued formal rebuttals to cult designation. The question is complicated: Isha does not exhibit the most extreme cult markers (complete isolation, preventing members from leaving, physical coercion). Critics point to: aggressive volunteer labor practices, an extreme personality cult around Sadhguru, reported pressure on participants to upgrade to more expensive programs, and instances of volunteers reporting unhealthy psychological dependency. Whether this meets the threshold of 'cult' is a definitional question. The key advice: engage with the practices that work for you without developing uncritical devotion to any personality.",
    },
    {
        question: "What is Shambhavi Mahamudra and is it effective?",
        answer:
            "Shambhavi Mahamudra is a 21-minute practice combining pranayama, bandhas (energy locks), and meditation taught by Isha Foundation as part of their flagship Inner Engineering program. It is the core practice taught by the organization. Research from Isha-affiliated studies (and some independent analyses) reports improvements in stress markers, sleep quality, and emotional regulation in regular practitioners. Separating the practice itself from claims about the teacher who teaches it: practitioners from multiple traditions have reported genuine benefits from the specific breathwork pattern, regardless of metaphysical claims about its origins.",
    },
    {
        question: "Does Sadhguru have a lineage?",
        answer:
            "This is one of the substantive criticisms. Sadhguru does not claim transmission from a living teacher. He describes his teachings as arising from his own direct experience and from the 'adi yogi' (Shiva as the first yogi) through a form of non-physical transmission. Traditional yoga lineages maintain Parampara — an unbroken chain of teacher-to-student transmission — as the authenticating mechanism for claimed teachings. Sadhguru's self-authorized lineage is unusual and is a legitimate point of scrutiny, though it does not automatically invalidate the efficacy of any specific practices he teaches.",
    },
];

export default function IshaFoundationSadhguruPage() {
    const article = getArticleBySlug("isha-foundation-sadhguru")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="isha-foundation-sadhguru" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "How to Spot a Fake Guru", href: "/how-to-spot-fake-spiritual-guru" },
                            { label: "Sadhguru & Isha Foundation", href: "/isha-foundation-sadhguru" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Separating Practice from <span className="text-orange-500 italic">Personality</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Sadhguru (Jaggi Vasudev) founded Isha Foundation in 1992 and teaches yoga, meditation, and environmental activism globally. Common criticisms include: lack of traditional lineage, aggressive marketing, volunteer labor practices, and personality cult dynamics. The core practice he teaches — Shambhavi Mahamudra — is reported by many practitioners to be genuinely effective for stress reduction. The practical recommendation: evaluate the practice on its own merits, without idealization or dismissal of the teacher.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The tradition&apos;s test for any teaching: does consistent practice in this method actually move the practitioner toward genuine clarity and freedom? Everything else is secondary.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Who is Sadhguru?</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Jaggi Vasudev was born in 1957 in Mysore, Karnataka. He describes a pivotal experience at age 25 on Chamundi Hill, where he sat on a rock and experienced what he calls a dissolution of his sense of self and a profound expansion of consciousness — a spontaneous realization that he spent the following decade attempting to understand and contextualize within yogic frameworks.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                He founded Isha Foundation in 1992, which now operates yoga centers, an ashram (Isha Yoga Center near Coimbatore), and large-scale ecological projects including Rally for Rivers and Save Soil. He has spoken at the UN, World Economic Forum, and multiple heads-of-state forums. His book &quot;Inner Engineering&quot; became a New York Times bestseller.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                He does not fit neatly into any traditional category. He is not a Swami in the conventional sense (no formal renunciate vows from an established order). He does not claim transmission from a human guru. He positions himself as a transmitter of an ancient yogic science — specifically from the adi yogi tradition — through direct access rather than lineage succession.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Criticisms — Neutrally Examined</h2>
                            <div className="space-y-5">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Missing Traditional Lineage</h3>
                                    <p className="text-muted-foreground leading-relaxed">Legitimate concern. Traditional yoga lineages maintain Parampara for a reason — it ensures authenticity, accountability, and the continuity of actual transmission rather than intellectual reconstruction. Sadhguru&apos;s self-authorized teaching is unusual and is appropriately viewed with greater scrutiny than teachers who can trace their transmission through verifiable chains.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Aggressive Marketing</h3>
                                    <p className="text-muted-foreground leading-relaxed">Widely reported by participants: strong encouragement (sometimes felt as pressure) to upgrade from free content to paid programs, to attend retreats, and to bring friends and family into the organization. The Inner Engineering program costs range significantly by country and format. Free content is genuine; the pressure dynamics around upgrades are a consistent criticism.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Volunteer Labor and Devotion Dynamics</h3>
                                    <p className="text-muted-foreground leading-relaxed">The Isha Yoga Center operates largely on volunteer labor. Multiple former volunteers have described extreme hours, psychological pressure to prioritize ashram duties over personal relationships, and a culture where questioning Sadhguru&apos;s statements is subtly discouraged. These dynamics are not unique to Isha — they appear in many large spiritual organizations — but they warrant awareness.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Controversial Statements</h3>
                                    <p className="text-muted-foreground leading-relaxed">Sadhguru has made various statements on political and scientific topics — climate science, vaccines, agricultural policy — that have been disputed or criticized by specialists. Whether these reflect genuine expertise or strategic positioning is contested. They are separate from the question of whether his core meditation teachings have value.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Shambhavi Mahamudra: The Practice Itself</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Setting aside questions about the teacher, the specific practice of Shambhavi Mahamudra is worth evaluating on its own merits:
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">What the Practice Involves</h3>
                                    <p className="text-muted-foreground leading-relaxed">A 21-minute daily practice combining specific pranayama techniques (breathing patterns with ratios of inhalation, retention, and exhalation), bandhas (internal energy locks that affect the nervous system), and a form of Shambhavi mudra (upward gaze behind closed eyes — a genuine classical technique). The practice is taught only through the Inner Engineering program to maintain transmission integrity.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">What Practitioners Report</h3>
                                    <p className="text-muted-foreground leading-relaxed">Consistent across a large number of practitioner reports: significant reduction in baseline anxiety and stress, improved sleep quality, greater emotional steadiness, and in many cases a qualitative shift in the sense of identity — less reactivity, more witnessing presence. These reports are consistent with what the tradition would predict from regular pranayama and bandha practice.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">The Research Question</h3>
                                    <p className="text-muted-foreground leading-relaxed">Published research on Shambhavi Mahamudra exists but has methodological limitations (primarily affiliated researchers, self-selected practitioners, limited control conditions). The reported outcomes — reduced cortisol, improved HRV, enhanced melatonin — are consistent with what would be expected from the type of pranayama used, and are not dependent on any claim about Sadhguru&apos;s own realization.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/how-to-spot-fake-spiritual-guru" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Guru Discernment Guide <ArrowRight size={16} />
                                </Link>
                                <Link href="/what-is-kriya-yoga" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    What is Kriya Yoga? <ArrowRight size={16} />
                                </Link>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How to Approach Large Spiritual Organizations</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Whether Isha Foundation, Art of Living, Chinmaya Mission, or any large spiritual organization — the same discernment framework applies:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-3">Take what genuinely works</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">A practice that demonstrably reduces your anxiety, improves your clarity, and moves you toward greater ease has value — regardless of metaphysical claims about its ultimate source. Evaluate practices by their fruits in your own experience.</p>
                                </div>
                                <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-3">Leave the personality cult</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">You can practice Shambhavi Mahamudra without believing Sadhguru is infallible. You can follow Isha&apos;s free content without becoming a volunteer. The value of a genuine practice does not require uncritical devotion to its teacher.</p>
                                </div>
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Discernment Over Devotion.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Take the tools that genuinely help. Leave what doesn&apos;t. The tradition offers a complete framework for evaluating any teacher.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/how-to-spot-fake-spiritual-guru"
                                eventLabel="sadhguru:footer:discernment"
                                trackPathName="how-to-spot-fake-spiritual-guru"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Guru Discernment Guide
                            </TrackedLink>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="sadhguru:footer:faith-finder"
                                trackPathName="faith-finder"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Find Your Path
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
