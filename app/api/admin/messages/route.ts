import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logActivity, saveDB } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { id?: string; read?: boolean };
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  saveDB((db) => {
    const m = db.messages.find((x) => x.id === body.id);
    if (m) m.read = Boolean(body.read);
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const all = url.searchParams.get("all");
  saveDB((db) => {
    if (all === "1") db.messages = [];
    else if (id) db.messages = db.messages.filter((m) => m.id !== id);
  });
  logActivity(admin.email, "messages.clear", id || (all === "1" ? "all" : ""));
  return NextResponse.json({ ok: true });
}
