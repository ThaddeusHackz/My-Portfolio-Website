import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDB } from "@/lib/store";
import { openRouterConfigured } from "@/lib/openrouter";
import { postgresConfigured } from "@/lib/pg-store";
import { maskKey, openRouterKey } from "@/lib/env";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = getDB();
  return NextResponse.json({
    me: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
    content: db.content,
    projects: db.projects,
    experience: db.experience,
    education: db.education,
    skills: db.skills,
    knowledge: db.knowledge,
    chats: db.chats.slice(0, 100),
    messages: db.messages.slice(0, 200),
    analytics: db.analytics,
    activity: db.activity.slice(0, 80),
    status: {
      openrouter: openRouterConfigured(),
      openrouterKey: maskKey(openRouterKey()),
      postgres: postgresConfigured(),
    },
  });
}
