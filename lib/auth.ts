// ─── Admin auth: HMAC-signed cookie sessions (no DB round-trip per request) ─

import { createHmac, timingSafeEqual } from "crypto";
import { sessionSecret } from "./env";
import { getDB, verifyPassword } from "./store";

const COOKIE = "thad_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function makeSession(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + MAX_AGE * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readSession(token?: string | null): { email: string } | null {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email: string;
      exp: number;
    };
    if (data.exp < Date.now()) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

function cookieFlags() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${secure}`;
}

export function cookieHeader(token: string) {
  return `${COOKIE}=${token}; ${cookieFlags()}`;
}

export function clearCookieHeader() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export function tokenFromRequest(req: Request) {
  const raw = req.headers.get("cookie") || "";
  const part = raw
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${COOKIE}=`));
  return part ? part.slice(COOKIE.length + 1) : null;
}

export function currentAdmin(req: Request) {
  const sess = readSession(tokenFromRequest(req));
  if (!sess) return null;
  return getDB().admins.find((a) => a.email === sess.email) || null;
}

export function login(email: string, password: string) {
  const user = getDB().admins.find((a) => a.email === email.trim().toLowerCase());
  if (!user) return null;
  if (!verifyPassword(password, user.salt, user.passwordHash)) return null;
  return user;
}

export function requireAdmin(req: Request) {
  return currentAdmin(req);
}

// Simple in-memory login rate limiting (per IP) to slow brute force.
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(ip: string): boolean {
  const rec = attempts.get(ip);
  if (!rec || Date.now() > rec.resetAt) return false;
  return rec.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(ip: string) {
  const rec = attempts.get(ip);
  if (!rec || Date.now() > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: Date.now() + WINDOW_MS });
  } else {
    rec.count += 1;
  }
  if (attempts.size > 5000) {
    for (const [k, v] of attempts) if (Date.now() > v.resetAt) attempts.delete(k);
  }
}

export function clearAttempts(ip: string) {
  attempts.delete(ip);
}
