import Section from "./Section";
import Reveal from "./Reveal";
import type { Skill } from "@/lib/types";

export default function Skills({
  skills,
  title,
  body,
}: {
  skills: Skill[];
  title: string;
  body: string;
}) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <Section id="skills" index="04 /" kicker="Capability" title={title} body={body}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, ci) => (
          <Reveal key={cat} delay={ci * 0.06}>
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#6b6b74]">{cat}</p>
              <div className="mt-5 space-y-4">
                {skills
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <div key={s.id}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#d6d6dc]">{s.name}</span>
                        <span className="font-mono text-xs text-[#6b6b74]">{s.level}%</span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#9a9aa3] to-white transition-all duration-1000"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
