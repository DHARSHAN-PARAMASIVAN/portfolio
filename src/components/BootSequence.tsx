"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const lines = ["SIGNAL SHEET", "LOADING ARCHIVE…", "READY"];

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
        }, 280);
      }
    }, 220);

    return () => window.clearInterval(tick);
  }, [reduce]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-paper">
      <div className="w-[min(88vw,360px)] px-2">
        <p className="mono text-[0.68rem] text-accent">BOOT</p>
        <div className="mt-4 space-y-2">
          {lines.slice(0, step).map((line) => (
            <p key={line} className="mono text-[0.75rem] text-ink">
              {line}
            </p>
          ))}
        </div>
        <div className="mt-6 h-px overflow-hidden bg-line">
          <div
            className="h-full bg-accent transition-all duration-200"
            style={{ width: `${(step / lines.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
