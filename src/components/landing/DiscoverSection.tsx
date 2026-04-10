import Link from "next/link";
import { ArrowRight, Star, Users, BookOpen, Languages, GitCompareArrows, Flame, Clock, Compass, Sparkles, ScrollText, Brain, FileText } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggeredList } from "@/components/animations/StaggeredList";

const categories = [
  {
    title: "Philosophies",
    description: "Six darshanas: Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta",
    href: "/philosophies",
    icon: Compass,
    color: "text-amber-400",
  },
  {
    title: "Sacred Texts",
    description: "Vedas, Upanishads, Itihasas, Puranas, and Agamas",
    href: "/texts",
    icon: ScrollText,
    color: "text-orange-400",
  },
  {
    title: "Jyotish",
    description: "Nakshatras, rashis, grahas, and daily panchang",
    href: "/jyotish",
    icon: Star,
    color: "text-yellow-400",
  },
  {
    title: "Daily Panchang",
    description: "Live vara, tithi, nakshatra, auspicious windows, and caution periods",
    href: "/panchang",
    icon: Compass,
    color: "text-orange-400",
  },
  {
    title: "Deities",
    description: "Shiva, Vishnu, Lakshmi, Ganesha, and more",
    href: "/deities",
    icon: Flame,
    color: "text-rose-400",
  },
  {
    title: "Mantras & Stotras",
    description: "Sacred chants with interactive japa counter",
    href: "/mantras",
    icon: BookOpen,
    color: "text-indigo-400",
  },
  {
    title: "Sanskrit",
    description: "Terms with etymology, pronunciation, and philosophical context",
    href: "/learn/sanskrit",
    icon: Languages,
    color: "text-emerald-400",
  },
  {
    title: "Compare Paths",
    description: "60 side-by-side analyses across traditions and thinkers",
    href: "/compare",
    icon: GitCompareArrows,
    color: "text-sky-400",
  },
  {
    title: "Great Masters",
    description: "Adi Shankaracharya, Ramakrishna, Vivekananda, and more",
    href: "/greats",
    icon: Users,
    color: "text-violet-400",
  },
  {
    title: "Sanatan History",
    description: "Evidence-based timeline from 22,000 BCE onwards",
    href: "/sanatan-history",
    icon: Clock,
    color: "text-cyan-400",
  },
  {
    title: "Practices",
    description: "Meditation, puja, yoga, japa, and daily sadhana",
    href: "/practical-spiritual-practices",
    icon: Sparkles,
    color: "text-pink-400",
  },
  {
    title: "Articles",
    description: "Research-grounded guides across Vedanta, practice, sacred texts, and major traditions",
    href: "/articles",
    icon: FileText,
    color: "text-teal-400",
  },
  {
    title: "AI Tutor",
    description: "A personal guide trained on primary scriptures and traditional commentaries",
    href: "/app",
    icon: Brain,
    color: "text-indigo-400",
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
              Browse the full encyclopedic breadth of Sanatan Dharma.
            </p>
          </div>
        </ScrollReveal>

        <StaggeredList className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group rounded-2xl border border-border/50 bg-card/50 p-5 hover:border-orange-500/40 hover:bg-card transition-all duration-300"
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${cat.color}`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-bold text-foreground mb-1 group-hover:text-orange-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
}
