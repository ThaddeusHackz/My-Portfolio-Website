"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Bot, ChevronDown, Mail, MailOpen, Trash2 } from "lucide-react";
import { timeAgo } from "@/lib/utils";

type Data = {
  messages: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    read: boolean;
  }[];
  chats: {
    id: string;
    title: string;
    messages: { role: "user" | "assistant"; content: string }[];
    model: string;
    createdAt: string;
  }[];
};

export default function InboxTab({ data, load }: { data: Data; load: () => Promise<void> }) {
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [openMsg, setOpenMsg] = useState<string | null>(null);

  async function markRead(id: string, read: boolean) {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    await load();
  }

  async function delMessages(id?: string, all = false) {
    const q = all ? "?all=1" : `?id=${id}`;
    await fetch(`/api/admin/messages${q}`, { method: "DELETE" });
    toast.success("Deleted");
    await load();
  }

  async function delChats(id?: string, all = false) {
    const q = all ? "?all=1" : `?id=${id}`;
    await fetch(`/api/admin/chats${q}`, { method: "DELETE" });
    toast.success("Deleted");
    await load();
  }

  return (
    <div className="space-y-8">
      {/* contact messages */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Contact messages</h2>
          {data.messages.length > 0 && (
            <button onClick={() => delMessages(undefined, true)} className="text-xs text-[#9a9aa3] hover:text-red-400">
              Clear all
            </button>
          )}
        </div>
        {data.messages.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center text-sm text-[#6b6b74]">
            No contact messages yet.
          </p>
        ) : (
          <div className="space-y-2.5">
            {data.messages.map((m) => (
              <div key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 px-4 py-3">
                  <button
                    onClick={() => markRead(m.id, !m.read)}
                    className="text-[#9a9aa3] transition hover:text-white"
                    title={m.read ? "Mark unread" : "Mark read"}
                  >
                    {m.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </button>
                  <button
                    className="flex flex-1 items-center gap-3 text-left"
                    onClick={() => setOpenMsg(openMsg === m.id ? null : m.id)}
                  >
                    <span className={`truncate text-sm ${m.read ? "text-[#9a9aa3]" : "font-medium text-white"}`}>
                      {m.name} · {m.subject}
                    </span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-[#6b6b74]">{timeAgo(m.createdAt)}</span>
                  </button>
                  <button onClick={() => delMessages(m.id)} className="text-[#6b6b74] hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {openMsg === m.id && (
                  <div className="border-t border-white/10 px-4 py-3">
                    <p className="font-mono text-xs text-[#6b6b74]">{m.email}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#c7c7cd]">{m.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI conversations */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">AI conversations</h2>
          {data.chats.length > 0 && (
            <button onClick={() => delChats(undefined, true)} className="text-xs text-[#9a9aa3] hover:text-red-400">
              Clear all
            </button>
          )}
        </div>
        {data.chats.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center text-sm text-[#6b6b74]">
            No conversations yet — the AI agent logs every exchange here.
          </p>
        ) : (
          <div className="space-y-2.5">
            {data.chats.map((c) => (
              <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Bot className="h-4 w-4 shrink-0 text-[#9a9aa3]" />
                  <button
                    className="flex flex-1 items-center gap-3 text-left"
                    onClick={() => setOpenChat(openChat === c.id ? null : c.id)}
                  >
                    <span className="truncate text-sm text-[#d6d6dc]">{c.title}</span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-[#6b6b74]">
                      ⚡ {c.model} · {timeAgo(c.createdAt)}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-[#6b6b74] transition ${openChat === c.id ? "rotate-180" : ""}`} />
                  </button>
                  <button onClick={() => delChats(c.id)} className="text-[#6b6b74] hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {openChat === c.id && (
                  <div className="max-h-80 space-y-3 overflow-y-auto border-t border-white/10 px-4 py-3">
                    {c.messages.map((msg, i) => (
                      <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
                        <div
                          className={
                            msg.role === "user"
                              ? "max-w-[80%] rounded-2xl rounded-br-md bg-white px-3.5 py-2 text-sm text-black"
                              : "max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-[#e4e4e8]"
                          }
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
