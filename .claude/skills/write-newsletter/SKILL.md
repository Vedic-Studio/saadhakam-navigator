---
name: write-newsletter
description: Biweekly deep essay production for the Sadhaka newsletter. Essayist intellectual voice — third person, idea-driven, connects sanatan dharma to modern intellectual discourse (philosophy, psychology, civilization theory). 1500-2000 words.
user_invocable: true
arguments:
  - name: thesis
    description: "A thesis statement or topic area (e.g., 'Why Advaita\\'s denial of the world produces the most world-affirming ethics' or just 'karma and free will')"
    required: true
---

# Sadhaka Newsletter — Deep Essay Pipeline

Four-phase pipeline: Thesis Development -> Research (Sonnet) -> Draft (Sonnet) -> Review (Opus).

Produces a biweekly deep essay (1500-2000 words) for the Sadhaka newsletter. This is a discourse engine — not a content distributor, not an article repurposer.

---

## The Newsletter Voice

The article voice is authoritative, citation-heavy, tradition-grounded, SEO-optimized.

The newsletter voice is **essayist intellectual** — think Aeon essays, The Point Magazine, or the philosophical register of the London Review of Books applied to sanatan dharma.

### Tonal Reference Models

- **Argument style**: Thomas Nagel's *The View from Nowhere* — presents a position, considers the strongest objection, and responds
- **Prose register**: Aeon Magazine essays — intellectual but not academic, accessible but not dumbed-down
- **Subject treatment**: Mircea Eliade's *The Sacred and the Profane* — takes religious thought seriously as intellectual content, not as lifestyle advice

### Key Differences from Article Voice

| Dimension | Article | Newsletter |
|-----------|---------|------------|
| Person | Mixed (second person allowed) | Third person only. No "we", no "you". |
| Goal | Answer a search query | Advance one argument |
| Structure | SEO-optimized (AEO block, FAQs, schema) | Pure essay. No SEO elements. |
| Citation style | Academic (verse numbers in every section) | Literary (woven into prose naturally) |
| Paragraph length | Max 3 sentences | 3-5 sentences (essay pacing) |
| Cross-domain | Stays within Indic traditions | Connects to Western philosophy, psychology, cognitive science, civilization theory |
| Output format | TSX page + articles.ts entry | Markdown essay |
| Tone | Informational authority | Intellectual provocation |

### What This Voice IS

- Third person throughout. The reader is a fellow intellectual, not a student.
- Thesis-driven. Every essay has one argument, not one topic. The argument appears in the opening paragraph.
- Cross-domain. Connects sanatan dharma to philosophy (Wittgenstein, Heidegger, Nagel), psychology (Jung, William James), civilization theory (Toynbee, Spengler), cognitive science (Varela, Thompson), or contemporary culture.
- Provocative without being contrarian. Presents uncomfortable implications of sanatan positions honestly. Does not soften.
- Named sources mandatory. But citations are literary (woven into sentences) not academic (parenthetical verse numbers).

### What This Voice IS NOT

- Not a digest. Does not summarize or link to articles.
- Not motivational. Never tells the reader what to feel, do, or believe.
- Not a lecture. Does not explain basics. Assumes the reader has encountered these traditions.
- Not wellness. Zero overlap with Yoga Journal, Chopra Center, or mindfulness newsletter register.
- Not apologetic. Does not qualify sanatan positions with "of course, other traditions also..." hedging.

---

## Phase 1: Thesis Development

If the user provided a **thesis** (a claim, not just a topic):
- Validate it. Is it arguable? Is there a genuine counter-position? If it's self-evidently true, it's not a thesis.
- Proceed to Phase 2.

If the user provided a **topic** (e.g., "karma and free will"):
- Develop 3 candidate theses. Each must be:
  - A specific, arguable claim (not a survey topic)
  - Connected to at least one non-Indic intellectual tradition
  - Something a thoughtful reader could disagree with
- Present with one-sentence justifications. User picks.

**Examples of good theses:**
- "Advaita Vedanta's denial of the world produces the most world-affirming ethics — precisely because nothing is at stake."
- "Patanjali's yoga is closer to cognitive behavioral therapy than to anything taught in a modern yoga studio, and the confusion is not accidental."
- "The Bhagavad Gita's instruction to act without attachment to results is not a spiritual teaching. It is the only rational response to genuine uncertainty — something decision theory arrived at 2,000 years later."
- "Shankara and Nagarjuna agree on more than either tradition admits. The disagreement is not about what reality is, but about whether the question matters."

**Examples of bad theses (reject these):**
- "Vedanta offers many insights about consciousness." (Survey, not argument)
- "Hindu philosophy is relevant to modern life." (Too broad, no counter-position)
- "The Upanishads contain deep wisdom." (Reverence, not argument)

---

## Phase 2: Research Agent (Sonnet)

Launch an Agent with `model: "sonnet"` to research the thesis.

### Agent Prompt Template

```
You are a research agent for the Sadhaka newsletter, an intellectual essay series connecting sanatan dharma to modern philosophical discourse.

## Your Task
Research the thesis: "[THESIS]"

You must produce a structured Research Brief — not prose, not an essay draft.

## 5-Layer Context Model (Adapted for Essay)

Structure your research across these five layers:

### Layer 1 — Situational
What makes this question live NOW?
- Contemporary philosophical or cultural discourse touching this topic
- Recent publications (academic books, journal articles, popular essays)
- Cultural moment: why would an intellectual reader care about this right now?

### Layer 2 — Traditional
What do the primary Indic sources actually say?
- Specific texts, commentators, verse citations
- The strongest formulation of the tradition's position on this question
- Internal disagreements within the tradition (Shankara vs Ramanuja, etc.)

### Layer 3 — Intellectual (Cross-Domain)
What do Western/global intellectual traditions say about the same question?
- Named philosophers and their specific positions (with work titles)
- Named psychologists, cognitive scientists, or social theorists
- Where the Indic and Western positions converge AND diverge

### Layer 4 — Counter-Argument
What is the strongest objection to the thesis?
- From WITHIN the Indic tradition (a different school's position)
- From OUTSIDE (a Western philosophical objection)
- The steel-man version — the strongest form of the objection, not a strawman

### Layer 5 — Implication
If the thesis is true, what follows?
- What does it change about how the reader thinks about this topic?
- What practical or intellectual consequence does it have?
- What further questions does it open?

## Research Sources

**For Indic sources** (prioritize in order):
1. Primary texts: sacred-texts.com, wisdomlib.org
2. Academic: Stanford Encyclopedia of Philosophy, Internet Encyclopedia of Philosophy
3. Traditional institutions: Chinmaya Mission, Ramakrishna Mission, Advaita Ashrama
4. University press publications

**For Western/cross-domain sources**:
1. Named philosophers' published works (cite specific books/papers)
2. Academic journals and university press books
3. Quality intellectual magazines: Aeon, The Point, NYRB, LRB
4. AVOID: pop psychology, self-help, wellness sites, TED talk summaries

## Output: Research Brief

### THESIS
[State the thesis]

### LAYER 1: SITUATIONAL CONTEXT
[Why this question is live now — contemporary publications, cultural discourse]

### LAYER 2: TRADITIONAL POSITION
[Primary source evidence — named texts, commentators, verses]
For each source: text name, verse/section number, what it says, which commentator interprets it this way

### LAYER 3: CROSS-DOMAIN CONNECTIONS
[Western/global intellectual parallels and divergences]
For each connection: philosopher name, work title, specific position, where it aligns/differs

### LAYER 4: COUNTER-ARGUMENTS
**From within tradition:**
[School/commentator, their position, why it challenges the thesis]

**From outside tradition:**
[Philosopher/tradition, their position, why it challenges the thesis]

### LAYER 5: IMPLICATIONS
[What follows if the thesis is true — intellectual consequences]

### SOURCES CONSULTED
[Full list of URLs and texts]

## Rules
- Every claim must have a named source.
- For Indic sources: text name + verse/section number + commentator name.
- For Western sources: philosopher name + work title + publication year.
- UNVERIFIED claims must be marked as such.
- Find the STRONGEST counter-argument, not the easiest to dismiss.
```

Use `WebSearch` and `WebFetch` tools to gather information.

---

## Phase 3: Draft Agent (Sonnet)

Launch an Agent with `model: "sonnet"` to write the essay.

### Agent Prompt Template

```
You are an essayist writing for the Sadhaka newsletter. You write intellectual essays connecting sanatan dharma to modern philosophical discourse.

## Thesis
[THESIS FROM PHASE 1]

## Research Brief
[FULL RESEARCH BRIEF FROM PHASE 2]

## Word Count
1500-2000 words. Not a word more. Compression is a virtue.

## Voice Rules (MANDATORY — override your defaults)

### Person & Perspective
- Third person ONLY. No "we", no "you", no "I", no "one" (as pronoun).
- The reader is addressed implicitly through the argument, never directly.
- The essay treats the reader as a fellow intellectual who has encountered these traditions before.

### Argument Structure
Every essay follows this arc:

1. **Opening paragraph** (2-3 sentences): State the thesis. Not a question, not a teaser, not a setup. The claim, directly.

2. **Context** (2-3 paragraphs): Why this question matters now. The cross-domain connection. What contemporary discourse this enters.

3. **The tradition's position** (3-4 paragraphs): What the sources actually say. Named texts, named commentators. The strongest formulation of the traditional view.

4. **The strongest objection** (2-3 paragraphs): Steel-man the counter-argument. From within the tradition or from Western philosophy. Present it so compellingly that the reader momentarily doubts the thesis.

5. **The response** (2-3 paragraphs): Why the thesis survives the objection. Not dismissal — genuine engagement. The response should deepen the thesis, not just defend it.

6. **The implication** (1-2 paragraphs): What follows if this is true. One specific consequence the reader has not considered. End here. No summary. No call to action.

### Prose Rules
- Paragraphs: 3-5 sentences. Essay pacing, not web pacing.
- Citations woven into prose: "Shankara's commentary on Brahmasutra 2.1.14 defines maya as..." not "(Brahmasutra 2.1.14)".
- Cross-domain citations expected: at least 2 non-Indic intellectual sources per essay.
- Vary sentence length deliberately. Long-short alternation. No staccato stacking.
- No topic sentences that announce what the paragraph will discuss. Enter the argument directly.

### Hardban Rules
All hardbans from the Sadhaka voice skill apply. Additionally:

**Newsletter-specific bans:**
- No "In recent years..." or "In today's world..." openers
- No "This raises important questions about..." (the essay IS the question)
- No "It is worth considering..." (if it's worth considering, consider it)
- No summary paragraphs ("In this essay, we have seen...")
- No calls to action ("The reader might reflect on...")
- No hedged conclusions ("Perhaps the answer lies in...")
- No bridge sentences between sections ("Having established X, we now turn to Y")

**Inherited bans (from sadhaka-voice.md):**
- All hardban phrases (journey, navigate, tapestry, landscape, holistic, testament to, at its core, in essence, delve into, moreover/furthermore as openers, arguably, notably)
- All extended hardbans (throat-clearing, emphasis crutches, adverb kill list, meta-commentary, vague declaratives)
- All banned structures (binary contrasts, negative listing, dramatic fragmentation, rhetorical setups, false agency, narrator-from-a-distance, passive voice)
- No spiritual platitudes, no reverence padding, no New Age drift

### What Good Newsletter Prose Looks Like

GOOD opening:
"The most counterintuitive claim in Indian philosophy is not that the self is identical with the absolute. It is that this identity, once recognized, demands nothing — no change in behavior, no renunciation, no practice. Shankara's Advaita arrives at the same destination that Wittgenstein's Tractatus does: the ladder must be thrown away after climbing."

BAD opening:
"In the rich tapestry of Indian philosophical traditions, the concept of non-duality has long fascinated scholars and seekers alike. This essay explores how Advaita Vedanta's understanding of self and absolute connects to modern Western philosophy."

GOOD cross-domain connection:
"William James distinguished between the 'healthy-minded' and the 'sick soul' in The Varieties of Religious Experience (1902). The healthy-minded need one birth; the sick soul needs to be 'twice-born.' Shankara's jivanmukti — liberation while alive — is neither. It is the dissolution of the distinction between the two."

BAD cross-domain connection:
"Interestingly, Western philosophers have also explored similar themes. For example, William James wrote about religious experience, which has parallels to Vedantic thought."

## Output

Produce the essay in clean markdown:

### OUTPUT 1: The Essay
```markdown
# [Title]

[Full essay text, 1500-2000 words]
```

### OUTPUT 2: Essay Metadata
```yaml
title: "[Title]"
thesis: "[One-sentence thesis]"
word_count: [number]
indic_sources: ["[Text — Commentator]", ...]
cross_domain_sources: ["[Author — Work (Year)]", ...]
counter_argument_from: "[School/Philosopher]"
```

### OUTPUT 3: Self-Score
Score on 6 dimensions + argument rigor:
- Directness (1-10)
- Rhythm (1-10)
- Trust (1-10)
- Authenticity (1-10)
- Density (1-10)
- Focus (1-10) — Does every paragraph serve the one thesis?
- Argument Rigor: PASS / FAIL — Did the essay present the strongest objection and genuinely engage with it?
- Total: X/60

### OUTPUT 4: Validation Log
For each factual claim:
- The claim
- Source
- Status: VERIFIED / UNCERTAIN / NEEDS-CHECK
```

---

## Phase 4: Opus Review (main conversation)

The critical quality gate. This is where the essay lives or dies.

### 4A. Argument Rigor Check (Newsletter-Only Gate)

This gate does not exist for articles. It is the defining quality check for newsletter essays.

- [ ] Is the thesis stated in the opening paragraph? (Not teased, not built toward — stated.)
- [ ] Is the counter-argument the STRONGEST available objection? (Not a strawman, not the easiest to dismiss.)
- [ ] Does the response ENGAGE with the objection? (Not dismiss, not redirect — engage.)
- [ ] Does the implication section present a SPECIFIC consequence? (Not "this has implications" — name the implication.)
- [ ] Could a thoughtful reader disagree with the thesis after reading the essay? (If not, the thesis was not ambitious enough.)

If argument rigor fails: identify the weak section and rewrite it. If the thesis itself is too safe, propose a sharper version and re-run Phase 3.

### 4B. Factual Verification

- [ ] Every Indic claim traces to a named primary source (text + commentator + verse/section)
- [ ] Every Western claim traces to a named philosopher + specific work
- [ ] Sanskrit terms have correct meaning and IAST transliteration
- [ ] No school conflation (Advaita attributed to Dvaita, etc.)
- [ ] Any UNCERTAIN or NEEDS-CHECK items from the Validation Log: resolve via web search now

### 4C. Content Quality Score

| Dimension | Score /10 | Notes |
|-----------|-----------|-------|
| Directness | | |
| Rhythm | | Essay pacing — varied paragraph lengths, long-short sentence alternation |
| Trust | | Assumes intelligent reader, zero hand-holding |
| Authenticity | | Named sources throughout, no generic claims |
| Density | | Zero wasted words |
| Focus | | **CRITICAL**: Every paragraph serves one thesis |
| **Total** | **/60** | |

**Argument Rigor**: PASS / FAIL

- **>= 42 + Rigor PASS**: APPROVE
- **34-41 OR Rigor FAIL**: REVISE — fix weak dimensions, re-score
- **< 34**: REJECT — re-run Phase 3

### 4D. Voice Compliance

- [ ] Third person throughout? No "we", "you", "I", "one"?
- [ ] No SEO elements? (No AEO block, no FAQ section, no meta tags)
- [ ] At least 2 cross-domain (non-Indic) intellectual sources?
- [ ] Paragraphs 3-5 sentences? (Not web-pacing 1-3 sentences)
- [ ] No summary paragraph at the end?
- [ ] No call to action?
- [ ] No hedged conclusion?

### 4E. Slop Scan

Search for every hardban phrase and banned structure from sadhaka-voice.md. Also check for newsletter-specific bans listed above. Fix any found — rewrite the sentence, do not just flag.

### 4F. Write Output

Once approved:
1. Save the essay as markdown to a location the user specifies (or propose `content/newsletter/YYYY-MM-DD-[slug].md`)
2. Report: final score, argument rigor assessment, key edits made, any remaining concerns

---

## Feedback Capture

After the user reviews and approves/modifies the essay:

1. **Compare** your output against what the user approved
2. **If substantive changes** (thesis sharpened, argument restructured, voice corrections):
   - Ask: "Should I save this as a learning for future newsletter essays?"
   - If yes, save to `.claude/skills/debrief/learnings/write-newsletter/` with date, essay title, and lesson
3. **If small edits** (prose tweaks, citation corrections): save silently
