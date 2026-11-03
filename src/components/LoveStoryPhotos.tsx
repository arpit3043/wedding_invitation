"use client";

import { DividerOrnament } from "@/components/DecorativeElements";
import { SectionReveal } from "@/components/SectionReveal";

export function LoveStoryPhotos() {
  return (
    <section
      id="our-story-photos"
      className="border-t border-champagne/70 bg-gradient-to-b from-champagne/25 via-ivory to-blush/35 px-6 py-20 sm:py-28"
      aria-labelledby="story-photos-heading"
    >
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.28em] uppercase text-gold">
          Then & now
        </p>
        <h2
          id="story-photos-heading"
          className="mt-3 font-[family-name:var(--font-playfair)] text-3xl text-wine sm:text-4xl"
        >
          A love in frames
        </h2>
        <DividerOrnament className="mt-6" />
      </SectionReveal>

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-16 sm:gap-20">
        <SectionReveal className="text-center">
          <figure className="mx-auto max-w-md">
            <div className="overflow-hidden rounded-sm border border-champagne bg-paper p-2 shadow-sm sm:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/childhood-beginnings.jpg"
                alt="Arpit and Muskan as children"
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption className="mt-5">
              <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.22em] uppercase text-gold">
                Chapter one
              </p>
              <p className="mt-2 font-[family-name:var(--font-playfair)] text-2xl text-wine sm:text-3xl">
                From little beginnings
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
                Two tiny smiles, one quiet promise the years were already writing.
              </p>
            </figcaption>
          </figure>
        </SectionReveal>

        <SectionReveal delay={0.08} className="text-center">
          <div className="mb-8 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-[family-name:var(--font-cormorant)] text-lg italic text-wine/70">
              …and then
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          <figure className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-sm border border-champagne bg-paper p-2 shadow-sm sm:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/couple-forever.jpg"
                alt="Arpit and Muskan together today"
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption className="mt-5">
              <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.22em] uppercase text-gold">
                Forever mode: on
              </p>
              <p className="mt-2 font-[family-name:var(--font-playfair)] text-2xl text-wine sm:text-3xl">
                Forever looks this good on us
              </p>
              <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-cormorant)] text-lg italic leading-relaxed text-ink-soft sm:text-xl">
                Same spark, bigger dreams — and a whole wedding to prove that
                forever was always the plot twist.
              </p>
            </figcaption>
          </figure>
        </SectionReveal>
      </div>
    </section>
  );
}
