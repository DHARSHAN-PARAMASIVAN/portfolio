"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { withBase } from "@/lib/paths";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#capabilities", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
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
          solid ? "border-b border-line bg-paper/90 backdrop-blur-md" : ""
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between">
          <a href="#top" className="mono text-[0.78rem] text-ink">
            <span className="text-accent">DP</span> / SIGNAL SHEET
          </a>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="mono text-[0.68rem] text-mute hover:text-accent">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("dp-open-cmd"))}
              className="mono hidden border border-line bg-panel px-2.5 py-2 text-[0.62rem] text-mute transition hover:border-accent hover:text-accent md:inline-flex"
            >
              CTRL K
            </button>
            <ThemeToggle />
            <a href={withBase(site.resume)} download className="lab-btn hidden sm:inline-flex">
              CV ↓
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-line bg-panel lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper px-6 pb-10 pt-24 lg:hidden">
          <div className="mb-8 flex justify-end">
            <ThemeToggle />
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="display text-4xl"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={withBase(site.resume)}
            download
            className="lab-btn justify-center"
            onClick={() => setOpen(false)}
          >
            Download CV ↓
          </a>
        </div>
      )}
    </>
  );
}
