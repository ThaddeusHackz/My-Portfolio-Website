// Self-test: run against a live server (default http://127.0.0.1:3000).
// Usage: npm run selftest   (server must be running first)
// Override base: TEST_BASE=https://myhost npm run selftest
const base = process.env.TEST_BASE || "http://127.0.0.1:3000";

const failures = [];
async function check(name, fn) {
  try {
    await fn();
    console.log("PASS  " + name);
  } catch (err) {
    failures.push(name);
    console.error("FAIL  " + name + " — " + err.message);
  }
}

async function json(path, opts) {
  const res = await fetch(base + path, opts);
  const body = await res.json().catch(() => ({}));
  return { res, body };
}

(async () => {
  await check("health is ok", async () => {
    const { res, body } = await json("/api/health");
    if (!res.ok || !body.ok) throw new Error("health not ok");
    if (typeof body.openrouter !== "boolean") throw new Error("missing openrouter flag");
  });

  await check("public config exposes content", async () => {
    const { body } = await json("/api/config");
    if (!body.content?.brandName) throw new Error("missing CMS content");
    if (!Array.isArray(body.projects) || body.projects.length < 3) throw new Error("projects thin");
    if (!Array.isArray(body.experience)) throw new Error("experience missing");
    if (!Array.isArray(body.skills)) throw new Error("skills missing");
  });

  await check("AI agent answers (offline fallback)", async () => {
    const { res, body } = await json("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "user", content: "Who is Thaddeus Tagoe and what does he do?" },
        ],
      }),
    });
    if (!res.ok) throw new Error(body.error || res.status);
    if (!body.text || body.text.length < 10) throw new Error("empty answer");
    if (!body.model) throw new Error("missing model tag");
  });

  await check("AI agent mentions partnership (offline)", async () => {
    const { body } = await json("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Tell me about Thaddeus's partnerships" }],
      }),
    });
    const t = (body.text || "").toLowerCase();
    if (!/loizou|leeds|boakye|ghana/.test(t)) throw new Error("partnership facts missing");
  });

  await check("contact form persists", async () => {
    const { res, body } = await json("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Self-test",
        email: "selftest@example.com",
        subject: "Automated check",
        message: "hello",
      }),
    });
    if (!res.ok) throw new Error(body.error || res.status);
  });

  await check("admin login rejected with bad creds", async () => {
    const { res } = await json("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "x@x.com", password: "nope" }),
    });
    if (res.status !== 401) throw new Error("expected 401, got " + res.status);
  });

  await check("admin login works with seeded creds", async () => {
    const email = process.env.ADMIN_EMAIL || "admin@thaddeustagoe.dev";
    const password = process.env.ADMIN_PASSWORD || "Thaddeus@2026";
    const { res, body } = await json("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok || !body.ok) throw new Error(body.error || "login failed");
  });

  await check("analytics track endpoint", async () => {
    const { res } = await json("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit", visitorId: "selftest-1" }),
    });
    if (!res.ok) throw new Error("track failed");
  });

  await check("homepage renders", async () => {
    const res = await fetch(base + "/");
    const html = await res.text();
    if (!res.ok) throw new Error("status " + res.status);
    if (!/Thaddeus|Tagoe/i.test(html)) throw new Error("name missing from HTML");
  });

  await check("admin login page renders", async () => {
    const res = await fetch(base + "/admin/login");
    if (!res.ok) throw new Error("status " + res.status);
  });

  if (failures.length) {
    console.error("\n" + failures.length + " check(s) failed.");
    process.exit(1);
  }
  console.log("\nAll self-tests passed.");
})();
