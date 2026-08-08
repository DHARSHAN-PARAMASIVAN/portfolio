"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { interests, site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="pb-20 md:pb-28">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="group relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[1.5rem] border border-line shadow-xl transition duration-500 hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_30px_80px_rgba(56,189,248,0.22)]">
            <div className="img-zoom absolute inset-0">
              <Image
                src="/images/portrait-facing.png"
                alt={`${site.name} looking toward the camera`}
                fill
                sizes="400px"
                className="object-cover object-top"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
              <div className="absolute -inset-8 bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,0.28),transparent_45%)]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs font-semibold tracking-[0.16em] text-sky-300 uppercase">
                Build · Verify · Secure · Ship
              </p>
              <p className="mt-1 text-sm font-medium text-white">{site.name}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow">About</p>
          <h2 className="display mt-3 text-4xl font-bold md:text-5xl">
            The person behind the work.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-soft">
            Beyond frameworks and APIs, I&apos;m constantly learning, experimenting, and building —
            especially where full-stack delivery meets quality and security.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="surface surface-hover p-4">
              <p className="text-xs font-bold tracking-[0.14em] text-mute uppercase">Education</p>
              <p className="mt-2 font-semibold">{site.education.degree}</p>
              <p className="text-sm text-mute">
                {site.education.school} · {site.education.score}
              </p>
            </div>
            <div className="surface surface-hover p-4 sm:col-span-2">
              <p className="text-xs font-bold tracking-[0.14em] text-mute uppercase">Focus areas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span key={item} className="chip-hover rounded-full border border-line bg-paper-2 px-3 py-1 text-sm text-soft">
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
