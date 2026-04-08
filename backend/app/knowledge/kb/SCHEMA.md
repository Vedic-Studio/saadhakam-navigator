# KB Schema

Every file in `kb/` is a markdown document with YAML frontmatter and a type-specific body. This document defines the exact fields and sections.

---

## Global frontmatter

Every file, regardless of type, must include:

```yaml
---
slug: kebab-case-id              # stable identifier, matches filename
title: Human-Readable Title
type: shastra | text | person | concept | claim
aliases: [list, of, variants]    # other names, transliterations, common mis-spellings
updated: YYYY-MM-DD              # last edit
confidence: high | medium | low | disputed
sources:                         # bibliographic anchors (see note below)
  - "{author or editor}, {work}, {year} ({edition/publisher})"
---
```

**Sources note**: always prefer peer-reviewed history of science, modern annotated translations, and encyclopedic references. Tag old English translations (e.g., Bhishagratna Sushruta, Burgess Surya Siddhanta) as "early translation" in the source line so downstream articles know to cross-check.

---

## Type: `shastra` (subject-area hub)

**Purpose**: an overview map for a discipline — prosody, grammar, astronomy, medicine, statecraft, atomism, martial arts. Each shastra file is the hub from which clusters of texts/concepts/claims hang.

**Required sections:**

```markdown
## Territory
(what this discipline is, what kind of claims it can responsibly support, what it is NOT)

## Textual strata
(earliest → latest, with dating confidence tags; link to `texts/*.md`)

## Key figures
(names with role and century; link to `people/*.md`)

## Core concepts
(one-line definitions; link to `concepts/*.md`)

## Live debates
(open scholarly questions — never present a consensus where there isn't one)

## Common misreadings
(the "category errors" audiences make, with the correction)

## Modern bridges
(carefully labeled analogies, with "breaks because…" notes)

## Adjacent shastras
(cross-links to sibling disciplines in this KB)

## Claim cards
(bulleted links to `claims/*.md` — the reusable, citation-ready units)
```

---

## Type: `text` (work or textual stratum)

**Purpose**: anchor a specific work — Rigveda, Vedanga Jyotisha, Arthashastra, Chandas Sutra, Ashtadhyayi, etc.

**Additional frontmatter:**

```yaml
genre: shruti | smriti | sutra | shastra | commentary | encyclopedic | modern-edition
language: sanskrit | prakrit | tamil | pali | ...
dating:
  earliest: "YYYY BCE/CE"
  latest: "YYYY BCE/CE"
  confidence: high | medium | low | disputed
  note: "one line on what drives the uncertainty"
recensions: [list, of, known, recensions]
```

**Required sections:**

```markdown
## What it is
(one-paragraph plain description — genre, aim, size, audience)

## Textual history
(composition, redaction, commentarial layers, manuscript tradition)

## Dating debate
(competing positions with named scholars; no silent consensus)

## Structure
(books/chapters/sections with one-line descriptions)

## Key passages
(specific locators — book.hymn.verse — with one-line gloss each)

## Modern translations worth citing
(annotated list; tag "early translation" where applicable)

## Claims anchored to this text
(links to `claims/*.md` that cite passages from here)

## Adjacent texts
(what this text contests, builds on, or is commented by)
```

---

## Type: `person` (author / scholar / commentator)

**Purpose**: a disambiguation + attribution record. Prevents the common error of attributing later commentary to earlier authors.

**Additional frontmatter:**

```yaml
role: author | redactor | commentator | modern-scholar | translator | historian
era: "Xth century BCE/CE"
era_confidence: high | medium | low | disputed
primary_tradition: prosody | grammar | jyotisha | ayurveda | arthashastra | vaisheshika | ...
```

**Required sections:**

```markdown
## One-line identity
(who they are, what they are primarily cited for)

## Works
(titles with century and genre; link to `texts/*.md` where available)

## What they are cited for in this KB
(explicit list of claims, concepts, and interpretive moves anchored to them)

## What they are NOT to be credited with
(common misattributions — e.g., Pingala and "binary numbers" in the modern positional sense)

## Sources on this person
(modern scholarship)
```

---

## Type: `concept` (reusable explanatory atom)

**Purpose**: one definition that all articles, newsletters, and scripts can point to. Written to be copy-pasted into prose as needed.

**Additional frontmatter:**

```yaml
home_tradition: vedanta | mimamsa | vaisheshika | nyaya | ayurveda | jyotisha | chandas | ...
primary_texts: [list of slugs in texts/]
```

**Required sections:**

```markdown
## Definition
(the concept in its home tradition — two sentences max)

## Where it appears
(primary text loci — book.chapter.verse style)

## Interpretive history
(how later commentators read it; where they disagree)

## Modern bridges
(analogies that help modern audiences — each one labeled with "breaks because…")

## Category errors to avoid
(specific conflations — the ones that circulate on the internet)

## Related concepts
(cross-links within `concepts/`)
```

---

## Type: `claim` (the atomic unit)

**Purpose**: one specific, scoped assertion with evidence and counterpoints. This is the smallest publishable unit — the thing an article cites, the thing a JSON-LD `ClaimReview` schema wraps, the thing a short video script dramatizes.

**Additional frontmatter:**

```yaml
claim_type: textual | historical | numerical | interpretive | attributive
status: supported | contested | partially-supported | misattributed | under-review
scope: "one-line description of what exactly is being claimed"
anchors:
  texts: [list of slugs in texts/]
  people: [list of slugs in people/]
  concepts: [list of slugs in concepts/]
```

**Required sections:**

```markdown
## Plain-language statement
(the claim in one sentence — the thing a reader would Google)

## Decomposed sub-claims
(break the big claim into scoped pieces; each piece gets its own verdict)

## Evidence for
(primary-text loci + modern scholarship)

## Evidence against / counterpoints
(opposing scholarship and where it pushes back)

## Scope boundaries
(what this claim is NOT saying — where the category errors creep in)

## Reusable examples
(concrete illustrations an article or script can embed directly)

## When this claim matters
(audience triggers — when a reader lands on X question, this claim is load-bearing)
```

---

## File ID convention

- Filename = `slug` field = lowercase, kebab-case, stable-for-life.
- Renaming a slug is a breaking change (articles, JSON-LD, and the pipeline hold references). If a better name emerges, add it to `aliases:` instead.
- Claim files get a `-claim` suffix so links to `pingala` (person) and `pingala-binary-numbers-claim` (claim about Pingala) don't collide.

---

## What does NOT belong in the KB

- Article drafts or published article bodies — those live in `src/content/cms/articles/`
- Ephemeral research notes — those live in `docs/research/`
- Opinions, hot takes, or editorial voice — those go through the writer pipeline, not the KB
- SEO metadata — lives in `src/data/articles.ts`

The KB is **source material**. Articles are **output**. The writer pipeline bridges them.
