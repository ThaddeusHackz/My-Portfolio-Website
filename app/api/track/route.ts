import { NextResponse } from "next/server";
import { trackQuestion, trackVisit } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    type?: string;
    visitorId?: string;
    q?: string;
  };

  if (body.type === "question" && body.q) {
    trackQuestion(body.q);
    return NextResponse.json({ ok: true });
  }

  trackVisit(body.visitorId || null);
  return NextResponse.json({ ok: true });
}
