const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://opensadhaka.com";
const property = `sc-domain:${new URL(siteOrigin).host}`;
const MAX_URLS_PER_REQUEST = 50;

const priorityGroups = {
    pillarHubs: [
        "/ancient-wisdom-philosophies",
        "/practical-spiritual-practices",
        "/sacred-texts-teachings",
        "/spiritual-traditions-paths",
    ],
    knowledgeHubs: [
        "/philosophies",
        "/traditions",
        "/texts",
        "/greats",
        "/compare",
    ],
    chooserGuides: [
        "/best-spiritual-path-for-beginners",
        "/choose-between-bhakti-jnana-karma-raja-yoga",
        "/best-meditation-style-for-your-personality",
        "/spiritual-paths-explained",
        "/inquiry-vs-devotion-path",
        "/which-meditation-for-me",
        "/starting-spiritual-practice",
    ],
    concepts: [
        "/what-is-brahman",
        "/what-is-atman",
        "/what-is-dharma",
        "/what-is-karma",
        "/what-is-moksha",
        "/what-is-samsara",
        "/what-is-maya",
        "/what-is-bhakti",
        "/what-is-jnana",
        "/what-is-viveka",
        "/what-is-vairagya",
        "/what-is-samadhi",
        "/what-is-seva",
        "/what-is-guru",
        "/what-is-ishvara",
        "/what-is-avidya",
        "/what-is-jiva",
        "/what-is-karma-yoga",
        "/what-is-raja-yoga",
        "/what-is-advaita",
        "/what-is-niskama-karma",
        "/what-is-pranayama",
    ],
    sanskritLexicon: [
        "/learn/sanskrit/brahman",
        "/learn/sanskrit/atman",
        "/learn/sanskrit/dharma",
        "/learn/sanskrit/karma",
        "/learn/sanskrit/moksha",
    ],
    comparisons: [
        "/compare/advaita-vs-dvaita",
        "/compare/karma-vs-dharma",
        "/compare/atman-vs-brahman",
        "/compare/japa-vs-dhyana",
    ],
    articles: [
        "/what-is-vedanta",
        "/advaita-vedanta-explained",
        "/bhagavad-gita-complete-guide",
        "/yoga-sutras-complete-guide",
        "/how-to-start-japa",
        "/daily-spiritual-routine-beginners",
    ],
    scripture: [
        "/texts/bhagavad-gita",
        "/texts/yoga-sutras",
        "/texts/bhagavad-gita/chapter-1",
        "/texts/bhagavad-gita/chapter-1/shloka-1",
    ],
};

const priorityPaths = Array.from(
    new Set(Object.values(priorityGroups).flat()),
);

const urls = priorityPaths.map((path) => `${siteOrigin}${path}`);
const batches = [];

for (let index = 0; index < urls.length; index += MAX_URLS_PER_REQUEST) {
    batches.push(urls.slice(index, index + MAX_URLS_PER_REQUEST));
}

console.log("# Priority indexing payloads\n");
batches.forEach((batch, index) => {
    console.log(`## Batch ${index + 1} of ${batches.length}\n`);
    console.log(JSON.stringify({ urls: batch }, null, 2));
    console.log("");
});

console.log("\n# Priority groups\n");
for (const [group, paths] of Object.entries(priorityGroups)) {
    console.log(`${group}: ${paths.length}`);
}
console.log(`total: ${urls.length}`);
console.log(`batches: ${batches.length} (max ${MAX_URLS_PER_REQUEST} URLs each)`);

console.log("\n# POST these payloads to your production IndexNow endpoint\n");
const token = process.env.INDEXNOW_SUBMIT_TOKEN;
batches.forEach((batch, index) => {
    console.log(
        `# Batch ${index + 1}\n` +
        `curl -X POST "${siteOrigin}/api/indexnow/submit" -H "Content-Type: application/json"${token ? ` -H "x-indexnow-token: ${token}"` : ""} -d '${JSON.stringify({ urls: batch })}'`,
    );
});

console.log("\n# Manual Google Search Console inspection links\n");
for (const url of urls) {
    const inspectUrl = new URL("https://search.google.com/search-console/inspect");
    inspectUrl.searchParams.set("resource_id", property);
    inspectUrl.searchParams.set("id", url);
    console.log(`${url}\n${inspectUrl.toString()}\n`);
}