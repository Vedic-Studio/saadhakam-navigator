"""Knowledge retrieval endpoints for Phase 1."""

from __future__ import annotations

from fastapi import APIRouter

from app.knowledge.store import get_knowledge_store
from app.models.schemas import TechniqueItem, TechniquesResponse

router = APIRouter(tags=["knowledge"])


@router.get("/knowledge/techniques", response_model=TechniquesResponse)
def get_knowledge_techniques() -> TechniquesResponse:
    store = get_knowledge_store()
    items = [TechniqueItem(**item) for item in store.get_techniques()]
    return TechniquesResponse(techniques=items)
