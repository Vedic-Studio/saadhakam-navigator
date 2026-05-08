# KB Bridge — Citation rules for write-x-sadhaka

**Purpose**: govern how X drafts source from the IKS knowledge base at `backend/app/knowledge/kb/`. Load this file when drafting Pillar 4 (claim decomposition) or Pillar 11 (research notebook). Optional but useful for Pillar 1 (verse anchor) when the verse comes from a text whose dating or authorship is contested.

The KB at `backend/app/knowledge/kb/` is Sadhaka's source of truth for classical Indian claims. X posts about historical, scientific, or factual claims must cite from the KB. They cannot freelance.

---

## 1. The KB schema in one paragraph

Every KB file has YAML frontmatter (`slug`, `title`, `type`, `confidence: high|medium|low|disputed`, `sources`) plus a type-specific body. Five types: `shastra` (discipline hub), `text` (specific work), `person` (acharya, author, scientist), `concept` (technical term), `claim` (decomposed factual claim). For X drafts, the most-cited type is `claim`; runner-up is `text` for verse provenance and `person` for acharya bios. Full schema in `backend/app/knowledge/kb/SCHEMA.md`.

---

## 2. The trust gradient (in citation priority order)

1. **Primary text passage with locator** (`Bhagavad Gita 4.7`, `Surya Siddhanta 1.34`, `Yoga Sutras 1.27`). Highest trust. Always cite by chapter:verse.
2. **Named classical commentary on that passage** (Shankara on the Mandukya, Ramanuja on the Brahma Sutras, Abhinavagupta on the Pratyabhijnahridayam). High trust, with the named commentator.
3. **`kb/claims/<slug>.md` with verdict tags** (Sadhaka's own decomposition with sub-claim verdicts). High trust within Sadhaka's framing — use the verdict tags verbatim. Don't restate the claim more strongly than the file allows.
4. **Modern peer-reviewed scholarship** (Plofker, Pingree, Doniger, Eliade, Halbfass) cited in the KB sources lines. Medium-high trust. Cite the scholar by name when needed.
5. **Encyclopedic references** (Britannica, SEP, IEP, JOAS, Annals of the Bhandarkar Oriental Research Institute). Medium trust. Use as triangulation, not primary.
6. **Early English translations** (Bhishagratna's Sushruta, Burgess's Surya Siddhanta, Müller's Sacred Books of the East). Tagged "early translation" in KB. Use with care — quote the Sanskrit if available, not the English.
7. **Popular online claims, viral threads, WhatsApp forwards**. Zero trust as sources. Treat as triggers for claim decomposition (Pillar 4), never as evidence.

**Rule**: If a post asserts a factual claim, it must source from levels 1-5. If it cites level 6, flag the early-translation caveat. If it cites level 7, the only valid use is "this claim circulates and here's what the texts actually say".

---

## 3. Reading a `kb/claims/<slug>.md` file

Standard sections of every claim file:

- **Plain-language statement** — the popular framing in one paragraph. Read this first.
- **Decomposed sub-claims** — numbered list, each with a verdict in bold. Verdicts: **Supported**, **Partially supported**, **Not supported**, **Disputed**, **Scope-dependent**. Each sub-claim has a one-paragraph evidence note.
- **Evidence for** — primary texts and modern scholarship that bolster the claim.
- **Evidence against / counterpoints** — what the careful scholarship says that complicates the popular framing.
- **Scope boundaries** — what the claim is NOT saying, what it IS pushing back against, what is genuinely settled.
- **Reusable examples** — concrete numbers, passages, or cases you can cite.

**For Pillar 4 X drafts**:

- Use the **Decomposed sub-claims** as your thread structure. Each sub-claim becomes one tweet with the verdict tag verbatim.
- Use the **Reusable examples** for specific numbers and passages.
- Use the **Scope boundaries** to write the synthesis tweet that closes the thread.
- **Never assert more strongly than the verdict tag.** If the file says "Partially supported", you cannot rephrase as "True". If the file says "Disputed", you cannot rephrase as "False".

### Example: `kb/claims/surya-siddhanta-accuracy-claim.md`

The file decomposes the popular "Surya Siddhanta is within 1% of NASA" claim into 6 sub-claims. Two are **Supported**, two are **Partially supported, scope-dependent**, one is **Supported only with caveats**, one is **Not supported** (the heliocentric claim). A single-sentence X-summary of this file is not "Surya Siddhanta matches NASA" or "Surya Siddhanta is wrong" — both miss the file. The honest single-sentence is: "The Surya Siddhanta's lunar and solar parameters are within a fraction of a percent of modern values; some planetary periods (Saturn especially) are not, and the model is geocentric, not heliocentric."

That sentence is what an X claim-decomposition thread would build toward. Each sub-claim becomes one tweet.

---

## 4. Citation format

| Citation type | Format | Example |
|---|---|---|
| Verse | `Text Chapter.Verse` | `Bhagavad Gita 4.7`, `Chandogya Upanishad 6.8.7`, `Rigveda 10.129.1`, `Yoga Sutras 1.27` |
| Multi-chapter section | `Text Chapter.Verse-Verse` | `Bhagavad Gita 2.11-30` |
| Sutra-style | `Text Sutra-number` | `Brahma Sutras 1.1.1`, `Ashtadhyayi 3.1.1` |
| Named commentary | `Acharya on Text Chapter.Verse` | `Shankara on Mandukya 7`, `Ramanuja on Brahma Sutras 1.1.1` |
| Specific scholar | `Scholar (Year)` | `Plofker (2009)`, `Pingree (1981)` |
| Claim file | `kb/claims/<slug>` | `kb/claims/surya-siddhanta-accuracy-claim` |
| Sadhaka site article | `opensadhaka.com/<slug>` | `opensadhaka.com/what-is-maya` |

In X posts, prefer the short format. The site article expands the citations.

---

## 5. Hedging discipline

The voice profile (`voice.md`) says: hedged when uncertain, confident when text-anchored. Here's how that translates:

| Source | Tone |
|---|---|
| Direct primary text quote with locator | **Confident**: "The Mandukya is explicit. Four states." |
| Decomposed sub-claim with **Supported** verdict | **Confident**: "The lunar month figure is within a second per month of the modern value." |
| Decomposed sub-claim with **Partially supported** | **Hedged**: "Some planetary periods match within a fraction of a percent. Others don't." |
| Decomposed sub-claim with **Disputed** | **Open**: "Whether X holds depends on which recension you read. The matter is unsettled." |
| Decomposed sub-claim with **Not supported** | **Direct rebuttal, sourced**: "The model is geocentric. The 'ancient heliocentrism' claim conflates Aryabhata with Surya Siddhanta." |
| Modern scholarly consensus | **Cite the scholar**: "Plofker situates this in the Siddhanta tradition." |
| Modern scholarly debate | **Name the parties**: "Pingree dates this to the 5th century. Sengupta argues earlier." |
| Open philological question | **Say so**: "I don't think the manuscripts settle this." |
| Personal interpretation | **Frame as such**: "The way I read this verse..." |

**Never** rephrase a hedged sub-claim as a confident one in the X version. The verdict tag is load-bearing.

---

## 6. The "claim file does not yet exist" escalation

If a draft requires a claim that's not yet in `kb/claims/`, do not write the post. Instead:

1. Open `backend/app/knowledge/kb/INDEX.md` and check the "Not yet seeded" backlog.
2. If the claim is on the backlog, surface to the user: "This post needs `kb/claims/<slug>.md` which is on the seeded backlog. Want to write the claim file first or pick a different angle?"
3. If the claim is not on the backlog, propose adding it: "This post needs a claim file we haven't planned yet. Should I add `<slug>` to the seeded backlog and pick a different angle for now?"
4. **Never freelance the claim.** Even if the claim is "well-known" or "obviously true". The whole point of the KB is to ensure Sadhaka's positions are pre-decomposed and verdict-tagged. Bypassing this introduces drift.

---

## 7. Common claim files Sadhaka X will draw from

These are seeded in `kb/claims/` as of 2026-05-07. X posts in the niche regularly engage with these:

- `aryan-invasion-migration-claim` — the AIT/AMT debate
- `arthashastra-intelligence-state-claim` — Kautilya as proto-realpolitik
- `rigveda-women-rishis-claim` — women composers in the Rigveda
- `indian-zero-claim` — origin of zero
- `ayurgenomics-prakriti-claim` — modern biological reading of dosha
- `ancient-heliocentrism-claim` — supposed Vedic heliocentrism
- `fibonacci-virahanka-attribution` — meter sequences and Fibonacci
- `surya-siddhanta-accuracy-claim` — the 1%-of-NASA framing
- `pingala-binary-numbers-claim` — Pingala's prosody and binary
- `gamblers-lament-addiction-claim` — Rigveda 10.34 as addiction text

Each file is the canonical Sadhaka position on that claim. Read the file before drafting any X post on the topic.

---

## 8. Cross-references with other KB types

When a claim cites a person or text, the file's `anchors` field links to the relevant `kb/people/<slug>.md` or `kb/texts/<slug>.md`. Pull from those when the X post needs:

- A one-line acharya bio (e.g., when the post says "Shankara, ~8th century, Advaita synthesizer")
- A one-line text dating (e.g., "the Surya Siddhanta, redacted by ~10th century from earlier strata")

The `anchors` field saves you from cross-school confusion (it tells you which Plofker, which Pingree, which acharya is being cited).

---

## 9. Anti-patterns specific to KB citation

These ruin the post's credibility:

- **Citing without reading**. If you reference `kb/claims/<slug>.md`, the actual file content must constrain what you say. Don't paraphrase from memory.
- **Conflating schools**. "The texts say..." flattens. "The Mandukya says X. The Pratyabhijnahridayam says Y." preserves.
- **Modernizing the source**. Don't render `prāṇa` as "energy" or `ātman` as "self" in a way that strips its technical meaning. Use Sanskrit + transliteration + a careful English gloss.
- **Stripping uncertainty**. If the KB file says "Partially supported", the X post can't say "Confirmed". Strip and you misrepresent Sadhaka's position.
- **Citing scholarship Sadhaka rejects**. Some popular "Vedic-science" books (Subhash Kak's interpretive maximalism, certain Hindutva-revivalist readings) are deliberately not in the KB sources. Don't cite them.
- **Skipping the source line**. If a post asserts a number, year, or authorship attribution, the source must be traceable from the post (via the linked claim file or article).

---

## 10. When in doubt

- **If the claim isn't in the KB**, file it as a backlog item per `kb/INDEX.md`.
- **If the verdict tag is hedged**, hedge in the X post.
- **If the source is an early translation**, cross-check or hedge.
- **If the claim is sensational and viral**, the right post is a Pillar 4 decomposition, not an endorsement.

The KB exists so X can cite confidently without freelancing. Trust it. When it's silent, that's a signal the claim is not yet ready to ship.
