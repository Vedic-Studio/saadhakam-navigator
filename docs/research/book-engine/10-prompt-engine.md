# Prompt Engine

LLM drafting prompts that operationalize the nine templates in [09-templates-kit.md](09-templates-kit.md). Each prompt is a tested shape: fill the slot-fillers, run the pass, then apply the audit. Prompts are written to be pasted into a Claude/GPT session — copy the block verbatim, insert the variables, do not paraphrase the instructions to the model.

Cross-reference: [02-voice-system.md](02-voice-system.md) (voice rules), [04-rhetoric-and-conviction.md](04-rhetoric-and-conviction.md) (rhetoric rules), [08-sadhaka-transposition.md](08-sadhaka-transposition.md) (anti-pattern firewall).

---

## 0. How to use this file

**The drafting pipeline**
1. **Outline** — Decide the post's *job* and pick the matching template (see [09](09-templates-kit.md) §11 decision tree).
2. **Slot-fill** — From the template's slot-fillers, write the specific inputs on a scratch page. These are NOT the draft; they are the ingredients.
3. **First-pass prompt** — Paste the template's "First-pass draft prompt" below, with your slot-fillers inserted. Run it.
4. **Voice pass prompt** — Paste the matching "Voice pass prompt" over the first draft.
5. **Audit pass prompt** — Paste the "Audit pass prompt" to check anti-patterns, scope qualifiers, and aphoristic density.
6. **Hand-edit** — The LLM gets you to pass-worthy. A human closes the last 10% — the specific memory, the exact Sanskrit, the idiom only the author would use.

**Variables convention**
- `{{ALL_CAPS}}` = required slot-filler
- `{{all_lower}}` = optional slot-filler
- `[bracketed guidance]` = instruction to the model, not a variable

**Model note**
Prompts are tuned for Claude Opus / Sonnet and GPT-4/5-class models. Smaller models will produce passable first drafts but will fail the voice pass. Do not skip the voice pass.

**Anti-slop preamble**
Every drafting prompt below opens with a shared preamble that loads the voice rules. Do not strip it. The preamble is the single largest lever on output quality.

---

## 1. The shared preamble

Paste this at the **top** of every drafting prompt. It establishes the voice, the register, and the non-negotiables.

```
You are drafting a post for a book on Sanatana Dharma (Sanatan philosophy). The book is not an introductory textbook and not a devotional tract. It is a cult-favorite non-fiction work in the style of anthology books that get passed hand-to-hand and re-read annually — the reader is treated as an initiate, not a beginner.

Voice rules (non-negotiable):
- Four available voices: Ācārya (precise, doctrinal, traditional), Sādhaka (first-person, confessional, in-progress), Satirist (dry, one-line cuts at contemporary confusion), Imported Voice (a single verse, sutra, or line from the tradition, quoted and framed).
- Second-person address for the reader ("you"), never "we" (no false solidarity), never "the reader" (no academic distance).
- Insider Sanskrit lexicon: śruti, smṛti, darśana, sādhanā, adhyāsa, anubhava, ātman, brahman, māyā, avidyā, paramparā, ācārya, adhikāra, svadharma, vyāvahārika, pāramārthika, and ~15 others are USED NOT TRANSLATED after first appearance. Never italicize them after first use.
- Scope-qualifier machinery: when a claim could be read as absolute, append its scope — vyāvahārika (conventional/relative) or pāramārthika (ultimate). Example: "Karma is real — vyāvahārika. In pāramārthika, the actor is not."
- Authority stack: when you make a claim, it must stand on at least one of — śruti (Veda/Upanishad), smṛti (Itihāsa/Purāṇa/Dharmaśāstra), ācārya-bhāṣya (commentator: Śaṅkara, Rāmānuja, Madhva, Abhinavagupta, etc.), or anubhava (lived experience, marked as such).
- No "we all feel" / "many people believe" / "in today's world" / "in this article". No em dashes substituted for paragraph breaks. No numbered lists unless the source is a numbered list. No "As an AI" disclaimers. No pop-spiritual phrasing ("your inner goddess", "manifestation", "high vibration", "energy").
- Sentence rhythm: vary aggressively. Fragments are welcome. One long sentence per paragraph maximum.

Banned phrases: "in today's fast-paced world", "in this article we will", "dive deep", "unpack", "explore", "journey", "delves into", "landscape of", "in conclusion", "moreover", "furthermore", "it is important to note".

Do not produce an introduction paragraph that describes what the post will do. Begin in the thing.
```

---

## 2. Template 1 — Framework Post

**Purpose**: deliver a doctrinal framework (darśana reading, term definition, scope-qualifier machinery) cleanly. Ācārya-dominant.

### First-pass draft prompt

```
[PASTE SHARED PREAMBLE]

Draft a Framework Post.

Topic: {{CONCEPT_OR_DISTINCTION}}
Primary darśana or school: {{DARSANA}}  (e.g., Advaita Vedānta, Viśiṣṭādvaita, Kashmir Shaiva, Dvaita)
The confusion being cleared: {{POPULAR_MISREADING}}  (one sentence — the reader's likely current understanding that this post will replace)
The core framework in one sentence: {{CORE_ANSWER}}
Scope distinction: {{SCOPE}}  (e.g., "vyāvahārika vs pāramārthika", "jīva vs ātman", "svarūpa vs taṭastha lakṣaṇa", "avidyā vs māyā")
Authority citations to land: {{CITATIONS}}  (specific — e.g., "Brahma Sūtra 2.1.14", "Kaṭha 1.2.23", "Śaṅkara Bhāṣya on BSB 1.1.4")
Mini-myth gesture (optional): {{GESTURE}}  (one plucked moment, max two sentences — e.g., "Uddālaka and Śvetaketu at the salt and the water")
Length target: {{WORDS}}  (default 1200)

Structure:
1. Cold open — do not introduce the topic. Land one precise claim that names the confusion. Two sentences max.
2. The framework, stated once, cleanly. Include the scope distinction as part of the framework, not as a later caveat.
3. The distinction walked out — show what the framework covers and what it does not. Use negation ("not X, not Y, not Z") at least once.
4. Mini-myth gesture, if supplied. Hand it over as already known.
5. Authority landing — cite the primary source(s). Do not paraphrase śruti; quote it, then frame.
6. One aphoristic close line. Pull-quote-worthy. No summary paragraph.

Do not explain the Sanskrit terms after first use. Do not define the darśana at the start. Do not add a "what this means for you" section.
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Here is a draft Framework Post. Revise for voice.

[PASTE DRAFT]

Revision targets:
1. Cut every sentence that describes what the post is doing. The post must do, not narrate its doing.
2. Every claim must stand on śruti / smṛti / ācārya-bhāṣya / anubhava — tag each claim mentally and cut the ones that stand on nothing.
3. Second-person address wherever "one" or "we" appears.
4. Restore scope qualifier wherever an absolute claim is naked. If a claim is deliberately absolute (pāramārthika), say so.
5. Break the longest sentence into two. Leave one long sentence in the post, not more.
6. Find the pull-quote line. If it is not in the last third, move the post's strongest compression there.
7. Delete any "in conclusion" / "in summary" / "to sum up" patterns. End on the aphorism.

Return only the revised post.
```

### Audit pass prompt

```
Audit this Framework Post against the anti-pattern firewall in the book engine.

[PASTE DRAFT]

Check each item and report PASS / FAIL with a one-line reason:
1. Opening: no meta-description, lands a precise claim in ≤2 sentences.
2. Scope qualifier present for every absolute claim.
3. Authority: at least one śruti/smṛti/ācārya citation, quoted or specifically named.
4. Sanskrit terms: not re-translated after first use; not italicized repeatedly.
5. No banned phrases (see preamble).
6. Aphoristic close: the last line is pull-quote-worthy (would survive on X without context).
7. No "journey" / "unpack" / "dive deep" / em-dash paragraph breaks.
8. No false-universal pronouns ("we all", "many of us").
9. One mini-myth gesture, at most — handed over, not retold.
10. Length within ±15% of target.

Then list the top 3 specific edits to fix any FAIL items.
```

---

## 3. Template 2 — Confessional Post

**Purpose**: first-person, in-progress account of a specific failure or recognition. Sādhaka voice only. Earns trust that no Ācārya post can earn.

### First-pass draft prompt

```
[PASTE SHARED PREAMBLE]

Draft a Confessional Post in the Sādhaka voice. First person. In-progress. Specific.

Scene: {{DATE_PLACE_OBJECT}}  (ground the reader in a real moment — e.g., "In 2017, in a rented room in Rishikesh, day 40 of a 41-day prāṇāyāma schedule.")
The self-deception: {{WHAT_I_THOUGHT_I_WAS_DOING}} / {{WHAT_I_WAS_ACTUALLY_DOING}}
The cracking moment: {{SPECIFIC_EVENT}}  (the exact thing that made the self-deception visible)
The quiet lesson: {{ONE_SENTENCE_LESSON}}  (offered, not preached, at the very end)
Śāstric anchor (optional): {{CITATION}}  (one line from paramparā that names what the scene showed)
Length target: {{WORDS}}  (default 700–900)

Structure:
1. The specific opening — a real scene. Date, place, object, conversation. No generalities.
2. The admission — what I thought I was doing vs. what I was actually doing. Keep the gap narrow and precise.
3. The recognition — the exact moment that cracked it. Specific detail, not vague awareness.
4. The quiet lesson — one sentence. Offered as a door, not a command. No "and this taught me" framing.
5. (Optional) Śāstric anchor at the very end — one line from the tradition that names what the scene revealed.

Rules:
- The confessor loses. Do not rescue the confessor by the end. The cost is the credit.
- Do not generalize prematurely. The reader will generalize; your job is to stay inside the scene.
- No named real individuals. Patterns only when referring to others. First person is you.
- No "dear reader" asides. No "maybe this will help someone".
- If the author cannot supply this scene from their own life, STOP. Do not fabricate. Return the string: "NEEDS NAMED CONTRIBUTOR — do not fabricate a confessional."
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Revise this Confessional Post.

[PASTE DRAFT]

Revision targets:
1. Cut every sentence that makes the confessor look good. Cost without credit.
2. Replace every abstraction with the concrete object in the scene. "Meditation practice" → "the cushion at 5:42am". "Spiritual teacher" → "him, the one with the Rolex and the three teenagers in his car".
3. Tense check: the opening is past ("In 2017…"); the recognition moment may shift to present if it makes the scene sharper. Choose one and hold.
4. The quiet lesson at the end — is it offered or preached? Cut "we must" / "you should" / "this means that". One sentence, no imperative.
5. Delete any generalization before the final line. Specificity must outlast the urge to universalize.
6. Śāstric anchor: is it load-bearing or decorative? If decorative, cut.

Return only the revised post.
```

### Audit pass prompt

```
Audit this Confessional Post.

[PASTE DRAFT]

Check each item and report PASS / FAIL with a one-line reason:
1. Opens with a specific, grounded scene (date, place, object).
2. The confessor does not emerge heroic. The cost is evident in the final third.
3. No generalizations before the final line. No "and I learned that…"
4. The quiet lesson (last line) is offered, not imperative. Would work as an X post with no context.
5. No named real individuals besides the author/contributor.
6. Second person ("you") appears nowhere except possibly the last line, as an invitation.
7. No pop-spiritual vocabulary.
8. Length 600–1000 words.
9. Sanskrit terms, if used, are inside the scene, not lectured about.
10. Sādhaka voice only — no register-swings into Ācārya mid-scene.

Flag risk: if this confessional is not true (cannot be traced to a real event in the author's life or a named contributor's), mark CRITICAL FAIL and recommend withdrawal.
```

---

## 4. Template 3 — Claim → Scene → Slogan (the default post)

**Purpose**: the book's workhorse shape. Make a claim, walk the reader into a scene that lands it, close with a slogan line. Used for ~40% of posts.

### First-pass draft prompt

```
[PASTE SHARED PREAMBLE]

Draft a Claim → Scene → Slogan post.

The claim: {{ONE_LINE_CLAIM}}  (asserted flat, no hedges, the opening sentence of the post — e.g., "Most contemporary yoga is not yoga.")
The scope qualifier: {{SCOPE}}  (named either inside the claim sentence or immediately after — e.g., "This is a claim about the word, not about what people do on their mats.")
The scene: {{SENSORY_WALK_OR_FIELD_REPORT}}  (200–400 words — either a second-person sensory walk or a compressed contemporary field report; see [06](06-narration-system.md))
The pivot line: {{PIVOT}}  (the sentence that lands the claim through the scene — the sentence you want pulled out and shared)
Authority citation (optional but preferred): {{CITATION}}
Length target: {{WORDS}}  (default 900–1200)

Structure:
1. The claim, flat. One sentence. No "I think" / "some argue". If the claim needs a scope qualifier, it comes in sentence 2, not later.
2. A single short paragraph (2–3 sentences) that sharpens the claim by negation — "this is not X, and it is not Y".
3. The scene. Second-person sensory walk OR contemporary field report (pick one; do not mix).
4. The pivot line — the sentence that completes the argument through the scene. This is the slogan candidate.
5. (Optional) Citation — one line from śruti/smṛti/bhāṣya that names the principle the scene enacted.
6. Close with the pivot line isolated on its own paragraph, or with a second sharper restatement. No summary.

Do not explain the scene. Do not tell the reader what the scene means. The scene means what it is.
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Revise this Claim → Scene → Slogan post.

[PASTE DRAFT]

Revision targets:
1. The opening claim must be the first sentence. If there is a throat-clearing sentence before it, cut it.
2. The scene must occupy 40–60% of the total word count. If it is shorter, thicken the sensory detail. If longer, compress.
3. Scene specificity audit: every abstract noun in the scene becomes a concrete one. "A temple" → "the stone threshold of the Kashi Vishwanath, wet at 4am". "A practitioner" → "her, the woman in the orange shawl, seventy, teeth gone".
4. The pivot line must be pull-quote-worthy. If you cannot imagine it posted alone on X and landing, rewrite it.
5. No explanatory sentences after the scene. The scene is the argument.
6. If a scope qualifier is missing for a claim that reads absolute, insert one.
7. Break up any paragraph longer than 5 sentences.

Return only the revised post.
```

### Audit pass prompt

```
Audit this Claim → Scene → Slogan post.

[PASTE DRAFT]

Report PASS / FAIL per item:
1. The first sentence is the claim, flat, no hedges.
2. Scope qualifier present by sentence 2 (or the claim is deliberately absolute).
3. Scene occupies 40–60% of word count.
4. Scene uses ≥3 senses (sight + sound/smell/touch/temperature).
5. Scene does not include the word "imagine". It happens in present tense, second person.
6. Pivot line is a single pull-quote-worthy sentence.
7. Authority citation present and not paraphrased.
8. No explanatory/summary sentences after the pivot.
9. No banned phrases (see preamble).
10. Aphoristic density: at least one pull-quote line per 350 words.

List the top 3 specific edits to fix any FAIL.
```

---

## 5. Template 4 — Imported Voice Deep-Dive

**Purpose**: host a single śloka, sūtra, or line from the tradition; quote it, frame it, disappear. The book cedes the floor to its inheritance.

### First-pass draft prompt

```
[PASTE SHARED PREAMBLE]

Draft an Imported Voice Deep-Dive.

The line: {{VERSE_OR_SUTRA}}  (exact Sanskrit text in Devanagari or IAST, then translation)
Source: {{TEXT_AND_LOCATION}}  (e.g., "Kaṭha Upaniṣad 1.2.23", "Yoga Sūtra 1.2", "Spanda Kārikā 1.1", "Bhagavad Gītā 2.47")
Why this line now: {{CONTEXTUAL_HOOK}}  (one sentence — what in contemporary life makes this line's cut feel new)
The single claim the line makes: {{CORE_CLAIM}}  (stated in one sentence, in your voice)
What the line is NOT saying: {{NEGATION}}  (the popular misreading of this line — one or two sentences)
Ācārya-bhāṣya or commentator to bring in (optional): {{COMMENTATOR}}  (e.g., "Śaṅkara's reading", "Abhinavagupta's gloss")
Length target: {{WORDS}}  (default 800–1200)

Structure:
1. Contextual hook — one sentence, in your voice, that names the current confusion the line cuts through. No "today we will look at".
2. The line itself — Devanagari or IAST, then a clean translation. No commentary yet. Let it sit.
3. One paragraph — what the line actually claims, in your voice. Flat. One claim.
4. One paragraph — what the line is not claiming. The popular misreading, named.
5. (Optional) Commentator's reading — one paragraph, named and cited ("Śaṅkara on this line reads…"). Not paraphrased — specific move named.
6. Close: the line, restated or isolated, as the final paragraph. The post ends on the tradition's voice, not yours.

Your voice is a frame. The line is the content. If your commentary outweighs the line, cut your commentary.
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Revise this Imported Voice Deep-Dive.

[PASTE DRAFT]

Revision targets:
1. The line (Sanskrit + translation) is presented CLEANLY before any commentary. No "let us consider" intros.
2. Your commentary is ≤60% of the word count. If it exceeds, cut the least-specific paragraph first.
3. The line is not paraphrased anywhere else in the post. Quote it verbatim at start and end if restated.
4. Commentator citation is specific — a reading, a distinction, a scoped claim — not a vague "as commentators have noted".
5. Final paragraph belongs to the line, not to you.
6. No "this verse tells us" / "we learn from this that". The line teaches directly; your prose steps aside.
7. Contextual hook: specific enough that a reader recognizes the confusion without being told it is contemporary.

Return only the revised post.
```

### Audit pass prompt

```
Audit this Imported Voice Deep-Dive.

[PASTE DRAFT]

Report PASS / FAIL per item:
1. The line appears in Sanskrit (Devanagari or IAST) with a clean translation, before any commentary.
2. Source is named with exact chapter/verse or sūtra number.
3. Author's commentary is ≤60% of word count.
4. What the line is NOT saying is explicitly addressed.
5. If a commentator is brought in, their specific move is named — not a vague nod.
6. Post closes on the tradition's voice (the line, restated or isolated), not on author commentary.
7. No paraphrase-as-translation — the translation preserves the line's compression.
8. Sanskrit terms unglossed after first use.
9. Aphoristic line(s) present in the frame, not just the original.
10. Length within ±15% of target.
```

---

## 6. Template 5 — Aphoristic Coda

**Purpose**: a very short post (150–350 words) that sits between longer posts. Multiple aphorisms on a single axis, loosely braided. Closes a micro-sequence.

### First-pass draft prompt

```
[PASTE SHARED PREAMBLE]

Draft an Aphoristic Coda.

The axis: {{SINGLE_CONCEPT}}  (one concept — e.g., "adhikāra", "sādhanā in secret", "the body as śikṣā")
Preceding posts in the sequence: {{CONTEXT}}  (one line per preceding post — so this coda lands in-stream, not cold)
Desired aphorism count: {{COUNT}}  (default 5–8)
Closing gesture (optional): {{CLOSING_LINE}}  (a final line that seals the coda — often a śāstric echo or a Satirist cut)

Structure:
A sequence of 5–8 short paragraphs. Each is one aphorism. Each fits in a single X post (≤280 characters).

Rules:
- No connectives between aphorisms. No "moreover", "also", "related to this". White space does the work.
- Each aphorism is independent — can be pulled and shared without the others.
- Each aphorism is on the axis but from a different angle: definition, negation, consequence, warning, śāstric echo, Satirist cut, sensory image, second-person turn.
- No list numbering. Just paragraphs.
- Voice-swing across the aphorisms is welcome — Ācārya, Sādhaka, Satirist, Imported Voice can all appear in one coda.
- The closing aphorism is the sharpest. The one you would pick if only one could survive.
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Revise this Aphoristic Coda.

[PASTE DRAFT]

Revision targets:
1. Cut any connective tissue between aphorisms. They should stand alone.
2. Each aphorism must survive as an X post. Read each aloud — if it needs the previous one to make sense, rewrite it to stand alone.
3. No duplicate angles. If two aphorisms do the same work (both definitions, both warnings), kill one or refashion.
4. Voice diversity — at least 3 of the 4 voices should be represented across 5+ aphorisms.
5. The last aphorism is the sharpest. Move the sharpest line to the end if not already there.
6. Length discipline: the whole coda is 150–350 words. Not 400. Not 500.

Return only the revised coda.
```

### Audit pass prompt

```
Audit this Aphoristic Coda.

[PASTE DRAFT]

Report PASS / FAIL per item:
1. 5–8 independent aphorisms, each ≤280 characters.
2. No connectives between them ("moreover", "also", "this means").
3. Each aphorism can be copy-pasted and shared alone.
4. Voice diversity: ≥3 of Ācārya/Sādhaka/Satirist/Imported Voice are present.
5. The last aphorism is the sharpest/most memorable.
6. No repeated angle (definition, negation, warning, etc.) beyond two.
7. Length: 150–350 words total.
8. No banned phrases.
9. Scope qualifiers present where any aphorism risks reading absolute.
10. No list numbering; paragraph form only.
```

---

## 7. Template 6 — Field Report

**Purpose**: narrate a contemporary moment (overheard, observed, encountered), compress it, attach a śāstric pivot. Highest edge-per-word ratio in the book.

### First-pass draft prompt

```
[PASTE SHARED PREAMBLE]

Draft a Field Report.

The moment: {{SCENE}}  (one specific contemporary observation — overheard conversation, photograph, panel, class, funeral, retreat. Patterns not names.)
The anchoring detail: {{DETAIL}}  (the one concrete detail that makes the scene land — the tomato juice, the three rudraksha strands, the exact phrase used)
The pattern it exemplifies: {{PATTERN}}  (one sentence — the contemporary confusion)
The śāstric pivot: {{SANSKRIT_OR_SLOKA}}  (the term, line, or distinction from the tradition that names what the scene was actually doing)
Length target: {{WORDS}}  (default 250–400)

Structure:
1. The scene, compressed. 150–250 words. Specific. No framing ("the other day I saw").
2. One pivot line — the named pattern (contemporary) or the śāstric term that names it.
3. One paragraph (3–5 sentences) — the śāstric reading. What the tradition already named, and what the scene was.
4. Close on the śāstric line itself, isolated. No return to the contemporary scene.

Rules:
- No named real individuals. Pattern, always.
- No generalizing mid-scene. Stay in the specific until the pivot.
- The pivot is the sharpest line. Pull-quote-worthy.
- No "and this reminds us that" / "which shows how". The pivot is handed over, not introduced.
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Revise this Field Report.

[PASTE DRAFT]

Revision targets:
1. The anchoring detail — sharpen it. Replace any generic noun with a concrete one. The reader should see the tomato juice, not "a drink".
2. Compression — if the scene is over 250 words, cut. A field report that goes long becomes essay.
3. No named real individuals. If one slipped in, remove or pattern-ize ("the teacher" not "Sarah").
4. The pivot line must shock slightly. If it reads flat, replace with the sharper śāstric term.
5. The closing line — is it the śāstric line, isolated? If the post drifts back to the author's voice after the pivot, cut.
6. No meta-frame ("I want to tell you about"). Start in the scene.

Return only the revised post.
```

### Audit pass prompt

```
Audit this Field Report.

[PASTE DRAFT]

Report PASS / FAIL per item:
1. Opens in the scene, no meta-frame.
2. One anchoring detail is concrete and specific.
3. No named real individuals; patterns only.
4. Scene ≤250 words.
5. Total length 250–400 words.
6. Śāstric pivot: a specific term, line, or distinction named (not paraphrased).
7. The śāstric reading paragraph is ≤5 sentences.
8. Closes on the śāstric line, isolated.
9. No "this shows that" / "and this reminds us" framing.
10. Aphoristic pivot line is pull-quote-worthy.
```

---

## 8. Template 7 — Pillar Braided Post

**Purpose**: the 2000–3000 word flagship post on a major axis. Braids all four narration modes. Anchors a Part.

### First-pass draft prompt (staged)

Pillar posts are too long for a single-shot prompt. Use staged drafting.

**Stage 1 — Outline**

```
[PASTE SHARED PREAMBLE]

Outline a Pillar Braided Post.

Axis: {{CONCEPT_AXIS}}  (e.g., māyā, karma, adhikāra, the jīvan-mukta)
Part of the book: {{PART}}  (I: The Veil / II: The Ground / III: The Path / IV: The Silence)
The claim the pillar delivers: {{PILLAR_CLAIM}}
Audience position: {{WHERE_THE_READER_IS}}  (what prior posts have and have not established)
Target length: {{WORDS}}  (default 2500)

Output a beat-sheet with these seven sections, each labeled with voice and word-count:
1. Field Report (200w, observational voice) — {{FIELD_REPORT_SCENE}}
2. Ācārya framework (400w) — {{FRAMEWORK}}
3. Mini-myth gesture (100w) — {{GESTURE}}
4. Second-person sensory walk (300w) — {{WALK_PLACE_AND_PIVOT}}
5. Confessional (400w, Sādhaka voice) — {{CONFESSIONAL_SCENE}}
6. Ācārya return (300w) — {{SYNTHESIS_MOVE}}
7. Invocation (50w, Imported Voice) — {{CLOSING_LINE}}

For each section, specify: (a) the one claim it lands, (b) the pivot line, (c) how it hands off to the next section.
```

**Stage 2 — Draft each section separately**

For each section in the outline, use the matching template's first-pass draft prompt (Field Report → Template 6, Framework → Template 1, Confessional → Template 2, etc.). Draft each to its target length.

**Stage 3 — Braid**

```
[PASTE SHARED PREAMBLE]

I have drafted seven sections of a Pillar Braided Post. Braid them into a single continuous post.

[PASTE ALL SEVEN SECTIONS IN ORDER]

Braiding rules:
1. Remove any redundant scene-setting at section starts — each section assumes the previous one.
2. Smooth transitions are NOT paragraphs. A transition is a register-change, a blank line, or a single pivot sentence.
3. No headers or numbering in the final post. The braid is continuous prose.
4. Adjacent sections must contrast in voice. If two adjacent sections end up in the same voice, flag it and recommend one's voice-swap.
5. Preserve the voice of each section — do not smooth the register-swing out of the post. The swing is the point.
6. The final paragraph is the Invocation — the Imported Voice, isolated.

Return the braided post.
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Revise this Pillar Braided Post.

[PASTE DRAFT]

Revision targets:
1. Register-swing audit: every 300–500 words, the voice should change. If three consecutive chunks are in the same voice, flag and rewrite the middle.
2. Pull-quote density: at least one pull-quote line per 400 words (so a 2500-word post carries 6+). If fewer, the post is too essayistic.
3. Scope qualifiers present for every absolute claim.
4. Authority: at least 2 distinct citations (śruti + bhāṣya, or śruti + smṛti) across the post.
5. The confessional section, if present, does not rescue the confessor.
6. The field report, if present, has no named real individuals.
7. Final paragraph is the Imported Voice, isolated.
8. No section-as-summary at the end.

Return only the revised post.
```

### Audit pass prompt

```
Audit this Pillar Braided Post.

[PASTE DRAFT]

Report PASS / FAIL per item:
1. 2000–3000 words total.
2. All four narration modes present (field report, framework, mini-myth, sensory walk, confessional, imported voice — at least 4 of these 6).
3. Register-swing: voice changes at least 4 times.
4. ≥2 distinct authority citations.
5. Pull-quote-worthy lines: ≥6.
6. Final paragraph is the Imported Voice.
7. Scope qualifiers present for every absolute claim.
8. No named real individuals in any field report segment.
9. No headers, no numbered sections, no "conclusion" paragraph.
10. Opens in the thing (no meta-frame).

Then list the top 5 specific edits to fix any FAIL.
```

---

## 9. Template 8 — Part Opener

**Purpose**: the first post of a Part (I–IV). Sets register, states the Part's axis, hands the reader a question the Part will live under. Short, high density.

### First-pass draft prompt

```
[PASTE SHARED PREAMBLE]

Draft a Part Opener.

Part: {{PART_NUMBER_AND_NAME}}  (e.g., "Part I: The Veil", "Part III: The Path")
The Part's axis: {{AXIS}}  (one sentence — what this Part is about)
The question the Part will live under: {{GOVERNING_QUESTION}}  (one sentence — the reader carries this through every post in the Part)
Opening image or śāstric line: {{IMAGE_OR_LINE}}
Length target: {{WORDS}}  (default 300–500)

Structure:
1. The opening image or the śāstric line, cold. No introduction.
2. One paragraph (3–4 sentences) — what the Part will not do. Negation.
3. One paragraph (3–4 sentences) — the governing question, handed to the reader. Second-person.
4. A single aphoristic close line. The line the reader will carry through the Part.

Rules:
- No preview of the Part's posts. No table of contents.
- No "in this Part we will".
- Ācārya voice dominant, but the close may slip into Satirist or Imported Voice.
- The Part Opener is a threshold, not an introduction. The reader is stepping across.
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Revise this Part Opener.

[PASTE DRAFT]

Revision targets:
1. Cut any sentence that previews the Part's contents. The Part Opener does not narrate.
2. The governing question is sharp, specific, and something the reader can hold. "What is māyā?" is too abstract — "What is the veil made of, and who hung it?" is sharper.
3. Negation paragraph: what the Part will NOT do. This sharpens the reader's expectation.
4. Length: 300–500 words. Not 600. The Part Opener is thin.
5. The final aphorism must survive as the Part's informal motto.

Return only the revised opener.
```

### Audit pass prompt

```
Audit this Part Opener.

[PASTE DRAFT]

Report PASS / FAIL per item:
1. Opens cold — no introduction, no "in this Part".
2. Names what the Part will NOT do (negation paragraph present).
3. Governing question is concrete, not abstract.
4. Second-person address used at least once.
5. Closes on an aphoristic line.
6. Length 300–500 words.
7. No preview of posts / no table of contents.
8. No banned phrases.
9. At least one specific detail (image, śāstric line, sensory anchor).
10. Ācārya voice dominant; no register-swing into Confessional.
```

---

## 10. Template 9 — Part Closer

**Purpose**: the last post of a Part. Release, not crescendo. Hand the reader across. Shortest post-type in the book.

### First-pass draft prompt

```
[PASTE SHARED PREAMBLE]

Draft a Part Closer.

Part: {{PART_NUMBER_AND_NAME}}
The Part's governing question (from the Part Opener): {{QUESTION}}
What the Part established (without summarizing the posts): {{ESTABLISHED_GROUND}}  (one sentence — the ground the reader now stands on)
The threshold across to the next Part: {{NEXT_PART_HINT}}  (one sentence — not a preview, a gesture)
Closing śloka, sūtra, or line: {{LINE}}  (the line that closes the Part, isolated in the final paragraph)
Length target: {{WORDS}}  (default 200–350)

Structure:
1. One paragraph (2–3 sentences) — the ground the reader now stands on. No "in this Part we".
2. One paragraph (2–3 sentences) — the question that now arises from that ground. This is the threshold to the next Part.
3. A moment of release — one sensory beat, one breath, one silence. This is the Part's śānti.
4. The closing line, isolated. Imported Voice.

Rules:
- Not a crescendo. Not a summary. Release.
- Second-person, soft.
- No "and so we have seen".
- No new claims introduced. The Part Closer does not open new ground.
- The closing line carries the Part's charge across into the silence.
```

### Voice pass prompt

```
[PASTE SHARED PREAMBLE]

Revise this Part Closer.

[PASTE DRAFT]

Revision targets:
1. No summary. If any sentence describes what the Part did, cut.
2. Release, not crescendo. The register softens toward the end, it does not amplify.
3. The threshold sentence — does it open the next Part without previewing? If it previews, rewrite as a gesture.
4. Sensory/silence beat — present and singular. One beat, not two.
5. Closing line: isolated, Imported Voice. If it is in your voice, replace with a line from the tradition.
6. Length 200–350 words. Short.

Return only the revised closer.
```

### Audit pass prompt

```
Audit this Part Closer.

[PASTE DRAFT]

Report PASS / FAIL per item:
1. No summary of the Part's posts.
2. Release register — softens rather than amplifies.
3. Threshold sentence present — gestures toward the next Part without previewing.
4. One sensory/silence beat.
5. Closing line is from the tradition, isolated in the final paragraph.
6. Length 200–350 words.
7. Second-person address at least once.
8. No new claims or frameworks introduced.
9. No banned phrases.
10. The closer leaves the reader with something to sit with, not something to act on.
```

---

## 11. Cross-template prompts

Use these on any post after the template-specific audit.

### Aphoristic density audit

```
Count the pull-quote-worthy lines in this post.

[PASTE POST]

A pull-quote-worthy line:
- Fits in ≤280 characters
- Can be read standalone without the surrounding paragraph
- Carries a claim, an image, or a cut
- Would make someone screenshot or copy-paste it

Report:
1. Total word count.
2. Number of pull-quote-worthy lines.
3. Density (lines per 350 words).
4. Target density: ≥1 per 350 words for regular posts, ≥1 per 300 words for pillar posts.
5. If below target, list 3 specific candidate lines that could be sharpened to become pull-quote-worthy.
```

### Anti-pattern firewall scan

```
Scan this post against the Sadhaka book's anti-pattern firewall.

[PASTE POST]

Content anti-patterns (from BAM/TRP that MUST NOT appear in Sadhaka):
- Cruelty toward any group (women, modernity's believers, caste, sect, ethnicity)
- Misogyny, gender essentialism as doctrine, hypergamy framings
- Biological determinism as metaphysical claim
- Eugenics, racial hierarchy, supremacism of any kind
- Unfalsifiable capture ("your doubt proves you are deceived")
- Conspiracy framing about "the owners", "the bugmen", etc.
- Weaponized certainty (absolute claims without scope)

Craft anti-patterns:
- Meta-introduction ("in this post we will", "let's dive into")
- Banned phrases (journey, unpack, landscape of, in today's world, moreover)
- Em-dash-as-paragraph-break
- Numbered list without source-reason
- Pop-spiritual vocabulary (inner goddess, manifest, high vibe, energy, frequency)
- "We all" / "many people" false universals
- Sanskrit terms re-translated after first use
- Register-collapse (Ācārya-only or Sādhaka-only throughout a pillar)
- Scope-qualifier absent for absolute claims
- Confessional that rescues the confessor

Report any hits with line references, and flag CRITICAL if any content anti-pattern appears.
```

### Scope-qualifier audit

```
Identify every absolute claim in this post and confirm a scope qualifier is present or the claim is deliberately pāramārthika.

[PASTE POST]

For each absolute claim (sentence that reads as universally true without hedge):
1. Quote the sentence.
2. Mark it as: (a) scope qualifier present (and what — vyāvahārika/pāramārthika/adhikāra-specific/darśana-specific), (b) deliberately pāramārthika (marked as such), or (c) UNSCOPED — add scope.

For UNSCOPED claims, suggest the minimal scope qualifier that preserves the claim's force.
```

### Authority-stack audit

```
Check every claim in this post for its authority anchor.

[PASTE POST]

Authority stack:
1. Śruti (Veda, Upaniṣad)
2. Smṛti (Itihāsa, Purāṇa, Dharmaśāstra)
3. Ācārya-bhāṣya (Śaṅkara, Rāmānuja, Madhva, Abhinavagupta, Nimbārka, Vallabha, Gauḍa-paramparā, etc. — named)
4. Anubhava (lived experience, marked as such — "in practice I have found", "those I have sat with have reported")

For each claim:
- Quote the claim.
- Identify which tier it stands on.
- If none, flag UNSOURCED and recommend either citation or removal.

A post with ≥1 UNSOURCED claim does not ship.
```

### Voice-swing audit (for long posts only)

```
Audit the register-swing in this post.

[PASTE POST]

Voices: Ācārya (doctrinal, precise), Sādhaka (first-person, in-progress), Satirist (dry, one-line cut), Imported Voice (quoted tradition line).

1. Divide the post into 300–500 word chunks.
2. Label each chunk's dominant voice.
3. Check: does the voice change at least every 2 chunks?
4. If three consecutive chunks are in the same voice, flag and recommend a swap candidate chunk for voice-change.
5. Final paragraph: is it Imported Voice? If not, note.
```

---

## 12. The full drafting pipeline (end-to-end)

For a standard Claim → Scene → Slogan post (the most common shape):

```
Step 1. Outline on a scratch page. Slot-fillers for Template 3.

Step 2. First-pass prompt → draft.
    Input: slot-fillers + shared preamble + Template 3 first-pass prompt.
    Output: draft v1.

Step 3. Voice pass → draft v2.
    Input: draft v1 + shared preamble + Template 3 voice pass prompt.
    Output: draft v2.

Step 4. Audit pass — Template 3 audit prompt.
    Output: PASS/FAIL per item + top 3 edits.

Step 5. Cross-template audits (run all four):
    - Aphoristic density audit
    - Anti-pattern firewall scan
    - Scope-qualifier audit
    - Authority-stack audit
    Output: consolidated fail list.

Step 6. Hand-edit — apply audit fixes. Replace LLM-generated specifics with the author's actual specifics (real Sanskrit, real commentator's reading, the author's actual sensory memory).

Step 7. Final human read-aloud. If any paragraph stumbles the voice aloud, rewrite.

Step 8. Ship.
```

For a Pillar post (Template 7), the pipeline is:

```
Step 1. Stage-1 outline prompt → beat-sheet.
Step 2. For each of the 7 beats, run that beat's template pipeline (Steps 1–5 above, compressed).
Step 3. Stage-3 braid prompt → draft v1 of pillar.
Step 4. Pillar voice pass prompt → v2.
Step 5. Pillar audit prompt → PASS/FAIL.
Step 6. Cross-template audits (all four).
Step 7. Hand-edit and read-aloud.
Step 8. Ship.
```

---

## 13. Prompt hygiene — what to never do

- **Never strip the shared preamble.** Voice collapses within 200 words without it.
- **Never combine two template prompts into one call.** Each template is tuned; combining them dilutes both.
- **Never use a prompt on a model smaller than Claude Sonnet / GPT-4.** Smaller models produce confident slop — the voice pass will not recover the draft.
- **Never ship without the audit pass.** The audit catches what the draft misses.
- **Never replace hand-edits with another LLM pass.** The last 10% — the specific Sanskrit line, the author's actual memory, the idiom only this author uses — must be human. An LLM-generated specific is a generic.
- **Never paste a real person's name into a field-report prompt.** Patterns, always.
- **Never use these prompts to fabricate confessionals.** If the confessional is not true, the whole book's credibility burns.

---

## 14. Calibration and drift

After every 10 posts drafted through this pipeline, do a calibration read:
1. Pull all 10 posts into a single document.
2. Read them straight through.
3. Note: does the voice hold? Do the posts sound like one book or ten articles?
4. If drift is detected, the first suspect is the shared preamble — tighten the banned-phrases list, add the new drift patterns, re-run the voice pass on the drifted posts.

The prompt engine is a living document. When a new drift pattern is caught three times, it enters the preamble's banned list. When a template consistently produces a specific failure mode, its voice-pass prompt gets a new revision target.

Cross-reference [00-README.md](00-README.md) §"How to use this engine" for the enclosing workflow.

---

*The prompt engine is scaffolding. The book is the author's voice on the author's tradition. When the scaffolding has done its work, drop it.*
