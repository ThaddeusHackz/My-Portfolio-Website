# THADDEUS TAGOE — Portfolio

A next-generation, monochrome portfolio website for **Thaddeus Nii Teiko Tagoe** — Software Developer, Digital Forensic Analyst & AI Prompt Engineer. Full-stack with a complete admin panel and an embedded **AI agent** powered by a single OpenRouter key with automatic multi-model fallback.

![stack](https://img.shields.io/badge/Next.js-15-black) ![stack](https://img.shields.io/badge/React-19-white) ![stack](https://img.shields.io/badge/Tailwind-v4-lightgrey) ![stack](https://img.shields.io/badge/AI-OpenRouter-blue)

---

## ✨ What's inside

- **Monochrome "2027" UI** — black/white/gray editorial design with glassmorphism, film grain, animated gradients, marquee ticker, cursor spotlight, and framer-motion reveals.
- **Public site** — Hero, About, Experience & Education, Projects, Skills, Partnerships (University of Leeds · University of Ghana AISS Lab), Contact form, and footer.
- **AI agent (`/api/chat`)** — a floating "Thaddeus AI" chat that answers questions about Thaddeus:
  - **Live:** one `OPENROUTER_API_KEY` walks an automatic fallback chain — *OpenAI → Gemini → Claude → DeepSeek → Llama → free models → OpenRouter auto* — in groups of 3 (OpenRouter's limit).
  - **Offline:** falls back to a local knowledge base (editable in the admin panel) so the agent **always** responds.
  - Handles 401 (bad key), 402 (credit), model-list limits, timeouts and network failure gracefully.
- **Admin panel (`/admin`)** — secure login (scrypt hashing, HMAC-signed cookies, rate limiting), dashboard analytics, live content editor, CRUD for projects / experience / education / skills / AI knowledge, inbox for contact messages + AI conversations, settings and a reset danger-zone.
- **Data layer** — single-document JSON store (`./data/db.json`) with an **optional PostgreSQL mirror** for durability on Render.
- **Render-ready** — `render.yaml` blueprint (web service + managed Postgres), Dockerfile, health checks, and a self-test suite.

---

## 🚀 Quick start (local)

```bash
npm install
cp .env.example .env.local   # fill in your keys (optional — works without any keys)
npm run dev                  # http://localhost:3000
```

- **Admin console:** http://localhost:3000/admin
- **Default credentials** (seeded on first run): `admin@thaddeustagoe.dev` / `Thaddeus@2026`
  → change via `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars or in **Settings**.

## 🔑 Environment variables

| Key | Required | Purpose |
|---|---|---|
| `OPENROUTER_API_KEY` | for live AI | One key → automatic multi-model fallback |
| `OPENROUTER_HTTP_REFERER` | optional | your site URL (OpenRouter attribution) |
| `OPENROUTER_APP_TITLE` | optional | app title sent to OpenRouter |
| `OPENROUTER_MODELS` | optional | comma-separated extra model slugs tried first |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | optional | seed admin account |
| `SESSION_SECRET` | recommended | HMAC secret for admin cookies |
| `DATABASE_URL` | optional | PostgreSQL mirror for durability |
| `NEXT_PUBLIC_SITE_URL` | recommended | public site URL |

> The site works with **zero** keys — the AI agent simply runs on its local knowledge base.

## 🧪 Test

```bash
npm run build       # production build
npm start           # serve the production build (0.0.0.0:3000)
npm run selftest    # run the endpoint self-test suite (server must be running)
npm run typecheck   # TypeScript check
```

## 📁 Structure

```
app/            pages + API routes (public + admin)
components/     UI (public site, AI chat widget, admin panel)
lib/            openrouter.ts (fallback engine) · thaddeus.ts (AI persona)
                · store.ts (data engine) · auth.ts · cms.ts (defaults)
scripts/        start.cjs (production shim) · selftest.cjs
render.yaml     Render blueprint (web + Postgres)
Dockerfile      production container
```

## 🔐 Admin default credentials

Seeded from env on first boot. **Change the password after first login.**

```
Email:    admin@thaddeustagoe.dev
Password: Thaddeus@2026
```

---

*Design: 2027 next-gen monochrome · glassmorphism · animated gradients · AI agent on OpenRouter · PostgreSQL-backed.*
