"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { skills } from "@/lib/site";

const pillars = [
  {
    title: "Build",
    copy: "Full-stack apps with Django, MERN, Next.js, FastAPI, and production-minded APIs.",
    image: "/images/visual-build.png",
  },
  {
    title: "Verify",
    copy: "Selenium + Cucumber automation that cut testing time and raised coverage.",
    image: "/images/visual-verify.png",
    stats: [
      { value: 40, label: "Faster testing" },
      { value: 30, label: "Efficiency gain" },
    ],
  },
  {
    title: "Secure",
    copy: "API VAPT with Burp Suite, OWASP ZAP, and Postman — discover, validate, harden.",
    image: "/images/visual-secure.png",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-10">
          <p className="eyebrow">Capabilities</p>
          <h2 className="display mt-3 text-4xl font-700 md:text-5xl">
            Build. Verify. Secure. Ship.
          </h2>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="surface overflow-hidden h-full">
                <div className="relative aspect-[16/10]">
                  <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover" />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="display text-2xl font-700">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{p.copy}</p>
                  {p.stats && (
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {p.stats.map((s) => (
                        <div key={s.label} className="rounded-xl bg-paper-2 p-3">
                          <p className="display text-2xl font-700 text-accent">
                            <Counter value={s.value} suffix="%" />
                          </p>
                          <p className="mt-1 text-xs text-mute">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="surface mt-5 p-6 md:p-8">
          <p className="eyebrow">Toolkit</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-medium text-soft transition hover:border-accent/40 hover:text-ink"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
