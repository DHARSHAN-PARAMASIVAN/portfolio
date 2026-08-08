"use client";

import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Intro() {
  return (
    <section className="pb-16 md:pb-20">
      <div className="wrap">
        <Reveal className="frame crop-marks grid gap-8 p-5 md:grid-cols-[0.8fr_1.2fr] md:p-8">
          <div>
            <p className="eyebrow">FIG. 00 — Thesis</p>
            <h2 className="display mt-3 text-3xl md:text-5xl">
              Complete lifecycle.
              <span className="mt-2 block italic text-soft">Not just commits.</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-soft md:text-lg">
              Most portfolios show screenshots. This one tracks proof: automation that cut test time,
              backends that got faster, APIs that got hardened, and an IoT platform that shipped live.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.mantra.map((item) => (
                <span key={item} className="chip border-accent/30 text-accent">
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
