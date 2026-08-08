"use client";

/** Subtle HUD grid + glow — used behind non-hero sections */
export function LiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-paper transition-colors duration-500" />
      <div className="hud-grid absolute inset-0 opacity-70" />
      <div className="absolute -left-24 top-[-8%] h-[50vh] w-[50vh] rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -right-20 bottom-[-8%] h-[42vh] w-[42vh] rounded-full bg-accent-2/10 blur-3xl" />
      <div className="film-grain opacity-[0.04]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/90" />
    </div>
  );
}
