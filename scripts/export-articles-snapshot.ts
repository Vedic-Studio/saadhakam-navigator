/**
 * Exports article metadata to a JSON snapshot that .mjs scripts can read.
 * Run with: npx tsx scripts/export-articles-snapshot.ts
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dynamic import lets tsx resolve the TypeScript alias paths
const { articles } = await import("../src/data/articles.js");

const snapshot = articles.map((a) => ({
    slug: a.slug,
    route: a.route,
    title: a.title,
    primaryKeyword: a.primaryKeyword,
    pillar: a.pillar,
    metaDescription: a.metaDescription,
}));

const outPath = path.join(__dirname, "articles-snapshot.json");
await writeFile(outPath, JSON.stringify(snapshot, null, 2), "utf8");

console.log(`✓ Wrote ${snapshot.length} articles to scripts/articles-snapshot.json`);
