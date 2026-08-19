import { ArrowUpRight, Github, Star } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import type { Project } from "@/lib/types";

export default function Projects({
  projects,
  title,
  body,
}: {
  projects: Project[];
  title: string;
  body: string;
}) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" index="03 /" kicker="Selected work" title={title} body={body}>
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05} className={i === 0 ? "md:col-span-2" : ""}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/25 hover:bg-white/[0.04]">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.04] blur-2xl transition group-hover:bg-white/[0.09]" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-[#9a9aa3]" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6b6b74]">
                    {p.category} · {p.year}
                  </span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Repository"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 text-[#9a9aa3] transition hover:border-white/40 hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live site"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 text-[#9a9aa3] transition hover:border-white/40 hover:text-white"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-white transition group-hover:text-silver">
                {p.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#9a9aa3]">{p.tagline}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[#9a9aa3]">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-[#9a9aa3]">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}

        {rest.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6b6b74]">
                  {p.category} · {p.year}
                </span>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Repository"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-[#9a9aa3] transition hover:border-white/40 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-[#9a9aa3]">{p.tagline}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <a
          href="https://github.com/ThaddeusHackz"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium transition hover:bg-white hover:text-black"
        >
          <Github className="h-4 w-4" /> View everything on GitHub
        </a>
      </Reveal>
    </Section>
  );
}
