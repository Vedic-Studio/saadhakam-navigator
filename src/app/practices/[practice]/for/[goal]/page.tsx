import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practices, getPracticeBySlug } from "@/data/practices";
import { getPracticeGoalBySlug } from "@/data/practiceGoals";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  PlayCircle,
  Zap,
  CheckCircle2,
  AlertCircle,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export async function generateStaticParams() {
  // Generate valid combinations
  // To implement the matrix from Phase 2 exclusions:
  // This is hardcoded for demo, normally we use a matrix from DB
  const validPairs = [
    { p: "japa", g: "anxiety" },
    { p: "japa", g: "focus" },
    { p: "japa", g: "devotion" },
    { p: "japa", g: "sleep" },
    { p: "yoga-sadhana", g: "focus" },
    { p: "dhyana", g: "spiritual-growth" },
    { p: "dhyana", g: "focus" },
    { p: "kirtan", g: "devotion" },
    { p: "puja", g: "devotion" },
    { p: "svadhyaya", g: "spiritual-growth" },
    { p: "seva", g: "spiritual-growth" },
  ];

  return validPairs.map((pair) => ({
    practice: pair.p,
    goal: pair.g,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { practice: string; goal: string };
}): Promise<Metadata> {
  const practice = getPracticeBySlug(params.practice);
  const goal = getPracticeGoalBySlug(params.goal);

  if (!practice || !goal) {
    return { title: "Practice for Goal Not Found" };
  }

  return {
    title: `${practice.title} for ${goal.name} | Spiritual Practices by Sadhaka`,
    description: `Learn how the ancient Sanatan Dharma practice of ${practice.title} (${practice.sanskritName}) can be applied for ${goal.name.toLowerCase()}.`,
    alternates: {
      canonical: `https://opensadhaka.com/practices/${practice.slug}/for/${goal.slug}`,
    },
  };
}

export default function PracticeForGoalPage({
  params,
}: {
  params: { practice: string; goal: string };
}) {
  const practice = getPracticeBySlug(params.practice);
  const goal = getPracticeGoalBySlug(params.goal);

  if (!practice || !goal) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How can ${practice.title} help with ${goal.name.toLowerCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${practice.title} supports ${goal.name.toLowerCase()} by creating a stable daily anchor and gradually reducing reactive patterns through consistent practice. ${goal.summary}`,
        },
      },
      {
        "@type": "Question",
        name: `What is a beginner protocol for ${practice.title} for ${goal.name.toLowerCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${practice.howToBegin} Start small, stay consistent, and review your response after 30–40 days before increasing intensity.`,
        },
      },
    ],
  };

  return (
    <main className="pt-24 pb-20">
      <ContentPageTracker slug={`practice-${practice.slug}-for-${goal.slug}`} pillar="practice-goal" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-500/5 to-transparent relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Breadcrumb" className="mb-12 flex justify-center">
            <Link
              href="/practical-spiritual-practices"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-orange-400 transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Practices
            </Link>
          </nav>
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold uppercase tracking-widest border border-orange-500/20">
              {practice.title}
            </span>
            <span className="text-muted-foreground">×</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
              {goal.name}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
            Refining <span className="text-orange-500 italic">{goal.name}</span> <br className="hidden md:block" />
            through <span className="text-primary italic">{practice.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {goal.summary}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* The Alignment Logic */}
          <div className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/5 bg-white/[0.02]">
            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-orange-400" />
              The Mechanical Alignment
            </h2>
            <div className="prose prose-invert prose-orange max-w-none text-lg leading-relaxed text-muted-foreground space-y-6">
              <p>
                We often treat <strong>{goal.name.toLowerCase()}</strong> as an external problem to be solved through force. But in the Dharmic laboratory, we see it as a mechanical dissonance in the <em>Pranamaya Kosha</em> (your energetic body).
              </p>
              <div className="bg-orange-500/5 rounded-2xl p-6 border border-orange-500/20 text-foreground italic font-medium">
                "The goal is not to suppress the symptom, but to alter the internal environment that allows it to persist."
              </div>
              <p>
                <strong>{practice.title}</strong> works because it shifts your primary anchor. Instead of being swept away by the <em>Vrittis</em> (thought-waves) of {goal.name.toLowerCase()}, you utilize {practice.title} as a fixed point in consciousness. It is a foundational rewiring—moving from reactive habit to conscious presence.
              </p>
            </div>
          </div>

          {/* Implementation Step-by-Step */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-center mb-12">The Integrated Protocol</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-white/5 bg-card">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                  <PlayCircle className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Activation Sequence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {practice.howToBegin.split('.')[0]}. Build the physical container before you start the internal work. If the seat is stable, the mind follows.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-white/5 bg-card">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Primary Outcomes</h3>
                <ul className="space-y-3">
                  {practice.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-3xl">
            <div className="flex gap-4 items-start">
              <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-wider text-sm">Medical Disclaimer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sādhaka provides traditional spiritual perspectives and practices. This content regarding {goal.name.toLowerCase()} is for educational and spiritual purposes and is not a substitute for professional medical or mental health advice.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-muted/30 p-12 rounded-[2.5rem] text-center border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <Compass className="w-48 h-48" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-6">Deepen Your Alignment</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Get a personalized path that matches {practice.title} with your specific life stage and gunas.
            </p>
            <TrackedLink
              href="/faith-finder"
              eventLabel={`practice_goal:${practice.slug}:${goal.slug}:faith-finder`}
              trackPathName={practice.slug}
            >
              <Button size="lg" className="px-10 h-16 rounded-2xl font-bold text-lg bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/20">
                Find Your Personal Path
              </Button>
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
