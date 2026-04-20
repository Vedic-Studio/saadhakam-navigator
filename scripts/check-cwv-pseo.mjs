/**
 * Sample Core Web Vitals (including INP) across a representative slice of
 * pSEO page categories and produce a report. AI Overviews use CWV as a
 * quality filter; bloated pSEO templates will silently drop out.
 *
 * Usage:
 *   node scripts/check-cwv-pseo.mjs                # default sample
 *   node scripts/check-cwv-pseo.mjs --strategy=desktop
 *   node scripts/check-cwv-pseo.mjs --limit=3      # N urls per category
 *   PAGESPEED_API_KEY=xxx node scripts/check-cwv-pseo.mjs
 *
 * Output: docs/reports/cwv-pseo-YYYY-MM-DD.md
 *
 * Uses the Google PageSpeed Insights v5 API. An API key is optional but
 * strongly recommended — without one the API is aggressively rate-limited.
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://www.opensadhaka.com";

const args = Object.fromEntries(
    process.argv.slice(2).map((a) => {
        const [k, v] = a.replace(/^--/, "").split("=");
        return [k, v ?? true];
    }),
);
const STRATEGY = args.strategy === "desktop" ? "desktop" : "mobile";
const LIMIT = Number.parseInt(args.limit, 10) || 5;
const API_KEY = process.env.PAGESPEED_API_KEY || process.env.PSI_API_KEY || "";

// ----------------------------------------------------------------------------
// Build the URL sample
// ----------------------------------------------------------------------------

async function buildSample() {
    const { articles } = await import("../src/data/articles.js");
    const { concepts } = await import("../src/data/concepts.js");
    const { deities } = await import("../src/data/deities.js");
    const { mantras } = await import("../src/data/mantras.js");
    const { comparisons } = await import("../src/data/comparisons.js");

    const take = (arr, n) => arr.slice(0, n).map((x) => x);

    return [
        { category: "homepage", urls: [SITE_URL] },
        { category: "articles", urls: take(articles, LIMIT).map((a) => `${SITE_URL}${a.route}`) },
        { category: "concepts", urls: take(concepts, LIMIT).map((c) => `${SITE_URL}/what-is-${c.slug}`) },
        { category: "deities", urls: take(deities, LIMIT).map((d) => `${SITE_URL}/deities/${d.slug}`) },
        { category: "mantras", urls: take(mantras, LIMIT).map((m) => `${SITE_URL}/mantras/${m.slug}`) },
        { category: "comparisons", urls: take(comparisons, LIMIT).map((c) => `${SITE_URL}/compare/${c.slug}`) },
        {
            category: "hubs",
            urls: [
                `${SITE_URL}/articles`,
                `${SITE_URL}/philosophies`,
                `${SITE_URL}/traditions`,
                `${SITE_URL}/deities`,
                `${SITE_URL}/mantras`,
                `${SITE_URL}/compare`,
            ],
        },
    ];
}

// ----------------------------------------------------------------------------
// PSI fetch
// ----------------------------------------------------------------------------

async function runPsi(url, strategy) {
    const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    api.searchParams.set("url", url);
    api.searchParams.set("strategy", strategy);
    // Request both lab (Lighthouse) and field (CrUX) results.
    for (const c of ["PERFORMANCE", "ACCESSIBILITY", "SEO", "BEST_PRACTICES"]) {
        api.searchParams.append("category", c);
    }
    if (API_KEY) api.searchParams.set("key", API_KEY);

    const res = await fetch(api);
    if (!res.ok) {
        return { ok: false, status: res.status, error: await res.text() };
    }
    const data = await res.json();
    const lh = data.lighthouseResult;
    const crux = data.loadingExperience?.metrics ?? {};
    const labLcpMs = lh?.audits?.["largest-contentful-paint"]?.numericValue ?? null;
    const labCls = lh?.audits?.["cumulative-layout-shift"]?.numericValue ?? null;
    const labTbtMs = lh?.audits?.["total-blocking-time"]?.numericValue ?? null;
    const labFcpMs = lh?.audits?.["first-contentful-paint"]?.numericValue ?? null;
    const performanceScore = lh?.categories?.performance?.score ?? null;
    const seoScore = lh?.categories?.seo?.score ?? null;
    const a11yScore = lh?.categories?.accessibility?.score ?? null;
    return {
        ok: true,
        url,
        strategy,
        performanceScore,
        seoScore,
        a11yScore,
        lab: {
            lcpMs: labLcpMs,
            cls: labCls,
            tbtMs: labTbtMs,
            fcpMs: labFcpMs,
        },
        field: {
            lcpMs: crux.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
            cls: crux.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile != null
                ? crux.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
                : null,
            inpMs: crux.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
            fcpMs: crux.FIRST_CONTENTFUL_PAINT_MS?.percentile ?? null,
        },
    };
}

// ----------------------------------------------------------------------------
// Rendering
// ----------------------------------------------------------------------------

function vitalVerdict(metric, value, thresholdGood, thresholdNeedsImprovement) {
    if (value == null) return "n/a";
    if (metric === "cls") {
        if (value <= thresholdGood) return "✅ good";
        if (value <= thresholdNeedsImprovement) return "🟡 needs-improvement";
        return "🔴 poor";
    }
    if (value <= thresholdGood) return "✅ good";
    if (value <= thresholdNeedsImprovement) return "🟡 needs-improvement";
    return "🔴 poor";
}

function fmtMs(v) {
    return v == null ? "—" : `${Math.round(v)}ms`;
}

function fmt(v, digits = 3) {
    return v == null ? "—" : Number(v).toFixed(digits);
}

function renderReport({ strategy, groups, runAt }) {
    const lines = [];
    lines.push(`# Core Web Vitals — pSEO sample (${strategy})`);
    lines.push("");
    lines.push(`Generated: ${runAt}`);
    lines.push(`Strategy: **${strategy}** · Sample size: ${LIMIT} URLs per category · Source: Google PageSpeed Insights v5`);
    lines.push("");
    lines.push("Thresholds: **LCP** ≤2.5s good / ≤4.0s needs-improvement. **INP** ≤200ms good / ≤500ms needs-improvement. **CLS** ≤0.1 good / ≤0.25 needs-improvement.");
    lines.push("");
    lines.push("Lab numbers are Lighthouse synthetic. Field numbers are Chrome UX Report — 75th percentile from real users, and only appear once a page accumulates enough traffic.");
    lines.push("");

    for (const group of groups) {
        lines.push(`## ${group.category}`);
        lines.push("");
        lines.push("| URL | Perf | SEO | A11y | Lab LCP | Lab CLS | Lab TBT | Field LCP | Field INP | Field CLS |");
        lines.push("|-----|------|-----|------|---------|---------|---------|-----------|-----------|-----------|");
        for (const r of group.results) {
            if (!r.ok) {
                lines.push(`| ${r.url} | — | — | — | — | — | — | — | — | — |`);
                continue;
            }
            const perf = r.performanceScore != null ? `${Math.round(r.performanceScore * 100)}` : "—";
            const seo = r.seoScore != null ? `${Math.round(r.seoScore * 100)}` : "—";
            const a11y = r.a11yScore != null ? `${Math.round(r.a11yScore * 100)}` : "—";
            const labLcp = `${fmtMs(r.lab.lcpMs)} ${vitalVerdict("lcp", r.lab.lcpMs, 2500, 4000)}`;
            const labCls = `${fmt(r.lab.cls)} ${vitalVerdict("cls", r.lab.cls, 0.1, 0.25)}`;
            const labTbt = fmtMs(r.lab.tbtMs);
            const fLcp = r.field.lcpMs != null ? `${fmtMs(r.field.lcpMs)} ${vitalVerdict("lcp", r.field.lcpMs, 2500, 4000)}` : "—";
            const fInp = r.field.inpMs != null ? `${fmtMs(r.field.inpMs)} ${vitalVerdict("inp", r.field.inpMs, 200, 500)}` : "—";
            const fCls = r.field.cls != null ? `${fmt(r.field.cls)} ${vitalVerdict("cls", r.field.cls, 0.1, 0.25)}` : "—";
            const shortUrl = r.url.replace(SITE_URL, "");
            lines.push(`| ${shortUrl} | ${perf} | ${seo} | ${a11y} | ${labLcp} | ${labCls} | ${labTbt} | ${fLcp} | ${fInp} | ${fCls} |`);
        }
        lines.push("");
    }

    // ----- Aggregate verdict -----
    lines.push("## Aggregate verdict");
    lines.push("");
    const allOk = groups.flatMap((g) => g.results).filter((r) => r.ok);
    const perfScores = allOk.map((r) => r.performanceScore).filter((v) => v != null);
    const lcpLab = allOk.map((r) => r.lab.lcpMs).filter((v) => v != null);
    const clsLab = allOk.map((r) => r.lab.cls).filter((v) => v != null);
    const inpField = allOk.map((r) => r.field.inpMs).filter((v) => v != null);
    const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);
    const p75 = (arr) => {
        if (!arr.length) return null;
        const s = [...arr].sort((a, b) => a - b);
        return s[Math.floor(s.length * 0.75)];
    };
    lines.push(`- Pages sampled: ${allOk.length}`);
    lines.push(`- Median performance score: ${perfScores.length ? Math.round(avg(perfScores) * 100) : "—"}`);
    lines.push(`- Lab LCP (p75): ${fmtMs(p75(lcpLab))}`);
    lines.push(`- Lab CLS (p75): ${fmt(p75(clsLab))}`);
    lines.push(`- Field INP (p75, where reported): ${fmtMs(p75(inpField))}`);
    lines.push("");

    lines.push("## Actions");
    lines.push("");
    lines.push("1. For any pSEO category with median performance <80 on mobile, investigate the shared template — fixes there cascade to every page in the category.");
    lines.push("2. Field-data gaps (all `—` in a category) mean the page isn't accumulating enough real-user traffic to appear in CrUX. Drive traffic first, then re-run this check.");
    lines.push("3. INP >200ms on any hub indicates expensive interaction handlers — audit client components and framer-motion animations on those routes.");
    lines.push("");

    return lines.join("\n");
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
    if (!API_KEY) {
        console.warn("⚠️  No PAGESPEED_API_KEY set — requests will be rate-limited.");
    }
    console.log(`Strategy: ${STRATEGY} · Limit per category: ${LIMIT}`);

    const sample = await buildSample();
    const groups = [];
    for (const group of sample) {
        console.log(`\n→ ${group.category} (${group.urls.length} URLs)`);
        const results = [];
        for (const url of group.urls) {
            process.stdout.write(`  ${url.replace(SITE_URL, "")} ... `);
            try {
                const r = await runPsi(url, STRATEGY);
                results.push(r);
                if (r.ok) {
                    console.log(`perf=${Math.round((r.performanceScore ?? 0) * 100)} lcp=${fmtMs(r.lab.lcpMs)}`);
                } else {
                    console.log(`ERROR ${r.status}`);
                }
            } catch (err) {
                results.push({ ok: false, url, error: err.message });
                console.log(`EXCEPTION: ${err.message}`);
            }
            // Gentle pacing between PSI requests (even with a key).
            await new Promise((r) => setTimeout(r, 500));
        }
        groups.push({ category: group.category, results });
    }

    const runAt = new Date().toISOString();
    const report = renderReport({ strategy: STRATEGY, groups, runAt });

    const reportsDir = path.join(ROOT, "docs", "reports");
    await mkdir(reportsDir, { recursive: true });
    const dateStamp = new Date().toISOString().slice(0, 10);
    const outPath = path.join(reportsDir, `cwv-pseo-${dateStamp}-${STRATEGY}.md`);
    await writeFile(outPath, report, "utf8");
    console.log(`\n✅ Report: ${path.relative(ROOT, outPath)}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
