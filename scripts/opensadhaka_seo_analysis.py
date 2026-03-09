#!/usr/bin/env python3
"""
opensadhaka.com — Combined GA4 + GSC baseline analysis

Usage:
  python scripts/opensadhaka_seo_analysis.py

Recommended setup:
  1. Put your Google service-account JSON in .data/google-service-account.json
     (the .data directory is already gitignored in this repo).
  2. Install dependencies:
       pip install google-analytics-data google-api-python-client google-auth pandas tabulate

Optional environment variables:
  GOOGLE_SERVICE_ACCOUNT_FILE   Path to service-account JSON
  GA4_PROPERTY_ID               GA4 property id (default: 526473437)
  GSC_SITE_URL                  Search Console property (default: sc-domain:opensadhaka.com)
  LOOKBACK_DAYS                 Lookback window in days (default: 90)
  BASELINE_OUTPUT_DIR           Directory for JSON exports (default: temp_cache/google-baseline)
"""

from __future__ import annotations

import json
import os
from collections import defaultdict
from dataclasses import dataclass
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import pandas as pd
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Filter,
    FilterExpression,
    InListFilter,
    Metric,
    OrderBy,
    RunReportRequest,
    StringFilter,
)
from google.oauth2 import service_account
from googleapiclient.discovery import build
from tabulate import tabulate


# ── CONFIG ────────────────────────────────────────────────────────────────────
ROOT_DIR = Path(__file__).resolve().parents[1]
KEY_FILE = Path(
    os.getenv(
        "GOOGLE_SERVICE_ACCOUNT_FILE",
        str(ROOT_DIR / ".data" / "google-service-account.json"),
    )
)
GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "526473437")
GSC_SITE_URL = os.getenv("GSC_SITE_URL", "sc-domain:opensadhaka.com")
LOOKBACK_DAYS = int(os.getenv("LOOKBACK_DAYS", "90"))
BASELINE_OUTPUT_DIR = Path(
    os.getenv(
        "BASELINE_OUTPUT_DIR",
        str(ROOT_DIR / "temp_cache" / "google-baseline"),
    )
)

TRACKED_EVENTS = [
    "faith_finder_quiz_start",
    "faith_finder_quiz_complete",
    "faith_finder_email_capture",
    "faith_finder_result_view",
    "faith_finder_result_share",
    "seo_article_read",
    "cta_click",
    "app_open",
    "path_explore",
]

SCOPES_GA4 = ["https://www.googleapis.com/auth/analytics.readonly"]
SCOPES_GSC = ["https://www.googleapis.com/auth/webmasters.readonly"]

TODAY = date.today()
LAST_28_START = TODAY - timedelta(days=28)
LAST_90_START = TODAY - timedelta(days=90)
END_DATE = TODAY - timedelta(days=1)


@dataclass(frozen=True)
class Window:
    start: date
    end: date

    @property
    def start_str(self) -> str:
        return self.start.strftime("%Y-%m-%d")

    @property
    def end_str(self) -> str:
        return self.end.strftime("%Y-%m-%d")


LAST_28 = Window(start=LAST_28_START, end=END_DATE)
LAST_90 = Window(start=LAST_90_START, end=END_DATE)
PRIMARY = Window(start=TODAY - timedelta(days=LOOKBACK_DAYS), end=TODAY)


def ensure_key_file() -> None:
    if not KEY_FILE.exists():
        raise FileNotFoundError(
            f"Service-account key not found: {KEY_FILE}\n"
            "Set GOOGLE_SERVICE_ACCOUNT_FILE or place the JSON at "
            ".data/google-service-account.json"
        )


def get_credentials(scopes: list[str]):
    ensure_key_file()
    return service_account.Credentials.from_service_account_file(str(KEY_FILE), scopes=scopes)


def ga4_client() -> BetaAnalyticsDataClient:
    return BetaAnalyticsDataClient(credentials=get_credentials(SCOPES_GA4))


def gsc_service():
    return build("searchconsole", "v1", credentials=get_credentials(SCOPES_GSC), cache_discovery=False)


def print_section(title: str) -> None:
    print(f"\n{'═' * 78}")
    print(f"  {title}")
    print(f"{'═' * 78}")


def print_df(df: pd.DataFrame, title: str | None = None) -> None:
    if title:
        print(f"\n── {title} ──")
    if df.empty:
        print("  (no data)")
        return
    print(tabulate(df, headers="keys", tablefmt="rounded_outline", showindex=False))


def safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def pct(value: Any) -> str:
    return f"{safe_float(value) * 100:.2f}%"


def secs_to_human(value: Any) -> str:
    secs = int(safe_float(value))
    minutes, seconds = divmod(secs, 60)
    hours, minutes = divmod(minutes, 60)
    if hours:
        return f"{hours}h {minutes}m {seconds}s"
    if minutes:
        return f"{minutes}m {seconds}s"
    return f"{seconds}s"


def run_ga4_report(
    client: BetaAnalyticsDataClient,
    *,
    dimensions: list[str],
    metrics: list[str],
    window: Window,
    limit: int = 100,
    dimension_filter: FilterExpression | None = None,
    metric_filter: FilterExpression | None = None,
    order_bys: list[OrderBy] | None = None,
):
    request = RunReportRequest(
        property=f"properties/{GA4_PROPERTY_ID}",
        dimensions=[Dimension(name=name) for name in dimensions],
        metrics=[Metric(name=name) for name in metrics],
        date_ranges=[DateRange(start_date=window.start_str, end_date=window.end_str)],
        dimension_filter=dimension_filter,
        metric_filter=metric_filter,
        order_bys=order_bys or [],
        limit=limit,
    )
    return client.run_report(request)


def ga4_topline(client: BetaAnalyticsDataClient, window: Window) -> dict[str, Any]:
    report = run_ga4_report(
        client,
        dimensions=[],
        metrics=[
            "sessions",
            "totalUsers",
            "newUsers",
            "engagedSessions",
            "engagementRate",
            "bounceRate",
            "averageSessionDuration",
            "screenPageViews",
        ],
        window=window,
        limit=1,
    )
    row = report.rows[0].metric_values if report.rows else []
    labels = [
        "Sessions",
        "Total Users",
        "New Users",
        "Engaged Sessions",
        "Engagement Rate",
        "Bounce Rate",
        "Avg Session Duration",
        "Pageviews",
    ]
    values = [metric.value for metric in row] if row else ["N/A"] * len(labels)
    data = dict(zip(labels, values, strict=False))
    if data.get("Engagement Rate") != "N/A":
        data["Engagement Rate"] = pct(data["Engagement Rate"])
    if data.get("Bounce Rate") != "N/A":
        data["Bounce Rate"] = pct(data["Bounce Rate"])
    if data.get("Avg Session Duration") != "N/A":
        data["Avg Session Duration"] = secs_to_human(data["Avg Session Duration"])
    return data


def ga4_channels(client: BetaAnalyticsDataClient, window: Window) -> pd.DataFrame:
    report = run_ga4_report(
        client,
        dimensions=["sessionDefaultChannelGroup"],
        metrics=["sessions", "engagedSessions", "bounceRate", "totalUsers"],
        window=window,
        limit=10,
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
    )
    rows = []
    for row in report.rows:
        rows.append(
            {
                "Channel": row.dimension_values[0].value,
                "Sessions": int(safe_float(row.metric_values[0].value)),
                "Engaged Sessions": int(safe_float(row.metric_values[1].value)),
                "Bounce Rate": pct(row.metric_values[2].value),
                "Users": int(safe_float(row.metric_values[3].value)),
            }
        )
    return pd.DataFrame(rows)


def ga4_top_pages(client: BetaAnalyticsDataClient, window: Window) -> pd.DataFrame:
    report = run_ga4_report(
        client,
        dimensions=["pagePath"],
        metrics=[
            "screenPageViews",
            "sessions",
            "engagedSessions",
            "averageSessionDuration",
            "bounceRate",
        ],
        window=window,
        limit=20,
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"), desc=True)],
    )
    rows = []
    for row in report.rows:
        rows.append(
            {
                "Page": row.dimension_values[0].value,
                "Pageviews": int(safe_float(row.metric_values[0].value)),
                "Sessions": int(safe_float(row.metric_values[1].value)),
                "Engaged": int(safe_float(row.metric_values[2].value)),
                "Avg Duration": secs_to_human(row.metric_values[3].value),
                "Bounce Rate": pct(row.metric_values[4].value),
            }
        )
    return pd.DataFrame(rows)


def ga4_weekly_trend(client: BetaAnalyticsDataClient, window: Window) -> pd.DataFrame:
    report = run_ga4_report(
        client,
        dimensions=["week"],
        metrics=["sessions", "totalUsers", "engagedSessions"],
        window=window,
        limit=100,
        order_bys=[OrderBy(dimension=OrderBy.DimensionOrderBy(dimension_name="week"), desc=False)],
    )
    rows = []
    for row in report.rows:
        rows.append(
            {
                "Week": row.dimension_values[0].value,
                "Sessions": int(safe_float(row.metric_values[0].value)),
                "Users": int(safe_float(row.metric_values[1].value)),
                "Engaged Sessions": int(safe_float(row.metric_values[2].value)),
            }
        )
    return pd.DataFrame(rows)


def ga4_organic_landing_pages(client: BetaAnalyticsDataClient, window: Window) -> pd.DataFrame:
    report = run_ga4_report(
        client,
        dimensions=["landingPagePlusQueryString", "sessionDefaultChannelGroup"],
        metrics=[
            "sessions",
            "engagedSessions",
            "engagementRate",
            "bounceRate",
            "screenPageViews",
        ],
        window=window,
        limit=50,
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="sessionDefaultChannelGroup",
                string_filter=StringFilter(value="Organic Search", match_type=StringFilter.MatchType.EXACT),
            )
        ),
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
    )
    rows = []
    for row in report.rows:
        rows.append(
            {
                "Landing Page": row.dimension_values[0].value,
                "Channel": row.dimension_values[1].value,
                "Sessions": int(safe_float(row.metric_values[0].value)),
                "Engaged Sessions": int(safe_float(row.metric_values[1].value)),
                "Engagement Rate": pct(row.metric_values[2].value),
                "Bounce Rate": pct(row.metric_values[3].value),
                "Pageviews": int(safe_float(row.metric_values[4].value)),
            }
        )
    return pd.DataFrame(rows)


def ga4_tracked_events(client: BetaAnalyticsDataClient, window: Window) -> pd.DataFrame:
    report = run_ga4_report(
        client,
        dimensions=["eventName"],
        metrics=["eventCount", "keyEvents", "totalUsers"],
        window=window,
        limit=50,
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="eventName",
                in_list_filter=InListFilter(values=TRACKED_EVENTS),
            )
        ),
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)],
    )
    rows = []
    for row in report.rows:
        rows.append(
            {
                "Event": row.dimension_values[0].value,
                "Event Count": int(safe_float(row.metric_values[0].value)),
                "Key Events": safe_float(row.metric_values[1].value),
                "Users": int(safe_float(row.metric_values[2].value)),
            }
        )
    return pd.DataFrame(rows)


def gsc_query(service, window: Window, dimensions: list[str], row_limit: int = 25) -> pd.DataFrame:
    body = {
        "startDate": window.start_str,
        "endDate": window.end_str,
        "dimensions": dimensions,
        "rowLimit": row_limit,
        "dataState": "all",
    }
    response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=body).execute()
    rows = response.get("rows", [])
    records = []
    for row in rows:
        keys = row.get("keys", [])
        record = {dimensions[i]: keys[i] for i in range(len(dimensions))}
        record.update(
            {
                "Clicks": row.get("clicks", 0),
                "Impressions": row.get("impressions", 0),
                "CTR": f"{row.get('ctr', 0) * 100:.2f}%",
                "Position": round(row.get("position", 0), 2),
            }
        )
        records.append(record)
    return pd.DataFrame(records)


def path_from_page(raw_page: str) -> str:
    try:
        parsed = urlparse(raw_page)
        return parsed.path or "/"
    except Exception:
        return raw_page


def classify_page_type(path: str) -> str:
    if path == "/":
        return "homepage"
    if path == "/brand-facts":
        return "brand-facts"
    if path.startswith("/compare/") or path == "/compare":
        return "comparison-pages"
    if path.startswith("/learn/sanskrit/"):
        return "sanskrit-word-pages"
    if path.startswith("/texts/bhagavad-gita/chapter-") and "/shloka-" in path:
        return "gita-shloka-pages"
    if path.startswith("/texts/bhagavad-gita/chapter-") or path.startswith("/bhagavad-gita-chapter-"):
        return "gita-chapter-pages"
    if path.startswith("/practices/") and "/for/" in path:
        return "practice-goal-pages"
    if path.startswith("/topics/"):
        return "concept-pages"
    if path in {
        "/philosophies",
        "/traditions",
        "/texts",
        "/greats",
        "/spiritual-paths-explained",
        "/practical-spiritual-practices",
        "/sacred-texts-teachings",
        "/spiritual-traditions-paths",
        "/ancient-wisdom-philosophies",
    }:
        return "answer-hubs"
    return "editorial-articles"


def group_gsc_pages(df: pd.DataFrame) -> list[dict[str, Any]]:
    if df.empty:
        return []

    grouped: dict[str, dict[str, Any]] = defaultdict(
        lambda: {
            "type": "",
            "clicks": 0.0,
            "impressions": 0.0,
            "weighted_position_total": 0.0,
            "topUrls": [],
        }
    )

    for _, row in df.iterrows():
        page = row.get("page", "")
        path = path_from_page(page)
        page_type = classify_page_type(path)
        impressions = safe_float(row.get("Impressions", 0))
        clicks = safe_float(row.get("Clicks", 0))
        position = safe_float(row.get("Position", 0))

        bucket = grouped[page_type]
        bucket["type"] = page_type
        bucket["clicks"] += clicks
        bucket["impressions"] += impressions
        bucket["weighted_position_total"] += position * impressions
        bucket["topUrls"].append(
            {
                "path": path,
                "clicks": int(clicks),
                "impressions": int(impressions),
                "position": round(position, 2),
            }
        )

    results = []
    for bucket in grouped.values():
        impressions = bucket["impressions"]
        clicks = bucket["clicks"]
        avg_position = bucket["weighted_position_total"] / impressions if impressions else 0
        top_urls = sorted(bucket["topUrls"], key=lambda item: item["impressions"], reverse=True)[:5]
        results.append(
            {
                "type": bucket["type"],
                "clicks": int(clicks),
                "impressions": int(impressions),
                "ctr": (clicks / impressions) if impressions else 0,
                "avgPosition": avg_position,
                "topUrls": top_urls,
            }
        )

    return sorted(results, key=lambda item: item["impressions"], reverse=True)


def summarize_gsc(df: pd.DataFrame) -> dict[str, Any]:
    if df.empty:
        return {
            "rows": 0,
            "grouped": [],
            "totals": {"clicks": 0, "impressions": 0, "ctr": 0, "avgPosition": 0},
        }

    clicks = float(df["Clicks"].astype(float).sum())
    impressions = float(df["Impressions"].astype(float).sum())
    weighted_position = (df["Position"].astype(float) * df["Impressions"].astype(float)).sum()
    avg_position = weighted_position / impressions if impressions else 0

    return {
        "rows": int(len(df)),
        "grouped": group_gsc_pages(df),
        "totals": {
            "clicks": int(clicks),
            "impressions": int(impressions),
            "ctr": (clicks / impressions) if impressions else 0,
            "avgPosition": avg_position,
        },
    }


def summarize_ga4_landing(df: pd.DataFrame) -> dict[str, Any]:
    if df.empty:
        return {"rowCount": 0, "grouped": []}

    grouped: dict[str, dict[str, Any]] = defaultdict(
        lambda: {
            "type": "",
            "sessions": 0,
            "engagedSessions": 0,
            "pageviews": 0,
            "topUrls": [],
        }
    )

    for _, row in df.iterrows():
        path = row.get("Landing Page", "") or "/"
        page_type = classify_page_type(path.split("?")[0])
        bucket = grouped[page_type]
        bucket["type"] = page_type
        bucket["sessions"] += int(row.get("Sessions", 0))
        bucket["engagedSessions"] += int(row.get("Engaged Sessions", 0))
        bucket["pageviews"] += int(row.get("Pageviews", 0))
        bucket["topUrls"].append(
            {
                "path": path,
                "sessions": int(row.get("Sessions", 0)),
                "engagedSessions": int(row.get("Engaged Sessions", 0)),
                "pageviews": int(row.get("Pageviews", 0)),
            }
        )

    results = []
    for bucket in grouped.values():
        sessions = bucket["sessions"]
        engaged = bucket["engagedSessions"]
        results.append(
            {
                "type": bucket["type"],
                "sessions": sessions,
                "engagedSessions": engaged,
                "engagementRate": (engaged / sessions) if sessions else 0,
                "pageviews": bucket["pageviews"],
                "topUrls": sorted(bucket["topUrls"], key=lambda item: item["sessions"], reverse=True)[:5],
            }
        )

    return {"rowCount": int(len(df)), "grouped": sorted(results, key=lambda item: item["sessions"], reverse=True)}


def dataframe_records(df: pd.DataFrame) -> list[dict[str, Any]]:
    if df.empty:
        return []
    return df.to_dict(orient="records")


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def main() -> None:
    print("\n🔍  opensadhaka.com — SEO Baseline Analysis")
    print(f"    Primary window: {PRIMARY.start_str} → {PRIMARY.end_str}  ({LOOKBACK_DAYS} days)")
    print(f"    GSC baseline windows: {LAST_28.start_str} → {LAST_28.end_str} and {LAST_90.start_str} → {LAST_90.end_str}")
    print(f"    Credentials: {KEY_FILE}")

    baseline_payload: dict[str, Any] = {
        "generatedAt": datetime.utcnow().isoformat() + "Z",
        "gscProperty": GSC_SITE_URL,
        "ga4Property": GA4_PROPERTY_ID,
        "dateRanges": {
            "last28": {"startDate": LAST_28.start_str, "endDate": LAST_28.end_str},
            "last90": {"startDate": LAST_90.start_str, "endDate": LAST_90.end_str},
            "primary": {"startDate": PRIMARY.start_str, "endDate": PRIMARY.end_str},
        },
    }

    print_section(f"GA4 — Google Analytics 4 (Property: {GA4_PROPERTY_ID})")
    try:
        ga4 = ga4_client()

        topline = ga4_topline(ga4, PRIMARY)
        print("\n── Top-line Metrics ──")
        for key, value in topline.items():
            print(f"    {key:<24} {value}")

        channels_df = ga4_channels(ga4, PRIMARY)
        top_pages_df = ga4_top_pages(ga4, PRIMARY)
        weekly_df = ga4_weekly_trend(ga4, PRIMARY)
        organic_landing_df = ga4_organic_landing_pages(ga4, LAST_28)
        tracked_events_df = ga4_tracked_events(ga4, LAST_28)

        print_df(channels_df, "Sessions by Channel")
        print_df(top_pages_df, "Top Pages by Pageviews")
        print_df(weekly_df, "Weekly Sessions Trend")
        print_df(organic_landing_df, "Organic Landing Pages (Last 28 Days)")
        print_df(tracked_events_df, "Tracked Custom Events (Last 28 Days)")

        baseline_payload["ga4"] = {
            "topline": topline,
            "channels": dataframe_records(channels_df),
            "topPages": dataframe_records(top_pages_df),
            "weeklyTrend": dataframe_records(weekly_df),
            "landingOrganicLast28": summarize_ga4_landing(organic_landing_df),
            "trackedEventsLast28": {
                "metricMode": "eventCount+keyEvents+totalUsers",
                "rows": dataframe_records(tracked_events_df),
            },
        }
    except Exception as exc:
        print(f"\n  ⚠️  GA4 error: {exc}")
        baseline_payload["ga4Error"] = str(exc)

    print_section(f"GSC — Google Search Console ({GSC_SITE_URL})")
    try:
        gsc = gsc_service()

        top_queries_df = gsc_query(gsc, LAST_28, ["query"], 25)
        top_pages_df = gsc_query(gsc, LAST_28, ["page"], 50)
        country_df = gsc_query(gsc, LAST_28, ["country"], 15)
        device_df = gsc_query(gsc, LAST_28, ["device"], 10)
        top_pages_90_df = gsc_query(gsc, LAST_90, ["page"], 50)

        print_df(top_queries_df, "Top Queries (Last 28 Days)")
        print_df(top_pages_df, "Top Pages (Last 28 Days)")
        print_df(country_df, "By Country (Last 28 Days)")
        print_df(device_df, "By Device (Last 28 Days)")

        gsc_baseline_payload = {
            "generatedAt": datetime.utcnow().isoformat() + "Z",
            "gscProperty": GSC_SITE_URL,
            "dateRanges": {
                "last28": {"startDate": LAST_28.start_str, "endDate": LAST_28.end_str},
                "last90": {"startDate": LAST_90.start_str, "endDate": LAST_90.end_str},
            },
            "last28": summarize_gsc(top_pages_df),
            "last90": summarize_gsc(top_pages_90_df),
            "topQueriesLast28": dataframe_records(top_queries_df),
            "countriesLast28": dataframe_records(country_df),
            "devicesLast28": dataframe_records(device_df),
        }
        baseline_payload["gsc"] = {
            "last28": gsc_baseline_payload["last28"],
            "last90": gsc_baseline_payload["last90"],
            "topQueriesLast28": gsc_baseline_payload["topQueriesLast28"],
            "countriesLast28": gsc_baseline_payload["countriesLast28"],
            "devicesLast28": gsc_baseline_payload["devicesLast28"],
        }

        write_json(BASELINE_OUTPUT_DIR / "gsc-baseline.json", gsc_baseline_payload)
    except Exception as exc:
        print(f"\n  ⚠️  GSC error: {exc}")
        baseline_payload["gscError"] = str(exc)

    write_json(BASELINE_OUTPUT_DIR / "baseline.json", baseline_payload)
    print_section("Artifacts")
    print(f"  Wrote: {BASELINE_OUTPUT_DIR / 'baseline.json'}")
    if (BASELINE_OUTPUT_DIR / "gsc-baseline.json").exists():
        print(f"  Wrote: {BASELINE_OUTPUT_DIR / 'gsc-baseline.json'}")


if __name__ == "__main__":
    main()