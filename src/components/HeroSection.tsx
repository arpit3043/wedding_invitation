"use client";

import { wedding } from "@/data/wedding";
import {
  DividerOrnament,
  FloralCorner,
  MandalaMotif,
} from "@/components/DecorativeElements";
import { SectionReveal } from "@/components/SectionReveal";

export function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden px-4 pb-4 pt-12 paper-texture floral-pattern sm:px-6 sm:pb-8 sm:pt-20"
      aria-labelledby="hero-names"
    >
      <MandalaMotif className="pointer-events-none absolute left-1/2 top-1/2 h-[min(88vw,380px)] w-[min(88vw,380px)] -translate-x-1/2 -translate-y-1/2 text-gold/20 sm:h-[min(85vw,480px)] sm:w-[min(85vw,480px)]" />
      <FloralCorner className="pointer-events-none absolute left-2 top-4 h-16 w-16 text-gold/40 sm:left-10 sm:top-8 sm:h-32 sm:w-32" />
      <FloralCorner
        flip
        className="pointer-events-none absolute right-2 top-4 h-16 w-16 text-gold/40 sm:right-10 sm:top-8 sm:h-32 sm:w-32"
      />

      <SectionReveal className="relative mx-auto max-w-3xl text-center">
        <p className="font-[family-name:var(--font-noto-devanagari)] text-sm text-wine/75 sm:text-lg">
          {wedding.sanskritInvocation}
        </p>
        <p className="mt-4 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.22em] uppercase text-ink-soft sm:mt-6 sm:text-sm sm:tracking-[0.28em]">
          {wedding.togetherLine}
        </p>
        <h1
          id="hero-names"
          className="mt-3 font-[family-name:var(--font-playfair)] text-4xl leading-tight text-wine sm:mt-4 sm:text-6xl md:text-7xl"
        >
          {wedding.coupleNames}
        </h1>
        <DividerOrnament className="mt-4 sm:mt-6" />
        <p className="mt-4 px-1 font-[family-name:var(--font-cormorant)] text-lg italic text-ink-soft sm:mt-6 sm:text-2xl">
          {wedding.supportingLine}
        </p>
        <p className="mt-4 font-[family-name:var(--font-cormorant)] text-base tracking-wide text-ink sm:mt-5 sm:text-xl">
          {wedding.celebrationRange}
        </p>
        <a
          href="#celebrations"
          className="mt-5 inline-flex min-h-11 items-center font-[family-name:var(--font-cormorant)] text-sm tracking-[0.18em] uppercase text-gold transition hover:text-wine sm:mt-6 sm:tracking-[0.2em]"
        >
          Explore the celebrations
        </a>
      </SectionReveal>
    </section>
  );
}
