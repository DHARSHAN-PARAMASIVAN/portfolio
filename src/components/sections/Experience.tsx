"use client";

import { Reveal } from "@/components/Reveal";
import { journey } from "@/lib/site";

export function Experience() {
  return (
    <section id="experience" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-10">
          <p className="eyebrow">Experience</p>
          <h2 className="display mt-3 text-4xl font-bold md:text-5xl">Impact you can measure.</h2>
        </Reveal>

        <div className="space-y-4">
          {journey.map((item, i) => (
            <Reveal key={`${item.org}-${item.year}`} delay={i * 0.05}>
              <article className="surface surface-hover grid gap-4 p-5 md:grid-cols-[100px_1.2fr_1fr] md:items-center md:gap-8 md:p-7">
                <p className="display text-2xl font-bold text-accent">{item.year}</p>
                <div>
                  <h3 className="display text-xl font-bold md:text-2xl">{item.org}</h3>
                  <p className="mt-1 font-medium text-soft">{item.role}</p>
                  <p className="mt-1 text-sm text-mute">{item.focus}</p>
                </div>
                <p className="rounded-xl bg-paper-2 px-4 py-3 text-sm font-semibold text-ink transition hover:bg-accent hover:text-white md:text-right">
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
