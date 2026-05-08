# Voice Calibration Workflow

**Purpose**: upgrade the `voice.md` profile from v1 (bio-inferred and persona-specified) to v2 (evidenced from real posts that landed). After v2, every subsequent calibration is a refinement based on more posts.

---

## When to run

- **First calibration (v1 → v2)**: after `@opensadhaka` has at least 30 published posts spread across at least 4 of the 8 pillars. 30 is the floor; 50 is better. Until then, voice stays v1.
- **Refinement (v2 → v2.x)**: every 90 days or every 100 new posts, whichever comes first.
- **Major refresh (v2 → v3)**: after a major shift in account direction (new pillar added, new format type, new audience segment), or after a 6-month interval.

---

## Inputs needed

1. **The published-post corpus.** All posts from `@opensadhaka` with text + timestamp + which pillar + which format. Should already be in `content/x-queue/posted/` once Phase 3-5 are live. Before that, manual export from X is acceptable.
2. **Engagement metrics per post.** Impressions, replies, quote tweets, likes, profile clicks, link clicks. Pulled via `scripts/x/pull-metrics.mjs` (Phase 6).
3. **Manual landed/flopped tags.** A post may have low impressions but high quality engagement (genuine replies from scholars, citation by other accounts) and that counts as "landed". A post may have high impressions but only bot-amplified likes and that counts as "flopped". Tag manually after reading replies.
4. **Reply-quality samples.** Pull 5-10 replies per post for the top 20 posts and bottom 20 posts. The replies tell you whether the post sparked thinking or just engagement-bait responses.

---

## Process (5 steps)

### Step 1: Categorize

Group posts by:
- Pillar (1-11)
- Format used
- Hook type (from format-catalog.md hook patterns library)
- Length (one-tweet, short thread, long thread, X Article)
- Citation pattern (verse-cited, claim-file-cited, scholar-cited, no-citation)
- First-person flavor (per voice.md § 9)

For each (pillar × format × hook) tuple, count posts and average the engagement signal (use a composite: profile clicks + quote tweets * 2 + reply quality score).

### Step 2: Identify what worked

Look for:
- **Top decile of posts by composite engagement signal.** What pillars dominate? What hooks? What citation patterns? What length?
- **Posts that drove citations from other accounts.** Manual scan via X search or `listen-mentions.mjs` (Phase 4). What was about those posts that made other accounts quote/cite them?
- **Posts that drove profile clicks at >2x average rate.** What hooks? What angles?
- **Posts that drove site CTR at >2x average rate.** Did the link feel earned, not bolted on?

Output: a list of patterns that worked, each with at least 3 supporting posts.

### Step 3: Identify what didn't

Look for:
- **Bottom decile of posts.** What's common? Vague hooks? Generic content? Missing asset trail?
- **Posts that got bot-amplified likes but no replies.** Signals an engagement-farming hook that didn't actually land.
- **Posts that went off-voice.** Re-read with the voice.md profile in hand. Where did the persona slip into either institutional or personal-with-org or guru-on-mountain mode?
- **Posts that got correction replies from scholars.** What did Sadhaka claim that the scholarly community pushed back on? Audit those for KB compliance.

Output: a list of anti-patterns that hurt, each with at least 3 supporting posts.

### Step 4: Update voice.md

Rewrite voice.md sections:
- **§ 11 What works**: replace TBD with evidence-backed entries. Each entry: "Pattern X drives Y outcome, evidenced in posts A, B, C." Specific, not abstract.
- **§ 12 What flops**: replace TBD with evidence-backed entries. Same format.
- **§ 7 Post length distribution**: update percentages with actual distribution.
- **§ 8 Topic mix**: update percentages with actual distribution; flag any drift from the strategy doc.
- **§ 9 First-person voice in practice**: refine the per-pillar examples with actual top-performing posts (anonymize/edit if needed but keep the rhythm).
- **§ 13 Upgrade log**: append a new entry with date, sample size, and key changes.

If a calibration suggests an entirely new pattern that wasn't in v1 (e.g., a hook type that emerged organically and works well), add it to the appropriate section and to `format-catalog.md` § Hook patterns library.

### Step 5: Update the strategy doc and format catalog if needed

If calibration surfaces:
- A pillar's mix is materially off from the strategy doc, decide whether to update the strategy doc or recalibrate the queue. Both are valid. Document the choice.
- A new format that's working well isn't yet in `format-catalog.md`, add it.
- An existing format's failure modes have evolved, update them.

These updates should be light. The strategy doc is high-level; most learnings live in voice.md and format-catalog.md.

---

## Output

A revised `voice.md` with:
- **Version number bumped** (1.0 → 2.0 for first calibration, 2.0 → 2.1 for refinements, etc.)
- **Last updated** date
- **Sample size** ("Calibrated against 47 published posts, 2026-08-12")
- **What works** and **What flops** populated with specific evidence
- **Upgrade log** entry summarizing the changes

---

## What changes vs what stays

**Always stays**:
- The first-person anonymous-sadhaka persona (per user decision 2026-05-07)
- The asset-trail rule
- The KB-citation discipline
- The CLAUDE.md inherited rules (no em dashes, Sanatan not Hindu, anti-slop)
- The 8 pillars (additions only after explicit strategy review)

**Changes with calibration**:
- Length distribution percentages
- Topic mix percentages
- Per-pillar first-person examples
- What works / what flops lists
- Hook patterns library (additions, occasional retirements)
- Specific failure modes per format

**Never changes by calibration alone**:
- The 10 hard rules in the strategy doc
- The pillar count (1-8 + 11)
- The brand handle
- The persona type (first-person anon)

These need explicit user review before changing.

---

## Failure modes of calibration

- **Over-fitting to one viral post.** A single post going viral tells you very little. Patterns require 3+ supporting posts.
- **Confusing engagement with quality.** A post with 50K likes from bots and 0 replies isn't a successful Sadhaka post. The metric is composite, not raw.
- **Stripping the persona.** If calibration data suggests "more aggressive hooks would get more engagement", do not strip the anon-sadhaka voice. The persona is fixed; the volume knob is on tactics, not posture.
- **Cargo-culting peer accounts.** If yajnshri's "ancient + science" hook works for them at 200K followers, that doesn't mean Sadhaka should adopt it as default. Sadhaka's differentiator is rigor, and rigor reads differently at 5K followers than at 200K.

---

## Storage

Calibration outputs (working notes, post categorization tables, manual landed/flopped tags) live in `.claude/skills/write-x-sadhaka/calibration-data/YYYY-MM-DD/`. Don't commit raw post text without redacting any private replies.
