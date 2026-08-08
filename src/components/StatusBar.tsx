"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

function istClock() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function StatusBar() {
  const [time, setTime] = useState("--:--:--");
  const [sheet, setSheet] = useState(0);
  const [section, setSection] = useState("COVER");

  useEffect(() => {
    setTime(istClock());
    const t = window.setInterval(() => setTime(istClock()), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const map = [
      { id: "top", label: "COVER" },
      { id: "reveal", label: "REVEAL" },
      { id: "work", label: "ARCHIVE" },
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 backdrop-blur-md">
      <div className="wrap flex h-9 items-center justify-between gap-3">
        <p className="mono truncate text-[0.62rem] text-mute">
          <span className="text-accent">{site.location.toUpperCase()}</span> · IST {time}
        </p>
        <p className="mono hidden text-[0.62rem] text-mute sm:block">
          FRAME <span className="text-ink">{section}</span>
        </p>
        <p className="mono text-[0.62rem] text-mute">
          SHEET <span className="text-accent">{String(sheet).padStart(2, "0")}%</span>
          <span className="ml-3 hidden md:inline">CTRL/⌘ K</span>
        </p>
      </div>
    </div>
  );
}
