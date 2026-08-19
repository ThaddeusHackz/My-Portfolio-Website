"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  BarChart3,
  Bot,
  ExternalLink,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquare,
  Settings,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/lib/types";
import DashboardTab from "./DashboardTab";
import ContentTab from "./ContentTab";
import InboxTab from "./InboxTab";
import SettingsTab from "./SettingsTab";
import ListEditor from "./ListEditor";

type AdminData = Omit<Database, "admins" | "activity"> & {
  me: { id: string; email: string; name: string; role: string };
  activity: { actor: string; action: string; detail: string; at: string }[];
  status: { openrouter: boolean; openrouterKey: string; postgres: boolean };
};

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "content", label: "Content", icon: FileText },
  { id: "projects", label: "Projects", icon: Wrench },
  { id: "experience", label: "Experience", icon: ShieldCheck },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: BarChart3 },
  { id: "knowledge", label: "AI Knowledge", icon: Bot },
  { id: "inbox", label: "Inbox", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminApp() {
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [tab, setTab] = useState<TabId>("dashboard");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const json = await res.json();
      setData(json as AdminData);
    } catch {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function save(endpoint: string, payload: unknown, message: string) {
    setSaving(true);
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      toast.success(message);
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#060607] text-[#f4f4f1]">
        <Loader2 className="h-6 w-6 animate-spin text-[#9a9aa3]" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#060607] text-[#f4f4f1]">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 font-display font-bold">
              T
            </span>
            <div>
              <p className="font-display text-sm font-semibold leading-tight">Admin console</p>
              <p className="font-mono text-[11px] text-[#6b6b74]">{data.me.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-[#c7c7cd] transition hover:border-white/40 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#d6d6dc]"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 lg:flex-row">
        {/* sidebar */}
        <aside className="flex shrink-0 gap-1 overflow-x-auto lg:w-56 lg:flex-col">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm transition",
                tab === t.id
                  ? "bg-white text-black"
                  : "text-[#9a9aa3] hover:bg-white/5 hover:text-white",
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </aside>

        {/* content */}
        <main className="min-w-0 flex-1 pb-16">
          {saving && (
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[#9a9aa3]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> saving…
            </div>
          )}

          {tab === "dashboard" && <DashboardTab data={data} />}
          {tab === "content" && <ContentTab content={data.content} save={save} />}
          {tab === "projects" && (
            <ListEditor
              title="Projects"
              items={data.projects}
              endpoint="/api/admin/projects"
              keyName="projects"
              save={save}
              fields={[
                { key: "title", label: "Title" },
                { key: "slug", label: "Slug" },
                { key: "tagline", label: "Tagline" },
                { key: "description", label: "Description", textarea: true },
                { key: "repo", label: "Repo URL" },
                { key: "live", label: "Live URL (optional)" },
                { key: "stack", label: "Stack (comma separated)", array: true },
                { key: "category", label: "Category" },
                { key: "year", label: "Year" },
                { key: "featured", label: "Featured", boolean: true },
              ]}
            />
          )}
          {tab === "experience" && (
            <ListEditor
              title="Experience"
              items={data.experience}
              endpoint="/api/admin/experience"
              keyName="experience"
              save={save}
              fields={[
                { key: "role", label: "Role" },
                { key: "org", label: "Organisation" },
                { key: "period", label: "Period" },
                { key: "location", label: "Location" },
                { key: "highlights", label: "Highlights (one per line)", array: true },
                { key: "tags", label: "Tags (comma separated)", array: true },
                { key: "current", label: "Current", boolean: true },
              ]}
            />
          )}
          {tab === "education" && (
            <ListEditor
              title="Education"
              items={data.education}
              endpoint="/api/admin/education"
              keyName="education"
              save={save}
              fields={[
                { key: "degree", label: "Degree" },
                { key: "school", label: "School" },
                { key: "field", label: "Field" },
                { key: "period", label: "Period" },
                { key: "notes", label: "Notes", textarea: true },
              ]}
            />
          )}
          {tab === "skills" && (
            <ListEditor
              title="Skills"
              items={data.skills}
              endpoint="/api/admin/skills"
              keyName="skills"
              save={save}
              fields={[
                { key: "name", label: "Skill" },
                { key: "category", label: "Category" },
                { key: "level", label: "Level (0-100)", number: true },
              ]}
            />
          )}
          {tab === "knowledge" && (
            <ListEditor
              title="AI Knowledge Base"
              items={data.knowledge}
              endpoint="/api/admin/knowledge"
              keyName="knowledge"
              save={save}
              fields={[
                { key: "topic", label: "Topic" },
                { key: "keywords", label: "Keywords (comma separated)" },
                { key: "answer", label: "Answer (Markdown)", textarea: true },
              ]}
            />
          )}
          {tab === "inbox" && <InboxTab data={data} load={load} />}
          {tab === "settings" && <SettingsTab data={data} load={load} />}
        </main>
      </div>
    </div>
  );
}
