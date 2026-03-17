import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();

const REQUIRED_REDIRECTS = [
    ["/philosophies/advaita-vedanta", "/philosophies/advaita"],
    ["/compare/advaita-vs-dvaita", "/advaita-vs-dvaita"],
    ["/compare/shaivism-vs-vaishnavism", "/shaivism-vs-vaishnavism"],
    ["/compare/stoicism-vs-vedanta", "/vedanta-vs-stoicism"],
    ["/compare/tantra-vs-vedanta", "/vedanta-vs-tantra"],
    ["/compare/vedanta-vs-buddhism", "/vedanta-vs-buddhism"],
];

const REQUIRED_SITEMAP_IDS = [
    "core",
    "philosophies",
    "traditions",
    "texts",
    "greats",
    "concepts",
    "comparisons",
    "topics",
    "practices",
    "shlokas",
    "sanskrit",
    "articles",
    "stotras",
    "deities",
    "mantras",
];

const REDIRECTED_COMPARISON_SLUGS = [
    "advaita-vs-dvaita",
    "shaivism-vs-vaishnavism",
    "stoicism-vs-vedanta",
    "tantra-vs-vedanta",
    "vedanta-vs-buddhism",
];

const DISALLOWED_INTERNAL_LINKS = [
    "/philosophies/advaita-vedanta",
    "/compare/advaita-vs-dvaita",
    "/compare/shaivism-vs-vaishnavism",
    "/compare/stoicism-vs-vedanta",
    "/compare/tantra-vs-vedanta",
    "/compare/vedanta-vs-buddhism",
];

const LINK_SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".mdx"]);
const LINK_SCAN_DIRS = ["src", "content"];
const LINK_SCAN_EXCLUDE = [
    "src/app/philosophies/advaita-vedanta/page.tsx",
    "next.config.ts",
    "src/app/sitemap.ts",
    "src/data/comparisons.ts",
    "scripts/validate-canonical-routes.mjs",
];

let failed = false;

function read(path) {
    return readFileSync(join(root, path), "utf8");
}

function assert(ok, message) {
    if (ok) {
        console.log(`✅ ${message}`);
        return;
    }
    failed = true;
    console.error(`❌ ${message}`);
}

function walk(dir, collector) {
    const full = join(root, dir);
    for (const entry of readdirSync(full)) {
        const abs = join(full, entry);
        const rel = relative(root, abs).replaceAll("\\", "/");
        const stats = statSync(abs);
        if (stats.isDirectory()) {
            walk(rel, collector);
            continue;
        }
        collector(rel);
    }
}

function hasLiteral(fileContent, literal) {
    return fileContent.includes(literal);
}

function validateRedirects() {
    const nextConfig = read("next.config.ts");
    for (const [source, destination] of REQUIRED_REDIRECTS) {
        const sourceOk = hasLiteral(nextConfig, `source: "${source}"`);
        const destinationOk = hasLiteral(nextConfig, `destination: "${destination}"`);
        assert(sourceOk && destinationOk, `next.config.ts includes redirect ${source} -> ${destination}`);
    }
}

function validateSitemaps() {
    const sitemap = read("src/app/(system)/sitemap.ts");
    for (const id of REQUIRED_SITEMAP_IDS) {
        assert(hasLiteral(sitemap, `{ id: "${id}" }`), `generateSitemaps includes id '${id}'`);
    }
    for (const slug of REDIRECTED_COMPARISON_SLUGS) {
        assert(hasLiteral(sitemap, `"${slug}"`), `redirected comparison slug '${slug}' is listed in sitemap filter`);
    }
    assert(!hasLiteral(sitemap, `${"${baseUrl}"}/philosophies/advaita-vedanta`), "sitemap does not emit philosophy alias /philosophies/advaita-vedanta");
}

function validateDynamicRobots() {
    const robotsTs = read("src/app/(system)/robots.ts");
    assert(hasLiteral(robotsTs, 'const baseUrl = "https://www.opensadhaka.com";'), "src/app/(system)/robots.ts baseUrl uses canonical host");
    assert(hasLiteral(robotsTs, '`${baseUrl}/sitemap.xml`'), "src/app/(system)/robots.ts includes root sitemap.xml");
    for (const id of REQUIRED_SITEMAP_IDS) {
        assert(hasLiteral(robotsTs, `"${id}"`), `src/app/(system)/robots.ts sitemapPaths includes '${id}'`);
    }
}

function validateStaticRobots() {
    const robotsTxt = read("public/robots.txt");
    assert(!robotsTxt.includes("https://www.opensadhaka.com"), "public/robots.txt does not reference www host");
    assert(robotsTxt.includes("Sitemap: https://www.opensadhaka.com/sitemap.xml"), "public/robots.txt includes root sitemap.xml");
    assert(robotsTxt.includes("https://www.opensadhaka.com/llms.txt"), "public/robots.txt references canonical llms.txt URL");
    assert(robotsTxt.includes("https://www.opensadhaka.com/llms-full.txt"), "public/robots.txt references canonical llms-full.txt URL");
    for (const id of REQUIRED_SITEMAP_IDS) {
        assert(
            robotsTxt.includes(`Sitemap: https://www.opensadhaka.com/sitemap/${id}.xml`),
            `public/robots.txt includes sitemap entry for '${id}'`
        );
    }
}

function validateInternalLinks() {
    const files = [];
    for (const dir of LINK_SCAN_DIRS) {
        walk(dir, (file) => {
            const extension = file.slice(file.lastIndexOf("."));
            if (LINK_SCAN_EXTENSIONS.has(extension)) files.push(file);
        });
    }

    const violations = [];
    for (const file of files) {
        if (LINK_SCAN_EXCLUDE.includes(file)) continue;
        const content = read(file);
        for (const path of DISALLOWED_INTERNAL_LINKS) {
            if (content.includes(path)) {
                violations.push(`${file} -> ${path}`);
            }
        }
    }

    if (violations.length > 0) {
        failed = true;
        console.error("❌ Disallowed canonical-leaking links found:");
        for (const violation of violations) {
            console.error(`   - ${violation}`);
        }
        return;
    }

    console.log("✅ No disallowed canonical-leaking internal links found in scanned content");
}

console.log("🔎 Running canonical route/indexation validator...\n");
validateRedirects();
validateSitemaps();
validateDynamicRobots();
validateStaticRobots();
validateInternalLinks();

if (failed) {
    console.error("\nValidation failed.");
    process.exit(1);
}

console.log("\nAll canonical route/indexation checks passed.");
