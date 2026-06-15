/**
 * Helpers for the Ahrefs Domain Rating (DR) tracker.
 *
 * Uses the free, keyless public DR endpoint. Everything except fetchDomainRating
 * is Node-fs-free and pure, so it can be unit-tested in vitest without I/O.
 * fetchDomainRating takes injectable fetch/sleep so it is testable without network.
 *
 * The DR license (https://ahrefs.com/legal/domain-rating-license) forbids bulk or
 * systematic querying and requires visible attribution wherever DR is displayed.
 */

export const DR_ENDPOINT = "https://api.ahrefs.com/v3/public/domain-rating-free";
export const LICENSE_URL = "https://ahrefs.com/legal/domain-rating-license";
export const ATTRIBUTION = "Domain Rating by Ahrefs (https://ahrefs.com/)";
export const USER_AGENT = "opensadhaka-dr-tracker/1.0 (+https://opensadhaka.com)";

// Stay provably within fair use — the license bans bulk/systematic harvesting.
// Comfortably covers a curated competitor set or outreach list; trips on genuine bulk.
export const FAIR_USE_LIMIT = 40;

/** Reduce a URL or host to a registrable, lowercased, www-stripped domain. */
export function normalizeDomain(input) {
  const raw = String(input ?? "").trim();
  if (!raw) throw new Error("Empty domain");
  let host;
  if (/^https?:\/\//i.test(raw)) {
    host = new URL(raw).hostname;
  } else {
    host = raw.split("/")[0];
  }
  host = host.replace(/^www\./i, "").toLowerCase();
  if (!host.includes(".") || /\s/.test(host)) {
    throw new Error(`Invalid domain: ${input}`);
  }
  return host;
}

/** Build the request URL for a target domain. */
export function buildDrUrl(target) {
  const domain = normalizeDomain(target);
  return `${DR_ENDPOINT}?target=${encodeURIComponent(domain)}&output=json`;
}

/** Extract { dr, license } from a parsed endpoint payload, or throw if malformed. */
export function parseDrResponse(payload) {
  const node = payload && payload.domain_rating;
  if (!node || typeof node.domain_rating !== "number" || Number.isNaN(node.domain_rating)) {
    throw new Error(`Malformed DR response: ${JSON.stringify(payload)}`);
  }
  return { dr: node.domain_rating, license: node.license ?? null };
}

/** Warn (return a string) when a domain list would breach the fair-use ceiling. */
export function checkFairUse(count) {
  if (count > FAIR_USE_LIMIT) {
    return `Tracking ${count} domains exceeds the fair-use ceiling of ${FAIR_USE_LIMIT}. ` +
      `The Ahrefs DR license forbids bulk/systematic querying — trim the list.`;
  }
  return null;
}

/**
 * Fetch DR for a single target. Sequential by design; retries on 429 with
 * exponential backoff. fetchImpl and sleep are injectable for testing.
 */
export async function fetchDomainRating(target, opts = {}) {
  const {
    fetchImpl = fetch,
    sleep = (ms) => new Promise((r) => setTimeout(r, ms)),
    retries = 3,
    backoffMs = 2000,
  } = opts;

  const domain = normalizeDomain(target);
  const url = buildDrUrl(domain);

  for (let attempt = 0; ; attempt++) {
    const res = await fetchImpl(url, { headers: { "User-Agent": USER_AGENT } });
    if (res.status === 429) {
      if (attempt >= retries) {
        throw new Error(`Rate limited (429) for ${domain} after ${retries} retries`);
      }
      await sleep(backoffMs * 2 ** attempt);
      continue;
    }
    if (!res.ok) {
      throw new Error(`DR request failed for ${domain}: HTTP ${res.status}`);
    }
    const { dr, license } = parseDrResponse(await res.json());
    return { target, domain, dr, license };
  }
}

/**
 * Append a dated snapshot to the history, replacing any existing snapshot for the
 * same date. Returns a new history object; never mutates the input.
 */
export function mergeHistory(history, snapshot) {
  const existing = history && Array.isArray(history.snapshots) ? history.snapshots : [];
  const snapshots = existing
    .filter((s) => s.date !== snapshot.date)
    .concat({ date: snapshot.date, ratings: snapshot.ratings })
    .sort((a, b) => a.date.localeCompare(b.date));
  return { schema: 1, attribution: ATTRIBUTION, license: LICENSE_URL, snapshots };
}

/**
 * Compare the latest snapshot against the previous one. Returns one row per domain
 * in the latest snapshot, sorted by current DR descending. delta is null when the
 * domain is new (no prior reading).
 */
export function computeDeltas(history) {
  const snaps = (history && history.snapshots) || [];
  if (snaps.length === 0) return [];
  const latest = snaps[snaps.length - 1];
  const prev = snaps.length > 1 ? snaps[snaps.length - 2] : null;

  return Object.keys(latest.ratings)
    .map((domain) => {
      const current = latest.ratings[domain];
      const previous = prev && domain in prev.ratings ? prev.ratings[domain] : null;
      const delta = previous === null ? null : Math.round((current - previous) * 10) / 10;
      return { domain, current, previous, delta };
    })
    .sort((a, b) => b.current - a.current);
}

/** Render a snapshot report as markdown, including required Ahrefs attribution. */
export function renderSnapshotMarkdown({ date, ownDomain, deltas }) {
  const rows = deltas.map((d) => {
    const name = d.domain === ownDomain ? `**${d.domain}**` : d.domain;
    const delta = d.delta === null ? "—" : d.delta > 0 ? `+${d.delta}` : `${d.delta}`;
    return `| ${name} | ${d.current} | ${delta} |`;
  });
  return [
    `# Domain Rating Snapshot — ${date}`,
    "",
    `*${ATTRIBUTION}*`,
    "",
    "| Domain | DR | Δ vs last run |",
    "| --- | ---: | ---: |",
    ...rows,
    "",
  ].join("\n");
}
