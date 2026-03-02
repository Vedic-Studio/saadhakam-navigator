import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  List,
  Target,
  ArrowRight,
  Share2,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Yoga Sutras of Patanjali | Complete Guide to Ashtanga Yoga",
  description:
    "Explore the Yoga Sutras of Patanjali. A complete guide to the 8 limbs of yoga (Ashtanga), Samadhi, and the practical path to mental discipline and liberation.",
  keywords: [
    "yoga sutras",
    "patanjali",
    "ashtanga yoga",
    "eight limbs of yoga",
    "samadhi",
    "meditation",
    "raja yoga",
    "sanatan dharma",
  ],
  alternates: {
    canonical: "https://opensadhaka.com/yoga-sutras-complete-guide",
  },
  openGraph: {
    title: "Yoga Sutras Complete Guide | Sadhaka",
    description:
      "Explore the ancient manual for stilling the mind and achieving liberation.",
    url: "https://opensadhaka.com/yoga-sutras-complete-guide",
  },
};

export default function YogaSutrasGuidePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://opensadhaka.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sacred Texts",
        item: "https://opensadhaka.com/texts",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Yoga Sutras Complete Guide",
        item: "https://opensadhaka.com/yoga-sutras-complete-guide",
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Yoga Sutras of Patanjali | Complete Guide to Ashtanga Yoga",
    description:
      "Explore the Yoga Sutras of Patanjali. A complete guide to the 8 limbs of yoga (Ashtanga), Samadhi, and the practical path to mental discipline and liberation.",
    author: {
      "@type": "Organization",
      name: "Sadhaka",
    },
    publisher: {
      "@type": "Organization",
      name: "Sadhaka",
      logo: {
        "@type": "ImageObject",
        url: "https://opensadhaka.com/favicon.ico",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the Yoga Sutras of Patanjali?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Yoga Sutras is a foundational text of yoga philosophy compiled by Sage Patanjali around 400 CE. It consists of 196 terse aphorisms (sutras) describing the systematic process to control the mind and attain liberation.",
        },
      },
      {
        "@type": "Question",
        name: "What is Ashtanga Yoga?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ashtanga Yoga means 'The Eight-Limbed Path'. It outlines a comprehensive journey: ethical restraints (Yamas), observances (Niyamas), physical postures (Asana), breath control (Pranayama), sensory withdrawal (Pratyahara), concentration (Dharana), meditation (Dhyana), and absorption (Samadhi).",
        },
      },
      {
        "@type": "Question",
        name: "What is the ultimate goal of Yoga according to Patanjali?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Patanjali defines yoga as 'Chitta Vritti Nirodha' or the cessation of the modifications (fluctuations) of the mind. The ultimate goal is Kaivalya, absolute freedom and realization of the true self (Purusha).",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-primary/5 py-20 px-4 sm:px-6 lg:px-8 border-b border-border/40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 text-sm text-primary font-bold uppercase tracking-widest">
              Sacred Text Guide
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              The Complete Guide to the{" "}
              <span className="text-secondary">Yoga Sutras</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Discover the ancient manual for stilling the mind. Master the
              Eight Limbs of Yoga (Ashtanga) and achieve ultimate freedom.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Intro Section */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                Compiled around 400 CE by the sage Patanjali, the{" "}
                <strong>Yoga Sutras</strong> consist of 196 short aphorisms
                (sutras) that synthesize older traditions of contemplative
                practice into a coherent, highly structured philosophical
                framework. Known as Raja Yoga, this text provides a practical,
                step-by-step roadmap to transcending mental suffering.
              </p>
              <p>
                Unlike modern perceptions of yoga that focus primarily on
                physical exercise, the Yoga Sutras emphasize mastering the mind.
                The very second sutra clearly defines its entire methodology:{" "}
                <em>"Yogas chitta vritti nirodha"</em> — Yoga is the stilling of
                the changing states of the mind. Check out our{" "}
                <Link
                  href="/what-is-yoga"
                  className="text-primary font-medium hover:underline"
                >
                  guide on Yoga
                </Link>{" "}
                for foundational context.
              </p>
            </div>

            {/* Core Themes */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Compass className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl font-display font-bold text-foreground">
                  Core Philosophical Themes
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        1
                      </span>
                      The Mind (Chitta)
                    </h3>
                    <p className="text-muted-foreground">
                      The mind is compared to a lake. Our passing thoughts,
                      emotions, and memories are ripples (Vrittis). Only when
                      the lake is completely still can we see the bottom (our
                      true Self).
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        2
                      </span>
                      The Goal: Kaivalya
                    </h3>
                    <p className="text-muted-foreground">
                      The ultimate aim of the Yoga Sutras is{" "}
                      <strong>Kaivalya</strong>—absolute independence or
                      isolation. It is the realization that the pure
                      consciousness (
                      <Link
                        href="/what-is-atman"
                        className="text-primary hover:underline"
                      >
                        Purusha or Atman
                      </Link>
                      ) is distinctly separate from nature, thoughts, and matter
                      (
                      <Link
                        href="/what-is-samsara"
                        className="text-primary hover:underline"
                      >
                        Prakriti
                      </Link>
                      ).
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        3
                      </span>
                      The Kleshas (Obstacles)
                    </h3>
                    <p className="text-muted-foreground">
                      Patanjali outlines five root causes of human suffering:
                      ignorance of the true self (Avidya), egoism (Asmita),
                      attachment (Raga), aversion (Dvesha), and clinging to life
                      (Abhinivesha).
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        4
                      </span>
                      Ashtanga (Eight Limbs)
                    </h3>
                    <p className="text-muted-foreground">
                      The practical path to mastering the mind. These
                      progressive eight steps ensure ethical safety, physical
                      steadiness, energetic balance, and profound meditative
                      focus.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Chapter Breakdown */}
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-8 border-b border-border/50 bg-muted/20">
                <div className="flex items-center gap-3">
                  <List className="w-8 h-8 text-secondary" />
                  <h2 className="text-3xl font-display font-bold text-foreground">
                    The Four Chapters (Padas)
                  </h2>
                </div>
                <p className="text-muted-foreground mt-2">
                  The 196 sutras are divided into four distinct books.
                </p>
              </div>
              <div className="divide-y divide-border/50">
                <div className="p-6 sm:p-8 hover:bg-muted/10 transition-colors">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    1. Samadhi Pada (Portion on Contemplation)
                  </h3>
                  <p className="text-muted-foreground">
                    Defines yoga. Discusses the nature of the mind, the various
                    types of thought patterns, and the states of profound
                    absorption (Samadhi) one can achieve.
                  </p>
                </div>
                <div className="p-6 sm:p-8 hover:bg-muted/10 transition-colors">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    2. Sadhana Pada (Portion on Practice)
                  </h3>
                  <p className="text-muted-foreground">
                    Outlines Kriya Yoga (yoga in action) and the causes of
                    suffering (Kleshas). Introduces the first five outer limbs
                    of Ashtanga Yoga (Yamas, Niyamas, Asana, Pranayama,
                    Pratyahara).
                  </p>
                </div>
                <div className="p-6 sm:p-8 hover:bg-muted/10 transition-colors">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    3. Vibhuti Pada (Portion on Accomplishments)
                  </h3>
                  <p className="text-muted-foreground">
                    Details the final three internal limbs: focus, meditation,
                    and absorption (Dharana, Dhyana, Samadhi). Describes the
                    supernatural powers (Siddhis) that arise from immense
                    concentration, warning practitioners not to be distracted by
                    them.
                  </p>
                </div>
                <div className="p-6 sm:p-8 hover:bg-muted/10 transition-colors">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    4. Kaivalya Pada (Portion on Absoluteness)
                  </h3>
                  <p className="text-muted-foreground">
                    Focuses on the final liberation. Describes the separation of
                    pure consciousness from the material world and the end of
                    the karmic cycle.
                  </p>
                </div>
              </div>
            </div>

            {/* Practical Application */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl font-display font-bold text-foreground">
                  Practical Application: The Eight Limbs
                </h2>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>
                  The <strong>Ashtanga</strong> framework is highly sequential
                  and intensely practical for modern life.
                </p>
                <ul>
                  <li>
                    <strong>1. Yamas (External restraints):</strong>{" "}
                    <Link
                      href="/what-is-ahimsa"
                      className="text-primary hover:underline"
                    >
                      Ahimsa (Non-violence)
                    </Link>
                    , Truthfulness, Non-stealing, Energy moderation, Non-greed.
                    Establishing harmony directly with the world.
                  </li>
                  <li>
                    <strong>2. Niyamas (Internal observances):</strong> Purity,
                    Contentment, Discipline, Self-study, Surrender to the
                    Divine.
                  </li>
                  <li>
                    <strong>3. Asana (Posture):</strong> Creating a steady,
                    comfortable physical seat for meditation.
                  </li>
                  <li>
                    <strong>4. Pranayama (Breath control):</strong> Regulating
                    the vital energy by slowing the breath, which intimately
                    calms the mind.
                  </li>
                  <li>
                    <strong>5. Pratyahara (Sense withdrawal):</strong> Turning
                    the senses inward away from external distractions.
                  </li>
                  <li>
                    <strong>6. Dharana (Concentration):</strong> Focusing the
                    mind on a single point or object.
                  </li>
                  <li>
                    <strong>7. Dhyana (Meditation):</strong> An unbroken flow of
                    concentrated awareness.
                  </li>
                  <li>
                    <strong>8. Samadhi (Absorption):</strong> True union where
                    the meditator, the object of meditation, and the act of
                    meditating become one.
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="border-t border-border/50 pt-16">
              <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    What does 'Sutra' mean?
                  </h3>
                  <p className="text-muted-foreground">
                    Sutra literally means 'thread'. In literature, it refers to
                    a concise, aphoristic rule or formula. The Yoga Sutras are
                    meant to be 'threads' of wisdom woven together, concise
                    enough to be memorized.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Are the Yoga Sutras related to modern postural yoga?
                  </h3>
                  <p className="text-muted-foreground">
                    Modern postural (Vinyasa/Hatha) yoga focuses heavily on the
                    third limb (Asana). Patanjali's text barely mentions
                    physical fitness; his reference to 'Asana' simply implies
                    finding a stable, comfortable seated posture for meditation.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <h3 className="text-2xl font-bold font-display text-foreground mb-6">
                Uncover the ancient practices
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/texts/yoga-sutras">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg">
                    Explore the Original Sutras{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/faith-finder">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Find Your Ideal Practice
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
