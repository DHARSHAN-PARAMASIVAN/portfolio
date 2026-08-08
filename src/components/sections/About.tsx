"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { interests, site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="pb-20 md:pb-28">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="overflow-hidden border border-line bg-panel">
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/portrait-facing.png"
                alt={site.name}
                fill
                sizes="420px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="eyebrow">FIG. 04 — Subject</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">
            Why these three
            <span className="block italic text-soft">belong together.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-soft">
            Full-stack without verification is guesswork. Verification without security is incomplete.
            I work where delivery, quality, and API hardening meet — and I prove it with shipped
            systems.
          </p>

          <div className="mt-10 border-t border-line pt-8">
            <p className="mono text-[0.62rem] text-mute">EDUCATION</p>
            <p className="mt-2 text-lg font-medium">
              {site.education.degree} · {site.education.school}
            </p>
            <p className="text-sm text-mute">{site.education.score}</p>
          </div>

          <div className="mt-8">
            <p className="mono text-[0.62rem] text-mute">FOCUS</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {interests.map((item) => (
                <span key={item} className="chip">
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
