"use client";

import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Intro() {
  return (
    <section id="intro" className="pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="wrap">
        <Reveal className="grid gap-8 border-y border-line py-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:py-14">
          <div>
            <p className="eyebrow">FIG. 00 — Thesis</p>
            <h2 className="display mt-3 text-3xl md:text-5xl">
              Full lifecycle.
              <span className="mt-2 block italic text-soft">Not just commits.</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-soft md:text-lg">
              I build products, verify them with automation, and harden the APIs that carry them —
              then ship evidence, not screenshots alone.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {site.mantra.map((item) => (
                <span key={item} className="mono text-[0.68rem] text-accent">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                { k: "40%", v: "Test time cut" },
                { k: "25%", v: "Backend faster" },
                { k: "Live", v: "VortexIoT shipped" },
              ].map((item) => (
                <div key={item.v}>
                  <p className="display text-2xl md:text-3xl">{item.k}</p>
                  <p className="mono mt-1 text-[0.6rem] text-mute">{item.v}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
