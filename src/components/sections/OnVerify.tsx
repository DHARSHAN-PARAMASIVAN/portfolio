"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

const tools = ["SELENIUM", "CUCUMBER", "API TESTING", "JMETER"];

export function OnVerify() {
  return (
    <section id="verify" className="border-t border-line py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <p className="mb-3 text-[0.75rem] tracking-[0.2em] text-cyan">CHAPTER 02</p>
          <h2 className="display text-[clamp(3rem,14vw,9rem)]">
            <span className="block">ON</span>
            <span className="block text-cyan">VERIFY</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-mute">Testing systems before users do.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/visual-verify.png"
                alt="QA automation environment"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-between gap-6">
            <div className="grid grid-cols-2 gap-3">
              {tools.map((t) => (
                <div
                  key={t}
                  className="rounded-xl border border-line bg-panel px-4 py-5 text-center text-sm font-semibold tracking-[0.08em]"
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-line p-5">
                <p className="display text-5xl text-cyan md:text-6xl">
                  <Counter value={40} suffix="%" />
                </p>
                <p className="mt-2 text-mute">Testing time reduction</p>
              </div>
              <div className="rounded-2xl border border-line p-5">
                <p className="display text-5xl text-cyan md:text-6xl">
                  <Counter value={30} suffix="%" />
                </p>
                <p className="mt-2 text-mute">Higher test efficiency</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <h3 className="display text-3xl md:text-4xl">QA CASE STUDY</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "BEFORE",
                body: "Manual repetitive testing.",
              },
              {
                title: "AUTOMATION",
                body: "Reusable Selenium + Cucumber scenarios.",
              },
              {
                title: "AFTER",
                body: "Faster regression testing and improved test efficiency.",
              },
            ].map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-line bg-panel p-6">
                <p className="text-[0.72rem] tracking-[0.16em] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="display mt-3 text-2xl">{step.title}</h4>
                <p className="mt-3 text-mute">{step.body}</p>
                {i < 2 && (
                  <p className="mt-6 hidden text-cyan md:block" aria-hidden>
                    ↓
                  </p>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
