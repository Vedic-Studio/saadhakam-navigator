import Link from "next/link";
import { ArrowRight, BookOpen, Brain, GraduationCap, Sparkles, MessageSquare, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const personas = [
  {
    icon: Brain,
    title: "The Philosopher",
    description: "Socratic questioning across all six darshanas. Ask about consciousness, and the tutor walks you through Samkhya, Advaita, and Nyaya perspectives with verse citations.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
  {
    icon: Sparkles,
    title: "The Practitioner",
    description: "Guided sadhana recommendations based on your temperament and available time. Cites Yoga Sutras, Bhagavad Gita, and traditional commentaries.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: GraduationCap,
    title: "The Scholar",
    description: "Word-by-word textual analysis. Compare how Shankara, Ramanuja, and Madhva interpret the same Upanishadic passage differently.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
];

const features = [
  { icon: BookOpen, text: "Knows all six darshanas" },
  { icon: Quote, text: "Cites primary texts with verse numbers" },
  { icon: Brain, text: "Adapts to your chosen path" },
  { icon: GraduationCap, text: "Trained on traditional commentaries" },
];

export function AiTutorTeaser() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-950/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-padding mx-auto max-w-7xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Coming Soon
            </span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              An AI Tutor That Actually{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-400">
                Knows the Texts
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Not another chatbot summarizing Wikipedia. A tutor trained on primary scriptures, traditional commentaries, and centuries of scholarly interpretation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Persona Cards */}
          <div className="space-y-4">
            {personas.map((persona) => (
              <div
                key={persona.title}
                className={`glass-card glass-card-hover rounded-2xl p-6 border ${persona.borderColor}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${persona.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <persona.icon className={`w-5 h-5 ${persona.color}`} />
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
            ))}
          </div>

          {/* Right: Sample Conversation */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground">Sadhaka AI</span>
                  <span className="block text-[11px] text-indigo-400 uppercase tracking-wider">Preview</span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">Sample Conversation</span>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-5">
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-indigo-500/15 border border-indigo-500/20 rounded-2xl rounded-br-md px-4 py-3 max-w-[85%]">
                  <p className="text-sm text-foreground">What did Shankara mean by maya?</p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-5 py-4 max-w-[90%] space-y-3">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Shankara defines maya not as &ldquo;illusion&rdquo; but as <em className="text-indigo-300">misidentification</em>. In Vivekachudamani, he describes it as that which makes the unreal appear real and the real appear hidden.
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Ramanuja disagrees sharply. In his Sri Bhashya, he argues the world is genuinely real as God&apos;s body. Maya is not cosmic deception but God&apos;s creative power.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The practical difference: for Shankara, recognizing maya dissolves attachment. For Ramanuja, the world&apos;s reality is precisely what makes devotion meaningful.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">Vivekachudamani</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">Sri Bhashya</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input mockup */}
            <div className="px-6 pb-5">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/5 rounded-full py-2.5 px-4 text-sm text-muted-foreground/50 border border-white/5">
                  Ask about any verse, concept, or practice...
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-600/50 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-indigo-200/50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature bullets + CTA */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8">
            {features.map((f) => (
              <div key={f.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <f.icon className="w-4 h-4 text-indigo-400/70" />
                <span>{f.text}</span>
              </div>
            ))}
          </div>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-medium transition-colors group"
          >
            See the full vision
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
