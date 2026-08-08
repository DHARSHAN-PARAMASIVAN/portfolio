"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-20 md:pt-24">
      <div className="wrap pb-12 md:pb-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <p className="mono text-[0.68rem] text-mute">FIELD NOTES // {new Date().getFullYear()}</p>
          <p className="mono text-[0.68rem] text-mute">SUBJECT: {site.short}-01</p>
          <p className="mono text-[0.68rem] text-accent">{site.location.toUpperCase()} · OPEN</p>
        </div>

        <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="order-2 lg:order-1"
          >
            <p className="eyebrow">Full-stack · QA · API security</p>
            <h1 className="display mt-3 text-[clamp(3.2rem,9vw,6.4rem)]">
              Dharshan
              <span className="mt-1 block italic text-soft">Paramasivan</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-soft md:text-lg">
              Not another generic developer site. A lab log of systems I{" "}
              <span className="text-accent">build</span>,{" "}
              <span className="text-accent">verify</span>,{" "}
              <span className="text-accent">secure</span>, and{" "}
              <span className="text-accent">ship</span>.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#work" className="lab-btn">
                Open archive →
              </a>
              <a href="#contact" className="lab-btn lab-btn-ghost">
                Establish link
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-0 border border-line">
              {[
                { k: "40%", v: "TEST TIME ↓" },
                { k: "25%", v: "BACKEND ↑" },
                { k: "LIVE", v: "VORTEXIOT" },
              ].map((item, i) => (
                <div
                  key={item.v}
                  className={`bg-panel p-3 md:p-4 ${i < 2 ? "border-r border-line" : ""}`}
                >
                  <p className="display text-2xl text-accent md:text-3xl">{item.k}</p>
                  <p className="mono mt-1 text-[0.62rem] text-mute">{item.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="order-1 lg:order-2"
          >
            <div className="crop-marks frame overflow-hidden">
              <div className="flex items-center justify-between border-b border-line bg-paper-2 px-3 py-2">
                <span className="mono text-[0.62rem] text-mute">FRAME 01</span>
                <span className="mono text-[0.62rem] text-accent">PORTRAIT // FACING</span>
                <span className="mono text-[0.62rem] text-mute">ISO LAB</span>
              </div>
              <div className="relative aspect-[4/5] min-h-[380px] sm:min-h-[480px] lg:min-h-[min(72vh,680px)]">
                <Image
                  src="/images/portrait-facing.png"
                  alt={`${site.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[center_15%]"
                />
              </div>
              <div className="flex items-center justify-between border-t border-line bg-paper-2 px-3 py-2">
                <span className="mono text-[0.62rem] text-mute">BUILD · VERIFY · SECURE · SHIP</span>
                <span className="mono text-[0.62rem] text-mute">CONT. →</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
