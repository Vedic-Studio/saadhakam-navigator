# Sadhaka: User Map & Growth/Engagement Plan (June 2026)

> **Data window:** Events / Pages / stickiness = 90d (2026-03-17 to 06-14) · Queries / CTR / landing = 28d (2026-05-18 to 06-14). GA4 property Sadhaka (G-S3DHYPPG9R) + Google Search Console.
> **Source of truth:** [2026-06-15-engagement-growth-factbase.md](analytics-snapshots/2026-06-15-engagement-growth-factbase.md) — every number in this plan traces to a literal there.
> **Method:** 9-agent analysis (3 lenses → personas → 2 strategy tracks → adversarial verification against deterministic gates D1–D6). Both tracks cleared verification after required corrections (Faith Finder email math, +387-vs-+120 honesty, rounding, projection labeling) were applied. Two residual arithmetic slips were caught and fixed in a final QC pass.

## 1. The one-paragraph diagnosis

Sadhaka has demand and rankings but loses users at two structural gates and has no third gate at all. Gate 1: the SERP. 17,970 organic impressions in 28d returned 152 clicks, a sitewide CTR of 0.85%, with pages ranking position 4-13 on high-volume queries (rakhigarhi pos 4.2 / 384 impr / 0 clicks; om-bram-brim pos 7.6 / 934 impr / 0.6%). The snippet answers the query, so the click dies before arrival. Gate 2: read to act. Of 569 article-readers (90d), 25 clicked any CTA (4.4%); 11 started the Faith Finder quiz; 4 gave email. Gate 3 does not exist: app_open (913 users) approx session_start (964) approx first_visit (963), so essentially every session is a first session and there is no return primitive. The content is consumed (61% of users read an article) and the one conversion asset works internally (22 quiz-starts to 11 completes, 50%), but attention converts to nothing downstream and nobody comes back. The single highest-leverage move is CTR rescue on pages that already rank (no new content); the second is installing a daily-return loop for the only inherently recurring audience (panchang, currently 0.2% CTR with no return mechanic).

---

## 2. The user map — 3 personas

All three are grounded in actual query clusters plus landing-page behavior, not generic archetypes. Confidence is High for each (query cluster + landing page + behavior signal).

### Persona 1 — The Repair-Seeker (Practitioner)
| | |
|---|---|
| **Identity** | Devotee told by an astrologer/family/panchang to chant a specific planetary mantra (Budha/Surya/Chandra remedy). Comes to *do*, not read. |
| **JTBD** | "It's Budhavara, give me the exact Budha mantra, how to say it, how many times, right now." Functional: recite correctly today. Emotional: relief / course-correction. Social: doing the prescribed duty. |
| **How they discover** | Cluster A: "om bram brim" 163, +sah budhaya 65, om hram hrim 43, Surya/Chandra variants (pos 6-12). Lands on /mantras/om-bram-brim-braum 934 impr / 0.6% CTR (biggest volume, worst efficiency) and /om-shram-chandraya 253 / 2.0%. Adjacent: Cluster G budhavara 16, somavara 10. |
| **What they do** | Mostly intercepted at the SERP (pos 7.6 + 0.6% = click lost before arrival). Those who land hit the read-to-act cliff (sitewide 569 to 25 = 4.4%); the chant is satisfiable in-snippet, suppressing the click. |
| **Meaning/purpose** | Agency over misfortune. The mantra is a lever on a life that feels acted-upon by planets and fate; correctness is the spiritual payoff. |
| **Give-more action** | RETURN-DAILY. The need recurs on vara/graha cycles. A "today's planetary mantra + 108 counter" is the natural hook. |
| **Loop** | HABIT (maps to `mantra_audio_play` + `streak_day`, both currently untracked). |

### Persona 2 — The Verse Student (Student)
| | |
|---|---|
| **Identity** | YTT student, comparative-philosophy reader, or someone reciting a specific scripture verse. Needs *this exact shloka* or *this term defined*, accurately. Often international (untranslated Sanskrit). |
| **JTBD** | (a) "Give me Vishnu Sahasranama shloka 46 / BG 6.11 to recite/study." (b) "Define prakriti / soham / how many darshanas, for my exam or practice." Functional: correct text/definition. Emotional: competence. Social: teaching/quoting credibly. |
| **How they discover** | Cluster C verses: "shloka 46" 52+21, "27th shloka" 43 at pos 1.5, shloka-65/83/11/42 (rank #1-7). Cluster B terms: "number of classical darshanas are" 40 + darshanas 11, prakriti 25, sankalpa 23, soham 14, guna 14, dharana 14. Cluster F how-to. Lands on /stotras/vishnu-sahasranama/shloka-83 (10 clk / 223 impr / 4.5% / pos 6.5, the best template) and /how-to-read-upanishads-western-beginner (239 sec). |
| **What they do** | Bimodal. On sequenced/verse templates they go deep (up to 239 sec, 5.1x the 46.8s mean; shloka-83 earns 4.5%). On terminal-answer pages they bounce: /what-is-maya 1.0, /ramana-maharshi-who-am-i 0.96, /compare/bhagavad-gita-vs-upanishads 1.0. Same person, opposite behavior, driven by whether a next step exists. |
| **Meaning/purpose** | Mastery and intellectual legitimacy: turning a foreign tradition into something they can hold accurately and pass on. |
| **Give-more action** | EMAIL via a path. They already tolerate 90-240s of sequenced content; a term/verse track with email checkpoints fits the proven appetite. |
| **Loop** | MASTERY-PATH (maps to `path_step_complete` + `verse_bookmark`; path_explore has 25 users but no completion event). |

### Persona 3 — The Civilizational Arguer (Civilizational)
| | |
|---|---|
| **Identity** | Debate-driven history buff / identity-proud reader who wants a sharable fact to win an argument about Sanatan antiquity and scale. |
| **JTBD** | "Give me the exact number proving Rakhigarhi was bigger than Mohenjo-daro," ammunition to argue and share. Functional: a citable fact. Emotional: pride/vindication. Social: winning the debate, posting the receipt. |
| **How they discover** | Cluster E: "rakhigarhi size vs mohenjo-daro" 53 (pos 2.45), +harappa 41 (pos 3.3), "mahabharata war 5561 bce" 21 (pos 5.8). Lands on zero-click gold: /sanatan-history/evidence/rakhigarhi-largest-site 384 impr / pos 4.2 / 0 clk; /dynasties/brihadratha 322 / pos 8; /dynasties/suryavansha 205 / pos 7.4. |
| **What they do** | Mostly intercepted at the SERP (fact sits in snippet, query answered, no click). Those who land dead-end: /sanatan-history/sites/dwarka-underwater bounce 0.77. Only 1 result_share fired in 90 days, the intent is real but has nothing to fire on. |
| **Meaning/purpose** | Identity validation: proof the tradition is ancient, vast, real. The fact is social currency in a contested narrative. |
| **Give-more action** | SHARE. The only persona whose core job *is* distribution, and they rank top-5, so each share is compounding acquisition. |
| **Loop** | IDENTITY-SHARE (maps to `outbound_share`; only 1 share/90d fired). |

### What's working / double-down
| Asset | Signal | Double-down |
|---|---|---|
| Verse template (shloka-83) | 4.5% CTR / pos 6.5, the site's best | Clone word-by-word + audio to shloka-46 (52+21 impr), 27, 65, 11, 42 |
| Curriculum pages | /how-to-read-upanishads 239 sec; /how-to-choose-a-mantra 146s; /daily-routine 103s | Wrap in a multi-step path with progress + email checkpoints |
| Tool pages | /vedic-clock 102 sec, bounce 0.10; /practical-spiritual-practices bounce 0.09 | Model the daily "Today" surface on this |
| Faith Finder | 22 start to 11 complete (50%); 4 email-users (36% of completers) | Surface it on the 4 leaky pages, currently reached by 1.9% of readers |
| Sanatan-history evidence | rakhigarhi pos 4.2, brihadratha pos 8, suryavansha pos 7.4, all page-1 | CTR-rescue titles + share cards; top-5 rank means shares compound |

---

## 3. Traffic plan — double down on existing demand

**Sitewide north-star (aspiration, not the committed deliverable):** 0.85% to 3.0% CTR over 28d = 17,970 impr x 3.0% = 539 clicks vs 152 today = +387 clicks/28d (5.4 clicks/day today rising to ~19/day at the north-star; the +387 increment itself is ~13.8/day). The itemized plays below build a quantified **~+120 clicks in-scope** on pages that already rank; the remaining +267 toward the north-star requires a long-tail rescue set not enumerated here (every mid-page query in clusters B/D/G). Treat +387 as the direction, +120 as what this plan ships.

Lead play is CTR rescue: same rank, better title/snippet/schema, zero new content.

| Play | Target + numbers | Mechanism | Effort | Target metric | Phase |
|---|---|---|---|---|---|
| **1. CTR-rescue, 8 zero-click page-1 pages** (combined **3,384 impr**) | rakhigarhi 384/pos4.2/0; om-bram-brim 934/0.6%/pos7.6; how-to-start-japa 471/0.4%; shukla-panchami 448/0.2%; brihadratha 322/pos8; BG 6.11 284/pos8.1; ashtavakra-vs-gita 230/pos8.8; om-hram-hrim 311/1.0% | Title promises the one thing the snippet can't show (audio, table, "today", word-by-word, verdict); move the raw answer out of meta into an on-page H2 | S each | **+103 clk/28d** (per-page math below) | 0-4 wk |
| **2. Darshanas canonical page** | "number of classical darshanas are" 40 + darshanas 11 = 51 impr | One canonical "6 Darshanas" page leading with a direct-answer table; template for /learn/sanskrit/* (advaita 90 impr pos 5.9 0 clk) | S | Capture 51 impr at page-1 (~+3 clk at ~6%) | 0-4 wk |
| **3. Rich-results schema** | Mantras (om-bram 934, om-hram 311, om-shram 253): Article+AudioObject+FAQPage. Verses (shloka-83/27/46, BG 6.11/10.36): Article+breadcrumb+FAQPage. Panchang (shukla-panchami 448): Article+FAQPage w/ date entity. Comparisons (ashtavakra-vs-gita 230, raja-vs-kundalini 41 pos4.9): FAQPage+Table | Type-matched schema unlocks the click reason: audio result signals "chant playable here"; verdict table beats prose for X-vs-Y | M (audio recording for ~9 mantra pages is the only non-trivial asset) | FAQ/Table schema 0-4 wk; mantra AudioObject 4-8 wk | 0-8 wk |
| **4a. Navagraha Mantra hub** | Cluster A: om-bram-brim 163 + sah-budhaya 65 + om-hram-hrim 43 + chandraya 17+25; flagship 934 impr at 0.6% | One hub indexing all 9 planetary mantras (chant + audio + meaning + when-to-chant), cross-linking every /mantras/* + lifting /10-powerful-sanskrit-mantras (798 impr pos 13.2) | M | **Cluster A ~313 impr (enumerated queries) x 3% = ~9 clk** (today ~1); push 10-mantras pos 13 to 8 (≈ doubles its 17 clk = +17) | 4-8 wk |
| **4b. Sahasranama verse depth + index hub** | Cluster C: shloka-46 52+21, 27th-shloka 43 (pos 1.5), shloka-65/83/11/42 | Extend shloka-83's word-by-word + audio (4.5%) to every named-verse query; verse-index hub cross-links all VSN verses | M | Replicate 4.5% across shloka-46 (73 impr) ≈ +3 clk; push pos 6 to 3 toward 8-10% | 4-8 wk |
| **4c. Daily Panchang programmatic surface** | Cluster G: shukla-panchami 71+37, budhavara 16, somavara 10, pushya 14; page 448 impr at 0.2% | Programmatic tithi/vara/nakshatra pages with a live "today" block, cloning /vedic-clock (102 sec, bounce 0.10). The only daily-recurring intent = the retention lever | L | **shukla-panchami 0.2% to 2%** = ~+8 clk on 448 impr; seed first daily-return cohort | 8-12 wk |
| **5. Leaky-page journey repair (AEO)** | /what-is-maya bounce 1.0; /ramana-maharshi-who-am-i 0.96; /compare/bhagavad-gita-vs-upanishads 1.0, ashtavakra-vs-gita 0.94 | Append forward-path blocks + embed the working Faith Finder CTA so high-traffic essays feed the converting asset (opens Gate 2, not Gate 1) | S-M | Bounce reduction + Faith Finder starts (see §4) | 8-12 wk |

**Per-page rescue math (Play 1):** rakhigarhi 0% to 8% = +30; om-bram-brim 0.6% to 3% = +22; how-to-start-japa 0.4% to 3% = +12; shukla-panchami 0.2% to 2% = +8; brihadratha 0% to 3% = +10; BG 6.11 0% to 3% = +8; ashtavakra-vs-gita 0% to 3% = +7; om-hram-hrim 1.0% to 3% = +6. **Sum = +103 clk/28d.**

**Why rakhigarhi gets an 8% target (not the 3% used elsewhere):** it ranks pos 4.2, materially better than the pos-8 cohort. CTR ceiling rises sharply with position, so a page-1-top-half result with a number-withholding title can credibly clear 8% where pos-8 pages cannot. This is the only page assigned >3%; if it lands at 3% the play still nets ~+84.

**Dropped from this sprint** (per impact x effort): the brand `/sadhaka` entity page. It targets 158 fragmented impressions (sadhaka 121 / pos 10.2 / 0 clk + variants) for ~+12 clk and requires a new content build rather than a rescue, the lowest payoff in the Phase-0 set. The credibility gap of not ranking for your own name is real but soft; defer until the rescue program is shipped. Also excluded: Bhagavad Gita study lookups (Cluster D) at pos 50-70, not striking distance, needs authority/links not snippet work.

---

## 4. Engagement plan — loops & features

The traffic plan fixes Gate 1 (SERP) and partially Gate 2 (read to act). This section owns Gate 3: act to return is structurally zero (app_open 913 approx first_visit 963; result_share fired once in 90d). Every feature installs a return primitive and maps to a named cluster + a currently-missing event.

### 4.1 The retention primitive first — "Aaj ka Sadhaka" (Today surface)
**Why this audience:** Cluster G is the only inherently daily-recurring intent (shukla panchami 71, budhavara 16, somavara 10, pushya 14), served by /jyotish/panchang/tithis/shukla-panchami at 448 impr / 0.2% CTR (worst on the site) with no return mechanic. The need recurs daily; the product does not. That mismatch is the retention opportunity (Diagnosis 5).

**The surface** (`/today`, also the post-quiz home for returners): one card stack for today's date:
1. Tithi + Vara + Nakshatra (the Cluster G query, answered live)
2. Today's planetary mantra, bound to the vara (Budhavara to Budha "om bram brim", Cluster A's 163-impr flagship) with 1-tap audio + 108 counter
3. One rotating verse (VSN/BG, Cluster C, the 4.5% template)
4. One 1-tap practice (Cluster F how-to-japa, the 239s curriculum model)

**Loop mechanics:**
- **Trigger** (external): daily push/email "It's Budhavara, chant your Budha mantra." The vara cycle is a built-in calendar trigger, no manufactured urgency. Internal trigger: the felt need to do today's practice correctly (Persona 1's payoff).
- **Action**: tap play / tap counter, the lowest-activation-energy action on the site. Events: `mantra_audio_play`, `streak_day`.
- **Variable reward**: the verse + practice rotate daily; you don't know which surfaces. Unpredictability is the engine, not the panchang fact (which is fixed).
- **Investment**: the streak count and saved mantras accrue, raising switching cost on each return.
- **Streak**: consecutive-day counter with a "don't break your X-day streak" cue, plus one "grace day" to prevent guilt-driven abandonment.

**Target:** /shukla-panchami CTR 0.2% to 2%; first cohort with `return_visit` visit_count>1 above 15% within 30d (today ~0).

### 4.2 Faith Finder front-door elevation
**Why:** it works (22 start to 11 complete, 50%; 4 email-users = 36% of completers, 18% of starters), healthier than the read-to-act step itself (4.4%). The only failure is discovery: 11 starts / 569 readers = 1.9%. A placement problem, not a mechanism problem (Diagnosis 6).

**Placement:** inline CTA on the 4 highest-traffic leaky pages, /what-is-maya (bounce 1.0), /ramana-maharshi-who-am-i (0.96), /compare/bhagavad-gita-vs-upanishads (1.0), /compare/ashtavakra-gita-vs-bhagavad-gita (0.94, 230 impr). These dead-end *because no next step exists*; the quiz is the next step. Plus homepage + `/today` entry, and exit-intent on leaky pages.

**Value exchange:** the quiz output is a personalized path routing each persona to its loop (Practitioner to mantra/japa, Student to term/verse, Civilizational to evidence). Don't gate the result; gate the continuation (email for "save your path + Day 2").

**Target (labeled assumptions, with lift stated):** starts 1.9% to **8% of readers** (= **4.2x** current). At that rate, ~45 starts/90d vs 11. Honest email chain: 45 starts x 50% complete x (4/11 email-per-completer) = **~8 email-capturers/90d from Faith Finder** (vs 4 today, a 2x). The earlier "to ~16" figure used email-per-starter incorrectly and is corrected here.

### 4.3 Per-persona loop
| Persona | Feature | Maps to | Reward / investment | Event | Success metric |
|---|---|---|---|---|---|
| **Practitioner** | Tap-to-count 108 mala + audio on every mantra page | Cluster A (om-bram-brim 163; /mantras/om-bram-brim 934 impr); Cluster F | Reward: the 108 count completing. Investment: streak + "most-chanted mantra" | `mantra_audio_play`, `streak_day` | **Establish baseline via `mantra_audio_play` first** (no per-page action rate exists today; current /mantras CTR is 0.6%), then set an action-rate target |
| **Student** | Learning path with progress bar + `verse_bookmark` | Cluster B (darshanas 40, prakriti 25, sankalpa 23); Cluster C (shloka-46 52+21); 239s curriculum | Reward: progress (goal-gradient). Investment: saved library + % complete (Zeigarnik open loop) | `path_step_complete`, `verse_bookmark` | path completion measurable, target >25%; >=1 bookmark for 30% of path-enrollers |
| **Civilizational** | One-tap "share this comparison" generating a branded fact card | Cluster E (rakhigarhi 53 pos 2.45; /evidence/rakhigarhi 384 impr pos 4.2); repairs /dwarka-underwater 0.77 by linking a sibling fact | The only persona whose JTBD is distribution; top-5 rank means shares compound | `outbound_share` | shares from 1/90d to **>=30/90d (target/hypothesis)**; track assisted sessions from cards |

### 4.4 Feature-spec table (ranked impact x effort)
| # | Feature | Persona | Loop closed | Observed trigger (number) | Event | Success metric | Meaning/purpose |
|---|---|---|---|---|---|---|---|
| **P0-a** | Mala counter + audio on mantra pages | Practitioner | read to act (HABIT) | Cluster A 163; /om-bram-brim 934 impr / 0.6% | `mantra_audio_play` | baseline via event, then target | The 108 count is the traditional unit of japa; correctness is the payoff Persona 1 seeks |
| **P0-b** | Faith Finder inline on 4 leaky pages | All | discovery to email | /what-is-maya bounce 1.0; quiz 1.9% of readers | `faith_finder_quiz_start{source_template}` | starts 1.9% to 8% | A confused seeker is given a path, not a dead end |
| **P0-c** | `return_visit` + `streak_day` tracking | All | makes retention measurable | app_open 913 approx first_visit 963 (no returner signal) | `return_visit`, `streak_day` | baseline return rate exists | Cannot manage daily practice without seeing it |
| **P1-a** | "Aaj ka Sadhaka" Today surface + streak | Practitioner | act to **return** (keystone) | Cluster G shukla-panchami 448 / 0.2% | `panchang_view`, `streak_day` | return rate 0 to 15%; CTR 0.2% to 2% | Sadhana means daily practice; the product finally matches the form |
| **P1-b** | Fact Cards + 1-tap share | Civilizational | act to referral (SHARE) | Cluster E rakhigarhi 384 impr pos 4.2; share=1/90d | `outbound_share` | shares 1 to >=30/90d | Accurate representation in a contested narrative |
| **P1-c** | Learning path + progress + bookmark | Student | read to act to return (MASTERY) | path_explore 25 users, 0 completion; Cluster B darshanas 40 | `path_step_complete`, `verse_bookmark` | completion >25% | A personal canon; mastery as legitimacy |
| **P2-a** | Email capture at streak/path/share peaks | All | email investment | 4 emails/90d, all 1 source | (enrich above) | corrected ~8 from Faith Finder; streak/path/share contributions are **untested hypotheses, no number** | Value-for-value, never a wall |
| **P2-b** | Enrich `cta_click`/`scroll` with `source_template` | All | Gate-2 attribution | 569 to 25 read-to-act, untyped | `cta_click{source_template}` | identify which template dead-ends | — |

**Email projection, honestly stated:** Faith Finder at 8% discovery yields **~8 captures/90d** (derived above). Adding the streak, path, and share capture moments should lift this further, but those increments have **no fact-base basis and are untested hypotheses** with no committed number. Measure each via P0-c/P1 instrumentation before forecasting.

**Sequencing logic:** P0-c (tracking) ships first, an unmeasured loop is unverifiable. P0-a/b are pure on-page additions to pages that already rank (no new traffic dependency). P1 builds the three return loops on the instrumented base.

---

## 5. Instrumentation addendum — events to add now

The loops above are blind without these. Ship before or alongside P0.

| Event | Properties | Why it's missing-critical |
|---|---|---|
| `return_visit` | `days_since_last`, `visit_count` | **The single most important gap.** Today nothing distinguishes a returner from app_open (913 approx first_visit 963). Without it, retention is unmeasurable and unprovable. |
| `streak_day` | `streak_len`, `cluster` | Measures the keystone HABIT loop (P1-a). No streak data exists. |
| `mantra_audio_play` | `mantra_id`, `deity`, `duration_pct` | The Practitioner's core action on the highest-volume cluster (934 impr) currently fires zero action events. |
| `panchang_view` | `date`, `tithi`, `vara` | Measures Cluster G engagement on the daily surface. |
| `path_step_complete` | `path_id`, `step_n`, `total_steps` | path_explore has 25 users but no completion event, the MASTERY loop is half-instrumented. |
| `verse_bookmark` | `verse_id`, `cluster` | The Student's investment action; untracked. |
| `outbound_share` | `platform`, `content_type`, `url` | The Civilizational loop's whole point; only the legacy `faith_finder_result_share` exists (1 fire/90d). |
| `faith_finder_quiz_start{source_template}` | add `source_template` | To see which leaky page converts to quiz starts (P0-b). |
| `cta_click{source_template}` | add `source_template` | To find which template dead-ends in the 569 to 25 read-to-act drop. |

---

## 6. 12-week roadmap

| Phase | Actions | Deterministic success metric |
|---|---|---|
| **0-4 wk** | 1. Instrument `return_visit`, `streak_day`, `mantra_audio_play` (P0-c). 2. Ship 8 CTR-rescue title/meta/H2 rewrites (Play 1). 3. Add FAQPage/Table schema to mantra, verse, panchang, comparison pages (Play 3). 4. Build darshanas canonical page (Play 2). 5. Embed Faith Finder inline CTA on the 4 leaky pages (P0-b). | **+103 clk/28d** from the rescue 8 (per-page math in §3); darshanas captures 51 impr at page-1; `return_visit` baseline exists. |
| **4-8 wk** | 1. Mala counter + audio on all /mantras pages (P0-a). 2. Navagraha hub cross-linking 9 mantras + lifting /10-powerful-sanskrit-mantras (Play 4a). 3. Record + embed AudioObject on ~9 mantra pages (Play 3). 4. Extend shloka-83 word-by-word + audio to shloka-46/27/65/11/42 + verse-index hub (Play 4b). | Cluster A ~313 impr (enumerated queries) x 3% = **~9 clk** (today ~1); 10-mantras pos 13 to 8 (~doubles its 17 clk); replicate 4.5% on shloka-46 (73 impr); `mantra_audio_play` baseline set. |
| **8-12 wk** | 1. Build "Aaj ka Sadhaka" `/today` surface + streak on the /vedic-clock model (P1-a). 2. Daily Panchang programmatic tithi/vara/nakshatra pages with live "today" block (Play 4c). 3. Fact Cards + 1-tap share, repair /dwarka-underwater dead-end (P1-b). 4. Learning path + progress bar + `verse_bookmark` (P1-c). 5. Add daily push/email vara trigger. | **shukla-panchami 0.2% to 2%** (~+8 clk on 448 impr); first `return_visit` visit_count>1 cohort **>15%**; **shares 1 to >=30/90d**; path completion measurable **>25%**. |

---

## 7. Risks & caveats

- **Small N.** The downstream funnel is single-digit (25 CTA-clickers, 11 quiz-starts, 7 completes, 4 email-users / 90d). These are directional, not significant; the Faith Finder 50% complete and 36%-of-completers email rates could swing hard with more volume. Treat every conversion target as a hypothesis to validate post-instrumentation, not a forecast.
- **Date-range mismatch.** Events/pages/stickiness are 90d (Mar 17 - Jun 14); queries/CTR/landing are 28d (May 18 - Jun 14). The +103 clk and CTR targets are 28d-scoped; the 569 to 25 read-to-act and bounce figures are 90d-scoped. They are not cross-comparable, and the per-persona behavior (90d) is matched to query demand (28d) by topic, not by the same users.
- **CTR targets assume Google adopts the rewrites.** Title/snippet rewrites can take weeks to be re-crawled and re-ranked, and Google may rewrite titles itself. The +103 is a ceiling contingent on adoption and position holding; rakhigarhi's 8% is the most aggressive single assumption (justified by pos 4.2 but unproven).
- **Audio is the one non-trivial build.** AudioObject rich results depend on recording ~9 mantras correctly; mispronounced or low-quality audio would damage the Practitioner's "correctness" payoff, the opposite of the intent.
- **The north-star (+387 / 3.0% sitewide) is not what this plan ships.** The itemized plays build ~+120; closing the gap to +387 requires a long-tail rescue set across clusters B/D/G that is not enumerated here. Do not report +387 as delivered.
- **What would make this wrong:** if the read-to-act collapse is driven by intent satisfaction at the SERP (the user got the chant/fact and never needed the site), then on-page loops will underperform because the user never arrives. In that case the lever is entirely Gate 1 (CTR + schema), and the engagement build should wait until traffic actually lands. The 4.4% read-to-act rate is consistent with both "no next step offered" (fixable on-page) and "intent already satisfied" (not fixable on-page); P2-b's `source_template` attribution is what disambiguates them.