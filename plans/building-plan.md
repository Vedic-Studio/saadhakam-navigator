Context
The Writing Masterclass Blueprint (50KB, 880 lines) defines a 5-layer knowledge framework: Foundation Principles, Master Profiles (15 deep + 40 medium + open bench), Technique Library (50+ patterns), Context Modules (Social/Long-form/Sales/Thought Leadership), and a Voice Synthesis Engine. This plan turns that blueprint into a working multi-agent software system that generates content — starting human-in-the-loop, evolving to autonomous.
Approach: Custom Python Backend + OpenClaw Design Patterns (Hybrid)
We build the multi-agent pipeline in Python/FastAPI (full control over agent architecture, pipeline design, web-first dashboard), but adopt battle-tested patterns from OpenClaw:
OpenClaw PatternHow We Adopt ItMEMORY.md + daily logsFile-based memory per agent. MEMORY.md for curated long-term knowledge, YYYY-MM-DD.md for daily append-only logs. Indexed with semantic search (BM25 + optional embeddings).SOUL.mdVoice Synthesis Engine config lives in SOUL.md — the agent's personality/tone baseline. Maps directly to blueprint Section 8 (Ankit's Voice).Skill-as-markdownEach agent's prompt template is a markdown file in skills/. Selectively loaded per pipeline turn. Not hardcoded in Python.HeartbeatAutonomous mode (Phase 4): background process wakes agent every N minutes, checks HEARTBEAT.md for pending tasks (scheduled content, feedback synthesis).Selective injectionOnly inject relevant skills/context per agent turn. Research brief is a synthesis, not a data dump. Target <2000 tokens per injection.Context compactionBefore context limit: flush durable memories to disk, summarize older turns, continue with clean context.
Optional future: Add OpenClaw as a messaging channel (WhatsApp/Telegram) for "generate me a tweet about X" interactions.

Tech Stack
ComponentChoiceWhyBackendPython + FastAPIBest Anthropic SDK support, async for LLM I/O, Pydantic for schemasFrontendNext.js 14+ + Tailwind + shadcn/uiCard-based components map directly to dashboard needsDatabaseSQLite (local) → PostgreSQL (cloud)Zero-config locally, SQLAlchemy abstracts the swapKnowledge StoreStructured JSON files, NOT vector DBBlueprint is structured and finite — deterministic retrieval > semantic searchLLMClaude API via anthropic SDKSonnet for most agents, Opus for Editor (quality scoring)

Agent Architecture
Five Agent Types
┌──────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR                           │
│  Receives request → configures pipeline → sequences      │
│  agents → manages state → gates for human review         │
└──────────┬───────────┬──────────────┬────────────────────┘
           │           │              │
     ┌─────▼──┐  ┌─────▼──┐   ┌──────▼─────┐
     │RESEARCH│→ │ WRITER │ ↔ │   EDITOR   │  (revision loop)
     │ Agent  │  │ Agent  │   │   Agent    │
     └────────┘  └────────┘   └──────┬─────┘
                                     │
                    ┌────────────────┬┴───────────────┐
                    │                │                 │
              ┌─────▼──┐     ┌──────▼──┐      ┌──────▼───┐
              │ X/Twitter│    │LinkedIn │      │Newsletter│
              │  Agent   │    │ Agent   │      │  Agent   │
              └──────────┘    └─────────┘      └──────────┘
How they communicate: Shared ContentPipeline state object (persisted in DB). Each agent reads current state, does its work, appends output. Orchestrator advances the status field. No event-driven indirection — explicit pipeline is debuggable.
Agent Roles

Orchestrator — Analyzes content request, picks context module, selects voice weights, configures pipeline params (techniques, word count, tone, anti-patterns, quality threshold). Does NOT generate content.
Research Agent — Queries the structured knowledge store (NOT RAG/vector search). Retrieves relevant principles, master profiles, techniques, vocabulary. Synthesizes a ResearchBrief for the Writer (~2000 tokens max).
Writer Agent — Takes the ResearchBrief, generates content. System prompt is dynamically assembled per-request from the brief (implements Blueprint Section 12.1 Invocation Protocol). This is the only agent that produces primary content.
Editor Agent — Scores output against the Quality Scorecard (Blueprint Section 11.1). 10 dimensions, weighted. Returns structured scores + specific revision notes. If below threshold → sends back to Writer with revision notes. Uses Opus for higher quality evaluation.
Platform Agents (vertical, one per platform) — Adapts Editor-approved content for platform-specific constraints. Each has its own config: char limits, formatting rules, voice modifiers, hook requirements. NOT full rewriters — they handle platform optimization.

Agent Memory (OpenClaw Pattern: File-Based + Semantic Search)
Each agent has a workspace directory with file-based memory (inspired by OpenClaw):
workspace/
  agents/
    writer/
      MEMORY.md              # Curated long-term: voice preferences, learned anti-patterns
      SOUL.md                 # Agent persona: role, constraints, style (from blueprint)
      memory/
        2026-03-06.md         # Daily log: what was generated, feedback received, decisions
        2026-03-07.md
    editor/
      MEMORY.md               # Scoring calibration, what "good" means for this user
      SOUL.md
      memory/
    research/
      MEMORY.md               # Which techniques worked well for which topics
      SOUL.md
      memory/
    platforms/
      twitter/
        MEMORY.md             # Platform-specific preferences, hook patterns that worked
        SOUL.md               # X/Twitter personality, constraints, formatting rules
        memory/
Two-layer retrieval (adopted from OpenClaw):

MEMORY.md is always loaded into context (curated, <200 lines)
Daily logs are indexed with BM25 keyword search (SQLite FTS5). Optionally add vector embeddings later. Queried only when relevant.

Memory flush before context compaction: When approaching context limits during long pipeline runs, agent persists durable findings to MEMORY.md before context is summarized.
Memory is NOT injected into every prompt. Research Agent queries relevant memory entries and includes them in the brief when applicable.

Knowledge Management
Blueprint → Structured JSON (one-time parser)
knowledge/
  blueprint.md                    # Original (source of truth)
  parsed/
    principles.json               # 10 foundation principles
    masters/
      tier1/david_ogilvy.json     # Full profiles (per Master Profile Schema sections 1-8)
      tier2/claude_hopkins.json   # Medium profiles
      tier3/open_bench.json       # Light profiles
    techniques/
      hooks.json                  # By category (Hook/Structure/Rhythm/etc.)
      structures.json
      persuasion.json
      ...
    contexts/
      social_writing.json         # Each context module (masters, templates, rules, metrics)
      long_form.json
      sales_copy.json
      thought_leadership.json
    voice/
      ankit_voice.json            # Voice DNA, weights by context, rules
      style_transfer_tags.json    # Modifier tags (#compress, #warm_the_tone, etc.)
    vocabulary/
      power_words.json
      transitions.json
      rhetorical_devices.json
The KnowledgeStore class loads these at startup into memory (<1MB). Query methods: get_techniques_for_context(), get_masters_for_context(), get_voice_config(). Deterministic filtering, not fuzzy search.
Important: Blueprint v1.0 has schemas defined but many profiles unpopulated. System works with stubs from day one — each master starts as name+domain+contribution from the roster table. Ankit will populate full profiles separately in future sessions. No "enrichment agent" needed — the system gracefully degrades with partial data.
Skills as Markdown (OpenClaw Pattern)
Agent prompt templates live as markdown files, not hardcoded strings:
skills/
  orchestrator.md             # Orchestrator system prompt template
  research.md                 # Research Agent: how to build a brief
  writer/
    base.md                   # Base writer instructions
    social.md                 # Social writing overlay (from blueprint Context Module A)
    long_form.md              # Long-form overlay (Context Module B)
    sales.md                  # Sales copy overlay (Context Module C)
    thought_leadership.md     # Thought leadership overlay (Context Module D)
  editor.md                   # Editor: quality scorecard criteria, how to score
  platforms/
    twitter.md                # X/Twitter: char limits, hook rules, thread architecture
    linkedin.md               # LinkedIn: fold line, formatting, engagement patterns
    newsletter.md             # Newsletter: subject line, preview text, structure
    blog.md                   # Blog: SEO considerations, structure templates
Why markdown files, not Python strings:

Editable without code changes (user can tweak agent behavior by editing a file)
Version-controllable (git diff shows prompt changes over time)
The improvement loop updates these files — when user feedback calibrates an agent, the skill file is what gets updated
Maps to the blueprint's "AI Agent Invocation Protocol" (Section 12.1) as living templates

Config Evolution
Active Config = Baseline (from JSON) + User Overrides (DB) + Feedback Adjustments (DB)
Merged at query time by VoiceConfigService. User approves all config changes — system recommends but does not auto-adjust.

Human-in-the-Loop → Autonomous Pipeline
Mode 1: Full Human Control (launch state)
Every stage has a gate. User reviews pipeline config, research brief, draft, scores, platform adaptation. Can edit inline at any step.
Mode 2: Review Final Only
Pipeline runs research→write→edit automatically (with revision loops). Only final output surfaces for human review.
Mode 3: Autonomous + Approval Queue
Scheduled content generation. Outputs land in batch approval queue. User reviews/approves/rejects in bulk.
Mode 4: Full Autonomous
Auto-publish with quality guardrails. Alerts only for low-scoring content.
Feedback Loop

Capture — Every human edit/approval/rejection stored with stage context
Store — FeedbackEntry linked to pipeline + stage + diff
Synthesize — Periodically, Claude analyzes accumulated feedback for patterns ("user consistently prefers shorter hooks")
Recommend — System generates config adjustment proposals
Apply — User approves adjustments, which update voice/agent configs


Frontend Dashboard
Four Sections

Pipeline View (Home) — Kanban board: Research | Writing | Editing | Platform | Review | Complete. Each card shows topic, platform, stage, quality score, time in pipeline.
Content Workspace — Click a pipeline card → left: stage timeline, center: content with inline editing, right: metadata (voice weights, techniques, scores), bottom: feedback input.
Agent Configuration — Card grid per agent. Expandable into full config editor. Voice weight sliders per context. Platform-specific rules. Quality thresholds.
History & Analytics — Searchable table of past pipelines. Quality score trends. Most-used techniques. Feedback pattern summary.


Phase-wise Build Order
Phase 1: Core Loop (get to testable content generation)
Goal: Type a topic → pick a context → get generated content with quality score.
StepWhatFiles1Project scaffolding — FastAPI + Poetry, Next.js + Tailwind, SQLite + SQLAlchemy + Alembic, Anthropic SDK test callpyproject.toml, main.py, config.py, package.json2Blueprint parser — markdown → structured JSON. Focus on principles, technique names/categories, context modules, voice weights. Master profiles as stubs.backend/app/knowledge/parser.py, backend/app/knowledge/models.py3Knowledge store — loads JSON at startup, query methods with filteringbackend/app/knowledge/store.py4Writer Agent — combines research + writing in one step. Builds system prompt from knowledge store. Calls Claude.backend/app/agents/writer.py, backend/app/agents/base.py5Editor Agent — quality scoring only. Returns structured QualityScore.backend/app/agents/editor.py6Minimal API — POST /api/generate, GET /api/knowledge/techniquesbackend/app/api/routes/generate.py7Frontend (built alongside backend) — input form, generate button, content card + scorecard display. UI from day one.frontend/app/page.tsx, frontend/components/
Phase 2: Multi-Agent Pipeline + Feedback
StepWhat1DB schema — ContentPipeline, ContentOutput, FeedbackEntry, AgentMemory tables2Orchestrator Agent — receives request, configures pipeline, creates DB record3Research Agent — separate from Writer. Outputs structured ResearchBrief4Revision loop — Editor scores → if below threshold → revision notes back to Writer → re-draft (up to N loops)5Human-in-the-loop gates — API endpoints for review/approve/reject at each stage6Pipeline dashboard — Kanban board, content workspace, stage timeline7Feedback storage — all human feedback linked to pipeline + stage + diffs
Phase 3: Platform Agents + Memory
StepWhat1Platform Agent framework — base class + platform configs2X/Twitter Agent first (primary vertical), then LinkedIn, Newsletter3Agent memory system — preference/performance/config memory in DB4Feedback synthesizer — processes accumulated feedback into config adjustment recommendations5Voice weight editor — visual sliders with live preview6Agent config panel + History view in frontend
Phase 4: Autonomous Mode + Scheduling (Heartbeat Pattern)
StepWhat1Heartbeat system (OpenClaw pattern) — background process wakes every N minutes, reads HEARTBEAT.md checklist (scheduled content, pending reviews, feedback synthesis due). Decides if action needed.2Content scheduling — user defines schedule in HEARTBEAT.md (frequency, topics, platforms). Heartbeat creates pipelines on schedule.3Approval queue — batch review interface for heartbeat-generated content4Auto-intermediate mode — pipeline runs fully, surfaces only final output5Quality guardrails — hard minimums for auto-publish, alerts for low scores6Analytics dashboard — trends, technique effectiveness, feedback patterns

Project Structure
writing-agent-system/
  backend/
    app/
      main.py
      config.py
      api/routes/
        generate.py, pipelines.py, knowledge.py, agents.py, feedback.py
      agents/
        base.py, orchestrator.py, research.py, writer.py, editor.py
        platforms/
          base.py, twitter.py, linkedin.py, newsletter.py, blog.py
      knowledge/
        parser.py, store.py, models.py
      memory/
        store.py                   # File-based memory read/write + FTS5 index
        search.py                  # BM25 keyword search over daily logs
        compaction.py              # Context compaction + memory flush
      models/
        database.py, schemas.py, pipeline.py
      services/
        pipeline_service.py, feedback_service.py, memory_service.py, voice_config_service.py
        heartbeat.py               # Heartbeat scheduler (Phase 4)
      db/
        session.py, migrations/
    knowledge/parsed/              # Generated JSON files from blueprint
    tests/unit/, tests/integration/
    pyproject.toml, alembic.ini

  workspace/                       # Agent workspaces (file-based memory)
    agents/
      writer/MEMORY.md, SOUL.md, memory/
      editor/MEMORY.md, SOUL.md, memory/
      research/MEMORY.md, SOUL.md, memory/
      platforms/twitter/MEMORY.md, SOUL.md, memory/

  skills/                          # Agent prompt templates (markdown)
    orchestrator.md
    research.md
    writer/base.md, social.md, long_form.md, sales.md, thought_leadership.md
    editor.md
    platforms/twitter.md, linkedin.md, newsletter.md, blog.md

  frontend/
    app/
      page.tsx                     # Pipeline kanban (home)
      workspace/[pipelineId]/page.tsx
      agents/page.tsx
      history/page.tsx
    components/
      pipeline-card.tsx, pipeline-kanban.tsx, content-editor.tsx
      quality-scorecard.tsx, voice-weight-editor.tsx, agent-status-card.tsx, feedback-form.tsx
    lib/
      api.ts, types.ts, sse.ts
    package.json, tailwind.config.ts

  blueprint/
    Writing Masterclass Blueprint.md   # Source of truth

  HEARTBEAT.md                     # Autonomous mode schedule + checklist (Phase 4)

Verification Plan
Phase 1 Smoke Test

Run blueprint parser → verify JSON files contain expected principles, techniques, context modules
Run POST /api/generate with topic="The future of AI agents", context="social", platform="twitter" → verify content returned with quality scores
Load frontend → enter topic → click generate → verify content + scorecard display
Generate content across all 4 contexts → verify voice weights and technique selection differ per context

Phase 2 Smoke Test

Create a pipeline → verify it progresses through Research → Writing → Editing stages
Trigger a revision loop (set quality threshold high) → verify Writer receives Editor's revision notes and produces improved draft
Submit human feedback at each gate → verify feedback stored with correct pipeline/stage linkage
Verify pipeline kanban shows real-time stage transitions

Phase 3 Smoke Test

Generate content → run through Twitter Platform Agent → verify char limits, formatting rules applied
Generate 5+ pieces, provide feedback → run feedback synthesizer → verify it identifies patterns
Adjust voice weights via UI → generate content → verify output reflects new weights

Phase 4 Smoke Test

Schedule weekly content → verify pipelines auto-created
Verify approval queue populates with generated content
Set auto-intermediate → verify only final output shown for review