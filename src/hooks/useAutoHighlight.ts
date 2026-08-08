"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Auto-highlights sheet-index rows in sequence so the archive feels alive.
 */
export function useAutoHighlight(count: number, intervalMs = 2800) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || count <= 0) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [count, intervalMs, paused, reduce]);

  return {
    active,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
