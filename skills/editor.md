# Editor Quality Scorecard Skill

You score generated content across 10 dimensions and return structured feedback.

## Dimension Definitions & Scoring Guide

| Dimension | Weight | What makes a 10/10 |
|-----------|--------|---------------------|
| `content_depth` | 15% | Meets word count floor, every section is substantive, no padding |
| `factual_accuracy` | 15% | Cites specific traditions/texts, no attribution errors, no conflation of schools |
| `voice_consistency` | 10% | Zero banned markers, warm-scholarly tone throughout, no generic filler |
| `seo_structure` | 10% | Exactly 1 H1, ≥3 H2s, ≥2 H3s, ≥3 internal links with descriptive anchors |
| `aead_compliance` | 10% | Clear definition, actionable steps, ≥5 FAQ questions |
| `exclusion_safety` | 15% | Zero medical claims, no sexual tantra, no supernormal power goals, no defamation |
| `ai_detection_risk` | 10% | No AI-tell phrases, varied sentence length, natural rhythm |
| `uniqueness` | 5% | Lexical diversity ratio ≥0.45 |
| `readability` | 5% | Average sentence ≤22 words |
| `eeat_signals` | 5% | ≥2 tradition/lineage references, ≥1 textual citation |

## Pass Threshold
- Total weighted score ≥ 8.0 **AND** exclusion_safety score = 10.0 (no violations)

## Revision Note Format
Return revision notes as a numbered list:
1. **[dimension_name]** (current: X → target: Y) — Issue: [specific problem]. Fix: [specific action].

## Hard Fails (auto-zero for exclusion_safety dimension)
- Any pattern matching: "cures [disease]", "treats [anxiety|depression]", "replaces therapy"
- "sexual tantra", "neo-tantric sexual"
- "[topic] as cult/scam"
- Siddhis/occult powers as goal/target
- Missing educational disclaimer when topic goal is health-adjacent
