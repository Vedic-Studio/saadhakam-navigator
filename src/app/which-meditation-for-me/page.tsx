import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Which Meditation Is Right for Me? Practical Guide | Sadhaka",
    description:
        "Find the right meditation style for your personality and goals. Compare Japa, Dhyana, Breathwork, and Self-Inquiry with beginner-friendly guidance.",
    alternates: {
        canonical: "https://opensadhaka.com/which-meditation-for-me",
    },
};

const methods = [
    {
        name: "Japa (Mantra Repetition)",
        bestFor: "Busy, distracted minds that need a simple anchor",
        time: "10–20 min",
        start: "Repeat one mantra with breath for 108 counts",
        href: "/how-to-start-japa",
    },
    {
        name: "Dhyana (Silent Meditation)",
        bestFor: "Seekers drawn to stillness and witness awareness",
        time: "15–30 min",
        start: "Sit still and return attention to pure awareness",
        href: "/practices/dhyana",
    },
    {
        name: "Pranayama-led Meditation",
        bestFor: "Anxious or restless nervous systems",
        time: "8–15 min",
        start: "Begin with breath regulation, then sit in quiet",
        href: "/yoga-sutras-complete-guide",
    },
    {
        name: "Self-Inquiry",
        bestFor: "Philosophically inclined seekers",
        time: "10–25 min",
        start: "Ask “Who am I?” and trace attention to its source",
        href: "/what-is-vedanta",
    },
];

export default function WhichMeditationForMePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="which-meditation-for-me" pillar="seo-chooser" />
            <Header />
            <main className="flex-grow pt-28 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <header className="text-center mb-14">
                        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            Which Meditation Is <span className="text-orange-500">Right for Me?</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            The best meditation is the one you can sustain. Use this quick guide
                            to choose a method that matches your current mind-state and lifestyle.
                        </p>
                    </header>

                    <div className="space-y-5 mb-12">
                        {methods.map((method) => (
                            <article
                                key={method.name}
                                className="rounded-2xl border border-border/60 bg-card p-6 md:p-7"
                            >
                                <h2 className="text-2xl font-semibold mb-3">{method.name}</h2>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <p className="text-muted-foreground">
                                        <span className="text-foreground font-medium">Best for:</span> {method.bestFor}
                                    </p>
                                    <p className="text-muted-foreground">
                                        <span className="text-foreground font-medium">Typical time:</span> {method.time}
                                    </p>
                                    <p className="text-muted-foreground">
                                        <span className="text-foreground font-medium">How to start:</span> {method.start}
                                    </p>
                                </div>
                                <TrackedLink
                                    href={method.href}
                                    eventLabel={`which_meditation:${method.name}:${method.href}`}
                                    trackPathName={method.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                                    className="inline-flex items-center mt-5 text-orange-400 font-semibold"
                                >
                                    Learn this method <ArrowRight className="ml-2 w-4 h-4" />
                                </TrackedLink>
                            </article>
                        ))}
                    </div>

                    <section className="rounded-2xl border border-orange-900/40 bg-orange-950/20 p-8">
                        <h2 className="text-3xl font-display font-bold mb-4 text-center">Decision shortcut</h2>
                        <div className="max-w-2xl mx-auto space-y-3 text-muted-foreground">
                            <p className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
                                If your mind is noisy: begin with <strong className="text-foreground">Japa</strong>.
                            </p>
                            <p className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
                                If your body is tense: begin with <strong className="text-foreground">Pranayama</strong>.
                            </p>
                            <p className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
                                If you love direct contemplation: begin with <strong className="text-foreground">Self-Inquiry</strong>.
                            </p>
                        </div>

                        <div className="text-center mt-7">
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="which_meditation:cta:faith-finder"
                                trackPathName="seo-chooser"
                                className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold"
                            >
                                Get Personalized Practice Picks <ArrowRight className="ml-2 w-4 h-4" />
                            </TrackedLink>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
