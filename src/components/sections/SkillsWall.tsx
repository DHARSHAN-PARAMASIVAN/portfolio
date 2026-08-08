"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { skills, site } from "@/lib/site";

export function SkillsWall() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <h2 className="display text-[clamp(2.5rem,8vw,5rem)]">TECHNOLOGY WALL</h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-4">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="display text-[clamp(1.4rem,4vw,2.8rem)] text-ink/85 transition hover:text-cyan"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.45) }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-4 border-t border-line pt-10 md:grid-cols-3">
          <div>
            <p className="text-[0.72rem] tracking-[0.16em] text-mute">EDUCATION</p>
            <p className="display mt-2 text-2xl md:text-3xl">{site.education.degree}</p>
          </div>
          <div>
            <p className="text-[0.72rem] tracking-[0.16em] text-mute">SCHOOL</p>
            <p className="display mt-2 text-2xl md:text-3xl">{site.education.school}</p>
          </div>
          <div>
            <p className="text-[0.72rem] tracking-[0.16em] text-mute">SCORE</p>
            <p className="display mt-2 text-2xl text-cyan md:text-3xl">{site.education.score}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
