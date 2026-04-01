import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { sql } from "@vercel/postgres";
import { articles, getArticleBySlug, type ArticleMeta } from "@/data/articles";
import { buildPilotCmsMarkdown } from "./markdown";
import type {
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
const HAS_POSTGRES = Boolean(process.env.POSTGRES_URL);

type SqlScalar = string | number | null | undefined;

type CmsArticleRow = {
    slug: string;
    headline: string;
    stage: CmsStage;
    format: string;
    word_count: number;
    created_at: string;
    updated_at: string;
    published: boolean | number;
    published_version: number | null;
    source_kind: CmsSourceKind;
    legacy_route: string | null;
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

function createQueueArticle(meta: ArticleMeta, row?: Partial<CmsArticleRow> & Record<string, unknown>): CmsQueueArticle {
    const hasCmsContent = Boolean(row?.version_count && Number(row.version_count) > 0);
    const sourceKind = (row?.source_kind as CmsSourceKind | undefined) || (hasCmsContent ? "cms-native" : "legacy-page");
    const stage = (row?.stage as CmsStage | undefined) || (hasCmsContent ? "published" : "legacy");

    return {
        slug: meta.slug,
        headline: meta.title,
        batch: meta.pillar,
        format: "long-form article",
        stage,
        wordCount: Math.max(0, Math.round(Number(row?.word_count || 0))),
        createdAt: (row?.created_at as string | undefined) || meta.publishDate,
        updatedAt: (row?.updated_at as string | undefined) || meta.publishDate,
        published: Boolean(row?.published),
        sourceKind,
        hasCmsContent,
    };
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
            word_count INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            published INTEGER NOT NULL DEFAULT 0,
            published_version INTEGER,
            source_kind TEXT NOT NULL,
            legacy_route TEXT
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
    await sql`
        CREATE TABLE IF NOT EXISTS cms_articles (
            slug TEXT PRIMARY KEY,
            headline TEXT NOT NULL,
            stage TEXT NOT NULL,
            format TEXT NOT NULL,
            word_count INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            published BOOLEAN NOT NULL DEFAULT FALSE,
            published_version INTEGER,
            source_kind TEXT NOT NULL,
            legacy_route TEXT
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

        const existing = await sql<{ count: string }>`
            SELECT COUNT(*)::text as count FROM cms_versions WHERE slug = ${meta.slug};
        `;
        const existingCount = Number(existing.rows[0]?.count || 0);
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
    if (HAS_POSTGRES) {
        await ensurePostgresCmsBootstrap();
        return;
    }
    await ensureLocalCmsBootstrap();
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
    const result = await sql<CmsVersionRow>`
        SELECT version, content, note, created_at
        FROM cms_versions
        WHERE slug = ${slug}
        ORDER BY version ASC;
    `;

    return result.rows.map((versionRow) => ({
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
        const result = await sql<CmsArticleRow>`
            SELECT a.*, COUNT(v.id)::int as version_count
            FROM cms_articles a
            LEFT JOIN cms_versions v ON v.slug = a.slug
            GROUP BY a.slug
            ORDER BY a.updated_at DESC, a.slug ASC;
        `;

        return result.rows
            .map((row) => {
                const meta = getArticleBySlug(String(row.slug));
                return meta ? createQueueArticle(meta, row) : null;
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
            const meta = getArticleBySlug(String(row.slug));
            return meta ? createQueueArticle(meta, row) : null;
        })
        .filter((value): value is CmsQueueArticle => Boolean(value));
}

export async function getCmsArticleDetail(slug: string): Promise<CmsArticleDetail | null> {
    await ensureCmsBootstrap();
    const meta = getArticleBySlug(slug);
    if (!meta) {
        return null;
    }

    if (HAS_POSTGRES) {
        const articleResult = await sql<CmsArticleRow>`
            SELECT a.*, COUNT(v.id)::int as version_count
            FROM cms_articles a
            LEFT JOIN cms_versions v ON v.slug = a.slug
            WHERE a.slug = ${slug}
            GROUP BY a.slug;
        `;
        const articleRow = articleResult.rows[0];
        const versions = await getPostgresVersions(slug);
        const reviewsResult = await sql<CmsReviewRow>`
            SELECT action, comment, version, created_at
            FROM cms_reviews
            WHERE slug = ${slug}
            ORDER BY id DESC;
        `;
        const latestVersion = versions[versions.length - 1];

        return {
            article: createQueueArticle(meta, articleRow),
            meta,
            content: latestVersion?.content || "",
            versions,
            reviews: reviewsResult.rows.map((review) => ({
                action: review.action,
                comment: review.comment,
                version: review.version,
                createdAt: review.created_at,
            })),
            score: null,
            migrationState: versions.length > 0 ? "cms" : "legacy-fallback",
        };
    }

    const articleRow = selectSql<Record<string, unknown>>(`
        SELECT a.*, COUNT(v.id) as version_count
        FROM cms_articles a
        LEFT JOIN cms_versions v ON v.slug = a.slug
        WHERE a.slug = ${sqlString(slug)}
        GROUP BY a.slug;
    `)[0];
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
        meta,
        content: latestVersion?.content || "",
        versions,
        reviews: reviews.map((review): CmsReview => ({
            action: review.action,
            comment: review.comment,
            version: review.version,
            createdAt: review.created_at,
        })),
        score: null,
        migrationState: versions.length > 0 ? "cms" : "legacy-fallback",
    };
}

export async function saveCmsContent(slug: string, content: string, note?: string): Promise<CmsVersion> {
    await ensureCmsBootstrap();
    const createdAt = new Date().toISOString();
    const wordCount = content.split(/\s+/).filter(Boolean).length;

    if (HAS_POSTGRES) {
        const nextResult = await sql<{ next_version: number }>`
            SELECT COALESCE(MAX(version), 0) + 1 as next_version
            FROM cms_versions
            WHERE slug = ${slug};
        `;
        const nextVersion = Number(nextResult.rows[0]?.next_version || 1);

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
        const currentResult = await sql<{ current_version: number }>`
            SELECT COALESCE(MAX(version), 0) as current_version
            FROM cms_versions
            WHERE slug = ${slug};
        `;
        const currentVersion = Number(currentResult.rows[0]?.current_version || 0);

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

    if (HAS_POSTGRES) {
        const currentResult = await sql<{ current_version: number }>`
            SELECT COALESCE(MAX(version), 0) as current_version
            FROM cms_versions
            WHERE slug = ${slug};
        `;
        const currentVersion = Number(currentResult.rows[0]?.current_version || 0);

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
        await ensureCmsBootstrap();

        if (HAS_POSTGRES) {
            const result = await sql<{ content: string }>`
                SELECT v.content
                FROM cms_articles a
                JOIN cms_versions v ON v.slug = a.slug AND v.version = a.published_version
                WHERE a.slug = ${slug} AND a.published = true AND a.published_version IS NOT NULL
                LIMIT 1;
            `;
            return result.rows[0]?.content || null;
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
