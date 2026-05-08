/**
 * Pure helpers for the Google Indexing API submit script.
 *
 * Kept Node-fs-free so they can be unit-tested in vitest without I/O.
 */

export const VALID_TYPES = new Set(["URL_UPDATED", "URL_DELETED"]);

export function parseSubmitArgs(argv) {
  const args = argv.slice(2);
  const out = {
    urls: [],
    fromFile: null,
    type: "URL_UPDATED",
    usePriorityList: false,
    dryRun: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--url" || a === "-u") {
      const v = args[++i];
      if (!v) throw new Error(`${a} requires a URL value`);
      out.urls.push(v);
    } else if (a === "--from" || a === "-f") {
      const v = args[++i];
      if (!v) throw new Error(`${a} requires a file path`);
      out.fromFile = v;
    } else if (a === "--type" || a === "-t") {
      const v = args[++i];
      if (!VALID_TYPES.has(v)) {
        throw new Error(`--type must be one of: ${[...VALID_TYPES].join(", ")}`);
      }
      out.type = v;
    } else if (a === "--priority") {
      out.usePriorityList = true;
    } else if (a === "--dry-run" || a === "-n") {
      out.dryRun = true;
    } else if (a === "--help" || a === "-h") {
      out.help = true;
    } else if (a.startsWith("--")) {
      throw new Error(`Unknown flag: ${a}`);
    } else {
      out.urls.push(a);
    }
  }

  return out;
}

export function normalizeUrlList(rawUrls) {
  const seen = new Set();
  const out = [];
  for (const raw of rawUrls) {
    const trimmed = String(raw).trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;
    if (seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}

export function validateUrls(urls) {
  const errors = [];
  for (const url of urls) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        errors.push({ url, reason: `unsupported protocol: ${parsed.protocol}` });
      }
    } catch {
      errors.push({ url, reason: "not a valid URL" });
    }
  }
  return errors;
}

export function buildPublishBody(url, type) {
  if (!VALID_TYPES.has(type)) {
    throw new Error(`Invalid type: ${type}`);
  }
  return { url, type };
}

export function summarizeResponses(responses) {
  let ok = 0;
  let failed = 0;
  const failures = [];
  for (const r of responses) {
    if (r.ok) ok++;
    else {
      failed++;
      failures.push({ url: r.url, status: r.status, error: r.error });
    }
  }
  return { ok, failed, total: ok + failed, failures };
}

export const INDEXING_API_QUOTA_PER_DAY = 200;

export function checkQuotaWarning(count) {
  if (count > INDEXING_API_QUOTA_PER_DAY) {
    return `Submitting ${count} URLs exceeds the default daily quota of ${INDEXING_API_QUOTA_PER_DAY}. Excess calls will fail with quota errors.`;
  }
  if (count > INDEXING_API_QUOTA_PER_DAY * 0.75) {
    return `Submitting ${count} URLs uses ${Math.round((count / INDEXING_API_QUOTA_PER_DAY) * 100)}% of the daily quota.`;
  }
  return null;
}
