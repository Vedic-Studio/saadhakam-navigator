# Pre-Signal Execution Phase (Content + SEO)

Last Updated: 2026-03-10  
Status: Ready for execution  
Context: GSC currently has sparse URL-level visibility; use leading indicators instead of waiting for broad export coverage.

---

## 1) Why this phase exists

Current search data is still too thin for full performance-led optimization.

Observed constraints:
- GSC visibility is limited to a small URL set.
- Non-homepage pages have early or no measurable impression signal yet.
- AEO assets are implemented but prompt-test validation is still pending.

This means the right operating mode is:

> **Indexation + discoverability + answerability first, then broader optimization.**

---

## 2) Phase objective

Build first reliable proof of traction on high-intent pages using:
- controlled URL watchlists,
- answer-first page refreshes,
- highest-gap page launches,
- selective pSEO expansion on healthy templates only.

---

## 3) Workstreams

## Workstream A — Controlled validation (no dependency on broad GSC exports)

### A1. Track a priority watchlist (15–20 URLs)
Track these attributes per URL:
- in sitemap (Y/N)
- internally linked from >=3 relevant pages (Y/N)
- IndexNow submitted (date)
- GSC URL inspection requested (date)
- indexed status
- first impression date (if available)

Use: `plans/priority-url-watchlist-template.csv`

### A2. Validate GA4 event flow
Check in DebugView + standard reports:
- `faith_finder_quiz_start`
- `faith_finder_quiz_complete`
- `faith_finder_email_capture`
- `faith_finder_result_view`
- `faith_finder_result_share`
- `seo_article_read`
- `cta_click`
- `app_open`
- `path_explore`

### A3. Run AEO prompt baseline
Run prompt matrix in:
- ChatGPT
- Perplexity
- Claude
- Gemini

Log results in: `plans/aeo-prompt-testing-matrix.md`

---

## Workstream B — Refresh high-intent existing pages (answer-first rewrite pass)

Refresh in this order:
1. `/best-spiritual-path-for-beginners`
2. `/choose-between-bhakti-jnana-karma-raja-yoga`
3. `/best-meditation-style-for-your-personality`
4. `/starting-spiritual-practice`
5. `/what-is-vedanta`
6. `/advaita-vedanta-explained`
7. `/how-to-start-japa`
8. `/how-to-choose-a-mantra`
9. `/daily-spiritual-routine-beginners`

### Refresh standard (apply to each page)
- Direct answer in first 2–3 lines
- “Best for / Not best for” block where relevant
- Decision table or chooser framework
- Prompt-language FAQs
- Clear next-step CTA into Faith Finder or a related guide
- Internal links to pillar + supporting content

### Writing quality rules (content-writing-core + SEO/AEO)
- Clarity-first (Orwell): short, direct, plain language
- Specificity-first (Ogilvy): concrete claims, no vague filler
- One idea per page (core writing principle)
- Beginner-safe framing for LLM retrieval
- No guru tone; peer/practitioner tone

---

## Workstream C — Publish high-gap pages (Wave 1)

Publish these first:
1. `can-i-practice-vedanta-without-converting`
2. `can-i-chant-a-mantra-without-initiation`
3. `what-are-the-upanishads`
4. `best-bhagavad-gita-translation-for-beginners`

### Required page structure
- TL;DR answer block (60–90 words)
- Who this is for / not for
- Practical decision framework
- Objection handling section
- FAQ mapped to prompt language
- Related links to existing hubs and articles

---

## Workstream D — Selective pSEO expansion + template hardening

### Scale now
- Concept pages (`what-is-*`)
- Sanskrit lexicon pages
- Bhagavad Gita shloka pages

### Improve before scaling
- Comparison pages (thin-content cleanup, unique FAQs)
- BG chapter pages (deeper summaries + FAQ/breadcrumb schema)

### De-prioritize for now
- Practice-goal template expansion (until unique content model is defined)

---

## 4) 30-day sprint schedule

### Week 1 — Validation foundation
- initialize URL watchlist
- validate GA4 events
- run baseline AEO prompts
- submit current priority URLs via IndexNow + GSC inspection flow

### Week 2 — Refresh batch
- complete refresh of top 5 priority pages
- implement answer-first + FAQ + internal-link upgrades
- resubmit refreshed URLs

### Week 3 — Publish batch
- publish 4 high-gap pages
- interlink all new pages into hubs + conversion paths
- request indexing for each URL

### Week 4 — Scale selectively
- expand one concept + lexicon wave
- patch weak comparison and BG chapter templates
- review watchlist status and first-impression movement

---

## 5) Leading indicators (phase KPIs)

Because broad GSC exports are sparse, track these first:
- % watchlist URLs submitted and inspected
- % watchlist URLs indexed
- first impression arrival count (watchlist)
- AEO mention/citation rate (prompt matrix)
- GA4 event visibility rate (tracked events returning data)

---

## 6) Exit criteria for this phase

Move to broader optimization mode only when:
- watchlist URLs show consistent indexation and early impressions,
- GA4 tracked events are validated in production reports,
- AEO prompt tests show baseline mention/citation behavior,
- refreshed + new high-intent pages are fully interlinked and indexed.

At that point, scale can be expanded safely.
