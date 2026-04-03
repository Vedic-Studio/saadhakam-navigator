from __future__ import annotations

import json
import sys
import asyncio
from pathlib import Path

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.agents.editor import EditorAgent
from app.agents.orchestrator import OrchestratorAgent
from app.agents.research import ResearchAgent
from app.agents.writer import WriterAgent
from app.db.base import Base
from app.knowledge.parser import KnowledgeParser
from app.knowledge.store import KnowledgeStore
from app.models.pipeline import ContentOutput, ContentPipeline
from app.models.schemas import GenerateRequest
from app.services.pipeline_service import PipelineService


@pytest.fixture
def parsed_dir(tmp_path: Path) -> Path:
    return tmp_path / "parsed"


@pytest.fixture
def knowledge_store(parsed_dir: Path) -> KnowledgeStore:
    parser = KnowledgeParser(output_dir=parsed_dir)
    parser.parse_all()
    return KnowledgeStore(parsed_dir=parsed_dir)


@pytest.fixture
def db_session() -> Session:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    TestingSessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()


def test_parser_builds_clean_strategy_topics_and_agent_knowledge(knowledge_store: KnowledgeStore):
    quick_wins = knowledge_store.get_quick_win_topics("Sacred Texts & Teachings")
    topics = [item["topic"] for item in quick_wins]

    assert "Tat Tvam Asi: Meaning and Significance" in topics
    assert all(topic and not topic.startswith("|") for topic in topics)

    article_spec = knowledge_store.get_article_spec()
    assert article_spec is not None
    assert article_spec.hub.min_word_count == 2500
    assert "journey  (as spiritual metaphor: \"your spiritual journey\", \"this journey\", \"one's journey\")" in article_spec.forbidden_phrases


def test_orchestrator_uses_real_context_packs(knowledge_store: KnowledgeStore):
    orchestrator = OrchestratorAgent(knowledge_store=knowledge_store)

    assert orchestrator.configure(topic="Vedanta", page_type="topic_hub").context_module == "long_form"
    assert orchestrator.configure(topic="Japa for focus", page_type="combinatorial").context_module == "pseo"
    assert orchestrator.configure(topic="Gita 2.47", page_type="sacred_text_shloka").context_module == "sacred_text"


def test_editor_respects_configured_threshold(knowledge_store: KnowledgeStore):
    editor = EditorAgent(knowledge_store=knowledge_store)
    request = GenerateRequest(topic="What is Vedanta", page_type="topic_hub", audience="seekers")
    content = "# Title\n\nVedanta is a tradition.\n\n## One\nText.\n\n## Two\nText.\n\n## Three\nText.\n\n### What is Vedanta?\nAnswer?\n\n[One](/a) [Two](/b) [Three](/c)"

    scorecard = editor.score(content, request, threshold=6.0)
    stricter_scorecard = editor.score(content, request, threshold=8.5)

    assert scorecard.total_score < 8.5
    assert scorecard.passed is True
    assert stricter_scorecard.passed is False


def test_editor_fail_closes_on_deterministic_scan_hits(knowledge_store: KnowledgeStore):
    editor = EditorAgent(knowledge_store=knowledge_store)
    request = GenerateRequest(topic="What is Vedanta", page_type="topic_hub", audience="seekers")
    content = "# Title\n\nHere is the thing: tradition demands obedience — it's not inquiry, it's surrender."

    scorecard = editor.score(content, request, threshold=1.0)

    assert scorecard.passed is False
    assert any("Deterministic scan THROAT_CLEARING" in violation for violation in scorecard.violations)


def test_writer_prompt_includes_sadhaka_contextual_requirements(knowledge_store: KnowledgeStore):
    researcher = ResearchAgent(knowledge_store=knowledge_store)
    writer = WriterAgent(knowledge_store=knowledge_store)
    config = OrchestratorAgent(knowledge_store=knowledge_store).configure(
        topic="What is Vedanta",
        page_type="topic_hub",
    )
    brief = researcher.build_brief("What is Vedanta", "topic_hub", config)
    request = GenerateRequest(topic="What is Vedanta", page_type="topic_hub", audience="seekers")

    prompt = writer._build_prompt(request, knowledge_handoff=brief.to_writer_handoff())

    assert "Writer Handoff" in prompt
    assert "Must Include" in prompt
    assert "Must Avoid" in prompt
    assert "Sources & Commentaries section" in prompt


def test_research_brief_builds_compact_retry_packet(knowledge_store: KnowledgeStore):
    researcher = ResearchAgent(knowledge_store=knowledge_store)
    config = OrchestratorAgent(knowledge_store=knowledge_store).configure(
        topic="What is Vedanta",
        page_type="topic_hub",
    )
    brief = researcher.build_brief("What is Vedanta", "topic_hub", config)

    draft = (
        "# What is Vedanta\n\n"
        "## Overview\nText\n\n"
        "## Practice Guidance\nText\n\n"
        "### What is Vedanta?\nAnswer\n\n"
        "[Vedanta](/what-is-vedanta)"
    )
    packet = brief.build_retry_packet(draft=draft, revision_notes="Add more source signals.")

    assert "Retry Packet" in packet
    assert "Immutable Constraints" in packet
    assert "Retry Constraints" in packet
    assert "Keep heading: # What is Vedanta" in packet
    assert "Add more source signals." in packet


def test_research_brief_builds_editor_structural_handoff(knowledge_store: KnowledgeStore):
    researcher = ResearchAgent(knowledge_store=knowledge_store)
    config = OrchestratorAgent(knowledge_store=knowledge_store).configure(
        topic="What is Vedanta",
        page_type="topic_hub",
    )
    brief = researcher.build_brief("What is Vedanta", "topic_hub", config)

    handoff = brief.to_editor_structural_handoff()

    assert "Editor Structural Handoff" in handoff
    assert any(
        marker in handoff
        for marker in [
            "Required section: Topic overview (clear, encyclopedic definition + cultural context)",
            "Required section: Recommended practices (with internal links)",
            "Required section: Recommended traditions/lineages",
        ]
    )
    assert "Minimum FAQ items:" in handoff
    assert "Minimum internal links:" in handoff
    assert "Source signal:" in handoff


def test_base_agent_caches_static_prompt_layers(monkeypatch: pytest.MonkeyPatch):
    from app.agents import base as base_module

    base_module.BaseAgent._load_agent_file.cache_clear()
    reads: list[str] = []

    def fake_safe_read(path: Path) -> str:
        reads.append(path.name)
        return f"content:{path.name}"

    monkeypatch.setattr(base_module, "_safe_read", fake_safe_read)

    agent = WriterAgent()

    assert agent.load_soul() == "content:SOUL.md"
    assert agent.load_soul() == "content:SOUL.md"
    assert agent.load_memory() == "content:MEMORY.md"
    assert agent.load_memory() == "content:MEMORY.md"
    assert reads == ["SOUL.md", "MEMORY.md"]


def test_pipeline_service_uses_threshold_gate_and_persists_outputs(db_session: Session, knowledge_store: KnowledgeStore):
    pipeline = ContentPipeline(
        topic="What is Vedanta",
        page_type="topic_hub",
        audience="spiritual seekers",
        context_module="long_form",
        status="queued",
        quality_threshold=6.0,
        revision_limit=1,
    )
    db_session.add(pipeline)
    db_session.commit()
    db_session.refresh(pipeline)

    service = PipelineService()
    service.orchestrator = OrchestratorAgent(knowledge_store=knowledge_store)
    service.researcher = ResearchAgent(knowledge_store=knowledge_store)

    class StubWriter:
        calls = []

        async def generate(self, request, research_brief=None, knowledge_handoff=None, revision_packet=None, revision_notes=None):
            self.calls.append(
                {
                    "knowledge_handoff": knowledge_handoff,
                    "revision_packet": revision_packet,
                    "revision_notes": revision_notes,
                }
            )
            return type("WriterResult", (), {"content": (
                "# What is Vedanta\n\n"
                "Vedanta is a darshana grounded in the Upanishads and Bhagavad Gita 2.47. It studies the nature of the self, Brahman, bondage, liberation, and disciplined inquiry through scripture, commentary, and lived practice. For many seekers it offers both a philosophical map and a practical method of reflection.\n\n"
                "## Topic overview (clear, encyclopedic definition + cultural context)\nVedanta refers to the culmination of Vedic inquiry within Hindu philosophical traditions. In common usage it names both the Upanishadic source-text stream and the schools that interpret it. The topic matters culturally because Vedanta shapes how many readers approach dharma, moksha, meditation, renunciation, devotion, and the relation between knowledge and action. A reliable overview should explain the historical role of shruti, the importance of teacher-student transmission, and the place of interpretation across different sampradayas. It should also note that modern summaries often flatten important distinctions, so readers need patient definitions and grounded examples before jumping into abstraction.\n\n"
                "## Recommended practices (with internal links)\nPractice begins with sravana, manana, and nididhyasana, supported by [Japa](/how-to-start-japa) and [Paths](/topics/spiritual-paths). A beginner can first read a short primary passage, then listen to a traditional explanation, then reflect in writing on what the teaching denies and affirms. Repetition matters: a short daily discipline of reading, contemplation, and ethical alignment gives the doctrine practical force. Many students also benefit from chanting, memorization, and question-based study because these slow down the tendency to treat Vedanta as a purely intellectual hobby. When confusion arises, practice should return to definitions, examples, and a modest routine rather than speculation.\n\n"
                "## Recommended traditions/lineages\nAdi Shankaracharya comments on the Upanishads and Brahma Sutra from the Advaita Vedanta lineage. Ramanuja and Madhva offer other school positions that clarify how major lineages interpret the relation between the individual self and ultimate reality. Naming these traditions matters because Vedanta is not one undifferentiated claim-system. A responsible guide should show how schools agree on scriptural importance while differing on interpretation, method, and emphasis. Readers who see these distinctions early are less likely to confuse a later popular summary with the actual shape of the tradition.\n\n"
                "## Curated reading/guides list\nStart with the Upanishads, Bhagavad Gita, and a beginner guide to Vedanta study. A sensible sequence is an overview text, selected verses with commentary, and then a more detailed study of one lineage. Readers can pair a survey with slow reading of a short Upanishadic dialogue, then move to a commentary that explains vocabulary and reasoning in context. It is also useful to keep a glossary of recurring terms such as atman, Brahman, avidya, viveka, and moksha, because conceptual precision reduces confusion later. A curated list should privilege clarity, fidelity, and a sequence that matches the reader's maturity rather than novelty.\n\n"
                "## Call-to-action (Faith Finder or related pathway)\nUse the Faith Finder to identify the most relevant starting path for practice. A clear call-to-action should not promise instant certainty; it should help the reader choose between study, devotion, meditation, and introductory guidance based on temperament and readiness. The purpose is orientation, not pressure. After reading the page, the seeker should know the next sensible step, the next text to study, and the next practice to stabilize attention. That makes the page useful rather than merely impressive.\n\n"
                "## AEO Summary\nVedanta is a Hindu philosophical tradition rooted in the Upanishads that guides seekers through disciplined inquiry, study, and contemplative practice. It asks what the self is, what ultimate reality is, why suffering persists, and how liberation is understood in different lineages. A good beginner approach combines source study, commentary, reflection, and practical discipline rather than abstraction alone.\n\n"
                "### What is Vedanta?\nIt is a school of inquiry.\n\n"
                "### How do beginners start?\nThey start with foundational texts.\n\n"
                "### Which sources matter most?\nThe Upanishads and Gita matter most.\n\n"
                "### Is it practical?\nYes, when tied to disciplined study.\n\n"
                "### Does it reject devotion?\nNo, different sampradayas integrate devotion differently.\n\n"
                "## Sources & Commentaries\nBhagavad Gita 2.47, Brihadaranyaka Upanishad 1.4.10, and Shankaracharya's commentary clarify the source text, commentary layer, and editorial implication. This section explicitly distinguishes source text vs commentary vs editorial implication so the reader can tell what comes from scripture, what comes from a named commentator, and what comes from the page's simplifying explanation. That separation protects accuracy while still making the material accessible to a new reader.\n\n"
                "## Why this framing helps beginners\nA beginner often encounters Vedanta through short quotes, motivational summaries, or flattened comparisons with modern psychology. That entry point may spark interest, but it can also produce confusion about what belongs to scripture, what belongs to later commentary, and what belongs to modern interpretation. A careful frame slows the reader down. It explains the basic vocabulary again in plain language, shows how teachers use examples to unfold meaning, and reminds the reader that philosophical clarity grows through repeated listening and reflection. This matters because the tradition often asks the student to examine assumptions about identity, suffering, action, and fulfillment with unusual patience. Without that framing, the page may sound impressive while leaving the reader unable to practice or study responsibly.\n\n"
                "## Common beginner mistakes\nOne common mistake is treating Vedanta as a set of slogans rather than a disciplined method of inquiry. Another is assuming that a single translation or a single viral quote can substitute for patient study with context. Some readers collapse all Hindu schools into one view, while others assume devotion and inquiry are opposites when many lineages integrate them. Beginners may also become overly abstract and neglect ethical preparation, steadiness of attention, and humility before the text. A strong introduction warns against these habits directly. It tells the reader to compare claims carefully, return to the source, and use commentary to understand why a verse is being interpreted in a particular way. Such reminders make the material safer, clearer, and more useful over time.\n\n"
                "## How to continue study responsibly\nTo continue responsibly, the reader can pick one short passage, one trustworthy commentary, and one recurring daily practice for a few weeks. The point is not speed but assimilation. Reading aloud, noting unfamiliar terms, summarizing a teaching in one's own words, and checking that summary against commentary are all practical moves. It also helps to discuss one question at a time: what is being defined, what confusion is being removed, and what change in understanding is being invited? Over time, that rhythm develops both respect for the tradition and independence of thought. It trains the reader to distinguish inspiration from understanding, and understanding from realization. In that sense, disciplined continuation is itself part of the teaching, not merely preparation for it.\n\n"
                "[Vedanta](/what-is-vedanta) [Japa](/how-to-start-japa) [Paths](/topics/spiritual-paths) [Advaita](/advaita-vedanta-explained)"
            )})()

    service.writer = StubWriter()

    updated = asyncio.run(service.run(db_session, pipeline.id))
    outputs = db_session.query(ContentOutput).filter(ContentOutput.pipeline_id == pipeline.id).all()
    assert updated.status == "research_review"

    updated = asyncio.run(service.advance(db_session, pipeline.id))
    assert updated.status == "draft_review"

    updated = asyncio.run(service.advance(db_session, pipeline.id))
    outputs = db_session.query(ContentOutput).filter(ContentOutput.pipeline_id == pipeline.id).all()
    latest_editor = max((o for o in outputs if o.stage == "editor_score"), key=lambda item: item.version)
    scorecard = json.loads(latest_editor.scorecard_json or "{}")

    assert updated.status == "edit_review"
    assert updated.final_score is not None
    assert scorecard["passed"] is True
    assert any(output.stage == "research_brief" for output in outputs)
    assert any(output.stage == "editor_structural_handoff" for output in outputs)
    assert any(output.stage == "writer_draft" for output in outputs)
    assert any(output.stage == "editor_score" for output in outputs)
    assert service.writer.calls[0]["knowledge_handoff"] is not None
    assert "Writer Handoff" in service.writer.calls[0]["knowledge_handoff"]


def test_editor_structural_handoff_fail_closes_missing_required_structure(knowledge_store: KnowledgeStore):
    researcher = ResearchAgent(knowledge_store=knowledge_store)
    editor = EditorAgent(knowledge_store=knowledge_store)
    config = OrchestratorAgent(knowledge_store=knowledge_store).configure(
        topic="What is Vedanta",
        page_type="topic_hub",
    )
    brief = researcher.build_brief("What is Vedanta", "topic_hub", config)
    request = GenerateRequest(topic="What is Vedanta", page_type="topic_hub", audience="seekers")

    content = (
        "# What is Vedanta\n\n"
        "Vedanta is a tradition.\n\n"
        "## Overview\nShort text.\n\n"
        "## Practice Guidance\nShort text.\n\n"
        "[One](/a)"
    )

    scorecard = editor.score(
        content,
        request,
        threshold=1.0,
        structural_handoff=brief.to_editor_structural_handoff(),
    )

    assert scorecard.passed is False
    assert any("Structural handoff" in violation for violation in scorecard.violations)
    assert any("FAQ_COUNT" in violation or "REQUIRED_SECTION" in violation for violation in scorecard.violations)


def test_pipeline_service_uses_retry_handoff_on_redraft(db_session: Session, knowledge_store: KnowledgeStore):
    pipeline = ContentPipeline(
        topic="What is Vedanta",
        page_type="topic_hub",
        audience="spiritual seekers",
        context_module="long_form",
        status="queued",
        quality_threshold=9.5,
        revision_limit=1,
    )
    db_session.add(pipeline)
    db_session.commit()
    db_session.refresh(pipeline)

    service = PipelineService()
    service.orchestrator = OrchestratorAgent(knowledge_store=knowledge_store)
    service.researcher = ResearchAgent(knowledge_store=knowledge_store)

    class StubWriter:
        def __init__(self):
            self.calls = []

        async def generate(self, request, research_brief=None, knowledge_handoff=None, revision_packet=None, revision_notes=None):
            self.calls.append(
                {
                    "knowledge_handoff": knowledge_handoff,
                    "revision_packet": revision_packet,
                    "revision_notes": revision_notes,
                }
            )
            return type("WriterResult", (), {"content": (
                "# What is Vedanta\n\n"
                "Vedanta is a tradition.\n\n"
                "## Overview\nShort text.\n\n"
                "## Practice Guidance\nShort text.\n\n"
                "## Frequently Asked Questions\nShort text.\n\n"
                "[One](/a) [Two](/b) [Three](/c)"
            )})()

    service.writer = StubWriter()

    updated = asyncio.run(service.run(db_session, pipeline.id))

    assert updated.status == "research_review"

    updated = asyncio.run(service.advance(db_session, pipeline.id))
    assert updated.status == "draft_review"

    updated = asyncio.run(service.revise(db_session, pipeline.id, notes="Add more structure"))

    assert updated.status == "draft_review"
    assert len(service.writer.calls) == 2
    assert "Writer Handoff" in service.writer.calls[0]["knowledge_handoff"]
    assert "Retry Constraints" in service.writer.calls[1]["knowledge_handoff"]
    assert service.writer.calls[1]["revision_packet"] is not None
    assert "Retry Packet" in service.writer.calls[1]["revision_packet"]
    assert "Immutable Constraints" in service.writer.calls[1]["revision_packet"]
    assert service.writer.calls[1]["revision_notes"] == "Add more structure"


def test_pipeline_service_materializes_handoffs_once(db_session: Session, knowledge_store: KnowledgeStore, monkeypatch: pytest.MonkeyPatch):
    pipeline = ContentPipeline(
        topic="What is Vedanta",
        page_type="topic_hub",
        audience="spiritual seekers",
        context_module="long_form",
        status="queued",
        quality_threshold=9.5,
        revision_limit=1,
    )
    db_session.add(pipeline)
    db_session.commit()
    db_session.refresh(pipeline)

    service = PipelineService()
    service.orchestrator = OrchestratorAgent(knowledge_store=knowledge_store)
    service.researcher = ResearchAgent(knowledge_store=knowledge_store)

    original_build_brief = service.researcher.build_brief
    call_counts = {"writer": 0, "retry": 0, "editor": 0}

    def instrumented_build_brief(*args, **kwargs):
        brief = original_build_brief(*args, **kwargs)
        original_writer_handoff = brief.to_writer_handoff
        original_retry_handoff = brief.to_retry_handoff
        original_editor_handoff = brief.to_editor_structural_handoff

        def counted_writer_handoff(goal=None):
            call_counts["writer"] += 1
            return original_writer_handoff(goal=goal)

        def counted_retry_handoff(goal=None):
            call_counts["retry"] += 1
            return original_retry_handoff(goal=goal)

        def counted_editor_handoff(goal=None):
            call_counts["editor"] += 1
            return original_editor_handoff(goal=goal)

        monkeypatch.setattr(brief, "to_writer_handoff", counted_writer_handoff)
        monkeypatch.setattr(brief, "to_retry_handoff", counted_retry_handoff)
        monkeypatch.setattr(brief, "to_editor_structural_handoff", counted_editor_handoff)
        return brief

    service.researcher.build_brief = instrumented_build_brief

    class StubWriter:
        def __init__(self):
            self.calls = []

        async def generate(self, request, research_brief=None, knowledge_handoff=None, revision_packet=None, revision_notes=None):
            self.calls.append({
                "knowledge_handoff": knowledge_handoff,
                "revision_packet": revision_packet,
                "revision_notes": revision_notes,
            })
            return type("WriterResult", (), {"content": (
                "# What is Vedanta\n\n"
                "Vedanta is a tradition.\n\n"
                "## Overview\nShort text.\n\n"
                "## Practice Guidance\nShort text.\n\n"
                "## Frequently Asked Questions\nShort text.\n\n"
                "[One](/a) [Two](/b) [Three](/c)"
            )})()

    service.writer = StubWriter()

    updated = asyncio.run(service.run(db_session, pipeline.id))

    assert updated.status == "research_review"
    assert call_counts == {"writer": 1, "retry": 0, "editor": 1}


def test_pipeline_service_polish_stage_parks_at_final_review(db_session: Session, knowledge_store: KnowledgeStore):
    pipeline = ContentPipeline(
        topic="What is Vedanta",
        page_type="topic_hub",
        audience="spiritual seekers",
        context_module="long_form",
        status="queued",
        quality_threshold=6.0,
        revision_limit=1,
    )
    db_session.add(pipeline)
    db_session.commit()
    db_session.refresh(pipeline)

    service = PipelineService()
    service.orchestrator = OrchestratorAgent(knowledge_store=knowledge_store)
    service.researcher = ResearchAgent(knowledge_store=knowledge_store)

    class StubWriter:
        def __init__(self):
            self.calls = []

        async def generate(self, request, research_brief=None, knowledge_handoff=None, revision_packet=None, revision_notes=None):
            self.calls.append({
                "knowledge_handoff": knowledge_handoff,
                "revision_packet": revision_packet,
                "revision_notes": revision_notes,
            })
            return type("WriterResult", (), {"content": "# What is Vedanta\n\n## Topic overview (clear, encyclopedic definition + cultural context)\nDetailed content\n\n## Recommended practices (with internal links)\nPractice [Japa](/how-to-start-japa) [Paths](/topics/spiritual-paths) [Advaita](/advaita-vedanta-explained)\n\n## Recommended traditions/lineages\nLineage content\n\n## Curated reading/guides list\nGuide content\n\n## Call-to-action (Faith Finder or related pathway)\nCTA\n\n## AEO Summary\nSummary text\n\n### What is Vedanta?\nAnswer\n\n### How do beginners start?\nAnswer\n\n### Which sources matter most?\nAnswer\n\n### Is it practical?\nAnswer\n\n### Does it reject devotion?\nAnswer\n\n## Sources & Commentaries\nSources"})()

    service.writer = StubWriter()

    asyncio.run(service.run(db_session, pipeline.id))
    asyncio.run(service.advance(db_session, pipeline.id))
    asyncio.run(service.advance(db_session, pipeline.id))
    updated = asyncio.run(service.advance(db_session, pipeline.id, notes="Polish voice only"))

    outputs = db_session.query(ContentOutput).filter(ContentOutput.pipeline_id == pipeline.id).all()

    assert updated.status == "final_review"
    assert any(output.stage == "polished_draft" for output in outputs)
    assert any(output.stage == "polish_score" for output in outputs)