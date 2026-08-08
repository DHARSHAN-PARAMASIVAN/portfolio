"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative inline-flex h-10 w-10 items-center justify-center border border-line bg-panel text-ink transition hover:border-accent hover:text-accent"
    >
      <Sun
        size={15}
        className={`absolute transition ${isDark ? "scale-75 rotate-90 opacity-0" : "opacity-100"}`}
      />
      <Moon
        size={15}
        className={`absolute transition ${isDark ? "opacity-100" : "scale-75 -rotate-90 opacity-0"}`}
      />
    </button>
  );
}
