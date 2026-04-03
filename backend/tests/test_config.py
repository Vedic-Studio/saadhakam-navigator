from __future__ import annotations

import sys
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.config import get_settings


def test_settings_parses_comma_separated_cors_origins_from_env(monkeypatch):
    monkeypatch.setenv(
        "SADHAKA_CORS_ORIGINS",
        "https://app.example.com, https://www.example.com",
    )
    get_settings.cache_clear()

    try:
        settings = get_settings()
        assert settings.cors_origins == [
            "https://app.example.com",
            "https://www.example.com",
        ]
    finally:
        get_settings.cache_clear()


def test_settings_parses_json_array_cors_origins_from_env(monkeypatch):
    monkeypatch.setenv(
        "SADHAKA_CORS_ORIGINS",
        '["https://app.example.com", "https://www.example.com"]',
    )
    get_settings.cache_clear()

    try:
        settings = get_settings()
        assert settings.cors_origins == [
            "https://app.example.com",
            "https://www.example.com",
        ]
    finally:
        get_settings.cache_clear()