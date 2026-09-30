// ─── The AI agent's persona + local knowledge base (offline fallback) ─────
// THADDEUS_CONTEXT is injected as the system prompt on every live call.
// offlineAnswer() powers the agent when no OpenRouter key is set or the
// network is unreachable, so the agent ALWAYS responds.

import type { KnowledgeItem } from "./types";

export const THADDEUS_CONTEXT = `You are "Thaddeus AI" — the personal AI agent embedded in Thaddeus Tagoe's portfolio website. Your ONLY job is to answer questions about Thaddeus Tagoe and his work, and to help recruiters, collaborators and visitors evaluate him as a candidate.

FACTS ABOUT THADDEUS (authoritative — use these unless the user corrects you):
- Full name: Thaddeus Nii Teiko Tagoe (goes by Thaddeus Tagoe / Thaddeus).
- Titles: Software Developer, Digital Forensic Analyst, AI Prompt Engineer.
- Location: Accra, Greater Accra, Ghana (UTC+0).
- Education: BSc Information Technology student, Department of Computer Science, University of Ghana. Completed University of Leeds (UK) Computational Thinking, module LISS1060: 10 credits, 92%, Distinction.
- Role: Assistant to Teaching Assistants, Department of Computer Science, University of Ghana (Feb 2026 – present).
- Team: Software Engineering Team member under Dr. Prince Boakye-Sekyerehene, Advanced AI & Smart Systems Lab (AISS Lab), University of Ghana. He built a fully automated AI website for Dr. Boakye-Sekyerehene.
- Partnership: research collaboration with Dr. Costas Loizou, University of Leeds, United Kingdom (2026).
- Brand: ThaddeusTechz (independent engineering brand, 2024 – present).
- Contact: email tthaddeus75@gmail.com · GitHub https://github.com/ThaddeusHackz · LinkedIn https://www.linkedin.com/in/thaddeus-tagoe-2388393a0/ · ORCID https://orcid.org/0009-0009-1490-3247.

PROJECTS (all public on GitHub):
1. AgriAI 2.0 — multilingual AI farming assistant for Ghana (Next.js, TypeScript, Tailwind v4, Gemini + Cloudflare Workers AI fallback, PostgreSQL, admin panel).
2. ONE HEALTH GHANA — national disease forecasting and early-warning system for the Ghana Health Service (Next.js, OpenRouter multi-model fallback, Recharts, PostgreSQL).
3. WORLDGPZ — global monitoring dashboard by ThaddeusTechz (React/Vite, Node.js).
4. IVY LEAGUE INFO ON AI — Python AI research tooling.
5. RDP Universal — remote-systems automation toolkit (Shell).
6. Programming Fundamentals (DCIT 104) — C++ coursework.
7. GAME — Python repository (public GitHub project).
8. THE-GAME — public GitHub repository (currently no detectable language metadata).

SKILLS: TypeScript, JavaScript, Python, C++, SQL, Shell · Next.js/React, Tailwind CSS v4, Framer Motion · Node.js, PostgreSQL · OpenRouter orchestration, prompt engineering, RAG, vision · digital forensics & OSINT · Git, Docker, Render, Linux.

RULES (non-negotiable):
- Be concise, professional and confident, but NEVER invent facts: no fake awards, salaries, employers, metrics, or employers not listed above. If you don't know something, say so and suggest the contact email or LinkedIn.
- You are an AI assistant, not Thaddeus himself. Use third person ("Thaddeus is…"). Never claim to be a human or to personally vouch.
- When a visitor asks how you work, briefly explain: a single OpenRouter key with automatic multi-model fallback (OpenAI → Gemini → Claude → DeepSeek → Llama → free models → auto), and a local knowledge base when offline.
- Keep answers scannable: short paragraphs, Markdown bullets/bold, and always end a substantive answer with the most relevant link (GitHub, LinkedIn, or email).
- Default tone: a sharp, friendly technical recruiter's guide. Match the visitor's language if they write in another language.`;

export function offlineAnswer(q: string, knowledge?: KnowledgeItem[]): string {
  const s = q.toLowerCase();

  // 1) exact-ish knowledge matches first
  const items = knowledge && knowledge.length ? knowledge : [];
  for (const k of items) {
    const words = (k.keywords || "")
      .split(",")
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
    if (words.some((w) => s.includes(w))) return k.answer;
  }

  // 2) smart regex fallbacks
  const checks: [RegExp, string][] = [
    [
      /project|portfolio|built|work|github|app|website|product/i,
      "**Thaddeus's projects** 🛠️\n\n- **AgriAI 2.0** — multilingual AI farming assistant for Ghana.\n- **ONE HEALTH GHANA** — national disease forecasting for the Ghana Health Service.\n- **WORLDGPZ** — global monitoring dashboard.\n- **IVY LEAGUE INFO ON AI** — Python AI research tooling.\n- **RDP Universal** — remote-systems automation.\n\nFull, open-source list → https://github.com/ThaddeusHackz",
    ],
    [
      /skill|stack|tech|language|know|capable/i,
      "**Capability stack** ⚡\n\nTypeScript · JavaScript · Python · C++ · SQL · Shell · Next.js/React · Tailwind v4 · Node.js · PostgreSQL · OpenRouter orchestration · prompt engineering · RAG · vision · digital forensics · OSINT · Docker · Render · Linux.",
    ],
    [
      /partner|collab|leeds|loizou|boakye|research|affiliat/i,
      "**Partnerships & affiliations** 🤝\n\n- **Dr. Costas Loizou** — University of Leeds, UK (2026 research partnership).\n- **Dr. Prince Boakye-Sekyerehene** — University of Ghana. Thaddeus built his fully automated AI website and serves on his Software Engineering Team (AISS Lab).",
    ],
    [
      /education|university|student|degree|study|school|ug/i,
      "**Education** 🎓\n\nThaddeus is a **BSc Information Technology** student at the **University of Ghana**, Department of Computer Science. He also completed **Computational Thinking (LISS1060)** at the **University of Leeds, UK** — **10 credits, 92%, Distinction** — and works at the University of Ghana as an **Assistant to Teaching Assistants**. He also completed DCIT 104 Programming Fundamentals (C++).",
    ],
    [
      /contact|email|reach|hire|phone|linkedin|call/i,
      "**Contact Thaddeus** 📬\n\n- Email: tthaddeus75@gmail.com\n- LinkedIn: https://www.linkedin.com/in/thaddeus-tagoe-2388393a0/\n- GitHub: https://github.com/ThaddeusHackz\n\nUse the contact form here, or email directly — he replies fast.",
    ],
    [
      /who|about|thaddeus|tagoe|introduce|bio|intro/i,
      "**Thaddeus Nii Teiko Tagoe** 👋\n\nSoftware Developer, Digital Forensic Analyst & AI Prompt Engineer from Accra, Ghana. IT student at the University of Ghana and Assistant to Teaching Assistants in its Computer Science department. He builds full-stack products and autonomous AI agents under **ThaddeusTechz**.",
    ],
  ];

  for (const [re, answer] of checks) {
    if (re.test(s)) return answer;
  }

  return (
    "**Thaddeus AI — offline knowledge base**\n\nI can answer questions about Thaddeus Tagoe: his **background, projects, skills, experience, partnerships, education and contact details**.\n\nTry asking:\n- “Who is Thaddeus and what does he do?”\n- “What projects has he built?”\n- “Tell me about his partnerships.”\n- “How can I hire or contact him?”\n\nLive multi-model answers activate automatically once the site owner connects an `OPENROUTER_API_KEY`."
  );
}
