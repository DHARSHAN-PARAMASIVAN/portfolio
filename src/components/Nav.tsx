"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { href: "#top", label: "HOME" },
  { href: "#work", label: "WORK" },
  { href: "#build", label: "BUILD" },
  { href: "#verify", label: "VERIFY" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          solid ? "border-b border-line bg-bg/80 backdrop-blur-xl" : ""
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
          <a
            href="#top"
            className="display grid h-10 w-10 place-items-center rounded-full bg-cyan text-sm text-bg"
          >
            {site.short}
          </a>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.78rem] font-medium tracking-[0.14em] text-mute transition hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.resume}
              download
              className="hidden rounded-full border border-line px-3.5 py-2 text-[0.78rem] font-semibold tracking-[0.12em] transition hover:border-cyan hover:text-cyan sm:inline-flex"
            >
              CV ↓
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/98 px-6 pb-10 pt-24 lg:hidden">
          <nav className="flex flex-1 flex-col justify-center gap-6" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="display text-4xl text-ink"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={site.resume}
            download
            className="rounded-full border border-line px-5 py-3 text-center text-sm font-semibold tracking-[0.14em]"
            onClick={() => setOpen(false)}
          >
            DOWNLOAD CV ↓
          </a>
        </div>
      )}
    </>
  );
}
