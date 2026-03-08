"""Phase 1 FastAPI app entrypoint (Core Loop: Topic -> Content -> Score)."""

from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.generate import router as generate_router
from app.api.routes.knowledge import router as knowledge_router
from app.config import get_settings
from app.db.base import Base
from app.db.session import engine
from app.knowledge.store import get_knowledge_store

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    if settings.knowledge_refresh_on_startup:
        get_knowledge_store().reload()
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router, prefix=settings.api_prefix)
app.include_router(knowledge_router, prefix=settings.api_prefix)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "sadhaka-content-agent-backend"}
