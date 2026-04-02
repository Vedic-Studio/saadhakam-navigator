# Writer Prompt Template (Layer 1)

Assembly instructions for the content generation prompt. Fill variables, append layers in order.

---

## Variables

- `{{ARTICLE_TYPE}}` — hub | spoke
- `{{TOPIC}}` — article topic / title
- `{{SLUG}}` — URL slug
- `{{TARGET_KEYWORD}}` — primary SEO keyword
- `{{WORD_COUNT_MIN}}` — minimum word count (hub: 2500, spoke: 1500)
- `{{FAQ_COUNT}}` — minimum FAQ items (hub: 4, spoke: 3)
- `{{INTERNAL_LINK_COUNT}}` — minimum internal links (hub: 4-6, spoke: 3-4)
- `{{DOMAIN}}` — philosophical domain slug for landscape map lookup

---

## Structural Rules

### Article Type: {{ARTICLE_TYPE}}

Write a {{WORD_COUNT_MIN}}+ word {{ARTICLE_TYPE}} article on "{{TOPIC}}".

**Required structure:**
1. AEO direct answer block (60-100 words) immediately after the title. Plain prose, no hedging, no bullet points. Written for AI engines to cite directly.
2. Opening hook: one of (a) contrarian reframing, (b) correction of a Western misreading, (c) surprising claim from source texts, (d) juxtaposition with a popular assumption.
3. H2/H3 body sections. Maximum 3 sentences per paragraph. Every claim grounded in a named primary source (specific Upanishad, Gita chapter, Sutra).
4. {{FAQ_COUNT}}+ FAQ items as H3s under a ## Frequently Asked Questions section.
5. ## Sources & Commentaries section with authoritative external references.
6. Minimum {{INTERNAL_LINK_COUNT}} internal links to existing Sadhaka pages.

**Target keyword:** {{TARGET_KEYWORD}}
**URL slug:** /{{SLUG}}

### Forbidden Phrases (hardban)

journey, navigate, tapestry, landscape, holistic, testament to, at its core, in essence, it is worth noting, delve into, moreover (as opener), furthermore (as opener), arguably, notably

### Source Fidelity

- Name specific Upanishad, Gita chapter, Purana, or Sutra
- Name the commentator or school position
- Distinguish source text vs commentary vs editorial implication
- Never attribute a position to "Sanatan Dharma" generically when a specific school holds it

### Terminology

- Use "Sanatan philosophy", "Sanatan Dharma", or name the specific tradition
- Never "Hindu philosophy" or "Hinduism says"
- Sanskrit terms in italics on first use with English gloss inline

---

## Assembly Order

1. Fill all variables above
2. Append **Layer 2: Audience Profile** (`audience-profile.md`) verbatim
3. Load **Layer 3: Domain Landscape** (`domains/{{DOMAIN}}.md`) and append
4. Send assembled prompt to writer agent
5. Receive draft
6. Run **Layer 4: Voice Review** (`voice-review-pass.md`) as a SEPARATE pass on the draft
7. Output final reviewed draft

**Critical:** Never mix Layer 4 (voice/slop rules) into the generation prompt. It produces stiff, over-corrected prose. Draft freely with Layers 1-3, then clean up with Layer 4.
