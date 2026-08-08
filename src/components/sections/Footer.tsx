import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="wrap grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-end">
        <div>
          <p className="display text-2xl text-cyan">{site.short}</p>
          <p className="mt-2 font-medium">{site.name}</p>
          <p className="mt-1 text-sm text-mute">Full-Stack · QA · API Security</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-mute md:justify-center">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan">
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan"
          >
            LinkedIn
          </a>
          <a href={site.resume} download className="hover:text-cyan">
            CV
          </a>
        </div>
        <p className="text-sm text-mute">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
