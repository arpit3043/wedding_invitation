"use client";

import { useState } from "react";
import { wedding } from "@/data/wedding";
import {
  ArchFrame,
  FloralCorner,
  MandalaMotif,
} from "@/components/DecorativeElements";
import { ScratchCard } from "@/components/ScratchCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  onOpened: () => void;
  onUnlockMusic: () => void;
};

export function OpeningInvitation({ onOpened, onUnlockMusic }: Props) {
  const [opening, setOpening] = useState(false);
  const reduce = usePrefersReducedMotion();

  const handleOpen = () => {
    if (opening) return;
    onUnlockMusic();
    setOpening(true);
    window.setTimeout(() => onOpened(), reduce ? 200 : 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain paper-texture floral-pattern transition-opacity duration-700 sm:items-center ${
        opening ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <FloralCorner className="absolute left-2 top-2 h-14 w-14 text-gold/45 sm:left-8 sm:top-8 sm:h-28 sm:w-28" />
      <FloralCorner
        flip
        className="absolute right-2 top-2 h-14 w-14 text-gold/45 sm:right-8 sm:top-8 sm:h-28 sm:w-28"
      />
      <FloralCorner className="absolute bottom-2 right-2 h-14 w-14 rotate-180 text-gold/35 sm:bottom-8 sm:right-8 sm:h-28 sm:w-28" />
      <FloralCorner
        flip
        className="absolute bottom-2 left-2 h-14 w-14 rotate-180 text-gold/35 sm:bottom-8 sm:left-8 sm:h-28 sm:w-28"
      />

      <MandalaMotif className="pointer-events-none absolute left-1/2 top-1/2 h-[min(92vw,420px)] w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 text-gold/20 sm:h-[min(90vw,520px)] sm:w-[min(90vw,520px)]" />

      <div className="relative mx-3 my-4 w-full max-w-lg ornament-border bg-ivory/92 px-4 py-6 text-center shadow-sm sm:mx-4 sm:my-8 sm:px-10 sm:py-12">
        <ArchFrame className="pointer-events-none absolute inset-x-3 top-3 mx-auto hidden h-[88%] w-[calc(100%-1.5rem)] text-gold/35 sm:inset-x-6 sm:top-4 sm:block sm:w-[calc(100%-3rem)]" />

        <p className="relative font-[family-name:var(--font-noto-devanagari)] text-sm text-wine/80 sm:text-lg">
          {wedding.sanskritInvocation}
        </p>

        <p className="relative mt-3 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.18em] uppercase text-ink-soft sm:mt-5 sm:text-base sm:tracking-[0.22em]">
          {wedding.togetherLine}
        </p>

        <h1 className="relative mt-3 font-[family-name:var(--font-playfair)] text-[2.35rem] leading-tight text-wine sm:mt-4 sm:text-5xl md:text-6xl">
          {wedding.coupleNames}
        </h1>

        <p className="relative mx-auto mt-3 max-w-sm font-[family-name:var(--font-cormorant)] text-base italic leading-relaxed text-ink-soft sm:mt-4 sm:text-xl">
          {wedding.supportingLine}
        </p>

        <div className="relative mx-auto mt-4 h-px w-14 bg-gold/50 sm:mt-5 sm:w-16" />

        <p className="relative mt-4 font-[family-name:var(--font-cormorant)] text-base tracking-wide text-ink sm:mt-5 sm:text-xl">
          {wedding.celebrationShort}
        </p>

        <ScratchCard
          revealText="04 December 2026"
          onInteract={onUnlockMusic}
        />

        <button
          type="button"
          onClick={handleOpen}
          className="relative mt-6 inline-flex min-h-12 w-full max-w-xs items-center justify-center border border-gold/50 bg-champagne/40 px-6 py-3.5 font-[family-name:var(--font-cormorant)] text-base tracking-[0.16em] uppercase text-wine transition hover:bg-champagne/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine active:scale-[0.99] sm:mt-8 sm:w-auto sm:px-8 sm:text-lg sm:tracking-[0.18em]"
          aria-label="Open the wedding invitation"
        >
          Open Invitation
        </button>
      </div>
    </div>
  );
}
