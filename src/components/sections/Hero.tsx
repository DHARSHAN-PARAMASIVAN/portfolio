"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-20 md:pt-24">
      <div className="wrap grid items-center gap-8 pb-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-10 lg:pb-16 xl:gap-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-sm text-soft shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Available for roles · {site.location}
          </div>

          <p className="eyebrow mb-4">Full-Stack Engineer</p>

          <h1 className="display text-[clamp(2.6rem,6.5vw,4.8rem)] font-extrabold">
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
              className="btn-glow inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:-translate-y-0.5 hover:shadow-accent/40"
            >
              View selected work <ArrowDownRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold text-ink hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10"
            >
              Contact
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1 px-2 py-3 text-sm font-semibold text-mute hover:text-ink"
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
              <div
                key={item.v}
                className="rounded-xl p-2 transition hover:-translate-y-1 hover:bg-panel hover:shadow-md"
              >
                <p className="display text-2xl font-bold text-accent md:text-3xl">{item.k}</p>
                <p className="mt-1 text-xs text-mute md:text-sm">{item.v}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 relative w-full lg:order-2"
        >
          <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-accent/25 via-accent-2/15 to-transparent blur-3xl" />
          <div className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-night shadow-2xl shadow-ink/25 transition duration-500 hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_35px_90px_rgba(56,189,248,0.28)] md:rounded-[2rem]">
            <div className="img-zoom relative aspect-[4/5] w-full min-h-[420px] sm:min-h-[520px] lg:min-h-[min(78vh,720px)]">
              <Image
                src="/images/portrait-facing.png"
                alt={`${site.name} professional portrait`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-[center_12%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/50 to-transparent p-5 md:p-7">
                <p className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase md:text-sm">
                  Build · Verify · Secure · Ship
                </p>
                <p className="mt-1 text-sm font-medium text-white/90 md:text-base">{site.role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
