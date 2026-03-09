import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
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
  title: "Bhagavad Gita Complete Guide | Summaries, Key Teachings & Philosophy",
  description:
    "The ultimate guide to the Bhagavad Gita. Explore chapter summaries, core philosophical concepts like Karma and Dharma, and practical applications for modern life.",
  keywords: [
    "bhagavad gita",
    "bhagavad gita guide",
    "bhagavad gita summary",
    "arjuna",
    "krishna",
    "karma yoga",
    "bhakti yoga",
    "jnana yoga",
    "sanatan dharma",
  ],
  alternates: {
    canonical: "https://opensadhaka.com/bhagavad-gita-complete-guide",
  },
  openGraph: {
    title: "Bhagavad Gita Complete Guide | Sadhaka",
    description:
      "Explore the profound teachings of the Bhagavad Gita, chapter by chapter.",
    url: "https://opensadhaka.com/bhagavad-gita-complete-guide",
  },
};

export default function BhagavadGitaGuidePage() {
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
        name: "Bhagavad Gita Complete Guide",
        item: "https://opensadhaka.com/bhagavad-gita-complete-guide",
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Bhagavad Gita Complete Guide | Summaries, Key Teachings & Philosophy",
    decription:
      "The ultimate guide to the Bhagavad Gita. Explore chapter summaries, core philosophical concepts like Karma and Dharma, and practical applications for modern life.",
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
        name: "How many chapters are in the Bhagavad Gita?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Bhagavad Gita consists of 18 chapters and exactly 700 shlokas (verses). It is a dialogue between Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra.",
        },
      },
      {
        "@type": "Question",
        name: "What is the core message of the Bhagavad Gita?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The central message is to perform one's righteous duty (Dharma) without attachment to the results or fruits of those actions (Nishkama Karma). Through selfless action, devotion, or knowledge, one can attain spiritual liberation (Moksha).",
        },
      },
      {
        "@type": "Question",
        name: "What are the three main paths (Yogas) described in the Gita?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Gita outlines Karma Yoga (the path of selfless action), Jnana Yoga (the path of knowledge), and Bhakti Yoga (the path of loving devotion to the Divine) as methods to attain spiritual union and liberation.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <ContentPageTracker slug="bhagavad-gita-complete-guide" pillar="sacred-texts" />
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
              <span className="text-secondary">Bhagavad Gita</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Discover the wisdom of the ultimate spiritual dialogue. Your
              comprehensive resource for chapters, themes, and practical life
              applications.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Intro Section */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                The Bhagavad Gita, often referred to simply as the Gita, is a
                700-verse Hindu scripture that is part of the epic Mahabharata.
                Dated to the second half of the first millennium BCE, it is
                considered one of the holy scriptures of Sanatan Dharma.
              </p>
              <p>
                Rather than a passive text, the Gita is an intense dialogue
                taking place on a battlefield—a profound metaphor for the
                ethical and moral struggles of human life. At the brink of the
                Kurukshetra war, Prince Arjuna is overcome with despair
                regarding the violence and death his war against his own kindred
                will cause. He turns to his charioteer and guide, Lord Krishna,
                for answers. Check out our{" "}
                <TrackedLink
                  href="/what-is-dharma"
                  eventLabel="gita_guide:intro:dharma"
                  trackPathName="dharma"
                  className="text-primary font-medium hover:underline"
                >
                  guide on Dharma
                </TrackedLink>{" "}
                for more context.
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
                      Dharma (Duty)
                    </h3>
                    <p className="text-muted-foreground">
                      Krishna urges Arjuna to fulfill his Kshatriya (warrior)
                      duty to uphold Dharma in the face of tyranny, explaining
                      that failing to act is a violation of cosmic order.
                    </p>
                    <TrackedLink
                      href="/what-is-dharma"
                      eventLabel="gita_guide:theme:dharma"
                      trackPathName="dharma"
                      className="text-sm text-primary font-medium mt-3 inline-block hover:underline"
                    >
                      Learn more about Dharma →
                    </TrackedLink>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        2
                      </span>
                      Karma Yoga
                    </h3>
                    <p className="text-muted-foreground">
                      The Yoga of Action. Acting according to one's duty without
                      being attached to the fruits or results of those actions
                      (Nishkama Karma).
                    </p>
                    <TrackedLink
                      href="/what-is-karma"
                      eventLabel="gita_guide:theme:karma"
                      trackPathName="karma"
                      className="text-sm text-primary font-medium mt-3 inline-block hover:underline"
                    >
                      Learn more about Karma →
                    </TrackedLink>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        3
                      </span>
                      Bhakti Yoga
                    </h3>
                    <p className="text-muted-foreground">
                      The Yoga of Devotion. The highest path of unconditional
                      love and surrender to the Supreme Divine, seeing God
                      within all beings.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-sans text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        4
                      </span>
                      Jnana Yoga
                    </h3>
                    <p className="text-muted-foreground">
                      The Yoga of Knowledge. Realizing the eternal nature of the{" "}
                      <TrackedLink
                        href="/what-is-atman"
                        eventLabel="gita_guide:theme:atman"
                        trackPathName="atman"
                        className="text-primary hover:underline"
                      >
                        Atman (Soul)
                      </TrackedLink>{" "}
                      and its oneness with{" "}
                      <TrackedLink
                        href="/what-is-brahman"
                        eventLabel="gita_guide:theme:brahman"
                        trackPathName="brahman"
                        className="text-primary hover:underline"
                      >
                        Brahman
                      </TrackedLink>
                      .
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
                    The 18 Chapters
                  </h2>
                </div>
                <p className="text-muted-foreground mt-2">
                  A high-level summary of the journey through the Gita.
                </p>
              </div>
              <div className="divide-y divide-border/50">
                {/* Normally we'd map over a data file, but for the guide we outline the thirds */}
                <div className="p-6 sm:p-8 hover:bg-muted/10 transition-colors">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    First Six Chapters: Karma Yoga
                  </h3>
                  <p className="text-muted-foreground">
                    Focuses primarily on the nature of action, the eternity of
                    the soul (Atman), and the introduction of selfless service.
                    Arjuna faces his grief, and Krishna explains that the body
                    is temporary but the soul is eternal.
                  </p>
                </div>
                <div className="p-6 sm:p-8 hover:bg-muted/10 transition-colors">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Middle Six Chapters: Bhakti Yoga
                  </h3>
                  <p className="text-muted-foreground">
                    Shifts to the grandeur of God (Ishvara). Krishna reveals his
                    universal, magnificent form (Vishvarupa) in Chapter 11. It
                    establishes devotion and surrender as the most direct path
                    to liberation.
                  </p>
                </div>
                <div className="p-6 sm:p-8 hover:bg-muted/10 transition-colors">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Last Six Chapters: Jnana Yoga
                  </h3>
                  <p className="text-muted-foreground">
                    Focuses on philosophical knowledge, describing the three
                    Gunas (modes of nature: Sattva, Rajas, Tamas), the
                    difference between the material world and pure
                    consciousness, and the culmination of surrender.
                  </p>
                </div>
              </div>
            </div>

            {/* Practical Application */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl font-display font-bold text-foreground">
                  Practical Application Today
                </h2>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>
                  The brilliance of the Gita is its accessibility. You don't
                  need to be a monk to practice its teachings. It is
                  specifically designed for the householder—the person living in
                  the world, with responsibilities, facing difficult choices.
                </p>
                <ul>
                  <li>
                    <strong>Focus on the Effort, Not the Outcome:</strong>{" "}
                    Anxiety comes from worrying about results. Focus intensely
                    on doing your best right now.
                  </li>
                  <li>
                    <strong>Find Your Duty:</strong> Align your career and life
                    choices with your natural inclinations and principles.
                  </li>
                  <li>
                    <strong>Maintain Equanimity:</strong> Treat success and
                    failure, heat and cold, pleasure and pain with an even mind.
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
                    How many chapters and verses are in the Bhagavad Gita?
                  </h3>
                  <p className="text-muted-foreground">
                    The Gita consists of 18 chapters and exactly 700 verses
                    (shlokas). It makes up chapters 23 to 40 of the Bhishma
                    Parva book of the Mahabharata epic.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    What is the core message of the Bhagavad Gita?
                  </h3>
                  <p className="text-muted-foreground">
                    The central message is to perform your righteous duty
                    (Dharma) with discipline and dedication, without acting out
                    of attachment to the fruits or rewards of that labor. This
                    path of selfless action is called Karma Yoga.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Did the battle of Kurukshetra really happen?
                  </h3>
                  <p className="text-muted-foreground">
                    While it is rooted in historical events of ancient India,
                    spiritual masters emphasize that the true battlefield is
                    psychological—it represents the inner war between our divine
                    nature (righteousness, kindness) and our lower nature (ego,
                    greed, anger).
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <h3 className="text-2xl font-bold font-display text-foreground mb-6">
                Ready to read the sacred text?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <TrackedLink
                  href="/texts/bhagavad-gita"
                  eventLabel="gita_guide:cta:texts"
                  trackPathName="bhagavad-gita"
                >
                  <Button size="lg" className="w-full sm:w-auto shadow-lg">
                    Explore Chapters & Shlokas{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </TrackedLink>
                <TrackedLink
                  href="/faith-finder"
                  eventLabel="gita_guide:cta:faith-finder"
                  trackPathName="sacred-texts"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Take the Spiritual Path Quiz
                  </Button>
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
