import { NextResponse } from "next/server";
import { clearAttempts, clientIp, cookieHeader, isRateLimited, login, makeSession, recordFailedAttempt } from "@/lib/auth";
import { logActivity } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  const body = (await req.json().catch(() => ({}))) as { email?: string; password?: string };
  const user = login(body.email || "", body.password || "");
  if (!user) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  clearAttempts(ip);
  logActivity(user.email, "login", "admin console");
  const res = NextResponse.json({ ok: true, email: user.email, name: user.name, role: user.role });
  res.headers.set("Set-Cookie", cookieHeader(makeSession(user.email)));
  return res;
}
