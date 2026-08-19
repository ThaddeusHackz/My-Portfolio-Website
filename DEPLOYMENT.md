# 🚀 Deploy on Render.com — Step-by-Step

Deploy the complete portfolio (frontend + admin panel + AI agent + optional **PostgreSQL**) on Render's **free tier** in about 10 minutes.

---

## Before you start

- A **GitHub account** with this repo pushed to it.
- A **Render account** (free at [render.com](https://render.com) — sign in with GitHub).
- *(Recommended for live AI)* an **OpenRouter** account and API key from [openrouter.ai](https://openrouter.ai) — a single `sk-or-...` key drives the whole agent.

> 💡 Only `OPENROUTER_API_KEY` is needed for live multi-model answers. Without it, the AI agent answers from its local knowledge base (always works).

---

## Step 1 — Push the repository

```bash
git add -A
git commit -m "Portfolio — Next.js + admin panel + OpenRouter AI agent"
git push origin main
```

> ⚠️ **Never commit `.env.local` or `data/`** — both are gitignored. Render reads secrets from its Environment dashboard.

## Step 2 — Create the Render service (Blueprint)

1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. **New ➜ Blueprint** (top-right).
3. **Connect repository** and pick this repo.
4. Render reads `render.yaml` and shows:
   - a **PostgreSQL** database (`thaddeus-portfolio-db`) — created automatically.
   - the **web service** (`thaddeus-portfolio`) with `DATABASE_URL` already wired.
5. Click **Apply** → Render provisions everything and starts the first build.

The blueprint already configures Node runtime, `npm ci --include=dev && npm run build`, `npm start`, health check on `/api/health`, and the managed Postgres.

**Build time on free tier:** ~3–6 minutes. Look for `✓ Ready` in the logs.

## Step 3 — Add environment variables

In the Render dashboard → your **web service** → **Environment** tab, set:

| Key | Value |
|---|---|
| `OPENROUTER_API_KEY` | *your `sk-or-...` key (optional but recommended)* |
| `OPENROUTER_HTTP_REFERER` | `https://thaddeus-portfolio.onrender.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://thaddeus-portfolio.onrender.com` |
| `ADMIN_EMAIL` | `admin@thaddeustagoe.dev` |
| `ADMIN_PASSWORD` | *a strong password — seeds the admin login* |
| `SESSION_SECRET` | *a long random string* |

(`NODE_ENV`, `DATABASE_URL`, `ADMIN_NAME` and `OPENROUTER_APP_TITLE` are already set by the blueprint.)

Click **Save Changes** → Render redeploys automatically.

## Step 4 — Verify

- [ ] Homepage loads with the monochrome theme and animated hero.
- [ ] The **Thaddeus AI** chat (bottom-right) answers questions.
- [ ] If the OpenRouter key is set, answers show a **⚡ model** badge (e.g. `⚡ google/gemini-2.5-flash`); otherwise `⚡ offline-knowledge`.
- [ ] The contact form sends (messages appear in the admin inbox).
- [ ] `/admin` login works with your seeded credentials.
- [ ] **Admin → Settings** shows **PostgreSQL connected**; restart the service and confirm chats/messages survive (the database mirror working).

---

## FAQ

**Q: Free Postgres expires after 30 days?**
A: Yes — Render's free Postgres is for testing. Upgrade the plan or switch to Neon/Supabase and change `DATABASE_URL` (no code changes needed). Without it, the site still works using the local JSON store.

**Q: Do I need the OpenRouter key?**
A: No. Without it the AI agent answers from its local knowledge base (editable in **Admin → AI Knowledge**). With it, you get live multi-model answers with automatic fallback.

**Q: How does the AI fallback work?**
A: One key, one chain — *OpenAI → Gemini → Claude → DeepSeek → Llama → free models → OpenRouter auto* — walked in groups of 3 (OpenRouter's per-request limit). Failed requests are not billed; only the model that serves the response is billed. On 402 (no credits) it retries the free models; on 401 it reports the key problem.

**Q: How do I change the admin password?**
A: **Admin → Settings → New password**, or change `ADMIN_PASSWORD` and use **Settings → Danger zone → Reset database** (resets the whole document).
