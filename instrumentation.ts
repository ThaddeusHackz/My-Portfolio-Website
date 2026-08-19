// Boot-time: hydrate the document store from PostgreSQL when configured and
// no local file exists, so data survives restarts/deploys on Render.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { hydrateFromPostgres } = await import("@/lib/store");
    await hydrateFromPostgres();
  }
}
