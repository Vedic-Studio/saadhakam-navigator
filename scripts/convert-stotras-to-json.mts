/**
 * One-time script: converts TypeScript stotra data files → JSON files in content/stotras/
 * Run: npx tsx scripts/convert-stotras-to-json.mts
 */
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { shivaTandavaVerses } from "../src/data/shivaTandavaStotram.js";
import { vishnuSahasranamaNames } from "../src/data/vishnuSahasranama.js";
import { lalitaSahasranamaNames } from "../src/data/lalitaSahasranama.js";

const CONTENT_DIR = path.join(process.cwd(), "content", "stotras");
await mkdir(CONTENT_DIR, { recursive: true });

// ── Shiva Tandava Stotram ────────────────────────────────────────────────────
const shivaTandava = {
  id: "shiva-tandava-stotram",
  title: "Shiva Tandava Stotram",
  slug: "shiva-tandava-stotram",
  type: "stotra",
  author: "Ravana",
  tradition: "Shaiva",
  deity: "Shiva",
  language: "Sanskrit",
  verseCount: shivaTandavaVerses.length,
  description:
    "Composed by Ravana in reverence to Lord Shiva — 16 verses describing Shiva's cosmic Tandava dance with extraordinary poetic power.",
  verses: shivaTandavaVerses,
};
await writeFile(
  path.join(CONTENT_DIR, "shiva-tandava-stotram.json"),
  JSON.stringify(shivaTandava, null, 2)
);
console.log(`✓ shiva-tandava-stotram.json  (${shivaTandavaVerses.length} verses)`);

// ── Vishnu Sahasranama ───────────────────────────────────────────────────────
const vishnuSahasranama = {
  id: "vishnu-sahasranama",
  title: "Vishnu Sahasranama",
  slug: "vishnu-sahasranama",
  type: "sahasranama",
  author: "Vyasa",
  tradition: "Vaishnava",
  deity: "Vishnu",
  language: "Sanskrit",
  nameCount: vishnuSahasranamaNames.length,
  description:
    "The 1000 names of Lord Vishnu from the Mahabharata, recited by Bhishma to Yudhishthira on the battlefield.",
  names: vishnuSahasranamaNames,
};
await writeFile(
  path.join(CONTENT_DIR, "vishnu-sahasranama.json"),
  JSON.stringify(vishnuSahasranama, null, 2)
);
console.log(`✓ vishnu-sahasranama.json  (${vishnuSahasranamaNames.length} names)`);

// ── Lalita Sahasranama ───────────────────────────────────────────────────────
const lalitaSahasranama = {
  id: "lalita-sahasranama",
  title: "Lalita Sahasranama",
  slug: "lalita-sahasranama",
  type: "sahasranama",
  author: "Hayagriva",
  tradition: "Shakta",
  deity: "Lalita (Devi)",
  language: "Sanskrit",
  nameCount: lalitaSahasranamaNames.length,
  description:
    "The 1000 names of the Divine Mother Lalita from the Brahmanda Purana, revealed by Hayagriva to the sage Agastya.",
  names: lalitaSahasranamaNames,
};
await writeFile(
  path.join(CONTENT_DIR, "lalita-sahasranama.json"),
  JSON.stringify(lalitaSahasranama, null, 2)
);
console.log(`✓ lalita-sahasranama.json  (${lalitaSahasranamaNames.length} names)`);

console.log("\nDone. Files written to content/stotras/");
