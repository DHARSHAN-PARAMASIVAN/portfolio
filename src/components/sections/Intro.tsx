"use client";

import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Intro() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="wrap">
        <Reveal className="surface surface-hover grid gap-8 p-6 md:grid-cols-[1fr_1.2fr] md:p-10">
          <div>
            <p className="eyebrow">Positioning</p>
            <h2 className="display mt-3 text-3xl font-bold md:text-4xl">
              Not just code.
              <span className="block text-soft">Complete delivery.</span>
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-soft">
              I care about the full software lifecycle — architecture, implementation, automated
              verification, API security, and shipping to production. That combination is how
              reliable products are made.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.mantra.map((item) => (
                <span
                  key={item}
                  className="chip-hover rounded-full border border-transparent bg-paper-2 px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
