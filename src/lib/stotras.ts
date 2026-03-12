/**
 * Stotra file loader — reads from content/stotras/*.json at build time.
 * JSON files are the single source of truth for all stotra data.
 */
import { readFileSync } from "fs";
import path from "path";

// ── Types ────────────────────────────────────────────────────────────────────

export interface VerseAnalysis {
  /** Meter, Sanskrit wordplay, imagery, poetic/structural notes */
  literary: string;
  /** Specific Puranas, stories, events, deity relationships, cross-text references */
  mythological: string;
  /** Shaiva/Tantric/Vedantic depth, connections to philosophy and other systems */
  philosophical: string;
}

export interface StotraVerse {
  verse: number;
  slug: string;
  sanskritDevanagari: string;
  transliteration: string;
  wordMeanings: string;
  /** Direct/literal translation */
  translation: string;
  /** Flowing literary English rendering — reads like prose-poetry, not word-for-word */
  translationFlow: string;
  commentary?: string;
  analysis: VerseAnalysis;
}

export interface NameAnalysis {
  /** Puranic/story/event context for this name */
  mythological: string;
  /** Deeper philosophical/spiritual meaning in tradition */
  philosophical: string;
}

export interface SahasranamaName {
  number: number;
  name: string;
  transliteration: string;
  meaning: string;
  slug: string;
  /** Optional — populated as content is built */
  analysis?: NameAnalysis;
}

export interface StotraFile {
  id: string;
  title: string;
  slug: string;
  type: "stotra";
  author: string;
  tradition: string;
  deity: string;
  language: string;
  verseCount: number;
  description: string;
  verses: StotraVerse[];
}

export interface SahasranamaFile {
  id: string;
  title: string;
  slug: string;
  type: "sahasranama";
  author: string;
  tradition: string;
  deity: string;
  language: string;
  nameCount: number;
  description: string;
  names: SahasranamaName[];
}

export type AnyStortraFile = StotraFile | SahasranamaFile;

// ── Loader ───────────────────────────────────────────────────────────────────

const STOTRAS_DIR = path.join(process.cwd(), "content", "stotras");

function loadJSON<T>(filename: string): T {
  const filePath = path.join(STOTRAS_DIR, filename);
  return JSON.parse(readFileSync(filePath, "utf-8")) as T;
}

export function loadStotra(slug: string): StotraFile {
  return loadJSON<StotraFile>(`${slug}.json`);
}

export function loadSahasranama(slug: string): SahasranamaFile {
  return loadJSON<SahasranamaFile>(`${slug}.json`);
}

// ── Verse helpers ────────────────────────────────────────────────────────────

export function getStotraVerseBySlug(
  stotra: StotraFile,
  slug: string
): StotraVerse | undefined {
  return stotra.verses.find((v) => v.slug === slug);
}

export function getAdjacentVerses(
  stotra: StotraFile,
  verseNum: number
): { prev: StotraVerse | null; next: StotraVerse | null } {
  const idx = stotra.verses.findIndex((v) => v.verse === verseNum);
  return {
    prev: idx > 0 ? stotra.verses[idx - 1] : null,
    next: idx < stotra.verses.length - 1 ? stotra.verses[idx + 1] : null,
  };
}

// ── Name helpers ─────────────────────────────────────────────────────────────

export function getSahasranamaNameBySlug(
  sahasranama: SahasranamaFile,
  slug: string
): SahasranamaName | undefined {
  return sahasranama.names.find((n) => n.slug === slug);
}
