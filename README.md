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

### Frontend

```sh
npm install
npm run dev
```

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
