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

  const gap = hover ? 14 : 7;
  const arm = hover ? 10 : 7;

  return (
    <div
      className="pointer-events-none fixed z-[90]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        width: gap * 2 + arm * 2,
        height: gap * 2 + arm * 2,
        transition: "width 0.2s ease, height 0.2s ease",
      }}
      aria-hidden
    >
      {(
        [
          { t: 0, l: 0, bt: true, bl: true },
          { t: 0, r: 0, bt: true, br: true },
          { b: 0, l: 0, bb: true, bl: true },
          { b: 0, r: 0, bb: true, br: true },
        ] as const
      ).map((c, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: "t" in c ? c.t : undefined,
            bottom: "b" in c ? c.b : undefined,
            left: "l" in c ? c.l : undefined,
            right: "r" in c ? c.r : undefined,
            width: arm,
            height: arm,
            borderTop: "bt" in c && c.bt ? "1.5px solid var(--ink)" : undefined,
            borderBottom: "bb" in c && c.bb ? "1.5px solid var(--ink)" : undefined,
            borderLeft: "bl" in c && c.bl ? "1.5px solid var(--ink)" : undefined,
            borderRight: "br" in c && c.br ? "1.5px solid var(--ink)" : undefined,
            transition: "width 0.2s ease, height 0.2s ease",
          }}
        />
      ))}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: hover ? 6 : 3,
          height: 1.5,
          background: "var(--accent)",
          transition: "width 0.2s ease",
        }}
      />
    </div>
  );
}
