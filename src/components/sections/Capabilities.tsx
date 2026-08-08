"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { skills } from "@/lib/site";

const pillars = [
  {
    title: "Build",
    copy: "Django, MERN, Next.js, FastAPI — products designed to survive production.",
    image: "/images/visual-build.png",
  },
  {
    title: "Verify",
    copy: "Selenium + Cucumber automation that reduced testing time and raised coverage.",
    image: "/images/visual-verify.png",
    stats: [
      { value: 40, label: "Faster testing" },
      { value: 30, label: "Efficiency" },
    ],
  },
  {
    title: "Secure",
    copy: "API VAPT with Burp Suite, OWASP ZAP, Postman — discover, validate, harden.",
    image: "/images/visual-secure.png",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-8 border-b border-line pb-4">
          <p className="eyebrow">FIG. 03 — Instruments</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">Build. Verify. Secure.</h2>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="frame h-full overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover" />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="display text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-soft">{p.copy}</p>
                  {p.stats && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {p.stats.map((s) => (
                        <div key={s.label} className="border border-line bg-paper-2 p-3">
                          <p className="display text-2xl text-accent">
                            <Counter value={s.value} suffix="%" />
                          </p>
                          <p className="mono mt-1 text-[0.6rem] text-mute">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="frame mt-4 p-5 md:p-6">
          <p className="eyebrow">Toolkit strip</p>
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
