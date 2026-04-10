# Panchang Page Build Phases

This document breaks down the Panchang feature build into execution phases. It builds on top of the existing vedic-clock computation engine (`src/lib/vedic-clock/`), API (`/api/vedic-clock`), and panchang data (`src/data/panchang.ts`, `src/data/nakshatras.ts`).

Research docs: `docs/research/Sadhaka Panchang.md` and `docs/research/Sādhaka Panchang & Muhūrta Knowledge Base for LLMs.md`.

## Route decision

- **New page:** `/panchang` (root-level, maximum SEO weight for "panchang today" queries)
- **Redirect:** `/jyotish/today` → `/panchang` (301 permanent)
- **Unchanged:** `/jyotish/panchang` remains as the static reference hub for varas, tithis, yogas, karanas

---

## Phase 1: Computation Extensions

Extend the vedic-clock library with two new pure-function modules. No external dependencies — both derive from sunrise/sunset + weekday, which `buildVedicClockResponse` already computes.

### 1A. Inauspicious Kalas

**New file:** `src/lib/vedic-clock/inauspicious-kalas.ts`

Compute Rahu Kala, Yamaganda, Gulika Kala by dividing daylight into 8 equal octants and selecting the weekday-specific octant.

Octant tables (South Indian / Drik Panchang convention):

| Weekday   | Rahu | Yamaganda | Gulika |
|-----------|------|-----------|--------|
| Sunday    | 8    | 5         | 7      |
| Monday    | 2    | 4         | 6      |
| Tuesday   | 7    | 3         | 5      |
| Wednesday | 5    | 7         | 4      |
| Thursday  | 6    | 2         | 3      |
| Friday    | 4    | 1         | 2      |
| Saturday  | 3    | 6         | 1      |

Formula:
```
octant_duration = (sunset_minutes - sunrise_minutes) / 8
start = sunrise_minutes + (octant - 1) * octant_duration
end = start + octant_duration
```

Interface: `InauspiciousKala { name, devanagari, startTime, endTime, startMinutes, endMinutes, isActive }`

**Test:** `src/lib/vedic-clock/inauspicious-kalas.test.ts` — verify all 7 weekdays against Varanasi fixtures, boundary conditions, short/long days.

### 1B. Auspicious Windows

**New file:** `src/lib/vedic-clock/auspicious-windows.ts`

Surface four key sadhana-relevant windows:

- **Brahma Muhurta**: 96 to 48 minutes before sunrise (sattva peak)
- **Pratah Sandhya**: ±24 minutes around sunrise (dawn junction for sandhyavandana)
- **Abhijit Muhurta**: 8th muhurta of day (sunrise + 7×48 to +8×48), universally auspicious midday
- **Sayahna Sandhya**: ±24 minutes around sunset (dusk junction)

Interface: `AuspiciousWindow { name, devanagari, description, startTime, endTime, startMinutes, endMinutes, isActive, isPast }`

**Test:** `src/lib/vedic-clock/auspicious-windows.test.ts`

### 1C. Wire into API Response

**Modify `schema.ts`:** Add `InauspiciousKalaSchema` and `AuspiciousWindowSchema` Zod schemas. Add `inauspiciousKalas` (length 3) and `auspiciousWindows` (length 4) to `VedicClockResponseSchema.clock`.

**Modify `core.ts`:** In `buildVedicClockResponse()`, after kalaSegments (line 172), call `computeInauspiciousKalas(weekday, sunriseMinutes, sunsetMinutes, currentLocalMinutes)` and `computeAuspiciousWindows(sunriseMinutes, sunsetMinutes, currentLocalMinutes)`.

**Modify `index.ts`:** Export new types.

**Modify `VedicClockClient.tsx`:** In `buildDerivedPayload()`, pass through the new fields (they depend on sunrise/sunset which doesn't change intra-day, so no client-side recalculation needed).

**Extend `core.test.ts`:** Verify response includes both new arrays, backward compatibility intact.

### Phase 1 status

- [x] `inauspicious-kalas.ts` — implemented
- [x] `inauspicious-kalas.test.ts` — implemented
- [x] `auspicious-windows.ts` — implemented
- [x] `auspicious-windows.test.ts` — implemented
- [x] Wire into `schema.ts`, `core.ts`, `index.ts` — implemented
- [x] Update `VedicClockClient.tsx` `buildDerivedPayload()` — implemented
- [x] Extend `core.test.ts` — implemented

---

## Phase 2: Sadhana Guidance Layer

**New file:** `src/lib/panchang-guidance.ts`

Mapping function that synthesizes existing data from `src/data/panchang.ts` (tithis have `deity`, `practiceSlugs`, varas have `rulingGraha`, `practiceSlugs`) into user-facing guidance.

```typescript
interface SadhanaGuidance {
  headline: string;           // "Guruvara, Shukla Ekadashi — wisdom and restraint"
  chips: SadhanaChip[];       // colored badges: best windows, avoid periods, special observance
  tithiGuidance: { deity, suggestion, linkedPractices }
  varaGuidance: { graha, suggestion }
  nakshatraNote: string;
}
```

Data sources (all existing, no new data):
- `src/data/panchang.ts` — varas[].rulingGraha, tithis[].deity, tithis[].meaning
- `src/data/nakshatras.ts` — nakshatras[].qualities, nakshatras[].deity
- `src/lib/jyotish.ts` — getVaraPracticeBundle(), getNakshatraPracticeBundle()

**Test:** `src/lib/panchang-guidance.test.ts`

### Phase 2 status

- [x] `panchang-guidance.ts` — implemented
- [x] `panchang-guidance.test.ts` — implemented

---

## Phase 3: Page and Components

### 3A. Server Page

**New file:** `src/app/panchang/page.tsx`

- Server component, calls `buildVedicClockResponse({ cityId: "varanasi" })` for SSR default
- Dynamic metadata: "Today's Panchang — {Vara}, {Tithi} | Sadhaka"
- JSON-LD: WebPage + BreadcrumbList + FAQPage
- Renders Header, JyotishDisclaimer, PanchangClient (client island), PanchangFaq (static), Footer
- Passes initial payload as prop for instant paint

### 3B. New Components

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| PanchangClient | `src/components/panchang/PanchangClient.tsx` | Client | Main shell: city selector, live tick, date navigation, orchestrates sub-components |
| SadhanaOverview | `src/components/panchang/SadhanaOverview.tsx` | Client | Headline + colored chips (best windows, avoid periods, special observance) |
| DayTimeline | `src/components/panchang/DayTimeline.tsx` | Client | Horizontal SVG bar: pre-dawn to next sunrise, color-coded muhurta segments, red overlays for inauspicious kalas, current time marker with pulse, hover tooltips |
| AuspiciousCards | `src/components/panchang/AuspiciousCards.tsx` | Client | 4 cards: Brahma Muhurta, Pratah/Sayahna Sandhya, Abhijit — with times, status, practice suggestions |
| InauspiciousPeriods | `src/components/panchang/InauspiciousPeriods.tsx` | Client | 3 cards: Rahu Kala, Yamaganda, Gulika — times + active/past/upcoming badge |
| PanchangaTable | `src/components/panchang/PanchangaTable.tsx` | Client | 5-limb panchanga display (vara, tithi, nakshatra, yoga, karana) with links to reference pages |
| TithiDeityCalendar | `src/components/panchang/TithiDeityCalendar.tsx` | Client | Interactive grid of 30 tithis with deity, practice. Highlights today. Links to /jyotish/panchang/tithis/[slug] |
| CitySelector | `src/components/panchang/CitySelector.tsx` | Client | Preset dropdown + geolocation + localStorage persistence (extracted from VedicClockClient pattern) |
| PanchangFaq | `src/components/panchang/PanchangFaq.tsx` | Server | Static FAQ accordion from src/data/panchang-faq.ts |

### 3C. Page Layout (top to bottom)

1. **Hero header**: "Today's Panchang" title + date + CitySelector
2. **SadhanaOverview**: one-line headline + colored chips
3. **DayTimeline**: horizontal visual timeline of the entire vedic day
4. **Two-column grid**: AuspiciousCards (left) + InauspiciousPeriods (right)
5. **PanchangaTable**: 5-limb data with sunrise/sunset/solar noon
6. **TithiDeityCalendar**: interactive reference grid
7. **PanchangFaq**: static accordion with JSON-LD

### 3D. PanchangClient Architecture

Adapts the VedicClockClient pattern:
- **SSR payload** (Varanasi) passed as prop — instant paint
- **Client hydration**: reads localStorage for saved city; if different, fetches
- **Live tick**: 1s interval via `shiftLocalDateTime()` from `interactive.ts`
- **Server resync**: every 5 minutes, refetch `/api/vedic-clock`
- **Date navigation**: prev/next arrows, date picker — `?date=YYYY-MM-DD` query param
- **City change**: fetches new payload, persists to localStorage

### 3E. DayTimeline (Key Visual)

SVG-based horizontal bar from ~96 min before sunrise to next sunrise:
- **Muhurta segments**: 30 rectangles — golden for auspicious (Brahma, Abhijit), indigo for night, neutral gray for regular day
- **Inauspicious overlays**: semi-transparent red (#EF4444/30%) striped overlay for Rahu/Yamaganda/Gulika
- **Current time marker**: vertical line with animated amber glow/pulse
- **Sunrise/sunset markers**: vertical dashed lines
- **Hover**: tooltip with muhurta name (Devanagari + IAST), deity, time range
- **Responsive**: full width desktop, horizontal scroll mobile

### Phase 3 status

- [ ] `panchang-faq.ts` data + test — pending
- [ ] CitySelector — pending
- [ ] PanchangaTable — pending
- [ ] InauspiciousPeriods — pending
- [ ] AuspiciousCards — pending
- [ ] SadhanaOverview — pending
- [ ] DayTimeline + test — pending
- [ ] TithiDeityCalendar — pending
- [ ] PanchangClient + test — pending
- [ ] `panchang/page.tsx` server wrapper + SEO — pending
- [ ] PanchangFaq — pending

---

## Phase 4: Navigation and SEO

### 4A. Navigation Registration

- **Header.tsx:** Add `{ label: "Panchang", href: "/panchang" }` to `navSections`
- **Footer.tsx:** Add to appropriate column in footerLinks
- **DiscoverSection.tsx:** Add to categories array (title: "Daily Panchang")

### 4B. Redirect

**next.config.ts:** Add `{ source: "/jyotish/today", destination: "/panchang", permanent: true }`

### Phase 4 status

- [ ] Header nav link — pending
- [ ] Footer link — pending
- [ ] DiscoverSection entry — pending
- [ ] Redirect in next.config.ts — pending

---

## Phase 5: Verification

1. `npm run test:run` — all new and existing tests pass
2. `npm run build` — production build succeeds
3. `npm run lint` — no lint errors
4. Visual check at `/panchang`:
   - Default Varanasi renders instantly (SSR)
   - City selector works, persists across reload
   - Live tick updates current time marker
   - Date prev/next works
   - 30 muhurtas visible on timeline
   - Inauspicious periods show correct weekday times
   - Auspicious windows show correct sunrise-relative times
   - Tithi-deity calendar highlights today
   - FAQ accordion opens/closes
   - Links to reference pages work
5. `/jyotish/today` redirects to `/panchang` (301)
6. Panchang visible in Header, Footer, DiscoverSection

---

## Key Files Reference

### Existing (modify)
- `src/lib/vedic-clock/core.ts`
- `src/lib/vedic-clock/schema.ts`
- `src/lib/vedic-clock/index.ts`
- `src/lib/vedic-clock/core.test.ts`
- `src/components/jyotish/VedicClockClient.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/landing/DiscoverSection.tsx`
- `next.config.ts`

### Existing (reuse, no changes)
- `src/lib/vedic-clock/astronomy.ts`
- `src/lib/vedic-clock/interactive.ts`
- `src/lib/vedic-clock/presets.ts`
- `src/lib/vedic-clock/muhurta-names.ts`
- `src/data/panchang.ts`
- `src/data/nakshatras.ts`
- `src/lib/seo/index.ts`
- `src/components/jyotish/JyotishDisclaimer.tsx`
- `src/components/animations/ScrollReveal.tsx`
- Shadcn: Card, Accordion, Badge, Table, Tooltip, Select, Skeleton

### New (create)
- `src/lib/vedic-clock/inauspicious-kalas.ts` + `.test.ts`
- `src/lib/vedic-clock/auspicious-windows.ts` + `.test.ts`
- `src/lib/panchang-guidance.ts` + `.test.ts`
- `src/data/panchang-faq.ts` + `.test.ts`
- `src/app/panchang/page.tsx`
- `src/components/panchang/PanchangClient.tsx` + `.test.tsx`
- `src/components/panchang/DayTimeline.tsx` + `.test.tsx`
- `src/components/panchang/SadhanaOverview.tsx`
- `src/components/panchang/AuspiciousCards.tsx`
- `src/components/panchang/InauspiciousPeriods.tsx`
- `src/components/panchang/PanchangaTable.tsx`
- `src/components/panchang/TithiDeityCalendar.tsx`
- `src/components/panchang/CitySelector.tsx`
- `src/components/panchang/PanchangFaq.tsx`
