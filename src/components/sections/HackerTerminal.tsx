"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { site, skills, projects, journey } from "@/lib/site";
import { withBase } from "@/lib/paths";
import { SHELL_HINTS, SHELL_RUN_EVENT } from "@/lib/shell";

type Line = { kind: "in" | "out" | "sys"; text: string };

const HELP = SHELL_HINTS.map((h) => `${h.cmd.padEnd(16)}${h.hint}`).join("\n") +
  "\nclear           wipe buffer";

function run(cmdRaw: string): Line[] {
  const cmd = cmdRaw.trim().toLowerCase();
  if (!cmd) return [];

  if (cmd === "help" || cmd === "?") {
    return [{ kind: "out", text: HELP }];
  }
  if (cmd === "clear" || cmd === "cls") {
    return [{ kind: "sys", text: "__CLEAR__" }];
  }
  if (cmd === "whoami") {
    return [
      {
        kind: "out",
        text: [
          `user: ${site.name}`,
          `role: ${site.role}`,
          `host: ${site.location.toLowerCase()}.in`,
          `status: ${site.availability}`,
          `mantra: ${site.mantra.join(" → ")}`,
        ].join("\n"),
      },
    ];
  }
  if (cmd === "ls" || cmd === "ls /" || cmd === "projects" || cmd === "ls projects") {
    const list = projects
      .filter((p) => p.selected || p.featured)
      .map((p) => `${p.number}  ${p.title.padEnd(22)} ${p.category}`)
      .join("\n");
    return [{ kind: "out", text: list || "empty archive" }];
  }
  if (cmd === "cat skills" || cmd === "skills") {
    return [{ kind: "out", text: skills.join("  ·  ") }];
  }
  if (cmd === "cat experience" || cmd === "experience" || cmd === "history") {
    return [
      {
        kind: "out",
        text: journey
          .map((j) => `${j.year}  ${j.org} — ${j.role}\n      ${j.focus} · ${j.highlight}`)
          .join("\n\n"),
      },
    ];
  }
  if (cmd === "nmap contact" || cmd === "nmap" || cmd === "contact") {
    return [
      {
        kind: "out",
        text: [
          "Starting Nmap 7.94 ( https://nmap.org ) at signal-sheet",
          `PORT     STATE  SERVICE`,
          `25/tcp   open   smtp     ${site.email}`,
          `443/tcp  open   https    ${site.linkedin}`,
          `22/tcp   open   ssh      ${site.github}`,
          `Nmap done: 1 IP address (1 host up) scanned`,
        ].join("\n"),
      },
    ];
  }
  if (cmd === "curl resume" || cmd === "curl cv" || cmd === "resume") {
    if (typeof window !== "undefined") {
      const a = document.createElement("a");
      a.href = withBase(site.resume);
      a.download = "";
      a.click();
    }
    return [{ kind: "out", text: `GET ${site.resume} → 200 OK · downloading…` }];
  }
  if (cmd === "sudo hire-me" || cmd === "hire" || cmd === "hire-me") {
    if (typeof window !== "undefined") {
      window.location.href = `mailto:${site.email}?subject=Hiring%20Dharshan`;
    }
    return [
      {
        kind: "out",
        text: "[sudo] password for recruiter: ********\naccess granted · opening mailto uplink…",
      },
    ];
  }
  if (cmd.startsWith("cd ")) {
    const target = cmd.slice(3).trim().replace(/^#/, "");
    const map: Record<string, string> = {
      work: "work",
      projects: "work",
      experience: "experience",
      stack: "capabilities",
      capabilities: "capabilities",
      about: "about",
      contact: "contact",
      home: "top",
      "~": "top",
    };
    const id = map[target];
    if (id && typeof window !== "undefined") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return [{ kind: "out", text: `cd → /${target}` }];
    }
    return [{ kind: "out", text: `cd: no such frame: ${target}` }];
  }
  if (cmd === "echo $path" || cmd === "pwd") {
    return [{ kind: "out", text: "/home/dharshan/signal-sheet" }];
  }

  return [
    {
      kind: "out",
      text: `command not found: ${cmdRaw.trim()}\ntype 'help' for available ops`,
    },
  ];
}

const BOOT: Line[] = [
  { kind: "sys", text: "signal-sheet tty1 — authenticated" },
  { kind: "sys", text: "type 'help' or tap a hint chip above / on the cover" },
];

/** Interactive ops shell — recruiters can probe like a terminal */
export function HackerTerminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const readyRef = useRef(false);

  // Scroll only inside the terminal pane — never the page (was jumping to shell on load)
  useEffect(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      return;
    }
    const pane = scrollRef.current;
    if (!pane) return;
    pane.scrollTop = pane.scrollHeight;
  }, [lines]);

  const exec = (raw: string) => {
    const result = run(raw);
    if (result.some((l) => l.text === "__CLEAR__")) {
      setLines(BOOT);
      return;
    }
    setLines((prev) => [
      ...prev,
      { kind: "in", text: `guest@dp:~$ ${raw}` },
      ...result,
    ]);
  };

  useEffect(() => {
    const onRun = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (!detail) return;
      exec(detail);
      inputRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener(SHELL_RUN_EVENT, onRun);
    return () => window.removeEventListener(SHELL_RUN_EVENT, onRun);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const raw = input;
    setInput("");
    if (!raw.trim()) return;
    exec(raw);
  };

  return (
    <section id="terminal" className="pb-16 md:pb-24">
      <div className="wrap">
        <Reveal className="mb-8 max-w-xl border-b border-line pb-5">
          <p className="eyebrow">FIG. 0T — Shell</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">
            Probe the <span className="italic text-soft">system.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-soft">
            Same commands as the cover cheat sheet. Type below or click a hint.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SHELL_HINTS.map((h) => (
              <button
                key={h.cmd}
                type="button"
                className="chip"
                data-cursor="hover"
                onClick={() => exec(h.cmd)}
              >
                {h.cmd}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div
            className="overflow-hidden border border-line bg-paper-2/90 shadow-sm backdrop-blur-sm dark:bg-panel/80 dark:shadow-none"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <p className="mono text-[0.62rem] text-accent">guest@dp — bash</p>
              <p className="mono text-[0.55rem] text-mute">SESSION LIVE</p>
            </div>
            <div
              ref={scrollRef}
              className="max-h-[min(52vh,420px)] overflow-y-auto px-4 py-3 font-mono text-[0.72rem] leading-relaxed"
            >
              {lines.map((l, i) => (
                <pre
                  key={`${i}-${l.kind}-${l.text.slice(0, 24)}`}
                  className={`mb-1 whitespace-pre-wrap ${
                    l.kind === "in"
                      ? "text-ink"
                      : l.kind === "sys"
                        ? "text-mute"
                        : "text-soft"
                  }`}
                >
                  {l.text}
                </pre>
              ))}
              <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
                <span className="shrink-0 text-accent">guest@dp:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent text-ink outline-none caret-accent"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
