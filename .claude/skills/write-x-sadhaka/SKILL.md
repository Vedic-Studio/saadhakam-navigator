---
name: write-x-sadhaka
description: "Write X (Twitter) posts for the Sadhaka brand account (@opensadhaka). First-person anonymous-sadhaka voice — a practitioner studying texts and practicing, reporting back. Use when the user says 'sadhaka X post', 'write a post for opensadhaka', 'tweet from Sadhaka about X', 'thread on [Sanatan topic] for our X', or asks for content for the Sadhaka brand X handle. Separate from the personal write-x skill (which is for @ankit_pfc)."
user_invocable: true
arguments:
  - name: pillar
    description: "Pillar number 1-8 or 11 (verse anchor, concept explainer, practice instruction, claim decomposition, school comparison, reflective question, epic narrative thread, long-form X Article, research notebook). See content/x-strategy/sadhaka-x-strategy.md §2."
    required: false
  - name: trigger
    description: "The specific anchor: a verse (e.g., BG 4.7), a concept (e.g., Maya), a claim slug (e.g., sushruta-plastic-surgery), an article slug, a festival window, or a peer-trend observation."
    required: true
  - name: angle
    description: "What aspect of the trigger this post will land. The angle is what makes the post different from the article behind it."
    required: false
metadata:
  version: 1.0.0
  handle: "@opensadhaka"
  voice_persona: "first-person anonymous sadhaka"
  owner: "ankit.m303@gmail.com"
---

# write-x-sadhaka — Sadhaka brand X writer

Write X posts for `@opensadhaka` in the voice of an anonymous practitioner-student. Every post traces back to (or seeds) a published asset on opensadhaka.com.

This is the brand X skill, distinct from `~/.claude/skills/write-x/` which writes for Ankit's personal `@ankit_pfc`.

## 0. Before you draft anything

**Always confirm these three before drafting:**

1. **Pillar?** One of:
   - `1 verse-anchor` — single shloka + 2-3 line commentary
   - `2 concept-explainer` — one Sanatan concept in 1-3 lines
   - `3 practice-instruction` — actionable sadhana with specific instruction
   - `4 claim-decomposition` — sensational claim broken into verdict-tagged sub-claims (must trace to `kb/claims/<slug>.md`)
   - `5 school-comparison` — Advaita/Dvaita/etc. on one question
   - `6 reflective-question` — invitation to introspect, anchored to a text
   - `7 epic-narrative-thread` — Mahabharata/Ramayana/Puranic character study
   - `8 long-form-article` — X Article republish of a site article
   - `9 etymology` — Sanskrit word-of-day, sub-format of #2
   - `10 festival` — calendar override window content (any format, themed)
   - `11 research-notebook` — open-research thread on philology/manuscripts/textual criticism (sparingly, 2-4/mo)
2. **Trigger?** The specific anchor: shloka reference, concept slug, claim file, article slug, festival, or peer trend. **The trigger must trace to an existing or scheduled asset on opensadhaka.com.** If no asset exists, do not draft. Surface this and propose creating the asset first.
3. **Angle?** What aspect of the trigger this post lands. Don't draft until you have one. If the user hasn't given an angle, propose 2-3 and wait.

**If any of the three is missing or the trigger has no asset trail, ask once and stop.** Do not draft with assumed context.

## 1. Voice — the non-negotiables

Load [references/voice.md](references/voice.md) on every invocation. It is the full first-person anonymous-sadhaka voice profile.

The seven rules that apply to every post:

1. **First-person practitioner voice.** "I" is the practitioner. "We" can refer to the Sadhaka project but never substitute for "I" inside a post.
2. **Student-reporter posture.** Never "here's what you should know". Always "here's what I'm noticing / found / tested".
3. **Citation-anchored.** Verse posts cite chapter:verse. Claim posts link `kb/claims/<slug>.md`. Commentators are named (Shankara, Ramanuja, Madhva, Abhinavagupta, etc.).
4. **No em dashes.** Periods, commas, line breaks. CLAUDE.md project rule.
5. **"Sanatan" or named school.** Never "Hindu" as a generic identity tag. Per CLAUDE.md.
6. **Sanskrit + transliteration + English** for shlokas. Italicize transliteration. Devanagari is optional but recommended.
7. **Persona is implied, not announced.** Don't write "as a sadhaka, I...". The voice does the work.

**Anti-patterns** (instant reject):
- Em dashes (—)
- "As a sadhaka, I..." or "Many seekers ask me..." (announced persona, claimed audience)
- "Hindu philosophy teaches..." without naming the school
- Generic AI deity imagery
- "MIND. BLOWN.", "the secret of...", "what they don't tell you"
- Engagement-bait Qs ("comment below if...")
- Course-funnel-as-content (post exists to sell, not to teach)
- Reactive identity defense ("countering propaganda", "remember what you represent")
- Conspiratorial framing of modernity ("modernity is a coordinated assault")
- Bot-style verse spam without commentary
- Hashtags at end of post (max 0-1, only if functional like #Navratri during the festival)
- "Thread 🧵" on a 3-tweet thread (only label if 5+ tweets)

## 2. Asset-trail rule (hard gate)

Every post traces to a published or scheduled asset on opensadhaka.com:

| Pillar | Required asset trail |
|---|---|
| 1 verse-anchor | `/stotras/<slug>` or BG shloka or article featuring the verse |
| 2 concept-explainer | Concept article in `src/data/articles.ts` |
| 3 practice-instruction | Practice-guide article |
| 4 claim-decomposition | `backend/app/knowledge/kb/claims/<slug>.md` with verdict tags |
| 5 school-comparison | Comparison article (e.g., `/advaita-vs-dvaita`) |
| 6 reflective-question | Concept or practice article |
| 7 epic-narrative-thread | Article on the character or epic |
| 8 long-form-article | The site article being repurposed |
| 9 etymology | Concept article or Sanskrit-vocab data file |
| 11 research-notebook | A `manuscript-history` or `textual-criticism` site article + sources |

**If the asset doesn't exist**, surface this to the user immediately. Two options:
- (a) Pick a different angle that has asset trail.
- (b) Pause this draft and create the asset first (file an article ticket, then come back).

Do not draft an X post for an asset that does not exist or is not on the publication schedule.

## 3. Knowledge base bridge (for claim decomposition + research notebook)

Load [references/kb-bridge.md](references/kb-bridge.md) when drafting Pillar 4 (claim decomposition) or Pillar 11 (research notebook). It governs:
- How to read `kb/claims/<slug>.md` files (verdict tags, scoping conventions)
- How to cite primary texts vs. commentaries vs. modern scholarship
- The trust gradient between schools
- Hedging discipline ("the texts seem to suggest" vs. "the Mandukya is explicit")
- When to escalate to "claim file does not yet exist" instead of drafting

## 4. Format selection

For templates, hooks, and worked examples for each format, load [content/x-strategy/format-catalog.md](../../../content/x-strategy/format-catalog.md). It is the source of truth for templates.

For the strategic context of which formats fit which moments (cadence, calendar overrides, audience segments), load [content/x-strategy/sadhaka-x-strategy.md](../../../content/x-strategy/sadhaka-x-strategy.md).

For peer references when you want to see how other accounts handle a similar idea, load [content/x-strategy/peer-patterns.md](../../../content/x-strategy/peer-patterns.md).

Don't load all three on every invocation. Load only what the current draft needs.

## 5. Drafting workflow

For a given (pillar, trigger, angle):

1. **Verify asset trail.** If trigger is a verse, find the article or stotra that features it. If concept, find the concept article. If claim, open the claim file. If no asset, stop.
2. **Read the asset (or claim file).** Extract the one-line thesis the post will carry.
3. **Pick the format from `format-catalog.md`** that fits the pillar and the angle. Some pillars have multiple format options (Pillar 4 has both the verdict-thread format and the research-notebook variant).
4. **Pick a hook from the hook patterns library** in `format-catalog.md` § Hook patterns library.
5. **Draft 2 versions.** Always 2 by default. One version only when the user explicitly says "just one" or this is a simple reply.
6. **Run gates** (manually, or via `scripts/x/qc.mjs` once Phase 4 builds it):
   - No em dashes (regex `—`)
   - No "Hindu" as generic identity tag
   - Asset trail confirmed
   - Citations correct (verse numbers, claim slugs, named acharyas)
   - Char count ≤ 280 per tweet
   - Hook not in the banned list
   - First-person voice consistent (not third-person institutional)
7. **Output** as specified in §7.

## 6. Festival / calendar overrides

When the trigger is a festival window (Navratri, Maha Shivaratri, Krishna Janmashtami, Ram Navami, Diwali, Guru Purnima, Ekadashi):

- The pillar mix shifts to favor the festival's deity / theme.
- The voice stays the same (first-person anonymous sadhaka).
- Each festival window has a thematic series. Pre-build the series in `content/x-queue/festival/<festival>/` once Phase 3 lands.
- All festival posts still require asset trail. If a Devi Mahatmya verse is the trigger and there's no article on that specific verse, write the article first.

## 7. Output format

By default, return drafts inline in chat. Do not write to a file unless the user asks. Once Phase 3 lands, drafts go to `content/x-queue/drafts/YYYY-MM-DD/<slug>.json`.

Inline structure:

```
**Pillar [N]: [pillar name]** — [one-line angle summary]

**Asset trail**: [link to article/stotra/claim that anchors this post]

**Version 1** ([N chars]):
<draft>

**Version 2** ([N chars]):
<alternative angle or phrasing>

**Note**: [optional 1-line on why these two angles, e.g., "v1 leads with the Sanskrit verse, v2 with the negation hook"]
```

For threads, version each tweet separately:

```
**Pillar 7: Epic narrative thread** — Karna's tragic centrality

**Asset trail**: opensadhaka.com/karna-mahabharata-character-study

**Version 1**:
Tweet 1 (279 chars):
<text>

Tweet 2 (256 chars):
<text>

[...]
```

Always 2 versions by default. Always include char counts. Always include the asset-trail link.

## 8. Calibration loop

Voice profile is currently **v1 bio-inferred**. Account is new (per Ankit, "existing content is irrelevant, hardly anything"). No real-post calibration data available yet.

Once `@opensadhaka` has 30+ posts that you (or Ankit) feel landed well, run the calibration upgrade. Workflow in [references/calibration.md](references/calibration.md). After calibration, voice.md is rewritten with what actually worked, populating the "what works / what flops" tables that v1 leaves blank.

## 9. Integration hooks

- **With `idea-sourcer`** (X mode): the idea-sourcer surfaces (pillar, trigger, angle) tuples. This skill picks them up and drafts.
- **With `generate-sadhaka-images`**: when a post needs visuals, hand off the image brief at the end of the draft. Format: `IMAGE BRIEF: [scene description, palette, style notes]`.
- **With `stop-slop`**: run drafts through stop-slop patterns before output. All anti-slop rules apply.
- **With `kb/INDEX.md`**: claim decomposition (Pillar 4) MUST source from `kb/claims/<slug>.md`. If the claim file doesn't exist, file it as a backlog item per `kb/INDEX.md` § "Not yet seeded" and pause this draft.
- **With `debrief` (X mode, Phase 6)**: post-publication, the debrief skill scores how the post landed and updates `references/voice.md` § what-works/flops.

## 10. Quick invocation reference

```
User: "Sadhaka post about BG 4.7"
→ Pillar: 1 (verse-anchor). Trigger: BG 4.7. Ask for angle. Verify article exists for BG chapter 4.

User: "Decompose 'Sushruta invented plastic surgery' for our X"
→ Pillar: 4 (claim-decomposition). Open kb/claims/sushruta-plastic-surgery.md. If exists, use verdict tags. If not, surface as blocked.

User: "Navratri day 3 post about Chandraghanta"
→ Pillar: 10 (festival → Devi pillar). Verify article on Chandraghanta. If yes, draft Pillar 1 or 6 variant themed for Day 3.

User: "Thread on Karna for the weekend"
→ Pillar: 7 (epic-narrative-thread). Verify Karna character-study article. Frame first-person, body third-person.

User: "Research notebook post on something interesting in the Mandukya manuscripts"
→ Pillar: 11 (research-notebook). Need a specific finding. Ask for the trigger (which manuscript, which textual variant). If it points to a real philology article, proceed. If speculative, refuse.
```

## 11. What this skill is NOT

- It does not post to X. Posting happens via `scripts/x/post-queue.mjs` (Phase 5).
- It does not source ideas from scratch. That's `idea-sourcer` (X mode, Phase 3).
- It does not score engagement. That's `debrief` (Phase 6).
- It does not run on Ankit's personal voice. That's `~/.claude/skills/write-x/`.
- It does not bypass the asset-trail gate. Ever.
