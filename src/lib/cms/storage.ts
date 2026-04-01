import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import postgres, { type Sql } from "postgres";
import { articles, getArticleBySlug, type ArticleMeta } from "@/data/articles";
import { buildPilotCmsMarkdown } from "./markdown";
import type {
    CmsArticleIntake,
    CmsArticleDetail,
    CmsQueueArticle,
    CmsReview,
    CmsReviewAction,
    CmsSourceKind,
    CmsStage,
    CmsVersion,
} from "./types";

const CMS_ROOT = join(process.cwd(), "src", "content", "cms", "articles");
const DB_PATH = join(process.cwd(), ".data", "cms.sqlite");
const POSTGRES_URL = process.env.POSTGRES_URL;
const HAS_POSTGRES = Boolean(POSTGRES_URL);

const postgresSql: Sql | null = POSTGRES_URL
    ? postgres(POSTGRES_URL, {
        ssl: "require",
        prepare: false,
        max: 1,
    })
    : null;

let cmsBootstrapPromise: Promise<void> | null = null;
let publishedCmsContentMapPromise: Promise<Map<string, string>> | null = null;

type SqlScalar = string | number | null | undefined;

type CmsArticleRow = {
    slug: string;
    headline: string;
    stage: CmsStage;
    format: string;
    batch_label?: string | null;
    word_count: number;
    created_at: string;
    updated_at: string;
    published: boolean | number;
    published_version: number | null;
    source_kind: CmsSourceKind;
    legacy_route: string | null;
    topic?: string | null;
    goal?: string | null;
    audience?: string | null;
    page_type?: string | null;
    version_count?: number;
};

type CmsVersionRow = {
    version: number;
    file_path?: string | null;
    content?: string | null;
    note: string | null;
    created_at: string;
};

type CmsReviewRow = {
    action: CmsReviewAction;
    comment: string;
    version: number;
    created_at: string;
};

function getPostgresSql(): Sql {
    if (!postgresSql) {
        throw new Error("POSTGRES_URL is not configured");
    }

    return postgresSql;
}

function sqlString(value: SqlScalar): string {
    if (value === null || value === undefined) {
        return "NULL";
    }
    if (typeof value === "number") {
        return `${value}`;
    }
    return `'${value.replaceAll("'", "''")}'`;
}

function runSql(sqlText: string): void {
    execFileSync("sqlite3", [DB_PATH, sqlText], { stdio: "ignore" });
}

function selectSql<T>(sqlText: string): T[] {
    const raw = execFileSync("sqlite3", ["-json", DB_PATH, sqlText], { encoding: "utf8" }).trim();
    if (!raw) {
        return [];
    }
    return JSON.parse(raw) as T[];
}

function getArticleDir(slug: string): string {
    return join(CMS_ROOT, slug);
}

function getCurrentMarkdownPath(slug: string): string {
    return join(getArticleDir(slug), "current.md");
}

function getVersionMarkdownPath(slug: string, version: number): string {
    return join(getArticleDir(slug), "versions", `v${String(version).padStart(3, "0")}.md`);
}

function toArticleIntake(row?: Partial<CmsArticleRow> & Record<string, unknown>): CmsArticleIntake | undefined {
    const topic = typeof row?.topic === "string" ? row.topic : undefined;
    const goal = typeof row?.goal === "string" ? row.goal : undefined;
    const audience = typeof row?.audience === "string" ? row.audience : undefined;
    const pageType = typeof row?.page_type === "string" ? row.page_type : undefined;

    if (!topic && !goal && !audience && !pageType) {
        return undefined;
    }

    return { topic, goal, audience, pageType };
}

function createQueueArticle(
    meta: Pick<ArticleMeta, "slug" | "title" | "pillar" | "publishDate">,
    row?: Partial<CmsArticleRow> & Record<string, unknown>,
): CmsQueueArticle {
    const hasCmsContent = Boolean(row?.version_count && Number(row.version_count) > 0);
    const sourceKind = (row?.source_kind as CmsSourceKind | undefined) || (hasCmsContent ? "cms-native" : "legacy-page");
    const stage = (row?.stage as CmsStage | undefined) || (hasCmsContent ? "published" : "legacy");
    const isKnownRoute = Boolean(getArticleBySlug(meta.slug));

    return {
        slug: meta.slug,
        headline: meta.title,
        batch: typeof row?.batch_label === "string" && row.batch_label ? row.batch_label : meta.pillar,
        format: typeof row?.format === "string" && row.format ? row.format : "long-form article",
        stage,
        wordCount: Math.max(0, Math.round(Number(row?.word_count || 0))),
        createdAt: (row?.created_at as string | undefined) || meta.publishDate,
        updatedAt: (row?.updated_at as string | undefined) || meta.publishDate,
        published: Boolean(row?.published),
        sourceKind,
        hasCmsContent,
        canPublish: isKnownRoute,
        intake: toArticleIntake(row),
    };
}

function createFallbackMeta(slug: string, row?: Partial<CmsArticleRow> & Record<string, unknown>): Pick<ArticleMeta, "slug" | "title" | "pillar" | "publishDate"> {
    const createdAt = (row?.created_at as string | undefined) || new Date().toISOString();

    return {
        slug,
        title: (typeof row?.headline === "string" && row.headline) || (typeof row?.topic === "string" && row.topic) || slug,
        pillar: "practical-practices",
        publishDate: createdAt,
    };
}

function resolveArticleMeta(slug: string, row?: Partial<CmsArticleRow> & Record<string, unknown>) {
    return getArticleBySlug(slug) ?? createFallbackMeta(slug, row);
}

function deriveMigrationState(slug: string, versions: CmsVersion[]) {
    if (versions.length === 0) {
        return "legacy-fallback" as const;
    }

    return getArticleBySlug(slug) ? ("cms" as const) : ("cms-native" as const);
}

function slugifyTopic(input: string): string {
    return input
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/[-\s]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
}

async function slugExists(slug: string): Promise<boolean> {
    if (getArticleBySlug(slug)) {
        return true;
    }

    await ensureCmsBootstrap();

    if (HAS_POSTGRES) {
        const sql = getPostgresSql();
        const rows = await sql<{ slug: string }[]>`
            SELECT slug FROM cms_articles WHERE slug = ${slug} LIMIT 1;
        `;
        return rows.length > 0;
    }

    const rows = selectSql<{ slug: string }>(`
        SELECT slug FROM cms_articles WHERE slug = ${sqlString(slug)} LIMIT 1;
    `);
    return rows.length > 0;
}

export async function generateUniqueCmsSlug(topic: string): Promise<string> {
    const baseSlug = slugifyTopic(topic) || `draft-${Date.now()}`;
    let candidate = baseSlug;
    let counter = 2;

    while (await slugExists(candidate)) {
        candidate = `${baseSlug}-${counter}`;
        counter += 1;
    }

    return candidate;
}

export async function upsertCmsArticleDraft(params: {
    slug: string;
    headline: string;
    content: string;
    format?: string;
    batch?: string;
    topic?: string;
    goal?: string;
    audience?: string;
    pageType?: string;
    note?: string;
}): Promise<{ slug: string; version: CmsVersion }> {
    await ensureCmsBootstrap();

    const now = new Date().toISOString();
    const wordCount = params.content.split(/\s+/).filter(Boolean).length;
    const format = params.format || "generated draft";
    const batch = params.batch || "cms-generated";

    if (HAS_POSTGRES) {
        const sql = getPostgresSql();
        await sql`
            INSERT INTO cms_articles (
                slug, headline, stage, format, batch_label, word_count, created_at, updated_at, published, published_version, source_kind, legacy_route, topic, goal, audience, page_type
            ) VALUES (
                ${params.slug},
                ${params.headline},
                ${"draft"},
                ${format},
                ${batch},
                ${wordCount},
                ${now},
                ${now},
                ${false},
                ${null},
                ${"cms-native"},
                ${null},
                ${params.topic || null},
                ${params.goal || null},
                ${params.audience || null},
                ${params.pageType || null}
            )
            ON CONFLICT (slug) DO UPDATE SET
                headline = EXCLUDED.headline,
                stage = EXCLUDED.stage,
                format = EXCLUDED.format,
                batch_label = EXCLUDED.batch_label,
                word_count = EXCLUDED.word_count,
                updated_at = EXCLUDED.updated_at,
                source_kind = EXCLUDED.source_kind,
                topic = EXCLUDED.topic,
                goal = EXCLUDED.goal,
                audience = EXCLUDED.audience,
                page_type = EXCLUDED.page_type,
                published = FALSE,
                published_version = NULL,
                legacy_route = NULL;
        `;
    } else {
        runSql(`
            INSERT INTO cms_articles (
                slug, headline, stage, format, batch_label, word_count, created_at, updated_at, published, published_version, source_kind, legacy_route, topic, goal, audience, page_type
            ) VALUES (
                ${sqlString(params.slug)},
                ${sqlString(params.headline)},
                'draft',
                ${sqlString(format)},
                ${sqlString(batch)},
                ${sqlString(wordCount)},
                ${sqlString(now)},
                ${sqlString(now)},
                0,
                NULL,
                'cms-native',
                NULL,
                ${sqlString(params.topic || null)},
                ${sqlString(params.goal || null)},
                ${sqlString(params.audience || null)},
                ${sqlString(params.pageType || null)}
            )
            ON CONFLICT(slug) DO UPDATE SET
                headline = excluded.headline,
                stage = excluded.stage,
                format = excluded.format,
                batch_label = excluded.batch_label,
                word_count = excluded.word_count,
                updated_at = excluded.updated_at,
                source_kind = excluded.source_kind,
                topic = excluded.topic,
                goal = excluded.goal,
                audience = excluded.audience,
                page_type = excluded.page_type,
                published = 0,
                published_version = NULL,
                legacy_route = NULL;
        `);
    }

    const version = await saveCmsContent(params.slug, params.content, params.note || "Initial generated draft");
    return { slug: params.slug, version };
}

function estimateWordCount(meta: ArticleMeta): number {
    return meta.readingTime * 220;
}

async function persistLocalVersion(slug: string, version: number, content: string, note?: string): Promise<void> {
    const versionPath = getVersionMarkdownPath(slug, version);
    const currentPath = getCurrentMarkdownPath(slug);
    await mkdir(dirname(versionPath), { recursive: true });
    await writeFile(versionPath, content, "utf8");
    await writeFile(currentPath, content, "utf8");

    runSql(`
        INSERT OR REPLACE INTO cms_versions (slug, version, file_path, content, note, created_at)
        VALUES (
            ${sqlString(slug)},
            ${sqlString(version)},
            ${sqlString(versionPath)},
            ${sqlString(content)},
            ${sqlString(note || "")},
            ${sqlString(new Date().toISOString())}
        );
    `);
}

async function ensureLocalCmsBootstrap(): Promise<void> {
    await mkdir(dirname(DB_PATH), { recursive: true });
    await mkdir(CMS_ROOT, { recursive: true });

    runSql(`
        CREATE TABLE IF NOT EXISTS cms_articles (
            slug TEXT PRIMARY KEY,
            headline TEXT NOT NULL,
            stage TEXT NOT NULL,
            format TEXT NOT NULL,
            batch_label TEXT,
            word_count INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            published INTEGER NOT NULL DEFAULT 0,
            published_version INTEGER,
            source_kind TEXT NOT NULL,
            legacy_route TEXT,
            topic TEXT,
            goal TEXT,
            audience TEXT,
            page_type TEXT
        );

        CREATE TABLE IF NOT EXISTS cms_versions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT NOT NULL,
            version INTEGER NOT NULL,
            file_path TEXT,
            content TEXT,
            note TEXT,
            created_at TEXT NOT NULL,
            UNIQUE (slug, version)
        );

        CREATE TABLE IF NOT EXISTS cms_reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT NOT NULL,
            action TEXT NOT NULL,
            comment TEXT NOT NULL,
            version INTEGER NOT NULL,
            created_at TEXT NOT NULL
        );
    `);

    const versionColumns = selectSql<{ name: string }>(`PRAGMA table_info(cms_versions);`);
    const hasContentColumn = versionColumns.some((column) => column.name === "content");
    if (!hasContentColumn) {
        runSql(`ALTER TABLE cms_versions ADD COLUMN content TEXT;`);
    }

    const articleColumns = selectSql<{ name: string }>(`PRAGMA table_info(cms_articles);`);
    const requiredArticleColumns = [
        { name: "batch_label", sql: "ALTER TABLE cms_articles ADD COLUMN batch_label TEXT;" },
        { name: "topic", sql: "ALTER TABLE cms_articles ADD COLUMN topic TEXT;" },
        { name: "goal", sql: "ALTER TABLE cms_articles ADD COLUMN goal TEXT;" },
        { name: "audience", sql: "ALTER TABLE cms_articles ADD COLUMN audience TEXT;" },
        { name: "page_type", sql: "ALTER TABLE cms_articles ADD COLUMN page_type TEXT;" },
    ];

    for (const column of requiredArticleColumns) {
        if (!articleColumns.some((existing) => existing.name === column.name)) {
            runSql(column.sql);
        }
    }

    for (const meta of articles) {
        const now = meta.publishDate;
        runSql(`
            INSERT INTO cms_articles (
                slug, headline, stage, format, word_count, created_at, updated_at, published, published_version, source_kind, legacy_route
            ) VALUES (
                ${sqlString(meta.slug)},
                ${sqlString(meta.title)},
                ${sqlString("legacy")},
                ${sqlString("long-form article")},
                ${sqlString(estimateWordCount(meta))},
                ${sqlString(now)},
                ${sqlString(meta.publishDate)},
                0,
                NULL,
                ${sqlString("legacy-page")},
                ${sqlString(meta.route)}
            )
            ON CONFLICT(slug) DO UPDATE SET
                headline = excluded.headline,
                word_count = excluded.word_count,
                updated_at = excluded.updated_at,
                legacy_route = excluded.legacy_route;
        `);

        const pilotMarkdown = buildPilotCmsMarkdown(meta);
        if (pilotMarkdown) {
            const existingVersions = selectSql<{ count: number }>(
                `SELECT COUNT(*) as count FROM cms_versions WHERE slug = ${sqlString(meta.slug)};`,
            )[0]?.count;
            if (!existingVersions) {
                await persistLocalVersion(meta.slug, 1, pilotMarkdown, "Initial import from pilot article content");
                runSql(`
                    UPDATE cms_articles
                    SET stage = 'published',
                        published = 1,
                        published_version = 1,
                        source_kind = 'pilot-import',
                        updated_at = ${sqlString(meta.publishDate)}
                    WHERE slug = ${sqlString(meta.slug)};
                `);
            }
        }
    }
}

async function ensurePostgresCmsBootstrap(): Promise<void> {
    const sql = getPostgresSql();

    await sql`
        CREATE TABLE IF NOT EXISTS cms_articles (
            slug TEXT PRIMARY KEY,
            headline TEXT NOT NULL,
            stage TEXT NOT NULL,
            format TEXT NOT NULL,
            batch_label TEXT,
            word_count INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            published BOOLEAN NOT NULL DEFAULT FALSE,
            published_version INTEGER,
            source_kind TEXT NOT NULL,
            legacy_route TEXT,
            topic TEXT,
            goal TEXT,
            audience TEXT,
            page_type TEXT
        );
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS cms_versions (
            id SERIAL PRIMARY KEY,
            slug TEXT NOT NULL,
            version INTEGER NOT NULL,
            content TEXT NOT NULL,
            note TEXT,
            created_at TEXT NOT NULL,
            UNIQUE (slug, version)
        );
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS cms_reviews (
            id SERIAL PRIMARY KEY,
            slug TEXT NOT NULL,
            action TEXT NOT NULL,
            comment TEXT NOT NULL,
            version INTEGER NOT NULL,
            created_at TEXT NOT NULL
        );
    `;

    for (const meta of articles) {
        await sql`
            INSERT INTO cms_articles (
                slug, headline, stage, format, word_count, created_at, updated_at, published, published_version, source_kind, legacy_route
            ) VALUES (
                ${meta.slug},
                ${meta.title},
                ${"legacy"},
                ${"long-form article"},
                ${estimateWordCount(meta)},
                ${meta.publishDate},
                ${meta.publishDate},
                ${false},
                ${null},
                ${"legacy-page"},
                ${meta.route}
            )
            ON CONFLICT (slug) DO UPDATE SET
                headline = EXCLUDED.headline,
                word_count = EXCLUDED.word_count,
                updated_at = EXCLUDED.updated_at,
                legacy_route = EXCLUDED.legacy_route;
        `;

        const pilotMarkdown = buildPilotCmsMarkdown(meta);
        if (!pilotMarkdown) continue;

        const existing = await sql<{ count: string }[]>`
            SELECT COUNT(*)::text as count FROM cms_versions WHERE slug = ${meta.slug};
        `;
        const existingCount = Number(existing[0]?.count || 0);
        if (existingCount > 0) continue;

        await sql`
            INSERT INTO cms_versions (slug, version, content, note, created_at)
            VALUES (
                ${meta.slug},
                ${1},
                ${pilotMarkdown},
                ${"Initial import from pilot article content"},
                ${new Date(meta.publishDate).toISOString()}
            )
            ON CONFLICT (slug, version) DO NOTHING;
        `;

        await sql`
            UPDATE cms_articles
            SET stage = ${"published"},
                published = ${true},
                published_version = ${1},
                source_kind = ${"pilot-import"},
                updated_at = ${meta.publishDate}
            WHERE slug = ${meta.slug};
        `;
    }
}

export async function ensureCmsBootstrap(): Promise<void> {
    if (!cmsBootstrapPromise) {
        cmsBootstrapPromise = HAS_POSTGRES ? ensurePostgresCmsBootstrap() : ensureLocalCmsBootstrap();
    }

    await cmsBootstrapPromise;
}

async function getPublishedCmsContentMap(): Promise<Map<string, string>> {
    await ensureCmsBootstrap();

    if (!publishedCmsContentMapPromise) {
        publishedCmsContentMapPromise = (async () => {
            if (HAS_POSTGRES) {
                const sql = getPostgresSql();
                const rows = await sql<{ slug: string; content: string }[]>`
                    SELECT a.slug, v.content
                    FROM cms_articles a
                    JOIN cms_versions v ON v.slug = a.slug AND v.version = a.published_version
                    WHERE a.published = true AND a.published_version IS NOT NULL;
                `;

                return new Map(rows.map((row) => [row.slug, row.content]));
            }

            const rows = selectSql<{ slug: string; content: string | null }>(`
                SELECT a.slug, v.content
                FROM cms_articles a
                JOIN cms_versions v ON v.slug = a.slug AND v.version = a.published_version
                WHERE a.published = 1 AND a.published_version IS NOT NULL;
            `);

            return new Map(rows.filter((row) => Boolean(row.content)).map((row) => [row.slug, row.content || ""]));
        })();
    }

    return publishedCmsContentMapPromise;
}

async function getLocalVersions(slug: string): Promise<CmsVersion[]> {
    const versions = selectSql<CmsVersionRow>(`
        SELECT version, file_path, content, note, created_at
        FROM cms_versions
        WHERE slug = ${sqlString(slug)}
        ORDER BY version ASC;
    `);

    return Promise.all(
        versions.map(async (versionRow) => {
            const fallbackFilename = `v${String(versionRow.version).padStart(3, "0")}.md`;
            const content =
                versionRow.content ??
                (versionRow.file_path ? await readFile(versionRow.file_path, "utf8") : "");

            return {
                version: versionRow.version,
                filename: versionRow.file_path?.split("/").pop() || fallbackFilename,
                content,
                createdAt: versionRow.created_at,
                note: versionRow.note || undefined,
            };
        }),
    );
}

async function getPostgresVersions(slug: string): Promise<CmsVersion[]> {
    const sql = getPostgresSql();
    const result = await sql<CmsVersionRow[]>`
        SELECT version, content, note, created_at
        FROM cms_versions
        WHERE slug = ${slug}
        ORDER BY version ASC;
    `;

    return result.map((versionRow) => ({
        version: versionRow.version,
        filename: `v${String(versionRow.version).padStart(3, "0")}.md`,
        content: versionRow.content || "",
        createdAt: versionRow.created_at,
        note: versionRow.note || undefined,
    }));
}

export async function getCmsQueue(): Promise<CmsQueueArticle[]> {
    await ensureCmsBootstrap();

    if (HAS_POSTGRES) {
        const sql = getPostgresSql();
        const result = await sql<CmsArticleRow[]>`
            SELECT a.*, COUNT(v.id)::int as version_count
            FROM cms_articles a
            LEFT JOIN cms_versions v ON v.slug = a.slug
            GROUP BY a.slug
            ORDER BY a.updated_at DESC, a.slug ASC;
        `;

        return result
            .map((row) => {
                const meta = resolveArticleMeta(String(row.slug), row);
                return createQueueArticle(meta, row);
            })
            .filter((value): value is CmsQueueArticle => Boolean(value));
    }

    const rows = selectSql<Record<string, unknown>>(`
        SELECT a.*, COUNT(v.id) as version_count
        FROM cms_articles a
        LEFT JOIN cms_versions v ON v.slug = a.slug
        GROUP BY a.slug
        ORDER BY datetime(a.updated_at) DESC, a.slug ASC;
    `);

    return rows
        .map((row) => {
            const meta = resolveArticleMeta(String(row.slug), row);
            return createQueueArticle(meta, row);
        })
        .filter((value): value is CmsQueueArticle => Boolean(value));
}

export async function getCmsArticleDetail(slug: string): Promise<CmsArticleDetail | null> {
    await ensureCmsBootstrap();

    if (HAS_POSTGRES) {
        const sql = getPostgresSql();
        const articleResult = await sql<CmsArticleRow[]>`
            SELECT a.*, COUNT(v.id)::int as version_count
            FROM cms_articles a
            LEFT JOIN cms_versions v ON v.slug = a.slug
            WHERE a.slug = ${slug}
            GROUP BY a.slug;
        `;
        const articleRow = articleResult[0];
        if (!articleRow) {
            return null;
        }
        const meta = resolveArticleMeta(slug, articleRow);
        const versions = await getPostgresVersions(slug);
        const reviewsResult = await sql<CmsReviewRow[]>`
            SELECT action, comment, version, created_at
            FROM cms_reviews
            WHERE slug = ${slug}
            ORDER BY id DESC;
        `;
        const latestVersion = versions[versions.length - 1];

        return {
            article: createQueueArticle(meta, articleRow),
            meta: getArticleBySlug(slug),
            content: latestVersion?.content || "",
            versions,
            reviews: reviewsResult.map((review) => ({
                action: review.action,
                comment: review.comment,
                version: review.version,
                createdAt: review.created_at,
            })),
            score: null,
            migrationState: deriveMigrationState(slug, versions),
        };
    }

    const articleRow = selectSql<Record<string, unknown>>(`
        SELECT a.*, COUNT(v.id) as version_count
        FROM cms_articles a
        LEFT JOIN cms_versions v ON v.slug = a.slug
        WHERE a.slug = ${sqlString(slug)}
        GROUP BY a.slug;
    `)[0];
    if (!articleRow) {
        return null;
    }
    const meta = resolveArticleMeta(slug, articleRow);
    const versions = await getLocalVersions(slug);
    const reviews = selectSql<CmsReviewRow>(`
        SELECT action, comment, version, created_at
        FROM cms_reviews
        WHERE slug = ${sqlString(slug)}
        ORDER BY id DESC;
    `);
    const latestVersion = versions[versions.length - 1];

    return {
        article: createQueueArticle(meta, articleRow),
        meta: getArticleBySlug(slug),
        content: latestVersion?.content || "",
        versions,
        reviews: reviews.map((review): CmsReview => ({
            action: review.action,
            comment: review.comment,
            version: review.version,
            createdAt: review.created_at,
        })),
        score: null,
        migrationState: deriveMigrationState(slug, versions),
    };
}

export async function saveCmsContent(slug: string, content: string, note?: string): Promise<CmsVersion> {
    await ensureCmsBootstrap();
    const createdAt = new Date().toISOString();
    const wordCount = content.split(/\s+/).filter(Boolean).length;

    if (HAS_POSTGRES) {
        const sql = getPostgresSql();
        const nextResult = await sql<{ next_version: number }[]>`
            SELECT COALESCE(MAX(version), 0) + 1 as next_version
            FROM cms_versions
            WHERE slug = ${slug};
        `;
        const nextVersion = Number(nextResult[0]?.next_version || 1);

        await sql`
            INSERT INTO cms_versions (slug, version, content, note, created_at)
            VALUES (${slug}, ${nextVersion}, ${content}, ${note || ""}, ${createdAt});
        `;

        await sql`
            UPDATE cms_articles
            SET stage = ${"review"},
                word_count = ${wordCount},
                updated_at = ${createdAt},
                source_kind = CASE WHEN source_kind = 'legacy-page' THEN 'cms-native' ELSE source_kind END
            WHERE slug = ${slug};
        `;

        return {
            version: nextVersion,
            filename: `v${String(nextVersion).padStart(3, "0")}.md`,
            content,
            createdAt,
            note,
        };
    }

    const [{ next_version: nextVersion }] = selectSql<{ next_version: number }>(`
        SELECT COALESCE(MAX(version), 0) + 1 as next_version
        FROM cms_versions
        WHERE slug = ${sqlString(slug)};
    `);

    await persistLocalVersion(slug, nextVersion, content, note);

    runSql(`
        UPDATE cms_articles
        SET stage = 'review',
            word_count = ${sqlString(wordCount)},
            updated_at = ${sqlString(createdAt)},
            source_kind = CASE WHEN source_kind = 'legacy-page' THEN 'cms-native' ELSE source_kind END
        WHERE slug = ${sqlString(slug)};
    `);

    return {
        version: nextVersion,
        filename: `v${String(nextVersion).padStart(3, "0")}.md`,
        content,
        createdAt,
        note,
    };
}

export async function submitCmsReview(slug: string, action: CmsReviewAction, comment: string): Promise<CmsReview> {
    await ensureCmsBootstrap();
    const createdAt = new Date().toISOString();

    if (HAS_POSTGRES) {
        const sql = getPostgresSql();
        const currentResult = await sql<{ current_version: number }[]>`
            SELECT COALESCE(MAX(version), 0) as current_version
            FROM cms_versions
            WHERE slug = ${slug};
        `;
        const currentVersion = Number(currentResult[0]?.current_version || 0);

        await sql`
            INSERT INTO cms_reviews (slug, action, comment, version, created_at)
            VALUES (${slug}, ${action}, ${comment}, ${currentVersion}, ${createdAt});
        `;

        const nextStage = action === "approve" ? "published" : action === "reject" ? "rejected" : "edit";
        await sql`
            UPDATE cms_articles
            SET stage = ${nextStage},
                updated_at = ${createdAt}
            WHERE slug = ${slug};
        `;

        return { action, comment, version: currentVersion, createdAt };
    }

    const [{ current_version: currentVersion }] = selectSql<{ current_version: number }>(`
        SELECT COALESCE(MAX(version), 0) as current_version
        FROM cms_versions
        WHERE slug = ${sqlString(slug)};
    `);

    runSql(`
        INSERT INTO cms_reviews (slug, action, comment, version, created_at)
        VALUES (
            ${sqlString(slug)},
            ${sqlString(action)},
            ${sqlString(comment)},
            ${sqlString(currentVersion)},
            ${sqlString(createdAt)}
        );
    `);

    const nextStage = action === "approve" ? "published" : action === "reject" ? "rejected" : "edit";
    runSql(`
        UPDATE cms_articles
        SET stage = ${sqlString(nextStage)},
            updated_at = ${sqlString(createdAt)}
        WHERE slug = ${sqlString(slug)};
    `);

    return { action, comment, version: currentVersion, createdAt };
}

export async function setCmsPublished(slug: string, published: boolean): Promise<void> {
    await ensureCmsBootstrap();
    const updatedAt = new Date().toISOString();
    const existingMeta = getArticleBySlug(slug);

    if (!existingMeta && published) {
        throw new Error("Publishing is disabled for CMS-native drafts until public route support is added");
    }

    if (HAS_POSTGRES) {
        const sql = getPostgresSql();
        const currentResult = await sql<{ current_version: number }[]>`
            SELECT COALESCE(MAX(version), 0) as current_version
            FROM cms_versions
            WHERE slug = ${slug};
        `;
        const currentVersion = Number(currentResult[0]?.current_version || 0);

        await sql`
            UPDATE cms_articles
            SET published = ${published},
                published_version = ${published && currentVersion > 0 ? currentVersion : null},
                stage = ${published ? "published" : "edit"},
                updated_at = ${updatedAt}
            WHERE slug = ${slug};
        `;
        return;
    }

    const [{ current_version: currentVersion }] = selectSql<{ current_version: number }>(`
        SELECT COALESCE(MAX(version), 0) as current_version
        FROM cms_versions
        WHERE slug = ${sqlString(slug)};
    `);

    runSql(`
        UPDATE cms_articles
        SET published = ${published ? 1 : 0},
            published_version = ${published && currentVersion > 0 ? currentVersion : "NULL"},
            stage = ${sqlString(published ? "published" : "edit")},
            updated_at = ${sqlString(updatedAt)}
        WHERE slug = ${sqlString(slug)};
    `);
}

export async function getPublishedCmsContent(slug: string): Promise<string | null> {
    try {
        const publishedContentMap = await getPublishedCmsContentMap();
        if (publishedContentMap.has(slug)) {
            return publishedContentMap.get(slug) || null;
        }

        if (HAS_POSTGRES) {
            return null;
        }

        const row = selectSql<{ published: number; published_version: number | null }>(`
            SELECT published, published_version
            FROM cms_articles
            WHERE slug = ${sqlString(slug)};
        `)[0];

        if (!row?.published || !row.published_version) {
            return null;
        }

        const contentRow = selectSql<{ content: string | null }>(`
            SELECT content
            FROM cms_versions
            WHERE slug = ${sqlString(slug)} AND version = ${sqlString(row.published_version)}
            LIMIT 1;
        `)[0];
        if (contentRow?.content) {
            return contentRow.content;
        }

        const path = getVersionMarkdownPath(slug, row.published_version);
        if (!existsSync(path)) {
            return null;
        }

        return readFile(path, "utf8");
    } catch (error) {
        console.error(
            `[cms] Failed to load published CMS content for slug '${slug}', falling back to bundled article content.`,
            error,
        );
        return null;
    }
}
