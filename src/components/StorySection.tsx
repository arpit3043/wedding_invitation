"use client";

import { wedding } from "@/data/wedding";
import { DividerOrnament, FloralCorner } from "@/components/DecorativeElements";
import { SectionReveal } from "@/components/SectionReveal";

export function StorySection() {
  return (
    <section
      id="story"
      className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 sm:pb-32 sm:pt-10"
      aria-labelledby="story-heading"
    >
      <FloralCorner className="pointer-events-none absolute -left-2 top-10 h-28 w-28 text-sage/40 sm:left-6" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -right-2 bottom-10 h-28 w-28 text-dusty-rose/50 sm:right-6"
      />

      <SectionReveal className="relative mx-auto max-w-2xl text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.28em] uppercase text-gold">
          A Celebration of Togetherness
        </p>
        <h2
          id="story-heading"
          className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-wine sm:text-5xl"
        >
          {wedding.story.heading}
        </h2>
        <DividerOrnament className="mt-6 text-gold" />
        <p className="mt-8 font-[family-name:var(--font-cormorant)] text-xl leading-relaxed text-ink-soft sm:text-2xl">
          {wedding.openingText}
        </p>
        <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
          {wedding.story.text}
        </p>
      </SectionReveal>
    </section>
  );
}
