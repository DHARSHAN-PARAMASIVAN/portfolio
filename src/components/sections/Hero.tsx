"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
        <Image
          src="/images/hero-portrait.png"
          alt={`${site.name} cinematic portrait`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_top]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex h-full flex-col justify-end pb-16 pt-28"
      >
        <div className="wrap max-w-3xl">
          <p className="mb-4 text-[0.78rem] font-medium tracking-[0.18em] text-mute">
            FULL-STACK ENGINEER / QA / API SECURITY
          </p>
          <h1 className="display text-[clamp(3rem,12vw,7.5rem)]">
            <span className="block">DHARSHAN</span>
            <span className="block text-cyan">PARAMASIVAN</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-mute md:text-lg">{site.tagline}</p>
          <a
            href="#intro"
            className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.18em] text-ink/80"
          >
            SCROLL TO EXPLORE ↓
          </a>
        </div>
      </motion.div>
    </section>
  );
}
