# Agent module 08 — GA4 AI Channels

> **When to use this module**: setting up or auditing measurement of AI-engine traffic (ChatGPT, Perplexity, Claude, Gemini, Copilot, etc.) for opensadhaka.com.

This module is a runbook. It assumes the analytics scripts already exist (`scripts/ga4-pull-snapshot.mjs`, `src/lib/analytics/google.ts`) and the canonical engine catalog lives in `src/lib/analytics/ai-engines.ts`. If those change, edit them — do not duplicate engine lists in new files.

---

## 1. Why a dedicated AI channel matters

Without a custom channel, AI-engine traffic is bucketed into either **Referral** (when the engine passes a clean referrer) or **Direct** (when it doesn't). That makes it invisible inside GA4's default channel reporting and impossible to compare against organic search or social.

The fix is two pieces:

1. **A Custom Channel Group** in GA4 named `AI` that pulls all known LLM referrers into one row across every report.
2. **A UTM discipline** on any URL Sadhaka places into an AI context (system prompts, AI marketplace listings, "share to ChatGPT" buttons), so even referrer-less traffic shows up clearly.

The canonical source list is `src/lib/analytics/ai-engines.ts`. The regex it exports (`AI_CHANNEL_REGEX`) is the value to paste into the GA4 Channel Group config.

---

## 2. One-time GA4 console setup (manual, ~15 min)

### Step 2.1 — Set `GA4_PROPERTY_ID`

```bash
# .env.local (gitignored)
GA4_PROPERTY_ID=526473437          # opensadhaka.com — confirmed via Admin
GOOGLE_SERVICE_ACCOUNT_FILE=.data/google-service-account.json
```

Verify:

```bash
node scripts/ga4-pull-snapshot.mjs --check
# expected: [ga4-check] ✓ property 526473437 = opensadhaka.com (Asia/Kolkata)
```

If `--check` errors with a 403, grant the service account `Viewer` on the property at `Admin → Property Access Management`.

### Step 2.2 — Create the `AI` Custom Channel Group

1. Open GA4 → **Admin** → property column → **Channel groups** → **Create new channel group** (or edit "Default Channel Group" if you want it propagated to standard reports).
2. **Add channel** → name `AI`.
3. **Add condition**:
   - Field: `Session source`
   - Match type: `matches regex`
   - Value: paste the output of:
     ```bash
     node -e 'import("./src/lib/analytics/ai-engines.ts").then(m => console.log(m.AI_CHANNEL_REGEX))'
     ```
     (or build the project and copy from the bundled output)
4. **Save**. Position the `AI` channel **above** `Referral` and `Direct` so it captures matches before they fall into those buckets.

### Step 2.3 — Save an Exploration

This is the day-to-day dashboard you'll read.

1. GA4 → **Explore** → blank exploration → name `AI traffic`.
2. **Dimensions** to import: `Session source`, `Session medium`, `Landing page + query string`, `Device category`, `Country`, `Session campaign`.
3. **Metrics** to import: `Sessions`, `Engaged sessions`, `Average engagement time per session`, `Conversions`, `New users`, `Engagement rate`.
4. **Free-form rows**: `Session source` (primary), `Landing page + query string` (secondary). Add a **Filter**: `Session source` `matches regex` with the same value you pasted in 2.2.
5. **Save and share** with the team workspace.

### Step 2.4 — Mark conversions you care about

If not already conversion-marked, mark these events as conversions (Admin → Events → Mark as conversion):

- `faith_finder_quiz_complete`
- `faith_finder_email_capture`
- `email_capture` (newsletter)
- `view_search_results` (if present)

These are the events that let you compare AI-traffic conversion rate to organic-search conversion rate.

---

## 3. Pull cadence and outputs

`scripts/ga4-pull-snapshot.mjs` already imports the same engine list (via the inline `AI_ENGINES` array — keep it in sync with `src/lib/analytics/ai-engines.ts` if you ever extend the catalog).

```bash
npm run analytics:snapshot:ga4 -- --days 28
npm run analytics:snapshot:ga4 -- --days 90
```

This writes:

- `docs/analytics-snapshots/YYYY-MM-DD-ga4-overview-{N}d.json` — overall property summary
- `docs/analytics-snapshots/YYYY-MM-DD-ga4-ai-referrers.json` — only on the 28-day run, the AI-only breakdown

Weekly cadence:

```bash
# Monday morning, ~30s
npm run analytics:snapshot:ga4 -- --days 28
GSC_AUTH=adc node scripts/gsc-diagnose.mjs > docs/analytics-snapshots/$(date +%Y-%m-%d)-gsc-diagnose.txt
```

---

## 4. UTM discipline for proactive AI seeding

When you intentionally surface a Sadhaka URL inside an AI context where the referrer may not arrive cleanly (system prompts, custom GPTs, Anthropic Projects, AI marketplace listings, "share to ChatGPT" buttons), tag the URL.

**Convention**:

```
https://www.opensadhaka.com/<path>?utm_source=ai-chatgpt&utm_medium=ai&utm_campaign=<surface>
```

Source values follow `AI_UTM_SOURCE_PREFIX + engine.id` from `src/lib/analytics/ai-engines.ts` — e.g. `ai-chatgpt`, `ai-perplexity`, `ai-claude`, `ai-gemini`, `ai-copilot`.

Campaign values describe the *surface*, not the engine:

- `system-prompt` — when the URL is hard-coded into an agent / custom GPT
- `marketplace-listing` — a GPT in the OpenAI GPT Store, an Anthropic Project, a Perplexity Space
- `share-button` — a "Share to ChatGPT" or "Open in Perplexity" link
- `reddit-answer` — a Reddit answer that intentionally invokes an AI to compare/cite us
- `manual-prompt` — example prompts we publish that include the URL

These campaign values become the **Session campaign** dimension in GA4, so the Exploration table breaks AI traffic down by surface.

---

## 5. KPIs to track (weekly)

| KPI | Source | Target trajectory |
|---|---|---|
| AI-channel sessions (28d) | GA4 Custom Channel Group | 0 → 100+/week by week 12 |
| AI-channel share of organic | GA4 (AI sessions ÷ Organic sessions) | 0% → 5–10% by month 6 |
| AI-traffic engagement rate vs organic | GA4 Exploration | ≥ organic baseline (AEO case studies show 30% higher) |
| AI-traffic conversion rate vs organic | GA4 conversion events | Match or beat organic |
| AI referrers by engine (chatgpt / perplexity / claude / etc.) | `ai-referrers.json` snapshot | At least 3 engines actively referring by month 3 |

---

## 6. Common pitfalls (do not relitigate)

- **GA4 default channel groups can't be edited.** You must create a Custom Channel Group, then optionally use it as the *primary* channel group via Admin → Reports → Reporting identity (rare — usually leave default in place and read from the custom group in Explorations).
- **`Session source` is the right dimension, not `Source / Medium`.** Source/medium concatenates and breaks regex matching on the source portion.
- **Bing's chat traffic uses `bing.com/chat`, not just `bing.com`.** Plain `bing.com` is search — do NOT include it in the AI regex.
- **Claude.com vs claude.ai**: both are first-party Anthropic. The list catches both.
- **Don't add bot user agents to the regex** (e.g., `ChatGPT-User`, `OAI-SearchBot`). Those are crawler hits, not human traffic — filter them at robots.txt instead (see `public/robots.txt`).

---

## 7. Resume prompt

```
Read docs/agents/08-ga4-ai-channels.md.

Audit the current GA4 setup:
1. Run `node scripts/ga4-pull-snapshot.mjs --check` — confirm property reachable.
2. Pull a 28-day snapshot — confirm ai-referrers.json lands.
3. Open the GA4 console, verify the AI custom channel group exists with the regex from `AI_CHANNEL_REGEX`.
4. Verify the AI traffic exploration is saved with the dimensions in §2.3.
5. Report what is missing and ship the gap (regex update, new exploration, missing GA4_PROPERTY_ID).

Output: a 5-line status to docs/analytics-snapshots/$(date)-ga4-channels-audit.md.
```
