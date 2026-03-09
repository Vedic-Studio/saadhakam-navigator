import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { ArrowRight, BookOpen, Flame, Shield, Sword, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Bhagavad Gita | The Ultimate Guide to Self-Mastery",
  description: "Explore the profound teachings of the Bhagavad Gita. From the paths of Devotion, Knowledge, and Action to the practical application of Dharma in crisis.",
  alternates: {
    canonical: "https://opensadhaka.com/bhagavad-gita-complete-guide",
  },
  openGraph: {
    title: "The Bhagavad Gita: A Manual for Living in the World",
    description: "Join Arjuna and Krishna on the battlefield of Kurukshetra to discover the eternal wisdom of the soul.",
    url: "https://opensadhaka.com/bhagavad-gita-complete-guide",
    type: "article",
  },
};

const chapters = [
  { num: 1, title: "Arjuna Vishada Yoga", desc: "The Yoga of Despair. Arjuna faces the moral crisis of war and surrenders to Krishna." },
  { num: 2, title: "Sankhya Yoga", desc: "The Yoga of Knowledge. Krishna explains the immortality of the soul and the nature of duty." },
  { num: 3, title: "Karma Yoga", desc: "The Yoga of Action. The secret of performing work without attachment to the results." },
  { num: 4, title: "Jnana Karma Sannyasa Yoga", desc: "The Yoga of Wisdom. The historical lineage of yoga and the fire of knowledge." },
  { num: 7, title: "Jnana Vijnana Yoga", desc: "The Yoga of Knowledge and Realization. Krishna's nature as the source of all energy." },
  { num: 11, title: "Vishwarupa Darshana Yoga", desc: "The Vision of the Universal Form. Arjuna sees the terrifying totality of God." },
  { num: 12, title: "Bhakti Yoga", desc: "The Yoga of Devotion. The qualities of a true devotee and the path of love." },
  { num: 18, title: "Moksha Sannyasa Yoga", desc: "The Yoga of Liberation. The final summary of duty, renunciation, and total surrender." }
];

export default function BhagavadGitaGuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug="bhagavad-gita-complete-guide" pillar="sacred-texts" />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Sacred Texts", href: "/texts" },
              { label: "Bhagavad Gita Complete Guide", href: "/bhagavad-gita-complete-guide" },
            ]}
          />

          <header className="mb-16 mt-8">
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              The Song of <span className="text-orange-500 italic">Dharma</span>.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
              The Bhagavad Gita is not a call to war, but a manual for choosing correctly when every option feels like a failure.
            </p>
          </header>

          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">The Battlefield of the Mind</h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  While contextually set in the middle of a civil war on the field of Kurukshetra, the Gita is widely interpreted as a psychological allegory. The battlefield represents the human heart; the chariot is the body; the five horses are the senses; Arjuna is the individual soul (Jiva); and Krishna is the indwelling Divine Witness (Atman).
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  The "crisis" of Arjuna—his sudden paralysis and refusal to act—is the existential crisis of every seeker. How do we live and act in a world full of complexity and moral ambiguity without losing our peace or accumulating karmic debt? Krishna's answer is a multi-path synthesis known as <strong className="text-foreground">Integral Yoga</strong>.
                </p>
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-3xl p-10 grid grid-cols-2 gap-4 text-center">
                <div className="p-6 bg-background rounded-2xl border border-border/20">
                  <Flame className="mx-auto mb-2 text-orange-500" />
                  <h4 className="font-bold text-sm">Action</h4>
                </div>
                <div className="p-6 bg-background rounded-2xl border border-border/20">
                  <Users className="mx-auto mb-2 text-orange-500" />
                  <h4 className="font-bold text-sm">Devotion</h4>
                </div>
                <div className="p-6 bg-background rounded-2xl border border-border/20">
                  <BookOpen className="mx-auto mb-2 text-orange-500" />
                  <h4 className="font-bold text-sm">Wisdom</h4>
                </div>
                <div className="p-6 bg-background rounded-2xl border border-border/20">
                  <Shield className="mx-auto mb-2 text-orange-500" />
                  <h4 className="font-bold text-sm">Dharma</h4>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20 bg-muted/20 rounded-3xl p-10 border border-border/40">
            <h2 className="text-3xl font-display font-bold mb-10 text-center">The Yoga Triumvirate</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <Sword className="text-orange-500 w-5 h-5" />
                  Karma Yoga
                </h3>
                <p className="text-muted-foreground leading-relaxed">The path of selfless action. Krishna instructs: "Your right is only to work, never to its fruits." By surrendering the outcome, the work itself becomes a meditation.</p>
                <Link href="/choose-between-bhakti-jnana-karma-raja-yoga" className="text-xs font-black uppercase text-orange-400 hover:text-orange-500 transition-colors">View Path Guide</Link>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <Users className="text-orange-500 w-5 h-5" />
                  Bhakti Yoga
                </h3>
                <p className="text-muted-foreground leading-relaxed">The path of devotion. For those of emotional temperament, the realization of God through surrendered love and constant remembrance is the highest path.</p>
                <Link href="/choose-between-bhakti-jnana-karma-raja-yoga" className="text-xs font-black uppercase text-orange-400 hover:text-orange-500 transition-colors">View Path Guide</Link>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <BookOpen className="text-orange-500 w-5 h-5" />
                  Jnana Yoga
                </h3>
                <p className="text-muted-foreground leading-relaxed">The path of knowledge. Using discrimination to separate the Self from the non-self, the Jnani burns all karma in the fire of wisdom.</p>
                <Link href="/choose-between-bhakti-jnana-karma-raja-yoga" className="text-xs font-black uppercase text-orange-400 hover:text-orange-500 transition-colors">View Path Guide</Link>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-4xl font-display font-bold mb-12">Essential Chapters</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {chapters.map((ch) => (
                <div key={ch.num} className="p-8 rounded-2xl border border-border/40 bg-card hover:border-orange-500/20 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg text-foreground">{ch.title}</h4>
                    <span className="text-xs font-black text-orange-500/40 uppercase tracking-widest">Chapter {ch.num}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">{ch.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="bg-orange-600/5 border border-orange-500/10 rounded-3xl p-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3 text-center">
                <div className="text-6xl font-display font-black text-orange-500 mb-2">16:21</div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The Three Gateways to Hell</p>
              </div>
              <div className="md:w-2/3">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6 italic">
                  "Triple is the gateway to hell, destructive of the self — Lust, Anger, and Greed; therefore, one should abandon these three."
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Krishna's warning is practical. These three states "color" the mind so intensely that they make it impossible to see Dharma (duty) or the Truth. Spiritual progress begins with purifying these gates.
                </p>
              </div>
            </div>
          </section>

          <div className="rounded-3xl bg-orange-600 p-12 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <Sword size={400} className="rotate-45 translate-x-32" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 relative z-10">Choose Your Path.</h2>
            <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
              The Gita declares that there are as many paths to the Divine as there are human temperaments. Which one matches yours?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <TrackedLink
                href="/faith-finder"
                eventLabel="gita_guide:footer:quiz"
                trackPathName="sacred-texts"
                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Take the Path Quiz
              </TrackedLink>
              <TrackedLink
                href="/texts/bhagavad-gita"
                eventLabel="gita_guide:footer:texts"
                trackPathName="bhagavad-gita"
                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
              >
                Read the Full Verses
              </TrackedLink>
            </div>
          </div>

          <footer className="mt-20 pt-10 border-t border-border/40 text-center">
            <p className="text-sm text-muted-foreground italic mb-4 uppercase tracking-widest font-bold">Recommended Translations</p>
            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-muted-foreground/60 uppercase tracking-wide">
              <span>Eknath Easwaran</span>
              <span>Swami Prabhavananda</span>
              <span>S. Radhakrishnan</span>
              <span>Winthrop Sargeant (Transliterated)</span>
            </div>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
