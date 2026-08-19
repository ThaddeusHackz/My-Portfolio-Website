import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { resetDB } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  resetDB();
  return NextResponse.json({ ok: true });
}
