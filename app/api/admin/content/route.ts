import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logActivity, saveDB } from "@/lib/store";
import type { SiteContent } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as Partial<SiteContent>;
  saveDB((db) => {
    db.content = { ...db.content, ...body };
  });
  logActivity(admin.email, "content.update", Object.keys(body).join(", "));
  return NextResponse.json({ ok: true });
}
