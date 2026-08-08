"use client";

import { Reveal } from "@/components/Reveal";

const lines = [
  "Good software needs more than code.",
  "It needs testing.",
  "It needs security.",
  "It needs deployment.",
  "It needs someone willing to keep improving it.",
];

export function Statement() {
  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div
        className="absolute inset-0 bg-[url('/images/bg-texture.png')] bg-cover bg-center opacity-30"
        aria-hidden
      />
      <div className="wrap relative">
        <Reveal>
          <h2 className="display max-w-5xl text-[clamp(2.4rem,9vw,6rem)]">
            BUILDING IS ONLY THE <span className="text-cyan">BEGINNING.</span>
          </h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {lines.map((line, i) => (
            <Reveal key={line} delay={i * 0.05}>
              <p className="text-xl text-mute md:text-2xl">{line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
