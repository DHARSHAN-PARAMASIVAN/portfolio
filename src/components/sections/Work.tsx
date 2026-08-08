"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/lib/site";

const featured = projects.find((p) => p.featured)!;
const index = projects.filter((p) => p.selected && !p.featured);

function hrefFor(p: Project) {
  return p.repoUrl ?? p.liveUrl;
}

export function Work() {
  const cs = featured.caseStudy!;

  return (
    <section id="work" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-10 max-w-2xl border-b border-line pb-5">
          <p className="eyebrow">FIG. 01 — Archive</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">Selected work.</h2>
          <p className="mt-3 text-soft">
            One deep frame, then a sheet index of systems worth opening.
          </p>
        </Reveal>

        {/* Featured case */}
        <Reveal>
          <article className="overflow-hidden border border-line bg-panel">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5 md:px-6">
              <span className="mono text-[0.62rem] text-mute">FEATURED CASE</span>
              <span className="mono text-[0.62rem] text-accent">
                {featured.year} · {featured.category.toUpperCase()}
              </span>
            </div>

            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <h3 className="display text-4xl text-white md:text-6xl">VortexIoT</h3>
                <p className="mt-2 max-w-xl text-sm text-white/75 md:text-base">{featured.blurb}</p>
              </div>
            </div>

            <div className="grid gap-0 border-t border-line md:grid-cols-3">
              {(
                [
                  { label: "Problem", body: cs.problem },
                  { label: "Approach", body: cs.approach },
                  { label: "Result", body: cs.result },
                ] as const
              ).map((col, i) => (
                <div
                  key={col.label}
                  className={`p-5 md:p-6 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}
                >
                  <p className="mono text-[0.62rem] text-accent">{col.label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-soft">{col.body}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-4 md:px-6">
              <div className="flex flex-wrap gap-2">
                {featured.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
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
          </article>
        </Reveal>

        {/* Sheet index */}
        <Reveal className="mt-12">
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-line pb-3">
            <p className="mono text-[0.68rem] text-mute">SHEET INDEX</p>
            <p className="mono text-[0.62rem] text-mute">{String(index.length).padStart(2, "0")} FRAMES</p>
          </div>
          <ul className="divide-y divide-line border-b border-line">
            {index.map((p) => {
              const href = hrefFor(p);
              return (
                <li key={p.id}>
                  <a
                    href={href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-3 py-4 transition-colors hover:bg-paper-2/60 md:grid-cols-[4rem_1fr_12rem_auto] md:gap-6 md:px-2"
                  >
                    <span className="mono text-[0.68rem] text-mute group-hover:text-accent">
                      {p.number}
                    </span>
                    <span>
                      <span className="display text-xl transition-colors group-hover:text-accent md:text-2xl">
                        {p.title}
                      </span>
                      <span className="mt-1 block text-sm text-mute md:hidden">{p.category}</span>
                    </span>
                    <span className="mono hidden text-[0.62rem] text-mute md:block">{p.category}</span>
                    <span className="mono flex items-center gap-1 text-[0.62rem] text-mute transition-colors group-hover:text-accent">
                      {p.year}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition group-hover:opacity-100"
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
