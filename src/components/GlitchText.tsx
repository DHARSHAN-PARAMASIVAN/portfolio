"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** How often a glitch burst fires (ms). Default ~4.5s */
  interval?: number;
};

/** Occasional chromatic / scramble glitch on text — hacker signal, not constant noise */
export function GlitchText({ text, className = "", interval = 4500 }: Props) {
  const reduce = useReducedMotion();
  const [glitching, setGlitching] = useState(false);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce) return;
    let scrambleTimer: number | undefined;
    const burst = () => {
      setGlitching(true);
      const glyphs = "!<>-_\\/[]{}—=+*^?#________";
      let frames = 0;
      scrambleTimer = window.setInterval(() => {
        frames += 1;
        if (frames > 6) {
          window.clearInterval(scrambleTimer);
          setDisplay(text);
          setGlitching(false);
          return;
        }
        setDisplay(
          text
            .split("")
            .map((ch) =>
              ch === " " || Math.random() > 0.45
                ? ch
                : glyphs[Math.floor(Math.random() * glyphs.length)]
            )
            .join("")
        );
      }, 40);
    };

    const delay = window.setTimeout(burst, 1200 + Math.random() * 800);
    const id = window.setInterval(burst, interval + Math.random() * 2000);
    return () => {
      window.clearTimeout(delay);
      window.clearInterval(id);
      if (scrambleTimer) window.clearInterval(scrambleTimer);
    };
  }, [text, interval, reduce]);

  return (
    <span
      className={`relative inline-block ${glitching ? "glitch-active" : ""} ${className}`}
      data-text={text}
      aria-label={text}
    >
      {display}
    </span>
  );
}
