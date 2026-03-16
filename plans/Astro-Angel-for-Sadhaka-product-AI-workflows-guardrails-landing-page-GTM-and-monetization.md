# Astro Angel for Sadhaka

## Product Plan: AI Workflows, Guardrails, Landing Page, GTM & Monetization

**Date:** 2026-03-17
**Platform:** opensadhaka.com
**Status:** Draft

---

## 1. Product Vision

**Astro Angel** is an AI-powered spiritual guidance companion embedded into Sadhaka. It provides personalized spiritual advice, daily practices, mantra recommendations, and philosophical Q&A — grounded in authentic Vedantic, Shaiva, Shakta, and Vaishnava traditions.

**Tagline:** *Your personal guide through the wisdom of Sanatan Dharma.*

### 1.1 Why Now

- Sadhaka already has deep content: 42+ articles, stotras, sahasranamas, BG shlokas, 8 traditions, 8 practices, 8 philosophies
- Faith Finder quiz (live) generates leads and identifies user spiritual paths
- AI chatbot demand is high in spirituality niche — but most are shallow, generic, or culturally inappropriate
- Astro Angel converts passive readers into engaged, returning users

### 1.2 Target Users

| Segment | Description | Value |
|---------|-------------|-------|
| **Curious Seekers** | New to Sanatan Dharma, want guidance | High volume, conversion to paid |
| **Practicing Sadhaks** | Regular practitioners wanting deeper study | High retention, high LTV |
| **Diaspora Hindus** | English-speaking, reconnecting with roots | Strong willingness to pay |
| **Yoga/Meditation Community** | Want philosophical depth beyond asana | Cross-sell from practices |

---

## 2. Core AI Workflows

### 2.1 Workflow Map

```
User Input → Intent Classification → Workflow Router → Response Generation → Guardrail Check → Delivery
```

### 2.2 Workflow Definitions

#### W1: Philosophical Q&A
- **Trigger:** User asks about concepts, texts, traditions
- **Data Sources:** Articles, concept pages, BG shlokas, tradition data
- **Example:** "What is the difference between Advaita and Vishishtadvaita?"
- **RAG Strategy:** Embed Sadhaka content → retrieve top-k chunks → generate grounded answer with citations linking back to site pages

#### W2: Personalized Practice Recommendation
- **Trigger:** User asks "What should I practice?" or similar
- **Data Sources:** Faith Finder results (if available), practice data, mantra data
- **Flow:** Check user profile/path → recommend practice + mantra + stotra → link to relevant pages
- **Example:** "Based on your Bhakti path, try chanting the Vishnu Sahasranama daily. Here's the first verse..."

#### W3: Daily Spiritual Guidance
- **Trigger:** User opens app / requests daily guidance
- **Data Sources:** BG shlokas (Ch1-18), stotras, articles
- **Flow:** Select contextually relevant shloka → provide translation + brief commentary → suggest related reading
- **Personalization:** Weighted toward user's identified path (Inquiry/Devotion/Ritual/Discipline from Faith Finder)

#### W4: Mantra & Stotra Guide
- **Trigger:** User asks about specific mantras, pronunciation, meaning
- **Data Sources:** Stotra JSONs (content/stotras/), mantra data
- **Flow:** Retrieve stotra/verse → provide transliteration + translation + analysis → audio link (future)

#### W5: Astrology Lite (Astro Angel Core)
- **Trigger:** User asks about planetary influences, auspicious timing, nakshatra
- **Data Sources:** Curated Jyotish reference data (to be built)
- **Flow:** Basic nakshatra/rashi info → recommended practices for current period → link to relevant deities/mantras
- **Note:** NOT predictive astrology — educational + practice-oriented only

#### W6: Onboarding & Path Discovery
- **Trigger:** New user, no Faith Finder results
- **Flow:** Quick 3-question mini-assessment → assign provisional path → personalize from first interaction
- **Integration:** Links to full Faith Finder quiz for deeper assessment

---

## 3. AI Guardrails

### 3.1 Content Guardrails

| Rule | Implementation | Priority |
|------|----------------|----------|
| **Tradition-authentic only** | System prompt constrains responses to Sadhaka's content corpus; no mixing with non-Indic traditions unless comparing | P0 |
| **No predictive astrology** | Hard block on "your future will..." type predictions; reframe as "traditional practices for this period" | P0 |
| **No medical/mental health advice** | Detect health-related queries → redirect to professionals + offer calming practices | P0 |
| **Respectful of all paths** | Never disparage any tradition; present differences as complementary perspectives | P0 |
| **Citation required** | Every substantive claim must link to a Sadhaka page or cite a traditional text | P1 |
| **Sanskrit accuracy** | Validate transliterations against source data; flag uncertain terms | P1 |
| **No superstition promotion** | Avoid fear-based content (cursed days, mandatory rituals with dire consequences) | P1 |

### 3.2 Behavioral Guardrails

| Rule | Implementation |
|------|----------------|
| **Conversation length limit** | Free tier: 5 messages/day; nudge to subscribe after limit |
| **No guru replacement** | Explicitly state "Astro Angel is an educational tool, not a substitute for a qualified guru/teacher" |
| **Graceful deflection** | Off-topic queries → gentle redirect: "I'm best at helping with spiritual wisdom. For [topic], I'd suggest..." |
| **Prompt injection defense** | Input sanitization + system prompt hardening + output validation |
| **Rate limiting** | Per-user rate limits to prevent abuse |
| **PII protection** | Never store or repeat personal details shared in conversation |

### 3.3 Technical Guardrails

- **Hallucination mitigation:** RAG-first approach; if retrieval confidence < threshold, say "I don't have specific information on that, but here's what I can share..."
- **Fallback chain:** RAG → curated FAQ → graceful "I don't know" with suggested reading
- **Monitoring:** Log all conversations (anonymized) for quality review
- **Human escalation:** Flag conversations where user expresses distress → show helpline resources

---

## 4. Technical Architecture

### 4.1 Stack

```
Frontend (Next.js)
├── /astro-angel (landing page)
├── /astro-angel/chat (chat interface)
└── /api/astro-angel/* (API routes)

Backend
├── Claude API (Anthropic) — primary LLM
├── Vector DB (Pinecone / Vercel Postgres + pgvector)
├── Sadhaka Content Embeddings
└── User session store (Vercel KV / Redis)

Auth & Payments
├── NextAuth.js or Clerk (user accounts)
└── Stripe (subscriptions)
```

### 4.2 RAG Pipeline

1. **Index Phase** (build time / cron):
   - Embed all articles, stotra verses, BG shlokas, concept pages
   - Chunk by semantic sections (not fixed-size)
   - Store in vector DB with metadata (category, tradition, content-type)

2. **Query Phase** (runtime):
   - Classify user intent → select workflow
   - Generate embedding for user query
   - Retrieve top-k chunks (filtered by workflow-relevant content types)
   - Construct prompt: system instructions + retrieved context + user message
   - Generate response via Claude API
   - Post-process: validate citations, apply guardrails, format with links

### 4.3 Key Files to Create/Modify

| File | Purpose |
|------|---------|
| `src/app/astro-angel/page.tsx` | Landing page |
| `src/app/astro-angel/chat/page.tsx` | Chat interface |
| `src/app/api/astro-angel/chat/route.ts` | Chat API endpoint |
| `src/app/api/astro-angel/embed/route.ts` | Content embedding endpoint |
| `src/lib/astro-angel/workflows.ts` | Workflow router + definitions |
| `src/lib/astro-angel/guardrails.ts` | Guardrail checks |
| `src/lib/astro-angel/rag.ts` | RAG retrieval logic |
| `src/lib/astro-angel/prompts.ts` | System prompts per workflow |
| `src/data/astroAngelFAQ.ts` | Curated FAQ fallbacks |

---

## 5. Landing Page Plan

### 5.1 Route: `/astro-angel`

### 5.2 Page Structure

```
1. Hero Section
   - Headline: "Meet Astro Angel — Your Spiritual Wisdom Guide"
   - Subheadline: "Personalized guidance rooted in 5,000 years of Vedantic wisdom"
   - CTA: "Start a Conversation" (free) / "Try Free — 5 Questions/Day"
   - Background: Subtle cosmic/celestial pattern (aligned with astro theme)

2. How It Works (3 steps)
   - Step 1: Ask anything about Vedanta, mantras, practices, or your spiritual path
   - Step 2: Get grounded answers with references to authentic texts
   - Step 3: Deepen your practice with personalized daily guidance

3. Capability Showcase (6 cards)
   - Philosophical Q&A
   - Personalized Practices
   - Daily Guidance (Shloka of the Day)
   - Mantra & Stotra Guide
   - Spiritual Path Discovery
   - Auspicious Timing Guide

4. Sample Conversations (interactive carousel)
   - 3-4 real example exchanges showing depth and tone

5. Trust & Authenticity Section
   - "Grounded in scripture, not speculation"
   - Sources: Bhagavad Gita, Upanishads, Puranas, Tantras
   - Disclaimer: Educational tool, not a replacement for a guru

6. Pricing Section (see Section 7)

7. FAQ Section
   - Is this real astrology? (No — educational guidance based on traditional knowledge)
   - What traditions does it cover? (Vedanta, Shaiva, Shakta, Vaishnava)
   - Is my data private? (Yes — conversations are not stored)
   - Can I use it for free? (Yes — 5 messages/day free)

8. Final CTA
   - "Begin Your Journey" → /astro-angel/chat
   - Secondary: "Not sure? Take the Faith Finder Quiz first" → /faith-finder
```

### 5.3 SEO Metadata

- **Title:** "Astro Angel — AI Spiritual Guide for Vedantic Wisdom | Sadhaka"
- **Description:** "Get personalized spiritual guidance grounded in Vedanta, Bhagavad Gita, and Hindu philosophy. Free AI-powered spiritual companion."
- **Target Keywords:** AI spiritual guide, Hindu philosophy chatbot, Vedanta AI, spiritual guidance online, personalized mantra recommendation

---

## 6. Go-To-Market (GTM) Strategy

### 6.1 Launch Phases

#### Phase 0: Pre-Launch (2 weeks)
- [ ] Build landing page with email waitlist
- [ ] Tease on existing Faith Finder thank-you page
- [ ] Add "Coming Soon: Astro Angel" banner to site header
- [ ] Seed 20-30 curated Q&A pairs for demo carousel

#### Phase 1: Soft Launch — Free Tier (2 weeks)
- [ ] Launch with W1 (Philosophical Q&A) + W3 (Daily Guidance) only
- [ ] 5 free messages/day, no auth required
- [ ] Collect feedback via thumbs up/down on responses
- [ ] Monitor guardrail effectiveness + response quality

#### Phase 2: Full Launch — All Workflows (2 weeks)
- [ ] Enable W2, W4, W5, W6
- [ ] Require auth (email sign-up) for continued use
- [ ] Launch paid tier
- [ ] PR push: "First AI guide grounded in authentic Vedantic scholarship"

#### Phase 3: Growth (ongoing)
- [ ] Content marketing: "I asked AI about the Bhagavad Gita" style articles
- [ ] SEO landing pages: `/astro-angel/ask/[topic]` programmatic pages
- [ ] Integration with Faith Finder: auto-suggest Astro Angel after quiz results
- [ ] Email nurture: weekly "Ask Astro Angel" featured question to subscriber list
- [ ] Social: share-worthy response screenshots (designed cards)

### 6.2 Distribution Channels

| Channel | Tactic | Expected Impact |
|---------|--------|-----------------|
| **Organic Search** | SEO landing pages for "AI + spirituality" queries | High (long-term) |
| **Faith Finder Funnel** | Post-quiz CTA: "Continue your journey with Astro Angel" | High (warm leads) |
| **Email List** | Launch announcement + weekly featured Q&A | Medium-High |
| **Reddit** | r/hinduism, r/vedanta, r/spirituality — value-first posts | Medium |
| **Twitter/X** | Daily wisdom threads powered by Astro Angel | Medium |
| **YouTube** | "We built an AI that knows the Bhagavad Gita" | High (viral potential) |
| **WhatsApp/Telegram** | Community groups for spiritual seekers | Medium |
| **Partnerships** | Yoga studios, meditation apps, Hindu organizations | Long-term |

### 6.3 Key Metrics

| Metric | Target (Month 1) | Target (Month 3) |
|--------|-------------------|-------------------|
| Landing page visits | 5,000 | 20,000 |
| Chat sessions started | 1,000 | 8,000 |
| Messages per session | 3+ | 4+ |
| Free → Paid conversion | 2% | 5% |
| DAU (Daily Active Users) | 100 | 500 |
| NPS Score | 40+ | 50+ |
| Email signups from Angel | 500 | 3,000 |

---

## 7. Monetization Strategy

### 7.1 Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free (Seeker)** | $0 | 5 messages/day, basic Q&A, daily shloka, limited history |
| **Premium (Sadhak)** | $7/month or $49/year | Unlimited messages, all workflows, personalized daily practice plan, conversation history, priority responses |
| **Lifetime (Guru Kripa)** | $149 one-time | Everything in Premium, forever. Early supporter badge. Priority feature access |

### 7.2 Revenue Projections (Conservative)

| Month | Free Users | Paid Users | MRR | Notes |
|-------|-----------|------------|-----|-------|
| 1 | 500 | 10 | $70 | Soft launch |
| 3 | 3,000 | 90 | $630 | Full launch + SEO traffic |
| 6 | 10,000 | 400 | $2,800 | Content marketing flywheel |
| 12 | 30,000 | 1,500 | $10,500 | Established product |

### 7.3 Cost Structure

| Item | Monthly Cost | Notes |
|------|-------------|-------|
| Claude API (Anthropic) | ~$200-500 | Based on message volume; scales with users |
| Vector DB (Pinecone) | $0-70 | Free tier initially, then starter |
| Vercel hosting | $0-20 | Existing plan likely sufficient |
| Stripe fees | 2.9% + $0.30 | Per transaction |
| **Total (Month 1-3)** | **~$200-600** | Well within early revenue |

### 7.4 Upsell Paths

1. **Free → Premium:** Hit daily message limit → "Unlock unlimited wisdom for $7/mo"
2. **Faith Finder → Angel:** Quiz results page → "Go deeper with Astro Angel"
3. **Article Reader → Angel:** In-article widget: "Have questions about this topic? Ask Astro Angel"
4. **Email → Angel:** Weekly "Ask Astro Angel" email with CTA to continue conversation
5. **Premium → Lifetime:** After 3 months of Premium → offer lifetime deal

### 7.5 Future Monetization (v2+)

- **Personalized puja/ritual guides** (premium content packs)
- **Live guru sessions** (marketplace model, Angel handles scheduling)
- **API access** for other Hindu/spiritual platforms
- **White-label** Astro Angel for yoga studios and temples
- **Sponsored recommendations** (books, courses, retreat centers — clearly labeled)

---

## 8. Implementation Roadmap

### Sprint 1: Foundation (Week 1-2)
- [ ] Set up RAG pipeline: embed existing Sadhaka content
- [ ] Build chat API endpoint with Claude integration
- [ ] Implement W1 (Philosophical Q&A) with guardrails
- [ ] Create minimal chat UI component
- [ ] Build landing page

### Sprint 2: Core Product (Week 3-4)
- [ ] Implement W2 (Practice Recommendation) + W3 (Daily Guidance)
- [ ] Add Faith Finder integration (use quiz results for personalization)
- [ ] Implement message rate limiting (5/day free)
- [ ] Add conversation feedback (thumbs up/down)
- [ ] Soft launch — collect feedback

### Sprint 3: Full Launch (Week 5-6)
- [ ] Implement W4 (Mantra Guide) + W5 (Astro Lite) + W6 (Onboarding)
- [ ] Add auth (email sign-up via NextAuth/Clerk)
- [ ] Integrate Stripe for Premium tier
- [ ] Build user dashboard (conversation history, saved responses)
- [ ] Full launch + GTM execution

### Sprint 4: Growth (Week 7-8)
- [ ] pSEO pages: `/astro-angel/ask/[topic]`
- [ ] Email integration: weekly featured Q&A
- [ ] In-article Astro Angel widget
- [ ] Analytics dashboard for usage metrics
- [ ] Iterate on guardrails based on real conversations

---

## 9. Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Hallucinated Sanskrit/philosophy | Medium | High | RAG-first, citation-required, expert review of top-100 queries |
| Cultural sensitivity issues | Low | Very High | Guardrails + beta with Hindu community reviewers |
| Low conversion to paid | Medium | Medium | Test pricing, add more premium-exclusive features |
| High API costs at scale | Low (initially) | Medium | Caching frequent queries, using Haiku for simple queries, Opus for complex |
| Competitor launches similar | Medium | Low | First-mover in authentic Vedantic AI space; content moat |
| User expects real astrology | High | Medium | Clear messaging on landing page + in-chat disclaimers |

---

## 10. Success Criteria

### Month 1 (Soft Launch)
- Landing page live with 1,000+ visits
- Chat functional with <3s response time
- Zero guardrail violations in production
- 50+ organic conversations/day

### Month 3 (Growth)
- 90+ paying subscribers
- 4+ average messages per session
- Top 20 for "AI spiritual guide" keyword
- Faith Finder → Astro Angel conversion > 15%

### Month 6 (Established)
- $2,800+ MRR
- 10,000+ monthly active users
- Featured in 2+ spiritual/tech publications
- Community of 1,000+ email subscribers from Angel

---

*This document is the source of truth for Astro Angel product planning. Update as decisions are made.*
