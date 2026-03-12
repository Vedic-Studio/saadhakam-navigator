import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, BookOpen, ExternalLink, GraduationCap, Library } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";

export const metadata: Metadata = {
    title: "What is Vedanta? | The Culmination of Vedic Wisdom",
    description: "Explore the core philosophy of Vedanta, from the three canonical texts (Prasthanatrayi) to the schools of Advaita, Vishishtadvaita, and Dvaita.",
    alternates: {
        canonical: "https://opensadhaka.com/what-is-vedanta",
    },
    openGraph: {
        title: "What is Vedanta? The Ultimate Guide to the Veda's End",
        description: "A deep dive into the 'culmination of knowledge'—the system of thought that clarifies the nature of Self and Reality.",
        url: "https://opensadhaka.com/what-is-vedanta",
        type: "article",
    },
};

const faqs = [
    {
        question: "Is Vedanta a religion or a philosophy?",
        answer: "Vedanta is a philosophical system (*Darshana*) that arises from the Vedic tradition. While it forms the intellectual core of what is now called Hinduism, its principles—concerning consciousness, identity, and the nature of reality—are often approached as a universal science of the self."
    },
    {
        question: "What does the word 'Vedanta' actually mean?",
        answer: "The word is a compound of 'Veda' (knowledge) and 'Anta' (end or conclusion). It refers both to the chronological end of the Vedas (the Upanishads) and the logical culmination of all spiritual inquiry."
    },
    {
        question: "Can anyone study Vedanta?",
        answer: "Traditionally, Vedanta requires certain mental qualifications—clarity of intellect, emotional stability, and a genuine desire for truth. However, its primary texts, like the Bhagavad Gita, are designed to be accessible to everyone living in the world."
    }
];

const references = [
    { label: "Vedanta Philosophy — Britannica", href: "https://www.britannica.com/topic/Vedanta" },
    { label: "The Brahma Sutras — Internet Encyclopedia of Philosophy", href: "https://iep.utm.edu/brahma-s/" },
    { label: "Introduction to Vedanta — Chinmaya Mission", href: "https://www.chinmayamission.com/what-is-vedanta/" }
];

export default function WhatIsVedantaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="what-is-vedanta" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "What is Vedanta?", href: "/what-is-vedanta" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The <span className="text-orange-500 italic">End</span> of Knowledge
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Vedanta is the philosophical inquiry tradition of the Upanishads that asks who you are beyond body-mind identity and how to live from that clarity.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Vedanta is the system of thought that converts the ritualistic momentum of the Vedas into a direct, logical investigation into the nature of the Self.
                        </p>
                    </header>

                    <section className="mb-14 rounded-2xl border border-border/60 bg-card/40 p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Best for / Not best for / Where to start</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong className="text-foreground">Best for:</strong> seekers who want a structured philosophical path, not just inspirational spirituality.</li>
                            <li><strong className="text-foreground">Not best for:</strong> people expecting quick emotional comfort without study, reflection, and disciplined practice.</li>
                            <li><strong className="text-foreground">Where to start:</strong> read Bhagavad Gita with commentary, learn the core Vedanta terms, and pair study with daily self-observation.</li>
                        </ul>
                    </section>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6 italic text-orange-400">The Ultimate Diagnosis</h2>
                                <LongformContent>
                                    <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                        The Vedantic tradition begins with a startling premise: our suffering is not caused by external circumstances, but by a "fundamental error of identity." We mistake the changing layers of our personality—our name, body, and thoughts—for our permanent reality. Vedanta provides the logical tools to strip away these temporary identifications to reveal the changeless awareness beneath.
                                    </p>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        Chronologically, Vedanta refers to the <strong className="text-foreground">Upanishads</strong>, the final portion of the Vedas composed between 800 and 200 BCE. Philosophically, it refers to the schools of thought that systematized these insights into a coherent worldview that has sustained the intellectual life of the Indian subcontinent for millennia.
                                    </p>
                                </LongformContent>
                            </section>

                            <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                    <Library className="text-orange-500 w-8 h-8" />
                                    The Triple Foundation (Prasthanatrayi)
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8 italic">
                                    Every school of Vedanta must ground its logic in these three authoritative sources:
                                </p>
                                <div className="space-y-6">
                                    <div className="bg-background/50 p-6 rounded-2xl border border-border/20">
                                        <h4 className="font-bold mb-1 text-orange-400">1. The Upanishads (Sruti)</h4>
                                        <p className="text-muted-foreground text-sm">The primary revealed wisdom emphasizing the identity of the individual soul (Atman) and the universal absolute (Brahman).</p>
                                    </div>
                                    <div className="bg-background/50 p-6 rounded-2xl border border-border/20">
                                        <h4 className="font-bold mb-1 text-orange-400">2. The Bhagavad Gita (Smriti)</h4>
                                        <p className="text-muted-foreground text-sm">The practical application of Vedantic wisdom in the midst of daily life and crisis.</p>
                                    </div>
                                    <div className="bg-background/50 p-6 rounded-2xl border border-border/20">
                                        <h4 className="font-bold mb-1 text-orange-400">3. The Brahma Sutras (Nyaya)</h4>
                                        <p className="text-muted-foreground text-sm">The logical framework that resolves apparent contradictions in the scriptural texts.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">The Three Great Schools</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                    While all Vedantins agree on the authority of the texts, they differ on the relationship between the individual soul and the absolute:
                                </p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-6 rounded-2xl border border-border/40 hover:border-orange-500/30 transition-all group">
                                        <h4 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors">Advaita</h4>
                                        <p className="text-sm text-muted-foreground mb-4">Non-Dualism. The soul and the absolute are identical. Separation is an illusion.</p>
                                        <Link href="/advaita-vedanta-explained" className="text-xs font-bold uppercase tracking-widest text-orange-400 flex items-center gap-1">Read More <ArrowRight size={12} /></Link>
                                    </div>
                                    <div className="p-6 rounded-2xl border border-border/40 hover:border-orange-500/30 transition-all">
                                        <h4 className="font-bold text-lg mb-2">Vishishtadvaita</h4>
                                        <p className="text-sm text-muted-foreground">Qualified Non-Dualism. The soul is a real part of the absolute, like a ray of the sun.</p>
                                    </div>
                                    <div className="p-6 rounded-2xl border border-border/40 hover:border-orange-500/30 transition-all">
                                        <h4 className="font-bold text-lg mb-2">Dvaita</h4>
                                        <p className="text-sm text-muted-foreground">Dualism. The soul and the absolute are eternally distinct, joined through devotion.</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-card border border-border/60 rounded-3xl p-8 sticky top-28 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <GraduationCap className="text-orange-500 w-6 h-6" />
                                    <h3 className="font-display font-bold text-xl uppercase tracking-tighter">Seeker's Qualities</h3>
                                </div>
                                <p className="text-xs text-muted-foreground italic mb-6">Traditional Vedanta requires four mental prerequisites (Sadhana Chatustaya):</p>
                                <ul className="space-y-6">
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Viveka</h4>
                                        <p className="text-sm text-muted-foreground">Discrimination between the eternal and the temporary.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Vairagya</h4>
                                        <p className="text-sm text-muted-foreground">Dispassion toward short-term pleasures.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Shatsampat</h4>
                                        <p className="text-sm text-muted-foreground">The 'Six Virtues' including focus and equanimity.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Mumukshutva</h4>
                                        <p className="text-sm text-muted-foreground">An intense longing for spiritual liberation.</p>
                                    </li>
                                </ul>
                                <hr className="my-8 border-border/40" />
                                <div className="space-y-4">
                                    <p className="text-xs text-muted-foreground italic leading-relaxed uppercase tracking-wide">Which school fits your temperament?</p>
                                    <TrackedLink
                                        href="/faith-finder"
                                        eventLabel="what_is_vedanta:sidebar:faith-finder"
                                        trackPathName="faith-finder"
                                        className="w-full inline-flex items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-white font-bold text-sm transition-all hover:bg-orange-700 shadow-md"
                                    >
                                        Find Your Path <ArrowRight className="ml-2 w-4 h-4" />
                                    </TrackedLink>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <section className="mb-20">
                        <h2 className="text-4xl font-display font-bold mb-12 text-center tracking-tight uppercase">Common Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm transition-transform hover:-translate-y-1">
                                    <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-orange-500/20">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-20 rounded-3xl border border-border/60 bg-muted/5 p-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-display font-bold mb-6">The Mahavakyas</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                The entire Vedantic corpus is often distilled into four "Great Sayings" (*Mahavakyas*), one from each of the four Vedas. These are not merely philosophical statements, but meditative seeds meant to be contemplated until they become direct experiences of reality:
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <div className="p-6 rounded-2xl bg-background border border-border/40 text-center">
                                <h4 className="font-bold text-orange-500 mb-1 italic">Prajnanam Brahma</h4>
                                <p className="text-sm text-muted-foreground italic">"Consciousness is Brahman."</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-background border border-border/40 text-center">
                                <h4 className="font-bold text-orange-500 mb-1 italic">Aham Brahmasmi</h4>
                                <p className="text-sm text-muted-foreground italic">"I am Brahman."</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-background border border-border/40 text-center">
                                <h4 className="font-bold text-orange-500 mb-1 italic">Tat Tvam Asi</h4>
                                <p className="text-sm text-muted-foreground italic">"That Thou Art."</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-background border border-border/40 text-center">
                                <h4 className="font-bold text-orange-500 mb-1 italic">Ayam Atma Brahma</h4>
                                <p className="text-sm text-muted-foreground italic">"This Self is Brahman."</p>
                            </div>
                        </div>
                    </section>

                    <div className="bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none grayscale brightness-200">
                            <Library size={480} className="translate-y-20 translate-x-20" />
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-display font-black mb-6 relative z-10">Start Your Practical Study.</h2>
                        <p className="text-xl lg:text-2xl text-orange-50 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
                            Philosophy is a dead subject if it doesn't change your Tuesday afternoon. Explore our guides on how to apply these insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <TrackedLink
                                href="/starting-spiritual-practice"
                                eventLabel="what_is_vedanta:footer:practice"
                                trackPathName="starting-spiritual-practice"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                How to Actually Start
                            </TrackedLink>
                            <TrackedLink
                                href="/advaita-vedanta-explained"
                                eventLabel="what_is_vedanta:footer:advaita"
                                trackPathName="advaita-vedanta-explained"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Deep Dive into Non-Duality
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
