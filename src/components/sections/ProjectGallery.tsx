"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function ProjectGallery() {
  const track = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="pb-24 md:pb-32">
      <div className="wrap mb-8 flex items-end justify-between gap-4">
        <Reveal>
          <h3 className="display text-3xl md:text-5xl">PROJECT GALLERY</h3>
          <p className="mt-2 text-mute">Drag or scroll sideways →</p>
        </Reveal>
      </div>

      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.1rem,calc((100%-1180px)/2))] pb-4 scrollbar-thin"
        style={{ scrollbarWidth: "thin" }}
      >
        {projects.map((p) => (
          <article
            key={p.id}
            className="group relative h-[420px] w-[min(82vw,380px)] flex-none snap-start overflow-hidden rounded-2xl border border-line bg-panel md:h-[480px] md:w-[420px]"
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="420px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[0.72rem] tracking-[0.16em] text-cyan opacity-0 transition group-hover:opacity-100">
                {p.category}
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-mute">{p.number}</p>
                  <h4 className="display text-2xl transition group-hover:-translate-y-1 md:text-3xl">
                    {p.title}
                  </h4>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-bg/50 opacity-0 transition group-hover:opacity-100">
                  <ArrowUpRight size={16} className="text-cyan" />
                </span>
              </div>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-cyan"
                >
                  Live demo ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
