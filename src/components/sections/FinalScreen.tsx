"use client";

import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function FinalScreen() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="wrap text-center">
        <Reveal>
          <h2 className="display text-[clamp(2.8rem,12vw,7rem)]">
            <span className="block">ALWAYS</span>
            <span className="block">MOVING</span>
            <span className="block text-cyan">FORWARD.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 display text-xl md:text-2xl">{site.name}</p>
          <p className="mt-2 tracking-[0.18em] text-mute">
            {site.mantra.join(" · ")}
          </p>
          <a href="#top" className="mt-10 inline-block text-sm font-semibold text-cyan">
            Back to top ↑
          </a>
        </Reveal>
      </div>
    </section>
  );
}
