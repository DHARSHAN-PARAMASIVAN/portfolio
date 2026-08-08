"use client";

import { useEffect, useMemo, useState } from "react";

const destinations = [
  { id: "top", label: "00 · Home", hint: "Signal sheet cover" },
  { id: "work", label: "01 · Work", hint: "Project archive" },
  { id: "experience", label: "02 · Log", hint: "Mission impact" },
  { id: "capabilities", label: "03 · Stack", hint: "Instruments" },
  { id: "about", label: "04 · Subject", hint: "Portrait & education" },
  { id: "contact", label: "05 · Link", hint: "Establish uplink" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(
      (d) => d.label.toLowerCase().includes(q) || d.hint.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setActive(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => {
      setOpen(true);
      setQuery("");
      setActive(0);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("dp-open-cmd", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("dp-open-cmd", onOpen);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-start justify-center bg-night/50 px-4 pt-[12vh] backdrop-blur-sm">
      <div
        className="w-[min(92vw,520px)] border border-line bg-paper shadow-[12px_12px_0_rgba(0,0,0,0.2)]"
        role="dialog"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="mono text-[0.65rem] text-accent">CMD</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, filtered.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              }
              if (e.key === "Enter" && filtered[active]) go(filtered[active].id);
            }}
            placeholder="Jump to frame…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-mute"
          />
          <span className="mono hidden text-[0.6rem] text-mute sm:inline">ESC</span>
        </div>
        <ul className="max-h-72 overflow-auto py-2">
          {filtered.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(item.id)}
                className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                  i === active ? "bg-accent text-white" : "hover:bg-paper-2"
                }`}
              >
                <span className="mono text-[0.72rem]">{item.label}</span>
                <span className={`text-xs ${i === active ? "text-white/80" : "text-mute"}`}>
                  {item.hint}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-mute">No frames matched.</li>
          )}
        </ul>
      </div>
      <button
        type="button"
        className="absolute inset-0 -z-10 cursor-default"
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
      />
    </div>
  );
}
