---
name: llm-indexing
version: 2.0.0
description: Fast indexing pipelines (IndexNow, Google Indexing API) and LLM directory submission for opensadhaka.com. The `/llms.txt`, `/llms-full.txt`, and `/api/llm-content` routes are already deployed — this skill covers what is NOT yet automated. Triggers on "IndexNow", "Google Indexing API", "fast indexing", "submit site to ChatGPT", "LLM directory submission".
---

# Fast Indexing & LLM Directory Submission

You are an expert in technical SEO infrastructure for instantaneous indexing and AI-engine discoverability. Sadhaka already has the core LLM files deployed — this skill covers the remaining automation gaps.

## Current State (Already Implemented)

The following are **already in place** in Sadhaka — do not re-implement:

| Asset | Location | Maintained By |
|---|---|---|
| `/llms.txt` | `src/app/llms.txt/route.ts` | Auto-generated from `src/data/articles.ts` |
| `/llms-full.txt` | `src/app/llms-full.txt/route.ts` | Auto-generated from all data files |
| `/api/llm-content` | `src/app/api/llm-content/route.ts` | Per-entity Markdown by type+slug |
| `robots.txt` | `public/robots.txt` | Allows `/`, points to sitemap + LLM files |

See `docs/agents/04-seo-indexing.md` §"LLM Architecture" for maintenance rules (when to update, what to verify after deploy).

**What this skill covers**: IndexNow, Google Indexing API, and LLM directory submission — the parts that are NOT yet automated.

## 1. IndexNow (Bing, Yandex, DuckDuckGo)

Sadhaka already has IndexNow wired: `npm run indexnow:submit:prod` runs `scripts/submit-priority-indexnow.mjs` against `scripts/indexnow-priority-config.mjs`.

### Action Plan — Maintenance
1. **After publishing new content**: edit `scripts/indexnow-priority-config.mjs` to add new slugs to the appropriate priority tier.
2. **After deploy confirms live**: run `npm run indexnow:submit:prod`, then `npm run indexnow:check:prod` to verify submission.
3. **Key file**: the IndexNow key file is already hosted at the site root — do not regenerate unless the key is compromised.

### If IndexNow is broken
- Verify the key file still resolves: `curl https://www.opensadhaka.com/<key>.txt` should return the key string
- Check `scripts/submit-priority-indexnow.mjs` for rate-limit handling
- IndexNow returns 202 on success, 400 on invalid key, 422 on URL mismatch

## 2. Google Indexing API

**Status**: Not yet set up. Google Indexing API gives immediate indexing for eligible content (officially only for `JobPosting` and `BroadcastEvent` schemas, but in practice Google also honors it for other pages on trusted domains).

### Action Plan — Initial Setup (one-time)
1. Create a Google Cloud Platform (GCP) project for Sadhaka
2. Enable "Web Search Indexing API"
3. Create a Service Account and download the JSON key
4. Add the Service Account email as an **Owner** in Google Search Console for `opensadhaka.com`
5. Store the JSON key securely (environment variable, not committed)
6. Write or adapt a submission script following the pattern of `scripts/submit-priority-indexnow.mjs` — same priority config file, different submission endpoint
7. Constraint: 200 URLs/day limit per service account. For larger batches, rotate multiple service accounts or prioritize the highest-value URLs.

### Integration with existing pipeline
- Add a new npm script: `"indexing:google:submit"` alongside the existing IndexNow scripts
- Consider a unified `"indexing:submit:all"` that runs IndexNow + Google Indexing API in sequence
- Both should read from the same `scripts/indexnow-priority-config.mjs` source of truth

## 3. LLM Directory Submission

Once Sadhaka's `/llms.txt` is stable (it is), the site should be submitted to community directories that AI crawlers reference.

### Action Plan
1. Submit to [llmstxt.site](https://llmstxt.site/) — accepts URL submission of the `/llms.txt` file
2. Submit to [directory.llmstxt.cloud](https://directory.llmstxt.cloud/) — LLM-friendly directory
3. Verify submission by re-fetching the directory page and confirming Sadhaka is listed
4. Log the submission date in the editorial calendar — revisit quarterly to confirm Sadhaka is still listed

These are manual, one-time submissions. No code changes required.

## 4. ChatGPT / Perplexity / Claude Crawler Verification

Periodically verify the major AI crawlers are actually reaching Sadhaka:

- **GPTBot** (OpenAI) — check Vercel / Cloudflare logs for the user agent `GPTBot/1.x`
- **PerplexityBot** — user agent `PerplexityBot/1.0`
- **ClaudeBot** — user agent `ClaudeBot/1.0`
- **Google-Extended** — opt-in for Google's Gemini/Bard training (Sadhaka should allow this)
- **Amazonbot** — for Alexa Q&A
- **Applebot-Extended** — for Apple Intelligence

See `references/llm-crawlers.md` for the full current list and how each respects `robots.txt`.

### Action Plan
1. Once per quarter, query the server logs for each AI crawler user agent
2. If any expected crawler is NOT showing up: check `public/robots.txt` isn't accidentally blocking, verify the `/llms.txt` link is still in the robots comments
3. If a NEW AI crawler emerges (this space moves fast): add it to `references/llm-crawlers.md` and verify `robots.txt` allows it by default

## Task-Specific Questions

When invoking this skill, start by asking:
1. Is this about IndexNow, Google Indexing API, LLM directory submission, or crawler verification?
2. Are we adding new URLs to an existing pipeline, or setting up a new indexing channel?
3. Is there a specific deployment that just went live and needs submission?

## References

- `references/llm-crawlers.md` — list of AI crawler user agents and robots.txt behavior
- `references/llms-txt-template.md` — historical reference for the llms.txt format (Sadhaka's implementation is already deployed; template kept for reference)
- `docs/agents/04-seo-indexing.md` — canonical operational reference for SEO, sitemap, and LLM architecture
- `scripts/indexnow-priority-config.mjs` — the priority URL list shared by all indexing submissions
- `scripts/submit-priority-indexnow.mjs` — existing IndexNow submission script to model Google Indexing API work on
