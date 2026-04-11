import type { Metadata } from "next";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { ArrowRight, BookOpen, Brain, CheckCircle2, Compass, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "The Yoga Sutras of Patanjali | The Complete Guide to the Mind",
  description: "A deep dive into Patanjali's Yoga Sutras. Explore the Eight Limbs of Yoga (Ashtanga), the nature of concentration, and the path to mental liberation.",
  alternates: {
    canonical: "https://www.opensadhaka.com/yoga-sutras-complete-guide",
  },
  openGraph: {
    title: "The Yoga Sutras of Patanjali: A Master Manual for the Mind",
    description: "Explore the 196 aphorisms that define the science of yoga and the systematic cessation of mental fluctuations.",
    url: "https://www.opensadhaka.com/yoga-sutras-complete-guide",
    type: "article",
  },
};

export default function YogaSutrasGuidePage() {
    const schemas = {
        article: buildArticleSchema({
            headline: "The Yoga Sutras of Patanjali | The Complete Guide to the Mind",
            description: "A deep dive into Patanjali's Yoga Sutras. Explore the Eight Limbs of Yoga (Ashtanga), the nature of concentration, and the path to mental liberation.",
            url: "https://www.opensadhaka.com/yoga-sutras-complete-guide",
            datePublished: "2026-03-20",
            section: "Sacred Texts",
        }),
        breadcrumb: buildBreadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Sacred Texts", href: "/sacred-texts-teachings" },
            { label: "The Yoga Sutras of Patanjali", href: "/yoga-sutras-complete-guide" },
        ]),
    };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
      <ContentPageTracker slug="yoga-sutras-complete-guide" pillar="sacred-texts" />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Sacred Texts", href: "/texts" },
              { label: "Yoga Sutras Complete Guide", href: "/yoga-sutras-complete-guide" },
            ]}
          />

          <header className="mb-16 mt-8">
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              The <span className="text-orange-500 italic">Science</span> of Stilling.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
              The Yoga Sutras of Patanjali are not a religious text, but a 2,000-year-old technical manual for the systematic deconstruction of mental suffering.
            </p>
          </header>

          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">The Definition of Yoga</h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  In the second verse of the first chapter, Patanjali delivers the "source code" of the entire system: <strong className="text-foreground italic">"Yogas Chitta Vritti Nirodha."</strong> This is frequently translated as "Yoga is the cessation of the modifications of the mind-stuff."
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Yoga is compared to the settling of a lake. When the water is turbulent (the Vrittis), the bottom of the lake (your true Self) is obscured. When the ripples stop, the reflection is perfect. The Sutras are the methodology for achieving that stillness through practice (Abhyasa) and non-attachment (Vairagya).
                </p>
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-3xl p-10 flex flex-col justify-center gap-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500"><Brain /></div>
                  <p className="font-bold">Systematic Psychology</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500"><Target /></div>
                  <p className="font-bold">Focused Attention</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500"><Compass /></div>
                  <p className="font-bold">Ethical Foundation</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">The Eight Limbs (Ashtanga)</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Yama", desc: "Universal ethical restraints (non-violence, truthfulness)." },
                { name: "Niyama", desc: "Individual observances (discipline, self-study)." },
                { name: "Asana", desc: "Steady, comfortable posture for meditation." },
                { name: "Pranayama", desc: "Regulation of vital energy through breath." },
                { name: "Pratyahara", desc: "Withdrawal of senses from external objects." },
                { name: "Dharana", desc: "Concentration on a single point." },
                { name: "Dhyana", desc: "Unbroken flow of meditative awareness." },
                { name: "Samadhi", desc: "Complete absorption into the object of meditation." }
              ].map((limb, idx) => (
                <div key={limb.name} className="p-6 rounded-2xl border border-border/40 bg-card hover:border-orange-500/30 transition-all group">
                  <span className="text-xs font-black text-orange-500/40 mb-2 block tracking-widest uppercase">Limb 0{idx + 1}</span>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-orange-500">{limb.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{limb.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20 bg-orange-600/5 border border-orange-500/20 rounded-3xl p-10">
            <h2 className="text-3xl font-display font-bold mb-10 text-center">The Five Kleshas: Root Causes of Suffering</h2>
            <p className="text-xl text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto mb-12">
              Patanjali identifies five "afflictions" that color our perception and cause all human misery. Understanding these is the first step toward dismantling them.
            </p>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { name: "Avidya", label: "Ignorance", desc: "Mistaking the temporary for the eternal." },
                { name: "Asmita", label: "Egoism", desc: "Identifying with the instrument of seeing." },
                { name: "Raga", label: "Attachment", desc: "Clinging to pleasurable experiences." },
                { name: "Dvesha", label: "Aversion", desc: "Resistance to painful experiences." },
                { name: "Abhinivesha", label: "Clinging", desc: "The instinctive fear of death." }
              ].map((klesha) => (
                <div key={klesha.name} className="p-6 rounded-2xl bg-background border border-border/40 text-center flex flex-col items-center">
                  <h4 className="font-bold text-orange-500 mb-1">{klesha.name}</h4>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-3">{klesha.label}</span>
                  <p className="text-xs text-muted-foreground leading-tight italic">{klesha.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20 prose prose-invert max-w-none">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-4xl font-bold mb-10">The Four Padas (Books)</h2>
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle2 className="text-orange-500" />
                    Samadhi Pada (Contemplation)
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    This book defines yoga and discusses the various states of focus. It explains that the goal of yoga is to restrain the mind-stuff from taking various forms (Vrittis), eventually leading to the state of "seedless" absorption (Nirbeeja Samadhi).
                  </p>
                </div>
                <hr className="border-border/40" />
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle2 className="text-orange-500" />
                    Sadhana Pada (Practice)
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    The most practical book for modern readers. It outlines Kriya Yoga (Action Yoga) and the first five "outer" limbs of Ashtanga. It provides the ethical and physical foundation required before moving to internal concentration.
                  </p>
                </div>
                <hr className="border-border/40" />
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle2 className="text-orange-500" />
                    Vibhuti Pada (Accomplishment)
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Focuses on the internal limbs: Dharana, Dhyana, and Samadhi. It describes the "supernatural" powers (Siddhis) that arise through absolute concentration, but warns that these are distractions on the path to final freedom.
                  </p>
                </div>
                <hr className="border-border/40" />
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle2 className="text-orange-500" />
                    Kaivalya Pada (Liberation)
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    The culmination of the work. It describes the state of final liberation (Kaivalya) where consciousness is completely detached from the material world and rests in its own pure, absolute nature.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-950/20 to-background p-12 text-center shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-5"></div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tight relative z-10">Start Your Inner Experiment.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed relative z-10 flex flex-col gap-2">
              <span>"Yoga does not just change the way we see things, it transforms the person who sees."</span>
              <span className="text-sm font-bold uppercase tracking-widest text-orange-500">— B.K.S. Iyengar</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <TrackedLink
                href="/texts/yoga-sutras"
                eventLabel="yoga_sutras_guide:footer:texts"
                trackPathName="yoga-sutras"
                className="px-10 py-5 bg-orange-600 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Read the Original Sutras
              </TrackedLink>
              <TrackedLink
                href="/which-meditation-for-me"
                eventLabel="yoga_sutras_guide:footer:quiz"
                trackPathName="which-meditation-for-me"
                className="px-10 py-5 bg-transparent border-2 border-orange-500/30 text-muted-foreground font-bold rounded-2xl hover:bg-orange-600 hover:text-white transition-all"
              >
                Find Your Meditation Style
              </TrackedLink>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
