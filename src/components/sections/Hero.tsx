"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { SHELL_HINTS, SHELL_RUN_EVENT } from "@/lib/shell";
import { SmartImage } from "@/components/SmartImage";
import { SystemTicker } from "@/components/SystemTicker";
import { TypeLine } from "@/components/TypeLine";
import { GlitchText } from "@/components/GlitchText";

function openShell(cmd?: string) {
  document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (cmd) {
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent(SHELL_RUN_EVENT, { detail: cmd }));
    }, 450);
  }
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-20 md:pt-28">
      <div className="wrap pb-16 md:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <motion.p
              className="eyebrow"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.role}
            </motion.p>
            <motion.h1
              className="display mt-4 text-[clamp(3.4rem,9vw,6.6rem)]"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlitchText text="Dharshan" />
              <span className="mt-1 block italic text-soft">
                <GlitchText text="Paramasivan" />
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-soft md:text-lg"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <TypeLine text={site.tagline} speed={22} />
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#work" className="lab-btn lab-btn-solid">
                View work →
              </a>
              <button type="button" className="lab-btn" onClick={() => openShell()}>
                Open shell
              </button>
              <a href={`mailto:${site.email}`} className="lab-btn">
                Email me
              </a>
            </motion.div>

            <motion.div
              className="mt-8 max-w-lg border border-line bg-paper-2/90 p-3 backdrop-blur-sm dark:bg-panel/80"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="mono text-[0.62rem] text-accent">SHELL · COMMAND REF</p>
                <button
                  type="button"
                  onClick={() => openShell()}
                  className="mono text-[0.55rem] text-mute underline-offset-2 hover:text-accent hover:underline"
                >
                  full tty ↓
                </button>
              </div>
              <p className="mt-2 text-xs text-soft">
                Interactive terminal further down. Tap a command to run it there:
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {SHELL_HINTS.map((h) => (
                  <button
                    key={h.cmd}
                    type="button"
                    title={h.hint}
                    data-cursor="hover"
                    onClick={() => openShell(h.cmd)}
                    className="chip"
                  >
                    <span className="text-accent">$</span>&nbsp;{h.cmd}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mt-6 max-w-md"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <SystemTicker />
              <p className="mono mt-3 text-[0.65rem] text-mute">{site.availability}</p>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="overflow-hidden border border-line bg-panel">
              <div className="relative aspect-[4/5] min-h-[360px] sm:min-h-[460px] lg:min-h-[min(68vh,640px)]">
                <SmartImage
                  src="/images/portrait-facing.png"
                  alt={site.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-[center_15%]"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 border border-line bg-night/70 px-2 py-1 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="mono text-[0.55rem] text-white/80">SIGNAL LIVE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
