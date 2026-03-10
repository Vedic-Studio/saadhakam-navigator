const DEFAULT_SITE_ORIGIN = "https://opensadhaka.com";

function resolveSiteOrigin() {
    return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_ORIGIN;
}

async function fetchJsonWithRedirect(url) {
    const response = await fetch(url, { redirect: "follow" });
    const text = await response.text();

    let json;
    try {
        json = JSON.parse(text);
    } catch {
        throw new Error(`Expected JSON from ${url}, got: ${text.slice(0, 300)}`);
    }

    return { response, json };
}

async function fetchTextWithRedirect(url) {
    const response = await fetch(url, { redirect: "follow" });
    const text = await response.text();
    return { response, text };
}

function fail(message, details) {
    console.error(`❌ ${message}`);
    if (details) {
        console.error(details);
    }
    process.exit(1);
}

async function main() {
    const siteOrigin = resolveSiteOrigin().replace(/\/$/, "");
    const submitUrl = `${siteOrigin}/api/indexnow/submit`;

    console.log(`# IndexNow production readiness check\n`);
    console.log(`siteOrigin: ${siteOrigin}`);
    console.log(`submitEndpoint: ${submitUrl}\n`);

    const { response, json } = await fetchJsonWithRedirect(submitUrl);

    if (!response.ok) {
        fail(`Submit endpoint returned HTTP ${response.status}`, JSON.stringify(json, null, 2));
    }

    if (!json?.configured) {
        fail("IndexNow is not configured in production (configured=false)", JSON.stringify(json, null, 2));
    }

    if (!json?.keyVerificationUrl) {
        fail("Missing keyVerificationUrl in submit endpoint response", JSON.stringify(json, null, 2));
    }

    const { response: keyResponse, text: keyBody } = await fetchTextWithRedirect(json.keyVerificationUrl);
    if (!keyResponse.ok) {
        fail(`Key verification URL returned HTTP ${keyResponse.status}`, json.keyVerificationUrl);
    }

    if (!keyBody.trim()) {
        fail("Key verification URL returned empty body", json.keyVerificationUrl);
    }

    console.log("✅ IndexNow production readiness check passed");
    console.log(`configured: ${json.configured}`);
    console.log(`keyVerificationUrl: ${json.keyVerificationUrl}`);
    console.log(`keyBodyLength: ${keyBody.trim().length}`);
}

main().catch((error) => {
    fail("Unhandled check error", error instanceof Error ? error.stack : String(error));
});
