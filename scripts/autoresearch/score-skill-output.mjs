/**
 * Autoresearch Mechanical Scorer — Score text against writing skill rules.
 *
 * Pure mechanical scoring: regex, counts, heuristics. No LLM API calls.
 * Reads hardban phrases and banned structures from stop-slop references at runtime.
 *
 * Two modes:
 *   1. Score inline text:  echo "text" | node score-skill-output.mjs --stdin
 *   2. Score files:        node score-skill-output.mjs --files path1.txt,path2.txt
 *   3. Score TSX anchors:  node score-skill-output.mjs --anchors src/app/what-is-vedanta/page.tsx
 *
 * Prints a single numeric score (0-100) to stdout. All other output to stderr.
 * When scoring multiple inputs, prints one JSON object per line to stderr (if --verbose),
 * then the mean score to stdout.
 */

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");
const SKILLS_DIR = path.join(process.env.HOME, ".claude/skills");

// ── CLI flags ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : null;
}

const FILES_RAW = getFlag("files");
const ANCHORS_RAW = getFlag("anchors");
const READ_STDIN = args.includes("--stdin");
const VERBOSE = args.includes("--verbose");

if (!FILES_RAW && !ANCHORS_RAW && !READ_STDIN) {
  console.error("Usage:");
  console.error("  echo 'text' | node score-skill-output.mjs --stdin [--verbose]");
  console.error("  node score-skill-output.mjs --files sample1.txt,sample2.txt [--verbose]");
  console.error("  node score-skill-output.mjs --anchors src/app/slug/page.tsx [--verbose]");
  process.exit(1);
}

// ── Load hardban phrases from stop-slop references ────────────────────────

async function loadHardbans() {
  const phrasesPath = path.join(SKILLS_DIR, "stop-slop/references/phrases.md");
  if (!existsSync(phrasesPath)) {
    console.error(`Warning: ${phrasesPath} not found. Skipping hardban checks.`);
    return [];
  }

  const content = await readFile(phrasesPath, "utf8");
  const phrases = [];

  for (const line of content.split("\n")) {
    const quoted = line.match(/^- "(.+?)"/) || line.match(/^- '(.+?)'/);
    if (quoted) {
      phrases.push(quoted[1].toLowerCase());
      continue;
    }
    const bare = line.match(/^- (.+)$/);
    if (bare) {
      const phrase = bare[1].trim().toLowerCase();
      if (phrase.includes("—") || phrase.includes("|") || phrase.length > 60) continue;
      if (/^[A-Z]/.test(bare[1].trim()) && !bare[1].trim().startsWith('"')) continue;
      phrases.push(phrase);
    }
  }

  return phrases;
}

async function loadBannedStructurePatterns() {
  const structPath = path.join(SKILLS_DIR, "stop-slop/references/structures.md");
  if (!existsSync(structPath)) return [];

  const content = await readFile(structPath, "utf8");
  const patterns = [];
  for (const line of content.split("\n")) {
    const match = line.match(/^\|\s*"(.+?)"\s*\|/) || line.match(/^\|\s*(.+?)\s*\|.*\|$/);
    if (match) {
      const pat = match[1].trim().toLowerCase();
      if (pat.length > 5 && pat.length < 80 && !pat.includes("pattern") && !pat.includes("---")) {
        patterns.push(pat);
      }
    }
  }
  return patterns;
}

// ── Adverb detection ──────────────────────────────────────────────────────

const ADVERB_KILL_LIST = [
  "really", "just", "literally", "genuinely", "honestly", "simply", "actually",
  "deeply", "truly", "fundamentally", "inherently", "inevitably",
  "interestingly", "importantly", "crucially", "ultimately", "arguably", "notably",
];

const ADVERB_ALLOWLIST = [
  "only", "holy", "daily", "early", "family", "apply", "reply", "supply",
  "july", "italy", "ally", "belly", "bully", "fully", "rally", "tally",
  "jelly", "folly", "lily", "rely", "assembly", "homily", "anomaly",
  "butterfly", "scholarly", "priestly", "ghostly", "costly", "elderly",
  "friendly", "lovely", "lonely", "lively", "godly", "worldly", "brotherly",
  "fatherly", "motherly", "sisterly", "heavenly", "orderly", "formerly",
];

function countAdverbs(text) {
  const words = text.toLowerCase().split(/\s+/);
  let count = 0;
  const found = [];
  for (const word of words) {
    const clean = word.replace(/[^a-z]/g, "");
    if (ADVERB_KILL_LIST.includes(clean)) {
      count++;
      found.push(clean);
    } else if (
      clean.endsWith("ly") &&
      clean.length > 3 &&
      !ADVERB_ALLOWLIST.includes(clean)
    ) {
      count++;
      found.push(clean);
    }
  }
  return { count, found };
}

// ── Em dash detection ─────────────────────────────────────────────────────

function countDramaticEmDashes(text) {
  const matches = text.match(/—/g);
  return matches ? matches.length : 0;
}

// ── Passive voice heuristic ───────────────────────────────────────────────

const PASSIVE_PATTERN = /\b(is|was|were|are|been|being|has been|had been|will be|would be)\s+([\w]+ed|[\w]+en|[\w]+t)\b/gi;

function countPassiveVoice(text) {
  const matches = text.match(PASSIVE_PATTERN);
  return matches ? matches.length : 0;
}

// ── Sentence length variance ──────────────────────────────────────────────

function sentenceLengthCoV(text) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length < 2) return 0;

  const lengths = sentences.map((s) => s.trim().split(/\s+/).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  if (mean === 0) return 0;

  const variance = lengths.reduce((sum, l) => sum + (l - mean) ** 2, 0) / lengths.length;
  return Math.sqrt(variance) / mean;
}

// ── Paragraph length ──────────────────────────────────────────────────────

function avgParagraphSentences(text) {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);
  if (paragraphs.length === 0) return 0;

  const counts = paragraphs.map(
    (p) => p.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
  );
  return counts.reduce((a, b) => a + b, 0) / counts.length;
}

// ── Mechanical scoring (0-100) ────────────────────────────────────────────

function mechanicalScore(text, hardbans, bannedStructures) {
  const lower = text.toLowerCase();
  const scores = {};

  // Hardban phrases (25pts, binary — these are non-negotiable)
  let hardbanViolations = 0;
  const hardbanFound = [];
  for (const phrase of hardbans) {
    if (lower.includes(phrase)) {
      hardbanViolations++;
      hardbanFound.push(phrase);
    }
  }
  scores.hardbans = hardbanViolations === 0 ? 25 : 0;

  // Banned structures (15pts, -3 per violation, min 0)
  let structureViolations = 0;
  const structuresFound = [];
  for (const pattern of bannedStructures) {
    if (lower.includes(pattern)) {
      structureViolations++;
      structuresFound.push(pattern);
    }
  }
  scores.structures = Math.max(0, 15 - structureViolations * 3);

  // Adverbs (15pts, -3 per adverb, min 0)
  const adverbs = countAdverbs(text);
  scores.adverbs = Math.max(0, 15 - adverbs.count * 3);

  // Em dashes (10pts, -5 per em dash, min 0)
  const emDashCount = countDramaticEmDashes(text);
  scores.emDashes = Math.max(0, 10 - emDashCount * 5);

  // Passive voice (10pts, -2 per instance, min 0)
  const passiveCount = countPassiveVoice(text);
  scores.passiveVoice = Math.max(0, 10 - passiveCount * 2);

  // Sentence length CoV (15pts, linear: CoV >= 0.5 = 15, CoV 0 = 0)
  const cov = sentenceLengthCoV(text);
  scores.sentenceVariance = Math.min(15, Math.round((cov / 0.5) * 15));

  // Avg paragraph length (10pts: ≤3 = 10, ≤4 = 6, ≤5 = 3, >5 = 0)
  const avgParaLen = avgParagraphSentences(text);
  scores.paragraphLength = avgParaLen <= 3 ? 10 : avgParaLen <= 4 ? 6 : avgParaLen <= 5 ? 3 : 0;

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  return {
    total,
    breakdown: scores,
    details: {
      hardbanViolations,
      hardbanFound,
      structureViolations,
      structuresFound: structuresFound.slice(0, 5),
      adverbCount: adverbs.count,
      adverbsFound: adverbs.found.slice(0, 10),
      emDashCount,
      passiveCount,
      sentenceCov: cov.toFixed(3),
      avgParagraphSentences: avgParaLen.toFixed(1),
      wordCount: text.split(/\s+/).length,
    },
  };
}

// ── Anchor text extraction from TSX ───────────────────────────────────────

function extractProseFromTsx(tsxContent) {
  const proseChunks = [];

  const tagTextMatches = tsxContent.matchAll(/>([^<>{]+)</g);
  for (const match of tagTextMatches) {
    const text = match[1].trim();
    if (text.length > 30 && !text.includes("import ") && !text.includes("const ") && !text.includes("export ")) {
      proseChunks.push(text);
    }
  }

  const templateMatches = tsxContent.matchAll(/[`]([^`]{50,})[`]/g);
  for (const match of templateMatches) {
    proseChunks.push(match[1].trim());
  }

  return proseChunks.join("\n\n");
}

// ── Read from stdin ───────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const log = VERBOSE ? (...a) => console.error(...a) : () => {};

  const [hardbans, bannedStructures] = await Promise.all([
    loadHardbans(),
    loadBannedStructurePatterns(),
  ]);

  log(`Loaded ${hardbans.length} hardban phrases, ${bannedStructures.length} banned structures`);

  const texts = [];

  // Collect texts from all input sources
  if (READ_STDIN) {
    const text = await readStdin();
    if (text.trim()) texts.push({ source: "stdin", text: text.trim() });
  }

  if (FILES_RAW) {
    for (const filePath of FILES_RAW.split(",").map((p) => p.trim())) {
      const resolved = filePath.startsWith("/") ? filePath : path.resolve(filePath);
      if (!existsSync(resolved)) {
        log(`Warning: ${resolved} not found, skipping`);
        continue;
      }
      const content = await readFile(resolved, "utf8");
      texts.push({ source: filePath, text: content.trim() });
    }
  }

  if (ANCHORS_RAW) {
    for (const anchorPath of ANCHORS_RAW.split(",").map((p) => p.trim())) {
      const resolved = anchorPath.startsWith("/") ? anchorPath : path.resolve(ROOT, anchorPath);
      if (!existsSync(resolved)) {
        log(`Warning: ${resolved} not found, skipping`);
        continue;
      }
      const tsxContent = await readFile(resolved, "utf8");
      const prose = extractProseFromTsx(tsxContent);
      if (prose.length < 100) {
        log(`Warning: ${anchorPath} extracted prose too short (${prose.length} chars), skipping`);
        continue;
      }
      texts.push({ source: anchorPath, text: prose });
    }
  }

  if (texts.length === 0) {
    console.error("Error: No text to score.");
    process.exit(1);
  }

  // Score all texts
  const allScores = [];

  for (const { source, text } of texts) {
    const truncated = text.split(/\s+/).slice(0, 3000).join(" ");
    const result = mechanicalScore(truncated, hardbans, bannedStructures);
    allScores.push(result.total);

    if (VERBOSE) {
      log(`\n--- ${source} (${result.details.wordCount} words) ---`);
      log(`  Score: ${result.total}/100`);
      log(`  Breakdown: hardbans=${result.breakdown.hardbans}/25 struct=${result.breakdown.structures}/15 adverbs=${result.breakdown.adverbs}/15 em=${result.breakdown.emDashes}/10 passive=${result.breakdown.passiveVoice}/10 rhythm=${result.breakdown.sentenceVariance}/15 para=${result.breakdown.paragraphLength}/10`);
      if (result.details.hardbanFound.length > 0) {
        log(`  Hardbans found: ${result.details.hardbanFound.join(", ")}`);
      }
      if (result.details.adverbsFound.length > 0) {
        log(`  Adverbs found: ${result.details.adverbsFound.join(", ")}`);
      }
      if (result.details.structuresFound.length > 0) {
        log(`  Structures found: ${result.details.structuresFound.join(", ")}`);
      }
    }
  }

  const mean = allScores.reduce((a, b) => a + b, 0) / allScores.length;

  log(`\n=== Mean: ${mean.toFixed(1)}/100 (${allScores.length} texts scored) ===`);

  // stdout: single numeric line
  console.log(Math.round(mean * 10) / 10);
}

main().catch((err) => {
  console.error(`Fatal: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
