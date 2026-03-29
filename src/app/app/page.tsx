import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Sparkles,
  GraduationCap,
  BookOpen,
  Globe,
  Users,
  GitCompareArrows,
  Clock,
  Scroll,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggeredList } from "@/components/animations/StaggeredList";
import {
  buildPageMetadata,
  buildWebPageSchema,
  buildUrl,
} from "@/lib/seo/index";
import { ConversationTabs } from "./ConversationTabs";
import { WaitlistForm } from "./WaitlistForm";

// ============================================================================
// Metadata
// ============================================================================

const PAGE_TITLE =
  "Sadhaka AI Tutor \u2014 Your Personal Guide to Indian Philosophy";
const PAGE_DESCRIPTION =
  "An AI spiritual tutor trained on primary texts across 6 philosophical schools. Cites specific verses. Adapts to your path. Coming soon.";
const PAGE_PATH = "/app";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

// ============================================================================
// Data
// ============================================================================

const personas = [
  {
    icon: Brain,
    title: "The Philosopher",
    description:
      "Socratic questioning across all six darshanas. Ask about consciousness, and the tutor walks you through Samkhya, Advaita, and Nyaya perspectives with verse citations.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    sample: {
      question: "Is consciousness produced by the brain?",
      answer:
        "Samkhya says no. Purusha (consciousness) is eternal and independent of Prakriti (matter). Yoga Sutras 1.3 states that when mental fluctuations cease, the seer rests in its own nature. Nyaya takes a different route, arguing consciousness is a quality that arises when the self contacts the mind. Two schools, two mechanisms, same starting observation.",
      citations: ["Yoga Sutras 1.3", "Nyaya Sutras 1.1.10"],
    },
  },
  {
    icon: Sparkles,
    title: "The Practitioner",
    description:
      "Guided sadhana recommendations based on your temperament and available time. Cites Yoga Sutras, Bhagavad Gita, and traditional commentaries.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    sample: {
      question: "I have 20 minutes each morning. What should I do?",
      answer:
        'Patanjali recommends abhyasa (steady practice) in Yoga Sutras 1.12. For 20 minutes: 5 minutes of pranayama (Nadi Shodhana, as described in Hatha Yoga Pradipika 2.7), then 15 minutes of seated meditation on a single point of focus. The Gita (6.25) says "shanair shanair uparamet" \u2014 settle the mind gradually, not by force.',
      citations: ["Yoga Sutras 1.12", "Bhagavad Gita 6.25"],
    },
  },
  {
    icon: GraduationCap,
    title: "The Scholar",
    description:
      "Word-by-word textual analysis. Compare how Shankara, Ramanuja, and Madhva interpret the same Upanishadic passage differently.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    sample: {
      question:
        'What does "tat tvam asi" actually mean word by word?',
      answer:
        '"Tat" (That, Brahman), "tvam" (you, the individual self), "asi" (are). Chandogya Upanishad 6.8.7. Shankara reads it as strict identity: you ARE Brahman. Ramanuja reads it as qualified identity: you are Brahman\u2019s body. Madhva reads it as "tat tvam asi" meaning "you are not that" (a-si), through a different sandhi split. Three readings, three schools, one sentence.',
      citations: ["Chandogya Upanishad 6.8.7"],
    },
  },
];

const knowledgeCards = [
  {
    number: "6",
    title: "Darshanas",
    description: "Complete philosophical schools",
    icon: Brain,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    number: "18",
    title: "Gita Chapters",
    description: "Verse-level analysis",
    icon: BookOpen,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    number: "60",
    title: "Comparisons",
    description: "Cross-school analyses",
    icon: GitCompareArrows,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    number: "42",
    title: "Deities",
    description: "Iconography and philosophy",
    icon: Users,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
  },
  {
    number: "73",
    title: "Articles",
    description: "In-depth editorial content",
    icon: Scroll,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    number: "22,000 BCE",
    title: "Timeline",
    description: "Civilizational history",
    icon: Clock,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
];

const comparisonRows = [
  {
    dimension: "Sources",
    chatgpt: "Training data from mixed-quality internet sources, Wikipedia, and unverified blogs",
    sadhaka:
      "Primary texts and traditional commentaries (Brahma Sutras, Upanishads, Yoga Sutras, Bhashyas)",
  },
  {
    dimension: "Citations",
    chatgpt: "Vague or fabricated references",
    sadhaka:
      "Specific verse numbers and named commentators (e.g., Shankara on Brahma Sutra 1.1.2)",
  },
  {
    dimension: "Schools",
    chatgpt: "Conflates Advaita, Dvaita, and Vishishtadvaita into generic Hinduism",
    sadhaka:
      "Distinguishes each darshana and traces disagreements to specific textual passages",
  },
  {
    dimension: "Sanskrit",
    chatgpt: "Basic translations, often inaccurate etymology",
    sadhaka:
      "Word-by-word etymology with IAST transliteration and dhatu (root) analysis",
  },
  {
    dimension: "Practice",
    chatgpt: "Generic spiritual advice",
    sadhaka:
      "Path-specific guidance calibrated to temperament, citing Gita (3.3, 12.8\u201312) on the four yogas",
  },
  {
    dimension: "Depth",
    chatgpt: "Surface-level summaries that conflate traditions",
    sadhaka:
      "Commentator-level analysis comparing how different acharyas read the same passage",
  },
];

const earlyAccessBenefits = [
  "First access when the tutor launches",
  "Shape the product direction with direct feedback",
  "Founding member recognition",
];

// ============================================================================
// Page Component
// ============================================================================

export default function AppPage() {
  const jsonLd = buildWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: buildUrl(PAGE_PATH),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Section 1: Hero / Vision */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-950/30 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-padding mx-auto max-w-4xl relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-8 border border-indigo-500/20 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Coming Soon
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 tracking-tight animate-fade-up">
            A Personal Guide Trained on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-400">
              Primary Scriptures
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Not another chatbot recycling Wikipedia summaries. An AI tutor that cites specific verses, distinguishes between philosophical schools, and adapts to your chosen path.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link href="#waitlist">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 h-14 px-8 rounded-full text-lg font-medium shadow-lg shadow-indigo-900/20 transition-all hover:scale-105"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-full text-lg border-white/10 hover:bg-white/5 text-foreground hover:text-white backdrop-blur-sm"
              >
                Explore the Knowledge Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Three Personas */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-950/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-padding mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-500/20">
                Three Modes
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                One Tutor, Three Approaches
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The same knowledge base, adapted to how you think and what you need. Ask a philosophical question, request practice guidance, or work through textual analysis word by word.
              </p>
            </div>
          </ScrollReveal>

          <StaggeredList className="grid md:grid-cols-3 gap-6">
            {personas.map((persona) => (
              <div
                key={persona.title}
                className={`glass-card rounded-2xl border ${persona.borderColor} overflow-hidden`}
              >
                {/* Persona header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl ${persona.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <persona.icon
                        className={`w-5 h-5 ${persona.color}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">
                        {persona.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {persona.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mini conversation */}
                <div className="border-t border-white/5 bg-white/[0.01] p-5 space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-indigo-500/15 border border-indigo-500/20 rounded-2xl rounded-br-md px-3 py-2 max-w-[90%]">
                      <p className="text-xs text-foreground">
                        {persona.sample.question}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-3 py-2.5 max-w-[95%] space-y-2">
                      <p className="text-xs text-foreground/90 leading-relaxed">
                        {persona.sample.answer}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {persona.sample.citations.map((cite) => (
                          <span
                            key={cite}
                            className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                          >
                            {cite}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* Section 3: Sample Conversations */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-950/25 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-padding mx-auto max-w-4xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/20">
                Preview
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                See It in Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Real questions, real textual depth. Every response cites primary sources and named commentators.
              </p>
            </div>
          </ScrollReveal>

          <ConversationTabs />
        </div>
      </section>

      {/* Section 4: What It Knows */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-950/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-padding mx-auto max-w-6xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
                Knowledge Base
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                What Powers the Tutor
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Every response draws from a structured knowledge base of primary texts, commentaries, and cross-school analysis.
              </p>
            </div>
          </ScrollReveal>

          <StaggeredList className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {knowledgeCards.map((card) => (
              <div
                key={card.title}
                className="glass-card glass-card-hover rounded-2xl p-5 md:p-6 border border-white/5 text-center"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center mx-auto mb-3`}
                >
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div className={`font-display text-2xl md:text-3xl font-bold ${card.color} mb-1`}>
                  {card.number}
                </div>
                <div className="text-sm font-semibold text-foreground mb-0.5">
                  {card.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {card.description}
                </div>
              </div>
            ))}
          </StaggeredList>

          {/* Depth + Breadth narrative */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
                Depth
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Not a summary of Vedanta. Analysis of how Shankara, Ramanuja, and Madhva each interpret the same Upanishadic passage differently, with specific verse citations and the philosophical stakes of each reading.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
                Breadth
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Covers all six darshanas: Samkhya, Yoga, Nyaya, Vaisheshika, Mimamsa, and Vedanta. Most resources focus exclusively on Vedanta. The tutor knows the full spectrum of Indian philosophical thought.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Not Just Use ChatGPT? */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-padding mx-auto max-w-5xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/20">
                Comparison
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Why Not Just Use ChatGPT?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                General-purpose AI models treat Indian philosophy as a footnote. The Sadhaka tutor treats it as the entire curriculum.
              </p>
            </div>
          </ScrollReveal>

          {/* Comparison Table */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[120px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] bg-white/[0.03] border-b border-white/10">
              <div className="p-4 md:p-5" />
              <div className="p-4 md:p-5 border-l border-white/5">
                <h3 className="font-display text-sm md:text-base font-bold text-muted-foreground/60">
                  ChatGPT
                </h3>
              </div>
              <div className="p-4 md:p-5 border-l border-white/5">
                <h3 className="font-display text-sm md:text-base font-bold text-indigo-300">
                  Sadhaka Tutor
                </h3>
              </div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-[120px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] ${
                  i < comparisonRows.length - 1
                    ? "border-b border-white/5"
                    : ""
                } ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
              >
                <div className="p-4 md:p-5 flex items-start">
                  <span className="text-xs md:text-sm font-semibold text-foreground/80">
                    {row.dimension}
                  </span>
                </div>
                <div className="p-4 md:p-5 border-l border-white/5">
                  <span className="text-xs md:text-sm text-muted-foreground/60 leading-relaxed">
                    {row.chatgpt}
                  </span>
                </div>
                <div className="p-4 md:p-5 border-l border-white/5">
                  <span className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                    {row.sadhaka}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Early Access Waitlist */}
      <section
        id="waitlist"
        className="relative py-24 md:py-32 overflow-hidden bg-background"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-padding mx-auto max-w-3xl relative z-10 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Early Access
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Be First When the Tutor Launches
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Early members get first access, shape the product direction, and receive founding member recognition.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10">
              {earlyAccessBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400/70 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
