import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker } from "@/components/ContentAnalytics";
import { PathDetailClient } from "@/components/path/PathDetailClient";
import { getLearningPathBySlug, learningPaths } from "@/components/path/paths";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  buildUrl,
} from "@/lib/seo";

export function generateStaticParams() {
  return learningPaths.map((path) => ({ slug: path.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPathBySlug(slug);
  if (!path) {
    return { title: "Learning Path Not Found" };
  }
  return {
    title: `${path.title} | Learning Path | Sadhaka`,
    description: path.summary,
    alternates: { canonical: `https://www.opensadhaka.com/path/${path.id}` },
    openGraph: {
      title: `${path.title} | Learning Path`,
      description: path.summary,
      url: `https://www.opensadhaka.com/path/${path.id}`,
    },
  };
}

export default async function PathDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = getLearningPathBySlug(slug);

  if (!path) {
    notFound();
  }

  const pagePath = `/path/${path.id}`;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learning Paths", href: "/path" },
    { label: path.title, href: pagePath },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = buildWebPageSchema({
    name: path.title,
    description: path.summary,
    url: buildUrl(pagePath),
    breadcrumbItems,
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker
        slug={`learning-path-${path.id}`}
        pillar="learning-paths"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-3xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mb-10 mt-8">
            <p className="text-sm font-medium text-primary mb-3">
              {path.steps.length}-step path &middot; {path.estimate}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-5 tracking-tighter leading-[0.98]">
              {path.title}
            </h1>
            <p
              data-speakable
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {path.summary}
            </p>
            <p className="mt-3 text-sm text-muted-foreground/80">
              {path.audience}
            </p>
          </header>

          <PathDetailClient path={path} />

          <div className="mt-12 border-t border-border/40 pt-8 text-sm">
            <Link
              href="/path"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              &larr; All learning paths
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
