"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

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
    const mouse = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.35, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const ribbon = (
      yBase: number,
      amp: number,
      speed: number,
      wavelength: number,
      color: string,
      thickness: number,
      t: number
    ) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y =
          yBase +
          Math.sin(x / wavelength + t * speed) * amp +
          Math.cos(x / (wavelength * 1.6) - t * speed * 0.7) * (amp * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h + 40);
      ctx.lineTo(0, h + 40);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, yBase - amp * 2, 0, h);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.globalAlpha = 1;
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y =
          yBase +
          Math.sin(x / wavelength + t * speed) * amp +
          Math.cos(x / (wavelength * 1.6) - t * speed * 0.7) * (amp * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = performance.now() * 0.001;
      const isDark = theme === "dark";

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      ctx.clearRect(0, 0, w, h);

      // soft aurora washes
      const washes = isDark
        ? [
            { x: w * 0.18, y: h * 0.22, r: 340, c: "56,189,248", a: 0.16 },
            { x: w * 0.78, y: h * 0.28, r: 380, c: "99,102,241", a: 0.12 },
            { x: w * 0.55, y: h * 0.78, r: 420, c: "34,211,238", a: 0.1 },
          ]
        : [
            { x: w * 0.2, y: h * 0.2, r: 360, c: "59,130,246", a: 0.14 },
            { x: w * 0.82, y: h * 0.3, r: 400, c: "14,165,233", a: 0.11 },
            { x: w * 0.5, y: h * 0.82, r: 440, c: "99,102,241", a: 0.08 },
          ];

      for (const wash of washes) {
        const driftX = wash.x + Math.sin(t * 0.35 + wash.r) * 40;
        const driftY = wash.y + Math.cos(t * 0.28 + wash.r) * 30;
        const g = ctx.createRadialGradient(driftX, driftY, 0, driftX, driftY, wash.r);
        g.addColorStop(0, `rgba(${wash.c}, ${wash.a})`);
        g.addColorStop(1, `rgba(${wash.c}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(driftX, driftY, wash.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // flowing silk ribbons (unique vs particle networks)
      if (isDark) {
        ribbon(h * 0.42, 48, 0.55, 190, "rgba(56,189,248,0.08)", 1.2, t);
        ribbon(h * 0.58, 62, 0.4, 240, "rgba(99,102,241,0.07)", 1.2, t + 1.2);
        ribbon(h * 0.72, 40, 0.65, 170, "rgba(34,211,238,0.06)", 1, t + 2.1);
      } else {
        ribbon(h * 0.45, 42, 0.5, 210, "rgba(37,99,235,0.07)", 1.2, t);
        ribbon(h * 0.6, 55, 0.38, 250, "rgba(14,165,233,0.06)", 1.2, t + 1.1);
        ribbon(h * 0.74, 36, 0.6, 180, "rgba(99,102,241,0.05)", 1, t + 2);
      }

      // mouse spotlight bloom
      const spot = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
      spot.addColorStop(0, isDark ? "rgba(125,211,252,0.16)" : "rgba(59,130,246,0.12)");
      spot.addColorStop(0.45, isDark ? "rgba(56,189,248,0.05)" : "rgba(14,165,233,0.04)");
      spot.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = spot;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 260, 0, Math.PI * 2);
      ctx.fill();

      // sparse floating light dust (not a network)
      ctx.fillStyle = isDark ? "rgba(186,230,253,0.35)" : "rgba(37,99,235,0.22)";
      for (let i = 0; i < 18; i++) {
        const px = ((Math.sin(t * 0.2 + i * 12.7) + 1) / 2) * w;
        const py = ((Math.cos(t * 0.17 + i * 9.3) + 1) / 2) * h;
        const pr = 1.1 + (i % 3) * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    mouse.tx = mouse.x;
    mouse.ty = mouse.y;
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
      <div className="bg-aurora absolute inset-0 transition-opacity duration-500" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/20 to-paper/85" />
    </div>
  );
}
