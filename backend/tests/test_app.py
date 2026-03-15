import os

os.environ.setdefault("SADHAKA_KNOWLEDGE_REFRESH_ON_STARTUP", "false")
os.environ.setdefault("SADHAKA_AUTO_CREATE_SCHEMA_ON_STARTUP", "false")

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_endpoint_returns_ok():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "sadhaka-content-agent-backend",
    }


def test_openapi_is_available():
    response = client.get("/openapi.json")

    assert response.status_code == 200
    payload = response.json()
    assert payload["info"]["title"] == "Sadhaka Content Agent API"
    assert "/health" in payload["paths"]