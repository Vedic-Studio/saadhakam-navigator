import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { practices } from "@/data/practices";
import {
  buildBreadcrumbSchema,
  buildCollectionSchema,
  buildUrl,
} from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Spiritual Practices of Sanatan Dharma | Sadhaka",
  description:
    "A practical guide to the core spiritual practices of Sanatan Dharma, from japa and dhyana to puja, seva, pranayama, and fasting, with clear steps for beginning each one.",
  keywords: [
    "spiritual practices",
    "japa",
    "dhyana",
    "kirtan",
    "puja",
    "seva",
    "pranayama",
    "sadhana",
    "sanatan dharma",
  ],
  alternates: { canonical: "https://www.opensadhaka.com/practices" },
  openGraph: {
    title: "Spiritual Practices of Sanatan Dharma | Sadhaka",
    description:
      "A practical guide to the core spiritual practices of Sanatan Dharma, from japa and dhyana to puja, seva, pranayama, and fasting, with clear steps for beginning each one.",
    url: "https://www.opensadhaka.com/practices",
  },
};

export default function PracticesPage() {
  const pageUrl = buildUrl("/practices");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Practices", href: "/practices" },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const collectionSchema = buildCollectionSchema({
    name: "Spiritual Practices of Sanatan Dharma",
    description:
      "Core spiritual practices of Sanatan Dharma with guidance on what each one is, who it suits, and how to begin.",
    url: pageUrl,
    items: practices.map((practice) => ({
      name: practice.title,
      url: buildUrl(`/practices/${practice.slug}`),
      description: practice.summary,
    })),
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug="practices" pillar="practices" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="text-center mb-16 mt-8 px-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
              Practice
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
              Spiritual Practices
            </h1>
            <p
              data-speakable
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
            >
              The disciplines through which seekers in Sanatan Dharma turn
              philosophy into lived experience. Each practice here explains what
              it is, who it suits, and how to begin, so you can choose a path
              that fits your temperament and stage of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practices.map((practice) => (
              <Card
                key={practice.slug}
                className="bg-card border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/10 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {practice.title}
                    </h2>
                    <span className="font-sanskrit text-lg text-primary/80">
                      {practice.sanskritName}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {practice.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {practice.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] uppercase tracking-wider opacity-70 border-border/40"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <TrackedLink
                    href={`/practices/${practice.slug}`}
                    eventLabel={`practices_index:${practice.slug}`}
                    trackPathName={practice.slug}
                    className="w-full"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-between hover:text-primary"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </TrackedLink>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
