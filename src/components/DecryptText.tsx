"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  value: string;
  className?: string;
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@._-";

/** Cipher-style reveal on scroll into view — classic hacker decode */
export function DecryptText({ value, className = "" }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(reduce ? value : "");
  const [done, setDone] = useState(!!reduce);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const len = value.length;
      let frame = 0;
      const total = Math.max(28, len * 2);

      const tick = () => {
        frame += 1;
        const progress = Math.min(1, frame / total);
        const reveal = Math.floor(progress * len);
        let out = "";
        for (let i = 0; i < len; i++) {
          if (i < reveal) out += value[i];
          else if (value[i] === " " || value[i] === "@" || value[i] === ".")
            out += value[i];
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setShown(out);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else {
          setShown(value);
          setDone(true);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduce]);

  return (
    <span ref={ref} className={className} aria-label={value} data-decrypted={done || undefined}>
      {shown || "\u00a0".repeat(Math.min(value.length, 24))}
    </span>
  );
}
