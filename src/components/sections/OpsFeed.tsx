"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

const SEED = [
  "IDS · anomaly score 0.12 · baseline",
  "WAF · sql injection attempt blocked · /api/v1",
  "AUTH · jwt rotated · kid=dp-2026",
  "SCAN · openapi surface mapped · 48 endpoints",
  "BURP · active scan queued · api-security-lab",
  "ZAP · spider complete · 0 critical",
  "RATE · 429 on /login · brute force dampened",
  "TLS · 1.3 only · hsts preload",
  "LOG · selenium suite green · 40% time saved",
  "SHIP · vortexiot heartbeat OK",
];

type Row = { t: string; msg: string };

function nowStamp() {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

/** Fake SOC / IDS feed that auto-streams — security-hacker vibe */
export function OpsFeed() {
  const [rows, setRows] = useState<Row[]>(() =>
    SEED.slice(0, 4).map((msg) => ({ t: nowStamp(), msg }))
  );

  useEffect(() => {
    let i = 4;
    const id = window.setInterval(() => {
      const msg = SEED[i % SEED.length];
      i += 1;
      setRows((prev) => [...prev.slice(-5), { t: nowStamp(), msg }]);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="ops" className="pb-16 md:pb-20">
      <div className="wrap">
        <Reveal>
          <div className="border border-line bg-paper-2/90 shadow-sm backdrop-blur-sm dark:bg-panel/70 dark:shadow-none">
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <p className="mono text-[0.62rem] text-accent">OPS FEED // LIVE</p>
              <p className="mono text-[0.55rem] text-mute">
                <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
                MONITORING
              </p>
            </div>
            <div className="space-y-1.5 px-4 py-3 font-mono text-[0.68rem] text-mute">
              {rows.map((r, idx) => (
                <p key={`${r.t}-${idx}-${r.msg}`} className="truncate">
                  <span className="text-accent/80">[{r.t}]</span> {r.msg}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
