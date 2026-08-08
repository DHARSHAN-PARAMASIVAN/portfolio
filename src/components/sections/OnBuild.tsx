"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function OnBuild() {
  return (
    <section id="build" className="py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <p className="mb-3 text-[0.75rem] tracking-[0.2em] text-cyan">CHAPTER 01</p>
          <h2 className="display text-[clamp(3rem,14vw,9rem)]">
            <span className="block">ON</span>
            <span className="block text-cyan">BUILD</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-mute">
            Products, platforms and systems I&apos;ve built.
          </p>
        </Reveal>

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line" delay={0.1}>
          <div className="relative aspect-[16/9]">
            <Image
              src="/images/visual-build.png"
              alt="Developer workspace representing Build"
              fill
              sizes="(max-width: 1180px) 100vw, 1180px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
            <p className="absolute bottom-5 left-5 display text-2xl text-cyan md:text-4xl">BUILD</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
