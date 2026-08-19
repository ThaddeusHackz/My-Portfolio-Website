import { NextResponse } from "next/server";
import { openRouterConfigured } from "@/lib/openrouter";
import { postgresConfigured } from "@/lib/pg-store";
import { maskKey } from "@/lib/env";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "thaddeus-portfolio",
    time: new Date().toISOString(),
    openrouter: openRouterConfigured(),
    openrouterKey: maskKey(process.env.OPENROUTER_API_KEY || ""),
    postgres: postgresConfigured(),
    node: process.version,
  });
}
