import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="mono text-[0.72rem]">
          <span className="text-accent">DP</span> / SIGNAL SHEET · {site.name}
        </p>
        <p className="mono text-[0.68rem] text-mute">
          © {new Date().getFullYear()} · BUILD VERIFY SECURE SHIP
        </p>
      </div>
    </footer>
  );
}
