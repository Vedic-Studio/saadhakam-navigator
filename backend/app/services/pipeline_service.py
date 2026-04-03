"""Pipeline Service — orchestrates staged multi-agent execution with human review gates."""

from __future__ import annotations

import json
import logging
from typing import Optional

from sqlalchemy.orm import Session

from app.agents.editor import EditorAgent
from app.agents.orchestrator import OrchestratorAgent, PipelineConfig
from app.agents.research import ResearchAgent
from app.agents.writer import WriterAgent
from app.models.pipeline import ContentOutput, ContentPipeline, FeedbackEntry
from app.models.schemas import GenerateRequest

logger = logging.getLogger(__name__)

STATE_MACHINE = {
    "research_review": {"advance": "writing", "revise": "researching"},
    "draft_review": {"advance": "editing", "revise": "writing"},
    "edit_review": {"advance": "polishing", "revise": "writing"},
    "final_review": {"approve": "approved", "revise": "polishing"},
}

STAGE_TO_GATE = {
    "researching": "research_review",
    "writing": "draft_review",
    "editing": "edit_review",
    "polishing": "final_review",
}

GATE_TO_OUTPUT_STAGE = {
    "research_review": "research_brief",
    "draft_review": "writer_draft",
    "edit_review": "editor_score",
    "final_review": "polished_draft",
}


class PipelineService:
    def __init__(self):
        self.orchestrator = OrchestratorAgent()
        self.researcher = ResearchAgent()
        self.writer = WriterAgent()
        self.editor = EditorAgent()

    async def run(self, db: Session, pipeline_id: str) -> ContentPipeline:
        return await self.run_stage(db, pipeline_id, "researching")

    async def run_stage(self, db: Session, pipeline_id: str, stage: str) -> ContentPipeline:
        pipeline = db.get(ContentPipeline, pipeline_id)
        if pipeline is None:
            raise ValueError(f"Pipeline {pipeline_id} not found")
        return await self._run_stage(db, pipeline, stage=stage)

    async def advance(self, db: Session, pipeline_id: str, notes: Optional[str] = None) -> ContentPipeline:
        pipeline = self._get_pipeline_or_raise(db, pipeline_id)
        gate_status = self._normalize_gate_status(pipeline.status)
        if gate_status not in STATE_MACHINE or "advance" not in STATE_MACHINE[gate_status]:
            raise ValueError(f"Cannot advance pipeline in status '{pipeline.status}'")

        if notes:
            self._store_feedback(db, pipeline.id, stage=gate_status, action="advance", notes=notes)

        next_stage = STATE_MACHINE[gate_status]["advance"]
        return await self._run_stage(db, pipeline, stage=next_stage, trigger_gate=gate_status)

    async def revise(
        self,
        db: Session,
        pipeline_id: str,
        notes: str,
        target_dimensions: Optional[list[str]] = None,
    ) -> ContentPipeline:
        pipeline = self._get_pipeline_or_raise(db, pipeline_id)
        gate_status = self._normalize_gate_status(pipeline.status)
        if gate_status not in STATE_MACHINE or "revise" not in STATE_MACHINE[gate_status]:
            raise ValueError(f"Cannot revise pipeline in status '{pipeline.status}'")
        if not notes.strip():
            raise ValueError("Revision notes are required")

        diff_payload = json.dumps({"target_dimensions": target_dimensions or []})
        self._store_feedback(
            db,
            pipeline.id,
            stage=gate_status,
            action="revise",
            notes=notes.strip(),
            diff=diff_payload,
        )

        next_stage = STATE_MACHINE[gate_status]["revise"]
        return await self._run_stage(
            db,
            pipeline,
            stage=next_stage,
            trigger_gate=gate_status,
            target_dimensions=target_dimensions,
        )

    async def create_and_start(
        self,
        db: Session,
        topic: str,
        page_type: str,
        goal: Optional[str] = None,
        audience: Optional[str] = None,
        quality_threshold: Optional[float] = None,
        revision_limit: Optional[int] = None,
    ) -> ContentPipeline:
        pipeline, _ = self.orchestrator.create_pipeline(
            db=db,
            topic=topic,
            page_type=page_type,
            goal=goal,
            audience=audience,
            quality_threshold=quality_threshold,
            revision_limit=revision_limit,
        )
        return await self._run_stage(db, pipeline, stage="researching")

    async def _run_stage(
        self,
        db: Session,
        pipeline: ContentPipeline,
        *,
        stage: str,
        trigger_gate: Optional[str] = None,
        target_dimensions: Optional[list[str]] = None,
    ) -> ContentPipeline:
        try:
            config = self._rebuild_config(pipeline)
            request = self._build_request(pipeline)

            if stage == "researching":
                await self._run_research(db, pipeline, config, request)
            elif stage == "writing":
                await self._run_write(db, pipeline, config, request, trigger_gate=trigger_gate)
            elif stage == "editing":
                await self._run_edit(db, pipeline, config, request)
            elif stage == "polishing":
                await self._run_polish(
                    db,
                    pipeline,
                    config,
                    request,
                    trigger_gate=trigger_gate,
                    target_dimensions=target_dimensions,
                )
            else:
                raise ValueError(f"Unknown pipeline stage '{stage}'")

            pipeline.error_message = None
            db.commit()
            db.refresh(pipeline)
            return pipeline
        except Exception as exc:
            logger.exception("Pipeline %s stage %s failed: %s", pipeline.id, stage, exc)
            pipeline.status = "failed"
            pipeline.error_message = str(exc)
            db.commit()
            raise

    async def _run_research(
        self,
        db: Session,
        pipeline: ContentPipeline,
        config: PipelineConfig,
        request: GenerateRequest,
    ) -> None:
        pipeline.status = "researching"
        db.commit()

        brief = self.researcher.build_brief(topic=pipeline.topic, page_type=pipeline.page_type, config=config)
        brief_json = brief.to_json()

        _save_output(
            db,
            pipeline_id=pipeline.id,
            version=_next_version(db, pipeline.id),
            stage="research_brief",
            agent="research",
            content=brief.to_writer_handoff(goal=request.goal),
            research_brief_json=brief_json,
        )
        _save_output(
            db,
            pipeline_id=pipeline.id,
            version=_next_version(db, pipeline.id),
            stage="editor_structural_handoff",
            agent="research",
            content=brief.to_editor_structural_handoff(goal=request.goal),
            research_brief_json=brief_json,
        )

        pipeline.status = STAGE_TO_GATE["researching"]
        pipeline.revision_count = 0
        db.commit()

    async def _run_write(
        self,
        db: Session,
        pipeline: ContentPipeline,
        config: PipelineConfig,
        request: GenerateRequest,
        *,
        trigger_gate: Optional[str] = None,
    ) -> None:
        pipeline.status = "writing"
        db.commit()

        research_brief = self._get_latest_output(db, pipeline.id, "research_brief")
        if research_brief is None:
            raise ValueError("Research brief not found for writing stage")

        human_feedback = self._get_pending_feedback(db, pipeline.id, trigger_gate) if trigger_gate else None
        latest_writer = self._get_latest_output(db, pipeline.id, "writer_draft")
        latest_editor = self._get_latest_output(db, pipeline.id, "editor_score")

        knowledge_handoff = research_brief.content
        revision_packet = None
        revision_notes = None

        if trigger_gate in {"draft_review", "edit_review"}:
            brief = self.researcher.build_brief(topic=pipeline.topic, page_type=pipeline.page_type, config=config)
            knowledge_handoff = brief.to_retry_handoff(goal=request.goal)
            combined_notes = self._combine_notes(
                human_feedback.notes if human_feedback else None,
                latest_editor.revision_notes if latest_editor else None,
            )
            revision_packet = brief.build_retry_packet(
                draft=latest_writer.content if latest_writer else "",
                revision_notes=combined_notes or "Revise using the latest human feedback.",
                goal=request.goal,
                retry_handoff=knowledge_handoff,
            )
            revision_notes = human_feedback.notes if human_feedback else None

        writer_result = await self.writer.generate(
            request,
            knowledge_handoff=knowledge_handoff,
            revision_packet=revision_packet,
            revision_notes=revision_notes,
        )

        _save_output(
            db,
            pipeline_id=pipeline.id,
            version=_next_version(db, pipeline.id),
            stage="writer_draft",
            agent="writer",
            content=writer_result.content,
            revision_notes=human_feedback.notes if human_feedback and human_feedback.notes else None,
        )

        if trigger_gate in {"draft_review", "edit_review"}:
            pipeline.revision_count += 1

        pipeline.status = STAGE_TO_GATE["writing"]
        db.commit()

    async def _run_edit(
        self,
        db: Session,
        pipeline: ContentPipeline,
        config: PipelineConfig,
        request: GenerateRequest,
    ) -> None:
        pipeline.status = "editing"
        db.commit()

        writer_output = self._get_latest_output(db, pipeline.id, "writer_draft")
        structural_handoff = self._get_latest_output(db, pipeline.id, "editor_structural_handoff")
        if writer_output is None:
            raise ValueError("Writer draft not found for editing stage")

        scorecard, notes = self.editor.score_with_notes(
            writer_output.content,
            request,
            threshold=config.quality_threshold,
            structural_handoff=structural_handoff.content if structural_handoff else None,
        )

        _save_output(
            db,
            pipeline_id=pipeline.id,
            version=_next_version(db, pipeline.id),
            stage="editor_score",
            agent="editor",
            content=writer_output.content,
            scorecard_json=_scorecard_to_json(scorecard),
            revision_notes=notes or None,
        )

        pipeline.final_score = scorecard.total_score
        pipeline.status = STAGE_TO_GATE["editing"]
        db.commit()

    async def _run_polish(
        self,
        db: Session,
        pipeline: ContentPipeline,
        config: PipelineConfig,
        request: GenerateRequest,
        *,
        trigger_gate: Optional[str] = None,
        target_dimensions: Optional[list[str]] = None,
    ) -> None:
        pipeline.status = "polishing"
        db.commit()

        latest_draft = self._get_latest_output(db, pipeline.id, "writer_draft")
        latest_editor = self._get_latest_output(db, pipeline.id, "editor_score")
        research_brief = self._get_latest_output(db, pipeline.id, "research_brief")
        structural_handoff = self._get_latest_output(db, pipeline.id, "editor_structural_handoff")
        if latest_draft is None or latest_editor is None or research_brief is None:
            raise ValueError("Missing required outputs for polishing stage")

        human_notes = []
        for gate in filter(None, ["edit_review", trigger_gate]):
            entry = self._get_pending_feedback(db, pipeline.id, gate)
            if entry and entry.notes and entry.notes.strip():
                human_notes.append(entry.notes.strip())

        resolved_targets = target_dimensions or self._infer_target_dimensions(latest_editor.scorecard_json, config)
        revision_sections = []
        if resolved_targets:
            revision_sections.append("## Target Dimensions\n" + "\n".join(f"- {item}" for item in resolved_targets))
        if human_notes:
            revision_sections.append("## Human Feedback\n" + "\n\n".join(human_notes))
        if latest_editor.revision_notes:
            revision_sections.append(f"## Editor Notes\n{latest_editor.revision_notes}")
        revision_sections.append(
            "## Polish Objective\nTighten only the failing or requested dimensions. Preserve structure, strengths, and valid source signals. Focus on voice/slop cleanup and clarity."
        )
        revision_packet = "\n\n".join(revision_sections)

        writer_result = await self.writer.generate(
            request,
            knowledge_handoff=research_brief.content,
            revision_packet=revision_packet,
            revision_notes="\n\n".join(human_notes) if human_notes else latest_editor.revision_notes,
        )

        _save_output(
            db,
            pipeline_id=pipeline.id,
            version=_next_version(db, pipeline.id),
            stage="polished_draft",
            agent="writer",
            content=writer_result.content,
            revision_notes=revision_packet,
        )

        scorecard, notes = self.editor.score_with_notes(
            writer_result.content,
            request,
            threshold=config.quality_threshold,
            structural_handoff=structural_handoff.content if structural_handoff else None,
        )

        _save_output(
            db,
            pipeline_id=pipeline.id,
            version=_next_version(db, pipeline.id),
            stage="polish_score",
            agent="editor",
            content=writer_result.content,
            scorecard_json=_scorecard_to_json(scorecard),
            revision_notes=notes or None,
        )

        pipeline.revision_count += 1
        pipeline.final_score = scorecard.total_score
        pipeline.status = STAGE_TO_GATE["polishing"]
        db.commit()

    def _get_latest_output(self, db: Session, pipeline_id: str, stage: str) -> Optional[ContentOutput]:
        return (
            db.query(ContentOutput)
            .filter(ContentOutput.pipeline_id == pipeline_id, ContentOutput.stage == stage)
            .order_by(ContentOutput.version.desc())
            .first()
        )

    def _get_pending_feedback(self, db: Session, pipeline_id: str, gate_status: Optional[str]) -> Optional[FeedbackEntry]:
        if not gate_status:
            return None

        latest_output = self._get_latest_output(db, pipeline_id, GATE_TO_OUTPUT_STAGE.get(gate_status, ""))
        entries = (
            db.query(FeedbackEntry)
            .filter(FeedbackEntry.pipeline_id == pipeline_id, FeedbackEntry.stage == gate_status)
            .order_by(FeedbackEntry.created_at.desc())
            .all()
        )
        if latest_output is None:
            return entries[0] if entries else None
        for entry in entries:
            if entry.created_at >= latest_output.created_at:
                return entry
        return entries[0] if entries else None

    def _rebuild_config(self, pipeline: ContentPipeline) -> PipelineConfig:
        return self.orchestrator.configure(
            topic=pipeline.topic,
            page_type=pipeline.page_type,
            goal=pipeline.goal,
            audience=pipeline.audience,
            quality_threshold=pipeline.quality_threshold,
            revision_limit=pipeline.revision_limit,
        )

    def _build_request(self, pipeline: ContentPipeline) -> GenerateRequest:
        return GenerateRequest(
            topic=pipeline.topic,
            page_type=pipeline.page_type,  # type: ignore[arg-type]
            goal=pipeline.goal,
            audience=pipeline.audience or "spiritual seekers",
        )

    def _get_pipeline_or_raise(self, db: Session, pipeline_id: str) -> ContentPipeline:
        pipeline = db.get(ContentPipeline, pipeline_id)
        if pipeline is None:
            raise ValueError(f"Pipeline {pipeline_id} not found")
        return pipeline

    def _normalize_gate_status(self, status: str) -> str:
        return "final_review" if status == "needs_review" else status

    def _combine_notes(self, human_notes: Optional[str], editor_notes: Optional[str]) -> Optional[str]:
        blocks = []
        if human_notes and human_notes.strip():
            blocks.append(f"## Human Feedback\n{human_notes.strip()}")
        if editor_notes and editor_notes.strip():
            blocks.append(f"## Editor Notes\n{editor_notes.strip()}")
        return "\n\n".join(blocks) if blocks else None

    def _infer_target_dimensions(self, scorecard_json: Optional[str], config: PipelineConfig) -> list[str]:
        if not scorecard_json:
            return ["voice_consistency"]
        try:
            parsed = json.loads(scorecard_json)
        except Exception:
            return ["voice_consistency"]
        dimensions = parsed.get("dimensions") or {}
        failing = [
            name
            for name, payload in dimensions.items()
            if isinstance(payload, dict) and float(payload.get("score", 10.0)) < config.quality_threshold
        ]
        return failing or ["voice_consistency"]

    def _store_feedback(
        self,
        db: Session,
        pipeline_id: str,
        *,
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
        db.commit()
        return entry


def _next_version(db: Session, pipeline_id: str) -> int:
    latest = (
        db.query(ContentOutput)
        .filter(ContentOutput.pipeline_id == pipeline_id)
        .order_by(ContentOutput.version.desc())
        .first()
    )
    return (latest.version if latest else 0) + 1


def _save_output(
    db: Session,
    *,
    pipeline_id: str,
    version: int,
    stage: str,
    agent: str,
    content: str,
    scorecard_json: Optional[str] = None,
    research_brief_json: Optional[str] = None,
    revision_notes: Optional[str] = None,
) -> ContentOutput:
    output = ContentOutput(
        pipeline_id=pipeline_id,
        version=version,
        stage=stage,
        agent=agent,
        content=content,
        scorecard_json=scorecard_json,
        research_brief_json=research_brief_json,
        revision_notes=revision_notes,
    )
    db.add(output)
    db.commit()
    return output


def _scorecard_to_json(scorecard: object) -> str:
    try:
        return scorecard.model_dump_json()  # type: ignore[attr-defined]
    except Exception:
        return json.dumps(str(scorecard))
