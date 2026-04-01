"""SQLAlchemy ORM models for the Phase 2 multi-agent pipeline."""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class ContentPipeline(Base):
    """Root record for one full content-generation pipeline run."""

    __tablename__ = "content_pipelines"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)

    # Request parameters
    topic: Mapped[str] = mapped_column(String(500), nullable=False)
    page_type: Mapped[str] = mapped_column(String(50), nullable=False)
    goal: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    audience: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    context_module: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

    # Pipeline state
    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="queued",
        # queued | researching | writing | editing | needs_review | approved | rejected | failed
    )
    revision_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    quality_threshold: Mapped[float] = mapped_column(Float, nullable=False, default=7.0)
    revision_limit: Mapped[int] = mapped_column(Integer, nullable=False, default=3)

    # Final quality score (after revision loop completes)
    final_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    # Error info (if pipeline errored out)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    outputs: Mapped[list[ContentOutput]] = relationship(
        "ContentOutput", back_populates="pipeline", order_by="ContentOutput.version"
    )
    feedback: Mapped[list[FeedbackEntry]] = relationship(
        "FeedbackEntry", back_populates="pipeline", order_by="FeedbackEntry.created_at"
    )


class ContentOutput(Base):
    """A single draft/output version within a pipeline (writer draft or editor score)."""

    __tablename__ = "content_outputs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    pipeline_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("content_pipelines.id", ondelete="CASCADE"), nullable=False
    )
    version: Mapped[int] = mapped_column(Integer, nullable=False, default=1)

    # Which stage produced this output
    stage: Mapped[str] = mapped_column(
        String(30), nullable=False
        # writer_draft | editor_score | research_brief | final
    )
    agent: Mapped[str] = mapped_column(String(30), nullable=False)  # writer | editor | research

    # Main content
    content: Mapped[str] = mapped_column(Text, nullable=False, default="")

    # Optional structured payloads stored as JSON strings
    scorecard_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    research_brief_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Editor → Writer revision notes (populated when score < threshold)
    revision_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )

    pipeline: Mapped[ContentPipeline] = relationship("ContentPipeline", back_populates="outputs")


class FeedbackEntry(Base):
    """Human feedback on any pipeline stage (approve / reject / inline edit)."""

    __tablename__ = "feedback_entries"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    pipeline_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("content_pipelines.id", ondelete="CASCADE"), nullable=False
    )

    stage: Mapped[str] = mapped_column(String(30), nullable=False)
    action: Mapped[str] = mapped_column(String(20), nullable=False)  # approve | reject | edit
    diff: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # inline edit diff
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )

    pipeline: Mapped[ContentPipeline] = relationship("ContentPipeline", back_populates="feedback")


class AgentMemory(Base):
    """DB mirror of file-based agent memory — used for FTS queries and audit."""

    __tablename__ = "agent_memories"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    agent_name: Mapped[str] = mapped_column(String(30), nullable=False)
    memory_type: Mapped[str] = mapped_column(String(20), nullable=False)  # soul | memory | log
    content: Mapped[str] = mapped_column(Text, nullable=False, default="")
    log_date: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)  # YYYY-MM-DD for logs

    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )
