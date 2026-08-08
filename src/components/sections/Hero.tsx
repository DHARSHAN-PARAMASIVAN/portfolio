"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="wrap grid items-center gap-10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-sm text-soft shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for roles · {site.location}
          </div>

          <p className="eyebrow mb-4">Full-Stack Engineer</p>

          <h1 className="display text-[clamp(2.8rem,7vw,5.4rem)] font-800">
            Dharshan
            <span className="block text-soft">Paramasivan</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft md:text-xl">
            I design and ship full-stack systems, automate quality with Selenium &amp; Cucumber,
            and harden APIs before they reach production.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:brightness-110"
            >
              View selected work <ArrowDownRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/40"
            >
              Contact
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-3 text-sm font-semibold text-mute transition hover:text-ink"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-line pt-6">
            {[
              { k: "40%", v: "Faster testing" },
              { k: "25%", v: "Backend lift" },
              { k: "1", v: "Live IoT app" },
            ].map((item) => (
              <div key={item.v}>
                <p className="display text-2xl font-700 text-accent md:text-3xl">{item.k}</p>
                <p className="mt-1 text-xs text-mute md:text-sm">{item.v}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[480px]"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-night shadow-2xl shadow-ink/20">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/portrait-editorial.png"
                alt={`${site.name} professional portrait`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/40 to-transparent p-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">
                  Build · Verify · Secure · Ship
                </p>
                <p className="mt-1 text-sm font-medium text-white/90">{site.role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
