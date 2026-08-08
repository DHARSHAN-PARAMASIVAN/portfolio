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
          <div className="glass relative overflow-hidden px-6 py-12 md:px-12 md:py-16">
            <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent/20 blur-[90px]" />
            <p className="mono relative text-[0.65rem] text-accent">
              {site.availability.toUpperCase()}
            </p>
            <h2 className="display relative mt-4 max-w-2xl text-4xl md:text-6xl">
              Let&apos;s build something
              <span className="italic text-soft"> reliable.</span>
            </h2>
            <p className="relative mt-5 max-w-lg text-soft">
              Roles, internships, and collaborations across full-stack, QA automation, and API
              security.
            </p>

            <div className="relative mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="lab-btn lab-btn-solid" data-cursor="hover">
                Hire Me <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="lab-btn"
                data-cursor="hover"
              >
                <Copy size={14} /> Copy email
              </button>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="lab-btn"
                data-cursor="hover"
              >
                LinkedIn
              </a>
              <a href={withBase(site.resume)} download className="lab-btn" data-cursor="hover">
                CV ↓
              </a>
            </div>

            <p className="mono relative mt-10 text-[0.65rem] text-mute">
              {site.email} · {site.phone}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
