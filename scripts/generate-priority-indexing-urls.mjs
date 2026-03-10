import {
    getPriorityUrls,
    getSiteOrigin,
    MAX_URLS_PER_REQUEST,
    splitIntoBatches,
} from "./indexnow-priority-config.mjs";

const siteOrigin = getSiteOrigin();
const property = `sc-domain:${new URL(siteOrigin).host}`;
const { groups: priorityGroups, urls } = getPriorityUrls(siteOrigin);
const batches = splitIntoBatches(urls, MAX_URLS_PER_REQUEST);

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