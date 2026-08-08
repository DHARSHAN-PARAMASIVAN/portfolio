import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="display text-lg font-700">
            <span className="text-accent">{site.short}</span> {site.name}
          </p>
          <p className="mt-1 text-sm text-mute">Full-Stack · QA · API Security</p>
        </div>
        <p className="text-sm text-mute">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
