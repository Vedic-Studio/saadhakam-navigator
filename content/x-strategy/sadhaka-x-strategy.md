# Sadhaka X (Twitter) Strategy

**Handle**: `@opensadhaka` (distinct from `@ankit_pfc` personal)
**Owner**: ankit.m303@gmail.com
**Voice persona**: First-person anonymous sadhaka (a practitioner studying texts and practicing, reporting back). Not institutional. Not personal-with-org.
**Scope of this document**: X account only. Substack is a downstream pipeline that will be built separately.
**Posting / research access**: X Developer access provisioned for posting, automation, and research listening.
**Last updated**: 2026-05-07

This is the playbook for the Sadhaka brand X account. It governs pillars, voice, format mix, cadence, and the rules that decide what gets posted and what does not. The companion file `peer-patterns.md` informs format choices; this file decides which formats Sadhaka uses and in what proportion.

---

## 1. Strategic position

### What Sadhaka is on X

Authoritative English-language reference for Sanatan philosophy, texts, and practices. X is **the distribution layer for the opensadhaka.com corpus**: articles, stotras, sahasranamas, BG shlokas, and the IKS knowledge base.

### What Sadhaka is NOT on X

- Not an astrology account
- Not a political account
- Not a wellness/self-help account dressed in saffron
- Not a single-school account (we cover Advaita, Dvaita, Vishishtadvaita, Shaiva, Shakta, Vaishnava, Tantric — by school, never as undifferentiated "Hindu")
- Not a daily-affirmation account
- Not a bot

### Differentiator vs. peer landscape (see `peer-patterns.md`)

Most peers in the niche fall into one of four buckets:

| Bucket | Strength | Weakness |
|---|---|---|
| Scholarly bots (Rigveda_Online) | Verse fidelity | No commentary, no community |
| Devotional voices (anjaneyasevak, Priya_Kruthi) | Warmth, accessibility | Light on text, no philosophical rigor |
| Modern bridges (yajnshri) | Virality | Slides into Vedic-science slop |
| Single-school authorities (KrishnaDharma, kutumbofshankar) | Deep credibility | Tradition-locked |

**Sadhaka's gap**: scholarly + accessible + multi-school + citation-rigorous + claim-honest. Citation-first like Rigveda_Online, accessible like KrishnaDharma, multi-school unlike all of them, claim-honest unlike yajnshri.

Every post must reflect this. If it could have been written by a wellness account, it's wrong.

---

## 2. Content pillars

Eight pillars, all anchored to existing site assets. Every X post must trace back to (or seed) an asset on opensadhaka.com.

| # | Pillar | Anchor on site | % of weekly mix |
|---|---|---|---|
| 1 | **Verse anchor** (shloka + plain commentary) | `/stotras/*`, BG shlokas, Upanishad articles | 30% |
| 2 | **Concept explainer** (one concept, plain language) | `/src/data/articles.ts` (concept articles) | 15% |
| 3 | **Practice instruction** (actionable sadhana) | Practice-guide articles | 10% |
| 4 | **Claim decomposition** (sensational claim → verdict + sources) + **research notebook** (forward-looking textual inquiry, 2-4/mo) | `backend/app/knowledge/kb/claims/*.md` + manuscript / philology articles | 10% |
| 5 | **School comparison** (Advaita vs Dvaita, etc.) | Comparison articles (e.g., `/advaita-vs-dvaita`) | 10% |
| 6 | **Reflective question** (community prompt) | Concept or practice article, asking inward | 10% |
| 7 | **Epic narrative thread** (Mahabharata / Ramayana / Puranic character) | Articles on epics, character studies | 10% |
| 8 | **Long-form X Article** (republish of high-traffic site article) | `/<slug>` long-form articles | 5% |

Festival / Hindu calendar events override the mix on the day. During Navratri, 60%+ of posts can be Devi-focused. During Maha Shivaratri, Shiva pillars dominate. The yearly calendar (see §4) defines override windows.

---

## 3. Voice principles

### Inherits from CLAUDE.md (mandatory)

- "Sanatan" or named school. Never "Hindu philosophy" as a generic tag.
- No em dashes. Periods, commas, line breaks.
- No anti-slop phrases (per `~/.claude/skills/stop-slop`).
- Voice score ≥ 35/50 on the five Sadhaka dimensions (Directness, Rhythm, Trust, Authenticity, Density).
- Modern bridges grounded in `kb/claims/*.md`, never freelance.

### X-specific voice fingerprint

The voice is **first-person anonymous sadhaka**. A practitioner who reads texts and sits with them, reports back. Has been at it long enough to know what they don't know. No biographical tells (no name, no face, no city, no professional identity).

Closer to rian_vlbt's "earnest seeker, here's what I found" energy than to KrishnaDharma's institutional scholar voice or kutumbofshankar's "I'll teach you" voice.

- **First-person across all pillars.** "I" is the practitioner. "We" can refer to the Sadhaka project (the site, the writing) but never substitute for "I" inside a post. Don't conflate.
- **Student-reporter posture, not teacher.** "I keep returning to this verse" is right. "Here's what you should know about this verse" is wrong.
- **Sober, citation-anchored.** Every shloka post includes the chapter:verse. Every claim post links the `kb/claims/<slug>.md`. Every commentator named (Shankara, Ramanuja, Abhinavagupta) is named.
- **Sentence case for body**, not Title Case. Sanskrit terms italicized in transliteration where they appear.
- **Sanskrit + transliteration + English** for shlokas. Never just transliteration. Never just Sanskrit.
- **Hedged when uncertain, confident when text-anchored.** "The way I read it..." when interpreting. "The Mandukya is explicit on this. Four states, one substrate." when citing.
- **Confidence without bravado.** "The Mandukya Upanishad has four states, and the fourth (turiya) is not a state in the same sense as the other three." Yes. "MIND-BLOWING ancient secret of Mandukya you NEED to know!" No.
- **The persona is implied, not announced.** Don't write "as a sadhaka, I...". The voice already does the work.

#### How the first-person voice expresses across the 8 pillars

| Pillar | First-person flavor | Example open |
|---|---|---|
| 1 Verse anchor | "I keep coming back to..." | "I keep coming back to BG 4.7 this week." |
| 2 Concept explainer | "I find this most often mistranslated..." | "Maya is the word I find most often mistranslated." |
| 3 Practice instruction | "I tested this for X weeks..." | "I sat with this practice for two weeks. Here's what landed." |
| 4 Claim decomposition | "I went looking for..." | "I went looking for what the Sushruta Samhita actually says." |
| 5 School comparison | "Trying to understand..." | "Trying to understand Madhva's case against Shankara." |
| 6 Reflective question | "This came up in my sitting..." | "This came up yesterday. Asking it here." |
| 7 Epic narrative | "I keep returning to..." | "I keep returning to Karna." (Then third-person storytelling.) |
| 8 Long-form Article | First-person opening, third-person body | "When I started reading the Mandukya..." |
| 11 Research notebook | "I noticed something in..." | "I noticed something in the Mandukya manuscripts." |

For epic narrative (Pillar 7), the *frame* is first-person but the *story* is told in third-person. Same for parts of long-form Articles (Pillar 8). The "I" anchors the post; the content is the tradition.

### Anti-patterns specific to Sadhaka X (in addition to CLAUDE.md anti-patterns)

- **Bot-style verse spam without commentary**. Always 1-3 lines of commentary.
- **"Did you know" hooks for content that isn't surprising**. If it's standard knowledge, don't fake novelty.
- **"Science confirms what Rishis knew" without a `kb/claim`**. The bridge is allowed only when claim-file-backed.
- **Mixing schools without naming them**. "Hinduism teaches X" is wrong. "Advaita Vedanta teaches X; Dvaita disagrees and teaches Y" is right.
- **Engagement-bait questions**. "What's your favorite verse?" is fine occasionally. "Comment below if you agree!" is not.
- **Generic deity AI imagery**. Either use high-craft AI (commissioned via `generate-sadhaka-images`) or traditional temple photography. Never default to whatever Midjourney/Banana spits out.
- **Reactive identity defense**. "Countering propaganda", "remember what you represent", admonitory community-policing tone. Sadhaka is affirmative scholarship, not embattled identity. See `peer-patterns.md` § Borrow-with-caution for the gates.
- **Conspiratorial framing of modernity**. "Modernity is a coordinated assault" reads like moral panic. Sadhaka critiques modernity from tradition-as-strength, with specific texts and specific problems named.
- **Course-funnel-as-content**. Posts must stand alone as content first. A product mention at the end is fine; a post whose primary purpose is selling is not.

---

## 4. Cadence

### Daily

| Slot | Time (IST) | Pillar weight |
|---|---|---|
| Morning shloka | 06:30 | Pillar 1 (verse anchor), 80%; Pillar 6 (reflective Q), 20% |
| Mid-morning explainer | 10:00 | Pillar 2, 4, or 5 (rotating) |
| Afternoon practice / claim | 14:00 | Pillar 3 or 4 |
| Evening philosophy | 18:30 | Pillar 2, 5, or 7 (epic thread on weekends only) |
| Late-night reflection | 21:30 | Pillar 6 (reflective Q) or Pillar 1 (verse) |

Total: 4-5 posts/day, 28-35/week. Adjust down if quality slips.

### Weekly

- **Monday-Friday**: standard mix per above.
- **Saturday**: epic narrative thread (Pillar 7), longer form.
- **Sunday**: reflective community Q (Pillar 6) + long-form X Article (Pillar 8) republished from site.

### Calendar overrides (Hindu festival windows)

Use existing `idea-sourcer` calendar logic. Override windows:

| Window | Pillar override | Format flavor |
|---|---|---|
| Navratri (9 days, autumn) | Devi pillars dominate (Shakta verse, Lalita Sahasranama, Chhinnamasta) | Daily Devi shloka, daily aspect-of-Devi explainer |
| Maha Shivaratri | Shiva pillars dominate | Shiva Tandava verse, Shiva-Shakti philosophy, Lingam meaning |
| Krishna Janmashtami | Vaishnava + BG focus | Gita verse + commentary, Krishna-Arjuna dialogue |
| Ram Navami | Ramayana + dharma focus | Rama character, dharma-as-lived |
| Diwali | Light, Lakshmi, Yama Dvitiya, Govardhan stories | Multi-day arc |
| Guru Purnima | Guru-shishya, parampara, sampradaya | Lineage explainers, reverence posts |
| Ekadashi (twice monthly) | Practice content + Vishnu shloka | Fasting, practice instruction |

Calendar source: `idea-sourcer` skill (extend to emit calendar.json for the year).

---

## 5. Audience segments

| Segment | Size estimate | What they want | Format that lands |
|---|---|---|---|
| **Serious students** (Vedanta, Yoga, Tantra practitioners) | Small, high-engagement | Citations, depth, named commentators | Verse + commentary, school comparison, claim decomposition |
| **Curious seekers** (Western + Indian, secular-curious) | Medium, growing | Accessibility, modern bridges (when honest) | Concept explainer, claim decomposition, reflective Q |
| **Devotees** (Vaishnava, Shaiva, Shakta) | Medium, deeply loyal | Practice, devotion with structure | Practice instruction, verse anchor, festival content |
| **Sanskrit learners** | Small, vocal | Etymology, grammar, vocabulary | Word-of-day, etymology threads |
| **Ankit's adjacent network** (tech, coffee, building) | Existing | Translation between modern and traditional | Concept explainer, claim decomposition with rigor |

If a post would only land with one segment, that's fine. If it lands with none, kill it.

---

## 6. North-star metrics

**Vanity metrics to ignore**: follower count, like count without context, retweet count.

**Real metrics**:

1. **Profile → opensadhaka.com click-through rate**. The only X metric that ties to site indexation. Track via UTM (`?utm_source=x&utm_campaign=<post-id>`).
2. **Quote-tweet to retweet ratio**. Quote tweets indicate substantive engagement (the user added a thought). Retweets are passive.
3. **Reply quality** (manual scoring weekly). Score 1-5 on whether the replies show the post sparked thinking.
4. **Article-publication anchoring**. Every week, ≥80% of X posts trace to a site asset (existing or scheduled).
5. **Citation propagation**. Track when other accounts cite Sadhaka in their posts (Brand24-equivalent free, manual scan acceptable).
6. **Substack/email signups attributable to X** (when newsletter launches).

Targets at 6 months:
- 5K followers (slow + quality, not bought)
- 3-5% CTR from profile clicks to site
- 100+ quote tweets per month
- 50+ unique citations from other accounts

---

## 7. Hard rules (non-negotiable)

1. **No post without an asset trail.** Every post traces to an article, stotra, sahasranama, BG shloka, or `kb/claim`. If the asset doesn't exist yet, the post becomes a publication trigger ("write the article first").
2. **No claim outside the KB.** If a post asserts a factual claim about Indian philosophy/history that is not already in `kb/claims/*.md` with a verdict, do not post it. Add it to the claim backlog first.
3. **No politics.** None. Not even if the news cycle invites it.
4. **No astrology.** None. Not even cultural-context posts about Jyotisha as a darshana, until we have explicit articles on Jyotisha that frame it correctly.
5. **No sensational hooks.** "MIND-BLOWING", "SECRET", "WHAT THEY DON'T TELL YOU" are banned.
6. **No engagement-bait Qs.** Reflective questions are about the topic, not about audience response.
7. **No misattributed quotes.** Especially Vivekananda and the Gita. If the quote is real, give chapter:verse. If not, don't post.
8. **No "Hindu" as default identity tag.** Use Sanatan or name the school.
9. **No em dashes** (project-wide rule).
10. **No bot-mode.** A post takes a human to read it before publication, even if AI drafted it.

---

## 8. Workflow (high-level)

```
   Calendar / Article publish / Peer trend / Festival
                        │
                        ▼
              .claude/skills/idea-sourcer (X mode)
                        │
                        ▼
              content/x-queue/queue.json (idea cards)
                        │
                        ▼
   .claude/skills/write-x-sadhaka (drafts via Claude or xAI Grok)
                        │
                        ▼
              content/x-queue/drafts/YYYY-MM-DD/*.json
                        │
                        ▼
       Voice / slop / claim-anchor gates (scripts/x/qc.mjs)
                        │
                        ▼
              content/x-queue/approved/...
                        │
                        ▼
           [optional] generate-sadhaka-images for visuals
                        │
                        ▼
              scripts/x/post-queue.mjs (X API)
                        │
                        ▼
              content/x-queue/posted/...
                        │
                        ▼
              scripts/x/pull-metrics.mjs (X API)
                        │
                        ▼
              content/x-queue/metrics/...
                        │
                        ▼
       .claude/skills/debrief (extends with X mode)
                        │
                        ▼
       Updates references/voice.md (what works / what flops)
                        │
                        ▼
       Feeds back into idea-sourcer
```

Each component is implemented in phases (see `README` of `content/x-strategy/` once Phases 2-6 begin).

---

## 9. Phasing reminder

| Phase | Status | Output |
|---|---|---|
| 1 | ✅ Done | `peer-patterns.md`, `sadhaka-x-strategy.md`, `format-catalog.md` |
| 2 | **In progress** | `.claude/skills/write-x-sadhaka/` (SKILL.md + voice + kb-bridge + calibration) |
| 3 | Pending | `.claude/skills/x-queue-manage/` skill + `content/x-queue/` schema |
| 4 | Pending | `scripts/x/generate-batch.mjs` (xAI Grok or Claude) + research listeners |
| 5 | Pending | `scripts/x/post-queue.mjs` + scheduler |
| 6 | Pending | `scripts/x/pull-metrics.mjs` + extend `debrief` skill with X mode |

Resolved decisions:
- **Handle**: `@opensadhaka`.
- **Voice**: first-person anonymous sadhaka. Voice profile is v1 bio-inferred (no calibration against existing posts; new account, blank slate).
- **Substack**: out of scope for this build. Will be a downstream pipeline.
- **Posting / research access**: X Developer access provisioned. Phase 5 auto-post is greenlit. Phase 4 expands to include research listeners (peer post performance, mention listening, misclaim detection).

Default proposal for the remaining open lever:
- **Phase 4 model routing**: xAI Grok via `api.x.ai` for bulk first-draft (cheap, plenty of context). Claude Sonnet 4.6 for voice review pass (catches slop, em dashes, persona drift). User confirms or overrides.
- **Phase 5 posting safety**: manual approval gate for the first 30 days (every post is reviewed before publishing). After that, low-risk pillars (Pillar 1 verse anchor, Pillar 2 concept explainer, Pillar 9 etymology, Pillar 6 reflective Q) can move to auto-post. Higher-risk pillars (Pillar 4 claim decomposition, Pillar 7 epic thread, Pillar 8 long-form) stay on manual approval indefinitely.

---

## 10. Research pipelines unlocked by X Dev access

Phase 4 expands beyond drafting to include three research listeners (each is a `scripts/x/listen-*.mjs`):

| Listener | What it pulls | Feeds into |
|---|---|---|
| `listen-peers.mjs` | Top-engagement posts from accounts in `peer-patterns.md` (weekly cadence) | `idea-sourcer` (X mode) — surface what's working in the niche this week |
| `listen-mentions.mjs` | All posts mentioning `@opensadhaka` or `opensadhaka.com` | `debrief` (X mode) — track citation propagation, sentiment, conversation triggers |
| `listen-misclaims.mjs` | Search for common misattributed quotes ("Vivekananda said...", "the Gita teaches...") and high-volume sensational claims | `idea-sourcer` (X mode) — surface candidate Pillar 4 claim-decomposition posts |

**X API tier requirement to confirm with Ankit**: Free tier supports posting (1500 writes/mo) but heavily restricts search/listening. The three listeners above require Basic tier ($100/mo) at minimum. If Ankit is on Free tier, Phase 5 posting works but Phase 4 listening must wait for tier upgrade.

---

## 11. Open questions remaining

- **X API tier**: free, basic ($100/mo), or pro ($5K/mo)? Determines whether research listeners are immediately available.
- **Bio for `@opensadhaka` account**: suggested first draft — "studying sanatan. reading texts. practicing. reporting back. opensadhaka.com". Confirm or revise.
- **Avatar / cover**: anonymous voice means no face. Suggest a clean Sanskrit-ligature mark (ॐ done with type discipline, not generic AI) or a single high-craft temple-detail crop. Will commission via `generate-sadhaka-images` once direction is set.
