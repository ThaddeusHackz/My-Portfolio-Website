"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { SiteContent } from "@/lib/types";

type SaveFn = (endpoint: string, payload: unknown, message: string) => Promise<void>;

const FIELDS: { key: keyof SiteContent; label: string; textarea?: boolean; boolean?: boolean }[] = [
  { key: "brandName", label: "Brand name" },
  { key: "brandEyebrow", label: "Brand eyebrow" },
  { key: "announcement", label: "Announcement", textarea: true },
  { key: "announcementOn", label: "Show announcement", boolean: true },
  { key: "heroKicker", label: "Hero kicker" },
  { key: "heroTitle", label: "Hero title" },
  { key: "heroRole", label: "Hero role (split on ·)" },
  { key: "heroBody", label: "Hero body", textarea: true },
  { key: "heroPrimary", label: "Primary CTA" },
  { key: "heroSecondary", label: "Secondary CTA" },
  { key: "heroStatus", label: "Availability status" },
  { key: "aboutTitle", label: "About title" },
  { key: "aboutBody", label: "About body", textarea: true },
  { key: "aboutFacts", label: "About key facts", textarea: true },
  { key: "projectsTitle", label: "Projects title" },
  { key: "projectsBody", label: "Projects body", textarea: true },
  { key: "skillsTitle", label: "Skills title" },
  { key: "skillsBody", label: "Skills body", textarea: true },
  { key: "experienceTitle", label: "Experience title" },
  { key: "contactTitle", label: "Contact title" },
  { key: "contactBody", label: "Contact body", textarea: true },
  { key: "footerBlurb", label: "Footer blurb", textarea: true },
  { key: "email", label: "Email" },
  { key: "github", label: "GitHub URL" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "orcid", label: "ORCID URL" },
  { key: "location", label: "Location" },
];

export default function ContentTab({
  content,
  save,
}: {
  content: SiteContent;
  save: SaveFn;
}) {
  const [draft, setDraft] = useState<SiteContent>({ ...content });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Site content</h1>
          <p className="mt-1 text-sm text-[#9a9aa3]">Editable copy shown on the public site.</p>
        </div>
        <button
          onClick={() => save("/api/admin/content", draft, "Content saved")}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d6d6dc]"
        >
          <Save className="h-4 w-4" /> Save
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.key} className={f.textarea ? "sm:col-span-2" : ""}>
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">
              {f.label}
            </span>
            {f.boolean ? (
              <button
                onClick={() => setDraft((d) => ({ ...d, [f.key]: !d[f.key] }))}
                className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm transition ${
                  draft[f.key] ? "border-white bg-white text-black" : "border-white/12 text-[#9a9aa3]"
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${draft[f.key] ? "bg-black" : "bg-[#6b6b74]"}`} />
                {String(draft[f.key])}
              </button>
            ) : f.textarea ? (
              <textarea
                rows={3}
                value={String(draft[f.key] ?? "")}
                onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40"
              />
            ) : (
              <input
                value={String(draft[f.key] ?? "")}
                onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
