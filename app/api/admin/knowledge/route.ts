import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logActivity, saveDB } from "@/lib/store";
import type { KnowledgeItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { knowledge?: KnowledgeItem[] };
  if (!Array.isArray(body.knowledge)) {
    return NextResponse.json({ error: "knowledge array required" }, { status: 400 });
  }
  saveDB((db) => {
    db.knowledge = body.knowledge as KnowledgeItem[];
  });
  logActivity(admin.email, "knowledge.update", `${body.knowledge.length} items`);
  return NextResponse.json({ ok: true });
}
