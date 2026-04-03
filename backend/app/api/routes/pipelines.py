"""Phase 2 pipeline API routes — CRUD + human-in-the-loop gates."""

from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.pipeline import ContentPipeline, FeedbackEntry
from app.models.schemas import (
    AdvanceRequest,
    ApproveRequest,
    FeedbackRequest,
    PipelineCreateRequest,
    PipelineListItem,
    PipelineListResponse,
    PipelineStatus,
    RejectRequest,
    ReviseRequest,
)
from app.services.pipeline_service import PipelineService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/pipelines", tags=["pipelines"])

_pipeline_service: PipelineService | None = None


def _get_pipeline_service() -> PipelineService:
    """Lazy singleton — avoids blocking disk I/O at import time."""
    global _pipeline_service
    if _pipeline_service is None:
        _pipeline_service = PipelineService()
    return _pipeline_service


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _get_pipeline_or_404(db: Session, pipeline_id: str) -> ContentPipeline:
    pipeline = db.get(ContentPipeline, pipeline_id)
    if pipeline is None:
        raise HTTPException(status_code=404, detail=f"Pipeline {pipeline_id} not found")
    return pipeline


def _pipeline_to_status(pipeline: ContentPipeline) -> PipelineStatus:
    return PipelineStatus.model_validate(pipeline)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@router.post("", response_model=PipelineStatus, status_code=202)
async def create_pipeline(
    body: PipelineCreateRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Create a new content pipeline and start it in the background.
    Returns immediately with status=queued; poll GET /pipelines/{id} to track progress.
    """
    pipeline, _ = _get_pipeline_service().orchestrator.create_pipeline(
        db=db,
        topic=body.topic,
        page_type=body.page_type,
        goal=body.goal,
        audience=body.audience,
        quality_threshold=body.quality_threshold,
        revision_limit=body.revision_limit,
    )

    # Kick off pipeline in background so we can return immediately
    background_tasks.add_task(_run_create_pipeline_bg, pipeline.id)

    db.refresh(pipeline)
    return _pipeline_to_status(pipeline)


async def _run_create_pipeline_bg(pipeline_id: str) -> None:
    """Background task: create flow runs only through research and parks at review."""
    from app.db.session import SessionLocal  # local import avoids circular
    db = SessionLocal()
    try:
        await _get_pipeline_service().run(db, pipeline_id)
    except Exception as exc:
        logger.error("Background pipeline %s error: %s", pipeline_id, exc)
    finally:
        db.close()


async def _advance_pipeline_bg(pipeline_id: str, notes: str | None = None) -> None:
    from app.db.session import SessionLocal

    db = SessionLocal()
    try:
        await _get_pipeline_service().advance(db, pipeline_id, notes=notes)
    except Exception as exc:
        logger.error("Background advance %s error: %s", pipeline_id, exc)
    finally:
        db.close()


async def _revise_pipeline_bg(
    pipeline_id: str,
    notes: str,
    target_dimensions: list[str] | None = None,
) -> None:
    from app.db.session import SessionLocal

    db = SessionLocal()
    try:
        await _get_pipeline_service().revise(
            db,
            pipeline_id,
            notes=notes,
            target_dimensions=target_dimensions,
        )
    except Exception as exc:
        logger.error("Background revise %s error: %s", pipeline_id, exc)
    finally:
        db.close()


@router.get("", response_model=PipelineListResponse)
def list_pipelines(
    status: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """List all pipelines, newest first. Optional ?status= filter for Kanban columns."""
    query = db.query(ContentPipeline).order_by(desc(ContentPipeline.created_at))
    if status:
        query = query.filter(ContentPipeline.status == status)
    pipelines = query.limit(limit).all()
    total = db.query(ContentPipeline).count()
    return PipelineListResponse(
        pipelines=[PipelineListItem.model_validate(p) for p in pipelines],
        total=total,
    )


@router.get("/{pipeline_id}", response_model=PipelineStatus)
def get_pipeline(pipeline_id: str, db: Session = Depends(get_db)):
    """Get full pipeline detail including all version outputs and feedback."""
    pipeline = _get_pipeline_or_404(db, pipeline_id)
    return _pipeline_to_status(pipeline)


@router.post("/{pipeline_id}/approve", response_model=PipelineStatus)
def approve_pipeline(
    pipeline_id: str,
    body: ApproveRequest,
    db: Session = Depends(get_db),
):
    """Human gate: approve the pipeline (status → approved)."""
    pipeline = _get_pipeline_or_404(db, pipeline_id)
    normalized_status = "final_review" if pipeline.status == "needs_review" else pipeline.status
    if normalized_status != "final_review":
        raise HTTPException(
            status_code=422,
            detail=f"Cannot approve pipeline in status '{pipeline.status}'",
        )
    if pipeline.error_message:
        raise HTTPException(status_code=422, detail="Cannot approve a failed pipeline")

    pipeline.status = "approved"
    _store_feedback(db, pipeline_id, stage="final_review", action="approve", notes=body.notes)
    db.commit()
    db.refresh(pipeline)
    return _pipeline_to_status(pipeline)


@router.post("/{pipeline_id}/reject", response_model=PipelineStatus)
def reject_pipeline(
    pipeline_id: str,
    body: RejectRequest,
    db: Session = Depends(get_db),
):
    """Human gate: reject the pipeline (status → rejected)."""
    pipeline = _get_pipeline_or_404(db, pipeline_id)
    normalized_status = "final_review" if pipeline.status == "needs_review" else pipeline.status
    if not normalized_status.endswith("_review"):
        raise HTTPException(
            status_code=422,
            detail=f"Cannot reject pipeline in status '{pipeline.status}'",
        )

    pipeline.status = "rejected"
    _store_feedback(db, pipeline_id, stage=normalized_status, action="reject", notes=body.notes)
    db.commit()
    db.refresh(pipeline)
    return _pipeline_to_status(pipeline)


@router.post("/{pipeline_id}/advance", response_model=PipelineStatus, status_code=202)
def advance_pipeline(
    pipeline_id: str,
    body: AdvanceRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    pipeline = _get_pipeline_or_404(db, pipeline_id)
    normalized_status = "final_review" if pipeline.status == "needs_review" else pipeline.status
    if not normalized_status.endswith("_review") or normalized_status == "final_review":
        raise HTTPException(
            status_code=422,
            detail=f"Cannot advance pipeline in status '{pipeline.status}'",
        )

    background_tasks.add_task(_advance_pipeline_bg, pipeline.id, body.notes)
    db.refresh(pipeline)
    return _pipeline_to_status(pipeline)


@router.post("/{pipeline_id}/revise", response_model=PipelineStatus, status_code=202)
def revise_pipeline(
    pipeline_id: str,
    body: ReviseRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    pipeline = _get_pipeline_or_404(db, pipeline_id)
    normalized_status = "final_review" if pipeline.status == "needs_review" else pipeline.status
    if not normalized_status.endswith("_review"):
        raise HTTPException(
            status_code=422,
            detail=f"Cannot revise pipeline in status '{pipeline.status}'",
        )

    background_tasks.add_task(_revise_pipeline_bg, pipeline.id, body.notes, body.target_dimensions)
    db.refresh(pipeline)
    return _pipeline_to_status(pipeline)


@router.post("/{pipeline_id}/feedback", response_model=PipelineStatus)
def add_feedback(
    pipeline_id: str,
    body: FeedbackRequest,
    db: Session = Depends(get_db),
):
    """Store human feedback for any pipeline stage (mid-pipeline or final)."""
    pipeline = _get_pipeline_or_404(db, pipeline_id)
    _store_feedback(
        db,
        pipeline_id=pipeline_id,
        stage=body.stage,
        action=body.action,
        diff=body.diff,
        notes=body.notes,
    )
    db.commit()
    db.refresh(pipeline)
    return _pipeline_to_status(pipeline)


# ---------------------------------------------------------------------------
# Internal
# ---------------------------------------------------------------------------

def _store_feedback(
    db: Session,
    pipeline_id: str,
    stage: str,
    action: str,
    diff: Optional[str] = None,
    notes: Optional[str] = None,
) -> FeedbackEntry:
    entry = FeedbackEntry(
        pipeline_id=pipeline_id,
        stage=stage,
        action=action,
        diff=diff,
        notes=notes,
    )
    db.add(entry)
    return entry
