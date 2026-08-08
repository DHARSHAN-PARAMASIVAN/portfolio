"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Types out text once, then holds — automated but calm */
export function TypeLine({
  text,
  className = "",
  speed = 28,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, reduce]);

  return (
    <span className={className}>
      {out}
      {!reduce && out.length < text.length && (
        <span className="ml-0.5 inline-block animate-pulse text-accent">|</span>
      )}
    </span>
  );
}
