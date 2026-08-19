// ─── Single-document data engine ───────────────────────────────────────────
// Everything lives in one JSON document (./data/db.json), optionally mirrored
// to PostgreSQL for durability. Seeded on first run from env + defaults.

import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from "fs";
import { join } from "path";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { adminEmail, adminName, adminPassword } from "./env";
import {
  DEFAULT_CONTENT,
  DEFAULT_EDUCATION,
  DEFAULT_EXPERIENCE,
  DEFAULT_KNOWLEDGE,
  DEFAULT_PROJECTS,
  DEFAULT_SKILLS,
} from "./cms";
import { loadPgSnapshot, savePgSnapshot } from "./pg-store";
import type { Database, AdminUser } from "./types";

const DATA_DIR = join(process.cwd(), "data");
const DB_PATH = join(DATA_DIR, "db.json");

export function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

export function verifyPassword(password: string, salt: string, expected: string) {
  const got = Buffer.from(hashPassword(password, salt), "hex");
  const exp = Buffer.from(expected, "hex");
  if (got.length !== exp.length) return false;
  return timingSafeEqual(got, exp);
}

function seedAdmin(): AdminUser {
  const salt = randomBytes(16).toString("hex");
  return {
    id: "admin-root",
    email: adminEmail(),
    name: adminName(),
    salt,
    passwordHash: hashPassword(adminPassword(), salt),
    role: "admin",
  };
}

function emptyDb(): Database {
  return {
    content: { ...DEFAULT_CONTENT },
    projects: DEFAULT_PROJECTS.map((p) => ({ ...p })),
    experience: DEFAULT_EXPERIENCE.map((e) => ({ ...e })),
    education: DEFAULT_EDUCATION.map((e) => ({ ...e })),
    skills: DEFAULT_SKILLS.map((s) => ({ ...s })),
    knowledge: DEFAULT_KNOWLEDGE.map((k) => ({ ...k })),
    chats: [],
    messages: [],
    analytics: {
      visits: [],
      questions: [],
      totalChats: 0,
      totalMessages: 0,
      totalContacts: 0,
      firstSeen: new Date().toISOString(),
    },
    admins: [seedAdmin()],
    activity: [],
  };
}

let cache: Database | null = null;

function load(): Database {
  if (cache) return cache;
  try {
    if (existsSync(DB_PATH)) {
      const raw = JSON.parse(readFileSync(DB_PATH, "utf8")) as Database;
      const base = emptyDb();
      cache = {
        ...base,
        ...raw,
        content: { ...base.content, ...(raw.content || {}) },
        projects: raw.projects?.length ? raw.projects : base.projects,
        experience: raw.experience?.length ? raw.experience : base.experience,
        education: raw.education?.length ? raw.education : base.education,
        skills: raw.skills?.length ? raw.skills : base.skills,
        knowledge: raw.knowledge?.length ? raw.knowledge : base.knowledge,
        analytics: { ...base.analytics, ...(raw.analytics || {}) },
        admins: raw.admins?.length ? raw.admins : [seedAdmin()],
        activity: raw.activity || [],
      };
      return cache;
    }
  } catch (err) {
    console.error("[store] load failed, reseeding:", (err as Error).message);
  }
  cache = emptyDb();
  persist(cache);
  return cache;
}

function persist(db: Database) {
  cache = db;
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DB_PATH, JSON.stringify(db));
  } catch (err) {
    console.error("[store] persist degraded to memory:", (err as Error).message);
  }
  void savePgSnapshot(db as unknown as Record<string, unknown>);
}

export async function hydrateFromPostgres() {
  try {
    if (existsSync(DB_PATH)) return;
    const raw = await loadPgSnapshot();
    if (!raw || typeof raw !== "object") return;
    const body = raw as unknown as Database;
    if (!body || typeof body.content !== "object") return;
    cache = { ...emptyDb(), ...body };
    persist(cache);
    console.log("[store] hydrated document from PostgreSQL");
  } catch (err) {
    console.warn("[store] hydration failed:", (err as Error).message);
  }
}

export function getDB(): Database {
  if (!cache) cache = load();
  return cache;
}

/** Run a mutation against the DB and persist atomically. */
export function saveDB<T>(fn: (db: Database) => T): T {
  const db = getDB();
  const result = fn(db);
  persist(db);
  return result;
}

export function resetDB() {
  try {
    rmSync(DB_PATH, { force: true });
  } catch {
    /* ignore */
  }
  cache = null;
}

export function logActivity(actor: string, action: string, detail: string) {
  saveDB((db) => {
    db.activity.unshift({ actor, action, detail, at: new Date().toISOString() });
    db.activity = db.activity.slice(0, 200);
  });
}

// ─── Analytics helpers ─────────────────────────────────────────────────────
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function trackVisit(visitorId: string | null) {
  const db = getDB();
  const today = todayISO();
  const a = db.analytics;
  let day = a.visits.find((v) => v.date === today);
  if (!day) {
    day = { date: today, count: 0, unique: 0 };
    a.visits.push(day);
  }
  day.count += 1;
  a.visits = a.visits.slice(-30);
  if (visitorId) {
    const key = `v:${today}:${visitorId}`;
    const map = a as unknown as Record<string, unknown>;
    if (!map[key]) {
      map[key] = 1;
      day.unique += 1;
    }
  }
  persist(db);
}

export function trackQuestion(q: string) {
  const db = getDB();
  const clean = q.trim().slice(0, 120);
  const a = db.analytics;
  const found = a.questions.find((x) => x.q.toLowerCase() === clean.toLowerCase());
  if (found) found.count += 1;
  else a.questions.push({ q: clean, count: 1 });
  a.questions.sort((x, y) => y.count - x.count);
  a.questions = a.questions.slice(0, 50);
  persist(db);
}

export function trackMessage() {
  const db = getDB();
  db.analytics.totalMessages += 1;
  persist(db);
}

export function trackChat() {
  const db = getDB();
  db.analytics.totalChats += 1;
  persist(db);
}

export function trackContact() {
  const db = getDB();
  db.analytics.totalContacts += 1;
  persist(db);
}
