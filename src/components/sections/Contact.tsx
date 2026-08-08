"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { withBase } from "@/lib/paths";

export function Contact() {
  return (
    <section id="contact" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal>
          <div className="frame crop-marks overflow-hidden bg-night text-white">
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-2">
              <span className="mono text-[0.62rem] text-white/55">FIG. 05 — UPLINK</span>
              <span className="mono text-[0.62rem] text-accent">STATUS: OPEN</span>
            </div>
            <div className="relative px-5 py-10 md:px-10 md:py-14">
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: `url(${withBase("/images/bg-atmosphere.png")})`, backgroundSize: "cover" }}
              />
              <div className="relative max-w-3xl">
                <h2 className="display text-4xl md:text-6xl">
                  Let&apos;s build
                  <span className="block italic text-white/70">something reliable.</span>
                </h2>
                <p className="mt-4 max-w-xl text-white/65">
                  Open to engineering roles, internships, and collaborations across full-stack, QA,
                  and API security.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${site.email}`} className="lab-btn bg-accent border-accent">
                    Email <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lab-btn lab-btn-ghost border-white/30 text-white hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lab-btn lab-btn-ghost border-white/30 text-white hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={withBase(site.resume)}
                    download
                    className="lab-btn lab-btn-ghost border-white/30 text-white hover:text-white"
                  >
                    CV ↓
                  </a>
                </div>
                <p className="mono mt-8 text-[0.68rem] text-white/45">
                  {site.email} · {site.phone}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
