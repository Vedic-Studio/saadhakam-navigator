# Sadhaka Knowledge Base (KB)

An indexed **claim system** for classical Indian knowledge traditions — designed to feed the Sadhaka content engine (articles, newsletters, pSEO, stotra analysis, video scripts) with citation-accurate, recombinable atoms.

This is a sibling to `backend/app/knowledge/domains/` (which holds philosophical-school landscape maps). Where `domains/` answers *"what does Advaita think about X?"*, `kb/` answers *"what is this text, who wrote it, what does this concept mean, and what is the evidence for this specific claim?"*

## Design intent

Two mental models drive the structure:

1. **Knowledge atoms (Karpathy)** — every leaf file is a small, self-contained, composable unit. A `concept/` file should be readable and useful without loading any other file. Links go out, context never gets pulled in.
2. **Hub → cluster → leaf (CricTracker hub-spoke)** — `shastras/` are hubs (subject-area overviews), `texts/` and `concepts/` sit mid-level, and `people/` + `claims/` are atomic leaves. Content can walk the graph in any direction.

## Five object types

Every file in this KB is exactly one of these object types, declared in its frontmatter `type:` field.

| Type | Folder | What it is | Example |
|------|--------|------------|---------|
| **shastra** | `shastras/` | A subject-area hub — the overview map for a discipline | `jyotisha-astronomy.md` |
| **text** | `texts/` | A work or textual stratum: title, genre, dating range, translations | `surya-siddhanta.md` |
| **person** | `people/` | Author, redactor, commentator, modern scholar | `panini.md` |
| **concept** | `concepts/` | A reusable explanatory atom (prakriti, meru-prastara, meta-rules) | `meru-prastara.md` |
| **claim** | `claims/` | One scoped assertion with evidence, counterpoints, reusable examples | `surya-siddhanta-accuracy-claim.md` |

See `SCHEMA.md` for the exact frontmatter fields and body sections required for each type.

## How the content engine uses the KB

The full Sadhaka content pipeline is:

```
/idea-sourcer → /content-planner → /write-article → /seo-optimize → publish → /debrief
```

The KB slots in at these points:

1. **`/idea-sourcer`** — scans `shastras/*.md` and `claims/*.md` for under-covered areas and misunderstood claims worth correcting.
2. **`/content-planner`** — maps articles to hub/spoke clusters using the shastra overviews and their `Adjacent Domains` sections.
3. **`/write-article`** — pulls:
   - primary-text anchors from `texts/`
   - attribution from `people/`
   - concept definitions from `concepts/`
   - citation-ready claim cards from `claims/` (the "claim card" is the smallest publishable unit)
4. **`/seo-optimize`** — uses `claims/*.md` to generate JSON-LD `ClaimReview` and `Dataset` schemas, plus FAQ blocks that cite the textual locus.
5. **`/debrief`** — post-publish, feeds back any new counterpoints or corrections into `claims/*.md` so the next article using that claim is sharper.

## The content pipeline rule (imported from the report)

When writing about any ancient-India topic, walk this pipeline:

1. **Myth/claim capture** — what people say
2. **Primary-text anchor** — where in the tradition it actually comes from (`texts/`)
3. **Scholarly frame** — dating, transmission, disagreements (`people/` + `claims/`)
4. **Modern parallel** — carefully labeled analogy, never identity (`concepts/` → *Modern bridges* section)
5. **"So what?"** — why it matters today

Every article should have ≥1 `kb/texts/` anchor, ≥1 `kb/claims/` citation, and ≥1 `kb/concepts/` definition it references.

## Authoring rules

- **One leaf per session**: don't pile multiple entity additions into one sitting; each file earns its own focused pass.
- **Distinguish structural equivalence from historical identity**: "India developed binary-like enumerative structures" is a claim; "India invented binary numbers" is a category error. Every `claims/` file must decompose the claim into scoped sub-claims.
- **Attribute to the right century**: many errors come from attributing later commentaries to earlier authors. `people/` files mark era + what-they-are-cited-for explicitly.
- **Citations stay in the claim, not in prose**: cite once in the `claim` file, then articles reference the claim by ID. This prevents citation rot across multiple articles.
- **Confidence tagging is mandatory**: every dating field uses `confidence: high | medium | low | disputed`. No silent certainty.

## Pointers

- Domain map: `INDEX.md` (the always-loadable map of what exists here)
- Schema: `SCHEMA.md` (frontmatter + required sections per type)
- Source reports (seed material this KB was bootstrapped from):
  - `docs/research/ancient-indian-timeline-research.md`
  - `docs/research/iks-knowledge-systems-research.md` — structured IKS reference (Pingala, Panini, Jyotisha, Ayurveda, Arthashastra, Vaisheshika, Aksha Sukta, rishikas, shruti/smriti framework) with citations
- Philosophical-school landscape maps: `backend/app/knowledge/domains/*.md` (separate sibling, focused on darshanas)
