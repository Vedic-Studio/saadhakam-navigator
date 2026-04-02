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
    packet = brief.build_revision_packet(draft, "Add more source signals.")

    assert "Revision Packet" in packet
    assert "Keep heading: # What is Vedanta" in packet
    assert "Add more source signals." in packet


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
                "Vedanta is a darshana grounded in the Upanishads and Bhagavad Gita 2.47.\n\n"
                "## What the term means\nVedanta refers to the culmination of Vedic inquiry.\n\n"
                "## How the tradition reads it\nAdi Shankaracharya comments on the Upanishads and Brahma Sutra.\n\n"
                "## Why it matters in practice\nPractice begins with sravana, manana, and nididhyasana.\n\n"
                "### What is Vedanta?\nIt is a school of inquiry.\n\n"
                "### How do beginners start?\nThey start with foundational texts.\n\n"
                "### Which sources matter most?\nThe Upanishads and Gita matter most.\n\n"
                "### Is it practical?\nYes, when tied to disciplined study.\n\n"
                "### Does it reject devotion?\nNo, different sampradayas integrate devotion differently.\n\n"
                "[Vedanta](/what-is-vedanta) [Japa](/how-to-start-japa) [Paths](/topics/spiritual-paths)"
            )})()

    service.writer = StubWriter()

    updated = asyncio.run(service.run(db_session, pipeline.id))
    outputs = db_session.query(ContentOutput).filter(ContentOutput.pipeline_id == pipeline.id).all()
    latest_editor = max((o for o in outputs if o.stage == "editor_score"), key=lambda item: item.version)
    scorecard = json.loads(latest_editor.scorecard_json or "{}")

    assert updated.status == "needs_review"
    assert updated.final_score is not None
    assert scorecard["passed"] is True
    assert any(output.stage == "research_brief" for output in outputs)
    assert any(output.stage == "writer_draft" for output in outputs)
    assert any(output.stage == "editor_score" for output in outputs)
    assert service.writer.calls[0]["knowledge_handoff"] is not None
    assert "Writer Handoff" in service.writer.calls[0]["knowledge_handoff"]


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

    assert updated.status == "needs_review"
    assert len(service.writer.calls) == 2
    assert "Writer Handoff" in service.writer.calls[0]["knowledge_handoff"]
    assert "Retry Constraints" in service.writer.calls[1]["knowledge_handoff"]
    assert service.writer.calls[1]["revision_packet"] is not None
    assert "Revision Packet" in service.writer.calls[1]["revision_packet"]