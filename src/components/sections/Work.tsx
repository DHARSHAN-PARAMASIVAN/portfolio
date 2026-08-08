"use client";

import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/lib/site";

const featured = projects.find((p) => p.featured)!;
const rest = projects.filter((p) => !p.featured);

function target(p: Project) {
  return p.repoUrl ?? p.liveUrl;
}

export function Work() {
  return (
    <section id="work" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-8 flex flex-col justify-between gap-3 border-b border-line pb-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">FIG. 01 — Archive</p>
            <h2 className="display mt-2 text-4xl md:text-5xl">Selected frames.</h2>
          </div>
          <p className="max-w-sm text-sm text-mute">
            Contact-sheet layout. Click a frame to open its GitHub repository.
          </p>
        </Reveal>

        <Reveal>
          <article className="frame crop-marks overflow-hidden">
            <div className="flex items-center justify-between border-b border-line bg-paper-2 px-3 py-2">
              <span className="mono text-[0.62rem] text-mute">FEATURED FRAME</span>
              <span className="mono text-[0.62rem] text-accent">
                {featured.year} · {featured.category.toUpperCase()}
              </span>
            </div>
            <div className="grid lg:grid-cols-[1.3fr_1fr]">
              <a
                href={featured.liveUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative min-h-[260px] aspect-[16/10] lg:min-h-full lg:aspect-auto"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition duration-500 hover:scale-[1.03]"
                />
              </a>
              <div className="flex flex-col justify-center border-t border-line p-5 lg:border-l lg:border-t-0 md:p-8">
                <h3 className="display text-3xl md:text-4xl">VortexIoT</h3>
                <p className="mt-3 text-soft">{featured.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featured.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lab-btn"
                    >
                      Live demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => {
            const href = target(p);
            return (
              <Reveal key={p.id} delay={Math.min(i * 0.03, 0.2)}>
                <a
                  href={href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="frame group block h-full overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-line bg-paper-2 px-3 py-1.5">
                    <span className="mono text-[0.6rem] text-mute">{p.number}</span>
                    <span className="mono text-[0.6rem] text-accent">{p.year}</span>
                  </div>
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center border border-white/30 bg-night/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                      <Github size={14} />
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="display text-xl group-hover:text-accent">{p.title}</h3>
                    <p className="mt-2 text-sm text-soft">{p.blurb}</p>
                    <p className="mono mt-3 text-[0.62rem] text-accent">
                      OPEN REPO <ArrowUpRight className="ml-1 inline" size={12} />
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
