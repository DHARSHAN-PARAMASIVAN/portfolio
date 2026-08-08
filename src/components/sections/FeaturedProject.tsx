"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/site";

const featured = projects.find((p) => p.featured)!;

export function FeaturedProject() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="wrap">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="relative aspect-[16/10] md:aspect-[21/9]">
              <Image
                src={featured.image}
                alt={`${featured.title} industrial IoT visual`}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
                <p className="text-[0.75rem] tracking-[0.18em] text-cyan">
                  INDUSTRIAL IoT · {featured.year}
                </p>
                <h3 className="display mt-2 text-[clamp(2.4rem,8vw,5.5rem)]">{featured.title}</h3>
                <p className="mt-3 max-w-2xl text-mute md:text-lg">{featured.blurb}</p>
                <p className="mt-4 text-sm text-ink/80">{featured.stack.join(" · ")}</p>
              </div>
            </div>

            <div className="grid gap-8 border-t border-line p-5 md:grid-cols-2 md:p-10">
              <div className="space-y-6">
                <div>
                  <h4 className="display text-xl text-cyan">THE PROBLEM</h4>
                  <p className="mt-2 text-mute">
                    Industrial machinery generates large volumes of telemetry that can be difficult
                    to monitor continuously.
                  </p>
                </div>
                <div>
                  <h4 className="display text-xl text-cyan">THE APPROACH</h4>
                  <p className="mt-2 text-mute">
                    Real-time telemetry ingestion, streaming, anomaly detection and monitoring.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="display text-xl text-cyan">THE STACK</h4>
                  <ul className="mt-2 grid grid-cols-2 gap-1 text-mute">
                    {featured.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="display text-xl text-cyan">RESULT</h4>
                  <p className="mt-2 text-mute">
                    A production-style monitoring platform designed for scalable industrial
                    telemetry.
                  </p>
                  <a
                    href={featured.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-3 text-sm font-bold text-bg transition hover:brightness-110"
                  >
                    OPEN LIVE DEMO <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
