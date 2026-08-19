import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDB, hashPassword, logActivity, saveDB } from "@/lib/store";
import { openRouterConfigured } from "@/lib/openrouter";
import { postgresConfigured } from "@/lib/pg-store";
import { maskKey, openRouterKey } from "@/lib/env";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = getDB();
  return NextResponse.json({
    admins: db.admins.map((a) => ({ id: a.id, email: a.email, name: a.name, role: a.role })),
    openrouter: openRouterConfigured(),
    openrouterKey: maskKey(openRouterKey()),
    postgres: postgresConfigured(),
    dataPath: "data/db.json",
  });
}

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    email?: string;
    password?: string;
  };

  saveDB((db) => {
    const me = db.admins.find((a) => a.id === admin.id);
    if (!me) return;
    if (body.name && body.name.trim()) me.name = body.name.trim();
    if (body.email && body.email.trim()) me.email = body.email.trim().toLowerCase();
    if (body.password && body.password.length >= 8) {
      me.salt = randomBytes(16).toString("hex");
      me.passwordHash = hashPassword(body.password, me.salt);
    }
  });
  logActivity(admin.email, "settings.update", [body.name ? "name" : "", body.email ? "email" : "", body.password ? "password" : ""].filter(Boolean).join(", "));
  return NextResponse.json({ ok: true });
}
