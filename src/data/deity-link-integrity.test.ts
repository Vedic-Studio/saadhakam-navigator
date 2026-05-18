import { describe, expect, it } from "vitest";
import { deities } from "@/data/deities";
import { mantras } from "@/data/mantras";
import { traditions } from "@/data/traditions";
import { STOTRA_SLUGS } from "@/lib/stotras";

/**
 * Deity → mantra / tradition / stotra cross-reference integrity.
 *
 * `src/app/deities/[slug]/page.tsx` renders internal links for each entry in
 * `deity.mantras`, `deity.associatedStotras`, and `deity.associatedTraditions`.
 * Ahrefs flagged ~20 of those links as broken because many target slugs
 * aren't seeded yet in `src/data/mantras.ts` / `src/data/traditions.ts` /
 * `content/stotras/`. The page now filters those out at render time so we
 * don't ship broken hrefs.
 *
 * This test pins the *current* orphan list so:
 *   (a) we have an explicit, reviewable backlog of slugs to seed, and
 *   (b) if a future deity record adds a new orphan ref without seeding the
 *       target, the test fails and forces a conscious decision (seed it, or
 *       add it to the deferred list here).
 *
 * To resolve a deferred entry: seed the data, then remove the slug from the
 * matching `EXPECTED_DEFERRED_*` set.
 */

// ── Currently-deferred backlog ────────────────────────────────────────────────
// Snapshot of orphan refs as of 2026-05-19. Each entry is a slug referenced
// by deity data but not yet present in the corresponding data file / content
// directory. The deity page's defensive filter drops these from the rendered
// output; this test is the source of truth for which orphans we currently
// tolerate.

const EXPECTED_DEFERRED_MANTRAS: ReadonlySet<string> = new Set([
  "bagalamukhi-mantra",
  "bala-mantra",
  "batuk-bhairav-mantra",
  "bhairavi-mantra",
  "chhinnamasta-mantra",
  "dhumavati-mantra",
  "hreem-bija-mantra",
  "matangi-mantra",
  "om-hreem-streem-hum-phat",
  "panchadashi-mantra",
  "pitambara-mantra",
  "shodashi-mantra",
  "tripura-bhairavi-mantra",
]);

const EXPECTED_DEFERRED_TRADITIONS: ReadonlySet<string> = new Set([
  "dharmic-ethics",
  "jyotisha",
  "kaumara",
  "nath",
  "rama-bhakti",
  "shri-vidya",
  "vedic",
  "yogic",
]);

const EXPECTED_DEFERRED_STOTRAS: ReadonlySet<string> = new Set<string>([
  // Empty today — all referenced stotra slugs resolve to a JSON file in
  // content/stotras/. Add slugs here only if a deity legitimately needs to
  // reference a stotra that hasn't been seeded yet.
]);

// ── Helpers ───────────────────────────────────────────────────────────────────

function mantraSlugSet(): Set<string> {
  return new Set(mantras.map((m) => m.slug));
}

function traditionSlugSet(): Set<string> {
  return new Set(traditions.map((t) => t.slug));
}

function stotraSlugSet(): Set<string> {
  return new Set<string>(STOTRA_SLUGS);
}

function computeOrphans(
  pick: (deity: (typeof deities)[number]) => readonly string[],
  knownSlugs: Set<string>,
): Set<string> {
  const orphans = new Set<string>();
  for (const deity of deities) {
    for (const slug of pick(deity)) {
      if (!knownSlugs.has(slug)) orphans.add(slug);
    }
  }
  return orphans;
}

function setDiff(a: Set<string>, b: ReadonlySet<string>): string[] {
  return [...a].filter((x) => !b.has(x)).sort();
}

// ── Assertions ────────────────────────────────────────────────────────────────

describe("deity → mantra link integrity", () => {
  it("every referenced mantra either resolves or is on the deferred list", () => {
    const known = mantraSlugSet();
    const orphans = computeOrphans((d) => d.mantras, known);
    const unexpected = setDiff(orphans, EXPECTED_DEFERRED_MANTRAS);
    expect(
      unexpected,
      `New orphan mantra refs detected. Either seed these in src/data/mantras.ts or add them to EXPECTED_DEFERRED_MANTRAS:\n${unexpected.join("\n")}`,
    ).toEqual([]);
  });

  it("EXPECTED_DEFERRED_MANTRAS list is exact (no stale entries)", () => {
    const known = mantraSlugSet();
    const orphans = computeOrphans((d) => d.mantras, known);
    const stale = setDiff(EXPECTED_DEFERRED_MANTRAS, orphans);
    expect(
      stale,
      `EXPECTED_DEFERRED_MANTRAS contains slugs that are no longer orphans — remove them:\n${stale.join("\n")}`,
    ).toEqual([]);
  });
});

describe("deity → tradition link integrity", () => {
  it("every referenced tradition either resolves or is on the deferred list", () => {
    const known = traditionSlugSet();
    const orphans = computeOrphans((d) => d.associatedTraditions, known);
    const unexpected = setDiff(orphans, EXPECTED_DEFERRED_TRADITIONS);
    expect(
      unexpected,
      `New orphan tradition refs detected. Either seed these in src/data/traditions.ts or add them to EXPECTED_DEFERRED_TRADITIONS:\n${unexpected.join("\n")}`,
    ).toEqual([]);
  });

  it("EXPECTED_DEFERRED_TRADITIONS list is exact (no stale entries)", () => {
    const known = traditionSlugSet();
    const orphans = computeOrphans((d) => d.associatedTraditions, known);
    const stale = setDiff(EXPECTED_DEFERRED_TRADITIONS, orphans);
    expect(
      stale,
      `EXPECTED_DEFERRED_TRADITIONS contains slugs that are no longer orphans — remove them:\n${stale.join("\n")}`,
    ).toEqual([]);
  });
});

describe("deity → stotra link integrity", () => {
  it("every referenced stotra either resolves or is on the deferred list", () => {
    const known = stotraSlugSet();
    const orphans = computeOrphans((d) => d.associatedStotras, known);
    const unexpected = setDiff(orphans, EXPECTED_DEFERRED_STOTRAS);
    expect(
      unexpected,
      `New orphan stotra refs detected. Either seed a JSON file in content/stotras/ + route under src/app/stotras/ (and update STOTRA_SLUGS in src/lib/stotras.ts) or add them to EXPECTED_DEFERRED_STOTRAS:\n${unexpected.join("\n")}`,
    ).toEqual([]);
  });

  it("EXPECTED_DEFERRED_STOTRAS list is exact (no stale entries)", () => {
    const known = stotraSlugSet();
    const orphans = computeOrphans((d) => d.associatedStotras, known);
    const stale = setDiff(EXPECTED_DEFERRED_STOTRAS, orphans);
    expect(
      stale,
      `EXPECTED_DEFERRED_STOTRAS contains slugs that are no longer orphans — remove them:\n${stale.join("\n")}`,
    ).toEqual([]);
  });
});
