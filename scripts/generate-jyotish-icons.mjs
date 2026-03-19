#!/usr/bin/env node
/**
 * Generate Jyotish icons (grahas, rashis, nakshatras) via OpenAI DALL-E 3
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/generate-jyotish-icons.mjs --batch grahas
 *   OPENAI_API_KEY=sk-... node scripts/generate-jyotish-icons.mjs --batch rashis
 *   OPENAI_API_KEY=sk-... node scripts/generate-jyotish-icons.mjs --batch nakshatras
 *   OPENAI_API_KEY=sk-... node scripts/generate-jyotish-icons.mjs --batch all
 *   OPENAI_API_KEY=sk-... node scripts/generate-jyotish-icons.mjs --single surya
 */

import OpenAI from "openai";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const RAW_DIR = "/tmp/sadhaka-jyotish-raw";
const OUT_BASE = "public/assets/jyotish";

// Rate limit: DALL-E 3 tier 1 = 5 images/min → 13s between calls
const RATE_LIMIT_MS = 13_000;

const STYLE_PREFIX = `Minimalist icon on a pure black (#0a0a0a) background. Single symbolic motif, no text, no border, no frame. Vedic Hindu traditional art aesthetic. Clean golden (#fbbf24) silhouette. Flat design, simple paths, suitable for a small 48px UI icon. High contrast.`;

// ─── GRAHA DEFINITIONS ───
const GRAHAS = [
  { slug: "surya", subject: "Sun disc with 12 radiating pointed rays in a symmetrical pattern. Central circle with flame-like corona" },
  { slug: "chandra", subject: "Crescent moon facing right with a soft luminous halo. Elegant curved shape, traditional Hindu Chandra motif" },
  { slug: "mangala", subject: "Upward-pointing spear (Shakti weapon) with a triangular blade. Mars warrior symbol, sharp and angular" },
  { slug: "budha", subject: "Open lotus flower viewed from above with a small scroll or book resting on it. Mercury/knowledge symbol" },
  { slug: "brihaspati", subject: "Sacred prayer beads (akshamala/japa mala) arranged in a circle with a guru's staff (danda) crossing through. Jupiter/Guru symbol" },
  { slug: "shukra", subject: "Brilliant diamond or gem shape with radiating facets, sitting atop an open lotus. Venus/beauty symbol" },
  { slug: "shani", subject: "A crow in profile silhouette perched on a curved bow. Saturn/Shani symbol, dark and austere" },
  { slug: "rahu", subject: "Mythical serpent (naga) head with hood spread wide, facing forward. Shadow planet Rahu, solar eclipse ring symbolism, dark cosmic energy" },
  { slug: "ketu", subject: "Serpent tail trailing into a comet-like streak with a small flag (dhvaja) at the tip. Shadow planet Ketu, headless body" },
];

// ─── RASHI DEFINITIONS ───
const RASHIS = [
  { slug: "mesha", subject: "Ram or sheep in profile, standing proud. Aries/Mesha zodiac. Simple animal silhouette" },
  { slug: "vrishabha", subject: "Bull in profile, strong and grounded posture. Taurus/Vrishabha zodiac. Simple animal silhouette" },
  { slug: "mithuna", subject: "Two figures (male and female) standing side by side holding hands. Gemini/Mithuna zodiac. Simple human silhouettes" },
  { slug: "karka", subject: "Crab viewed from above with symmetrical claws. Cancer/Karka zodiac. Simple crustacean silhouette" },
  { slug: "simha", subject: "Majestic lion in profile with flowing mane. Leo/Simha zodiac. Simple animal silhouette" },
  { slug: "kanya", subject: "Young maiden holding a sheaf of grain or lotus, standing gracefully. Virgo/Kanya zodiac. Simple human silhouette" },
  { slug: "tula", subject: "Traditional balance scales with two equal pans suspended from a central beam. Libra/Tula zodiac" },
  { slug: "vrischika", subject: "Scorpion viewed from above with curved stinger tail raised. Scorpio/Vrischika zodiac. Simple arachnid silhouette" },
  { slug: "dhanu", subject: "Archer drawing a bow, half-human centaur form. Sagittarius/Dhanu zodiac. Simple silhouette" },
  { slug: "makara", subject: "Makara mythical sea-creature: crocodile-headed creature with fish tail curving upward. NOT a Western goat. Capricorn/Makara zodiac. Hindu mythological beast" },
  { slug: "kumbha", subject: "Traditional Indian water pot (kumbha/kalasha) with water flowing from its mouth. Aquarius/Kumbha zodiac" },
  { slug: "meena", subject: "Two fish swimming in opposite directions, forming a circular pattern. Pisces/Meena zodiac. Simple fish silhouettes" },
];

// ─── NAKSHATRA DEFINITIONS ───
const NAKSHATRAS = [
  { slug: "ashvini", subject: "Horse head in profile, elegant and swift. Symbol of Ashvini nakshatra" },
  { slug: "bharani", subject: "Inverted triangle or yoni symbol (womb/vessel). Symbol of Bharani nakshatra" },
  { slug: "krittika", subject: "Small razor blade or flame-like cutting edge. Symbol of Krittika nakshatra" },
  { slug: "rohini", subject: "Ox-drawn cart or chariot wheel. Symbol of Rohini nakshatra" },
  { slug: "mrigashira", subject: "Deer head in profile with small antlers. Symbol of Mrigashira nakshatra" },
  { slug: "ardra", subject: "Single teardrop or raindrop shape. Symbol of Ardra nakshatra" },
  { slug: "punarvasu", subject: "Quiver holding arrows, or a bow with arrows. Symbol of Punarvasu nakshatra" },
  { slug: "pushya", subject: "Lotus flower or cow udder shape (circle with radiating curves). Symbol of Pushya nakshatra" },
  { slug: "ashlesha", subject: "Coiled serpent (naga) in a spiral. Symbol of Ashlesha nakshatra" },
  { slug: "magha", subject: "Royal throne or palanquin. Symbol of Magha nakshatra" },
  { slug: "purva-phalguni", subject: "Front legs of a swinging bed or hammock. Symbol of Purva Phalguni nakshatra" },
  { slug: "uttara-phalguni", subject: "Back legs of a bed or resting cot. Symbol of Uttara Phalguni nakshatra" },
  { slug: "hasta", subject: "Open human palm/hand with five spread fingers. Symbol of Hasta nakshatra" },
  { slug: "chitra", subject: "Bright shining jewel or pearl with radiating sparkle. Symbol of Chitra nakshatra" },
  { slug: "swati", subject: "Young plant shoot bending in the wind, a small coral or sprout. Symbol of Swati nakshatra" },
  { slug: "vishakha", subject: "Triumphal gateway arch or forked tree branch. Symbol of Vishakha nakshatra" },
  { slug: "anuradha", subject: "Lotus flower in bloom. Symbol of Anuradha nakshatra" },
  { slug: "jyeshtha", subject: "Circular pendant earring or protective umbrella (chhatra). Symbol of Jyeshtha nakshatra" },
  { slug: "mula", subject: "Bundle of tied roots or root cluster. Symbol of Mula nakshatra" },
  { slug: "purva-ashadha", subject: "Elephant tusk or handheld fan (winnowing basket). Symbol of Purva Ashadha nakshatra" },
  { slug: "uttara-ashadha", subject: "Small cot or planks of a bed, elephant tusk. Symbol of Uttara Ashadha nakshatra" },
  { slug: "shravana", subject: "Human ear or three footprints in a row (Vishnu's steps). Symbol of Shravana nakshatra" },
  { slug: "dhanishtha", subject: "Mridanga drum or bamboo flute. Symbol of Dhanishtha nakshatra" },
  { slug: "shatabhisha", subject: "Empty circle or ring of small flowers/dots (thousand petals). Symbol of Shatabhisha nakshatra" },
  { slug: "purva-bhadrapada", subject: "Sword or double-faced figure (two faces looking in opposite directions). Symbol of Purva Bhadrapada nakshatra" },
  { slug: "uttara-bhadrapada", subject: "Twin serpent or back of a funeral cot. Symbol of Uttara Bhadrapada nakshatra" },
  { slug: "revati", subject: "Pair of swimming fish or a small drum (mridanga). Symbol of Revati nakshatra" },
];

const ALL_BATCHES = { grahas: GRAHAS, rashis: RASHIS, nakshatras: NAKSHATRAS };

// ─── HELPERS ───

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateIcon(slug, subject, category) {
  const rawPath = path.join(RAW_DIR, category, `${slug}.png`);
  const outDir = path.join(OUT_BASE, category);
  const webpPath = path.join(outDir, `${slug}.webp`);

  // Skip if already generated
  if (fs.existsSync(webpPath)) {
    console.log(`  ✓ ${category}/${slug}.webp already exists, skipping`);
    return;
  }

  const prompt = `${STYLE_PREFIX} Subject: ${subject}`;

  console.log(`  → Generating ${category}/${slug}...`);

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "b64_json",
    });

    const b64 = response.data[0].b64_json;
    const rawBuf = Buffer.from(b64, "base64");

    // Save raw PNG
    fs.mkdirSync(path.dirname(rawPath), { recursive: true });
    fs.writeFileSync(rawPath, rawBuf);

    // Optimize: resize to 128x128, convert to WebP
    fs.mkdirSync(outDir, { recursive: true });
    await sharp(rawBuf)
      .resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);

    const stats = fs.statSync(webpPath);
    console.log(`  ✓ ${category}/${slug}.webp (${(stats.size / 1024).toFixed(1)}KB)`);
  } catch (err) {
    console.error(`  ✗ ${category}/${slug} FAILED: ${err.message}`);
  }
}

// ─── MAIN ───

async function main() {
  const args = process.argv.slice(2);
  const batchFlag = args.indexOf("--batch");
  const singleFlag = args.indexOf("--single");

  if (!process.env.OPENAI_API_KEY) {
    console.error("ERROR: OPENAI_API_KEY not set");
    process.exit(1);
  }

  fs.mkdirSync(RAW_DIR, { recursive: true });

  if (singleFlag !== -1) {
    const slug = args[singleFlag + 1];
    // Find in any batch
    for (const [cat, items] of Object.entries(ALL_BATCHES)) {
      const item = items.find((i) => i.slug === slug);
      if (item) {
        await generateIcon(item.slug, item.subject, cat);
        return;
      }
    }
    console.error(`Icon "${slug}" not found in any batch`);
    process.exit(1);
  }

  const batchName = batchFlag !== -1 ? args[batchFlag + 1] : "all";
  const batches = batchName === "all" ? Object.keys(ALL_BATCHES) : [batchName];

  for (const cat of batches) {
    const items = ALL_BATCHES[cat];
    if (!items) {
      console.error(`Unknown batch: ${cat}`);
      process.exit(1);
    }

    console.log(`\n═══ Generating ${cat} (${items.length} icons) ═══\n`);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await generateIcon(item.slug, item.subject, cat);

      // Rate limit (skip delay after last item)
      if (i < items.length - 1) {
        console.log(`  ⏱ Waiting ${RATE_LIMIT_MS / 1000}s (rate limit)...`);
        await sleep(RATE_LIMIT_MS);
      }
    }
  }

  console.log("\n✅ Done!\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
