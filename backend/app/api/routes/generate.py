"""Generation endpoint for Phase 1 core loop."""

from __future__ import annotations

from fastapi import APIRouter

from app.agents.editor import EditorAgent
from app.agents.writer import WriterAgent
from app.knowledge.store import get_knowledge_store
from app.models.schemas import GenerateRequest, GenerateResponse

router = APIRouter(tags=["generation"])


@router.post("/generate", response_model=GenerateResponse)
async def generate_content(payload: GenerateRequest) -> GenerateResponse:
    knowledge_store = get_knowledge_store()
    writer = WriterAgent(knowledge_store=knowledge_store)
    editor = EditorAgent(knowledge_store=knowledge_store)

    writer_result = await writer.generate(payload)
    scorecard = editor.score(writer_result.content, payload)

    return GenerateResponse(
        topic=payload.topic,
        page_type=payload.page_type,
        generated_content=writer_result.content,
        scorecard=scorecard,
    )
