"use client";

import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/lib/site";

const featured = projects.find((p) => p.featured)!;
const rest = projects.filter((p) => !p.featured);

function projectTarget(p: Project) {
  return p.repoUrl ?? p.liveUrl;
}

export function Work() {
  return (
    <section id="work" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-8 flex flex-col justify-between gap-3 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-3 text-4xl font-bold md:text-5xl">Projects with proof.</h2>
          </div>
          <p className="max-w-md text-soft">
            Click any project to open its GitHub repository. VortexIoT also includes a live demo.
          </p>
        </Reveal>

        <Reveal>
          <article className="surface surface-hover group overflow-hidden">
            <div className="grid lg:grid-cols-[1.35fr_1fr]">
              <a
                href={featured.liveUrl ?? featured.repoUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="img-zoom relative min-h-[280px] aspect-[16/10] lg:aspect-auto lg:min-h-full"
                aria-label={`Open ${featured.title}`}
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </a>
              <div className="flex flex-col justify-center p-6 md:p-9">
                <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
                  Featured · {featured.year} · {featured.category}
                </p>
                <h3 className="display mt-3 text-3xl font-bold transition group-hover:text-accent md:text-4xl">
                  VortexIoT
                </h3>
                <p className="mt-3 text-soft">{featured.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.stack.map((s) => (
                    <span
                      key={s}
                      className="chip-hover rounded-full border border-line px-3 py-1 text-xs font-medium text-mute"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper hover:-translate-y-0.5 hover:bg-accent"
                    >
                      Open live demo <ArrowUpRight size={16} />
                    </a>
                  )}
                  {featured.repoUrl && (
                    <a
                      href={featured.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold text-ink hover:-translate-y-0.5 hover:border-accent/50"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => {
            const href = projectTarget(p);
            return (
              <Reveal key={p.id} delay={Math.min(i * 0.04, 0.24)}>
                <a
                  href={href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface surface-hover group block h-full overflow-hidden"
                  aria-label={`Open ${p.title} on GitHub`}
                >
                  <div className="img-zoom relative aspect-[16/11]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-night/50 text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                      <Github size={16} />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                      {p.number} · {p.year}
                    </p>
                    <h3 className="display mt-2 text-xl font-bold transition group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-soft">{p.blurb}</p>
                    <p className="mt-4 text-xs font-medium text-mute">{p.stack.join(" · ")}</p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      View on GitHub <ArrowUpRight size={14} />
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
