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
    title: "What is Tantra Really About? (Hint: It's Not Just About Sex)",
    description:
        "Tantra is a vast science of ritual, mantra, and energy that sees the material world as divine. Learn the real philosophy, the difference between left and right hand paths, and what classical Tantra actually teaches.",
    alternates: {
        canonical: "https://www.opensadhaka.com/what-is-tantra",
    },
    openGraph: {
        title: "What is Tantra Really About?",
        description:
            "The West reduced Tantra to a bedroom manual. Classical Indian Tantra is a complete metaphysical system where Shiva and Shakti are one. A clear, honest guide.",
        url: "https://www.opensadhaka.com/what-is-tantra",
        type: "article",
    },
};

const faqs = [
    {
        question: "Is Tantra related to Hinduism or Buddhism?",
        answer:
            "Both. Tantric traditions developed across multiple Indian religious systems — Hindu Shaiva Tantra, Shakta Tantra, and Buddhist Vajrayana Tantra all share core features: the use of mantra, yantra (sacred geometry), specific ritual structures, and an emphasis on the direct experience of the divine through the body rather than by transcending it. The specific deities, texts, and techniques differ between traditions, but the underlying philosophy of the material world as sacred energy is consistent.",
    },
    {
        question: "What is the difference between Left Hand Path and Right Hand Path Tantra?",
        answer:
            "Right Hand Path (Dakshinachara) uses symbolic substitutes in ritual — grain instead of actual meat, water instead of actual wine, symbolic gesture instead of actual sexuality. Left Hand Path (Vamachara) uses the literal substances and acts, employing transgression itself as the spiritual technology — deliberately breaking social conditioning to dissolve the ego's investment in respectability and conceptual boundaries. Left Hand Path is typically reserved for highly advanced practitioners with seasoned teachers; it is not hedonism with a spiritual label.",
    },
    {
        question: "What is Neo-Tantra and how is it different from classical Tantra?",
        answer:
            "Neo-Tantra is a largely Western invention that emerged in the 20th century, blending selected elements of traditional Tantra with modern psychotherapy, sexual therapy, and New Age frameworks. It focuses almost exclusively on the sexuality dimension of Tantra (which is a minor element of the classical system) while largely ignoring the decades of ethical preparation, mantra practice, meditation, guru-disciple structure, and philosophical training that traditional Tantra requires. Think of it as using one chapter of a complete text as the whole book.",
    },
    {
        question: "Can I practice Tantra without a guru?",
        answer:
            "For introductory Tantric practices — mantra repetition, yantra meditation, devotional ritual — yes, you can begin independently using established texts. For advanced practices, particularly those involving energy work, Left Hand Path methods, or Kundalini activation, traditional sources are unanimous: a qualified Tantric guru (Acharya) is necessary. The power of Tantric practice is precisely why it is dangerous without guidance — the same tools that accelerate evolution can destabilize an unprepared system.",
    },
];

export default function WhatIsTantraPage() {
    const article = getArticleBySlug("what-is-tantra")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="what-is-tantra" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "What is Tantra?", href: "/what-is-tantra" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The World as <span className="text-orange-500 italic">Sacred</span> Energy
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Tantra is a vast science of ritual, mantra, yantra (sacred geometry), and energy that sees the material world not as illusion to be escaped, but as the divine energy (Shakti) itself to be embraced and transformed. The West&apos;s association of Tantra with sex is a massive reduction — sexuality is a minor and highly advanced element of a complete metaphysical and practical system. Classical Tantra requires immense discipline, not hedonism.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Advaita Vedanta says the world is maya — transcend it. Tantra says the world is Shakti — inhabit it fully and discover its divine nature from the inside.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Western Neo-Tantra vs Classical Indian Tantra</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The gap between what most Westerners mean by &quot;Tantra&quot; and what the classical texts describe is enormous. This is not a minor cultural translation issue — it is a near-complete inversion.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-muted-foreground mb-3">Western Neo-Tantra</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Focused primarily on sexual practice</li>
                                        <li>• Marketed as &quot;conscious sexuality&quot; or &quot;sacred sexuality&quot;</li>
                                        <li>• No prerequisite training required</li>
                                        <li>• Guru-disciple relationship typically absent</li>
                                        <li>• Emerged in 20th century West (notably via Osho/Rajneesh)</li>
                                        <li>• Little connection to classical Sanskrit texts</li>
                                    </ul>
                                </div>
                                <div className="bg-orange-500/5 rounded-2xl p-6 border border-orange-500/20">
                                    <h3 className="font-bold text-orange-400 mb-3">Classical Indian Tantra</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Sexuality is one element in a vast system</li>
                                        <li>• Comprehensive ritual, mantra, and meditation science</li>
                                        <li>• Years of prerequisite purification required</li>
                                        <li>• Guru-disciple transmission (Shaktipat) central</li>
                                        <li>• Ancient tradition with extensive Sanskrit literature</li>
                                        <li>• Rooted in specific philosophical frameworks (Shaiva Siddhanta, Trika, Kaula)</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The confusion arose partly through misreadings of the Kama Sutra (not a Tantric text), partly through the deliberate sensationalism of 20th-century pop spirituality, and partly because some genuine Tantric texts do discuss sexuality — but within a context of years of preparation that neo-Tantra omits entirely.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Core Philosophy of Tantra</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Tantra&apos;s foundational insight is the unity of Shiva and Shakti:
                            </p>
                            <div className="space-y-5">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Shiva — Pure Consciousness</h3>
                                    <p className="text-muted-foreground leading-relaxed">Shiva represents infinite, unchanging, formless consciousness — awareness without content. He is the witness, the stillness, the ground of all experience. Without Shakti, Shiva cannot act or manifest.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Shakti — Divine Energy</h3>
                                    <p className="text-muted-foreground leading-relaxed">Shakti is the dynamic, creative power that produces all manifestation. She is not separate from Shiva but is his inherent power — the way fire and its heat are inseparable. The entire material universe is understood as Shakti&apos;s dance.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Tantric Conclusion</h3>
                                    <p className="text-muted-foreground leading-relaxed">If the world is Shakti, and Shakti is Shiva&apos;s own energy, then the world is not separate from the divine. This reverses Advaita&apos;s emphasis on transcendence: rather than renouncing the world to find consciousness, the Tantric practitioner discovers consciousness within and through every aspect of the world — including the body, the senses, emotion, and relationship. Nothing is excluded from the sacred.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Left Hand Path vs Right Hand Path</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Classical Tantra divides into two primary approaches to the transgressive ritual elements (the Panchamakara — five elements beginning with &quot;m&quot;: madya/wine, mamsa/meat, matsya/fish, mudra/grain, maithuna/sexual union):
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-3">Right Hand Path (Dakshinachara)</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Uses symbolic substitutes. Grain (mudra) stands in for the other elements. The outer ritual is clean by conventional standards; the transgression happens internally through the dissolution of ego-identity.</p>
                                    <p className="text-xs text-muted-foreground italic border-l-2 border-orange-500/20 pl-3">Most accessible. Suitable for householders. No violation of social norms.</p>
                                </div>
                                <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-3">Left Hand Path (Vamachara)</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Uses the actual elements in ritual. The deliberate violation of social taboos is the spiritual technology — it breaks the ego&apos;s investment in respectability, purity rules, and conceptual identity. The transgression dissolves the boundary between sacred and profane.</p>
                                    <p className="text-xs text-muted-foreground italic border-l-2 border-orange-500/20 pl-3">Advanced practice. Requires experienced Acharya. Not entry-level Tantra.</p>
                                </div>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The Left Hand Path is frequently misunderstood as license for hedonism. The traditional understanding is precisely the opposite: it requires a practitioner who has thoroughly mastered the Right Hand Path — one who has no personal craving for the elements involved and uses them purely as ritual instruments of liberation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Tantric Practices for Modern Life</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The most accessible and practical Tantric teachings for modern practitioners do not require transgressive rituals, a guru, or any dramatic action. They require a shift in perception:
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Treat Everything as Sacred Energy</h3>
                                    <p className="text-muted-foreground leading-relaxed">The core Tantric instruction is to bring full, undivided attention to whatever is directly in front of you — eating, working, relating, sensing. The ordinary moment, met with complete presence, is the portal to Shakti. This is not metaphor: it is the actual practice.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Mantra as Energy, Not Words</h3>
                                    <p className="text-muted-foreground leading-relaxed">Tantric mantra practice differs from Vedic japa in its understanding: the mantra is not a prayer addressed to a deity but a specific sound-vibration that directly affects the practitioner&apos;s subtle body. Bija mantras (seed syllables) like OM, HREEM, KLEEM operate at a pre-linguistic level of the nervous system.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Body as Temple, Not Obstacle</h3>
                                    <p className="text-muted-foreground leading-relaxed">Unlike ascetic traditions that view the body as a source of distraction to be suppressed, Tantra treats the physical body as the most direct vehicle for spiritual experience. Attention to breath, sensation, and energy in the body is itself the practice — not a preliminary to be discarded once meditation begins.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/what-is-kriya-yoga" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    What is Kriya Yoga? <ArrowRight size={16} />
                                </Link>
                                <Link href="/kundalini-awakening" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Kundalini Awakening Guide <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The World is Sacred.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Tantra doesn&apos;t ask you to leave the world. It asks you to meet it with full presence. Start with the tradition that resonates.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/what-is-kriya-yoga"
                                eventLabel="tantra:footer:kriya"
                                trackPathName="what-is-kriya-yoga"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Explore Kriya Yoga
                            </TrackedLink>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="tantra:footer:faith-finder"
                                trackPathName="faith-finder"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Find Your Tradition
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
