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
      className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-6 py-20 paper-texture floral-pattern sm:min-h-[82vh] sm:py-24"
      aria-labelledby="hero-names"
    >
      <MandalaMotif className="pointer-events-none absolute left-1/2 top-1/2 h-[min(85vw,480px)] w-[min(85vw,480px)] -translate-x-1/2 -translate-y-1/2 text-gold/20" />
      <FloralCorner className="pointer-events-none absolute left-4 top-8 h-24 w-24 text-gold/45 sm:left-10 sm:h-32 sm:w-32" />
      <FloralCorner
        flip
        className="pointer-events-none absolute right-4 top-8 h-24 w-24 text-gold/45 sm:right-10 sm:h-32 sm:w-32"
      />

      <SectionReveal className="relative mx-auto max-w-3xl text-center">
        <p className="font-[family-name:var(--font-noto-devanagari)] text-base text-wine/75 sm:text-lg">
          {wedding.sanskritInvocation}
        </p>
        <p className="mt-6 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.28em] uppercase text-ink-soft">
          {wedding.togetherLine}
        </p>
        <h1
          id="hero-names"
          className="mt-4 font-[family-name:var(--font-playfair)] text-5xl leading-tight text-wine sm:text-6xl md:text-7xl"
        >
          {wedding.coupleNames}
        </h1>
        <DividerOrnament className="mt-6" />
        <p className="mt-6 font-[family-name:var(--font-cormorant)] text-xl italic text-ink-soft sm:text-2xl">
          {wedding.supportingLine}
        </p>
        <p className="mt-5 font-[family-name:var(--font-cormorant)] text-lg tracking-wide text-ink sm:text-xl">
          {wedding.celebrationRange}
        </p>
        <a
          href="#celebrations"
          className="mt-10 inline-block font-[family-name:var(--font-cormorant)] text-sm tracking-[0.2em] uppercase text-gold transition hover:text-wine"
        >
          Explore the celebrations
        </a>
      </SectionReveal>
    </section>
  );
}
