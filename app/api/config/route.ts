import { NextResponse } from "next/server";
import { getDB } from "@/lib/store";
import { openRouterConfigured } from "@/lib/openrouter";

export const dynamic = "force-dynamic";

export function GET() {
  const db = getDB();
  return NextResponse.json({
    content: db.content,
    projects: db.projects,
    experience: db.experience,
    education: db.education,
    skills: db.skills,
    openrouter: openRouterConfigured(),
  });
}
