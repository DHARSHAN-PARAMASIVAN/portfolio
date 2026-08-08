"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

const lines = ["I BUILD.", "I VERIFY.", "I SECURE.", "I SHIP."];

export function Intro() {
  const reduce = useReducedMotion();

  return (
    <section id="intro" className="border-y border-line py-24 md:py-32">
      <div className="wrap">
        <div className="space-y-2 md:space-y-3">
          {lines.map((line, i) => (
            <motion.h2
              key={line}
              className="display text-[clamp(2.4rem,10vw,7rem)]"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {i % 2 === 1 ? <span className="text-cyan">{line}</span> : line}
            </motion.h2>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-xl font-medium leading-snug text-ink md:text-2xl">
          It doesn&apos;t matter where you start. It&apos;s how you{" "}
          <span className="text-cyan">progress</span> from there.
        </p>
        <p className="mt-5 max-w-2xl text-mute md:text-lg">
          I&apos;m interested in the complete software lifecycle — from architecture and development
          to testing, security and production deployment.
        </p>
        <p className="mt-8 text-[0.75rem] tracking-[0.2em] text-mute">
          {site.mantra.join(" · ")}
        </p>
      </div>
    </section>
  );
}
