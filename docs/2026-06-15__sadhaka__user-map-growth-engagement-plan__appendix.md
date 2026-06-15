# Appendix — Working Analysis Behind the June 2026 User-Map & Growth Plan
> Raw output of the 9-agent workflow (3 analytical lenses, persona synthesis, 2 strategy tracks, adversarial verification). This is the unedited reasoning trail. **The committed plan is [the v1 doc](2026-06-15__sadhaka__user-map-growth-engagement-plan__v1.md)**, which supersedes any figure here with the QC-corrected numbers (Faith Finder email ~8 not ~16; Cluster A ~313 not ~360; +120 committed vs +387 north-star).

---

## Verification verdicts (gates D1–D6)

### Track: traffic — PASS
- **D1 [minor]** Every quantitative claim traces to a fact-base literal. I independently reproduced: 17,970x3.0%=539; +387; 13.8/day; 5.4/day; brand 121+5+19+13=158x8%=12.6; navagraha sum 313; shloka-46 73; darshanas 51 — all exact. Two NON-fact-base citations appear ('citation share ~33%', 'ai-seo Pillar 1') sourced to an external framework, not the fact base. They don't anchor any target, so minor — but the brief restricts sources to the fact base + essentials, so they should be dropped or relabeled as method, not data.
- **D2 [pass]** The 3 meta-audiences (Practitioner/Student/Civilizational) are lifted verbatim from fact-base diagnosis #4 and each is tied to real clusters: Practitioner->A(mantras)+G(panchang)+F(japa), Student->B(terms)+C/D(verses), Civilizational->E(rakhigarhi/harappa). No generic 'spiritual seeker' archetype invented. Grounded.
- **D3 [pass]** All funnel rates arithmetically correct vs the 90d events funnel: read->act 25/569=4.39% (stated 4.4%); quiz 22->11=50%; email 4 users/11 starters=36.4% (stated ~36%). Matches fact-base lines 42-43 exactly.
- **D4 [minor]** Every target is a real striking-distance or zero-click-high-impression page at the stated volume/position (rakhigarhi 384/pos4.2, om-bram 934/0.6%/pos7.6, japa 471/pos10.8, shukla 448/0.2%, brihadratha 322/pos8.0, bg6.11 284/pos8.1, ashtavakra 230/pos8.8, om-hram 311/pos8.9 — all confirmed). Per-page deltas all reproduce. Two trivial rounding slips: 'combined ~3,290 impr' actually sums to 3,384; the 8 table deltas sum to 103, not the stated +100. Harmless but should be corrected for honesty. Rakhigarhi 0%->8% is the most aggressive single target (others use 3%) and is asserted without justification for the higher ceiling.
- **D5 [pass]** Every play names a specific cluster/page/behavior: CTR rescue->the 8 named pages; brand page->cluster H+B; AudioObject->cluster A transactional 'chant now' intent; verse hub->cluster C (shloka-83 4.5% template); panchang programmatic->cluster G daily-recurring + vedic-clock sticky model (102sec/0.10); darshanas->'number of classical darshanas are' 40; leaky repair->named bounce-1.0 pages + Faith Finder (11 starts). No orphan feature.
- **D6 [minor]** Plan is impact-x-effort sized (S/M/L) and time-phased (0-4/4-8/8-12wks) with per-item measurable targets (e.g. 'shukla 0.2%->2%', '10-mantras pos13->8'). The defect: the headline through-line target is sitewide CTR 0.85%->3.0% = +387 clk, but the itemized plays quantify only ~+120 clicks total (Phase0 +100, brand +12, shukla +8); the named pages are ~20% of the 17,970 sitewide impressions, so +387 implicitly depends on a long tail the plan never enumerates. The plan hedges by calling it 'consistent with §6.1', but presenting +387 as the target while building a path to ~+120 is a target-honesty gap. Phases 4-8 and the leaky-repair item also lack a click-denominated target, only directional ones.

**Required corrections (applied to v1):**
- Reconcile the headline. Either (a) relabel '0.85%->3.0% / +387 clk' explicitly as a sitewide ASPIRATION/north-star and state the itemized plays deliver ~+120 quantified clicks in-scope, or (b) add the long-tail page set that closes the +267 gap. Do not present +387 as the deliverable when only ~+120 is built.
- Fix the two rounding slips: Phase-0 eight-page deltas sum to +103 (not +100); 'combined ~3,290 impr' should read ~3,384. Use the real sums.
- Justify or downgrade rakhigarhi 0%->8% to the 3% used elsewhere; if 8% stands, state why (e.g. pos 4.2 is materially better than the pos 8 cohort, so a higher CTR ceiling is defensible — say that explicitly).
- Remove or re-source the two non-fact-base citations ('citation share ~33%', 'ai-seo Pillar 1') — present them as method, not data, since the brief restricts evidence to the fact base.
- Add a click-denominated target to Phases 4-8 (e.g. navagraha hub cluster-A impressions x 3% = a concrete click number) so every phase has a measurable click target, not just directional CTR/position goals.

### Track: engagement — FAIL (corrected in v1)
- **D1 [minor]** Almost all numbers trace correctly to the fact base (funnel users, cluster volumes, page impr/CTR/pos all verified). One unsupported projection: P2-a / §4 'captures 4->25-40/90d (6-10x)' is asserted ('realistically compounds') with no derivation shown. The '~99.5% first sessions' is computable (963/968) but is stitched next to app_open 913, loosely mixing denominators. The underlying retention-absent conclusion is itself directly backed by FB line 44, so this is minor not fail.
- **D2 [pass]** Practitioner / Student / Civilizational personas mirror FB line 117 exactly, with identical cluster-to-persona assignments (Practitioner=A/F/G mantras-japa-panchang; Student=B/C/D terms-verses; Civilizational=E history). Each persona is tied to named query clusters and specific page behaviors (e.g. Practitioner->om-bram-brim 163 / 934-impr page; Civilizational->rakhigarhi 384 impr). Not generic archetypes.
- **D3 [fail]** Email projection is arithmetically wrong. The 36% rate = 4 email-users / 11 COMPLETERS (email-per-completer), but §2 and §4 apply it directly to STARTERS to claim 'email-capturers 4->~16/90d' (45 starts x 36%). This silently drops the 50% completion step. Correct chain: 45 starts x 50% complete x (4/11 per completer) = ~8, not ~16. The mislabel ('~36% of starters') originates in FB line 43 but the strategy compounds it into a headline projection and then stacks further (P2-a '25-40/90d') on top. read->act 569->25=4.39% (rounds to 4.4%, OK); quiz discovery 11/569=1.93% (OK); 8% of 569=45.5 starts (OK). The defect is specifically the starter-vs-completer denominator on the email step.
- **D4 [pass]** Every traffic target is a real page/query at striking distance or zero-click-high-impression with the stated volume: /mantras/om-bram-brim 934 impr 0.6% pos7.6 (FB80); /jyotish/panchang/tithis/shukla-panchami 448 impr 0.2% pos10.7 (FB93); /sanatan-history/evidence/rakhigarhi 384 impr pos4.2 0clk (FB86); /what-is-maya bounce 1.0 (FB109); darshanas query 40 (FB54); shloka-46 52+21 (FB58). 0.85%->3%=3.5x clicks matches FB114. All verified.
- **D5 [minor]** Every feature names a specific observed behavior/cluster + a missing event, which is the strongest part of the doc (Today->Cluster G shukla-panchami 448/0.2%; Mala counter->Cluster A om-bram-brim + /mantras 934; Fact Cards->Cluster E rakhigarhi + result_share=1; Learning path->path_explore 25 with no completion event). One transfer error: §3 Practitioner success metric 'mantra-page action 4.4%->15%' reuses the SITEWIDE read->act rate (569->25) as if it were a mantra-page-specific baseline; no mantra-page conversion baseline exists in the fact base. Target should be framed as 'establish baseline, then lift' or cite the actual /mantras CTR 0.6%.
- **D6 [pass]** Feature table is ranked P0/P1/P2 by impact x effort with explicit sequencing rationale (P0-c tracking ships first because an unmeasured loop is unverifiable; P0-a/b are on-page additions to already-ranking pages with no new-traffic dependency; P1 builds return loops on the instrumented base). Each row carries a measurable target tied to a real baseline (CTR 0.2%->2%, quiz starts 1.9%->8%, shares 1->30/90d). Time-phased and measurable.

**Required corrections (applied to v1):**
- Recompute the email funnel honestly: the 36% figure is email-per-COMPLETER (4/11), not per-starter. At 45 starts/90d the chain is 45 x 50% complete x 4/11 = ~8 email-capturers from Faith Finder, not ~16. Fix this number everywhere it appears (§2, §4, P2-a) and rebuild the 'compounds to 25-40' claim on the corrected base or delete the multiplier and state it as an untested hypothesis.
- Relabel the Faith Finder conversion consistently: '22 start -> 11 complete (50%) -> 4 email-users (36% of completers, 18% of starters).' Do not write '36% of starters.'
- Reframe the Practitioner success metric: 4.4% is the sitewide read->act rate, not a mantra-page baseline. Either set the target against the real /mantras CTR (0.6%) or state 'baseline TBD via mantra_audio_play, then target X%.'
- Add the derivation (or remove the precision) for any projected number that isn't a direct fact-base value or a shown calculation: '25-40 captures/90d', '~30 shares/90d', and the 8% discovery target should each be labeled as a target/assumption with the lift multiple stated (e.g. 8% = 4.1x current 1.9%), not as forecasts.

---

## Lens 1 — Discovery & Acquisition (skill: seo)

The fact base is loaded and the SEO framework is active. The data is complete enough to answer all five questions without further file reads. Producing the deliverable now.

# Discovery & Acquisition Analysis — Sadhaka

## 1. Re-cluster by JOB × volume × position × CTR — where demand is trapped

GSC 28d. "Trapped demand" = page-1 rank (pos ≤10) earning ~0 clicks. Cluster impressions are summed from the named queries in §3.

| Job | Cluster | ~Impr (28d) | Best pos | CTR now | Trapped? |
|---|---|---|---|---|---|
| **Transactional / recite** | A Mantras + C VSN verses | A ~360+ / C ~170+ | A pos 6–12; C pos 1.5–7 | A ~0%; C ~3.6–4.5% | **A = MOST trapped** (page-1, near-0 clicks) |
| **Daily-ritual** | G Panchang/tithi | ~170+ | pos 10.7 | **0.2%** | **Yes — high (recurring intent)** |
| **Identity / share** | E Sanatan-history | ~115+ | pos 2.45 | ~0% | **Yes — severe** (rakhigarhi pos 4.2, 384 impr, 0 clk) |
| **Definitional** | B Sanskrit terms | ~250+ | mixed 8–80 | low | Partial (best ones page-1) |
| **Study-reference** | D Bhagavad Gita | ~200+ | pos 50–70 | ~0% | **No — rank too weak** (page 5–7; content/links problem, not CTR) |

**Verdict:** The most trapped demand is **A (mantras)** and **E (history)** — both rank page-1 on hundreds of impressions and convert near zero. These are pure CTR problems (the click is winnable today). **D (Gita)** is NOT a CTR problem — pos 50–70 means it won't be seen regardless of snippet; deprioritize for rescue, route to a links/authority track.

---

## 2. CTR-RESCUE TARGETS — per-page why + single fix

Ranked by trapped impressions. Each: current state → why click isn't earned → the one fix.

1. **/mantras/om-bram-brim-braum-sah-budhaya-namah** — 934 impr / 6 clk / **0.6%** / pos 7.6. *Why:* transactional "chant now" intent; title is the raw mantra string (matches query but signals nothing the SERP doesn't already show — the chant is visible, so user satisfies in-SERP). *Fix:* title to deliver what SERP can't — **"Om Bram Brim Braum Sah Budhaya Namah — Meaning, 108× Audio & When to Chant (Budha Remedy)"**. Audio + count + timing are the click reasons.

2. **/sanatan-history/evidence/rakhigarhi-largest-site** — 384 impr / pos **4.2** / **0 clk**. *Why:* identity/debate intent wants a sharable number ("how much bigger than Mohenjo-daro"); the answer is likely in the meta description, so it's read in-SERP. *Fix:* title that promises specificity the snippet withholds — **"Rakhigarhi vs Mohenjo-daro: Exact Size Comparison (Hectares, Mapped)"**; move the raw number into an H2 table, not the meta. Highest-value single fix on the site (pos 4.2 = clicks are one snippet away).

3. **/jyotish/panchang/tithis/shukla-panchami** — 448 impr / **0.2%** / pos 10.7. *Why:* daily intent ("is it shukla panchami today?"); generic definitional title doesn't answer "today." *Fix:* title with live framing — **"Shukla Panchami — Today's Date, Timings & Significance"** + a top-of-page "today" date block. Daily-recurring → also the retention lever.

4. **/how-to-start-japa** — 471 impr / **0.4%** / pos 10.8. *Why:* beginner how-to, but pos 10.8 (bottom of page-1) + undifferentiated title loses to instructional competitors. *Fix:* add specificity + format signal — **"How to Start Japa: A 7-Step Beginner Routine (Mala, Mantra, Count)"**.

5. **/texts/bhagavad-gita/chapter-6/shloka-11** — 284 impr / pos 8.1 / **0 clk**. *Why:* "gita 6.11 clean place translation" (62 impr) — verse text shows in SERP; no reason to click. *Fix:* title promises more than the verse — **"Bhagavad Gita 6.11: Sanskrit, Translation & Word Meaning (Clean Place Verse)"**.

6. **/compare/ashtavakra-gita-vs-bhagavad-gita** — 230 impr / pos 8.8 / **0 clk** (and bounce 0.94 — see leaky). *Why:* comparison intent wants a verdict/table; title is a bare "X vs Y." *Fix:* **"Ashtavakra Gita vs Bhagavad Gita: 5 Key Differences (Table)"**.

7. **/sanatan-history/dynasties/brihadratha** — 322 impr / pos 8.0 / **0 clk**. *Why:* name-only title; no hook for what the searcher gains. *Fix:* add the entity payload — **"Brihadratha Dynasty: Rulers, Timeline & End of the Mauryas"**.

8. **/mantras/om-hram-hrim-hraum-sah-suryaya-namah** — 311 impr / **1.0%** / pos 8.9. *Fix:* same template as #1 (Surya remedy + audio + timing).

*Pattern across all eight: the snippet already satisfies the query (chant visible, verse visible, fact visible). The fix is to make the title promise the one thing the SERP cannot show — audio, a table, "today," word-by-word, a verdict.*

---

## 3. BRAND SERP — "sadhaka" 121 impr, pos 10.2, 0 clicks

*Diagnosis:* the term "sadhaka" is a generic Sanskrit word (a practitioner), so the SERP is dominated by dictionary/yoga-generic results and opensadhaka.com sits at pos 10 — the brand SERP is **unowned**. 121 impr / 0 clk over 28d means even people who may want the brand aren't finding it ranked. Compounding: `sadhaka ai` 13, `sadhaka meaning` 5, `sādhaka` 19 — fragmented, none owned.

*Fix (high-confidence, low-effort):*
- Build a dedicated **`/sadhaka` (or strong homepage) entity page** titled **"Sadhaka — Meaning + the Sanatan Dharma Learning Platform (opensadhaka.com)"** that both *defines the word* (captures `sadhaka meaning`, the definitional intent) and *introduces the brand* — this merges clusters B and H on one page so the generic-word searchers convert into brand awareness.
- Add **Organization + WebSite SearchAction (sitelinks searchbox) schema** + sameAs to own the branded SERP and surface sitelinks.
- *Expected effect:* brand queries (158+ combined impr) from pos 10 → top-3 is realistic for an owned exact-match-intent term; even 8% CTR ≈ 12+ clicks/28d, and it removes the credibility gap of not ranking for your own name.

---

## 4. STRIKING DISTANCE — pos 5–15 with volume worth pushing to top-3

These already rank but sit just below the fold. Ordered by impr × closeness.

| Target | State | Mechanism | Expected effect |
|---|---|---|---|
| **/10-powerful-sanskrit-mantras** | 798 impr / 2.1% / **pos 13.2** | Already the top click-earner (17 clk) yet pos 13 — add internal links from every /mantras/* page + expand to cover the A-cluster mantras it's missing; refresh title. | pos 13→8 ≈ doubles CTR baseline → ~30+ clk |
| **rakhigarhi cluster** (evidence page) | 384 impr / **pos 4.2** | CTR fix (§2 #2) needs no rank gain — clicks available now. | 0→~8% ≈ 30 clk |
| **/learn/sanskrit/advaita** | 90 impr / **pos 5.9** / 0 clk | Definitional B-cluster; pos 5.9 with 0 clk = title fix only. Template for the whole /learn/sanskrit/* set. | 0→~3% baseline |
| **/compare/raja-yoga-vs-kundalini-yoga** | 41 impr / **pos 4.9** / 0 clk | Comparison-table title fix (template #6). | small but pos-4.9 = easy |
| **/sanatan-history/dynasties/suryavansha** | 205 impr / pos 7.4 / 0 | Entity-payload title + internal links from related dynasty pages. | pos 7→top-5 plausible |
| **/stotras/vishnu-sahasranama/shloka-83 & -27** | 223 / 4.5% / pos 6.5; 168 / 3.6% / pos 7.3 | Already converting — push rank via cross-linking all VSN verses into a verse index hub; intent is "recite this exact verse." | pos 6→3 lifts CTR toward 8–10% |

Deliberately excluded: **D (Bhagavad Gita lookups)** at pos 50–70 — not striking distance; needs authority/links, not snippet work.

---

## 5. INTERNATIONAL — German/Spanish/Polish/Bengali term variants

*Verdict: real opportunity, but narrow — treat as a controlled test, not a build-out.* The variants appear only inside **cluster B (Sanskrit definitions)** — e.g. "number of classical darshanas are" 40, prakriti 25, soham 14 — where the searched *term is identical across languages* (prakriti, soham, guna are Sanskrit, not translated). That means a single English definitional page already collects the impressions; you don't need translated pages. The intent is universally "define this word."

*Action:* do **not** spin up hreflang/translated sites (no evidence of volume to justify the maintenance cost, and it would fragment authority — violates the entity-authority thesis). Instead: ensure the top-volume B terms (darshanas 40+11, prakriti 25, sankalpa 23) each have a tight definitional page with a one-line direct-answer block (AEO) so they win the international definitional impressions they already attract. Revisit hreflang only if a single non-English variant clears ~50 impr on its own. **Today: opportunity within English; translation = noise.**

---

## Ranked opportunity list (impact × effort)

1. **Mantra-cluster title rewrites (A)** — 934+311+ impr at pos 7–9, 0.6–1.0% CTR → add audio/timing/meaning to titles → **target 0.6%→3%, ~+30 clk/28d.** Highest volume, lowest effort.
2. **rakhigarhi CTR rescue (E)** — 384 impr pos 4.2 0 clk → specificity title + table → **0%→8%, ~+30 clk.** Single best per-page win.
3. **Brand SERP `/sadhaka` entity page + Org schema (H)** — 158+ impr pos 10 → **top-3, ~+12 clk** + credibility.
4. **Panchang "today" reframe (G)** — 448 impr 0.2% → **2%, ~+9 clk** AND seeds the only retention loop (daily return).
5. **/10-powerful-sanskrit-mantras refresh + internal links** — 798 impr pos 13 → **pos 8, doubles to ~30 clk.**
6. **how-to-start-japa + Gita-verse + comparison title fixes (F/D-page1/compare)** — ~1,000 combined impr at 0–0.4% → **~+25 clk** via format-signal titles.
7. **/learn/sanskrit/* definitional template (B, incl. international)** — pos 5–6, 0 clk → AEO direct-answer + title → captures the cross-language definitional impressions.

Combined, items 1–6 target roughly **+135 clicks/28d on existing rankings** — versus 152 today, i.e. ~1.9× sitewide clicks with **zero new content**, consistent with the §6 thesis that CTR (not rank) is the #1 lever.

---

## Lens 2 — On-site Behavior & Funnel (skill: analytics-tracking)

The fact base is fully loaded and the analytics-tracking framework is applied. All numbers below trace to the fact base (§ cited). Here is the deliverable.

---

# On-Site Behavior & Funnel Analysis — Sadhaka (90d events / 28d GSC)

## 1. Full Funnel + Step-to-Step Conversion

Using GA4 **users** (not event counts) for honest funnel math. Source: §2.

```
ACQUISITION (28d GSC, separate scope — do not chain to events)
 17,970 impr ─────────────────────────────────────────── §1
      │  0.85% sitewide CTR   ◄── LEAK #1 (THE crisis)
      ▼
    152 organic clicks/28d

BEHAVIOR (90d GA4 users)
 page_view ........... 927  ┃██████████████████████┃ 100%
      │ ×61.4%
 seo_article_read .... 569  ┃█████████████▌        ┃  61.4%   (healthy — content consumed)
      │ ×73.5%
 user_engagement ..... 418  ┃██████████            ┃  73.5% of readers
      │ ×33.5%   ◄── LEAK #2  (engagement → scroll)
 scroll .............. 140  ┃███▍                  ┃  33.5% of engaged / 24.6% of readers
      │ ×17.9% (of scrollers) | 4.4% (readers→cta)  ◄── LEAK #3 (THE read→act cliff)
 cta_click ........... 25   ┃▌                     ┃   4.4% of readers
 path_explore ........ 25   ┃▌                     ┃   (parallel branch, same 25 users)
      │ ×44.0%
 faith_finder_start .. 11   ┃▏                     ┃  44% of CTA-clickers, but 1.9% of readers ◄── LEAK #4 (discovery)
      │ ×63.6%
 quiz_complete ....... 7    ┃▏                     ┃  63.6% (mechanism is FINE)
      │ ×57.1%
 email_capture ....... 4    ┃▏                     ┃  57.1% of completers → 0.43% of all readers
      │ ×25%
 result_share ........ 1    ┃                      ┃  retention/loop essentially zero
```

**Biggest leaks, ranked by users lost × leverage:**

| # | Leak | Math | Users lost | Why it's #1 candidate |
|---|------|------|-----------|----------------------|
| **1** | **SERP CTR** | 17,970 impr × 0.85% = 152 clk. At 3% = ~539 clk | ~387 clicks/28d unrealized | §6.1: 3.5× clicks, zero new content. Pages already rank pos 4–13. |
| **2** | **read → act** | 569 readers → 25 cta_click = **4.4%** | 544 readers take no action | §2/§6.7. The core on-site failure. 95.6% of readers hit a dead end. |
| **3** | **engaged → scroll** | 418 → 140 = **33.5%** | 278 | Only 1-in-3 engaged users scrolls — content depth not pulling them down the page. |
| **4** | **Faith Finder discovery** | 569 readers → 11 starts = **1.9%** | n/a (invisibility) | §6.6. Mechanism converts 50% start→complete, 36% start→email. Pure discovery problem. |

The internal Faith Finder funnel (11→7→4 = 64% complete, 57% email) is **healthier than the read→act step**. Sadhaka does not have a conversion-mechanism problem; it has a **traffic-into-mechanism** problem at two gates: SERP (leak 1) and read→CTA (leak 2/4).

---

## 2. Engagement Quality — Decoding the 46.8 sec Average

46.8 sec/user (§1) is a **bimodal average masking two populations**, not a uniform shallow read:

| Archetype | Pages (§5) | Engagement signal | Behavior |
|-----------|-----------|-------------------|----------|
| **Sticky — curriculum** | /how-to-read-upanishads **239 sec**; /how-to-choose-a-mantra 146s; /daily-spiritual-routine 103s; /how-to-start-japa 77s | 1.6×–5.1× the mean | Practitioner intent → reads to *do* something |
| **Sticky — tool/quiz** | /vedic-clock 102s (bounce 0.10–0.31); /faith-finder 93s (bounce 0.25); /practical-spiritual-practices bounce **0.09** | Interaction, not just reading | Lowest bounce on the site |
| **Leaky — comparison/concept** | /what-is-maya bounce **1.0**; /ramana-maharshi-who-am-i **0.96**; /compare/bhagavad-gita-vs-upanishads 1.0; /compare/ashtavakra-gita-vs-bhagavad-gita 0.94; /vedanta-vs-stoicism 0.91 | single-view, instant exit | Student intent → answer consumed, journey ends |

**What the gap means:** the 46.8s mean is dragged down by high-traffic *answer pages* (comparisons/concepts) that satisfy the query in one screen and offer no next step. The curriculum/tool/quiz pages prove the audience **will** spend 90–240s when given a structured path or interactive object. The problem is not attention capacity — it's that the highest-traffic templates (concept/comparison) are built as terminal answers, while the deep-engagement templates (curriculum/tool) get far less traffic. **The engagement model to replicate already exists on the site** (§6.8); it's mis-distributed across templates.

---

## 3. Retention Gap — Proof There Is No Return Primitive

**The data proof (§2):** `app_open 913 users` ≈ `session_start 964` ≈ `first_visit 963`. New users (968, §1) ≈ first_visit (963). This means **~99.5% of sessions are first visits** — app_open and session_start are not capturing a distinct *returning* cohort above the first-visit floor. There is no event that fires only on a repeat visit, no streak, no saved state. `result_share` fired for **1 user in 90 days** (§2) — the only latent loop signal, and it's flat.

**Quantified cost:**
- New users: 968 / 90d = **~10.7/day** (§1). With zero retention, active users (965) ≈ new users (968) — the site is running on a **leaky-bucket where acquisition ≈ active**. Every active user is essentially a new user.
- **The audience most wasted:** Panchang/tithi (§3-G, §6.5) is an *inherently daily-return* need — "shukla panchami" 71 impr, "budhavara" 16, "pushya nakshatra" 14, /jyotish/panchang/tithis/shukla-panchami **448 impr at 0.2% CTR**. A daily-recurring intent is being served with no return mechanic and the worst CTR on the site. If even 200 of the panchang/mantra practitioner cohort returned weekly, that alone would break the active≈new identity.
- Mantra seekers (§3-A) are devotional/recurring by nature ("recite/repair") yet have no save, no daily mantra, no streak — so they too convert to single sessions.

The retention cost is not a percentage drop; it's **structural** — there is currently no mechanism that *could* produce a return, so retention is ~0 by construction, not by user choice.

---

## 4. Tracking-Plan Gaps — Events That Should Exist But Don't

The current plan (§2) instruments **reading and one conversion path (Faith Finder)**. It is blind to the three loops the audience clusters demand (Practitioner/Student/Civilizational, §6.4). You cannot build or measure a retention loop you don't track. Naming follows the skill's object_action convention.

| Event (object_action) | Properties | Trigger | Maps to (cluster/page) | Why it matters |
|---|---|---|---|---|
| `mantra_audio_play` | mantra_id, deity, duration_pct | Tap play on a mantra page | §3-A, /om-bram-brim 934 impr 0.6% | Transactional "chant now" intent (§6.3) is currently unmeasured — the highest-volume cluster has zero action events. |
| `verse_bookmark` | verse_id, text (VSN/BG/stotra) | Save/bookmark a verse | §3-C VSN, §3-D BG | Verse-seekers want *this exact verse to recite* — bookmark is the natural save = seed of return. |
| `return_visit` | days_since_last, visit_count | Session start where visit_count>1 | proves §3 retention gap | Today app_open can't distinguish returners. This is the single most important missing event. |
| `streak_day` | streak_len, cluster (panchang/japa) | Daily open with consecutive prior day | §3-G panchang, §3-F japa | The retention primitive for the daily-need audience. Without it, no habit loop is observable or rewardable. |
| `path_step_complete` | path_id, step_n, total_steps | Finish a curriculum step | §5 sticky curriculum (239s pages) | path_explore (25 users) has no completion event — can't measure progression through the one template that earns 90–240s. |
| `panchang_view` | date, tithi, nakshatra, vara | Load a daily panchang page | §3-G, /shukla-panchami 448 impr | Isolates the daily-return cohort from generic page_view so return rate is measurable. |
| `cta_click` (enrich) | cta_label, target_loop, source_template | existing CTA fire | LEAK #2/#3 | cta_click exists but is untyped — without `source_template` you can't see *which* leaky page (what-is-maya vs comparison) kills the journey. |
| `outbound_share` | platform, content_type, url | Share/copy-link action | §3-E civilizational ("argue/share"), result_share=1 | History cluster ranks top-5 and is built to be shared; only 1 share fired in 90d because there's nothing to fire on. |

**Implementation note (per skill §Data Quality):** enrich the existing `cta_click`/`scroll` with `source_template` + `cluster` properties before adding net-new events — that alone unlocks leak-2 attribution (which template archetype dead-ends) with no new instrumentation surface. `return_visit` and `streak_day` are the two that must exist before any retention loop can be claimed to "work" (§12 fail-loud: an unmeasured loop is an unverifiable loop).

---
**Bottom line:** Two gates leak nearly everything — SERP (0.85% CTR, leak 1) and read→act (4.4%, leak 2). The conversion mechanism (Faith Finder 64% complete) and the deep-engagement template (curriculum 90–240s) both already work; they're starved of traffic and invisible. Retention is ~0 *by construction* — no `return_visit`/`streak_day` primitive exists, and the one daily-return audience (panchang, 448 impr) is the least-served. Fix tracking for the three loops first, or the loops can't be measured.

---

## Lens 3 — Content-Market Fit (skill: seo-content)

I have the full fact base. All numbers are verified. Now I'll produce the Content-Market-Fit analysis, grounding every claim in these specific numbers.

# Content-Market-Fit Analysis — Sadhaka (2026-06-15)

## 1) WINNERS vs LEAKERS — the structural diagnosis

The split is not topic, it's **page architecture**. Sticky pages give the user *something to do or follow*; leaky pages dead-end after a single answer.

| Page | Bounce / Engage | Structural feature that holds the user |
|---|---|---|
| /practical-spiritual-practices | bounce **0.09** | **Curated index / list-hub** — multiple onward paths, user picks one |
| /vedic-clock | bounce 0.10–0.31, **102 sec** | **Interactive tool** — live state, reason to stay & return |
| /faith-finder | bounce 0.25, **93 sec** | **Quiz** — input → personalized output (the one working loop) |
| /how-to-read-upanishads-western-beginner | **239 sec** | **Sequenced curriculum** — step-by-step, linear forward motion |
| /how-to-choose-a-mantra | 146 sec | **Decision framework** — guides toward a next action |
| /daily-spiritual-routine-beginners | 103 sec | **Routine/checklist** — repeatable, implies return |

| Leaky page | Bounce | Why it dead-ends |
|---|---|---|
| /what-is-maya | **1.0** | Single definitional essay, zero onward CTA |
| /compare/bhagavad-gita-vs-upanishads | **1.0** | Comparison answered in-snippet; no "now read X" |
| /ramana-maharshi-who-am-i | **0.96** (28 users) | Static bio/essay, no practice or next verse |
| /compare/ashtavakra-gita-vs-bhagavad-gita | 0.94 (230 impr, pos 8.8) | Terminal comparison, no link into the texts compared |
| /sanatan-history/sites/dwarka-underwater | 0.77 (22 users) | Stand-alone fact, no cluster siblings |

**Structural law:** sticky = tool / quiz / sequenced curriculum / curated index (a *next step is built in*). Leaky = single-answer essay or comparison (the answer *is* the terminus). Every leaky page is a high-intent topic — the fix is appending a forward path, not rewriting prose.

## 2) TEMPLATES TO REPLICATE (3 archetypes)

1. **Interactive Tool template** (model: /vedic-clock, 102 sec) → clone onto **Cluster G Panchang** (shukla-panchami 71 + sukla 37 + somavara 10 + budhavara 16 + pushya 14). A live "Today's Panchang" surface is the only retention primitive the data supports — Cluster G is *inherently daily-recurring* (Diagnosis 5).
2. **Sequenced Curriculum template** (model: /how-to-read-upanishads, 239 sec) → clone onto **Cluster F practice how-to** (how to do japa 5+5, daily routine, japa mala starting mantra) and **Cluster B vocab** as a "Sanskrit Term-of-the-Day / 30 terms" track.
3. **Quiz template** (model: /faith-finder, 93 sec, 50% completion) → it already converts (22→11→4 email). The asset works; **Diagnosis 6** says the problem is *discovery* — embed it as a CTA on the high-traffic leaky essays (/what-is-maya, /ramana-maharshi-who-am-i) rather than building new quizzes.

## 3) CONTENT GAPS by cluster (demand exists, asset doesn't)

| Gap | Tied query / volume | Asset to build |
|---|---|---|
| **Navagraha Mantra HUB** | Cluster A: om-bram-brim **163** + budhaya 65 + om-hram-hrim 43 + chandraya variants; /mantras/om-bram-brim **934 impr** but 0.6% CTR (biggest volume, worst efficiency) | One hub indexing all 9 planetary mantras w/ chant + audio + meaning. Transactional intent (chant *now*) is under-served by current snippet (Diagnosis 3) |
| **Daily Panchang surface** | Cluster G: shukla-panchami 71 + 448-impr page at 0.2% CTR | Live tithi/vara/nakshatra tool (see template 1) — the retention goldmine |
| **Darshanas explainer** | "number of classical darshanas are" **40** + darshanas 11 | Single canonical "6 Darshanas" page with a direct-answer table (currently scattered, weak position) |
| **Deeper Sahasranama analysis** | Cluster C: shloka-46 **52+21**, 27th-shloka 43 (**pos 1.5**), shloka-83/65/11/42 | These already rank #1–7 and shloka-83 earns **4.5% CTR** — extend the *winning* verse template (audio + word-by-word) to every named-verse query |
| **BG verse depth** | Cluster D: gita 6.11 clean-place **62**, dozens of bg-18.x; positions **50–70** (weak) | Verse pages exist but rank page 5–7 — the gap is *quality/depth* to climb, not new URLs |

## 4) AEO / CITABILITY — does the snippet earn or lose the click?

The zero-click GOLD pages rank page-1 but earn 0 — meaning **the snippet answers the query so completely the user never clicks**, OR the title doesn't match intent. Fix = restructure the on-page block.

| Page | Number | Block that fixes it |
|---|---|---|
| /sanatan-history/evidence/rakhigarhi-largest-site | **384 impr, pos 4.2, 0 clk** | Civilizational intent = *argue/share* (Cluster E). Title should promise the *comparison payoff* ("Rakhigarhi vs Mohenjo-daro: which was larger?") matching query "rakhigarhi size compared to mohenjo-daro" (53, pos 2.45). Add a comparison table that's visible only on-page, not fully in the meta description — give a reason to click. |
| /mantras/om-bram-brim-braum… | 934 impr, **0.6%** | Practitioner wants chant+audio *immediately*. Title/snippet must surface "with audio + meaning" and a one-line phonetic so the rich result signals the payoff is on-page. |
| /how-to-start-japa | 471 impr, **0.4%**, pos 10.8 | At pos ~11 the snippet is buried; needs a numbered-step AEO block ("Japa in 5 steps") + a benefit-led title to climb into the click zone. |
| /jyotish/panchang/tithis/shukla-panchami | 448 impr, **0.2%** | Date-sensitive intent — title must carry *today's date / "what to do on"*; a static evergreen title loses to time-aware competitors. |
| Brand: "sadhaka" | **121 impr, pos 10.2, 0 clk** | Brand SERP unowned (Diagnosis 2). Homepage Organization schema + exact-match title/H1 "Sadhaka" to claim pos 1 — highest-confidence, zero-content win. |

**Citability rule of thumb:** the GOLD pages over-answer in the snippet (history facts, definitions) → *withhold the synthesis on-page* so the click delivers value; the mantra/japa pages *under-signal* the on-page payoff (audio, steps) → *surface it in title + first 100 words*.

---

### AMPLIFY (do more of)
- **Vedic-clock tool model** → build live Panchang surface (Cluster G, 448 impr at 0.2%).
- **Vishnu Sahasranama verse template** → shloka-83 earns **4.5% CTR / pos 6.5**; replicate to shloka-46 (52+21 impr) and all named-verse queries.
- **Curriculum model** (/how-to-read-upanishads 239 sec) → Cluster F + B tracks.
- **Faith Finder quiz** → keep, but embed for discovery (only 11 starts/90d).

### REPAIR (fix the leak / earn the click)
- Append forward-path CTAs to /what-is-maya (1.0), /ramana-maharshi-who-am-i (0.96), /compare/* (1.0/0.94) — link into the texts/practices each discusses.
- CTR-rescue titles on rakhigarhi (384 impr), brihadratha (322), bg ch6-shloka-11 (284), suryavansha (205) — all pos 4–8, 0 clk.
- Claim brand SERP (sadhaka 121 impr, pos 10).

### GAP (build new)
- **Navagraha Mantra HUB** (Cluster A, 934-impr flagship + 163/65/43 query stack).
- **Daily Panchang tool** (Cluster G retention loop).
- **6 Darshanas canonical page** ("number of classical darshanas" 40 + 11).

**Priority (impact × effort):** P0 — Navagraha hub + CTR-rescue titles + brand SERP (high impact, low effort, no new content; target sitewide CTR 0.85%→3% ≈ 3.5× clicks). P1 — Panchang tool (retention, the only daily-return lever; target shukla-panchami 0.2%→2%). P2 — Sahasranama/curriculum template rollout + leaky-page CTA repair.

---

## Personas (skill: customer-research)

The customer-research framework is active. Mode 1 (analyzing existing assets) applies — the three upstream analyses plus the fact base are my research corpus. I'm extracting JTBD, triggers, behavior, and vocabulary per segment, then clustering into exactly three personas with confidence grounded in query clusters + page behavior. Every behavioral claim traces to a number.

# Voice-of-Customer Personas — Sadhaka (3 grounded, 2026-06-15)

Scope: events 90d / GSC queries+landing 28d (don't cross-chain). Confidence per skill: High = 3+ independent signals (query cluster + landing page + behavior).

---

## PERSONA 1 — "The Repair-Seeker" (Practitioner)
**Identity:** A devotee, often diaspora or India-based, who has been *told* (by an astrologer, family, or panchang) to chant a specific planetary mantra for a specific reason — a Budha/Surya/Chandra remedy. Comes to *do*, not to read. **Confidence: High** (Cluster A 360+ impr + Cluster G 170+ impr + mantra landing pages + bounce data).

- **JTBD:** "It's Budhavara — give me the exact Budha mantra, how to say it, and how many times, *right now*." Functional = recite correctly today; emotional = relief / cosmic course-correction; social = doing the prescribed duty.
- **Discovery:** Cluster A transactional mantras — "om bram brim" **163**, +sah budhaya **65**, om hram hrim **43**, Surya/Chandra variants (pos 6–12). Lands on **/mantras/om-bram-brim-braum 934 impr / 0.6% CTR** (biggest volume, worst efficiency) and /om-shram-chandraya. Adjacent: Cluster G panchang ("budhavara" 16, "somavara" 10).
- **On-site behavior:** Barely arrives — pos 7–12 + 0.6% CTR means the click is lost at the SERP, not on-site. Those who land hit the read→act cliff: of 569 readers only **25 cta_click (4.4%)**. The chant is satisfiable in-snippet, so they don't even click through.
- **Meaning the content serves:** Agency over misfortune. The mantra is a lever on a life that feels acted-upon by forces (planets, fate). The page's job is to make them feel they performed the remedy *correctly* — correctness is the spiritual payoff.
- **Give-more (highest value): RETURN-DAILY.** Their need is inherently recurring (vara/graha cycles). A "today's planetary mantra + 108 counter" is the natural hook. Email is secondary; the habit is the asset.
- **Loop archetype: HABIT.** Maps directly to `streak_day`/`mantra_audio_play` (both currently untracked — the highest-volume cluster has zero action events).

**Journey map:** *Discover* "om bram brim" at pos 7.6 → *first value* hears/sees the correct chant + meaning (fix: title promises "Meaning, 108× Audio & When to Chant") → *one next action* tap **mantra_audio_play** + start a 108 counter → *return trigger* "It's Budhavara — chant your Budha mantra" (daily vara/graha cue). Target: /om-bram-brim 0.6%→3% CTR; seed first `return_visit` cohort.

---

## PERSONA 2 — "The Verse Student" (Student)
**Identity:** A yoga-teacher-training (YTT) student, comparative-philosophy reader, or someone reciting a specific scripture verse — needs *this exact shloka* or *this term defined*, accurately. Often international (terms are untranslated Sanskrit). **Confidence: High** (Clusters B + C + F + the curriculum landing pages with 90–240s engagement).

- **JTBD:** Two faces. (a) "Give me Vishnu Sahasranama shloka 46 / BG 6.11 so I can recite/study it." (b) "Define prakriti / soham / how many darshanas — for my exam or practice." Functional = correct text/definition; emotional = competence, not looking ignorant; social = teaching/quoting credibly.
- **Discovery:** Cluster C VSN verses — "shloka 46" **52+21**, "27th shloka" **43 at pos 1.5**, shloka-65/83/11/42 (rank #1–7). Cluster B terms — darshanas **40+11**, prakriti **25**, sankalpa **23**, soham **14**, guna 14, dharana 14. Cluster F how-to — read upanishads 7, japa. Lands on **/stotras/vishnu-sahasranama/shloka-83 (10 clk / 223 impr / 4.5% CTR / pos 6.5)** — the site's best-converting template — and curriculum pages **/how-to-read-upanishads-western-beginner (239 sec)**, /how-to-choose-a-mantra (146s).
- **On-site behavior:** Bimodal. On *sequenced/verse* templates they go deep (up to **239 sec**, 5.1× the 46.8s mean; shloka-83 earns 4.5%). On *terminal answer* templates they bounce instantly: **/what-is-maya bounce 1.0**, /ramana-maharshi-who-am-i 0.96, /compare/bhagavad-gita-vs-upanishads 1.0. Same person, opposite behavior — driven by whether a next step exists.
- **Meaning the content serves:** Mastery and intellectual legitimacy — turning a foreign tradition into something they can hold accurately and pass on. The verse/definition is a unit of credibility.
- **Give-more (highest value): EMAIL via a path.** They already tolerate 90–240s of sequenced content; a "30-Sanskrit-terms" or "read the Upanishads in 30 days" track with email checkpoints fits the proven appetite. Faith Finder proves the mechanism (22→11 start, ~36% give email) — it's just invisible (1.9% of readers reach it).
- **Loop archetype: MASTERY-PATH.** Maps to `path_step_complete` + `verse_bookmark` (both untracked; path_explore has 25 users but no completion event).

**Journey map:** *Discover* "shloka 46" or "prakriti" (pos 1.5–6) → *first value* gets the exact verse/definition with word-by-word → *one next action* **verse_bookmark** OR enroll in a term/verse track (embed the working Faith Finder/curriculum CTA on the leaky /what-is-maya, bounce 1.0) → *return trigger* email "Day 2: shloka 47 / next term." Target: extend shloka-83's 4.5% template to shloka-46 (52+21 impr); /what-is-maya bounce 1.0→add forward path.

---

## PERSONA 3 — "The Civilizational Arguer" (Civilizational)
**Identity:** A debate-driven history buff / identity-proud reader who wants a *sharable fact* to win an argument about Sanatan antiquity and scale — Rakhigarhi, Harappa, Mahabharata dating. **Confidence: High** (Cluster E + the evidence/dynasty landing pages, all pos 2–8).

- **JTBD:** "Give me the exact number proving Rakhigarhi was bigger than Mohenjo-daro" — ammunition to *argue and share*. Functional = a citable fact; emotional = pride/vindication; social = winning the debate, posting the receipt.
- **Discovery:** Cluster E — "rakhigarhi size vs mohenjo-daro" **53 (pos 2.45)**, +harappa **41 (pos 3.3)**, "mahabharata war 5561 bce" **21**. Lands on the **zero-click gold**: /sanatan-history/evidence/rakhigarhi-largest-site **384 impr / pos 4.2 / 0 clk**; /dynasties/brihadratha **322 / pos 8**; /dynasties/suryavansha **205 / pos 7.4** — all rank page-1, earn ~0.
- **On-site behavior:** Mostly intercepted at the SERP — the fact sits in the snippet, query answered, no click (rakhigarhi pos 4.2, 0 clicks despite 384 impr). Those who do land tend to dead-end: /sanatan-history/sites/dwarka-underwater bounce **0.77** (stand-alone fact, no siblings). Only **1 result_share in 90 days** — the share intent is real but has nothing to fire on (`outbound_share` untracked).
- **Meaning the content serves:** Identity validation — proof that the tradition is ancient, vast, real. The fact isn't read for itself; it's social currency in a contested narrative.
- **Give-more (highest value): SHARE.** This is the only persona whose core job *is* distribution. A one-tap "share this comparison" turns each fact into acquisition — and they rank top-5, so amplification compounds.
- **Loop archetype: IDENTITY-SHARE.** Maps to `outbound_share` (untracked; only 1 share/90d fired).

**Journey map:** *Discover* "rakhigarhi size vs mohenjo-daro" at pos 2.45–4.2 → *first value* the exact hectare comparison (fix: withhold the number from the meta, surface it in an on-page table so the click delivers) → *one next action* **outbound_share** the comparison + jump to a sibling fact (repair dwarka bounce 0.77) → *return trigger* "new evidence drop" / next dynasty in the cluster. Target: rakhigarhi 0%→8% CTR (~+30 clk on 384 impr); first measurable `outbound_share` cohort vs today's 1/90d.

---

**Cross-persona note:** All three are intercepted at the *same two gates* — SERP CTR (0.85% sitewide) and read→act (4.4%). Each persona's give-more maps to a distinct loop the tracking plan is currently blind to: Habit (`streak_day`), Mastery (`path_step_complete`), Identity-Share (`outbound_share`). The daily-return Repair-Seeker is the retention keystone (active≈new users today, 965≈968); the Student funds email; the Arguer funds acquisition.

---

## Strategy Track A — Traffic (skill: content-strategy + ai-seo)

Both frameworks loaded, fact base verified. Every number below traces to the fact base (§-cited). Producing the deliverable.

---

# Traffic Doubling-Down Plan — Sadhaka (built on existing demand)

**Sitewide CTR target: 0.85% → 3.0% (28d).** Math: 17,970 impr (§1) × 3.0% = **539 clicks** vs 152 today = **+387 clicks/28d = ~13.8 clicks/day** (today ~5.4/day). Zero new topics — all rescue + expansion of demand that already ranks pos 1.5–13.

---

## 1) CTR-RESCUE PROGRAM — title/snippet/schema rewrites

**Mechanism (all pages):** the snippet already answers the query (fact/verse/chant visible), so the click dies at the SERP. Fix = title promises the one thing the SERP cannot show (audio, table, "today," word-by-word, verdict); move the raw answer out of meta into an on-page H2 block. Add type-matched schema (§3).

**Phase 0–4 wks — top 8 zero-click page-1 pages (combined ~3,290 impr §4):**

| Page | Now | Rewritten title | Target |
|---|---|---|---|
| /sanatan-history/evidence/rakhigarhi-largest-site | 384 impr, pos 4.2, **0 clk** | **"Rakhigarhi vs Mohenjo-daro: Exact Size Comparison (Hectares, Mapped)"** | 0%→8% ≈ +30 clk |
| /mantras/om-bram-brim-braum-sah-budhaya-namah | 934 impr, **0.6%**, pos 7.6 | **"Om Bram Brim Braum Sah Budhaya Namah — Meaning, 108× Audio & When to Chant (Budha Remedy)"** | 0.6%→3% ≈ +22 clk |
| /how-to-start-japa | 471 impr, 0.4%, pos 10.8 | **"How to Start Japa: A 7-Step Beginner Routine (Mala, Mantra, Count)"** | 0.4%→3% ≈ +12 clk |
| /jyotish/panchang/tithis/shukla-panchami | 448 impr, **0.2%** | "Shukla Panchami — Today's Date, Timings & Significance" | 0.2%→2% ≈ +8 clk |
| /sanatan-history/dynasties/brihadratha | 322 impr, pos 8.0, 0 | "Brihadratha Dynasty: Rulers, Timeline & End of the Mauryas" | 0→3% ≈ +10 clk |
| /texts/bhagavad-gita/chapter-6/shloka-11 | 284 impr, pos 8.1, 0 | "Bhagavad Gita 6.11: Sanskrit, Translation & Word Meaning (Clean Place Verse)" | 0→3% ≈ +8 clk |
| /compare/ashtavakra-gita-vs-bhagavad-gita | 230 impr, pos 8.8, 0 | "Ashtavakra Gita vs Bhagavad Gita: 5 Key Differences (Table)" | 0→3% ≈ +7 clk |
| /mantras/om-hram-hrim-hraum-sah-suryaya-namah | 311 impr, 1.0%, pos 8.9 | Surya-remedy clone of the om-bram template | 1%→3% ≈ +6 clk |

**Effort:** S each (title + meta + one on-page block). **Phase target: +100 clk/28d on existing rank.** No content build.

---

## 2) BRAND SERP OWNERSHIP — "sadhaka" pos 10.2 → top-3

**Target:** "sadhaka" 121 impr / pos 10.2 / **0 clk**; + "sadhaka meaning" 5, "sādhaka" 19, "sadhaka ai" 13 = ~158 impr fragmented, none owned (§3-H). Generic Sanskrit word → SERP owned by dictionaries.
**Mechanism (Phase 0–4, effort S):** ship a `/sadhaka` entity page titled **"Sadhaka — Meaning + the Sanatan Dharma Learning Platform (opensadhaka.com)"** that *defines the word* (captures definitional intent, cluster B) AND introduces the brand. Add **Organization + WebSite `SearchAction` (sitelinks searchbox) schema** + `sameAs`. Merges clusters B+H on one URL so generic-word searchers convert to brand awareness.
**Target:** pos 10→top-3; even 8% × 158 impr ≈ **+12 clk/28d** + removes the credibility gap of not ranking for your own name.

---

## 3) RICH RESULTS / SCHEMA that win the click

| Cluster | Pages | Schema | Click reason it unlocks |
|---|---|---|---|
| **Mantras (A)** | om-bram-brim (934), om-hram-hrim (311), om-shram-chandraya (253) | `Article` + `AudioObject` (embed chant audio) + `FAQPage` ("how many times? when to chant?") | Audio rich result signals "chant is playable here" — the one thing SERP can't show. Highest-volume, worst-CTR cluster (§6.3). |
| **Verses (C/D)** | VSN shloka-83/27/46, BG 6.11/10.36 | `Article` + breadcrumb; `FAQPage` ("meaning of shloka 46?") | shloka-83 already earns **4.5%** (§4) — schema + word-by-word extends the winning template. |
| **Panchang (G)** | shukla-panchami (448) + tithi set | `Article` + `FAQPage` with date entity ("is it shukla panchami today?") | Time-aware snippet beats evergreen competitors (§6.5). |
| **Comparisons** | ashtavakra-vs-gita (230), raja-vs-kundalini (41, pos 4.9) | `FAQPage` + on-page comparison `Table` | "X vs Y" intent wants a verdict table, not prose (citation share ~33%, ai-seo). |

**Effort:** M (audio recording for ~9 mantra pages is the only non-trivial asset). **Phase 0–4:** FAQ/Table schema (S); **Phase 4–8:** mantra audio + `AudioObject`.

---

## 4) CLUSTER EXPANSION — tied to query volume

**a) Navagraha Mantra HUB** (Phase 4–8, effort M). Demand: cluster A — om-bram-brim **163** + sah-budhaya 65 + om-hram-hrim 43 + chandraya variants 17+25; flagship page 934 impr at 0.6% (§3-A, §4). Build ONE hub indexing all 9 planetary mantras (chant + audio + meaning + "when to chant"), internally linking every /mantras/* page + lifting /10-powerful-sanskrit-mantras (798 impr, pos 13.2 §4) via cross-links. **Target: cluster A CTR ~0%→3%; push 10-mantras pos 13→8 (≈ doubles its 17 clk).**

**b) Daily Panchang programmatic surface** (Phase 8–12, effort L). Demand: cluster G — shukla-panchami 71+37, budhavara 16, somavara 10, pushya 14; page 448 impr at 0.2% (§3-G). Programmatic tithi/vara/nakshatra pages with a live "today" block, cloning the **/vedic-clock** sticky model (102 sec, bounce 0.10 §5). This is the only *daily-recurring* intent (§6.5) = the retention lever, not just CTR. **Target: shukla-panchami 0.2%→2%; seed the first daily-return cohort.**

**c) Sahasranama analysis depth** (Phase 4–8, effort M). Demand: cluster C — shloka-46 **52+21**, 27th-shloka 43 (pos **1.5**), shloka-65/83/11/42 (§3-C). These already rank #1–7; shloka-83 = best template at 4.5%. Extend its word-by-word + audio format to every named-verse query + a verse-index hub cross-linking all VSN verses. **Target: replicate 4.5% across shloka-46 (73 impr) etc.; push pos 6→3 → CTR toward 8–10%.**

**d) Darshanas canonical page** (Phase 0–4, effort S). Demand: "number of classical darshanas are" **40** + darshanas 11 (§3-B). One canonical "6 Darshanas" page with a direct-answer table; template for the /learn/sanskrit/* set (advaita 90 impr, pos 5.9, 0 clk). **Target: capture the 51 darshanas impr at page-1.**

*Excluded: Bhagavad Gita study lookups (cluster D) at pos 50–70 (§3-D) — not striking distance; needs authority/links, not snippet work. Deprioritized for this traffic sprint.*

---

## 5) AEO / GEO — extractable answer blocks for high-impression informational pages

Per ai-seo Pillar 1: lead each section with a 40–60-word direct answer; the GOLD pages currently *over-answer in the snippet* → withhold synthesis on-page so the click delivers.

- **rakhigarhi-largest-site (384 impr):** on-page H2 **"How much bigger was Rakhigarhi than Mohenjo-daro?"** → 40–60-word answer + a hectare comparison **table** (kept out of meta). Cite the IKS claim file by slug (CLAUDE.md KB rule) for E-E-A-T.
- **how-to-start-japa (471 impr):** numbered `HowTo` block "Japa in 7 steps" + benefit-led title (§4) to climb pos 10.8 into the click zone.
- **darshanas (51 impr):** direct-answer block "There are **6** classical darshanas:" + named list/table — wins the exact "number of classical darshanas are" 40-impr query.
- **Leaky high-traffic repair (journey, not CTR):** append forward-path blocks/CTAs to /what-is-maya (bounce **1.0**), /ramana-maharshi-who-am-i (0.96), /compare/* (1.0/0.94 §5) — link into the texts/practices each discusses + embed the working Faith Finder CTA (only 11 starts/90d, §6.6) so high-traffic essays feed the one converting asset.

---

## Prioritized roadmap (impact × effort)

| Phase | Plays | Measurable target |
|---|---|---|
| **0–4 wks** | §1 eight title rewrites · §2 brand `/sadhaka` + Org schema · §4d darshanas · §3 FAQ/Table schema · §5 rakhigarhi + japa AEO blocks | **+100 clk/28d** from rescue; brand pos 10→top-3 |
| **4–8 wks** | §4a Navagraha hub · §4c Sahasranama depth + verse hub · §3 mantra `AudioObject` audio | cluster A 0%→3%; replicate 4.5% verse template; 10-mantras pos 13→8 |
| **8–12 wks** | §4b daily Panchang programmatic surface (vedic-clock model) · §5 leaky-page journey repair + Faith Finder embed | shukla-panchami 0.2%→2%; first daily-return + Faith-Finder-discovery cohort |

**Cumulative CTR target 0.85%→3.0% = 152→539 clk/28d (~5.4→13.8 clk/day), zero new topics** — consistent with §6.1 (CTR, not ranking, is the #1 lever). Both gates that leak everything (SERP 0.85%; read→act 4.4% §6.7) are addressed: §1–4 fix the SERP gate, §5 leaky-repair + Faith Finder embed open the read→act gate.

---

## Strategy Track B — Engagement (skill: marketing-psychology)

Fact base verified — every number in my prior analyses traces to it. The fact base confirms the events funnel (lines 24-39), the three meta-audiences (line 117), and the diagnoses. Now I'll produce the engagement loops and feature deliverable.

# Engagement Loops & Feature Strategy — Sadhaka (2026-06-15)

**Frame (Theory of Constraints):** Two gates leak everything — SERP CTR (0.85%) and read→act (569→25 = 4.4%). But the engagement strategist's job is the *third* gap the others don't own: **act→return is structurally zero** (app_open 913 ≈ first_visit 963 = ~99.5% first sessions; result_share fired once in 90d). Sadhaka has no return primitive. Every feature below installs one, and each maps to a named cluster + a missing event.

---

## 1. THE RETENTION PRIMITIVE — "Aaj ka Sadhaka" (Today surface)

**Why this audience:** Cluster G (panchang/tithi) is the *only* inherently daily-recurring intent on the site — "shukla panchami" 71, "budhavara" 16, "somavara" 10, "pushya nakshatra" 14 — and it's served by /jyotish/panchang/tithis/shukla-panchami at **448 impr / 0.2% CTR** (worst on the site) with no return mechanic. The need recurs daily; the product doesn't. That mismatch IS the retention opportunity (Diagnosis 5).

**The "Today" surface** (`/today`, also the post-quiz home for returners): one card stack rendered for *today's* date —
1. **Tithi + Vara + Nakshatra** (today's panchang — the Cluster G query, answered live)
2. **Today's planetary mantra** — bound to the vara (Budhavara→Budha "om bram brim", Cluster A's 163-impr flagship) with 1-tap audio + 108 counter
3. **One verse** — rotating VSN/BG shloka (Cluster C, the 4.5%-CTR template)
4. **One 1-tap practice** — "do this today" (Cluster F how-to japa, the 239s curriculum model)

**Hook loop (Nir Eyal):**
- **Trigger** — external: daily push/email "It's Budhavara — chant your Budha mantra" (vara cycle is the built-in calendar trigger, no manufactured urgency). Internal: the felt need to "do today's practice correctly" (Persona 1's spiritual payoff = correctness).
- **Action** (BJ Fogg = Motivation × Ability × Prompt): tap play / tap counter — the lowest-activation-energy action on the site. Event: **`mantra_audio_play`**, `streak_day`.
- **Variable reward** (reward-of-the-self): the *verse + practice rotate daily* — you don't know which shloka/practice surfaces. Unpredictability is the retention engine, not the panchang fact (which is fixed).
- **Investment** (IKEA + endowment): the **streak count** and saved mantras accrue. Each return raises switching cost; the streak is theirs.

**Streak mechanic (goal-gradient + loss aversion):** consecutive-day counter with a "don't break your X-day streak" cue. Loss aversion (losing a 12-day streak hurts ~2× the gain) does the retention work. Forgiveness: one "grace day" prevents the cobra effect of guilt-driven abandonment.

**Instrument:** `return_visit {days_since_last, visit_count}` (the single most important missing event — today nothing distinguishes a returner from app_open), `streak_day {streak_len, cluster}`, `panchang_view {date, tithi, vara}`.
**Target:** /shukla-panchami CTR 0.2%→2%; first cohort with `return_visit visit_count>1` >15% within 30d (today ~0).

---

## 2. FAITH FINDER ELEVATION — from buried asset to front door

**Why:** It works — 22 start→11 complete (50%)→4 email (~36% of starters), *healthier than the read→act step itself* (4.4%). The only failure is discovery: **11 starts / 569 readers = 1.9%** (Diagnosis 6). This is a placement problem, not a mechanism problem.

**Placement (foot-in-the-door + reciprocity):**
- **Inline CTA on the 4 highest-traffic leaky pages** — /what-is-maya (bounce **1.0**), /ramana-maharshi-who-am-i (0.96), /compare/bhagavad-gita-vs-upanishads (1.0), /compare/ashtavakra-gita-vs-bhagavad-gita (0.94, 230 impr). These dead-end *because no next step exists*; the quiz IS the next step. Highest-leverage real estate on the site.
- **Homepage + `/today` entry** as "Which path fits you?"
- **Exit-intent** on leaky pages (last chance before the 1.0 bounce).

**Value exchange (commitment & consistency):** the quiz output = a *personalized path* routing each persona to its loop — Practitioner→mantra/japa track, Student→term/verse path, Civilizational→evidence series. Email is exchanged for "save your path + get Day 2." The small commitment (5 quiz taps) predicts the next (give email). Don't gate the result; gate the *continuation*.

**Instrument:** enrich `faith_finder_quiz_start {source_template}` to see which leaky page converts; `path_assigned {persona, path_id}`.
**Target:** starts 1.9%→8% of readers (~45 starts/90d vs 11); email-capturers 4→~16/90d.

---

## 3. PER-PERSONA LOOP

**Practitioner — Japa Mala Counter + streak (HABIT loop).**
Maps to Cluster A (om-bram-brim 163; /mantras/om-bram-brim 934 impr) + Cluster F (how to do japa). On every mantra page: a **tap-to-count 108 mala** with audio. Closes read→act (today 569→25): the action is *doing the chant*, not reading about it. Reward = the count completing (108 → "mala complete" peak). Investment = streak + "your most-chanted mantra." **Event: `mantra_audio_play {mantra_id, deity, duration_pct}`, `streak_day`.** Success: cta-equivalent action rate on mantra pages 4.4%→15%.

**Student — Learning Path with progress + saved terms (MASTERY loop).**
Maps to Cluster B (darshanas 40, prakriti 25, sankalpa 23) + Cluster C (shloka-46 52+21) + the 239s curriculum model. A "30 Sanskrit terms" / "Read the Upanishads in 30 days" track with a **progress bar** (goal-gradient: people accelerate near the finish) and **`verse_bookmark`** to save terms/shlokas. path_explore has 25 users but *no completion event* — this closes that blind spot. Investment = saved library + % complete (Zeigarnik: the open 70% pulls them back). **Event: `path_step_complete {path_id, step_n, total_steps}`, `verse_bookmark`.** Success: path completion measurable >25%; ≥1 bookmark for 30% of Students.

**Civilizational — shareable "Fact Cards" → referral (IDENTITY-SHARE loop).**
Maps to Cluster E (rakhigarhi 53 pos 2.45; /evidence/rakhigarhi 384 impr pos 4.2) — the *only* persona whose core JTBD is distribution ("argue/share the receipt"). One-tap **"share this comparison"** generating a branded image card (Rakhigarhi vs Mohenjo-daro hectares). This persona ranks top-5, so every share is compounding acquisition (flywheel). result_share fired **once in 90d** because there's nothing to fire on. Repairs the /dwarka-underwater 0.77 dead-end by linking to a sibling fact. **Event: `outbound_share {platform, content_type, url}`.** Success: shares 1/90d → ≥30/90d; track assisted sessions from shared cards.

---

## 4. EMAIL / ACCOUNT CAPTURE MOMENTS

Today: **4 email-capturers / 90d** — all via Faith Finder. Four capture moments, each a value-for-value exchange (reciprocity, never a wall):

| Moment | Trigger | Value exchanged | Persona |
|---|---|---|---|
| **Streak save** | After day-2 `streak_day` | "Save your streak + daily mantra reminder" | Practitioner |
| **Path enroll** | `path_step_complete` step 1 | "Email me Day 2 / the next verse" (Zeigarnik open loop) | Student |
| **Quiz result** | `quiz_complete` | "Save your path" (existing, ~36% — extend it) | All |
| **Fact-card share** | `outbound_share` | "Get the next evidence drop" | Civilizational |

**Expected lift:** Faith Finder alone, at 8% discovery (§2), takes email-capturers from 4→~16/90d. Adding streak + path + share moments — each catching a *different* persona at its peak-end moment — realistically compounds to **25–40 captures/90d (6–10×)**. The mechanism already converts at 36%; we're feeding it 4× the traffic from 4 entry points instead of 1.

---

## 5. FEATURE SPECS — ranked by impact × effort

| # | Feature | Persona | Loop it closes | Observed-behavior trigger (number) | Event to instrument | Success metric |
|---|---|---|---|---|---|---|
| **P0-a** | **Mala counter + audio** on mantra pages | Practitioner | read→act (HABIT) | Cluster A om-bram-brim 163; /mantras/om-bram-brim **934 impr / 0.6%** | `mantra_audio_play` | mantra-page action 4.4%→15% |
| **P0-b** | **Faith Finder inline on 4 leaky pages** | All | discovery→email | /what-is-maya bounce **1.0**; quiz 1.9% of readers | `faith_finder_quiz_start{source_template}` | starts 1.9%→8% |
| **P0-c** | **`return_visit` + `streak_day` tracking** | All | makes retention *measurable* | app_open 913 ≈ first_visit 963 (no returner signal) | `return_visit`, `streak_day` | baseline return rate exists |
| **P1-a** | **"Aaj ka Sadhaka" Today surface + streak** | Practitioner | act→**return** (the keystone) | Cluster G shukla-panchami **448 impr / 0.2%** | `panchang_view`, `streak_day` | return rate 0→15%; CTR 0.2%→2% |
| **P1-b** | **Fact Cards + 1-tap share** | Civilizational | act→referral (SHARE) | Cluster E rakhigarhi **384 impr pos 4.2 0 clk**; share=1/90d | `outbound_share` | shares 1→30/90d |
| **P1-c** | **Learning path + progress bar + bookmark** | Student | read→act→return (MASTERY) | path_explore 25 users, 0 completion; Cluster B darshanas 40 | `path_step_complete`, `verse_bookmark` | completion >25% |
| **P2-a** | **Email capture at streak/path/share peaks** | All | email investment | 4 emails/90d, all 1 source | (enrich above) | captures 4→25–40/90d |
| **P2-b** | **Enrich `cta_click`/`scroll` with `source_template`** | All | leak-2 attribution | 569→25 read→act, untyped | `cta_click{source_template}` | identify which template dead-ends |

**Sequencing:** P0-c (tracking) ships *first* — per fail-loud, an unmeasured loop is unverifiable; you cannot claim retention works without `return_visit`. P0-a/b are pure on-page additions to pages that already rank (no new content, no new traffic dependency). P1 builds the three return loops on that instrumented base.

---

## MEANING & PURPOSE (why each deepens real practice, not just metrics)

- **Today surface / streak** — *sadhana means daily, consistent practice.* The streak isn't a growth-hack veneer; it's the product finally matching what the tradition asks — show up every day. The vara→mantra binding teaches the practitioner *when* and *why*, turning a one-off chant into an actual abhyasa. Agency over a life that feels acted-upon by planets and fate.
- **Mala counter** — the 108 count is the *traditional* unit of japa. Digitizing it honors the form; the "correctness" it delivers is the spiritual payoff Persona 1 actually seeks, not a vanity number.
- **Faith Finder as front door** — a seeker who lands confused on /what-is-maya is *given a path* instead of a dead end. That is the platform's dharma: meet people where they are and route them onward.
- **Learning path + bookmark** — turns a foreign tradition into something the Student can *hold accurately and pass on*. The saved library is a personal canon; mastery as legitimacy.
- **Fact Cards** — the Arguer's need is identity validation. A clean, sourced, sharable card means the tradition is represented *accurately* in a contested narrative — distribution that doubles as defense of the lineage.

*Net: today active≈new (965≈968) — the bucket is fully leaking. The keystone is the daily-return Practitioner loop (P1-a); the Student funds email; the Arguer funds acquisition. Install the return primitive or the read→act fixes just refill a bucket with no bottom.*