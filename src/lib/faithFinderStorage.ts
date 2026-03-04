import { promises as fs } from "fs";
import path from "path";

export type FaithFinderSubmission = {
    id: string;
    email: string;
    result: unknown;
    createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "faith-finder-submissions.json");

async function ensureDataFile() {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
        await fs.access(SUBMISSIONS_FILE);
    } catch {
        await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify({ submissions: [] }, null, 2), "utf8");
    }
}

type DbShape = { submissions: FaithFinderSubmission[] };

async function readDb(): Promise<DbShape> {
    await ensureDataFile();
    const raw = await fs.readFile(SUBMISSIONS_FILE, "utf8");
    const parsed = JSON.parse(raw) as DbShape;
    if (!parsed.submissions) return { submissions: [] };
    return parsed;
}

async function writeDb(db: DbShape) {
    await ensureDataFile();
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(db, null, 2), "utf8");
}

export async function createFaithFinderSubmission(input: {
    email: string;
    result: unknown;
}): Promise<FaithFinderSubmission> {
    const db = await readDb();
    const id = crypto.randomUUID();
    const submission: FaithFinderSubmission = {
        id,
        email: input.email,
        result: input.result,
        createdAt: new Date().toISOString(),
    };
    db.submissions.unshift(submission);
    await writeDb(db);
    return submission;
}

export async function getFaithFinderSubmission(id: string): Promise<FaithFinderSubmission | null> {
    const db = await readDb();
    return db.submissions.find((s) => s.id === id) ?? null;
}
