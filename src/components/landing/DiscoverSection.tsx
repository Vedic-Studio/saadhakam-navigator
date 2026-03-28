import Link from "next/link";
import { ArrowRight, Star, Users, BookOpen, Languages, GitCompareArrows, Flame, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggeredList } from "@/components/animations/StaggeredList";

const categories = [
  {
    title: "Jyotish",
    description: "Nakshatras, rashis, grahas & daily panchang",
    href: "/jyotish",
    icon: Star,
    color: "text-amber-400",
  },
  {
    title: "Deities",
    description: "Shiva, Vishnu, Lakshmi, Ganesha & more",
    href: "/deities",
    icon: Flame,
    color: "text-orange-400",
  },
  {
    title: "Mantras & Stotras",
    description: "Sacred chants with interactive japa counter",
    href: "/mantras",
    icon: BookOpen,
    color: "text-indigo-400",
  },
  {
    title: "Sanskrit Dictionary",
    description: "2000+ words with meanings & roots",
    href: "/learn/sanskrit",
    icon: Languages,
    color: "text-emerald-400",
  },
  {
    title: "Compare Paths",
    description: "Side-by-side philosophy comparisons",
    href: "/compare",
    icon: GitCompareArrows,
    color: "text-sky-400",
  },
  {
    title: "Great Masters",
    description: "Adi Shankaracharya, Ramakrishna & more",
    href: "/greats",
    icon: Users,
    color: "text-rose-400",
  },
  {
    title: "Sanatan History",
    description: "Evidence-based timeline from 22,000+ BCE to Maurya Empire",
    href: "/sanatan-history",
    icon: Clock,
    color: "text-violet-400",
  },
];

export function DiscoverSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-padding mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/5">
              Explore
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">Sadhaka</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive deeper into the encyclopedic breadth of Sanatan Dharma.
            </p>
          </div>
        </ScrollReveal>

        <StaggeredList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-orange-500/40 hover:bg-card transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${cat.color}`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-orange-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
}
