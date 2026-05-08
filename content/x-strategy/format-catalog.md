# Sadhaka X Format Catalog

**Purpose**: Concrete templates for every Sadhaka X post format. Used by `write-x-sadhaka` skill at draft time.

**Last updated**: 2026-05-07

Each format has: use case, length, template skeleton, 1-2 worked examples (illustrative only, not posted), hooks, and failure modes.

X character limit: **280** per post. Threads are concatenated 280-char tweets. Example char counts are noted as `(N chars)`.

---

## 1. Verse Anchor

**Use case**: Daily morning shloka, evening philosophy slot. Anchor format. Single shloka from BG, Upanishad, stotra, or Vedic text + 2-3 line commentary.

**Length**: 1 tweet (200-280 chars total).

**Template**:
```
{Sanskrit verse in Devanagari, optional}
{Transliteration}
"{Plain English translation}"

{2-3 line commentary connecting verse to lived experience}

— {Text} {chapter}.{verse}
```

**Example A (BG)**:
```
yadā yadā hi dharmasya
glānir bhavati bhārata
"Whenever dharma falters, balance is restored."

Krishna's promise in chapter 4. The verse is often quoted to mean "an avatar will come". Read carefully, it says dharma itself is self-correcting. We are part of that mechanism.

— Bhagavad Gita 4.7
(279 chars)
```

**Example B (Upanishad)**:
```
"Tat tvam asi"
You are That.

Three words from the Chandogya Upanishad that Shankara built an entire school around. The "you" is not your personality. The "That" is not a deity. Both names point to the same single fact.

— Chandogya Upanishad 6.8.7
(264 chars)
```

**Hooks**: Open with the Sanskrit, the transliteration, or the translation. Never with "Today's verse is...". Never with "Did you know...".

**Failure modes**: Bot-style verse-only post (no commentary). Vague commentary that could fit any verse. Misnumbered citations.

---

## 2. Concept Explainer

**Use case**: Mid-morning slot. One concept (Maya, Brahman, Dharma, Karma) explained in 1-3 lines plain language. Links to article on opensadhaka.com via UTM.

**Length**: 1 tweet (180-260 chars).

**Template**:
```
{Sanskrit term} in {school} does not mean {common-misreading}.

It means {accurate-one-line-definition}.

{One-line implication or named-commentator anchor}.

opensadhaka.com/{slug}?utm_source=x&utm_campaign={post-id}
```

**Example A**:
```
Maya in Advaita Vedanta does not mean "illusion" the way English uses the word.

It means the appearance of multiplicity in what is actually non-dual. Shankara's framing.

The world is real, but not as you take it to be.

opensadhaka.com/what-is-maya?utm_source=x
(279 chars)
```

**Example B**:
```
Karma is not a moral ledger.

It is the structural law that every act has a structural consequence. The Brihadaranyaka Upanishad puts it this way: as a person acts, so they become.

Not punishment. Not reward. Just continuity.

opensadhaka.com/how-karma-dharma-work
(279 chars)
```

**Hooks**: Negation hook ("X does not mean Y") works well. Direct definition also works.

**Failure modes**: Three concepts in one post (split it). Vague claims without commentator anchor. Link without context.

---

## 3. Practice Instruction

**Use case**: Afternoon slot. Actionable sadhana with specific instruction (mantra count, posture, time, breath). Mirrors kutumbofshankar format but with school/text attribution.

**Length**: 1 tweet (220-280 chars) for short practice. Thread (3-5 tweets) for full instruction.

**Template (single tweet)**:
```
{Specific instruction: chant X, sit Y, hold breath Z}.

{One-line on what it does or why it works in the tradition}.

{Source: text, school, or named teacher}.
```

**Example A**:
```
Chant "Om" once on each exhale, for 11 cycles, before sleep.

The Mandukya Upanishad describes Om as the symbol of the four states of consciousness. Eleven cycles is enough to slow the breath without effort. Anything more becomes performative.

— Patanjali, Yoga Sutras 1.27
(280 chars)
```

**Example B (thread)**:
Tweet 1:
```
how to start japa: a 5-step thread.
not the romantic version. the sit-and-do-it version.

(if you have never chanted a mantra before, read this. if you've been told japa is "advanced", stop reading the people who told you that.)
(254 chars)
```

Tweet 2:
```
1. pick a mantra you actually know.

"om namah shivaya" if you don't know what to pick. five syllables. devanagari: ॐ नमः शिवाय.

it does not matter that you don't know what it "really means". the meaning unfolds through the practice, not before it.
(258 chars)
```

[... continues ...]

**Hooks**: "How to start X." "The five-minute version of Y." "Without making it weird."

**Failure modes**: Vague instructions ("meditate daily"). No source. Practices that require initiation framed as DIY (some Tantric mantras need a guru).

---

## 4. Claim Decomposition

**Use case**: Afternoon slot. Address a sensational claim circulating online ("Sushruta invented plastic surgery"). Decomposes into scoped sub-claims with verdict tags. Pulls directly from `backend/app/knowledge/kb/claims/*.md`.

**Length**: Thread (3-6 tweets) — single tweet rarely fits the rigor.

**Template**:
Tweet 1 (the claim):
```
"{The popular claim, in quotes}".

You see this on Twitter, on WhatsApp, in school textbooks. Some of it is true. Some of it isn't. Let's separate them.

(Thread)
```

Tweet 2-N (each sub-claim with verdict):
```
{Sub-claim} → {Verdict: SUPPORTED / PARTIAL / NOT SUPPORTED}

{One-line evidence: what the primary text actually says}.

{Source: text, chapter:verse if relevant}.
```

Final tweet:
```
What this means: {synthesis line}.

Full breakdown with sources: opensadhaka.com/claims/{slug}
```

**Example (compressed)**:
Tweet 1:
```
"Sushruta invented plastic surgery." you've seen this claim. some of it is real. most of what gets shared is not. quick thread to separate them.
(150 chars)
```

Tweet 2:
```
Sub-claim: Sushruta describes a procedure that resembles modern rhinoplasty.
Verdict: SUPPORTED.

The Sushruta Samhita does describe a forehead-flap nasal reconstruction. Sutrasthana 16. This is the historical seed of the technique we now call rhinoplasty.
(257 chars)
```

Tweet 3:
```
Sub-claim: Sushruta "invented modern plastic surgery".
Verdict: NOT SUPPORTED.

Plastic surgery as a discipline emerged in the 19th-20th century. Sushruta's procedure is one ancestor among many. Calling him "the inventor" collapses 2,000 years of separate development.
(274 chars)
```

[... continues with sub-claims on anesthesia, sterilization, etc.]

Final:
```
The honest version: Sushruta's text contains real surgical knowledge that modern medicine drew from. It is not the same thing as inventing modern surgery. Both takes are wrong: total dismissal and total triumphalism.

Full sources: opensadhaka.com/claims/sushruta-plastic-surgery
(275 chars)
```

**Hooks**: Quote the claim verbatim. Promise the verdict. Never use "MYTH" as a hook.

**Failure modes**: Sub-claims without verdict tags. Verdicts without primary-text citations. Going beyond what the `kb/claims/*.md` file actually supports (the file is the canon).

---

## 5. School Comparison

**Use case**: Mid-morning or evening slot. Two or more schools' takes on one question (Self, world, liberation, devotion, the nature of Brahman).

**Length**: 1 tweet (200-280 chars) for binary comparison. Short thread for 3+ schools.

**Template**:
```
{Question}.

{School A}: {A's position in 1 line, named acharya if relevant}.
{School B}: {B's position in 1 line, named acharya if relevant}.

{The genuine disagreement, not the surface one}.
```

**Example**:
```
What is the soul's relationship with God?

Advaita (Shankara): same substance appearing as separate. Non-different.
Dvaita (Madhva): permanently distinct. The soul is dependent, not derivative.

The disagreement isn't semantic. They predict different liberated states.

opensadhaka.com/advaita-vs-dvaita
(279 chars)
```

**Hooks**: Pose the question. Avoid "Most people think X. Actually it's Y." That collapses the schools.

**Failure modes**: Strawmanning the second school. Suggesting one is "more correct". The job is to clarify the disagreement, not pick a winner.

---

## 6. Reflective Question

**Use case**: Late-night reflection slot, Sunday morning. Invitation to introspect, anchored to a concept or practice. Mirrors Priya_Kruthi format but tied to specific text.

**Length**: 1 tweet (160-240 chars). Sometimes 2 lines is enough.

**Template**:
```
{Setup: one-line context}.

{The question, addressed to "you" not "anyone"}.

{Optional second-order question or framing}.
```

**Example A**:
```
The Mandukya distinguishes four states: waking, dream, deep sleep, and turiya.

Of the first three, which one actually feels most like "you" when you check?

Most people answer waking. The text suggests another answer.
(225 chars)
```

**Example B**:
```
Patanjali defines yoga as the cessation of mental modifications.

Not breath control. Not asana. Cessation.

When did your mind last actually go quiet? Not relaxed. Quiet.
(178 chars)
```

**Hooks**: Direct question. The setup is the credibility, the question is the hook.

**Failure modes**: Engagement-bait questions ("comment below!"). Questions that telegraph the answer. Questions about the audience instead of the inquiry.

---

## 7. Epic Narrative Thread

**Use case**: Saturday slot. Character study from Mahabharata, Ramayana, or Puranic literature. Psychological / philosophical lens, not anime aesthetic.

**Length**: 5-10 tweets.

**Template**:

Tweet 1 (hook):
```
{Character name} {one striking detail or contradiction about them}.

{Promise of what the thread will resolve or unfold}.

(Thread)
```

Tweets 2-N: One beat per tweet. Beats are typically:
- Origin / context
- Defining choice
- Opposing force
- The pivot moment
- The aftermath
- The philosophical lesson the tradition extracts

Final tweet:
```
{Synthesis line}.

Full character study: opensadhaka.com/{character-slug}
```

**Example beats for Karna** (illustrative, not full):

Tweet 1:
```
Karna gave away the armor he was born with.

A god (Indra) asked him for it, knowing it would kill him. He gave it. He is not the hero. He is not the villain. He is the third thing both sides struggle to name.

Thread on the most studied tragic figure in the Mahabharata.
(279 chars)
```

Tweets 2-N: birth, abandonment, Duryodhana's offer, the curse, the dialogue with Krishna, the death, the meaning.

**Hooks**: Specific striking detail, not generic ("the greatest warrior"). Contradiction or paradox at the open.

**Failure modes**: Marvel-style hero/villain framing. Anime-aesthetic visual treatment. Ignoring the philosophical layer (these are not just stories, they're argument-vehicles for dharma).

---

## 8. Long-form X Article

**Use case**: Sunday slot. Republish a high-traffic site article as an X Article with a tighter open and X-native structure.

**Length**: X Articles support full essays. Aim for 800-1500 words.

**Template structure**:
1. **Hook paragraph** (3-4 sentences). The thesis stated plainly.
2. **Headers** (H2s) every 200-300 words.
3. **Pull quotes** from primary texts at section breaks.
4. **AEO direct-answer block** at the top (60-100 words) so AI engines can cite cleanly.
5. **Internal links** back to opensadhaka.com (4-6 minimum).
6. **Image**: cinematic AI or temple photography at the top.

**Source**: existing site articles. The X Article is a re-edit, not a re-write.

**Hooks for X Articles** (the open paragraph):
- Civilizational return ("This is what India has been waiting for...") — careful, can read political.
- Question-then-answer ("What do the Upanishads actually say about consciousness? Less than you think, and more than you think.")
- Contradiction ("The most common claim about Vedanta is also the most misunderstood.")

**Failure modes**: Auto-republishing the article verbatim (X has different reading rhythm). No internal links. AI-imagery that reads cheap.

---

## 9. Etymology / Sanskrit Word-of-Day (sub-format of Concept Explainer)

**Use case**: Targets Sanskrit-learner segment. Once or twice a week as a Pillar 2 variant.

**Length**: 1 tweet (200-280 chars).

**Template**:
```
{Word in Devanagari} ({transliteration}) — {literal etymology}.

{Why the etymology matters: what it reveals about the concept}.

{Modern usage or commentator anchor}.
```

**Example**:
```
श्रद्धा (śraddhā) — sometimes translated "faith". The root is √śrad, "to put trust in".

It is not blind belief. It is the act of putting weight on something to see if it holds.

The Bhagavad Gita uses it as a precondition for knowledge, not a substitute.
(254 chars)
```

**Failure modes**: Forcing a "deep" etymology where one doesn't exist. Treating "faith" and "śraddhā" as fully interchangeable.

---

## 10. Festival / Calendar Special

**Use case**: Calendar override windows (Navratri, Maha Shivaratri, etc.). Composed of any of formats 1-9, but themed and clustered.

**Approach**: For each festival window, pre-build a thematic series in `content/x-queue/` with one post per day in the window. Use `idea-sourcer` calendar mode to populate. Most posts use formats 1, 2, 5, 6 (verse, concept, comparison, reflection); occasional 3 (practice).

**Hard rule**: Festival content must still trace to assets. Navratri posts trace to Lalita Sahasranama, Devi articles, Shakta concept articles. If the asset doesn't exist, write it before the festival window opens.

---

## 11. Research Notebook Thread

**Use case**: Sparingly (2-4 posts/month). For Sanskrit philological inquiry, manuscript history, comparative-script work, computational textual analysis, or any "we found something interesting in the texts" content. Inspired by Nash Siddiqui's open-research-notebook tone, applied to Sadhaka's domain (Sanskrit and the textual tradition rather than Indus script).

Distinct from Claim Decomposition (which adjudicates a popular claim) and Epic Narrative Thread (which is character study). Research Notebook is forward-looking: "here is evidence, here is a tentative reading, here is what is still uncertain."

**Length**: Thread (4-7 tweets). Single tweet rarely fits the rigor.

**Template**:

Tweet 1 (hook):
```
{Specific finding or question}.

{One-line on why it matters or what it complicates}.

{If relevant, an artifact reference: manuscript, verse, inscription, parallel text}.

(Thread)
```

Tweet 2-N: One beat per tweet. Beats are typically:
- Background or context (one tweet)
- The evidence itself (1-2 tweets, often with image of manuscript / verse / artifact)
- The tentative reading (one tweet)
- Counter-considerations or what is still open (one tweet)
- What this might mean for understanding the larger text or tradition

Final tweet:
```
{Synthesis line, hedged where appropriate}.

What's still uncertain: {one or two open questions}.

Full notes: opensadhaka.com/{slug}?utm_source=x
```

**Example (illustrative, not posted)**:

Tweet 1:
```
The Mandukya Upanishad has 12 verses. The Mandukya Karika (Gaudapada's commentary) has 215.

In some manuscript traditions the Karika's verses are numbered as if they were part of the Upanishad itself. This shapes how Shankara's lineage receives the text.

(Thread)
(280 chars)
```

Tweet 2:
```
First, the manuscripts. The Madras Government Oriental Manuscripts Library (R.5215) and several Kerala manuscripts present the Upanishad and Karika as a unified 227-verse text. Other traditions (the printed Anandashrama edition) keep them strictly separate.
(279 chars)
```

[... continues with the evidence, the tentative reading, what's open ...]

Final tweet:
```
This isn't just textual housekeeping. If you take the Karika as Upanishad-level shruti, the Advaita reading of the Mandukya is canonical from inside the text itself. If you don't, it's a powerful interpretation but a separate one.

Open question: did Shankara himself draw this distinction?

opensadhaka.com/mandukya-karika-textual-status
(380 chars across tweets — fits with split)
```

**Hooks**: Specific finding stated plainly. Question that pivots on a textual detail. Side-by-side claim ("X says Y. The earliest manuscript actually says Z."). Never use "Did you know..." or "MIND-BLOWING".

**Failure modes**: Padding the thread because we want it to feel scholarly. Going beyond evidence (the format demands hedging). Over-claiming continuity ("This proves Vedic civilization is unbroken..."). Treating it as a contest rather than an inquiry.

**Asset trail**: Every Research Notebook Thread must link to a longer note on opensadhaka.com. The X version is a teaser; the site post carries the full sources, manuscript references, and bibliography.

**Tone discipline**: This is the only Sadhaka format where genuine uncertainty is a feature, not a bug. Hedge appropriately. The credibility comes from the rigor of the evidence and the honesty of what remains open.

---

## Hook patterns library (cross-format)

Rotation list. Pick one per post.

| Hook | Pattern | Use in formats |
|---|---|---|
| Sanskrit-first | `{Sanskrit phrase} {translation}.` | 1, 9 |
| Negation | `{Concept} does not mean {common-misreading}.` | 2, 4 |
| Question | `{Direct question}.` | 6 |
| Contradiction | `{Specific striking detail that contradicts assumption}.` | 7 |
| Quote | `"{Quote from primary text}".` | 1, 7, 8 |
| Verdict | `{Claim} → {Verdict tag}.` | 4 |
| Comparison | `{School A}: X. {School B}: Y.` | 5 |
| Direct definition | `{Term} means {one-line definition}.` | 2, 9 |
| Specific instruction | `{Concrete action}, {duration}.` | 3 |
| Specific finding | `{Plainly stated discovery or anomaly in the text}.` | 11 |
| Side-by-side claim | `{Common reading} vs. {what manuscript / earliest source actually says}.` | 11 |

**Hooks to never use**:
- "Did you know..." (unless followed by something genuinely surprising)
- "MIND. BLOWN."
- "The secret of..."
- "What they don't tell you"
- "Buckle up"
- "Strap in"
- "🧵" alone (only label threads of 5+ tweets)

---

## Quality gates (every draft passes through these)

Before a draft moves from `drafts/` to `approved/`:

1. **Asset trail**: Does this post link to or trace to a published asset on opensadhaka.com?
2. **Citation**: If shloka or claim, is the citation correct? Verse number, claim slug, named acharya.
3. **Voice score**: Run against `~/.claude/skills/sadhaka-voice` (or `stop-slop`). ≥35/50 required.
4. **No-em-dash check**: regex `—` scan. Reject on hit.
5. **Sanatan-not-Hindu check**: regex for "Hindu philosophy" / "Hindus believe" as undifferentiated framing. Allow when naming the school.
6. **No-claim-without-KB**: If the post asserts a factual claim, is there a `kb/claims/<slug>.md` file? If not, reject and create the claim file first.
7. **Char count**: every tweet under 280.
8. **Hook check**: not in the banned hook list.

These gates are implemented in `scripts/x/qc.mjs` (Phase 4).

---

## What this catalog is NOT

- It is not a content calendar. The calendar is in `content/x-queue/queue.json`.
- It is not a voice profile. Voice lives in `.claude/skills/write-x-sadhaka/references/voice.md`.
- It is not a peer reference. Peer patterns live in `peer-patterns.md`.

This is the templates layer. Read it when drafting. Don't write to it during drafting.
