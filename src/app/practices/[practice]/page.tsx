import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ChakraSpinner } from "@/components/visuals/ChakraSpinner";
import { getPracticeBySlug, practices } from "@/data/practices";
import { practiceGoals, getPracticeGoalBySlug } from "@/data/practiceGoals";
import {
    ArrowLeft,
    ArrowRight,
    Sparkles,
    Zap,
    Clock,
    CheckCircle2,
    PlayCircle
} from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export async function generateStaticParams() {
    return practices.map((p) => ({ practice: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ practice: string }>;
}): Promise<Metadata> {
    const { practice: slug } = await params;
    const practice = getPracticeBySlug(slug);
    if (!practice) return {};

    return {
        title: `${practice.title} (${practice.sanskritName}) — A Complete Guide | Sadhaka`,
        description: `${practice.summary} Learn how to practice ${practice.title}, its benefits, and how to incorporate it into your daily Sadhana.`,
        keywords: [
            practice.title.toLowerCase(),
            practice.sanskritName,
            "sadhana",
            "spiritual practice",
            "sanatan dharma",
            ...practice.tags,
        ],
        alternates: {
            canonical: `https://www.opensadhaka.com/practices/${slug}`,
        },
    };
}

export default async function PracticeDetailPage({
    params,
}: {
    params: Promise<{ practice: string }>;
}) {
    const { practice: slug } = await params;
    const practice = getPracticeBySlug(slug);
    if (!practice) notFound();

    // Source of truth: `practice.availableGoals` lists which `/practices/<slug>/for/<goal>`
    // intent pages are actually published. Fall back to a generic preview only
    // when a practice has not declared any (so the hub still feels populated).
    const relevantGoals =
        practice.availableGoals && practice.availableGoals.length > 0
            ? practice.availableGoals
                  .map((slug) => getPracticeGoalBySlug(slug))
                  .filter((g): g is NonNullable<ReturnType<typeof getPracticeGoalBySlug>> =>
                      Boolean(g),
                  )
            : practiceGoals.slice(0, 3);

    return (
        <div className="min-h-screen bg-background">
            <ContentPageTracker slug={`practice-${slug}`} pillar="practices" />
            <Header />
            <main className="pt-24 pb-20">
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-500/5 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-24 pointer-events-none">
                        <ChakraSpinner size={384} petals={12} speed={30} />
                    </div>
                    <ScrollReveal>
                    <div className="max-w-4xl mx-auto relative z-10 text-center">
                        <nav aria-label="Breadcrumb" className="mb-12 flex justify-center">
                            <Link
                                href="/practical-spiritual-practices"
                                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-orange-400 transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Practices
                            </Link>
                        </nav>
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold uppercase tracking-widest border border-orange-500/20">
                            {practice.sanskritName}
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
                            {practice.title}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {practice.summary}
                        </p>
                    </div>
                    </ScrollReveal>
                </section>

                <section className="px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-12">
                            {/* The "What it is" Section */}
                            <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.02]">
                                <h2 className="text-3xl font-display font-bold mb-6">The Ritual Path</h2>
                                <div className="prose prose-invert prose-orange max-w-none">
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        {practice.whatItIs}
                                    </p>
                                </div>

                                <div className="mt-10 space-y-6">
                                    <div className="flex gap-4 items-start bg-background/40 p-6 rounded-2xl border border-white/5">
                                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                            <PlayCircle className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">How to Begin</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {practice.howToBegin}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Integrated Card System for Goals */}
                            <div>
                                <h2 className="text-3xl font-display font-bold mb-8">Personalize Your Path</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {relevantGoals.map((goal) => (
                                        <TrackedLink
                                            key={goal.slug}
                                            href={`/practices/${practice.slug}/for/${goal.slug}`}
                                            eventLabel={`practice_detail:goal_link:${goal.slug}`}
                                            trackPathName={`${practice.slug}-for-${goal.slug}`}
                                            className="group p-6 rounded-2xl border border-white/5 bg-card hover:border-orange-500/30 transition-all"
                                        >
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                                                {practice.title} for {goal.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {goal.summary}
                                            </p>
                                            <div className="mt-4 flex items-center text-orange-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                View recommended path <ArrowRight className="ml-2 w-4 h-4" />
                                            </div>
                                        </TrackedLink>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <aside className="space-y-6">
                            <div className="p-6 rounded-3xl border border-orange-500/20 bg-orange-500/5">
                                <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-orange-400" />
                                    Technical Benefits
                                </h3>
                                <ul className="space-y-4">
                                    {practice.benefits.map((benefit, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                            <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 rounded-3xl border border-white/5 bg-muted/30">
                                <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                                    <Clock className="w-5 h-5 text-muted-foreground" />
                                    Commitment
                                </h3>
                                <p className="text-muted-foreground text-sm font-medium">
                                    {practice.timeCommitment}
                                </p>
                            </div>

                            <div className="p-6 rounded-3xl border border-white/5 bg-muted/30">
                                <h3 className="font-display text-xl font-bold mb-4 text-foreground">
                                    Ideal For
                                </h3>
                                <p className="text-muted-foreground text-sm italic leading-relaxed">
                                    {practice.whoItSuits}
                                </p>
                            </div>

                            <TrackedLink
                                href="/faith-finder"
                                eventLabel={`practice_detail:cta:faith-finder`}
                                trackPathName={practice.slug}
                                className="block"
                            >
                                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]">
                                    Find Your Path <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </TrackedLink>
                        </aside>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
