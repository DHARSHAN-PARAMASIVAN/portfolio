"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

const BOOT_LINES = [
  { text: "> establishing secure channel…", delay: 260 },
  { text: "> authenticating guest node…", delay: 300 },
  { text: "> decrypting signal sheet…", delay: 280 },
  { text: `> identity  :: ${site.name.toLowerCase().replace(/\s+/g, ".")}`, delay: 320 },
  { text: `> clearance :: ${site.mantra.join(" · ")}`, delay: 280 },
  { text: `> host      :: ${site.location.toLowerCase()}.in`, delay: 260 },
  { text: "> status    :: ACCESS GRANTED", delay: 360, accent: true as const },
  { text: "> entering portfolio…", delay: 400 },
];

const STORAGE_KEY = "dp-booted";

/**
 * Hacker boot intro on first visit per tab session.
 * Never blocks forever — skip + hard failsafe timeout.
 */
export function BootSequence() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [shown, setShown] = useState(0);
  const [pct, setPct] = useState(0);
  const closedRef = useRef(false);

  const close = useCallback(() => {
    if (closedRef.current) return;
    closedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setLeaving(true);
    window.setTimeout(() => {
      setActive(false);
      setLeaving(false);
      document.body.style.overflow = "";
    }, 420);
  }, []);

  // Decide once on mount whether to show boot (no blank "pending" gate)
  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* show boot */
    }
    setActive(true);
  }, [reduce]);

  // Run the sequence
  useEffect(() => {
    if (!active || leaving || reduce) return;

    document.body.style.overflow = "hidden";
    closedRef.current = false;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);

    let cancelled = false;
    let lineTimer = 0;
    let i = 0;

    const progressTimer = window.setInterval(() => {
      setPct((p) => (p >= 96 ? p : Math.min(96, p + 1)));
    }, 40);

    // Hard failsafe — never leave users on a blank/stuck overlay
    const failsafe = window.setTimeout(() => close(), 8000);

    const revealNext = () => {
      if (cancelled || closedRef.current) return;
      if (i >= BOOT_LINES.length) {
        setPct(100);
        lineTimer = window.setTimeout(() => close(), 500);
        return;
      }
      const line = BOOT_LINES[i];
      i += 1;
      setShown(i);
      setPct(Math.round((i / BOOT_LINES.length) * 100));
      lineTimer = window.setTimeout(revealNext, line.delay);
    };

    lineTimer = window.setTimeout(revealNext, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(lineTimer);
      window.clearTimeout(failsafe);
      window.clearInterval(progressTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, leaving, reduce, close]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="System boot sequence"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 hud-grid opacity-50" aria-hidden />

      <div className="relative w-[min(92vw,440px)] border border-line bg-paper-2 p-5 shadow-sm dark:bg-panel md:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
          <div>
            <p className="mono text-[0.62rem] text-accent">DP://BOOT · SIGNAL SHEET</p>
            <p className="mono mt-1 text-[0.55rem] text-mute">UNAUTHORIZED ACCESS LOGGED</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="lab-btn !px-3 !py-1.5 text-[0.6rem]"
            data-cursor="hover"
          >
            SKIP
          </button>
        </div>

        <div className="mt-4 min-h-[11.5rem] space-y-1.5 font-mono text-[0.7rem] leading-relaxed text-ink md:text-[0.75rem]">
          {BOOT_LINES.slice(0, shown).map((line) => (
            <p key={line.text} className={line.accent ? "font-medium text-accent" : undefined}>
              {line.text}
              {line.accent && (
                <span className="ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              )}
            </p>
          ))}
          {!leaving && shown < BOOT_LINES.length && (
            <p className="text-mute">
              <span className="animate-pulse">_</span>
            </p>
          )}
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex justify-between font-mono text-[0.55rem] text-mute">
            <span>INIT</span>
            <span>{String(Math.min(pct, 100)).padStart(2, "0")}%</span>
          </div>
          <div className="h-1 overflow-hidden border border-line bg-paper">
            <div
              className="h-full bg-accent transition-[width] duration-200 ease-out"
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[0.55rem] text-mute">
          {site.short} · BUILD · VERIFY · SECURE · SHIP
        </p>
        <p className="mt-2 text-center font-mono text-[0.55rem] text-mute">
          Press ESC or SKIP to enter
        </p>
      </div>
    </div>
  );
}
