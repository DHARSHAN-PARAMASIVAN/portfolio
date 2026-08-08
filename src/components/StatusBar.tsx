"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { GlitchText } from "@/components/GlitchText";

function istClock() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

const FLUX = ["SYNC", "SCAN", "LOCK", "LIVE", "PING", "HASH"];

export function StatusBar() {
  const [time, setTime] = useState("--:--:--");
  const [sheet, setSheet] = useState(0);
  const [section, setSection] = useState("COVER");
  const [flux, setFlux] = useState(FLUX[0]);

  useEffect(() => {
    setTime(istClock());
    const t = window.setInterval(() => setTime(istClock()), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFlux(FLUX[Math.floor(Math.random() * FLUX.length)]);
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const map = [
      { id: "top", label: "COVER" },
      { id: "intro", label: "THESIS" },
      { id: "ops", label: "OPS" },
      { id: "work", label: "ARCHIVE" },
      { id: "terminal", label: "SHELL" },
      { id: "experience", label: "LOG" },
      { id: "capabilities", label: "STACK" },
      { id: "about", label: "SUBJECT" },
      { id: "contact", label: "UPLINK" },
    ];

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setSheet(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
      let current = "COVER";
      for (const item of map) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.4) current = item.label;
      }
      setSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md dark:bg-paper/90">
      <div className="wrap flex h-9 items-center justify-between gap-3">
        <p className="mono truncate text-[0.62rem] text-mute">
          <span className="text-accent fx-blink">{flux}</span>
          <span className="mx-2 text-line">·</span>
          <GlitchText text={site.location.toUpperCase()} interval={3200} className="text-accent" />
          <span className="mx-2">·</span>
          IST {time}
        </p>
        <p className="mono hidden text-[0.62rem] text-mute sm:block">
          FRAME <span className="text-ink"><GlitchText text={section} interval={2600} /></span>
        </p>
        <p className="mono text-[0.62rem] text-mute">
          SHEET <span className="text-accent">{String(sheet).padStart(2, "0")}%</span>
          <span className="ml-3 hidden md:inline">CTRL/⌘ K</span>
        </p>
      </div>
    </div>
  );
}
