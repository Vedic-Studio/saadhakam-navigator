import { describe, it, expect } from "vitest";
import {
  parseSubmitArgs,
  normalizeUrlList,
  validateUrls,
  buildPublishBody,
  summarizeResponses,
  checkQuotaWarning,
  resolveAuthMode,
  buildAuthHeaders,
  DEFAULT_QUOTA_PROJECT,
  VALID_TYPES,
  INDEXING_API_QUOTA_PER_DAY,
} from "./google-indexing-helpers.mjs";

describe("parseSubmitArgs", () => {
  const wrap = (args) => parseSubmitArgs(["node", "script.mjs", ...args]);

  it("returns defaults when given no args", () => {
    expect(wrap([])).toEqual({
      urls: [],
      fromFile: null,
      type: "URL_UPDATED",
      usePriorityList: false,
      dryRun: false,
      help: false,
    });
  });

  it("collects positional URL args", () => {
    expect(wrap(["https://a.test/", "https://b.test/"]).urls).toEqual([
      "https://a.test/",
      "https://b.test/",
    ]);
  });

  it("supports --url flag", () => {
    expect(wrap(["--url", "https://a.test/", "--url", "https://b.test/"]).urls)
      .toEqual(["https://a.test/", "https://b.test/"]);
  });

  it("supports -u short flag", () => {
    expect(wrap(["-u", "https://a.test/"]).urls).toEqual(["https://a.test/"]);
  });

  it("supports --from / -f file flag", () => {
    expect(wrap(["--from", "urls.txt"]).fromFile).toBe("urls.txt");
    expect(wrap(["-f", "urls.txt"]).fromFile).toBe("urls.txt");
  });

  it("accepts URL_DELETED for --type", () => {
    expect(wrap(["--type", "URL_DELETED"]).type).toBe("URL_DELETED");
  });

  it("rejects invalid --type", () => {
    expect(() => wrap(["--type", "URL_BOGUS"])).toThrow(/--type must be one of/);
  });

  it("toggles --priority flag", () => {
    expect(wrap(["--priority"]).usePriorityList).toBe(true);
  });

  it("toggles --dry-run / -n", () => {
    expect(wrap(["--dry-run"]).dryRun).toBe(true);
    expect(wrap(["-n"]).dryRun).toBe(true);
  });

  it("toggles --help / -h", () => {
    expect(wrap(["--help"]).help).toBe(true);
    expect(wrap(["-h"]).help).toBe(true);
  });

  it("rejects an unknown flag", () => {
    expect(() => wrap(["--bogus"])).toThrow(/Unknown flag/);
  });

  it("errors when --url has no value", () => {
    expect(() => wrap(["--url"])).toThrow(/requires a URL value/);
  });

  it("errors when --from has no value", () => {
    expect(() => wrap(["--from"])).toThrow(/requires a file path/);
  });
});

describe("normalizeUrlList", () => {
  it("trims whitespace", () => {
    expect(normalizeUrlList(["  https://a.test/  "])).toEqual(["https://a.test/"]);
  });

  it("drops empty strings", () => {
    expect(normalizeUrlList(["", "https://a.test/", "  "])).toEqual(["https://a.test/"]);
  });

  it("drops duplicate URLs preserving first-seen order", () => {
    expect(normalizeUrlList([
      "https://a.test/",
      "https://b.test/",
      "https://a.test/",
    ])).toEqual(["https://a.test/", "https://b.test/"]);
  });

  it("ignores comment lines starting with #", () => {
    expect(normalizeUrlList(["# notes", "https://a.test/"])).toEqual(["https://a.test/"]);
  });
});

describe("validateUrls", () => {
  it("returns no errors for valid http(s) URLs", () => {
    expect(validateUrls(["https://a.test/", "http://b.test/"])).toEqual([]);
  });

  it("flags non-URL strings", () => {
    const errors = validateUrls(["not a url"]);
    expect(errors).toHaveLength(1);
    expect(errors[0].reason).toBe("not a valid URL");
  });

  it("flags non-http protocols", () => {
    const errors = validateUrls(["ftp://a.test/"]);
    expect(errors).toHaveLength(1);
    expect(errors[0].reason).toContain("unsupported protocol");
  });
});

describe("buildPublishBody", () => {
  it("builds the URL_UPDATED body shape Google's API expects", () => {
    expect(buildPublishBody("https://a.test/", "URL_UPDATED")).toEqual({
      url: "https://a.test/",
      type: "URL_UPDATED",
    });
  });

  it("supports URL_DELETED", () => {
    expect(buildPublishBody("https://a.test/", "URL_DELETED").type).toBe("URL_DELETED");
  });

  it("rejects an invalid type", () => {
    expect(() => buildPublishBody("https://a.test/", "BOGUS")).toThrow(/Invalid type/);
  });
});

describe("summarizeResponses", () => {
  it("counts ok and failed responses", () => {
    const summary = summarizeResponses([
      { url: "https://a.test/", ok: true },
      { url: "https://b.test/", ok: false, status: 429, error: "Quota exceeded" },
      { url: "https://c.test/", ok: true },
    ]);
    expect(summary.ok).toBe(2);
    expect(summary.failed).toBe(1);
    expect(summary.total).toBe(3);
    expect(summary.failures).toEqual([
      { url: "https://b.test/", status: 429, error: "Quota exceeded" },
    ]);
  });

  it("returns zeros for empty list", () => {
    expect(summarizeResponses([])).toEqual({
      ok: 0,
      failed: 0,
      total: 0,
      failures: [],
    });
  });
});

describe("checkQuotaWarning", () => {
  it("returns null when under 75% of quota", () => {
    expect(checkQuotaWarning(100)).toBeNull();
  });

  it("warns when over 75% of quota", () => {
    expect(checkQuotaWarning(160)).toMatch(/of the daily quota/);
  });

  it("warns when exceeding the daily quota", () => {
    const msg = checkQuotaWarning(INDEXING_API_QUOTA_PER_DAY + 1);
    expect(msg).toMatch(/exceeds the default daily quota/);
  });
});

describe("VALID_TYPES", () => {
  it("only accepts the two Google-supported notification types", () => {
    expect([...VALID_TYPES].sort()).toEqual(["URL_DELETED", "URL_UPDATED"]);
  });
});

describe("resolveAuthMode", () => {
  it("defaults to service-account when GSC_AUTH is unset", () => {
    expect(resolveAuthMode({})).toEqual({ mode: "sa", quotaProject: null });
  });

  it("defaults to service-account when GSC_AUTH is something other than 'adc'", () => {
    expect(resolveAuthMode({ GSC_AUTH: "sa" })).toEqual({ mode: "sa", quotaProject: null });
    expect(resolveAuthMode({ GSC_AUTH: "ADC" })).toEqual({ mode: "sa", quotaProject: null });
  });

  it("selects ADC mode when GSC_AUTH=adc and uses the default quota project", () => {
    expect(resolveAuthMode({ GSC_AUTH: "adc" })).toEqual({
      mode: "adc",
      quotaProject: DEFAULT_QUOTA_PROJECT,
    });
  });

  it("prefers GOOGLE_CLOUD_PROJECT over GSC_QUOTA_PROJECT for the quota project", () => {
    expect(
      resolveAuthMode({
        GSC_AUTH: "adc",
        GOOGLE_CLOUD_PROJECT: "from-gcp",
        GSC_QUOTA_PROJECT: "from-gsc",
      }),
    ).toEqual({ mode: "adc", quotaProject: "from-gcp" });
  });

  it("falls through to GSC_QUOTA_PROJECT when GOOGLE_CLOUD_PROJECT is unset", () => {
    expect(
      resolveAuthMode({ GSC_AUTH: "adc", GSC_QUOTA_PROJECT: "from-gsc" }),
    ).toEqual({ mode: "adc", quotaProject: "from-gsc" });
  });
});

describe("buildAuthHeaders", () => {
  it("returns bearer + content-type for SA mode without quota-project header", () => {
    const headers = buildAuthHeaders("token-xyz", { mode: "sa", quotaProject: null });
    expect(headers).toEqual({
      Authorization: "Bearer token-xyz",
      "Content-Type": "application/json",
    });
    expect(headers["x-goog-user-project"]).toBeUndefined();
  });

  it("adds x-goog-user-project header for ADC mode", () => {
    expect(buildAuthHeaders("token-xyz", { mode: "adc", quotaProject: "sadhaka-seo" })).toEqual({
      Authorization: "Bearer token-xyz",
      "Content-Type": "application/json",
      "x-goog-user-project": "sadhaka-seo",
    });
  });

  it("omits x-goog-user-project for ADC mode when quotaProject is falsy", () => {
    const headers = buildAuthHeaders("token-xyz", { mode: "adc", quotaProject: null });
    expect(headers["x-goog-user-project"]).toBeUndefined();
  });

  it("handles a missing authMode argument as if it were SA", () => {
    expect(buildAuthHeaders("token-xyz")).toEqual({
      Authorization: "Bearer token-xyz",
      "Content-Type": "application/json",
    });
  });
});
