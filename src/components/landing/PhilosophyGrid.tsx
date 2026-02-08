import { ArrowRight, Brain, Eye, Scale, Shuffle, Infinity, Sparkles } from "lucide-react";

const DARSHANAS = [
  {
    sanskrit: "Nyaya",
    english: "Logic & Epistemology",
    question: "How do we know what is true?",
    teaching: "Valid knowledge comes from perception, inference, comparison, and testimony.",
    icon: Scale,
    color: "text-blue-400 bg-blue-400/10"
  },
  {
    sanskrit: "Vaisheshika",
    english: "Atomic Naturalism",
    question: "What is the universe made of?",
    teaching: "Reality is composed of atoms (anu) and distinct categories of existence.",
    icon: Sparkles,
    color: "text-cyan-400 bg-cyan-400/10"
  },
  {
    sanskrit: "Samkhya",
    english: "Dualist Realism",
    question: "What is the relationship between consciousness and matter?",
    teaching: "The universe evolves from the interaction of Purusha (Consciousness) and Prakriti (Nature).",
    icon: Shuffle,
    color: "text-orange-400 bg-orange-400/10"
  },
  {
    sanskrit: "Yoga",
    english: "Practical Psychology",
    question: "How do I master my mind?",
    teaching: "Cessation of mental fluctuations (Chitta Vritti Nirodha) leads to liberation.",
    icon: Brain,
    color: "text-emerald-400 bg-emerald-400/10"
  },
  {
    sanskrit: "Mimamsa",
    english: "Ritual & Hermeneutics",
    question: "What is my duty (Dharma)?",
    teaching: "Action (Karma) and ritual correctness uphold the cosmic order (Rta).",
    icon: Eye,
    color: "text-red-400 bg-red-400/10"
  },
  {
    sanskrit: "Vedanta",
    english: "End of Knowledge",
    question: "Who am I?",
    teaching: "Brahman (Ultimate Reality) is the only truth; the world is an appearance.",
    icon: Infinity,
    color: "text-purple-400 bg-purple-400/10"
  }
];

export function PhilosophyGrid() {
  return (
    <section className="py-24 bg-background relative border-t border-white/5">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary block">The Six Schools of Thought</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            The Six <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">Darshanas</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sanatan Dharma is not dogmatic. It offers six distinct philosophical lenses to view reality, tailored to different temperaments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DARSHANAS.map((school, index) => (
            <div
              key={school.sanskrit}
              className="group relative bg-card/30 border border-white/10 rounded-2xl p-8 hover:bg-card/50 transition-colors duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${school.color} group-hover:scale-110 transition-transform duration-300`}>
                <school.icon className="w-6 h-6" />
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-bold text-foreground">{school.sanskrit}</h3>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{school.english}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-secondary italic">"{school.question}"</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {school.teaching}
                  </p>
                </div>
              </div>

              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
