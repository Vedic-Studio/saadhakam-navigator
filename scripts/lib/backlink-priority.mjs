/**
 * Pure scoring for backlink outreach prioritization. Node-fs-free for vitest.
 *
 * The score reflects real authority ROI, not vanity DR: a dofollow link from a
 * topically relevant site beats a high-DR nofollow profile. That is why DR is
 * multiplied by topical relevance (1-5) and a link-type weight, rather than used
 * on its own.
 */

// Link-type weight: nofollow passes ~no link equity (brand/AI value only),
// unconfirmed is hedged, dofollow is full.
export const LINK_WEIGHT = { dofollow: 1.0, unconfirmed: 0.6, nofollow: 0.3 };
export const DEFAULT_LINK_WEIGHT = 0.6;

// Statuses that mean the link is already won — excluded from the outreach queue.
export const DONE_STATUSES = new Set(["submitted", "verified", "live"]);

export function linkWeight(linkType) {
  return LINK_WEIGHT[linkType] ?? DEFAULT_LINK_WEIGHT;
}

/** Outreach score: DR x relevance x link-type weight. Higher = pursue sooner. */
export function scoreTarget(target) {
  const dr = typeof target.dr === "number" ? target.dr : 0;
  const relevance = typeof target.relevance === "number" ? target.relevance : 1;
  return Math.round(dr * relevance * linkWeight(target.link_type));
}

/**
 * Rank targets by score descending. Ties break toward the authority tier, then
 * toward lower manual priority. Done targets are excluded unless includeDone.
 * Returns shallow copies with a `score` field added.
 */
export function rankTargets(targets, { includeDone = false } = {}) {
  const tierRank = { authority: 0, foundational: 1 };
  return targets
    .filter((t) => includeDone || !DONE_STATUSES.has(t.status))
    .map((t) => ({ ...t, score: scoreTarget(t) }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        (tierRank[a.tier] ?? 9) - (tierRank[b.tier] ?? 9) ||
        (a.priority ?? 99) - (b.priority ?? 99),
    );
}

/** Bucket targets into { authority, foundational, untagged }. */
export function groupByTier(targets) {
  const groups = { authority: [], foundational: [], untagged: [] };
  for (const t of targets) {
    const key =
      t.tier === "authority" ? "authority" : t.tier === "foundational" ? "foundational" : "untagged";
    groups[key].push(t);
  }
  return groups;
}
