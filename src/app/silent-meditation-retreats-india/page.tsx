import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Silent Meditation Retreats in India: The Complete Guide to Vipassana and Beyond",
    description:
        "India offers the world's most rigorous silent retreats — 10-day Vipassana at Dhamma Giri, Bodh Gaya, and more. What to expect, how to survive Day 3, and where to go for your level.",
    alternates: {
        canonical: "https://opensadhaka.com/silent-meditation-retreats-india",
    },
    openGraph: {
        title: "Silent Meditation Retreats in India",
        description:
            "10-day Vipassana retreats in India are free, rigorous, and transformative. Here's what actually happens — and how to choose the right retreat for your level.",
        url: "https://opensadhaka.com/silent-meditation-retreats-india",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is a 10-day Vipassana retreat?",
        answer:
            "Vipassana (Pali: 'insight') is the original meditation technique attributed to the Buddha, rediscovered and systematized by S.N. Goenka (1924–2013) from the Burmese Theravada lineage of Sayagyi U Ba Khin. A 10-day Goenka retreat involves: complete Noble Silence (no speaking, eye contact, physical contact, reading, writing, or devices), a strict daily schedule beginning at 4am and ending at 9:30pm, no meals after midday, and 10-hour daily meditation sessions focused on bodily sensation observation. Courses are offered completely free — donation is invited only after completing the course.",
    },
    {
        question: "Is a 10-day Vipassana retreat safe for beginners?",
        answer:
            "Goenka-style Vipassana is specifically designed for beginners with no meditation experience. The technique is gradual: days 1–3 focus on Anapana (breath observation to concentrate the mind), days 4–9 introduce the body-scanning technique, day 10 teaches Metta (loving-kindness). The main difficulty is psychological, not technical — facing one's own mind without distraction for 10 days is intensely confronting. People with severe psychiatric conditions, recent trauma, or psychotic episodes are advised to consult with a mental health professional before attending.",
    },
    {
        question: "Where are the best Vipassana centers in India?",
        answer:
            "The flagship center is Dhamma Giri in Igatpuri, Maharashtra — the largest Vipassana center in the world, with 500+ meditators in residence during courses, purpose-built meditation cells, and extensive meditation halls. Other major centers include Dhamma Bodhi (Bodh Gaya, Bihar — where the Buddha attained enlightenment under the Bodhi tree), Dhamma Thali (Jaipur, Rajasthan), and Dhamma Sindhu (near Mumbai). Registration through the dhamma.org website; courses book months in advance.",
    },
    {
        question: "Can I do a shorter silent retreat in India?",
        answer:
            "Yes. Many ashrams offer 3-to-5 day Mauna (silence) retreats as a less intensive alternative. The Ramana Maharshi Ashram in Tiruvannamalai practices continuous silence (mouna) as a permanent feature; visitors can stay in this atmosphere for days. Tushita Meditation Centre in Dharamshala (McLeod Ganj) offers 10-day Introduction to Buddhism courses that include significant silent practice without the extreme schedule of a Vipassana course. Art of Living and Isha Foundation both offer multi-day silent retreats as part of their programs.",
    },
];

const dayByDay = [
    { day: "Day 0 (arrival)", description: "Registration, orientation, surrender of phones and valuables. Noble Silence begins after dinner. Some anxiety; anticipation." },
    { day: "Days 1–3", description: "Anapana meditation — focusing on breath at the nostrils. The mind resists with full force. Boredom, frustration, back pain, and mental chatter peak. This is the purification beginning." },
    { day: "Day 4", description: "Vipassana technique introduced — full body scanning. This is the hardest transition for most practitioners; the technique seems impossible. Also the first day many practitioners feel genuine breakthroughs." },
    { day: "Days 5–6", description: "The body sensation scanning deepens. Many practitioners report the agony has passed and equanimity is beginning to establish. Others are still fighting. Both are correct positions." },
    { day: "Day 7", description: "For most practitioners, Day 7 produces the most significant breakthroughs — a sense of dissolving boundary between observer and sensation, or simply a profound and previously unavailable peace." },
    { day: "Days 8–9", description: "Deepening. Many practitioners note that everything they thought they knew about their minds has been revised. The practice begins feeling effortless for periods." },
    { day: "Day 10", description: "Noble Silence ends in the morning. Metta meditation (loving-kindness) introduced. Social reintegration begins — often surreal after 9 days of silence." },
    { day: "Day 11 (departure)", description: "Post-retreat integration begins. Common experience: the world looks and feels qualitatively different. Maintaining the practice momentum is the primary challenge." },
];

const centers = [
    {
        name: "Dhamma Giri, Igatpuri",
        state: "Maharashtra",
        capacity: "500+",
        significance: "Largest Vipassana center in the world. Flagship facility of Goenka's global organization.",
        bestFor: "First-time practitioners wanting the full, structured Goenka experience",
    },
    {
        name: "Dhamma Bodhi, Bodh Gaya",
        state: "Bihar",
        capacity: "~100",
        significance: "Located where the Buddha attained enlightenment under the original Bodhi tree. Profound historical atmosphere.",
        bestFor: "Practitioners with Buddhist orientation; powerful location effect",
    },
    {
        name: "Tushita Meditation Centre",
        state: "Dharamshala, H.P.",
        capacity: "~40",
        significance: "Tibetan Buddhist tradition. Structured Buddhist study combined with meditation. Dalai Lama&apos;s home nearby.",
        bestFor: "Those interested in Tibetan Buddhist framework alongside meditation",
    },
    {
        name: "Sri Ramana Ashram",
        state: "Tiruvannamalai, T.N.",
        capacity: "Variable",
        significance: "Permanent mouna (silence) environment. Arunachala mountain backdrop. Advaita Vedanta tradition.",
        bestFor: "Self-inquiry practitioners; Advaita Vedanta orientation; indefinite stays",
    },
];

export default function SilentMeditationRetreatsIndiaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="silent-meditation-retreats-india" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Spiritual Travel India Guide", href: "/spiritual-travel-india-guide" },
                            { label: "Silent Meditation Retreats in India", href: "/silent-meditation-retreats-india" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Into the <span className="text-orange-500 italic">Silence</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> India&apos;s 10-day Goenka Vipassana retreats are free, extremely rigorous, and widely considered the most effective introduction to systematic meditation practice available anywhere in the world. The rules: complete silence, no devices, no reading, 10-hour daily practice sessions, no meals after noon. The transformative trajectory: agony by Day 3, equanimity emerging by Day 7. Centers at Igatpuri, Bodh Gaya, and Dharamshala.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Ten days of Noble Silence does not feel like ten days of relaxation. It feels like ten years of therapy compressed. Both descriptions are accurate.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What is Vipassana?</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Vipassana is among the oldest meditation techniques in existence — attributed to the Buddha and preserved in the Theravada Buddhist tradition for approximately 2,500 years. The word means &quot;insight&quot; in Pali: specifically, the direct insight into the three characteristics of all conditioned phenomena — impermanence (anicca), suffering (dukkha), and non-self (anatta).
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The technique as taught in Goenka&apos;s tradition works through systematic observation of bodily sensations. The principle: every mental content — every thought, emotion, memory, desire — produces a corresponding physical sensation in the body. By observing these sensations with equanimity (neither craving pleasant ones nor pushing away unpleasant ones), the practitioner gradually dissolves the habitual reaction patterns that generate suffering.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                It is not a religious practice in the doctrinal sense — the Goenka tradition explicitly welcomes practitioners of all backgrounds and requires no adoption of Buddhist beliefs. It is a practical, systematic technique for investigating the nature of mind through direct observation.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Day-by-Day: What Actually Happens</h2>
                            <div className="space-y-4">
                                {dayByDay.map((d) => (
                                    <div key={d.day} className="bg-background/60 rounded-2xl p-5 border border-border/30 flex gap-4">
                                        <span className="text-orange-400 font-black text-sm whitespace-nowrap mt-0.5 min-w-[70px]">{d.day}</span>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-8">Major Centers for Silent Retreats</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {centers.map((c) => (
                                    <div key={c.name} className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-orange-400 mb-1">{c.name}</h3>
                                        <p className="text-xs text-muted-foreground mb-3">{c.state} • Capacity: {c.capacity}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: c.significance }} />
                                        <p className="text-xs text-orange-400/70 italic border-l-2 border-orange-500/20 pl-3"><strong>Best for:</strong> {c.bestFor}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/rishikesh-vs-dharamshala" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Rishikesh vs Dharamshala <ArrowRight size={16} />
                                </Link>
                                <Link href="/how-to-start-meditating-daily" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    How to Start Meditating Daily <ArrowRight size={16} />
                                </Link>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-4xl font-display font-bold mb-12 text-center tracking-tight uppercase">Common Questions</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {faqs.map((faq) => (
                                    <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm">
                                        <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                                        <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-orange-500/20" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Silence is Where It Begins.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Ten days of silence teaches what ten years of reading about meditation cannot. Register at dhamma.org — courses are free.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/indian-ashram-etiquette-packing"
                                eventLabel="silent_retreat:footer:packing"
                                trackPathName="indian-ashram-etiquette-packing"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Ashram Packing & Etiquette
                            </TrackedLink>
                            <TrackedLink
                                href="/how-to-start-meditating-daily"
                                eventLabel="silent_retreat:footer:meditate"
                                trackPathName="how-to-start-meditating-daily"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Start Meditating at Home
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
