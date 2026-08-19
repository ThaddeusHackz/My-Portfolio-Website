import { NextResponse } from "next/server";
import { complete, openRouterConfigured, type ChatMessage } from "@/lib/openrouter";
import { THADDEUS_CONTEXT, offlineAnswer } from "@/lib/thaddeus";
import { getDB, saveDB, trackChat, trackMessage, trackQuestion } from "@/lib/store";
import { uid } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    messages?: { role: "user" | "assistant"; content: string }[];
  };

  const history = (body.messages || []).slice(-16);
  const lastUser = [...history].reverse().find((m) => m.role === "user")?.content || "";

  if (!lastUser.trim()) {
    return NextResponse.json({ error: "empty message" }, { status: 400 });
  }

  trackQuestion(lastUser);

  if (!openRouterConfigured()) {
    const text = offlineAnswer(lastUser, getDB().knowledge);
    persistChat(history, text, "offline-knowledge");
    return NextResponse.json({ text, model: "offline-knowledge" });
  }

  const messages: ChatMessage[] = [
    { role: "system", content: THADDEUS_CONTEXT },
    ...history.map((m) => ({ role: m.role, content: m.content }) as ChatMessage),
  ];

  try {
    const result = await complete({ messages, temperature: 0.35, maxTokens: 1800 });
    persistChat(history, result.text, result.model);
    return NextResponse.json({ text: result.text, model: result.model });
  } catch (err) {
    const reason = (err as Error).message;
    const text = `${offlineAnswer(lastUser, getDB().knowledge)}\n\n_Live model note: ${reason}_`;
    persistChat(history, text, "offline-knowledge");
    return NextResponse.json({ text, model: "offline-knowledge" }, { status: 200 });
  }
}

function persistChat(
  history: { role: "user" | "assistant"; content: string }[],
  text: string,
  model: string,
) {
  trackChat();
  trackMessage();
  const title = history.find((m) => m.role === "user")?.content.slice(0, 80) || "Conversation";
  saveDB((db) => {
    db.chats.unshift({
      id: uid("chat"),
      title,
      messages: [
        ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        { role: "assistant" as const, content: text },
      ],
      model,
      createdAt: new Date().toISOString(),
    });
    db.chats = db.chats.slice(0, 200);
  });
}
