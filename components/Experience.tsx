import { Building2, GraduationCap } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import type { EducationItem, ExperienceItem } from "@/lib/types";

export default function Experience({
  experience,
  education,
  title,
}: {
  experience: ExperienceItem[];
  education: EducationItem[];
  title: string;
}) {
  return (
    <Section id="experience" index="02 /" kicker="Career" title={title}>
      <div className="space-y-4">
        {experience.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.06}>
            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04] md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#9a9aa3]" />
                    <h3 className="font-display text-lg font-semibold text-white md:text-xl">{e.role}</h3>
                  </div>
                  <p className="mt-1 text-sm text-[#d6d6dc]">
                    {e.org} · <span className="text-[#9a9aa3]">{e.location}</span>
                  </p>
                </div>
                <span className="rounded-full border border-white/12 px-3 py-1 font-mono text-xs text-[#c7c7cd]">
                  {e.period}
                </span>
              </div>
              <ul className="mt-5 grid gap-2">
                {e.highlights.map((h, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed text-[#9a9aa3]">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-[#9a9aa3]">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-12">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#6b6b74]">Education</p>
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.06}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <GraduationCap className="h-5 w-5 text-[#9a9aa3]" />
                <h3 className="mt-4 font-display text-base font-semibold text-white">{e.degree}</h3>
                <p className="mt-1 text-sm text-[#d6d6dc]">
                  {e.school} · <span className="text-[#9a9aa3]">{e.field}</span>
                </p>
                <p className="mt-1 font-mono text-xs text-[#6b6b74]">{e.period}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#9a9aa3]">{e.notes}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
