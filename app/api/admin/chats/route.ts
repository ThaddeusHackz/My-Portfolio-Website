import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logActivity, saveDB } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const all = url.searchParams.get("all");
  saveDB((db) => {
    if (all === "1") db.chats = [];
    else if (id) db.chats = db.chats.filter((c) => c.id !== id);
  });
  logActivity(admin.email, "chats.clear", id || (all === "1" ? "all" : ""));
  return NextResponse.json({ ok: true });
}
