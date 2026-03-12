# Google API Setup (GSC + GA4)

Last Updated: 2026-03-12  
Owner: Engineering + Analytics/Growth  
Review Cadence: As needed (access/setup changes)  
Next Review Due: 2026-04-12  
Canonical Role: Credential and access setup guide for Search Console API and GA4 Data API.  
Primary Inputs: Google Cloud project access, Search Console property permissions, GA4 property permissions.  
Primary Outputs: Working service account access and validated API connectivity for reporting/automation.

> **Companion Documents:**
> - `plans/update-seo-scorecard.md` — How API outputs are used in maintenance workflow
> - `plans/seo-growth-dashboard.md` — Where setup blockers are surfaced
> - `plans/seo-recurring-operations-tracker.md` — Operational cadence + execution logging

---

## 1) Purpose

Set up a secure, repeatable Google API access path for:
- Search Console data extraction
- GA4 reporting extraction

This enables consistent evidence collection for scorecard/dashboard updates.

---

## 2) Systems covered

- **Google Search Console API**
- **Google Analytics Data API (GA4)**

---

## 3) Prerequisites

- [ ] Google Cloud project access with permission to enable APIs
- [ ] Access to Search Console property (`sc-domain:opensadhaka.com` preferred)
- [ ] Access to GA4 property used by production site
- [ ] Secure place to store service-account key locally and in deployment environments

---

## 4) Create service account

1. Go to Google Cloud Console.
2. Select or create project for search reporting automation.
3. Navigate to **IAM & Admin → Service Accounts**.
4. Create a service account (example: `sadhaka-search-reporting`).
5. Create JSON key for this account.

Recommended local path:

`/Users/ankitmishra/Developer/Sadhaka/.data/google-service-account.json`

> Keep this file out of git. Ensure `.data/` remains ignored.

---

## 5) Enable APIs

Enable both APIs in the same project:
- Search Console API
- Google Analytics Data API

---

## 6) Grant property access

## Search Console
- Add service-account email as a user for the target property.
- Recommended property id: `sc-domain:opensadhaka.com`.

## GA4
- Add service-account email with read access to GA4 property.
- Verify it can access event and landing-page dimensions/metrics needed for SEO reporting.

---

## 7) Local configuration expectations

- Store credentials at:
  - `.data/google-service-account.json`
- Use environment variables (example names):
  - `GOOGLE_SERVICE_ACCOUNT_KEY_PATH=.data/google-service-account.json`
  - `GSC_PROPERTY=sc-domain:opensadhaka.com`
  - `GA4_PROPERTY_ID=<your_property_id>`

Adjust variable names to match script implementation when wiring automation.

---

## 8) Security checklist

- [ ] Never commit the JSON key to git
- [ ] Restrict service-account permissions to minimum required scope
- [ ] Rotate keys if shared or exposed
- [ ] Store production secrets in deployment secret manager/env settings
- [ ] Document owner for credential lifecycle management

---

## 9) Verification checklist

- [ ] Search Console API call succeeds for target property
- [ ] GA4 Data API call succeeds for target property ID
- [ ] Output data includes expected dimensions/metrics used in scorecard workflow
- [ ] Access works in local/dev and production automation contexts

---

## 10) Blocked / unblocked state tracking

Use this lightweight table during setup:

| Area | Status | Owner | Notes |
|---|---|---|---|
| Cloud project + APIs | Blocked | Engineering | Confirm project id and API enablement state |
| Service account created | Blocked | Engineering | Create `sadhaka-search-reporting` service account |
| GSC property access granted | Blocked | SEO/Analytics | Grant SA email access to `sc-domain:opensadhaka.com` |
| GA4 property access granted | Blocked | Analytics | Grant SA read access to production GA4 property |
| Local key path configured | Blocked | Engineering | Place key at `.data/google-service-account.json` |
| Verification tests passed | Blocked | Engineering + Analytics | Run one successful GSC + GA4 API read per runbook |

### Current setup snapshot (update each control pass)

- **Current State:** Blocked (credentials and property grants pending confirmation)
- **Primary Blocker Owner:** Engineering + Analytics/Growth
- **Unblock condition:** All six rows above marked `Unblocked` with dated notes

### Environment variable contract (to keep aligned with scripts)

Record final adopted variable names here once scripts are wired:

| Variable | Expected Value | Status | Notes |
|---|---|---|---|
| `GOOGLE_SERVICE_ACCOUNT_KEY_PATH` | `.data/google-service-account.json` | Proposed | Confirm with implementation |
| `GSC_PROPERTY` | `sc-domain:opensadhaka.com` | Proposed | Confirm property scope |
| `GA4_PROPERTY_ID` | `<numeric_property_id>` | Proposed | Confirm production property id |

---

## 11) Future automation notes

After this setup is stable:
- wire API pulls into recurring evidence collection workflows,
- feed monthly KPI snapshot updates,
- and reduce manual data copy into scorecard/dashboard updates.

Do this only after validation-first operating rhythm is stable.