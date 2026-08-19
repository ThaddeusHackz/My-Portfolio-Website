import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logActivity, saveDB } from "@/lib/store";
import type { ExperienceItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { experience?: ExperienceItem[] };
  if (!Array.isArray(body.experience)) {
    return NextResponse.json({ error: "experience array required" }, { status: 400 });
  }
  saveDB((db) => {
    db.experience = body.experience as ExperienceItem[];
  });
  logActivity(admin.email, "experience.update", `${body.experience.length} items`);
  return NextResponse.json({ ok: true });
}
