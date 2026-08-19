import { NextResponse } from "next/server";
import { saveDB, trackContact } from "@/lib/store";
import { uid } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "message too long" }, { status: 400 });
  }

  saveDB((db) => {
    db.messages.unshift({
      id: uid("msg"),
      name,
      email,
      subject: (body.subject || "").trim() || "New message",
      message,
      createdAt: new Date().toISOString(),
      read: false,
    });
    db.messages = db.messages.slice(0, 500);
  });
  trackContact();

  return NextResponse.json({ ok: true });
}
