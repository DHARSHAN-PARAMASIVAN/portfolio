"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { interests, site } from "@/lib/site";

export function OffTheCode() {
  return (
    <section id="about" className="border-t border-line py-20 md:py-28">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-[0.75rem] tracking-[0.2em] text-cyan">CHAPTER 04</p>
          <h2 className="display text-[clamp(3rem,12vw,7.5rem)]">
            <span className="block">OFF</span>
            <span className="block text-cyan">THE CODE</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-mute">
            Beyond frameworks and APIs, I&apos;m constantly learning, experimenting and building.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {interests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line px-4 py-2 text-sm text-mute"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm tracking-[0.14em] text-mute">{site.role}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/portrait-mono.png"
              alt={`${site.name} monochrome editorial portrait`}
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
