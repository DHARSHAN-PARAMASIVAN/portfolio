"use client";

import { Reveal } from "@/components/Reveal";
import { skills } from "@/lib/site";

const pillars = [
  {
    title: "Build",
    copy: "Django, MERN, Next.js, FastAPI — products designed to survive production.",
  },
  {
    title: "Verify",
    copy: "Selenium + Cucumber automation that cut testing time and raised coverage.",
  },
  {
    title: "Secure",
    copy: "API VAPT with Burp Suite, OWASP ZAP, and Postman — discover, validate, harden.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-10 max-w-xl border-b border-line pb-5">
          <p className="eyebrow">FIG. 03 — Instruments</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">Build. Verify. Secure.</h2>
        </Reveal>

        <div className="grid gap-8 border-b border-line pb-10 md:grid-cols-3 md:gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="glass h-full p-5 md:p-6">
                <p className="mono text-[0.62rem] text-accent">0{i + 1}</p>
                <h3 className="display mt-3 text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="pt-10">
          <p className="mono text-[0.65rem] text-mute">TOOLKIT</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
