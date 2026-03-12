import { writeFile } from "node:fs/promises";
import {
    getPriorityUrls,
    getSiteOrigin,
    splitIntoBatches,
    MAX_URLS_PER_REQUEST,
} from "./indexnow-priority-config.mjs";

const OUTPUT_PATH = "/tmp/indexnow-submit-results.json";

function sanitizeOrigin(origin) {
    try {
        return new URL(origin).origin.replace(/\/$/, "");
    } catch {
        return null;
    }
}

function extractOriginFromHint(hint) {
    if (typeof hint !== "string") return null;
    const match = hint.match(/https?:\/\/[^/"\s]+/i);
    if (!match) return null;
    return sanitizeOrigin(match[0]);
}

async function resolveSubmissionOrigin(preferredOrigin, headers) {
    const fallbackOrigin = sanitizeOrigin(preferredOrigin) || "https://www.opensadhaka.com";
    const endpoint = `${fallbackOrigin}/api/indexnow/submit`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify({ urls: ["https://invalid.example.com/diagnostic"] }),
            redirect: "follow",
        });

        const text = await response.text();
        const json = JSON.parse(text);
        const hintedOrigin = extractOriginFromHint(json?.hint);
        return hintedOrigin || fallbackOrigin;
    } catch {
        return fallbackOrigin;
    }
}

function parseArgs(argv) {
    const args = new Set(argv.slice(2));
    return {
        failOnProviderErrors: !args.has("--allow-provider-failures"),
    };
}

function formatError(error) {
    if (!(error instanceof Error)) {
        return { message: String(error) };
    }

    const details = {
        name: error.name,
        message: error.message,
        stack: error.stack,
    };

    const cause = error.cause;
    if (cause && typeof cause === "object") {
        details.cause = {
            name: cause.name,
            message: cause.message,
            code: cause.code,
            errno: cause.errno,
            syscall: cause.syscall,
            hostname: cause.hostname,
            address: cause.address,
            port: cause.port,
            stack: cause.stack,
        };
    } else if (cause) {
        details.cause = String(cause);
    }

    return details;
}

function getHeaders() {
    const headers = { "Content-Type": "application/json" };
    const token = process.env.INDEXNOW_SUBMIT_TOKEN?.trim();
    if (token) headers["x-indexnow-token"] = token;
    return headers;
}

async function submitBatch({ endpoint, batch, headers }) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ urls: batch }),
        redirect: "follow",
    });

    const text = await response.text();
    let json;
    try {
        json = JSON.parse(text);
    } catch {
        throw new Error(`Non-JSON response from ${endpoint}: ${text.slice(0, 400)}`);
    }

    return { response, json };
}

async function main() {
    const options = parseArgs(process.argv);
    const preferredOrigin = getSiteOrigin().replace(/\/$/, "");
    const headers = getHeaders();
    const siteOrigin = await resolveSubmissionOrigin(preferredOrigin, headers);
    const endpoint = `${siteOrigin}/api/indexnow/submit`;
    const hasToken = Boolean(headers["x-indexnow-token"]);

    const { urls } = getPriorityUrls(siteOrigin);
    const batches = splitIntoBatches(urls, MAX_URLS_PER_REQUEST);

    const runSummary = {
        siteOrigin,
        endpoint,
        auth: {
            hasToken,
        },
        generatedAt: new Date().toISOString(),
        totals: {
            urls: urls.length,
            batches: batches.length,
            submittedUrls: 0,
            failedProviderCalls: 0,
            successfulProviderCalls: 0,
        },
        checks: {
            allHttpOk: true,
            allJson: true,
            allResponsesWithoutErrorField: true,
            allResponsesWithInspectLinks: true,
            allProviderCallsSucceeded: true,
        },
        batchResults: [],
    };

    for (let index = 0; index < batches.length; index += 1) {
        const batch = batches[index];
        const batchNumber = index + 1;
        const entry = {
            batchNumber,
            batchSize: batch.length,
            httpStatus: null,
            ok: false,
            hasErrorField: false,
            failedProviderCalls: null,
            successfulProviderCalls: null,
            inspectLinks: 0,
            response: null,
        };

        try {
            const { response, json } = await submitBatch({ endpoint, batch, headers });
            entry.httpStatus = response.status;
            entry.ok = response.ok;
            entry.hasErrorField = Boolean(json?.error);
            entry.failedProviderCalls = Number(json?.failedProviderCalls ?? 0);
            entry.successfulProviderCalls = Number(json?.successfulProviderCalls ?? 0);
            entry.inspectLinks = Array.isArray(json?.searchConsole?.requestIndexingLinks)
                ? json.searchConsole.requestIndexingLinks.length
                : 0;
            entry.response = json;

            runSummary.totals.submittedUrls += Number(json?.submittedUrls ?? 0);
            runSummary.totals.failedProviderCalls += entry.failedProviderCalls;
            runSummary.totals.successfulProviderCalls += entry.successfulProviderCalls;

            if (!entry.ok) runSummary.checks.allHttpOk = false;
            if (entry.hasErrorField) runSummary.checks.allResponsesWithoutErrorField = false;
            if (entry.inspectLinks === 0) runSummary.checks.allResponsesWithInspectLinks = false;
            if (entry.failedProviderCalls > 0) runSummary.checks.allProviderCallsSucceeded = false;
        } catch (error) {
            runSummary.checks.allJson = false;
            runSummary.checks.allHttpOk = false;
            runSummary.checks.allResponsesWithoutErrorField = false;
            runSummary.checks.allResponsesWithInspectLinks = false;
            runSummary.checks.allProviderCallsSucceeded = false;
            const errorDetails = formatError(error);
            entry.response = {
                error: errorDetails.message,
                errorDetails,
            };
        }

        runSummary.batchResults.push(entry);
    }

    await writeFile(OUTPUT_PATH, JSON.stringify(runSummary, null, 2));

    console.log(`# IndexNow priority submit run`);
    console.log(`siteOrigin: ${runSummary.siteOrigin}`);
    console.log(`endpoint: ${runSummary.endpoint}`);
    console.log(`batches: ${runSummary.totals.batches}`);
    console.log(`submittedUrls: ${runSummary.totals.submittedUrls}/${runSummary.totals.urls}`);
    console.log(`providerCalls: ok=${runSummary.totals.successfulProviderCalls} failed=${runSummary.totals.failedProviderCalls}`);
    console.log(`output: ${OUTPUT_PATH}`);
    console.log(`checks: ${JSON.stringify(runSummary.checks)}`);

    for (const result of runSummary.batchResults) {
        console.log(
            `batch ${result.batchNumber}: status=${result.httpStatus ?? "ERR"} ok=${result.ok} ` +
            `errorField=${result.hasErrorField} inspectLinks=${result.inspectLinks} ` +
            `failedProviderCalls=${result.failedProviderCalls ?? "ERR"}`,
        );
    }

    const stopForErrorField = !runSummary.checks.allResponsesWithoutErrorField;
    const stopForHttp = !runSummary.checks.allHttpOk;
    const stopForInspectLinks = !runSummary.checks.allResponsesWithInspectLinks;
    const stopForProviderCalls = options.failOnProviderErrors && !runSummary.checks.allProviderCallsSucceeded;

    if (stopForErrorField || stopForHttp || stopForInspectLinks || stopForProviderCalls) {
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error instanceof Error ? error.stack : String(error));
    process.exit(1);
});
