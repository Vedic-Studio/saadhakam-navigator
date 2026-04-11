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
    title: "How to Learn Sanskrit for Yoga Teachers and Spiritual Seekers",
    description:
        "Sanskrit for yoga teachers: start with Devanagari script recognition (Language Curry app), then structured pronunciation courses for sutra chanting. Why English cannot translate Dharma, Maya, or Prana.",
    alternates: {
        canonical: "https://www.opensadhaka.com/how-to-learn-sanskrit",
    },
    openGraph: {
        title: "How to Learn Sanskrit for Yoga Teachers",
        description:
            "Why 'Dharma' cannot mean 'Duty'. The best apps for Devanagari script. Sanskrit courses specifically designed for yoga teachers vs. academic language programs.",
        url: "https://www.opensadhaka.com/how-to-learn-sanskrit",
        type: "article",
    },
};

const faqs = [
    {
        question: "Do yoga teachers need to know Sanskrit?",
        answer:
            "Not conversational Sanskrit — but understanding key terms and correct pronunciation significantly improves teaching quality and conceptual precision. When you know that &apos;Asana&apos; means &apos;seat&apos; (not just &apos;pose&apos;), and that &apos;Pranayama&apos; comes from &apos;prana&apos; (life force) + &apos;ayama&apos; (extension), you teach differently. For teachers working with the Yoga Sutras, some Sanskrit literacy is nearly essential — multiple sutras have no adequate English translation.",
    },
    {
        question: "What is the best app for learning Sanskrit?",
        answer:
            "Language Curry is the best app for Devanagari script recognition and basic Sanskrit vocabulary — it uses gamification effectively for absolute beginners. However, no app currently provides adequate grammar instruction for reading sutras or understanding chanting. For that, the American Sanskrit Institute&apos;s structured online courses (Vyakarana) or Sanskrit from Scratch (free, YouTube-based) are significantly more rigorous than any app currently available.",
    },
    {
        question: "How long does it take to learn Sanskrit?",
        answer:
            "Learning to read Devanagari script takes 2–4 weeks of daily practice. Reading basic Sanskrit words in transliteration takes 1–2 months. Understanding simple sutras and chanting pronunciation with accuracy takes 6–12 months of structured study. Reading classical Sanskrit texts independently (Gita, Upanishads) takes years. Most yoga teachers pursue the first two stages — script and pronunciation — which are achievable in a few months with consistent effort.",
    },
];

export default function HowToLearnSanskritPage() {
    const article = getArticleBySlug("how-to-learn-sanskrit")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="how-to-learn-sanskrit" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Study Indian Philosophy", href: "/how-to-study-indian-philosophy-home" },
                            { label: "How to Learn Sanskrit", href: "/how-to-learn-sanskrit" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Lost in <span className="text-orange-500 italic">Translation</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Sanskrit is valuable for yoga teachers because ancient Indian concepts frequently have no English equivalent. &apos;Dharma&apos; is not duty. &apos;Maya&apos; is not illusion. &apos;Prana&apos; is not breath. For beginners, start with the Language Curry app for Devanagari script recognition (2–4 weeks). For pronunciation and sutra chanting, structured courses from the American Sanskrit Institute or Sanskrit from Scratch (YouTube) are necessary. Apps alone cannot develop the grammar needed to read original texts.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Every untranslatable word in Sanskrit is a doorway into a concept English cannot contain.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Why English Fails Indian Philosophy</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The problem with translating Sanskrit philosophical terms is not vocabulary — it is that the English words carry incompatible conceptual baggage. &apos;Dharma&apos; is translated as &apos;duty,&apos; &apos;righteousness,&apos; &apos;law,&apos; or &apos;truth&apos; depending on context, but none captures its full meaning: the intrinsic nature of a thing that sustains cosmic order. A river&apos;s dharma is to flow. Fire&apos;s dharma is to burn. A human&apos;s dharma includes their role, their nature, their obligations, and the universal principle that binds all three.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Similarly, &apos;Maya&apos; is not &apos;illusion&apos; in the Western sense of a hallucination or error. In Advaita Vedanta, Maya refers to the cosmic creative power that makes the Absolute appear as the multiple — not a mistake but an active principle. Translating it as &apos;illusion&apos; suggests the world is like a mirage, which misrepresents the philosophy entirely. These distinctions matter enormously when studying the texts. {/* EXPAND */}
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">A Practical Sanskrit Learning Path</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Stage one is Devanagari script recognition — learning to read the 47-character Sanskrit alphabet. This is achievable in 2–4 weeks of daily 15-minute practice using Language Curry or a Devanagari workbook. Reading the script is not the same as understanding Sanskrit, but it allows you to follow along with chanting, recognize Sanskrit words in texts, and begin to hear the phonetic relationships between words.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Stage two is pronunciation — specifically for chanting and sutra recitation. Sanskrit pronunciation follows strict phonetic rules (it is a phonetically perfect language — the name Sanskrit means &apos;refined&apos; or &apos;perfected&apos;). Online courses designed for yoga teachers, such as those from the American Sanskrit Institute, focus on this stage: correct vowel length, aspirated vs. unaspirated consonants, and the three accent marks. For those interested in the energetic dimension of Sanskrit sound (mantra shastra), correct pronunciation is considered non-optional. {/* EXPAND */}
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
                            <Link href="/how-to-study-indian-philosophy-home" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Study Indian Philosophy at Home <ArrowRight size={16} />
                            </Link>
                            <Link href="/vedas-upanishads-bhagavad-gita-guide" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Vedas, Upanishads &amp; Gita Guide <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Language of the Texts.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Even partial Sanskrit literacy transforms how you encounter the teachings. Start with script, build toward sound.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/how-to-study-indian-philosophy-home"
                                eventLabel="sanskrit:footer:philosophy"
                                trackPathName="how-to-study-indian-philosophy-home"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Build Your Philosophy Curriculum
                            </TrackedLink>
                            <TrackedLink
                                href="/vedas-upanishads-bhagavad-gita-guide"
                                eventLabel="sanskrit:footer:texts"
                                trackPathName="vedas-upanishads-bhagavad-gita-guide"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Guide to the Sacred Texts
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
