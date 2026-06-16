/**
 * FactCardForPage — drop-in block that renders the fact card belonging to a
 * given sanatan-history page (matched by root-relative path), plus an optional
 * "related fact" cross-link to a sibling card.
 *
 * This keeps the shared dynamic routes (`evidence/[slug]`, `sites/[slug]`,
 * `dynasties/[slug]`) data-driven: a page renders <FactCardForPage path={...} />
 * and the card appears only where one is seeded. Server component (no client
 * hooks); the embedded ShareButton is the only client island.
 *
 * The sibling link does double duty: it gives the high-bounce Dwarka page an
 * internal next-step (to the Mahabharata-dating fact, whose submersion timeline
 * it shares), turning a dead end into a path deeper into the cluster.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FactCard } from "./FactCard";
import { getFactCardByHref, getFactCardById, type FactCard as FactCardData } from "./factCards";

/**
 * Sibling map: when the card on a page has a closely-related fact, surface it
 * as a follow-on link. Keyed by card id -> sibling card id. Bidirectional pairs
 * are listed explicitly so the relationship is obvious at a glance.
 */
const SIBLING_BY_ID: Record<string, string> = {
  // Dwarka's submersion is dated in the Mahabharata-dating evidence, and vice
  // versa — link them both ways.
  "dwarka-underwater": "mahabharata-5561-bce",
  "mahabharata-5561-bce": "dwarka-underwater",
  // The two Rakhigarhi facts (size + DNA) reinforce each other.
  "rakhigarhi-vs-mohenjo-daro": "rakhigarhi-dna",
  "rakhigarhi-dna": "rakhigarhi-vs-mohenjo-daro",
};

export interface FactCardForPageProps {
  /** Root-relative path of the page this block sits on. */
  path: string;
  eyebrow?: string;
  className?: string;
}

export function FactCardForPage({ path, eyebrow, className }: FactCardForPageProps) {
  const card = getFactCardByHref(path);
  if (!card) return null;

  const sibling = resolveSibling(card);

  return (
    <div className={className}>
      <FactCard card={card} eyebrow={eyebrow} />
      {sibling && (
        <Link
          href={sibling.href}
          className="group mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-orange-500/30 hover:bg-orange-500/[0.06]"
        >
          <span className="text-sm text-muted-foreground group-hover:text-foreground">
            <span className="font-medium text-foreground/80">Related fact:</span>{" "}
            {sibling.headline}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

function resolveSibling(card: FactCardData): FactCardData | undefined {
  const siblingId = SIBLING_BY_ID[card.id];
  return siblingId ? getFactCardById(siblingId) : undefined;
}
