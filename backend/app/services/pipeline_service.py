"""Pipeline Service — orchestrates the full multi-agent pipeline with revision loop."""

from __future__ import annotations

import json
import logging
from typing import Optional

from sqlalchemy.orm import Session

from app.agents.editor import EditorAgent
from app.agents.orchestrator import OrchestratorAgent
from app.agents.research import ResearchAgent
from app.agents.writer import WriterAgent
from app.models.pipeline import ContentOutput, ContentPipeline
from app.models.schemas import GenerateRequest

logger = logging.getLogger(__name__)


class PipelineService:
    """
    Runs the Orchestrator → Research → Write → Edit → (Revision loop) pipeline.

    Status flow:
        queued → researching → writing → editing → [needs_review | approved | rejected | complete]
    """

    def __init__(self):
        self.orchestrator = OrchestratorAgent()
        self.researcher = ResearchAgent()
        self.writer = WriterAgent()
        self.editor = EditorAgent()

    async def run(self, db: Session, pipeline_id: str) -> ContentPipeline:
        """Execute the full pipeline for `pipeline_id`. Mutates pipeline status in DB."""
        pipeline = db.get(ContentPipeline, pipeline_id)
        if pipeline is None:
            raise ValueError(f"Pipeline {pipeline_id} not found")

        try:
            result = await self._run_pipeline(db, pipeline)
            return result
        except Exception as exc:
            logger.exception("Pipeline %s failed: %s", pipeline_id, exc)
            pipeline.status = "complete"  # end state for errored pipeline
            pipeline.error_message = str(exc)
            db.commit()
            raise

    async def _run_pipeline(self, db: Session, pipeline: ContentPipeline) -> ContentPipeline:
        # --- Build config from orchestrator ---
        config = self.orchestrator.configure(
            topic=pipeline.topic,
            page_type=pipeline.page_type,
            goal=pipeline.goal,
            audience=pipeline.audience,
            quality_threshold=pipeline.quality_threshold,
            revision_limit=pipeline.revision_limit,
        )

        # Fabricate a GenerateRequest for agents that still need it (editor, writer fallback)
        request = GenerateRequest(
            topic=pipeline.topic,
            page_type=pipeline.page_type,   # type: ignore[arg-type]
            goal=pipeline.goal,
            audience=pipeline.audience or "spiritual seekers",
        )

        # --- Step 1: Research Phase ---
        pipeline.status = "researching"
        db.commit()

        brief = self.researcher.build_brief(
            topic=pipeline.topic,
            page_type=pipeline.page_type,
            config=config,
        )

        version = 1
        _save_output(
            db,
            pipeline_id=pipeline.id,
            version=version,
            stage="research_brief",
            agent="research",
            content=brief.to_text(),
            research_brief_json=brief.to_json(),
        )

        revision_notes: Optional[str] = None

        # --- Steps 2-N: Write → Edit → (revision loop) ---
        for attempt in range(1, config.revision_limit + 2):  # +2: initial + up to limit re-drafts
            version += 1

            # Write
            pipeline.status = "writing"
            db.commit()

            writer_result = await self.writer.generate(
                request,
                research_brief=brief,
                revision_notes=revision_notes,
            )
            draft = writer_result.content

            _save_output(
                db,
                pipeline_id=pipeline.id,
                version=version,
                stage="writer_draft",
                agent="writer",
                content=draft,
            )

            # Edit
            version += 1
            pipeline.status = "editing"
            db.commit()

            scorecard, notes = self.editor.score_with_notes(
                draft, request, threshold=config.quality_threshold
            )
            scorecard_json = _scorecard_to_json(scorecard)

            _save_output(
                db,
                pipeline_id=pipeline.id,
                version=version,
                stage="editor_score",
                agent="editor",
                content=draft,
                scorecard_json=scorecard_json,
                revision_notes=notes if notes else None,
            )

            pipeline.revision_count = attempt - 1
            pipeline.final_score = scorecard.total_score
            db.commit()

            if scorecard.passed:
                # Content passed — ready for human review
                logger.info(
                    "Pipeline %s passed on attempt %d (score %.2f)",
                    pipeline.id, attempt, scorecard.total_score,
                )
                break

            if attempt > config.revision_limit:
                # Exhausted revision budget — still send to review with whatever we have
                logger.warning(
                    "Pipeline %s exhausted revision limit (%d) with score %.2f",
                    pipeline.id, config.revision_limit, scorecard.total_score,
                )
                break

            # Below threshold + budget remains → send revision notes back to writer
            revision_notes = notes
            pipeline.revision_count = attempt
            db.commit()

        # Gate: needs_review for human approval
        pipeline.status = "needs_review"
        db.commit()

        return pipeline

    async def create_and_run(
        self,
        db: Session,
        topic: str,
        page_type: str,
        goal: Optional[str] = None,
        audience: Optional[str] = None,
        quality_threshold: Optional[float] = None,
        revision_limit: Optional[int] = None,
    ) -> ContentPipeline:
        """Create a pipeline + immediately run it. Convenience for the API route."""
        pipeline, _ = self.orchestrator.create_pipeline(
            db=db,
            topic=topic,
            page_type=page_type,
            goal=goal,
            audience=audience,
            quality_threshold=quality_threshold,
            revision_limit=revision_limit,
        )
        return await self.run(db, pipeline.id)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

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
    """Serialize a Pydantic QualityScorecard to JSON string."""
    try:
        return scorecard.model_dump_json()  # type: ignore[attr-defined]
    except Exception:
        return json.dumps(str(scorecard))
