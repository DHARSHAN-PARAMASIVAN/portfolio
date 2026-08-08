"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function LabCursor() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.body.classList.add("lab-cursor-on");

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(Boolean(t?.closest("a, button, [data-cursor='hover']")));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.body.classList.remove("lab-cursor-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [reduce]);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed z-[90] mix-blend-difference ${
        hover ? "scale-125" : "scale-100"
      }`}
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        transition: "transform 0.15s ease, width 0.15s ease, height 0.15s ease",
      }}
      aria-hidden
    >
      <div className="relative h-8 w-8">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white" />
        <span className="absolute inset-1 border border-white/80" />
      </div>
      <p className="mono absolute left-5 top-5 whitespace-nowrap text-[0.58rem] text-white">
        {Math.round(pos.x).toString().padStart(4, "0")} · {Math.round(pos.y).toString().padStart(4, "0")}
      </p>
    </div>
  );
}
