export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix absolute app paths for GitHub Pages (`/portfolio`) */
export function withBase(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
