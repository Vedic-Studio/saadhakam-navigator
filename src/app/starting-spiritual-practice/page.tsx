import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "How to Start Spiritual Practice (Beginner Guide) | Sadhaka",
    description:
        "A practical beginner guide to starting spiritual practice without overwhelm. Build a simple daily routine rooted in Sanatan Dharma principles.",
    alternates: {
        canonical: "https://opensadhaka.com/starting-spiritual-practice",
    },
};

const steps = [
    {
        title: "Pick one primary practice",
        body: "Start with only one method (Japa, breathwork, or silent sitting). Avoid mixing too many techniques in week one.",
    },
    {
        title: "Choose a fixed daily slot",
        body: "Consistency beats intensity. A fixed 15-minute slot daily is stronger than occasional long sessions.",
    },
    {
        title: "Track completion, not perfection",
        body: "Use a simple streak tracker. The goal is “showing up” each day, even if quality fluctuates.",
    },
    {
        title: "Add depth after 30 days",
        body: "Only after one month of consistency should you add a second practice or expand duration.",
    },
];

export default function StartingSpiritualPracticePage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "What is the best way to start spiritual practice as a beginner?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Start with one daily practice you can sustain for 30–40 days, usually 10 minutes of Japa followed by 5 minutes of silence at a fixed time.",
                },
            },
            {
                "@type": "Question",
                name: "How long should I stay with one beginner spiritual routine before changing it?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Stay with one routine for at least 30 days before modifying it. Prioritize consistency and track completion rather than intensity or perfection.",
                },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="starting-spiritual-practice" pillar="seo-chooser" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Header />
            <main className="flex-grow pt-28 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <header className="text-center mb-14">
                        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            Starting Spiritual Practice
                        </h1>
                        <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed mb-4">
                            <strong>Direct answer:</strong> start with one daily practice you can sustain for 30–40 days (usually Japa + short silence), not with a complex spiritual routine.
                        </p>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            If you are overwhelmed by too much advice, begin with this: one
                            practice, one time slot, one month of consistency.
                        </p>
                    </header>

                    <LongformContent>
                        <section className="rounded-2xl border border-border/60 bg-card/40 p-6 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">Best for / Not best for / Where to start</h2>
                            <ul className="space-y-3 text-muted-foreground leading-relaxed">
                                <li><strong className="text-foreground">Best for:</strong> beginners who feel confused by too many teachings and need a stable, low-friction starting structure.</li>
                                <li><strong className="text-foreground">Not best for:</strong> people looking for immediate mystical experiences or a 10-practice routine in week one.</li>
                                <li><strong className="text-foreground">Where to start:</strong> 10 minutes Japa + 5 minutes silence at the same time daily, then review after 30 days.</li>
                            </ul>
                        </section>

                        <section className="space-y-5 mb-12">
                            {steps.map((step, idx) => (
                                <article key={step.title} className="rounded-2xl border border-border/60 bg-card p-6">
                                    <p className="text-orange-500 font-semibold mb-2">Step {idx + 1}</p>
                                    <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                                </article>
                            ))}
                        </section>
                    </LongformContent>

                    <section className="rounded-2xl border border-orange-900/40 bg-orange-950/20 p-8 text-center">
                        <h2 className="text-3xl font-display font-bold mb-3">Your simple starter stack</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                            10 minutes of Japa + 5 minutes of silence daily. Repeat for 30 days.
                            Then evolve based on what actually works for your temperament.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <TrackedLink
                                href="/how-to-start-japa"
                                eventLabel="starting_spiritual_practice:japa:/how-to-start-japa"
                                trackPathName="practical-practices"
                                className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 font-medium"
                            >
                                Learn Japa <ArrowRight className="ml-2 w-4 h-4" />
                            </TrackedLink>
                            <TrackedLink
                                href="/daily-spiritual-routine-beginners"
                                eventLabel="starting_spiritual_practice:routine:/daily-spiritual-routine-beginners"
                                trackPathName="practical-practices"
                                className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 font-medium"
                            >
                                Daily Routine Guide <ArrowRight className="ml-2 w-4 h-4" />
                            </TrackedLink>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="starting_spiritual_practice:cta:faith-finder"
                                trackPathName="seo-chooser"
                                className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-5 py-2.5 text-white font-semibold"
                            >
                                Find My Path <ArrowRight className="ml-2 w-4 h-4" />
                            </TrackedLink>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
