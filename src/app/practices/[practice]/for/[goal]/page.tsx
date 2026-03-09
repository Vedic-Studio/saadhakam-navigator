import { Metadata } from "next";
import { notFound } from "next/navigation";
import { practices, getPracticeBySlug } from "@/data/practices";
import { practiceGoals, getPracticeGoalBySlug } from "@/data/practiceGoals";
import Link from "next/link";
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

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <ContentPageTracker slug={`${practice.slug}-for-${goal.slug}`} pillar="practice-goal" />
      {/* Breadcrumbs Placeholder */}
      <nav className="text-sm mb-8 text-neutral-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/practices"
          className="hover:text-primary transition-colors"
        >
          Practices
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">
          {practice.title} for {goal.name}
        </span>
      </nav>

      <header className="mb-12 border-b border-neutral-200 pb-12">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {practice.title} for {goal.name}
        </h1>
        <p className="text-xl text-neutral-600 leading-relaxed mb-8">
          {goal.summary}
        </p>
        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            What is {practice.title}?{" "}
            <span className="font-normal text-lg tracking-widest bg-dark text-white rounded px-2">
              {practice.sanskritName}
            </span>
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            {practice.whatItIs}
          </p>
        </div>
      </header>

      <div className="prose prose-lg prose-neutral max-w-none">
        {/* The Unique Alignment Block (Required per rules) */}
        <h2 className="text-3xl font-bold mt-12 mb-6 text-neutral-900">
          Why use {practice.title} for {goal.name.toLowerCase()}?
        </h2>
        <div className="text-lg">
          {/* Placeholder for AI/Dynamic combination block */}
          <p>
            The practice of <strong>{practice.title.toLowerCase()}</strong> is
            uniquely suited for <strong>{goal.name.toLowerCase()}</strong>
            because it addresses the root causes on a subtle (pranic) and
            intellectual (vijnanamaya) level. While modern approaches to{" "}
            {goal.name.toLowerCase()} often focus purely on the psychological,
            Sanatan Dharma views the mind-body complex holistically.{" "}
            {practice.title} operates by redirecting the thought waves (
            <em>vrittis</em>) and anchoring the practitioner in present-moment
            awareness, thereby naturally resolving the dissonance that causes
            distress or lack of {goal.name.toLowerCase()}.
          </p>
          <p className="mt-4">{goal.description}</p>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-neutral-900">
          How To Begin
        </h2>
        <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
          <p className="mb-6 text-lg">{practice.howToBegin}</p>
          <h3 className="text-xl font-semibold mb-3 mt-6">
            Expected Technical Benefits:
          </h3>
          <ul className="space-y-3 list-disc list-inside marker:text-primary pl-4">
            {practice.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* Important Exclusions Guardrail Notice */}
        <div className="mt-12 bg-amber-50 p-6 rounded-2xl text-amber-900 text-sm border border-amber-200">
          <strong>Medical Disclaimer:</strong> Sādhaka provides traditional
          spiritual perspectives and practices. This content regarding{" "}
          {goal.name.toLowerCase()} is for educational and spiritual purposes
          and is not a substitute for professional medical or mental health
          advice. Please consult a qualified healthcare provider for clinical
          treatment.
        </div>
      </div>

      {/* Pathway CTA */}
      <section className="mt-16 bg-neutral-900 p-10 rounded-3xl text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Is {practice.title} right for you?
        </h2>
        <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
          Take our Faith Finder quiz and get a personalized path outlining
          exactly which practices match your personality (Gunas) and life stage
          (Ashrama).
        </p>
        <TrackedLink
          href="/faith-finder"
          eventLabel={`practice_goal:${practice.slug}:${goal.slug}:faith-finder`}
          trackPathName={practice.slug}
          className="inline-block bg-white text-neutral-900 font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
        >
          Find Your Path
        </TrackedLink>
      </section>
    </div>
  );
}
