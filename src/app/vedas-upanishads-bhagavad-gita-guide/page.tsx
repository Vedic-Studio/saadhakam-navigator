import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, BookOpen, Library } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "The Ultimate Guide to the Sacred Texts of India: Vedas, Upanishads & Bhagavad Gita",
    description:
        "Understand the Vedas, Upanishads, and Bhagavad Gita — what they are, how they differ, and where to start. The complete beginner's guide to India's sacred scriptures.",
    alternates: {
        canonical: "https://opensadhaka.com/vedas-upanishads-bhagavad-gita-guide",
    },
    openGraph: {
        title: "Vedas, Upanishads & Bhagavad Gita: The Complete Beginner's Guide",
        description:
            "What are the Vedas? How do they differ from the Upanishads? Where does the Bhagavad Gita fit in? A complete, accessible guide to India's sacred textual tradition.",
        url: "https://opensadhaka.com/vedas-upanishads-bhagavad-gita-guide",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is the difference between Shruti and Smriti?",
        answer:
            "Shruti (श्रुति) means 'that which was heard' — texts regarded as directly revealed eternal knowledge, not authored by any human. The Vedas (including the Upanishads) are Shruti. Smriti (स्मृति) means 'that which was remembered' — texts composed by sages based on tradition, commentary, and experience. The Bhagavad Gita, Ramayana, Mahabharata, and Puranas are Smriti. Shruti is the highest authority; Smriti is authoritative to the extent it aligns with Shruti.",
    },
    {
        question: "What is the best sacred text to start with as a beginner?",
        answer:
            "The Bhagavad Gita is the ideal starting point for most Western and modern readers. It is shorter (700 verses), directly addresses the problems of a person living in the world (not a renunciant), and contains the practical ethics of Karma Yoga. After the Gita, progress to the Katha Upanishad or Mandukya Upanishad for metaphysics, then a full-length Upanishad collection with commentary.",
    },
    {
        question: "Are the Vedas and the Upanishads the same?",
        answer:
            "No, but they are related. The Vedas are a vast corpus divided into four collections (Rigveda, Samaveda, Yajurveda, Atharvaveda). Each Veda has four sections: the Samhitas (hymns and rituals), Brahmanas (ritual instructions), Aranyakas (forest texts), and Upanishads (philosophical conclusions). The Upanishads are the last and most philosophically important section of the Vedas — which is why Vedanta ('the end of the Veda') is based on them.",
    },
    {
        question: "Do I need Sanskrit to benefit from these texts?",
        answer:
            "No. Excellent translations exist for all major texts. For the Bhagavad Gita, translations by Swami Gambhirananda (for philosophical precision), Barbara Stoler Miller (for literary quality), or the Bhagavad Gita As It Is by Swami Prabhupada (for Vaishnava commentary) are widely respected. For Upanishads, Patrick Olivelle's Oxford University Press translation is scholarly; Swami Nikhilananda's volumes are more devotional.",
    },
];

const vedas = [
    {
        name: "Rigveda",
        description: "The oldest, containing 1028 hymns to the Vedic deities. Primarily ritual and devotional — praises to Agni (fire), Indra (thunder), Varuna (cosmic order).",
        focus: "Hymns & Devotion",
    },
    {
        name: "Samaveda",
        description: "Musical elaboration of the Rigveda hymns. Set to specific melodies for chanting in sacrificial rituals. The origin of classical Indian music.",
        focus: "Music & Ritual",
    },
    {
        name: "Yajurveda",
        description: "Prose formulas used during sacrificial rites. Divided into Black (Krishna) and White (Shukla) recensions. Practical ritual instruction.",
        focus: "Sacrificial Procedure",
    },
    {
        name: "Atharvaveda",
        description: "Hymns dealing with everyday life — healing, prosperity, protection, and cosmological speculation. Closest to the folk tradition.",
        focus: "Daily Life & Healing",
    },
];

const upanishads = [
    { name: "Brihadaranyaka", tradition: "Yajurveda", focus: "The nature of Brahman and Atman; dialogue between Yajnavalkya and Maitreyi — 'I am Brahman'" },
    { name: "Chandogya", tradition: "Samaveda", focus: "The great saying 'Tat Tvam Asi' (That Thou Art); the teaching of inner space" },
    { name: "Mandukya", tradition: "Atharvaveda", focus: "The shortest and densest: the three states of consciousness and the 'Fourth' (Turiya)" },
    { name: "Katha", tradition: "Yajurveda", focus: "Death (Yama) teaches Nachiketa the secret of immortality — the unchanging Self" },
    { name: "Isha", tradition: "Yajurveda", focus: "How to see Brahman in all things and act in the world without attachment" },
    { name: "Mundaka", tradition: "Atharvaveda", focus: "The two kinds of knowledge: lower (worldly) and higher (knowledge of Brahman)" },
];

export default function VedasUpanishadsGuide() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="vedas-upanishads-bhagavad-gita-guide" pillar="sacred-texts" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sacred Texts of India", href: "/vedas-upanishads-bhagavad-gita-guide" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The <span className="text-orange-500 italic">Library</span> of Eternity
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> India's sacred texts are grouped as Shruti (revealed: Vedas and Upanishads) and Smriti (remembered: Gita, epics, Puranas). The Vedas establish ritual and cosmology, the Upanishads state metaphysics, and the Bhagavad Gita applies those teachings to action, duty, and liberation.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            You don't need to read all of them. You need to understand what each one is for — and then pick the right starting point for where you actually are.
                        </p>
                    </header>

                    <section className="mb-14 rounded-2xl border border-border/60 bg-card/40 p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">The Map: Shruti vs Smriti</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-orange-400 text-lg mb-3">Shruti — "That Which Was Heard"</h3>
                                <p className="text-muted-foreground leading-relaxed mb-3">Eternal knowledge revealed to the ancient rishis in deep meditation — not composed, only perceived. The Vedas (including the Upanishads within them) are Shruti. They are the highest authority in the tradition.</p>
                                <p className="text-sm text-muted-foreground italic">Includes: Rigveda, Samaveda, Yajurveda, Atharvaveda (and their Upanishads)</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-orange-400 text-lg mb-3">Smriti — "That Which Was Remembered"</h3>
                                <p className="text-muted-foreground leading-relaxed mb-3">Texts authored by realized sages to transmit and apply the wisdom of Shruti for specific eras and contexts. Authoritative where they align with Shruti. Includes epics, Puranas, and the Gita.</p>
                                <p className="text-sm text-muted-foreground italic">Includes: Bhagavad Gita, Ramayana, Mahabharata, Puranas, Dharmashastra</p>
                            </div>
                        </div>
                    </section>

                    <div className="space-y-16">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                <Library className="text-orange-500 w-8 h-8" />
                                The Four Vedas
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                The Vedas are the oldest layer of India's sacred literature, transmitted orally for centuries with strict recitation methods. Each Veda includes cosmology, ritual procedure, and early philosophical inquiry:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                {vedas.map((v) => (
                                    <div key={v.name} className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-xl">{v.name}</h3>
                                            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">{v.focus}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Each Veda contains four sections: Samhitas (hymns), Brahmanas (ritual manuals), Aranyakas (forest treatises), and Upanishads (philosophical summaries). For most modern seekers, it is the Upanishads that are most directly relevant — the Samhitas and Brahmanas are highly specialized ritual texts requiring significant contextual knowledge.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Upanishads: Where the Philosophy Lives</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                There are over 200 Upanishads, but only 10–13 are considered "principal" (<em>Mukhya Upanishads</em>) — those commented on by Adi Shankaracharya. These are the philosophical crown of the Vedic tradition and the source of all Vedantic schools.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Their core insight appears in many forms across many texts, but reduces to a single claim: <strong className="text-foreground">the individual self (Atman) and the universal ground of being (Brahman) are identical.</strong> All suffering arises from forgetting this. All liberation arises from remembering it.
                            </p>
                            <div className="overflow-x-auto rounded-2xl border border-border/30">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-background/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Upanishad</th>
                                            <th className="p-4 font-bold text-foreground">Veda</th>
                                            <th className="p-4 font-bold text-foreground">Core Teaching</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20">
                                        {upanishads.map((u) => (
                                            <tr key={u.name} className="hover:bg-muted/10 transition-colors">
                                                <td className="p-4 font-medium text-orange-400">{u.name}</td>
                                                <td className="p-4 text-muted-foreground">{u.tradition}</td>
                                                <td className="p-4 text-muted-foreground">{u.focus}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6">
                                <Link href="/what-are-the-upanishads" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Complete Guide: What Are the Upanishads? <ArrowRight size={16} />
                                </Link>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Bhagavad Gita: Philosophy on the Battlefield</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Bhagavad Gita ("Song of God") occupies a unique position: it is technically Smriti — part of the epic Mahabharata — but is treated as Shruti in practice due to its extraordinary philosophical depth and the direct authorship of Krishna (regarded as Brahman incarnate). It is 700 verses across 18 chapters, occurring at the beginning of the Kurukshetra war.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                <strong className="text-foreground">The setup:</strong> The warrior Arjuna is about to fight a civil war against his own family and teachers. He collapses in grief and refuses to fight. Krishna, his charioteer, spends the entire Gita answering Arjuna's questions about duty, identity, suffering, action, and the nature of the self.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                Kurukshetra is both historical and interpretive. In traditional commentary it can also represent the inner field where clarity and impulse conflict. Arjuna's paralysis is the human problem of duty under emotional overwhelm.
                            </p>

                            <h3 className="text-xl font-bold mb-6">The Gita's Three Core Teachings</h3>
                            <div className="space-y-5 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h4 className="font-bold text-orange-400 mb-2">1. Karma Yoga: Action Without Attachment</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action." (2.47) Act fully, with total commitment — but don't let your identity hinge on the result. This dissolves anxiety and creates the mental clarity for excellent action.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h4 className="font-bold text-orange-400 mb-2">2. The Eternal Self</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        "The soul is never born and never dies. It is not slain when the body is slain." (2.20) Fear of death and attachment to the body arise from a case of mistaken identity. The real you — the witness behind all experience — is eternal and untouched by the changes of the body and mind.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h4 className="font-bold text-orange-400 mb-2">3. Surrender as Liberation</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        "Abandon all varieties of dharmas and simply surrender unto Me. I shall deliver you from all sinful reactions; do not fear." (18.66) The ultimate teaching: not self-effort alone, but the complete offering of the self and its burdens to the divine source. For Vaishnavas, this is the culmination of the entire Gita.
                                    </p>
                                </div>
                            </div>

                            <Link href="/texts/bhagavad-gita" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                <BookOpen size={16} />
                                Read the Bhagavad Gita chapter by chapter <ArrowRight size={16} />
                            </Link>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How to Apply These Texts in Daily Life</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The danger with sacred texts is that they become intellectual decoration — something you cite at dinner parties but never actually use. The tradition is clear: the texts are not meant to fill your head with concepts but to change your actual behavior and perception.
                            </p>
                            <div className="space-y-4">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">From the Bhagavad Gita</h3>
                                    <p className="text-muted-foreground">Each morning, ask: what is my duty today — not what will make me comfortable, but what the situation actually requires? Do that thing fully, without obsessing over the outcome. That's Karma Yoga in practice.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">From the Upanishads</h3>
                                    <p className="text-muted-foreground">Before sleep, ask: who was aware of everything that happened today? Notice the constant, unchanged witness behind all the activities, emotions, and thoughts. Practice resting as that witness for even one minute. This is self-inquiry (Atma Vichara).</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">From the Vedic Tradition Broadly</h3>
                                    <p className="text-muted-foreground">Live the Yamas (non-violence, truthfulness, non-stealing) before attempting any advanced practice. The texts are unanimous: ethical grounding is the prerequisite for genuine spiritual progress, not an optional add-on.</p>
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Start With the Bhagavad Gita.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Don't try to read everything. The Bhagavad Gita is the most complete and accessible entry point into India's sacred textual tradition.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/texts/bhagavad-gita"
                                eventLabel="sacred_texts_guide:footer:gita"
                                trackPathName="texts/bhagavad-gita"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Read the Bhagavad Gita
                            </TrackedLink>
                            <TrackedLink
                                href="/what-are-the-upanishads"
                                eventLabel="sacred_texts_guide:footer:upanishads"
                                trackPathName="what-are-the-upanishads"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                What Are the Upanishads?
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
