"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789█░▒";

export function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(text);

  useEffect(() => {
    if (reduce) {
      setValue(text);
      return;
    }
    let frame = 0;
    const total = Math.max(18, text.length + 8);
    const id = window.setInterval(() => {
      frame += 1;
      const progress = frame / total;
      const revealed = Math.floor(progress * text.length);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "\n") return ch;
          if (i < revealed) return text[i];
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join("");
      setValue(next);
      if (frame >= total) {
        setValue(text);
        window.clearInterval(id);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [text, reduce]);

  return <Tag className={className}>{value}</Tag>;
}
