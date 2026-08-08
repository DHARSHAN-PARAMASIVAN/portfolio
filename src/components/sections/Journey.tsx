"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { journey } from "@/lib/site";

export function Journey() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <h2 className="display text-[clamp(2.8rem,10vw,6.5rem)]">THE JOURNEY</h2>
        </Reveal>

        <div className="mt-12 grid gap-0">
          {journey.map((item, i) => (
            <Reveal key={`${item.org}-${item.year}`} delay={i * 0.05}>
              <article className="grid gap-4 border-t border-line py-8 md:grid-cols-[140px_1fr_1.2fr] md:items-start md:gap-8">
                <p className="display text-3xl text-cyan">{item.year}</p>
                <div>
                  <h3 className="display text-2xl md:text-3xl">{item.org}</h3>
                  <p className="mt-2 text-ink/90">{item.role}</p>
                  <p className="mt-1 text-sm text-mute">{item.focus}</p>
                </div>
                <p className="text-lg font-medium text-cyan md:text-right">{item.highlight}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line">
          <div className="relative aspect-[21/9]">
            <Image
              src="/images/visual-ship.png"
              alt="Cloud deployment representing Ship"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/80 to-transparent" />
            <p className="absolute bottom-6 left-6 display text-3xl text-cyan md:text-5xl">SHIP</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
