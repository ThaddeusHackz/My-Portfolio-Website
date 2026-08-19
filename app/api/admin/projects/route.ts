import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logActivity, saveDB } from "@/lib/store";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { projects?: Project[] };
  if (!Array.isArray(body.projects)) {
    return NextResponse.json({ error: "projects array required" }, { status: 400 });
  }
  saveDB((db) => {
    db.projects = body.projects as Project[];
  });
  logActivity(admin.email, "projects.update", `${body.projects.length} projects`);
  return NextResponse.json({ ok: true });
}
