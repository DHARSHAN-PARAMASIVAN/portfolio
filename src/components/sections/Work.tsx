"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site";

const featured = projects.find((p) => p.featured)!;
const rest = projects.filter((p) => !p.featured);

export function Work() {
  return (
    <section id="work" className="pb-20 md:pb-28">
      <div className="wrap">
        <Reveal className="mb-8 flex flex-col justify-between gap-3 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-3 text-4xl font-700 md:text-5xl">Projects with proof.</h2>
          </div>
          <p className="max-w-md text-soft">
            Flagship industrial IoT platform first — then systems across full-stack, security, and QA.
          </p>
        </Reveal>

        <Reveal>
          <article className="surface overflow-hidden">
            <div className="grid lg:grid-cols-[1.35fr_1fr]">
              <div className="relative min-h-[280px] aspect-[16/10] lg:aspect-auto lg:min-h-full">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-9">
                <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
                  Featured · {featured.year} · {featured.category}
                </p>
                <h3 className="display mt-3 text-3xl font-700 md:text-4xl">VortexIoT</h3>
                <p className="mt-3 text-soft">{featured.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-xs font-medium text-mute"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={featured.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-accent"
                >
                  Open live demo <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <article className="surface group h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/11]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                    {p.number} · {p.year}
                  </p>
                  <h3 className="display mt-2 text-xl font-700">{p.title}</h3>
                  <p className="mt-2 text-sm text-soft">{p.blurb}</p>
                  <p className="mt-4 text-xs font-medium text-mute">{p.stack.join(" · ")}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
