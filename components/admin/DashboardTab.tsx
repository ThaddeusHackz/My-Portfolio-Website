"use client";

import type { ComponentType } from "react";
import { Bot, Database, Eye, MessageSquare, MessagesSquare, Users } from "lucide-react";

type Data = {
  analytics: {
    visits: { date: string; count: number; unique: number }[];
    questions: { q: string; count: number }[];
    totalChats: number;
    totalMessages: number;
    totalContacts: number;
    firstSeen: string;
  };
  activity: { actor: string; action: string; detail: string; at: string }[];
  status: { openrouter: boolean; openrouterKey: string; postgres: boolean };
};

export default function DashboardTab({ data }: { data: Data }) {
  const a = data.analytics;
  const totalVisits = a.visits.reduce((s, v) => s + v.count, 0);
  const totalUnique = a.visits.reduce((s, v) => s + v.unique, 0);

  const cards = [
    { icon: Eye, label: "Visits", value: totalVisits.toLocaleString(), sub: `${totalUnique} unique` },
    { icon: MessagesSquare, label: "AI chats", value: a.totalChats.toLocaleString(), sub: `${a.totalMessages} messages` },
    { icon: MessageSquare, label: "Contact messages", value: a.totalContacts.toLocaleString(), sub: "from the form" },
    { icon: Users, label: "Questions asked", value: a.questions.reduce((s, q) => s + q.count, 0).toLocaleString(), sub: `${a.questions.length} unique` },
  ];

  // mini bar chart of last 14 days
  const days = a.visits.slice(-14);
  const max = Math.max(1, ...days.map((d) => d.count));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill ok={data.status.openrouter} label={`OpenRouter ${data.status.openrouterKey}`} icon={Bot} />
        <StatusPill ok={data.status.postgres} label="PostgreSQL" icon={Database} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">{c.label}</p>
              <c.icon className="h-4 w-4 text-[#9a9aa3]" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{c.value}</p>
            <p className="mt-1 text-xs text-[#6b6b74]">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* visits chart */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">
            Visits · last {days.length} days
          </p>
          <div className="flex h-32 items-end gap-1.5">
            {days.map((d) => (
              <div key={d.date} className="group relative flex-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-[#33333a] to-white transition group-hover:opacity-80"
                  style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
                />
              </div>
            ))}
          </div>
          <p className="mt-2 font-mono text-[10px] text-[#6b6b74]">
            {days.length ? `${days[0].date} → ${days[days.length - 1].date}` : "no visits yet"}
          </p>
        </div>

        {/* top questions */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">
            Top questions to the AI
          </p>
          {a.questions.length === 0 ? (
            <p className="text-sm text-[#6b6b74]">No questions yet.</p>
          ) : (
            <ul className="space-y-2.5">
              {a.questions.slice(0, 8).map((q) => (
                <li key={q.q} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-[#c7c7cd]">“{q.q}”</span>
                  <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 font-mono text-xs text-[#9a9aa3]">
                    ×{q.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* activity */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">Recent activity</p>
        {data.activity.length === 0 ? (
          <p className="text-sm text-[#6b6b74]">No activity recorded yet.</p>
        ) : (
          <ul className="space-y-2">
            {data.activity.slice(0, 12).map((r, i) => (
              <li key={i} className="flex items-center gap-3 font-mono text-xs text-[#9a9aa3]">
                <span className="text-[#6b6b74]">{new Date(r.at).toLocaleString()}</span>
                <span className="text-white">{r.actor}</span>
                <span>{r.action}</span>
                <span className="truncate text-[#6b6b74]">{r.detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatusPill({
  ok,
  label,
  icon: Icon,
}: {
  ok: boolean;
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-xs text-[#c7c7cd]">
      <Icon className="h-3.5 w-3.5" />
      {label}
      <span className={`h-2 w-2 rounded-full ${ok ? "bg-[#a7f3a0]" : "bg-[#6b6b74]"}`} />
    </span>
  );
}
