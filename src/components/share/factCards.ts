/**
 * Seed data for the Civilizational-cluster fact cards.
 *
 * Each card packages ONE surprising, citation-backed fact into a shareable unit
 * (the "win the argument" payload). Every number here is traceable to existing
 * on-page content in `src/data/evidence.ts` or `src/data/dynasties.ts` — this
 * module restates nothing new. Per the CLAUDE.md sourcing rule, only facts with
 * a backing knowledge-base claim file (kb/claims/*.md) OR a non-sensational,
 * on-page-sourced measurement ship here; `sourceNote` records the backing.
 *
 * Deferred (no seeded kb/claim yet): the Mahabharata astronomical-dating and
 * Dwarka-submersion cards. Seed kb/claims/mahabharata-astronomical-dating-claim
 * and kb/claims/dwarka-submersion-claim, then add those cards.
 *
 * No `window`/`navigator` access here; this is plain data consumed by the
 * server-rendered `FactCard`, which mounts the client `ShareButton`.
 */

import { SITE_URL } from "@/lib/seo/index";

/** Confidence label shown on the card, mirroring the evidence-page status. */
export type FactConfidence = "confirmed" | "strong" | "open";

export interface FactCard {
  /** Stable id (also the React key and the analytics-friendly handle). */
  id: string;
  /** The page this card lives on / links to (root-relative, trailingSlash:false). */
  href: string;
  /** Short, argument-winning headline (the share `title`). */
  headline: string;
  /**
   * The single extractable fact, with the load-bearing number(s). One sentence,
   * built to be quoted verbatim in a reply. Becomes the share `text`.
   */
  fact: string;
  /** 1-2 supporting lines shown under the fact on the card (not shared). */
  context: string;
  /** Confidence chip — must match the underlying evidence/site status. */
  confidence: FactConfidence;
  /** Inline citation shown on the card (journal / dating method / excavator). */
  citation: string;
  /** X/Twitter hashtags (without leading '#'). */
  hashtags: string[];
  /** Path to the branded card art under /public. */
  art: string;
  /** Alt text for the art. */
  artAlt: string;
  /**
   * Provenance note for reviewers (NOT rendered). Records which kb/claims file
   * backs the framing, or flags that no claim is seeded yet.
   */
  sourceNote: string;
}

/** Absolute share URL for a card (uses the canonical www origin). */
export function shareUrlFor(card: FactCard): string {
  return `${SITE_URL}${card.href}`;
}

export const factCards: FactCard[] = [
  // ---------------------------------------------------------------------------
  // 1. FLAGSHIP — Rakhigarhi vs Mohenjo-daro (size)
  //    Numbers: evidence.ts `rakhigarhi-largest-site` comparisonTable (350 / 250 / 150 ha).
  // ---------------------------------------------------------------------------
  {
    id: "rakhigarhi-vs-mohenjo-daro",
    href: "/sanatan-history/evidence/rakhigarhi-largest-site",
    headline: "The largest Indus city is in India, not Pakistan",
    fact: "Rakhigarhi spans about 350 hectares across seven mounds, outsizing Mohenjo-daro (~250 ha) by roughly 40 percent. The largest Indus-Saraswati city sits on the Saraswati paleochannel, not the Indus.",
    context:
      "First surveyed by Suraj Bhan (1969); excavated by Amarendra Nath (ASI) and Vasant Shinde (Deccan College). The east-of-Indus location shifts the civilization's center of gravity into India.",
    confidence: "confirmed",
    citation: "ASI & Deccan College excavations; site extent ~350 ha (7 mounds)",
    hashtags: ["Rakhigarhi", "IndusValley", "SanatanHistory"],
    art: "/assets/fact-cards/rakhigarhi-vs-mohenjo-daro.svg",
    artAlt:
      "Fact card: Rakhigarhi ~350 hectares versus Mohenjo-daro ~250 hectares.",
    sourceNote:
      "Numbers from evidence.ts rakhigarhi-largest-site comparisonTable (confirmed). No dedicated kb/claim for the SIZE fact; it is a non-sensational archaeological measurement with on-page excavation sourcing. Related seeded claim: aryan-invasion-migration-claim.md (context only).",
  },

  // ---------------------------------------------------------------------------
  // 2. Rakhigarhi DNA — backed by seeded claim aryan-invasion-migration-claim.md
  //    Numbers/framing: evidence.ts `rakhigarhi-dna` (Cell + Science, 2019).
  // ---------------------------------------------------------------------------
  {
    id: "rakhigarhi-dna",
    href: "/sanatan-history/evidence/rakhigarhi-dna",
    headline: "A 2,500 BCE Indus skeleton carried no Steppe DNA",
    fact: "Ancient DNA from a Rakhigarhi individual (~2,500 BCE), published in Cell and Science in 2019, showed no Steppe pastoralist and no Iranian-farmer ancestry. Steppe-related ancestry only spread into South Asia after about 2,300 BCE.",
    context:
      "Interpretation is debated: Shinde reads it against the invasion model; co-author Patterson notes later migration is still supported. The DNA dates the arrival; it does not, by itself, settle language or culture.",
    confidence: "confirmed",
    citation: "Shinde et al., Cell 2019; Narasimhan et al., Science 2019",
    hashtags: ["Rakhigarhi", "AncientDNA", "SanatanHistory"],
    art: "/assets/fact-cards/rakhigarhi-dna.svg",
    artAlt:
      "Fact card: 2,500 BCE Rakhigarhi DNA shows no Steppe or Iranian-farmer ancestry.",
    sourceNote:
      "Backed by seeded kb/claims/aryan-invasion-migration-claim.md (scoped sub-claims + Narasimhan 2019 primary source) and on-page evidence.ts rakhigarhi-dna (confirmed). Framing kept to the claim's verdict: AIT-as-invasion not supported, but migration model still stands.",
  },

  // ---------------------------------------------------------------------------
  // 3. Brihadratha dynasty (chosen dynasty: 322 impr, has CTR seoTitle + answerBlock).
  //    Numbers: dynasties.ts `brihadratha` answerBlock (21 kings, Rajagriha, 1700-682 BCE).
  // ---------------------------------------------------------------------------
  {
    id: "brihadratha-dynasty",
    href: "/sanatan-history/dynasties/brihadratha",
    headline: "The dynasty that bridges the Mahabharata and recorded history",
    fact: "The Puranas list 21 Brihadratha kings ruling Magadha from Rajagriha across roughly 1,700-682 BCE, from Jarasandha of the Mahabharata to Ripunjaya. The line ends where independently verifiable Indian history begins.",
    context:
      "Jarasandha, the Brihadratha antagonist defeated by Bhima, sits in the Puranic genealogy; the dynasty's fall to the Haryankas (~682 BCE) opens the era named in Buddhist and Jain records.",
    confidence: "strong",
    citation: "Puranic genealogy (21 kings, Rajagriha); Haryanka transition ~682 BCE",
    hashtags: ["Magadha", "Jarasandha", "SanatanHistory"],
    art: "/assets/fact-cards/brihadratha-dynasty.svg",
    artAlt:
      "Fact card: 21 Brihadratha kings ruled Magadha from Rajagriha, circa 1,700 to 682 BCE.",
    sourceNote:
      "Numbers from dynasties.ts brihadratha answerBlock (21 kings, Rajagriha, ~1700-682 BCE). Puranic genealogy, framed as such ('The Puranas list...'). No sensational claim involved. Chosen over suryavansha: higher impressions (322 vs 205) and already has a CTR-tuned seoTitle + answerBlock, signalling a high-value page.",
  },
];

/** Look up a card by id. */
export function getFactCardById(id: string): FactCard | undefined {
  return factCards.find((c) => c.id === id);
}

/** All cards whose `href` matches a given page path (root-relative). */
export function getFactCardByHref(href: string): FactCard | undefined {
  return factCards.find((c) => c.href === href);
}
