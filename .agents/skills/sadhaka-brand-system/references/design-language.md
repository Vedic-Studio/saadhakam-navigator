# Design Language

This document captures Sadhaka’s practical UI token philosophy and implementation cues.

## Token Philosophy

Design should communicate:
- depth,
- stillness,
- rigor,
- modern credibility.

## Color System (From `globals.css` / Tailwind mapping)

### Foundation
- `--background: 248 30% 8%` (deep indigo / near-void)
- `--foreground: 250 20% 98%` (soft white)

### Surfaces
- `--card: 248 35% 12%`
- glass-style overlays via low-opacity borders + blur

### Actions and Emphasis
- `--primary: 25 90% 55%` (saffron/orange action)
- `--accent: 35 90% 50%` (gold accent)
- `--secondary: 260 60% 60%` (mystic purple support)

### Supporting
- muted and border tokens preserve dark-theme hierarchy without harsh contrast breaks.

## Typography

### Families
- Display: `Playfair Display`
- Body: `Inter`
- Sanskrit layer (optional): `Noto Serif Devanagari`

### Usage Rules
- Display serif for key headlines and section anchors.
- Sans for body copy, metadata, UI controls.
- Sanskrit font for selective cultural authenticity (quotes, labels), not dense body blocks.

## Shape, Spacing, and Surface

- Base radius token centers around `--radius: 1rem`.
- Rounded XL cards and sections are preferred for premium softness.
- Spacious vertical rhythm and deliberate whitespace are part of trust UX.
- Utility: `.container-padding` for consistent max-width and horizontal rhythm.

## Motion & Effects

Allowed motion:
- fade-up / fade-in,
- float-gentle,
- pulse-soft,
- subtle hover lift.

Do not use:
- aggressive parallax stacks,
- rapid flashing,
- high-amplitude movement that distracts from reading.

## Imagery Direction

Imagery is cinematic and meaning-bearing:
- sacred architecture,
- contemplative figures,
- textual/heritage visual anchors.

Use overlays/gradients to preserve readability and atmosphere.

## Accessibility Baselines

- Maintain readable contrast across dark surfaces.
- Preserve text legibility under gradient overlays.
- Ensure keyboard/focus visibility and semantic structure.
- Respect reduced-motion preferences on animated components.
