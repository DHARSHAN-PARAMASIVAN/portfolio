"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const tools = ["Burp Suite", "OWASP ZAP", "Postman", "API Testing"];
const flow = ["REQUEST", "TEST", "IDENTIFY", "FIX", "VERIFY"];
const focus = [
  "Endpoint discovery",
  "Authentication testing",
  "Authorization testing",
  "Input validation",
  "Security headers",
  "Rate limiting",
  "Vulnerability validation",
  "Hardening recommendations",
];

export function OnSecurity() {
  return (
    <section id="secure" className="border-t border-line py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <p className="mb-3 text-[0.75rem] tracking-[0.2em] text-cyan">CHAPTER 03</p>
          <h2 className="display text-[clamp(3rem,14vw,9rem)]">
            <span className="block">ON</span>
            <span className="block text-cyan">SECURITY</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-mute">
            Every endpoint has a story. Test it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/visual-secure.png"
                alt="API security visual"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-4 py-2 text-sm text-mute"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {flow.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="display text-lg text-cyan md:text-xl">{step}</span>
                  {i < flow.length - 1 && <span className="text-mute">↓</span>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 rounded-2xl border border-line bg-panel p-6 md:p-10">
          <h3 className="display text-3xl md:text-4xl">API VAPT</h3>
          <p className="mt-3 max-w-2xl text-mute">
            A structured approach to pressure-testing APIs — without inventing vulnerability claims.
            Focus on methodical discovery, validation, and hardening guidance.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {focus.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-line bg-bg/50 px-4 py-4 text-sm text-ink/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
