import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggeredList } from "@/components/animations/StaggeredList";

const crossCulturalComparisons = [
  {
    slug: "stoicism-vs-vedanta",
    entityA: "Stoicism",
    entityB: "Vedanta",
    hook: "Both teach that peace comes from mastering your inner world. Stoicism focuses on rational self-discipline. Vedanta questions whether the self doing the controlling is real at all.",
  },
  {
    slug: "mindfulness-vs-dhyana",
    entityA: "Mindfulness",
    entityB: "Dhyana",
    hook: "Western mindfulness is primarily stress reduction. Vedic Dhyana is a state of concentration intended to lead beyond the mind entirely.",
  },
  {
    slug: "psychology-vs-yoga-philosophy",
    entityA: "Western Psychology",
    entityB: "Yoga Philosophy",
    hook: "Psychology studies and heals the mind from within the mind. Yoga maps the entire territory of consciousness and offers a direct route beyond it.",
  },
  {
    slug: "freud-vs-patanjali",
    entityA: "Freud",
    entityB: "Patanjali",
    hook: "Both agree the invisible past drives the present. Freud treats the unconscious through analysis. Patanjali dissolves Samskaras through meditation.",
  },
  {
    slug: "sin-vs-karma",
    entityA: "Sin",
    entityB: "Karma",
    hook: "Sin is a moral transgression requiring forgiveness. Karma is a natural law of cause and effect. The difference changes everything about how you relate to suffering.",
  },
];

export function WesternBridge() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-padding mx-auto max-w-7xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-500/20">
              Cross-Cultural
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Familiar Entry Points Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-400">
                Unfamiliar Depth
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              You already know Stoicism, Freud, or mindfulness. See how Indian philosophy addresses the same questions and goes further.
            </p>
          </div>
        </ScrollReveal>

        <StaggeredList className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {crossCulturalComparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="group glass-card glass-card-hover rounded-2xl p-6 border border-white/5"
            >
              {/* Entity labels */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                  {comp.entityA}
                </span>
                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">vs</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {comp.entityB}
                </span>
              </div>

              {/* Hook */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {comp.hook}
              </p>

              {/* Read link */}
              <span className="inline-flex items-center gap-1.5 text-xs text-violet-400 group-hover:text-violet-300 font-medium transition-colors">
                Read full analysis
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </StaggeredList>

        <div className="mt-12 text-center">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-200 font-medium transition-colors group"
          >
            Explore all 60 comparisons
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
