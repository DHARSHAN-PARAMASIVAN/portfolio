"use client";

import { Reveal } from "@/components/Reveal";
import { journey } from "@/lib/site";

export function Experience() {
  return (
    <section id="experience" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-8 border-b border-line pb-4">
          <p className="eyebrow">FIG. 02 — Mission log</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">Measured impact.</h2>
        </Reveal>

        <div className="space-y-3">
          {journey.map((item, i) => (
            <Reveal key={`${item.org}-${item.year}`} delay={i * 0.05}>
              <article className="frame grid gap-4 p-4 md:grid-cols-[90px_1.3fr_1fr] md:items-center md:gap-6 md:p-5">
                <p className="mono text-sm text-accent">{item.year}</p>
                <div>
                  <h3 className="display text-2xl">{item.org}</h3>
                  <p className="mt-1 text-soft">{item.role}</p>
                  <p className="mono mt-1 text-[0.62rem] text-mute">{item.focus}</p>
                </div>
                <p className="border border-accent/30 bg-accent/5 px-3 py-2 font-semibold text-accent md:text-right">
                  {item.highlight}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
