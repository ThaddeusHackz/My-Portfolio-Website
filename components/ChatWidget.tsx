"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import Markdown from "./Markdown";

type Msg = { role: "user" | "assistant"; content: string; model?: string };

const SUGGESTIONS = [
  "Who is Thaddeus and what does he do?",
  "What projects has he built?",
  "Tell me about his partnerships",
  "Why hire Thaddeus?",
];

function visitorId(): string {
  try {
    let id = localStorage.getItem("tt_visitor");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("tt_visitor", id);
    }
    return id;
  } catch {
    return "";
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [live, setLive] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi — I'm **Thaddeus AI**, the agent embedded in this portfolio. Ask me anything about Thaddeus: his work, projects, skills, partnerships, or how to contact him.",
      model: "system",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(visitorId());

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((d) => setLive(Boolean(d.openrouter)))
      .catch(() => setLive(false));
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit", visitorId: idRef.current }),
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-ai-chat", onOpen);
    return () => window.removeEventListener("open-ai-chat", onOpen);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || typing) return;
      const next: Msg[] = [...messages, { role: "user", content: q }];
      setMessages(next);
      setInput("");
      setTyping(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next.filter((m) => m.model !== "system").map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "AI error");
        setMessages((prev) => [...prev, { role: "assistant", content: data.text, model: data.model }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Something went wrong: ${(err as Error).message}`, model: "error" },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [messages, typing],
  );

  return (
    <>
      {/* floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Thaddeus AI"
        className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-[#0e0e11]/90 py-3 pl-4 pr-5 shadow-2xl backdrop-blur transition hover:border-white/40"
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white text-black">
          <Bot className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0e0e11] bg-[#a7f3a0]" />
        </span>
        <span className="hidden text-sm font-medium sm:block">Ask Thaddeus AI</span>
      </button>

      {/* panel */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[600px] max-h-[calc(100dvh-7rem)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#0a0a0c]/95 shadow-2xl backdrop-blur-xl">
          {/* header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold">Thaddeus AI</p>
                <p className="font-mono text-[11px] text-[#6b6b74]">
                  {live === null ? "connecting…" : live ? "multi-model · live" : "knowledge base · local"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-[#9a9aa3] transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="scroll-thin flex-1 space-y-4 overflow-y-auto px-4 py-5">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-sm text-black"
                      : "max-w-[88%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-2.5"
                  }
                >
                  {m.role === "assistant" ? <Markdown>{m.content}</Markdown> : <p className="whitespace-pre-wrap">{m.content}</p>}
                  {m.role === "assistant" && m.model && m.model !== "system" && (
                    <p className="mt-2 border-t border-white/10 pt-1.5 font-mono text-[10px] text-[#6b6b74]">
                      {m.model === "error" ? "⚠ error" : `⚡ ${m.model}`}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/70" />
                </div>
              </div>
            )}
          </div>

          {/* suggestions */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs text-[#c7c7cd] transition hover:border-white/30 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Thaddeus…"
              className="flex-1 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#6b6b74] outline-none focus:border-white/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-black transition hover:bg-[#d6d6dc] disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
