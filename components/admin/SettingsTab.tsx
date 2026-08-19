"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Bot, Database, KeyRound, RefreshCw, User } from "lucide-react";

type Data = {
  me: { id: string; email: string; name: string; role: string };
  status: { openrouter: boolean; openrouterKey: string; postgres: boolean };
};

export default function SettingsTab({ data, load }: { data: Data; load: () => Promise<void> }) {
  const [name, setName] = useState(data.me.name);
  const [email, setEmail] = useState(data.me.email);
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function updateAccount() {
    if (password && password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: password || undefined }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      toast.success("Account updated");
      setPassword("");
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function resetDb() {
    if (!confirm("Reset the entire database to defaults? This cannot be undone.")) return;
    const res = await fetch("/api/admin/reset", { method: "POST" });
    const json = await res.json();
    if (res.ok) {
      toast.success("Database reset — reloading");
      setTimeout(() => load(), 400);
    } else {
      toast.error(json.error || "Reset failed");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Settings</h1>

      {/* status */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-[#9a9aa3]" />
            <p className="font-mono text-xs uppercase tracking-wider text-[#6b6b74]">AI agent (OpenRouter)</p>
          </div>
          <p className="mt-3 text-sm">
            {data.status.openrouter ? (
              <span className="text-[#a7f3a0]">Connected · {data.status.openrouterKey}</span>
            ) : (
              <span className="text-[#9a9aa3]">No key — running on the local knowledge base.</span>
            )}
          </p>
          <p className="mt-2 text-xs text-[#6b6b74]">
            Set OPENROUTER_API_KEY (plus OPENROUTER_HTTP_REFERER / OPENROUTER_APP_TITLE) in Render → Environment.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-[#9a9aa3]" />
            <p className="font-mono text-xs uppercase tracking-wider text-[#6b6b74]">Durability (PostgreSQL)</p>
          </div>
          <p className="mt-3 text-sm">
            {data.status.postgres ? (
              <span className="text-[#a7f3a0]">Connected — data survives restarts.</span>
            ) : (
              <span className="text-[#9a9aa3]">File store (data/db.json). Add DATABASE_URL for persistence.</span>
            )}
          </p>
        </div>
      </div>

      {/* account */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-[#9a9aa3]" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#6b6b74]">Admin account</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <label>
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
          </label>
          <label>
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
          </label>
          <label>
            <span className="mb-1.5 flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">
              <KeyRound className="h-3 w-3" /> New password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="leave blank to keep"
              className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40"
            />
          </label>
        </div>
        <button
          onClick={updateAccount}
          disabled={saving}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#d6d6dc] disabled:opacity-60"
        >
          {saving ? "Saving…" : "Update account"}
        </button>
      </div>

      {/* danger zone */}
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5">
        <div className="mb-2 flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-red-400" />
          <p className="font-mono text-xs uppercase tracking-wider text-red-300">Danger zone</p>
        </div>
        <p className="text-sm text-[#9a9aa3]">
          Reset all content, projects, experience, skills, knowledge, chats and messages back to defaults.
        </p>
        <button
          onClick={resetDb}
          className="mt-4 rounded-full border border-red-500/30 px-5 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
        >
          Reset database
        </button>
      </div>
    </div>
  );
}
