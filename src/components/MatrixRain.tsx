"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

/** Subtle binary rain — visible in both light and dark themes */
export function MatrixRain() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dark = isDarkTheme();
    const chars = "01アカサタナハマヤラワ<>/$#*";
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const syncTheme = () => {
      dark = isDarkTheme();
      // Light: normal blend + higher opacity so glyphs read on #eceef2
      // Dark: screen blend for soft glow on black
      canvas.style.mixBlendMode = dark ? "screen" : "normal";
      canvas.style.opacity = dark ? "0.45" : "0.7";
      // Wipe so old trail doesn't tint the new theme
      ctx.clearRect(0, 0, w, h);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      columns = Math.floor(w / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    };

    const draw = () => {
      if (dark) {
        ctx.fillStyle = "rgba(2, 2, 2, 0.08)";
      } else {
        // Match light paper so trails dissolve cleanly
        ctx.fillStyle = "rgba(236, 238, 242, 0.18)";
      }
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px ui-monospace, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (dark) {
          ctx.fillStyle = i % 7 === 0 ? "rgba(59,130,246,0.4)" : "rgba(56,189,248,0.14)";
        } else {
          // Stronger ink blues so rain is obvious on light paper
          ctx.fillStyle = i % 5 === 0 ? "rgba(29,78,216,0.55)" : "rgba(37,99,235,0.28)";
        }
        ctx.fillText(ch, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    syncTheme();
    resize();
    draw();

    const mo = new MutationObserver(syncTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 opacity-70 dark:z-0 dark:opacity-45 dark:mix-blend-screen"
      aria-hidden
    />
  );
}
