

# Saadhakam - Landing Page Implementation Plan

## Overview
A production-quality, mobile-first landing page for Saadhakam - a spiritual exploration platform helping Western seekers discover their path within Sanatan Dharma. We'll start with a polished, conversion-optimized landing page, then expand to additional routes.

---

## Phase 1: Foundation & Design System

### Color Palette (Modern Spiritual)
- **Primary**: Deep indigo (#1e1b4b) - grounding, contemplative
- **Accent**: Warm saffron (#f59e0b) - sacred, inviting
- **Surface**: Warm ivory (#fefce8) - parchment feel
- **Gold highlights**: Subtle metallic accents (#d4af37)
- **Text**: Rich charcoal on light, warm white on dark

### Typography
- **Headings**: Playfair Display (elegant serif) - spiritual gravitas
- **Body**: Inter (clean sans) - modern readability
- **Sanskrit accents**: Noto Serif Devanagari for occasional Sanskrit

### Visual Motifs
- Subtle SVG lotus/mandala patterns at low opacity in backgrounds
- Clean line art iconography (yantra-inspired geometric)
- Warm gradient overlays (indigo to saffron subtle blends)

---

## Phase 2: Landing Page Sections (All 11)

### 1. Hero Section
- **Headline**: "Your path already exists. Saadhakam helps you find it."
- **Subheadline**: Anchored in India's living wisdom tradition
- **Primary CTA**: "Start Your Path" → /pathfinder
- **Secondary CTA**: "Explore the Map" → smooth scroll
- **Trust line**: "Respectful. Non-dogmatic. Deeply sourced."
- **Sanskrit microcopy**: "स्वधर्मे निधनं श्रेयः" with translation
- Subtle animated background pattern

### 2. Philosophy Grid ("The Map of Sanatan")
- 8 philosophy cards in responsive grid
- Each card: icon, title, 2-line description, key question, "Read more" link
- Philosophies: Vedanta, Advaita, Vishishtadvaita, Dvaita, Samkhya, Yoga Darshana, Mimamsa, Nyaya-Vaisheshika
- Hover states with subtle lift animation

### 3. Traditions Carousel
- Horizontal scroll on mobile, grid on desktop
- 7 tradition cards: Shaivism, Shaktism, Vaishnavism, Smartism, Tantra (respectful framing), Bhakti Lineages, Kashmir Shaivism
- Each: core orientation, primary practices, tone badge, "Read more"
- Smooth scroll indicators

### 4. Practice Atlas
- Icon tile grid with 8 practices
- Japa, Dhyana, Kirtan, Puja, Seva, Svadhyaya, Yoga as Sadhana, Vrat
- Expandable accordion/modal for each: What it is / Who it suits / How to begin
- Links to /pathfinder or /start

### 5. Self-Alignment Framework ("Choose Your Branch")
- Two-column layout (stacks on mobile)
- Left: Framework explanation (gunas, samskaras, svabhava, dharma, learning style)
- Right: Pathfinder card with 4 outcome previews (Inquiry-led, Devotion-led, Ritual-led, Discipline-led)
- CTAs to /pathfinder for each path type

### 6. Greats & Philosophers
- Visual timeline/card layout with stylized silhouette placeholders
- 5 figures: Adi Shankaracharya, Abhinavagupta, Swami Vivekananda, Sri Aurobindo, Kalidasa
- Each: 1-2 line summary, "What they clarified", "Read more"
- Subtle connecting line motif

### 7. Avatars & Key Texts
- Two-column card block
- Avatars section: Rama, Krishna, Devi (archetypal lenses)
- Texts section: Bhagavad Gita (spotlight), Upanishads, Yoga Sutras, Devi Mahatmya
- Special CTA: "Explore the Gita by life situation" → /texts/bhagavad-gita

### 8. Conversion Section ("Begin Your Saadhana")
- Full-width CTA band with gradient background
- Primary: "Start Your Path" → /pathfinder
- Secondary: "Create a Practice Plan" → /start
- Email capture form (mock submission with toast feedback)
- Microcopy: "7 days. 10 minutes a day. A path that fits you."
- Privacy reassurance text

### 9. Social Proof & Trust
- 3 testimonial cards with placeholder quotes (grounded, sincere voice)
- Trust badges: "Culturally respectful", "Source-linked learning", "Non-dogmatic guidance"
- Disclaimer: Educational/spiritual support, not medical treatment

### 10. FAQ Section
- Accordion with 5+ questions
- Topics: Not a conversion tool, welcoming to newcomers, avoiding misrepresentation, guru question, interfaith compatibility
- Invitational, respectful language throughout

### 11. Footer
- Full navigation links to all pages
- Sanskrit line with translation
- Newsletter signup
- Contact information
- Copyright with respectful acknowledgment

---

## Phase 3: Navigation & UX

### Header
- Logo placeholder (text-based initially)
- Desktop: Full nav links
- Mobile: Hamburger menu with smooth slide-in
- Sticky on scroll with backdrop blur

### Mobile Sticky CTA
- Appears after first scroll
- "Start Your Path" button
- Dismissible, respects reduced-motion

### Smooth Scrolling
- Section anchors for "Explore the Map"
- Respects `prefers-reduced-motion`
- Offset for sticky header

---

## Phase 4: Data Structure

### Local Data Files
Create `/src/data/` with typed arrays for:
- `philosophies.ts` - 8 entries with slug, title, summary, keyQuestion, tags
- `traditions.ts` - 7 entries with orientation, practices, tone
- `practices.ts` - 8 entries with description, whoItSuits, howToBegin
- `greats.ts` - 5 entries with summary, clarification, era
- `texts.ts` - 4+ entries with overview, themes, recommendedFor

---

## Phase 5: Route Stubs (Ready for Expansion)

### Pages to Create
- `/` - Landing page (fully implemented)
- `/pathfinder` - Quiz intro page with polished UI, 4 path outcome previews, CTA to start
- `/philosophies` - List page placeholder
- `/traditions` - List page placeholder
- `/greats` - List page placeholder
- `/texts` - List page placeholder
- `/start` - Email capture page with mock submit

### Detail Page Template
- Create reusable detail template component
- Sections: Overview, Key Ideas, Who It Suits, How to Start, Recommended Reading, CTAs
- Ready to receive dynamic data via URL params

---

## Phase 6: Polish & Accessibility

### Animations (Framer Motion-style with CSS)
- Fade-in on scroll for sections
- Subtle hover lifts on cards
- Button press feedback
- Reduced-motion fallbacks

### Accessibility
- Semantic HTML throughout
- Proper heading hierarchy (h1 → h6)
- ARIA labels on interactive elements
- Focus states for keyboard navigation
- Color contrast compliance

### SEO Ready
- Page titles and meta descriptions
- Open Graph tags structure
- Proper heading hierarchy
- Semantic sections with landmarks

---

## Deliverables Summary

1. **Complete landing page** with all 11 sections, full content, working interactions
2. **Design system** with custom Tailwind config (colors, fonts, shadows)
3. **Data layer** with typed content arrays ready for expansion
4. **Navigation** with sticky header, mobile menu, smooth scroll
5. **Route stubs** for all planned pages with placeholder content
6. **Pathfinder intro page** - polished start screen
7. **Start page** - email capture with mock form handling

The result will be a production-ready, visually cohesive landing page that honors the depth and reverence of Sanatan Dharma while feeling accessible and modern to Western seekers.

