import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yogic Path Finder: Which of the Four Yogas Fits Your Temperament? | Sadhaka",
  description:
    "A seven-question quiz mapping your temperament to one of the four classical yogic paths — Jnana (inquiry), Bhakti (devotion), Karma (action), and Raja (discipline) — based on the guna framework from Bhagavad Gita 17.2.",
  alternates: { canonical: "https://www.opensadhaka.com/faith-finder" },
  openGraph: {
    title: "Yogic Path Finder | Sadhaka",
    description:
      "Which of the four yogas fits your temperament? A short quiz based on the classical path framework from the Bhagavad Gita.",
    url: "https://www.opensadhaka.com/faith-finder",
  },
};

export default function FaithFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
