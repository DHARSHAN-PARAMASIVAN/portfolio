"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const lines = [
  "SIGNAL SHEET v1.0",
  "CALIBRATING SUBJECT DP-01…",
  "LOADING FRAMES…",
  "BUILD · VERIFY · SECURE · SHIP",
  "UPLINK READY",
];

export function BootSequence() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return;
    }
    if (sessionStorage.getItem("dp-booted") === "1") {
      setVisible(false);
      return;
    }

    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= lines.length) {
        window.clearInterval(tick);
        window.setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("dp-booted", "1");
        }, 420);
      }
    }, 320);

    return () => window.clearInterval(tick);
  }, [reduce]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-paper">
      <div className="w-[min(92vw,420px)] border border-line bg-panel p-5 shadow-[8px_8px_0_rgba(0,0,0,0.08)]">
        <p className="mono text-[0.68rem] text-accent">SYSTEM BOOT</p>
        <div className="mt-4 space-y-2">
          {lines.slice(0, step).map((line) => (
            <p key={line} className="mono text-[0.72rem] text-ink">
              <span className="text-accent">›</span> {line}
            </p>
          ))}
          {step < lines.length && (
            <p className="mono animate-pulse text-[0.72rem] text-mute">_</p>
          )}
        </div>
        <div className="mt-5 h-1 overflow-hidden border border-line bg-paper-2">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${(step / lines.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
