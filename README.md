# Sadhaka

Sadhaka is a content-rich spiritual knowledge site built on a canonical Next.js App Router frontend with a small FastAPI backend for content-agent workflows. The production-facing web app lives at the repository root. Older Vite/Lovable-era files remain only as quarantined legacy residue and are not the active frontend runtime.

## Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui
- Testing: Vitest, Testing Library
- Backend: FastAPI, SQLAlchemy, Pydantic
- Content: editorial articles, programmatic entity pages, Bhagavad Gita text, stotras, sahasranamas

## Frontend runtime boundary

The root app is the source of truth:

- active frontend app: `src/app`
- shared UI/components: `src/components`
- editorial/programmatic content data: `src/data`, `src/content`, `content/`
- article domain helpers: `src/features/articles`

Legacy Vite-era files are intentionally not part of the current runtime:

- `src/App.tsx`
- `src/main.tsx`
- `src/legacy_pages/**`
- `index.html`
- `vite.config.ts`

These legacy files are currently retained for reference only and should not be used as the basis for new work.

## Local development

### Content agent frontend ↔ backend wiring

The `/content-agent` workbench and pipeline endpoints in the Next.js app proxy to the FastAPI content-agent backend via:

- `CONTENT_AGENT_API_BASE`
- or `NEXT_PUBLIC_CONTENT_AGENT_API_BASE`

Local default behavior in non-production falls back to:

- `http://localhost:8000/api`

Recommended local root `.env.local` entry:

```sh
CONTENT_AGENT_API_BASE=http://localhost:8000/api
```

Production must set this explicitly in the frontend deployment environment. Current production backend base URL:

```sh
CONTENT_AGENT_API_BASE=https://content-agent.opensadhaka.com/api
```

Important: this value belongs in the **frontend deployment env** (for the Next.js app / Vercel project), not only in the backend env.

### Frontend

```sh
npm install
npm run dev
```

### Frontend analytics env vars

The Next.js app's analytics routes require frontend deployment env vars for Google Search Console and GA4 access.

Recommended local / Vercel envs:

```sh
# Base64-encoded contents of the full Google service account JSON key.
# Preferred for Vercel / production because the app no longer relies on a checked-out file in .data/.
GOOGLE_SERVICE_ACCOUNT_JSON_BASE64=eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwiY2xpZW50X2VtYWlsIjoiLi4uIn0=

# Optional local fallback only. If GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is absent,
# the app falls back to GOOGLE_SERVICE_ACCOUNT_FILE, then .data/google-service-account.json.
GOOGLE_SERVICE_ACCOUNT_FILE=/absolute/path/to/google-service-account.json

# GSC site selector used by analytics routes.
GSC_SITE_URL=sc-domain:opensadhaka.com

# Required for /api/analytics/ga4.
GA4_PROPERTY_ID=123456789
```

Production should set `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64` and `GA4_PROPERTY_ID` explicitly in the frontend deployment environment.

### Frontend tests

```sh
npm run test:run
npm run test:coverage
```

### Backend

```sh
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

### Backend tests

```sh
cd backend
poetry run pytest --cov=app --cov-report=term-missing
```

## Notes on backend startup behavior

The backend no longer assumes startup-time schema creation or knowledge reloads by default. Both behaviors are now explicit via environment flags:

- `SADHAKA_AUTO_CREATE_SCHEMA_ON_STARTUP`
- `SADHAKA_KNOWLEDGE_REFRESH_ON_STARTUP`

This keeps local/test startup lighter and makes schema management more explicit.

## CMS deployment notes

The editorial CMS is available at:

- `/content-agent/editor-desk`

For local development, the CMS can still use the existing local SQLite/filesystem storage.

For deployed environments, the CMS now supports hosted persistence via Postgres when:

- `POSTGRES_URL` is set

Recommended production setup on Vercel:

1. Connect the GitHub repo to Vercel
2. Provision a hosted Postgres database for the project
3. Add the database connection env vars in Vercel
4. Add content-agent backend routing env var in Vercel:
   - `CONTENT_AGENT_API_BASE=https://content-agent.opensadhaka.com/api`
5. Add CMS protection env vars:
   - `CMS_BASIC_AUTH_USER`
   - `CMS_BASIC_AUTH_PASSWORD`
6. Push to `main` to trigger production deployment

Behavior:

- Push to `main` → site auto-deploys on Vercel
- CMS “Publish” action → marks the current CMS version as the live article version

If `CMS_BASIC_AUTH_USER` and `CMS_BASIC_AUTH_PASSWORD` are set, the following paths are protected with Basic Auth:

- `/content-agent/**`
- `/api/cms/**`
