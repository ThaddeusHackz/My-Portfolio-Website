import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logActivity, saveDB } from "@/lib/store";
import type { EducationItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { education?: EducationItem[] };
  if (!Array.isArray(body.education)) {
    return NextResponse.json({ error: "education array required" }, { status: 400 });
  }
  saveDB((db) => {
    db.education = body.education as EducationItem[];
  });
  logActivity(admin.email, "education.update", `${body.education.length} items`);
  return NextResponse.json({ ok: true });
}
