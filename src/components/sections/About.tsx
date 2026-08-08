"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { interests, site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="pb-20 md:pb-28">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[1.5rem] border border-line shadow-xl">
            <Image
              src="/images/portrait-cinematic.png"
              alt={`${site.name} portrait`}
              fill
              sizes="400px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow">About</p>
          <h2 className="display mt-3 text-4xl font-700 md:text-5xl">
            The person behind the work.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-soft">
            Beyond frameworks and APIs, I&apos;m constantly learning, experimenting, and building —
            especially where full-stack delivery meets quality and security.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="surface p-4">
              <p className="text-xs font-bold tracking-[0.14em] text-mute uppercase">Education</p>
              <p className="mt-2 font-semibold">{site.education.degree}</p>
              <p className="text-sm text-mute">
                {site.education.school} · {site.education.score}
              </p>
            </div>
            <div className="surface p-4 sm:col-span-2">
              <p className="text-xs font-bold tracking-[0.14em] text-mute uppercase">Focus areas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-paper-2 px-3 py-1 text-sm text-soft"
                  >
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
