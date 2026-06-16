#!/usr/bin/env node
/**
 * Rasterize the fact-card SVGs to PNG for social / Open Graph sharing.
 *
 * The SVGs in public/assets/fact-cards/*.svg are the source of truth for the
 * card art; social platforms (X, WhatsApp, Facebook, LinkedIn) cannot render
 * SVG as a preview image, so each card needs a 1200x630 PNG alongside it.
 *
 * Run after editing any fact-card SVG:  npm run images:fact-cards
 *
 * Card ids are read from src/components/share/factCards.ts so this stays in
 * sync with the seeded cards (no hardcoded list to drift).
 */
import sharp from "sharp";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cardsDir = path.join(root, "public", "assets", "fact-cards");

// OG image canonical size; matches the viewBox of every fact-card SVG.
const WIDTH = 1200;
const HEIGHT = 630;

/** Pull the card ids out of factCards.ts without importing TS at runtime. */
function readCardIds() {
  const src = readFileSync(
    path.join(root, "src", "components", "share", "factCards.ts"),
    "utf8",
  );
  const ids = [...src.matchAll(/id:\s*"([\w-]+)"/g)].map((m) => m[1]);
  if (ids.length === 0) throw new Error("No fact-card ids found in factCards.ts");
  return [...new Set(ids)];
}

async function main() {
  const ids = readCardIds();
  const results = [];
  for (const id of ids) {
    const svgPath = path.join(cardsDir, `${id}.svg`);
    const pngPath = path.join(cardsDir, `${id}.png`);
    if (!existsSync(svgPath)) {
      throw new Error(`Missing source SVG for card "${id}": ${svgPath}`);
    }
    const svg = readFileSync(svgPath);
    // density 150 renders the vector crisply before the fixed-size resize.
    await sharp(svg, { density: 150 })
      .resize(WIDTH, HEIGHT, { fit: "fill" })
      .png({ compressionLevel: 9 })
      .toFile(pngPath);
    results.push(`${id}.png`);
  }
  console.log(`Rasterized ${results.length} fact card(s): ${results.join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
