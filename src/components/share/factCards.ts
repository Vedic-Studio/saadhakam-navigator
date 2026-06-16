/**
 * Seed data for the Civilizational-cluster fact cards.
 *
 * Each card packages ONE surprising, citation-backed fact into a shareable unit
 * (the "win the argument" payload). Every number here is traceable to existing
 * on-page content in `src/data/evidence.ts`, `src/data/sites.ts`, or
 * `src/data/dynasties.ts` — this module restates nothing new. Where the popular
 * framing is a contested/sensational claim, `sourceNote` records the scope and
 * the backing knowledge-base claim file (kb/claims/*.md) per the CLAUDE.md
 * sourcing rule.
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
  /** Path to the branded card art under /public (SVG). */
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
  // 3. Mahabharata dating — Oak's 5561 BCE proposal. NO seeded kb/claim.
  //    Status on-page is "strong" (a proposal), not "confirmed". Frame as such.
  // ---------------------------------------------------------------------------
  {
    id: "mahabharata-5561-bce",
    href: "/sanatan-history/evidence/mb-5561",
    headline: "One proposed Mahabharata date satisfies 215+ sky positions",
    fact: "Nilesh Oak's proposal dates the Mahabharata war to 16 October 5,561 BCE by requiring that 215+ astronomical references in the text all hold simultaneously. Critics typically test 3-4 references; the method demands the full set.",
    context:
      "This is an archaeoastronomical proposal, not a settled date. Its main open challenge is the lack of matching material culture at 5,561 BCE. You can re-run the sky in Stellarium yourself.",
    confidence: "strong",
    citation: "Oak, archaeoastronomical dating (215+ references); verify in Stellarium",
    hashtags: ["Mahabharata", "Archaeoastronomy", "SanatanHistory"],
    art: "/assets/fact-cards/mahabharata-5561-bce.svg",
    artAlt:
      "Fact card: a proposed Mahabharata war date of 5,561 BCE from 215+ astronomical references.",
    sourceNote:
      "NO seeded kb/claim for Mahabharata astronomical dating — FLAGGED as a gap. All numbers (5,561 BCE, 215+ references, 16 October) are taken verbatim from on-page evidence.ts mb-5561 (status: strong). Framed explicitly as a 'proposal' with its archaeological-gap caveat on the card; nothing fabricated.",
  },

  // ---------------------------------------------------------------------------
  // 4. Dwarka (underwater) — REPAIR target. Links the mb-5561 sibling fact.
  //    Numbers: sites.ts `dwarka-underwater` (S.R. Rao, 120+ anchors, 12 campaigns).
  // ---------------------------------------------------------------------------
  {
    id: "dwarka-underwater",
    href: "/sanatan-history/sites/dwarka-underwater",
    headline: "A submerged city off Gujarat yielded 120+ stone anchors",
    fact: "Off the Gujarat coast, S.R. Rao's marine teams ran 12 campaigns (1983-1990) and found submerged stone structures, fort walls, and over 120 stone anchors, evidence of a major ancient port. Fort-wall thermoluminescence dates run to the 16th century BCE.",
    context:
      "Whether these structures are the Dwarka of the Mahabharata, submerged by post-glacial sea-level rise, remains an active research question. The submersion timeline is linked to the Mahabharata-dating evidence.",
    confidence: "open",
    citation: "S.R. Rao, National Institute of Oceanography; TL dating ~16th c. BCE",
    hashtags: ["Dwarka", "MarineArchaeology", "SanatanHistory"],
    art: "/assets/fact-cards/dwarka-underwater.svg",
    artAlt:
      "Fact card: 120-plus stone anchors and submerged structures found off Dwarka, Gujarat.",
    sourceNote:
      "Numbers from sites.ts dwarka-underwater (S.R. Rao, 12 campaigns, 120+ anchors, TL 16th c. BCE). No dedicated kb/claim; on-page sourced. Confidence set to 'open' to match the page's 'active research question' framing — deliberately NOT asserting it is Krishna's Dwarka.",
  },

  // ---------------------------------------------------------------------------
  // 5. Brihadratha dynasty (the chosen dynasty: 322 impr, has CTR seoTitle + answerBlock).
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
