"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const LINES = [
  "SCAN · portfolio integrity OK",
  "SYNC · github uplink active",
  "VERIFY · automation suites ready",
  "SECURE · api surface monitored",
  "SHIP · vortexiot production live",
  "STATUS · open to roles / remote",
];

/** Auto-cycling system log — hacker HUD without forced scroll */
export function SystemTicker() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setI((v) => (v + 1) % LINES.length);
        setVisible(true);
      }, 220);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="border border-line bg-paper-2/90 px-3 py-2 backdrop-blur-sm dark:bg-panel/80">
      <p
        className={`mono text-[0.62rem] text-mute transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-accent">›</span> {LINES[i]}
        <span className="ml-1 inline-block animate-pulse text-accent">_</span>
      </p>
    </div>
  );
}
