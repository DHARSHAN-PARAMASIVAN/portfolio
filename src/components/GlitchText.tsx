"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** Base interval between bursts (ms). Default continuous ~1.8s */
  interval?: number;
  /** Keep a subtle always-on chromatic shimmer */
  live?: boolean;
};

const GLYPHS = "!<>-_\\/[]{}—=+*^?#█▓░¦±§";

/** Continuous scramble / chromatic glitch — loops forever */
export function GlitchText({
  text,
  className = "",
  interval = 1800,
  live = true,
}: Props) {
  const reduce = useReducedMotion();
  const [glitching, setGlitching] = useState(false);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce) return;
    let scrambleTimer: number | undefined;
    let burstTimer: number | undefined;

    const burst = () => {
      setGlitching(true);
      let frames = 0;
      const max = 4 + Math.floor(Math.random() * 5);
      window.clearInterval(scrambleTimer);
      scrambleTimer = window.setInterval(() => {
        frames += 1;
        if (frames > max) {
          window.clearInterval(scrambleTimer);
          setDisplay(text);
          setGlitching(false);
          // Schedule next burst — never stops
          const next = interval * (0.55 + Math.random() * 0.9);
          burstTimer = window.setTimeout(burst, next);
          return;
        }
        setDisplay(
          text
            .split("")
            .map((ch) =>
              ch === " " || Math.random() > 0.4
                ? ch
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            )
            .join("")
        );
      }, 32);
    };

    const start = window.setTimeout(burst, 400 + Math.random() * 600);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(burstTimer);
      window.clearInterval(scrambleTimer);
    };
  }, [text, interval, reduce]);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`relative inline-block ${live ? "glitch-live" : ""} ${
        glitching ? "glitch-active" : ""
      } ${className}`}
      data-text={text}
      aria-label={text}
    >
      <span aria-hidden className="glitch-layer glitch-layer--a">
        {display}
      </span>
      <span aria-hidden className="glitch-layer glitch-layer--b">
        {display}
      </span>
      {display}
    </span>
  );
}
