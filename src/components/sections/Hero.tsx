"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-20 md:pt-28">
      <div className="wrap pb-16 md:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <p className="eyebrow">{site.role}</p>
            <h1 className="display mt-4 text-[clamp(3.4rem,9vw,6.6rem)]">
              Dharshan
              <span className="mt-1 block italic text-soft">Paramasivan</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-soft md:text-lg">
              {site.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="lab-btn">
                View work →
              </a>
              <a href={`mailto:${site.email}`} className="lab-btn lab-btn-ghost">
                Email me
              </a>
            </div>

            <p className="mono mt-10 text-[0.65rem] text-mute">{site.availability}</p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="overflow-hidden border border-line bg-panel">
              <div className="relative aspect-[4/5] min-h-[360px] sm:min-h-[460px] lg:min-h-[min(68vh,640px)]">
                <Image
                  src="/images/portrait-facing.png"
                  alt={site.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-[center_15%]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
