export interface Commentary {
  author: string;
  text: string;
}

export interface BgShloka {
  id: string; // e.g., "1.1"
  chapter: number;
  verse: number;
  sanskritDevanagari: string;
  transliteration: string;
  synonyms: string; // Word by word meanings (anvaya)
  translation: string;
  commentaries: Commentary[];
  practicalApplication: string;
}

import { chapter1Shlokas } from "./bgShlokasCh1";
import { chapter2Shlokas } from "./bgShlokasCh2";
import { chapter3Shlokas } from "./bgShlokasCh3";
import { chapter4Shlokas } from "./bgShlokasCh4";
import { chapter5Shlokas } from "./bgShlokasCh5";
import { chapter6Shlokas } from "./bgShlokasCh6";
import { chapter7Shlokas } from "./bgShlokasCh7";
import { chapter8Shlokas } from "./bgShlokasCh8";
import { chapter9Shlokas } from "./bgShlokasCh9";
import { chapter10Shlokas } from "./bgShlokasCh10";
import { chapter11Shlokas } from "./bgShlokasCh11";
import { chapter12Shlokas } from "./bgShlokasCh12";
import { chapter13Shlokas } from "./bgShlokasCh13";
import { chapter14Shlokas } from "./bgShlokasCh14";
import { chapter15Shlokas } from "./bgShlokasCh15";
import { chapter16Shlokas } from "./bgShlokasCh16";
import { chapter17Shlokas } from "./bgShlokasCh17";
import { chapter18Shlokas } from "./bgShlokasCh18";

export const bgShlokas: BgShloka[] = [
  ...chapter1Shlokas,
  ...chapter2Shlokas,
  ...chapter3Shlokas,
  ...chapter4Shlokas,
  ...chapter5Shlokas,
  ...chapter6Shlokas,
  ...chapter7Shlokas,
  ...chapter8Shlokas,
  ...chapter9Shlokas,
  ...chapter10Shlokas,
  ...chapter11Shlokas,
  ...chapter12Shlokas,
  ...chapter13Shlokas,
  ...chapter14Shlokas,
  ...chapter15Shlokas,
  ...chapter16Shlokas,
  ...chapter17Shlokas,
  ...chapter18Shlokas,
];

export function getBgShlokaById(id: string): BgShloka | undefined {
  return bgShlokas.find((s) => s.id === id);
}

export function getBgShlokasByChapter(chapter: number): BgShloka[] {
  return bgShlokas.filter((s) => s.chapter === chapter);
}
