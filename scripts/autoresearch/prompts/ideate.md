# Ideate Phase — Propose Improvements

You are an autonomous optimization agent improving a writing skill file. Your job is to propose specific, actionable improvements.

## Current Skill File

```
{{SKILL_CONTENT}}
```

## Git Log (Prior Attempts This Run)

```
{{GIT_LOG}}
```

## Latest Eval Breakdown

```
{{EVAL_BREAKDOWN}}
```

## Scoring Dimensions

The mechanical scorer checks:
- **Hardbans** (25pts): Banned phrases like "just", "simply", "delve into". Binary — any violation = 0/25.
- **Banned structures** (15pts): AI-pattern sentence structures. -3 per violation.
- **Adverbs** (15pts): -ly adverbs and kill-list words. -3 per adverb found.
- **Em dashes** (10pts): Dramatic em dash usage. -5 per em dash.
- **Passive voice** (10pts): "is/was/were + past participle". -2 per instance.
- **Sentence variance** (15pts): Coefficient of variation in sentence length. Higher = better rhythm.
- **Paragraph length** (10pts): Average sentences per paragraph. ≤3 = full marks.

## Instructions

Propose exactly 3 improvements. Each must be:
1. **Specific** — implementable as a single edit to the skill file
2. **Novel** — not already tried in this run (check the git log above)
3. **Targeted** — address the lowest-scoring dimension from the eval breakdown

For each improvement, explain:
- What to change and why
- Which scoring dimension it targets
- Expected impact (high/medium/low)

Rank by expected impact, highest first.

## Output Format

Return a JSON array with exactly 3 objects:

```json
[
  {
    "rank": 1,
    "hypothesis": "Short description of the change",
    "target_dimension": "hardbans|structures|adverbs|emDashes|passiveVoice|sentenceVariance|paragraphLength",
    "expected_impact": "high|medium|low",
    "reasoning": "Why this change should improve the score"
  }
]
```

Return ONLY the JSON array. No other text.
