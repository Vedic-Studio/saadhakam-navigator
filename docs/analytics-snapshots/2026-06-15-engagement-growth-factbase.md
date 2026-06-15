# Sadhaka — GA4 + GSC Fact Base (verified)
**Built:** 2026-06-15 · **Purpose:** single source of truth for the engagement+growth analysis. Every claim downstream must trace to a number here.

## 0. Scope & caveats (READ FIRST)
- **Events + Pages + Reports snapshot:** 90 days, 2026-03-17 → 2026-06-14. GA4 property "Sadhaka" (G-S3DHYPPG9R).
- **Queries + Landing-page:** 28 days, 2026-05-18 → 2026-06-14. Google organic (GSC-linked).
- Do NOT compare 90d and 28d counts directly. Treat query/landing CTR as the *current* SERP state; treat events/pages as the *behavioral* state.
- "users" here = GA4 active/total users; small Ns (single-digit) are directional, not significant.

## 1. Headline metrics
| Metric | Value | Read |
|---|---|---|
| Active users (90d) | 965 | tiny base |
| New users (90d) | 968 | ~10.7 new users/day |
| Avg engagement time / active user (90d) | **46.8 sec** | shallow |
| Total events (90d) | 7,606 | — |
| Organic impressions (28d) | **17,970** | strong demand, ranks exist |
| Organic clicks (28d) | **152** | — |
| **Sitewide organic CTR (28d)** | **0.85%** | THE crisis metric |
| seo_article_read users (90d) | 569 of 927 (61%) | content IS consumed |

**One-line diagnosis:** The site ranks (positions 4–13 across hundreds of impressions on many queries) but does not earn the click, and the handful who arrive do not enter any loop. Impression-rich, click-poor, retention-absent.

## 2. Events funnel (90d) — count / users
- page_view 2441 / 927
- session_start 1181 / 964
- app_open 1128 / 913
- first_visit 968 / 963
- **seo_article_read 906 / 569**  ← core value event
- user_engagement 555 / 418
- scroll 218 / 140
- cta_click 72 / **25**
- path_explore 72 / **25**
- faith_finder_quiz_start 22 / **11**
- form_start 22 / 7
- faith_finder_quiz_complete 11 / **7**
- faith_finder_email_capture 6 / **4**
- faith_finder_result_share 2 / 1
- faith_finder_result_view 2 / 1

**Funnel reads:**
- Read→act collapse: 569 readers → 25 CTA-clickers (4.4%) → 11 quiz-starters → 4 email-capturers. The site converts attention into *nothing* downstream.
- Faith Finder internal conversion is actually healthy where it's used: 22 start → 11 complete (50%) → 6 email events / 4 users (≈36% of starters give email). Problem is **discovery** (only 11 humans started it in 90 days), not the mechanism.
- **No retention primitive.** app_open ≈ session_start ≈ first_visit; nothing indicates returning-habit behavior.

## 3. Audience query clusters (28d GSC) — who is searching
Grouped from the query report. Volume = impressions.

**A. Remedial / planetary mantra seekers (Jyotish-adjacent, transactional "chant now")**
- "om bram brim" 163 impr · "om bram brim sah budhaya namah" 65 · "om bram brim braum sah budhaya namah" 28 · "om bram" 20 · "om bram brim brom mantra" 21 · "om hram hrim" 43 · "om shram shrim shrum chandraya namah" 17 · "om shram shreem shroum sah chandraya namah meaning" 25 · many variants. Positions mostly 6–12. Clicks ≈ 0.
- These map to Navagraha (Budha/Mercury, Surya/Sun, Chandra/Moon) remedial mantras. Recurring, devotional, intent = *recite/repair*.

**B. Sanskrit-term / concept definition seekers (student / yoga-teacher-training vocab)**
- prakriti 25 · sankalpa 23 · soham 14 · guna meaning 14 · dharana 14 · pushya 14 · kundalini 5+ · purushartha 6 · sattva guna 12 · darshanas 11 · "number of classical darshanas are" 40 · "what is kundalini" 6 · vedanta meaning/definition cluster. Positions often 40–80 (weak) but also some 8–20.
- Intent = *understand a word*. Often German/Spanish/Polish/Bengali/Arabic variants → international.

**C. Vishnu Sahasranama verse seekers (devotional, specific-verse)**
- "27th shloka of vishnu sahasranamam" 43 (pos 1.5!) · "vishnu sahasranamam shloka 46" 21 · "46 shloka…" 52 · "shloka 65" · "shloka 11/42/83". Ranks #1–7. Intent = *find this exact verse to recite*.

**D. Bhagavad Gita verse / chapter lookups (study)**
- Dozens: "bg 18.x", "bhagavad gita 6.11 clean place translation" 62 impr, "gita chapter 17/4/3", "chapter X summary". Positions mostly 50–70 (page 5–7 — weak). Intent = *study reference*.

**E. Sanatan-history / civilizational (identity, debate, share)**
- "rakhigarhi size compared to mohenjo-daro" 53 (pos 2.45!) · "…harappa" 41 (pos 3.3) · "mahabharata war date 5561 bce" 21 (pos 5.8) · rakhigarhi/sinauli/IVC cluster. Ranks top-5. Intent = *prove / argue / share a fact*.

**F. Practice how-to (beginner practitioner)**
- "how to do japa" 5 · "how to japa" 5 · "how to read upanishads" 7 · "daily spiritual routine" · "japa mala starting mantra". Intent = *start a practice*.

**G. Panchang / tithi / vara (DAILY recurring need)**
- "shukla panchami" 71 · "sukla panchami" 37 · "krishna dashami" 8 · "somavara" 10 · "budhavara" 16 · "pushya nakshatra" 14 · "shukla paksha" cluster. Intent = *check today's ritual timing* — inherently a daily return behavior.

**H. Brand**
- "sadhaka" 121 impr **pos 10.2, 0 clicks** · "sadhaka ai" 13 · "sadhaka meaning" 5 · "sādhaka" 19 · "yoga sadhaka". Brand SERP is NOT owned (should be pos 1).

## 4. Landing-page performance (28d)
**Top click-earners (what already works):**
- /10-powerful-sanskrit-mantras — 17 clk / 798 impr / **CTR 2.1%** / pos 13.2
- /stotras/vishnu-sahasranama/shloka-83 — 10 / 223 / **4.5%** / pos 6.5
- /stotras/vishnu-sahasranama/shloka-27 — 6 / 168 / 3.6% / pos 7.3
- /mantras/om-bram-brim-braum-sah-budhaya-namah — 6 / **934** / **0.6%** / pos 7.6  ← biggest volume, worst efficiency
- /mantras/om-shram-shrim-shraum-sah-chandraya-namah — 5 / 253 / 2.0% / pos 8.0
- /how-to-read-upanishads-western-beginner — 3 / 204 / 1.5% / pos 9.7
- /can-i-chant-a-mantra-without-initiation — 3 / 203 / 1.5% / pos 8.2

**Zero-click, high-impression GOLD (ranks page-1, earns nothing — top CTR-rescue targets):**
- /sanatan-history/evidence/rakhigarhi-largest-site — **384 impr, pos 4.2, 0 clk**
- /sanatan-history/dynasties/brihadratha — 322, pos 8.0, 0
- /texts/bhagavad-gita/chapter-6/shloka-11 — 284, pos 8.1, 0
- /compare/ashtavakra-gita-vs-bhagavad-gita — 230, pos 8.8, 0
- /texts/bhagavad-gita/chapter-10/shloka-36 — 229, pos 8.7, 0
- /sanatan-history/dynasties/suryavansha — 205, pos 7.4, 0
- /how-to-start-japa — 471 impr, 0.4% CTR, pos 10.8
- /jyotish/panchang/tithis/shukla-panchami — 448 impr, 0.2% CTR, pos 10.7
- /mantras/om-hram-hrim-hraum-sah-suryaya-namah — 311, 1.0% CTR, pos 8.9
- /learn/sanskrit/advaita — 90, pos 5.9, 0 · /compare/raja-yoga-vs-kundalini-yoga — 41, pos 4.9, 0

## 5. Stickiness — bounce rate & engagement time (90d)
**Sticky (amplify these templates):**
- /practical-spiritual-practices — bounce 0.09
- /vedic-clock — bounce 0.10–0.31, engagement 102 sec
- /faith-finder — bounce 0.25, engagement 93 sec
- /how-to-read-upanishads-western-beginner — engagement **239 sec**
- /how-to-choose-a-mantra — 146 sec · /daily-spiritual-routine-beginners — 103 sec · /how-to-start-japa — 77 sec
- Shiva Tandava verse-1 — bounce 0.125
- Homepage — bounce 0.36

**Leaky (high traffic, dead-end — fix journey):**
- /ramana-maharshi-who-am-i — bounce **0.96** (28 users, single-view)
- /what-is-maya — bounce **1.0** · /compare/bhagavad-gita-vs-upanishads — 1.0
- /compare/ashtavakra-gita-vs-bhagavad-gita — 0.94 · /vedanta-vs-stoicism — 0.91
- /sanatan-history/sites/dwarka-underwater — 0.77 (22 users)

## 6. Derived diagnoses (the load-bearing conclusions)
1. **CTR, not ranking, is the #1 traffic lever.** Demand + position already exist; titles/snippets/rich-results don't earn clicks. Fixing sitewide CTR from 0.85%→3% ≈ 3.5× clicks with zero new content.
2. **Brand SERP is unowned** ("sadhaka" pos 10). Quick, high-confidence win.
3. **Mantra pages are the highest-volume, lowest-CTR cluster** — transactional intent under-served by snippet (people want the chant + audio + meaning immediately).
4. **Three distinct meta-audiences** with different jobs: **Practitioner** (do; recurring — mantras/japa/panchang), **Student** (understand — terms/verses/comparisons), **Civilizational** (know/argue/share — history). Each needs a different loop.
5. **Panchang/tithi audience = the retention goldmine** (inherently daily-recurring need) but currently 0.2% CTR and no return mechanic.
6. **Faith Finder works but is invisible** — the only conversion asset, buried. 11 starts/90d.
7. **Read→act→return collapses to ~0.** 569 readers → 25 CTA clicks → 4 emails → 0 retention primitive.
8. **Sticky templates exist** (curriculum/tool/quiz pages) — the engagement model to replicate; leaky high-traffic pages (Ramana, What-is-Maya) are journey dead-ends to repair.
