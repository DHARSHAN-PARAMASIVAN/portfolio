"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div
        className="absolute inset-0 bg-[url('/images/bg-atmosphere.png')] bg-cover bg-center opacity-40"
        aria-hidden
      />
      <div className="absolute inset-0 bg-bg/70" aria-hidden />

      <div className="wrap relative text-center">
        <Reveal>
          <h2 className="display text-[clamp(3rem,14vw,8rem)]">
            <span className="block">LET&apos;S</span>
            <span className="block">BUILD</span>
            <span className="block text-cyan">SOMETHING.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-mute md:text-lg">
            Open to software engineering roles, internships, collaborations and interesting
            problems.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-3 text-sm font-bold text-bg"
          >
            EMAIL ME <ArrowUpRight size={16} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-bold"
          >
            LINKEDIN <ArrowUpRight size={16} />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-bold"
          >
            GITHUB <ArrowUpRight size={16} />
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-sm text-mute">{site.phone}</p>
          <p className="mt-1 text-sm text-mute">{site.email}</p>
        </Reveal>
      </div>
    </section>
  );
}
