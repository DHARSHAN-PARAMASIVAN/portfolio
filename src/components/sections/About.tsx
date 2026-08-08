"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { interests, site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="pb-20 md:pb-28">
      <div className="wrap grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="frame crop-marks overflow-hidden">
            <div className="flex items-center justify-between border-b border-line bg-paper-2 px-3 py-2">
              <span className="mono text-[0.62rem] text-mute">SUBJECT CARD</span>
              <span className="mono text-[0.62rem] text-accent">FRAME 02</span>
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/portrait-facing.png"
                alt={`${site.name}`}
                fill
                sizes="420px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="eyebrow">FIG. 04 — Subject</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">
            The person
            <span className="block italic text-soft">behind the frames.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-soft">
            Beyond frameworks and APIs, I keep learning where delivery, quality, and security meet —
            then prove it with shipped work.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="frame p-4 sm:col-span-1">
              <p className="mono text-[0.62rem] text-mute">EDUCATION</p>
              <p className="mt-2 font-semibold">{site.education.degree}</p>
              <p className="text-sm text-mute">
                {site.education.school} · {site.education.score}
              </p>
            </div>
            <div className="frame p-4 sm:col-span-2">
              <p className="mono text-[0.62rem] text-mute">FOCUS BANDS</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
