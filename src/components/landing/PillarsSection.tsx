import Link from "next/link";
import { ArrowRight, Compass, BookOpen, GitCompareArrows, Users, Scroll, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggeredList } from "@/components/animations/StaggeredList";

const knowledgeCards = [
  {
    number: "6",
    title: "Darshanas",
    description: "Complete philosophical schools from Nyaya to Vedanta",
    href: "/philosophies",
    icon: Compass,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderHover: "hover:border-amber-500/30",
  },
  {
    number: "18",
    title: "Gita Chapters",
    description: "Verse-level analysis with traditional commentary",
    href: "/texts/bhagavad-gita",
    icon: BookOpen,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderHover: "hover:border-orange-500/30",
  },
  {
    number: "60",
    title: "Comparisons",
    description: "Side-by-side analysis across traditions and thinkers",
    href: "/compare",
    icon: GitCompareArrows,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderHover: "hover:border-indigo-500/30",
  },
  {
    number: "42",
    title: "Deities",
    description: "Iconography, philosophy, and associated texts",
    href: "/deities",
    icon: Users,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderHover: "hover:border-rose-500/30",
  },
  {
    number: "73",
    title: "Articles",
    description: "In-depth essays on philosophy, practice, and history",
    href: "/articles",
    icon: Scroll,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderHover: "hover:border-emerald-500/30",
  },
  {
    number: "22,000 BCE",
    title: "Timeline",
    description: "Evidence-based history with archaeological sources",
    href: "/sanatan-history",
    icon: Clock,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderHover: "hover:border-violet-500/30",
  },
];

export function PillarsSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/10 via-background to-background pointer-events-none" />

      <div className="container-padding mx-auto max-w-7xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
              Knowledge System
            </span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              The Knowledge That Powers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">
                the Tutor
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-6" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A curated knowledge system built on primary texts. Every number below links to real, browsable content.
            </p>
          </div>
        </ScrollReveal>

        <StaggeredList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {knowledgeCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group glass-card glass-card-hover rounded-2xl p-6 border border-white/5 ${card.borderHover}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`font-display text-2xl md:text-3xl font-bold ${card.color}`}>
                      {card.number}
                    </span>
                    <span className="font-display text-base md:text-lg font-bold text-foreground">
                      {card.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-foreground/60 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
}
