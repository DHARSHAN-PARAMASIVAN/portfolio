"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
      particles = Array.from({ length: Math.max(28, Math.min(count, 70)) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
      }));
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const isDark = theme === "dark";
      const accent = isDark ? "34, 211, 238" : "29, 78, 216";
      const link = isDark ? "148, 163, 184" : "100, 116, 139";

      // soft moving orbs
      const t = performance.now() * 0.00015;
      const orbA = {
        x: w * (0.2 + Math.sin(t) * 0.08),
        y: h * (0.25 + Math.cos(t * 0.8) * 0.06),
      };
      const orbB = {
        x: w * (0.75 + Math.cos(t * 0.9) * 0.07),
        y: h * (0.65 + Math.sin(t * 1.1) * 0.08),
      };

      const glow = (x: number, y: number, radius: number, alpha: number) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, `rgba(${accent}, ${alpha})`);
        g.addColorStop(1, `rgba(${accent}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      glow(orbA.x, orbA.y, isDark ? 280 : 320, isDark ? 0.14 : 0.1);
      glow(orbB.x, orbB.y, isDark ? 300 : 340, isDark ? 0.12 : 0.08);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
        }

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 0.7) {
          p.vx *= 0.98;
          p.vy *= 0.98;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${accent}, ${isDark ? 0.55 : 0.45})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(${link}, ${((1 - dist / 130) * (isDark ? 0.22 : 0.16)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, theme]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-paper transition-colors duration-500" />
      <div className="bg-mesh absolute inset-0 opacity-80 transition-opacity duration-500" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/80" />
    </div>
  );
}
