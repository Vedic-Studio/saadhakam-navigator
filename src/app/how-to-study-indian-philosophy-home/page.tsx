import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";

export const metadata: Metadata = {
    title: "How to Study Indian Philosophy at Home: Bhagavad Gita, Yoga Sutras & Vedanta",
    description:
        "Building a real Indian philosophy curriculum at home: start with the Bhagavad Gita, progress to Patanjali's Yoga Sutras, then Advaita Vedanta. The correct sequence, best commentaries, and daily study structure.",
    alternates: {
        canonical: "https://www.opensadhaka.com/how-to-study-indian-philosophy-home",
    },
    openGraph: {
        title: "How to Study Indian Philosophy at Home",
        description:
            "The three-text curriculum: Bhagavad Gita first (the practical manual), Yoga Sutras second (the psychology of mind), Vedanta third (non-dual philosophy). Best commentaries and daily routine.",
        url: "https://www.opensadhaka.com/how-to-study-indian-philosophy-home",
        type: "article",
    },
};

const faqs = [
    {
        question: "Where should I start studying Indian philosophy?",
        answer:
            "Start with the Bhagavad Gita. It synthesizes the essential teaching of all the major philosophical schools — Karma Yoga, Bhakti Yoga, Jnana Yoga, and Raja Yoga — in a single accessible text. The Gita is often called the operator&apos;s manual for the Upanishads. A beginner-friendly English commentary (Eknath Easwaran or Swami Chinmayananda) makes it immediately usable without Sanskrit background.",
    },
    {
        question: "What is the best Bhagavad Gita commentary for beginners?",
        answer:
            "Eknath Easwaran's translation is the most accessible for Western readers — clear prose, deep context, no jargon. Swami Chinmayananda's commentary is more traditional and verse-by-verse, useful for serious students who want Sanskrit terms explained. Avoid overly academic translations that focus on philology over meaning. For digital study, the Gita Supersite (iitk.ac.in) contains 72 commentaries in parallel.",
    },
    {
        question: "Do I need a guru to study Vedanta?",
        answer:
            "Traditional Advaita Vedanta holds that a qualified teacher (guru) is necessary for the highest inquiry. In practice, many serious students begin with text study and find teachers later. Online resources from Chinmaya Mission, Arsha Vidya Gurukulam, and Swami Sarvapriyananda (Vedanta Society of New York) offer structured courses and discourses that function as legitimate guided study without physical proximity to a teacher.",
    },
    {
        question: "How long does it take to understand Patanjali's Yoga Sutras?",
        answer:
            "The Yoga Sutras (196 aphorisms) can be read in an afternoon. Understanding them takes years. A useful study approach: read one sutra per day, spend time contemplating its application to your own mind and practice, and return to the same sutra months later. Georg Feuerstein's commentary is considered the most comprehensive scholarly introduction; B.K.S. Iyengar's Light on the Yoga Sutras is excellent for practitioners.",
    },
];

export default function HowToStudyIndianPhilosophyHomePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="how-to-study-indian-philosophy-home" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Study Indian Philosophy", href: "/how-to-study-indian-philosophy-home" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The Correct <span className="text-orange-500 italic">Sequence</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Building a real Indian philosophy curriculum at home requires moving beyond YouTube and following the traditional progression: (1) Bhagavad Gita as the practical manual and synthesis of all yogas; (2) Patanjali&apos;s Yoga Sutras as the psychological framework for mind training; (3) Advaita Vedanta as the highest non-dual philosophy. Supplement with a daily structure of 20 minutes of text study (Swadhyaya) and 20 minutes of sitting practice. Best resources: Eknath Easwaran for Gita, B.K.S. Iyengar for Yoga Sutras, Swami Sarvapriyananda for Vedanta.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Indian philosophy is not information to collect. It is a technology to apply.
                        </p>
                    </header>

                    <LongformContent className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Step 1: The Bhagavad Gita as Operator&apos;s Manual</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Bhagavad Gita is the perfect starting point because it was designed to be one. Embedded in the epic Mahabharata as a pre-battle conversation between the warrior Arjuna and his charioteer Krishna (revealed as the Divine), the Gita synthesizes the entire body of Vedantic philosophy into 18 chapters of direct, practical instruction. It does not assume Sanskrit literacy, prior philosophical training, or monastic renunciation. It addresses a person in the middle of a crisis — which is exactly the context most modern readers bring to it.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The three main yogic paths presented in the Gita — Karma Yoga (action without attachment), Bhakti Yoga (devotion), and Jnana Yoga (discrimination and knowledge) — are not alternative techniques but complementary dimensions of a single integrated practice. Chapter 2 contains the entire philosophical kernel that the rest of the text elaborates. Chapter 6 is the definitive teaching on meditation. Chapters 13–15 introduce Advaita Vedanta&apos;s core distinction between the knower, the known, and pure consciousness.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Study structure for the Gita: read one chapter per week. Begin each session with two minutes of silence to settle the mind. After reading, sit with the one verse that most disturbed, confused, or moved you. Write a brief note. Revisit your notes three months later. The Gita reads differently each time you return to it because you have changed. {/* EXPAND */}
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">Step 2 and 3: Yoga Sutras and Vedanta</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Patanjali&apos;s Yoga Sutras (2nd century BCE) provide what the Gita gestures toward without fully systematizing: a complete map of the mind and a precise methodology for its control. The famous definition — &quot;Yoga is the cessation of the modifications of the mind-stuff&quot; (Chitta Vritti Nirodha) — is the entire system in one sentence. The 8 limbs (Ashtanga) describe an outer-to-inner progression: ethics (Yama/Niyama), posture (Asana), breathwork (Pranayama), sense withdrawal (Pratyahara), concentration (Dharana), meditation (Dhyana), and absorption (Samadhi). Western yoga has largely reduced this to the third limb.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Advaita Vedanta — the highest philosophical system in the traditional curriculum — is best approached after the Gita and Sutras because it requires a mind already accustomed to philosophical inquiry. Shankara&apos;s Vivekachudamani (Crest Jewel of Discrimination) is the gateway text. Online, Swami Sarvapriyananda&apos;s free YouTube discourses on the Mandukya Upanishad are the most rigorous and accessible available anywhere. Chinmaya Mission offers structured Vedanta courses with qualified acharyas in most major cities. {/* EXPAND */}
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
                            <Link href="/how-to-learn-sanskrit" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                How to Learn Sanskrit <ArrowRight size={16} />
                            </Link>
                            <Link href="/advaita-vedanta-explained" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Advaita Vedanta Explained <ArrowRight size={16} />
                            </Link>
                        </div>
                    </LongformContent>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Start the Curriculum.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Twenty minutes of daily study compounds faster than any other practice. The text meets you exactly where you are.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/advaita-vedanta-explained"
                                eventLabel="indian_philosophy:footer:vedanta"
                                trackPathName="advaita-vedanta-explained"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Advaita Vedanta Explained
                            </TrackedLink>
                            <TrackedLink
                                href="/how-to-learn-sanskrit"
                                eventLabel="indian_philosophy:footer:sanskrit"
                                trackPathName="how-to-learn-sanskrit"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Learn Sanskrit
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
