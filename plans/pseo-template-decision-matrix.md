# pSEO Template Decision Matrix

Last Updated: 2026-03-09  
Purpose: Review each pSEO template type and assign scale/improve/pause decisions based on content quality, technical implementation, and indexing potential.

---

## 1) Decision Framework

### Criteria for Assessment

Each template is evaluated on:

| Criterion | Weight | Description |
|---|---:|---|
| Content Depth | High | Unique, substantive content per URL vs thin/templated |
| Metadata Quality | High | Unique titles, descriptions, canonicals per URL |
| Schema Coverage | Medium | FAQ, Article, ItemList, BreadcrumbList, etc. |
| Internal Links | Medium | Links to related content within the site |
| Query-Intent Fit | High | Matches what users actually search for |
| Duplication Risk | High | Risk of near-duplicate content across URLs |
| Analytics Coverage | Medium | Event tracking for engagement measurement |

### Decision Categories

- **SCALE NOW** — Template is healthy, indexing should follow, expand the data set
- **IMPROVE BEFORE SCALING** — Template works but needs content/technical upgrades before expansion
- **PAUSE / DE-PRIORITIZE** — Template has fundamental issues or low strategic value

---

## 2) Template-by-Template Assessment

### 2.1 Concept Pages (`/what-is-{slug}`)

**Route:** `src/app/[slug]/page.tsx`

#### Implementation Quality

| Criterion | Score | Notes |
|---|---:|---|
| Content Depth | 9/10 | Long descriptions, key principles, practical applications, source texts |
| Metadata Quality | 9/10 | Unique titles, descriptions, canonicals, keywords per concept |
| Schema Coverage | 9/10 | FAQPage, Article, BreadcrumbList |
| Internal Links | 8/10 | Related concepts, Sanskrit lexicon cross-links, Faith Finder CTA |
| Query-Intent Fit | 10/10 | "What is X" is a primary search pattern |
| Duplication Risk | Low | Each concept has unique philosophical content |
| Analytics Coverage | 9/10 | ContentPageTracker + TrackedLink for all CTAs |

#### Current Scale
- **22 canonical concepts** implemented
- Sitemap coverage: ✅ Included in `concepts` sitemap group

#### Strengths
- Rich, unique content per concept
- Excellent schema implementation
- Strong internal linking graph
- Proper canonicalization (`*-meaning` redirects to `what-is-*`)
- Cross-linking to Sanskrit lexicon entries

#### Weaknesses
- None significant — this is a model template

#### Decision: **SCALE NOW** ✅

#### Recommended Actions
1. Expand concept database to 50+ entries
2. Prioritize concepts with high search volume (GSC data)
3. Add concepts for devotion, texts, and practice terms

---

### 2.2 Sanskrit Lexicon Pages (`/learn/sanskrit/{slug}`)

**Route:** `src/app/learn/sanskrit/[word]/page.tsx`

#### Implementation Quality

| Criterion | Score | Notes |
|---|---:|---|
| Content Depth | 9/10 | Etymology, primary meanings, philosophical contexts, scriptural usage, FAQs |
| Metadata Quality | 9/10 | Unique titles, descriptions, canonicals, keywords per word |
| Schema Coverage | 9/10 | FAQPage, DefinedTerm |
| Internal Links | 8/10 | Cross-link to concept pages, Faith Finder CTA |
| Query-Intent Fit | 9/10 | "{term} in Sanskrit", "{term} etymology" are valid search patterns |
| Duplication Risk | Low | Each word has unique etymology and usage |
| Analytics Coverage | 9/10 | ContentPageTracker + TrackedLink for all CTAs |

#### Current Scale
- Matches concept count (lexicon counterparts exist)
- Sitemap coverage: ✅ Included in `sanskrit` sitemap group

#### Strengths
- Rich linguistic and philosophical content
- DefinedTerm schema for machine-readable definitions
- Scriptural usage examples with context
- Cross-linking to philosophical concept pages

#### Weaknesses
- None significant

#### Decision: **SCALE NOW** ✅

#### Recommended Actions
1. Expand lexicon to match all concept entries
2. Add more scriptural usage examples
3. Consider audio pronunciation guides (future enhancement)

---

### 2.3 Comparison Pages (`/compare/{slug}`)

**Route:** `src/app/compare/[slug]/page.tsx`

#### Implementation Quality

| Criterion | Score | Notes |
|---|---:|---|
| Content Depth | 7/10 | Varies — some have rich content, some have placeholder text |
| Metadata Quality | 8/10 | Unique titles, descriptions, canonicals |
| Schema Coverage | 7/10 | FAQPage (generic), BreadcrumbList |
| Internal Links | 8/10 | Related comparisons, Faith Finder CTA |
| Query-Intent Fit | 9/10 | "X vs Y" is a high-intent search pattern |
| Duplication Risk | Medium | Some comparisons may have similar structures |
| Analytics Coverage | 9/10 | ContentPageTracker + TrackedLink for all CTAs |

#### Current Scale
- Multiple comparison pages across categories
- Sitemap coverage: ✅ Included in `comparisons` sitemap group

#### Strengths
- High search intent match
- Good category organization
- Related comparisons section

#### Weaknesses
- Some pages have thin or placeholder content (`content` field empty)
- FAQ schema is generic (same questions for all comparisons)
- Missing ItemList schema for comparison tables

#### Decision: **IMPROVE BEFORE SCALING** ⚠️

#### Recommended Actions
1. **Audit all comparison pages** — identify which have placeholder content
2. **Add unique FAQ content** per comparison (not generic)
3. **Add ItemList or Table schema** for structured comparison data
4. **Ensure all pages have substantive `content`** before expanding
5. Only scale after thin pages are upgraded

---

### 2.4 Practice-Goal Pages (`/practices/{practice}/for/{goal}`)

**Route:** `src/app/practices/[practice]/for/[goal]/page.tsx`

#### Implementation Quality

| Criterion | Score | Notes |
|---|---:|---|
| Content Depth | 5/10 | Partially templated, some placeholder text |
| Metadata Quality | 7/10 | Unique titles and canonicals, but generic descriptions |
| Schema Coverage | 3/10 | No FAQ or structured schema |
| Internal Links | 6/10 | Basic breadcrumb, Faith Finder CTA |
| Query-Intent Fit | 8/10 | "{practice} for {goal}" is a valid long-tail pattern |
| Duplication Risk | High | Many combinations share similar templated content |
| Analytics Coverage | 8/10 | ContentPageTracker + TrackedLink |

#### Current Scale
- **11 hardcoded combinations** only
- Sitemap coverage: ✅ Included in `practices` sitemap group

#### Strengths
- Valid long-tail keyword pattern
- Medical disclaimer included
- Basic practice information present

#### Weaknesses
- Very limited scale (only 11 combinations)
- Content is partially templated/placeholder
- No FAQ schema
- No unique content per combination (mostly dynamic templating)
- High duplication risk if scaled without unique content

#### Decision: **IMPROVE BEFORE SCALING** ⚠️

#### Recommended Actions
1. **Develop unique content** for each practice-goal combination
2. **Add FAQ schema** with practice-goal specific questions
3. **Create a data-driven content model** instead of placeholder text
4. **Define valid combination rules** to avoid nonsensical pairs
5. Consider **merging into practice pages** with goal sections instead

---

### 2.5 Bhagavad Gita Chapter Pages (`/texts/bhagavad-gita/chapter-{n}`)

**Route:** `src/app/texts/bhagavad-gita/chapter-[chapter]/page.tsx`

#### Implementation Quality

| Criterion | Score | Notes |
|---|---:|---|
| Content Depth | 6/10 | Summary, key themes, yoga path — but could be richer |
| Metadata Quality | 7/10 | Unique titles and canonicals |
| Schema Coverage | 3/10 | No FAQ or structured schema |
| Internal Links | 7/10 | Links to shlokas, Bhagavad Gita hub |
| Query-Intent Fit | 9/10 | "Bhagavad Gita Chapter X summary" is high-intent |
| Duplication Risk | Low | Each chapter has unique themes |
| Analytics Coverage | 8/10 | ContentPageTracker + TrackedLink |

#### Current Scale
- 18 chapters (complete)
- Sitemap coverage: ✅ Included in `shlokas` sitemap group

#### Strengths
- Complete chapter coverage
- Key themes and yoga path alignment
- Links to individual shlokas

#### Weaknesses
- Content could be deeper (verse summaries, key teachings)
- No FAQ schema
- Shloka list may be empty if not seeded
- Missing BreadcrumbList schema

#### Decision: **IMPROVE BEFORE SCALING** ⚠️

#### Recommended Actions
1. **Add FAQ schema** with chapter-specific questions
2. **Add BreadcrumbList schema**
3. **Expand chapter summaries** with key teachings per chapter
4. **Ensure all shlokas are seeded** and visible
5. Add chapter-specific practical applications

---

### 2.6 Bhagavad Gita Shloka Pages (`/texts/bhagavad-gita/chapter-{n}/shloka-{m}`)

**Route:** `src/app/texts/bhagavad-gita/chapter-[chapter]/shloka-[shloka]/page.tsx`

#### Implementation Quality

| Criterion | Score | Notes |
|---|---:|---|
| Content Depth | 9/10 | Sanskrit, transliteration, translation, commentaries, practical application |
| Metadata Quality | 8/10 | Unique titles and canonicals per shloka |
| Schema Coverage | 8/10 | FAQPage |
| Internal Links | 7/10 | Breadcrumbs, chapter link |
| Query-Intent Fit | 8/10 | "Bhagavad Gita X.Y meaning" is a valid search pattern |
| Duplication Risk | Low | Each shloka has unique content |
| Analytics Coverage | 8/10 | ContentPageTracker + TrackedLink |

#### Current Scale
- Depends on seeded shlokas (check `bgShlokas` data)
- Sitemap coverage: ✅ Included in `shlokas` sitemap group

#### Strengths
- Rich content per shloka
- Multi-tradition commentary
- Practical application section
- FAQ schema

#### Weaknesses
- "Ask Sadhaka AI App" button is non-functional placeholder
- Could benefit from related shloka links

#### Decision: **SCALE NOW** ✅

#### Recommended Actions
1. **Verify all shlokas are seeded** (run seed script if needed)
2. **Fix or remove placeholder "Ask Sadhaka AI" button**
3. Add related shloka navigation (previous/next)
4. Consider adding theme tags for cross-linking

---

## 3) Decision Summary Table

| Template | Decision | Priority | Key Action |
|---|---|---|---|
| Concept Pages (`what-is-*`) | **SCALE NOW** ✅ | High | Expand to 50+ concepts |
| Sanskrit Lexicon (`/learn/sanskrit/*`) | **SCALE NOW** ✅ | High | Expand to match concepts |
| Comparison Pages (`/compare/*`) | **IMPROVE** ⚠️ | Medium | Fix thin content, add unique FAQs |
| Practice-Goal (`/practices/*/for/*`) | **IMPROVE** ⚠️ | Low | Develop unique content model |
| BG Chapter Pages | **IMPROVE** ⚠️ | Medium | Add FAQ schema, expand summaries |
| BG Shloka Pages | **SCALE NOW** ✅ | High | Verify seeding, fix placeholder |

---

## 4) Recommended Expansion Sequence

### Phase 3A — Scale Healthy Templates (Immediate)

1. **Expand concept pages** to 50+ entries
   - Focus on high-volume philosophical terms
   - Prioritize concepts linked from pillar pages
   - Add devotion, text, and practice-related concepts

2. **Expand Sanskrit lexicon** to match all concepts
   - Ensure every concept has a lexicon counterpart
   - Add richer scriptural usage examples

3. **Verify BG shloka seeding**
   - Run seed script if needed
   - Fix placeholder "Ask Sadhaka AI" button

### Phase 3B — Improve Weak Templates (Next)

1. **Upgrade comparison pages**
   - Audit and identify thin pages
   - Add unique FAQ content per comparison
   - Add ItemList schema for comparison tables

2. **Upgrade BG chapter pages**
   - Add FAQ schema
   - Add BreadcrumbList schema
   - Expand chapter summaries

### Phase 3C — Evaluate Practice-Goal Template (Later)

1. **Decide on practice-goal template future**
   - Option A: Invest in unique content per combination
   - Option B: Merge into practice pages with goal sections
   - Option C: De-prioritize and focus on higher-ROI templates

---

## 5) Thin Content Risk Assessment

### High Risk (Immediate Action Needed)
- **Practice-Goal pages** — Templated content, high duplication risk
- **Some comparison pages** — Placeholder content in `content` field

### Medium Risk (Monitor)
- **BG Chapter pages** — Could be perceived as thin if summaries are brief

### Low Risk (Safe to Scale)
- **Concept pages** — Rich, unique content per URL
- **Sanskrit lexicon** — Rich, unique content per URL
- **BG Shloka pages** — Rich, unique content per URL

---

## 6) Indexing Health Check (Requires GSC Data)

> **Note:** This section should be populated with actual GSC data.

### Metrics to Track per Template

| Template | URLs Generated | URLs Indexed | Impressions | Clicks | Avg CTR |
|---|---:|---:|---:|---:|---:|
| Concepts | 22 | TBD | TBD | TBD | TBD |
| Sanskrit Lexicon | TBD | TBD | TBD | TBD | TBD |
| Comparisons | TBD | TBD | TBD | TBD | TBD |
| Practice-Goal | 11 | TBD | TBD | TBD | TBD |
| BG Chapters | 18 | TBD | TBD | TBD | TBD |
| BG Shlokas | TBD | TBD | TBD | TBD | TBD |

### Action Trigger Thresholds

- **Indexing rate < 50%** → Audit for thin content or technical issues
- **CTR < 1%** → Review title/meta description quality
- **Impressions > 100 but clicks near 0** → Review intent match and snippet appeal

---

## 7) Next Steps

1. **Export GSC data** by URL pattern to populate indexing health table
2. **Audit comparison pages** for thin content
3. **Begin concept expansion** (highest ROI template)
4. **Verify BG shloka seeding** status
5. **Revisit this matrix** after 30 days with actual performance data

---

## 8) Definition of Done for Phase 3

Phase 3 is complete when:

- [ ] All templates have been reviewed and assigned a decision
- [ ] Thin content risks are documented and prioritized
- [ ] Scale/improve/pause decisions are recorded
- [ ] Expansion sequence is defined
- [ ] GSC data is exported and analyzed by template type
- [ ] First expansion wave (healthy templates) is underway