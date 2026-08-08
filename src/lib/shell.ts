/** Shared shell command hints — hero cheat sheet + terminal help */
export const SHELL_HINTS = [
  { cmd: "whoami", hint: "identity dump" },
  { cmd: "ls", hint: "list projects" },
  { cmd: "cat skills", hint: "toolkit" },
  { cmd: "nmap contact", hint: "email / social" },
  { cmd: "curl resume", hint: "download CV" },
  { cmd: "sudo hire-me", hint: "open mailto" },
  { cmd: "help", hint: "all commands" },
] as const;

export const SHELL_RUN_EVENT = "dp-shell-run";
