"use client";

import { GaneshaMotif, GaneshaSideProfile } from "@/components/GaneshaMotif";
import { SectionReveal } from "@/components/SectionReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { wedding } from "@/data/wedding";

export function GaneshaBlessing() {
  const reduce = usePrefersReducedMotion();

  return (
    <section
      className="relative overflow-hidden px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:pt-4"
      aria-label="Blessings of Lord Ganesha"
    >
      <GaneshaSideProfile
        className={`pointer-events-none absolute left-[-12px] top-6 hidden h-24 w-16 text-gold/30 sm:left-4 sm:top-10 sm:block sm:h-36 sm:w-28 ${
          reduce ? "" : "ganesha-float"
        }`}
      />
      <GaneshaSideProfile
        flip
        className={`pointer-events-none absolute right-[-12px] top-20 hidden h-24 w-16 text-gold/25 sm:right-4 sm:top-28 sm:block sm:h-36 sm:w-28 ${
          reduce ? "" : "ganesha-float-delayed"
        }`}
      />

      <SectionReveal className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="relative">
          <div
            className="absolute inset-0 scale-125 rounded-full bg-champagne/30 blur-2xl"
            aria-hidden="true"
          />
          <GaneshaMotif
            className={`relative h-28 w-28 text-gold sm:h-44 sm:w-44 ${
              reduce ? "" : "ganesha-breathe"
            }`}
          />
        </div>

        <p className="mt-3 font-[family-name:var(--font-noto-devanagari)] text-sm text-wine/75 sm:mt-4 sm:text-base">
          {wedding.sanskritInvocation}
        </p>
        <p className="mt-2 max-w-xs px-2 font-[family-name:var(--font-cormorant)] text-sm italic text-ink-soft sm:text-lg">
          With divine blessings, we begin this sacred celebration
        </p>
        <p className="mt-4 font-[family-name:var(--font-playfair)] text-base tracking-wide text-wine sm:mt-5 sm:text-xl">
          With Love from Sharma&apos;s Family
        </p>

        <figure className="relative mt-5 w-full max-w-xl sm:mt-8">
          <div className="rounded-sm border border-champagne bg-gradient-to-b from-paper to-blush/50 p-1.5 shadow-[0_12px_40px_-24px_rgba(113,61,74,0.35)] sm:p-3">
            <div className="relative overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sharma-family.jpg"
                alt="Sharma family"
                className="h-auto w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, 576px"
                style={{
                  filter: "sepia(0.18) saturate(0.92) brightness(1.03) contrast(0.97)",
                }}
              />
              {/* Soft ivory wash so the photo settles into the invitation palette */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory/35 via-transparent to-champagne/20 mix-blend-soft-light"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/25"
                aria-hidden="true"
              />
            </div>
          </div>
        </figure>
      </SectionReveal>
    </section>
  );
}
