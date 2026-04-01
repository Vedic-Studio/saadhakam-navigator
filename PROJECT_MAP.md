# CMS Port Project Map

## 1. Editorial CMS domain
- `src/lib/cms/`
  - `types.ts` — CMS entities and API payload contracts
  - `frontmatter.ts` — markdown metadata parsing/serialization
  - `storage.ts` — SQLite-backed queue/version/review state + file storage
  - `markdown.ts` — pilot-content-to-markdown conversion helpers
- `src/components/cms/`
  - `CmsMarkdownContent.tsx` — runtime renderer for CMS-managed markdown
  - `editor-desk/` — Next/App Router adaptation of Editor Desk UI
- `src/app/api/cms/`
  - `queue/route.ts` — editorial queue listing
  - `articles/[slug]/route.ts` — detail workspace payload
  - `articles/[slug]/content/route.ts` — save version
  - `articles/[slug]/review/route.ts` — review actions
  - `articles/[slug]/publish/route.ts` — publish/unpublish toggle

## 2. Tracked content source of truth
- `src/content/cms/articles/<slug>/current.md`
- `src/content/cms/articles/<slug>/versions/vNNN.md`

## 3. Runtime integration
- `src/components/ArticleLayout.tsx`
  - CMS-first rendering for published markdown
  - legacy TSX body fallback for unmigrated articles
- `src/app/content-agent/editor-desk/**`
  - queue + review workspace surfaces mounted inside Sadhaka

## 4. Migration scaffolding
- Seed all registered article metadata into CMS index
- Auto-import pilot/data-driven articles into markdown
- Mark legacy inline-TSX articles as fallback-backed until manually migrated

## 5. Verification
- `src/lib/cms/*.test.ts`
- `src/app/api/cms/**/*.test.ts`