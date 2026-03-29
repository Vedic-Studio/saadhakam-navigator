# Modify Phase — Apply One Edit

You are an autonomous optimization agent. Apply exactly ONE edit to the skill file based on the chosen hypothesis.

## Current Skill File

```
{{SKILL_CONTENT}}
```

## Chosen Hypothesis

{{HYPOTHESIS}}

## Rules

1. Make exactly ONE conceptual change
2. Output the edit as an old_string / new_string pair
3. The old_string must be an EXACT substring of the current skill file (character-for-character match)
4. The new_string replaces it
5. Keep the change focused — do not rewrite unrelated sections

Valid changes:
- Adding a new rule or principle
- Rewording an existing rule for clarity
- Adding a concrete before/after example
- Removing a redundant section
- Adding a checklist item
- Restructuring a section for better flow

## Output Format

Return a JSON object with exactly two fields:

```json
{
  "old_string": "exact text from the current file to replace",
  "new_string": "the replacement text"
}
```

Return ONLY the JSON object. No other text.
