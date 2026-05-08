/**
 * Canonical priority URL list for the Google Indexing API submitter.
 *
 * Source of truth: the 14 pages whose titles/metas were rewritten in
 * PR #20 (CTR surgery — Phase 1 of the SEO/LLM ramp-up plan).
 *
 * Re-run `node scripts/google-indexing-submit.mjs --priority` after any
 * batch change to these pages to nudge Google for a faster recrawl.
 */

const ORIGIN = "https://www.opensadhaka.com";

export const CTR_SURGERY_PRIORITY_URLS = [
  // Top-5 lost-clicks
  `${ORIGIN}/`,
  `${ORIGIN}/what-is-maya`,
  `${ORIGIN}/advaita-vedanta-explained`,
  `${ORIGIN}/compare/ashtavakra-gita-vs-bhagavad-gita`,
  `${ORIGIN}/compare`,
  // Sanskrit lexicon depth
  `${ORIGIN}/learn/sanskrit/karma`,
  `${ORIGIN}/learn/sanskrit/moksha`,
  `${ORIGIN}/learn/sanskrit/nirvana`,
  // Compare cluster
  `${ORIGIN}/compare/atman-vs-brahman`,
  // Hubs
  `${ORIGIN}/philosophies`,
  // Seeker how-tos
  `${ORIGIN}/how-to-start-japa`,
  `${ORIGIN}/daily-spiritual-routine-beginners`,
  `${ORIGIN}/can-i-chant-a-mantra-without-initiation`,
  `${ORIGIN}/how-karma-dharma-work`,
];
