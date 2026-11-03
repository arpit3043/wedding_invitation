"use client";

import { GaneshaMotif } from "@/components/GaneshaMotif";
import { SectionReveal } from "@/components/SectionReveal";
import { wedding } from "@/data/wedding";

export function GaneshaBlessing() {
  return (
    <section
      className="relative overflow-hidden px-6 py-10 sm:py-14"
      aria-label="Blessings of Lord Ganesha"
    >
      <SectionReveal className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 scale-125 rounded-full bg-champagne/30 blur-2xl" aria-hidden="true" />
          <GaneshaMotif className="relative h-36 w-36 text-gold sm:h-44 sm:w-44" />
        </div>
        <p className="mt-4 font-[family-name:var(--font-noto-devanagari)] text-sm text-wine/75 sm:text-base">
          {wedding.sanskritInvocation}
        </p>
        <p className="mt-2 max-w-xs font-[family-name:var(--font-cormorant)] text-base italic text-ink-soft sm:text-lg">
          With divine blessings, we begin this sacred celebration
        </p>
      </SectionReveal>
    </section>
  );
}
