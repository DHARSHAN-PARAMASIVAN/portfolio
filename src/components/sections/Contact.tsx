"use client";

import { ArrowUpRight, Copy } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { withBase } from "@/lib/paths";
import { toast } from "@/components/Toast";

export function Contact() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast("EMAIL COPIED TO CLIPBOARD");
    } catch {
      toast("COPY FAILED — USE MAILTO");
    }
  };

  return (
    <section id="contact" className="pb-24 md:pb-32">
      <div className="wrap">
        <Reveal>
          <div className="border border-line bg-night px-6 py-12 text-white md:px-12 md:py-16">
            <p className="mono text-[0.65rem] text-accent">{site.availability.toUpperCase()}</p>
            <h2 className="display mt-4 max-w-2xl text-4xl md:text-6xl">
              Let&apos;s build something
              <span className="italic text-white/65"> reliable.</span>
            </h2>
            <p className="mt-5 max-w-lg text-white/60">
              Roles, internships, and collaborations across full-stack, QA automation, and API
              security.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="lab-btn border-accent bg-accent">
                Email me <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="lab-btn lab-btn-ghost border-white/25 text-white hover:text-white"
              >
                <Copy size={14} /> Copy email
              </button>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="lab-btn lab-btn-ghost border-white/25 text-white hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href={withBase(site.resume)}
                download
                className="lab-btn lab-btn-ghost border-white/25 text-white hover:text-white"
              >
                CV ↓
              </a>
            </div>

            <p className="mono mt-10 text-[0.65rem] text-white/40">
              {site.email} · {site.phone}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
