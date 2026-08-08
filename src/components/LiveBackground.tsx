"use client";

/** Lab graph paper + scanning line — deliberately not particle/aurora */
export function LiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-paper transition-colors duration-500" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: "220px 220px",
        }}
      />
      <div className="absolute -left-24 top-[-8%] h-[50vh] w-[50vh] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -right-20 bottom-[-8%] h-[42vh] w-[42vh] rounded-full bg-accent-2/10 blur-3xl" />
      <div className="scanline" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/90" />
    </div>
  );
}
