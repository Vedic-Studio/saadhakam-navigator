import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const comparisonRows = [
  { dimension: "Reality", advaita: "Only Brahman is ultimately real", dvaita: "God, souls, and matter are all real" },
  { dimension: "Nature of God", advaita: "Attribute-less Absolute (Nirguna)", dvaita: "Personal God with infinite qualities (Saguna)" },
  { dimension: "The Soul", advaita: "Identical to Brahman", dvaita: "Eternally distinct from God" },
  { dimension: "Liberation", advaita: "Recognition of non-duality", dvaita: "Eternal devotion in God's presence" },
  { dimension: "Primary Path", advaita: "Jnana (Self-inquiry)", dvaita: "Bhakti (Total devotion to Vishnu)" },
  { dimension: "Founder", advaita: "Adi Shankaracharya (8th c.)", dvaita: "Madhvacharya (13th c.)" },
];

export function ProofOfDepth() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-padding mx-auto max-w-5xl relative z-10">
        <ScrollReveal>
          <div className="mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
              Sample Analysis
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Advaita vs Dvaita Vedanta
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Is the universe One, or Two? Is your innermost Self the same as God, or forever distinct? This is the question that divided India&apos;s greatest minds for over a thousand years.
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison Table */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[140px_1fr_1fr] md:grid-cols-[180px_1fr_1fr] bg-white/[0.03] border-b border-white/10">
            <div className="p-4 md:p-5" />
            <div className="p-4 md:p-5 border-l border-white/5">
              <h3 className="font-display text-sm md:text-base font-bold text-amber-300">Advaita</h3>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5">Non-Duality</p>
            </div>
            <div className="p-4 md:p-5 border-l border-white/5">
              <h3 className="font-display text-sm md:text-base font-bold text-indigo-300">Dvaita</h3>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5">Dualism</p>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonRows.map((row, i) => (
            <div
              key={row.dimension}
              className={`grid grid-cols-[140px_1fr_1fr] md:grid-cols-[180px_1fr_1fr] ${
                i < comparisonRows.length - 1 ? "border-b border-white/5" : ""
              } ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
            >
              <div className="p-4 md:p-5 flex items-start">
                <span className="text-xs md:text-sm font-semibold text-foreground/80">{row.dimension}</span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/5">
                <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">{row.advaita}</span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/5">
                <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">{row.dvaita}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Excerpt */}
        <div className="mt-8 glass-card rounded-2xl p-6 md:p-8 border border-white/10">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Advaita Vedanta teaches that the individual soul and the ultimate reality are strictly identical. Dvaita Vedanta teaches that the soul and God are eternally distinct. Both have produced enlightened beings. Both are internally consistent. The debate between them is India&apos;s oldest and greatest philosophical dialogue.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-medium transition-colors group"
          >
            One of 60 comparisons. Explore more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
