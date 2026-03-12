# Phase 4 — Schema Validator Pass (pSEO Templates)

Date: 2026-03-12  
Scope: Core pSEO templates currently active in App Router.

## Validator Criteria

For each template family:
1. Canonical URL in `generateMetadata` (or equivalent metadata export)
2. At least one JSON-LD script in page body
3. JSON-LD type aligned to intent (`FAQPage`, `DefinedTerm`, `BreadcrumbList`, `ItemList` where applicable)
4. Template-level compatibility with static generation / route params

## Template Pass Table

| Template | Canonical | JSON-LD Present | JSON-LD Type(s) | Status |
|---|---|---|---|---|
| `src/app/[slug]/page.tsx` | PASS | PASS | `FAQPage` | **PASS** |
| `src/app/compare/[slug]/page.tsx` | PASS | PASS | `FAQPage` | **PASS** |
| `src/app/learn/sanskrit/[word]/page.tsx` | PASS | PASS | `FAQPage`, `DefinedTerm` | **PASS** |
| `src/app/practices/[practice]/for/[goal]/page.tsx` | PASS | PASS *(added this phase)* | `FAQPage` | **PASS** |
| `src/app/texts/bhagavad-gita/chapter-[chapter]/page.tsx` | PASS | PASS *(added this phase)* | `FAQPage`, `BreadcrumbList` | **PASS** |
| `src/app/stotras/vishnu-sahasranama/[slug]/page.tsx` | PASS | PASS *(added this phase)* | `FAQPage`, `BreadcrumbList` | **PASS** |

## Findings

- No remaining schema gaps in the audited core pSEO template set.
- Phase remediation items now reflected in template code:
  - practice-goal pages now emit `FAQPage`
  - BG chapter pages now emit `FAQPage` + `BreadcrumbList`
  - Vishnu Sahasranama name pages now emit `FAQPage` + `BreadcrumbList`

## Gate Decision

**pSEO schema validator gate: CLOSED (PASS).**  
Phase sequence can proceed to Sahasranama batch analysis/enrichment and then BG chapter-by-chapter enrichment.
