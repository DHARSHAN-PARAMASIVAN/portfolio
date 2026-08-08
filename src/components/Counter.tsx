"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const dur = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
