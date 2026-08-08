"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Always-on hacker atmosphere: scanlines, grain, flicker, random screen tears.
 * Pointer-events none — never blocks the page.
 */
export function GlitchFX() {
  const reduce = useReducedMotion();
  const [tear, setTear] = useState<{ y: number; h: number; x: number } | null>(null);
  const [flash, setFlash] = useState(false);
  const [jitter, setJitter] = useState(0);

  useEffect(() => {
    if (reduce) return;

    const tearLoop = window.setInterval(() => {
      if (Math.random() > 0.55) {
        setTear({
          y: Math.random() * 90,
          h: 1.5 + Math.random() * 8,
          x: (Math.random() - 0.5) * 18,
        });
        window.setTimeout(() => setTear(null), 80 + Math.random() * 140);
      }
    }, 900);

    const flashLoop = window.setInterval(() => {
      if (Math.random() > 0.7) {
        setFlash(true);
        window.setTimeout(() => setFlash(false), 60 + Math.random() * 80);
      }
    }, 2200);

    const jitterLoop = window.setInterval(() => {
      setJitter((Math.random() - 0.5) * 1.2);
      window.setTimeout(() => setJitter(0), 50);
    }, 1600);

    return () => {
      window.clearInterval(tearLoop);
      window.clearInterval(flashLoop);
      window.clearInterval(jitterLoop);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[35] overflow-hidden"
      aria-hidden
      style={{ transform: jitter ? `translate(${jitter}px, ${-jitter}px)` : undefined }}
    >
      {/* Permanent CRT scanlines */}
      <div className="fx-scanlines absolute inset-0" />

      {/* Rolling scan beam — never stops */}
      <div className="fx-scan-beam absolute inset-x-0" />

      {/* Persistent film grain */}
      <div className="fx-noise absolute inset-0" />

      {/* Soft vignette pulse */}
      <div className="fx-vignette absolute inset-0" />

      {/* Chromatic edge fringe */}
      <div className="fx-chroma absolute inset-0" />

      {/* Random horizontal tear */}
      {tear && (
        <div
          className="absolute left-0 right-0 bg-accent/20 mix-blend-screen dark:mix-blend-screen"
          style={{
            top: `${tear.y}%`,
            height: `${tear.h}px`,
            transform: `translateX(${tear.x}px)`,
            boxShadow: "0 0 12px color-mix(in oklab, var(--accent) 40%, transparent)",
          }}
        />
      )}

      {/* Occasional full-frame RGB flash */}
      {flash && <div className="fx-rgb-flash absolute inset-0" />}
    </div>
  );
}
