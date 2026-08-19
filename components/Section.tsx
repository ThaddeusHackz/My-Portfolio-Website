import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Section({
  id,
  index,
  kicker,
  title,
  body,
  children,
  className,
}: {
  id?: string;
  index?: string;
  kicker?: string;
  title?: string;
  body?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto max-w-6xl px-6 py-24 md:py-32", className)}>
      {(kicker || title) && (
        <div className="mb-14 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.3em] text-[#6b6b74] uppercase">
            {index && <span className="text-[#9a9aa3]">{index}</span>} {kicker}
          </p>
          {title && (
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-silver">
              {title}
            </h2>
          )}
          {body && <p className="mt-5 text-base md:text-lg text-[#9a9aa3] leading-relaxed">{body}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
