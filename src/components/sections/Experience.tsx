"use client";

import { Reveal } from "@/components/Reveal";
import { GlitchText } from "@/components/GlitchText";
import { journey } from "@/lib/site";

export function Experience() {
  return (
    <section id="experience" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-10 max-w-xl border-b border-line pb-5">
          <p className="eyebrow">
            <GlitchText text="FIG. 02 — Mission log" interval={2400} />
          </p>
          <h2 className="display mt-2 text-4xl md:text-5xl">
            <GlitchText text="Measured impact." interval={2000} />
          </h2>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {journey.map((item, i) => (
            <Reveal key={`${item.org}-${item.year}`} delay={i * 0.04}>
              <article className="grid gap-3 py-6 md:grid-cols-[5rem_1.4fr_1fr] md:items-baseline md:gap-8 md:py-7">
                <p className="mono text-sm text-accent">{item.year}</p>
                <div>
                  <h3 className="display text-2xl md:text-3xl">{item.org}</h3>
                  <p className="mt-1 text-soft">{item.role}</p>
                  <p className="mono mt-2 text-[0.62rem] text-mute">{item.focus}</p>
                </div>
                <p className="text-sm font-medium text-accent md:text-right">{item.highlight}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
