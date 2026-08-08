"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export function TiltFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * 10;
    const ry = (x - 0.5) * 12;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`transition-transform duration-200 will-change-transform ${className}`}
      data-cursor="hover"
    >
      {children}
    </div>
  );
}
