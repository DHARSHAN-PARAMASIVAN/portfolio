"use client";

import { useEffect, useState } from "react";

export function Progress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-0.5 bg-gradient-to-r from-cyan to-white/70"
      style={{ width: `${width}%` }}
      aria-hidden
    />
  );
}
