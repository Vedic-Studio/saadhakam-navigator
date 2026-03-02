import { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons } from "@/data/comparisons";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comp = comparisons.find((c) => c.slug === params.slug);

  if (!comp) {
    return { title: "Not Found" };
  }

  return {
    title: `${comp.title} | Sadhaka Comparisons`,
    description: comp.metaDescription,
  };
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({
    slug: c.slug,
  }));
}

export default function ComparisonPage({ params }: Props) {
  const comp = comparisons.find((c) => c.slug === params.slug);

  if (!comp) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the main difference between ${comp.entityA} and ${comp.entityB}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: comp.tldr || `The comparison between ${comp.entityA} and ${comp.entityB} highlights key differences in their philosophical approach and practical application.`,
        },
      },
      {
        "@type": "Question",
        name: `Which is better: ${comp.entityA} or ${comp.entityB}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Neither is objectively "better." Both ${comp.entityA} and ${comp.entityB} offer valid, time-tested paths. The right choice depends entirely on your personal psychological temperament, current life stage, and spiritual goals.`,
        },
      },
      {
        "@type": "Question",
        name: `Are ${comp.entityA} and ${comp.entityB} from the same tradition?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `While they often interact within the broader context of Eastern philosophy, ${comp.entityA} and ${comp.entityB} represent distinct approaches or conceptual frameworks.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <article className="container-padding max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare" },
              { label: comp.title, href: `/compare/${comp.slug}` },
            ]}
          />

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-xs font-semibold uppercase tracking-wider mb-6">
              {comp.category}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {comp.title}
            </h1>

            {comp.tldr && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-10">
                <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  TL;DR Summary
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {comp.tldr}
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {comp.entityA}
              </h2>
              <div className="w-12 h-1 bg-primary/50 mx-auto rounded-full mb-6" />
            </div>
            <div className="flex justify-center items-center text-muted-foreground md:hidden uppercase tracking-widest font-bold font-display">
              vs
            </div>
            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {comp.entityB}
              </h2>
              <div className="w-12 h-1 bg-secondary/50 mx-auto rounded-full mb-6" />
            </div>
          </div>

          <div
            className="prose prose-invert prose-orange max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground mb-20 dangerouslySetInnerHTML"
            dangerouslySetInnerHTML={{
              __html:
                comp.content ||
                "<p>We are currently gathering detailed insights for this comparison. Please check back later, or start your journey to explore more.</p>",
            }}
          />

          <div className="mt-24 mb-16 pt-16 border-t border-border">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                More in <span className="text-primary">{comp.category}</span>
              </h2>
              <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 group">
                View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisons
                .filter((c) => c.category === comp.category && c.slug !== comp.slug)
                .slice(0, 3)
                .map((item) => (
                  <Link key={item.slug} href={`/compare/${item.slug}`} className="group h-full">
                    <div className="p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all flex flex-col h-full shadow-sm hover:shadow-primary/5">
                      <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-auto">
                        {item.tldr}
                      </p>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/40 to-background rounded-3xl border border-white/10 p-10 text-center relative overflow-hidden">

            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <h3 className="text-3xl font-display font-bold mb-4">
              Ready to find your personal path?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Regardless of the path you choose, the goal remains the same. Use
              our Faith Finder to discover the philosophies and practices that
              align with your unique self.
            </p>
            <Link href="/faith-finder">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-full text-lg shadow-lg shadow-orange-900/20 transition-transform hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
