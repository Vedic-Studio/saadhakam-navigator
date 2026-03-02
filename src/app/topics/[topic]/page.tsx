import { Metadata } from "next";
import { notFound } from "next/navigation";
import { topics, getTopicBySlug } from "@/data/topics";
import { getPracticeBySlug } from "@/data/practices";
import { getTraditionsBySlugs } from "@/data/traditions";
import Link from "next/link";

export async function generateStaticParams() {
  return topics.map((topic) => ({
    topic: topic.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { topic: string };
}): Promise<Metadata> {
  const topic = getTopicBySlug(params.topic);

  if (!topic) {
    return { title: "Topic Not Found" };
  }

  return {
    title: `${topic.name} – Essential Practices, Philosophy & Traditions`,
    description: `Explore the profound topic of ${topic.name} in Sanatan Dharma. ${topic.summary}`,
    alternates: {
      canonical: `https://opensadhaka.com/topics/${topic.slug}`,
    },
  };
}

export default function TopicHubPage({
  params,
}: {
  params: { topic: string };
}) {
  const topic = getTopicBySlug(params.topic);

  if (!topic) {
    notFound();
  }

  // Resolve linked identities
  const recommendedPractices = topic.recommendedPractices
    .map((p) => getPracticeBySlug(p))
    .filter((p) => !!p);

  // getTraditionsBySlugs function doesn't exist out of box, so stubbing here.
  // Usually we would import all traditions and filter.
  const traditions = require("@/data/traditions").traditions.filter((t: any) =>
    topic.recommendedTraditions.includes(t.slug),
  );

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Breadcrumbs Component Placeholder */}
      <nav className="text-sm mb-8 text-neutral-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{topic.name}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {topic.name}
        </h1>
        <p className="text-xl text-neutral-600 leading-relaxed mb-8">
          {topic.summary}
        </p>

        <div className="prose prose-lg prose-neutral max-w-none">
          <p>{topic.content}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        {/* Recommended Practices */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Core Practices
          </h2>
          <div className="grid gap-4">
            {recommendedPractices.map(
              (practice) =>
                practice && (
                  <Link
                    href={`/practices/${practice.slug}`}
                    key={practice.slug}
                    className="group p-6 rounded-2xl border border-neutral-200 hover:border-primary hover:shadow-sm transition-all bg-white"
                  >
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {practice.title}{" "}
                      <span className="text-neutral-500 font-normal ml-2">
                        ({practice.sanskritName})
                      </span>
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {practice.summary}
                    </p>
                  </Link>
                ),
            )}
          </div>
        </section>

        {/* Recommended Traditions */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Associated Traditions</h2>
          <div className="grid gap-4">
            {traditions.map((tradition: any) => (
              <Link
                href={`/traditions/${tradition.slug}`}
                key={tradition.slug}
                className="group p-6 rounded-2xl border border-neutral-200 hover:border-primary hover:shadow-sm transition-all bg-white"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {tradition.name}
                </h3>
                <p className="text-neutral-600 text-sm line-clamp-2">
                  {tradition.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="mt-20 p-10 bg-neutral-900 rounded-3xl text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Discover Your Unique Path</h2>
        <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
          Take the Faith Finder quiz to discover which practices within{" "}
          {topic.name.toLowerCase()} align best with your current lifestyle and
          spiritual goals.
        </p>
        <Link
          href="/faith-finder"
          className="inline-block bg-white text-neutral-900 font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform"
        >
          Start the Quiz
        </Link>
      </section>
    </div>
  );
}
