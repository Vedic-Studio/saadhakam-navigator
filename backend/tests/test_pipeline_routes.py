from __future__ import annotations

import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.api.routes import pipelines as pipelines_route
from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.models.pipeline import ContentPipeline
from app.services.pipeline_service import PipelineService


@pytest.fixture
def client_and_session():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    TestingSessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    client = TestClient(app)
    session = TestingSessionLocal()
    try:
        yield client, session
    finally:
        session.close()
        app.dependency_overrides.clear()
        pipelines_route._pipeline_service = None


class StubPipelineService(PipelineService):
    def __init__(self):
        super().__init__()
        self.advance_calls: list[dict] = []
        self.revise_calls: list[dict] = []

    async def advance(self, db, pipeline_id: str, notes: str | None = None):
        self.advance_calls.append({"pipeline_id": pipeline_id, "notes": notes})
        pipeline = db.get(ContentPipeline, pipeline_id)
        pipeline.status = "draft_review"
        db.commit()
        db.refresh(pipeline)
        return pipeline

    async def revise(self, db, pipeline_id: str, notes: str, target_dimensions: list[str] | None = None):
        self.revise_calls.append(
            {"pipeline_id": pipeline_id, "notes": notes, "target_dimensions": target_dimensions}
        )
        pipeline = db.get(ContentPipeline, pipeline_id)
        db.refresh(pipeline)
        return pipeline


def _seed_pipeline(session, *, status: str) -> ContentPipeline:
    pipeline = ContentPipeline(
        topic="What is Vedanta",
        page_type="topic_hub",
        audience="seekers",
        context_module="long_form",
        status=status,
        quality_threshold=7.0,
        revision_limit=2,
    )
    session.add(pipeline)
    session.commit()
    session.refresh(pipeline)
    return pipeline


def test_approve_accepts_final_review_and_legacy_needs_review(client_and_session):
    client, session = client_and_session
    final_review = _seed_pipeline(session, status="final_review")
    legacy_review = _seed_pipeline(session, status="needs_review")

    response = client.post(f"/api/pipelines/{final_review.id}/approve", json={"notes": "Looks good"})
    legacy_response = client.post(f"/api/pipelines/{legacy_review.id}/approve", json={"notes": "Legacy okay"})

    assert response.status_code == 200
    assert response.json()["status"] == "approved"
    assert legacy_response.status_code == 200
    assert legacy_response.json()["status"] == "approved"


def test_reject_accepts_any_review_gate(client_and_session):
    client, session = client_and_session
    pipeline = _seed_pipeline(session, status="draft_review")

    response = client.post(f"/api/pipelines/{pipeline.id}/reject", json={"notes": "Stop here"})

    assert response.status_code == 200
    assert response.json()["status"] == "rejected"


def test_advance_route_runs_from_review_gate(client_and_session):
    client, session = client_and_session
    pipeline = _seed_pipeline(session, status="research_review")
    stub_service = StubPipelineService()
    pipelines_route._pipeline_service = stub_service

    response = client.post(f"/api/pipelines/{pipeline.id}/advance", json={"notes": "Proceed to drafting"})

    assert response.status_code == 202
    assert stub_service.advance_calls == [{"pipeline_id": pipeline.id, "notes": "Proceed to drafting"}]


def test_revise_route_requires_review_gate_and_passes_target_dimensions(client_and_session):
    client, session = client_and_session
    pipeline = _seed_pipeline(session, status="edit_review")
    stub_service = StubPipelineService()
    pipelines_route._pipeline_service = stub_service

    response = client.post(
        f"/api/pipelines/{pipeline.id}/revise",
        json={"notes": "Fix voice", "target_dimensions": ["voice_consistency"]},
    )

    assert response.status_code == 202
    assert stub_service.revise_calls == [
        {
            "pipeline_id": pipeline.id,
            "notes": "Fix voice",
            "target_dimensions": ["voice_consistency"],
        }
    ]


def test_advance_rejects_final_review(client_and_session):
    client, session = client_and_session
    pipeline = _seed_pipeline(session, status="final_review")

    response = client.post(f"/api/pipelines/{pipeline.id}/advance", json={"notes": "No-op"})

    assert response.status_code == 422
    assert "Cannot advance pipeline" in response.json()["detail"]