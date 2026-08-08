"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-night px-6 py-12 text-white md:px-12 md:py-16">
            <div className="absolute inset-0 bg-[url('/images/bg-atmosphere.png')] bg-cover bg-center opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-br from-night via-night/90 to-accent/25" />
            <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-accent-2/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="text-xs font-bold tracking-[0.18em] text-sky-300 uppercase">
                Let&apos;s connect
              </p>
              <h2 className="display mt-4 text-4xl font-bold md:text-6xl">
                Ready to build something reliable.
              </h2>
              <p className="mt-4 max-w-xl text-white/70 md:text-lg">
                Open to software engineering roles, internships, collaborations, and interesting
                problems across full-stack, QA, and API security.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900"
                >
                  Email me <ArrowUpRight size={16} />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold"
                >
                  LinkedIn <ArrowUpRight size={16} />
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold"
                >
                  GitHub <ArrowUpRight size={16} />
                </a>
                <a
                  href={site.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold"
                >
                  CV ↓
                </a>
              </div>

              <p className="mt-8 text-sm text-white/55">
                {site.email} · {site.phone}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
