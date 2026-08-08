"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
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
          solid ? "border-b border-line bg-paper/75 backdrop-blur-xl" : ""
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between md:h-[4.25rem]">
          <a href="#top" className="display text-lg font-extrabold tracking-tight">
            <span className="text-accent">{site.short}</span>
            <span className="ml-2 hidden text-ink sm:inline">Dharshan</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-mute transition hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={site.resume}
              download
              className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-accent sm:inline-flex"
            >
              Download CV
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper/98 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden">
          <div className="mb-8 flex justify-end">
            <ThemeToggle />
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="display text-4xl font-bold"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={site.resume}
            download
            className="rounded-full bg-ink px-5 py-3 text-center font-semibold text-paper"
            onClick={() => setOpen(false)}
          >
            Download CV
          </a>
        </div>
      )}
    </>
  );
}
