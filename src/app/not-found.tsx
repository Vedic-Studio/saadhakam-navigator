import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  FileText,
  Flame,
  Languages,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found | Sadhaka",
  description:
    "The page you requested no longer exists or never did. Use the links below to enter the Sadhaka library.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.opensadhaka.com/404",
  },
};

const hubs = [
  {
    title: "Articles",
    description: "Research-grounded essays on philosophy, practice, and text.",
    href: "/articles",
    icon: FileText,
    color: "text-teal-400",
  },
  {
    title: "Philosophies",
    description: "Advaita, Dvaita, Samkhya, Yoga, and the six darshanas.",
    href: "/ancient-wisdom-philosophies",
    icon: Compass,
    color: "text-amber-400",
  },
  {
    title: "Practices",
    description: "Meditation, japa, puja, and daily sadhana grounded in scripture.",
    href: "/practical-spiritual-practices",
    icon: Sparkles,
    color: "text-pink-400",
  },
  {
    title: "Sacred Texts",
    description: "Vedas, Upanishads, Bhagavad Gita, Itihasas, Puranas, and Agamas.",
    href: "/sacred-texts-teachings",
    icon: ScrollText,
    color: "text-orange-400",
  },
  {
    title: "Stotras",
    description: "Devotional hymns with verse-level translation and analysis.",
    href: "/stotras",
    icon: BookOpen,
    color: "text-indigo-400",
  },
  {
    title: "Sanskrit",
    description: "Key terms with etymology, pronunciation, and context.",
    href: "/learn/sanskrit",
    icon: Languages,
    color: "text-emerald-400",
  },
  {
    title: "Find Your Path",
    description: "A short orientation tool for choosing where to begin.",
    href: "/faith-finder",
    icon: Flame,
    color: "text-rose-400",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100">
      <Header />
      <main className="container-padding mx-auto max-w-5xl pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mb-12 md:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-400/80">
            404
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Page not found
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            This page no longer exists or never did. The links below point to
            where the library lives — start at a hub and work inward.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12">
          {hubs.map((hub) => (
            <Link
              key={hub.href}
              href={hub.href}
              className="group rounded-2xl border border-border/50 bg-card/50 p-5 hover:border-orange-500/40 hover:bg-card transition-all duration-300"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${hub.color}`}
                >
                  <hub.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-base font-bold text-foreground mb-1 group-hover:text-orange-400 transition-colors">
                    {hub.title}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {hub.description}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-orange-400 transition-colors"
          >
            Return home
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/articles"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse all articles
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About Sadhaka
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
