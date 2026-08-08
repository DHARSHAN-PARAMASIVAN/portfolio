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
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-panel/80 text-ink shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
    >
      <Sun
        size={16}
        className={`absolute transition duration-300 ${
          isDark ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        size={16}
        className={`absolute transition duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
