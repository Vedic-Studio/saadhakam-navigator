import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * CLAUDE.md "Navigation Registration (Mandatory)": every new hub MUST appear
 * in all three navigation surfaces. This test snapshots that contract for the
 * P2 orphan-recovery hubs so a future edit that drops one of them fails CI.
 *
 * We read the files as text rather than importing the React modules because:
 *  - Header.tsx and Footer.tsx are "use client" modules that drag in browser
 *    APIs (window scroll listeners, etc.) which jsdom may or may not satisfy
 *    when the components are imported indirectly through a transformed path.
 *  - The contract is "this URL is in the nav config", which is a textual
 *    substring check, not a render check.
 */
const REPO_ROOT = join(__dirname, "..", "..");

const newHubHrefs: string[] = [
  "/texts/bhagavad-gita",
  "/topics",
  "/practices",
  "/sanatan-history/researchers",
  "/sanatan-history/dynasties",
];

function readSource(relativePath: string): string {
  return readFileSync(join(REPO_ROOT, relativePath), "utf8");
}

describe("orphan-recovery hub registration in navigation surfaces", () => {
  const headerSrc = readSource("src/components/Header.tsx");
  const footerSrc = readSource("src/components/Footer.tsx");
  const discoverSrc = readSource(
    "src/components/landing/DiscoverSection.tsx",
  );

  it.each(newHubHrefs)("Header.tsx references %s", (href) => {
    expect(
      headerSrc.includes(`href: "${href}"`),
      `Header.tsx must register "${href}" as a navLinks/group item`,
    ).toBe(true);
  });

  it.each(newHubHrefs)("Footer.tsx references %s", (href) => {
    expect(
      footerSrc.includes(`href: "${href}"`),
      `Footer.tsx must register "${href}" in a footerLinks column`,
    ).toBe(true);
  });

  it.each(newHubHrefs)("DiscoverSection.tsx references %s", (href) => {
    expect(
      discoverSrc.includes(`href: "${href}"`),
      `DiscoverSection.tsx must register "${href}" as a categories entry`,
    ).toBe(true);
  });
});
