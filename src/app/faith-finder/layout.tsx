import type { Metadata } from "next";
import { buildToolSchemas, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Faith Finder: A Four-Yoga Orientation Quiz | Sadhaka",
  description:
    "A seven-question interpretive quiz that maps temperament and practice preference to four classical yogic emphases: Jnana, Bhakti, Karma, and Raja. Grounded in the Gita's discussion of shraddha and temperament in 17.2.",
  alternates: { canonical: "https://www.opensadhaka.com/faith-finder" },
  openGraph: {
    title: "Faith Finder: A Four-Yoga Orientation Quiz | Sadhaka",
    description:
      "A short, grounded orientation quiz based on the four yogas and the Gita's discussion of temperament.",
    url: "https://www.opensadhaka.com/faith-finder",
  },
};

const toolSchemas = buildToolSchemas({
  name: "Faith Finder",
  description: "A seven-question interpretive quiz that maps temperament and practice preference to four classical yogic emphases: Jnana, Bhakti, Karma, and Raja.",
  path: "/faith-finder",
  category: "LifestyleApplication",
});
const breadcrumbSchema = buildBreadcrumbSchema([
  { label: "Home", href: "/" },
  { label: "Faith Finder", href: "/faith-finder" },
]);

export default function FaithFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchemas.softwareApplication) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchemas.webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
