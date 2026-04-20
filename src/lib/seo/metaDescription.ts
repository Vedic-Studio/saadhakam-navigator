/**
 * Clamp and compose meta descriptions into the 120–160 character sweet spot
 * that Google and Ahrefs reward.
 *
 * Used by template-driven pages (BG shlokas, Lalita/Vishnu sahasranama names,
 * Shiva tandava verses, mantras, jyotish pages) where descriptions are built
 * from structured fields and can blow past 160 chars or fall below 120.
 */

export const META_DESCRIPTION_MIN = 120;
export const META_DESCRIPTION_MAX = 160;

/**
 * Truncate a string at the last word boundary before `max`, appending "…" when
 * truncation actually happens. Returns input unchanged when it already fits.
 */
export function clampMetaDescription(
  text: string,
  max: number = META_DESCRIPTION_MAX,
): string {
  const s = (text ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  // Leave room for the ellipsis character (counted as 1).
  const limit = max - 1;
  const sliced = s.slice(0, limit);
  const lastSpace = sliced.lastIndexOf(" ");
  const base = lastSpace > 60 ? sliced.slice(0, lastSpace) : sliced;
  return base.replace(/[.,;:–—\-\s]+$/, "") + "…";
}

/**
 * Compose a description by joining the provided parts with ". " and clamping
 * the result to `max`. Skips empty/undefined parts. Falls back to `fallback`
 * if the composition is shorter than `min`.
 */
export function composeMetaDescription(
  parts: Array<string | undefined | null>,
  options: {
    min?: number;
    max?: number;
    fallback?: string;
  } = {},
): string {
  const min = options.min ?? META_DESCRIPTION_MIN;
  const max = options.max ?? META_DESCRIPTION_MAX;
  const fallback = options.fallback ?? "";

  const cleaned = parts
    .map((p) => (p ?? "").toString().trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .map((p) => (/[.!?…]$/.test(p) ? p : p + "."));

  let joined = cleaned.join(" ").trim();
  if (joined.length < min && fallback) {
    joined = (joined ? joined + " " : "") + fallback.trim();
  }
  return clampMetaDescription(joined, max);
}
