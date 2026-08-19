import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logActivity, saveDB } from "@/lib/store";
import type { Skill } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { skills?: Skill[] };
  if (!Array.isArray(body.skills)) {
    return NextResponse.json({ error: "skills array required" }, { status: 400 });
  }
  saveDB((db) => {
    db.skills = body.skills as Skill[];
  });
  logActivity(admin.email, "skills.update", `${body.skills.length} skills`);
  return NextResponse.json({ ok: true });
}
