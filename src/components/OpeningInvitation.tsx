"use client";

import { motion } from "framer-motion";
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
    window.setTimeout(() => onOpened(), reduce ? 200 : 900);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto paper-texture floral-pattern"
      initial={false}
      animate={
        opening
          ? { opacity: 0, scale: reduce ? 1 : 1.04 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: reduce ? 0.2 : 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloralCorner className="absolute left-3 top-3 h-20 w-20 text-gold/50 sm:left-8 sm:top-8 sm:h-28 sm:w-28" />
      <FloralCorner
        flip
        className="absolute right-3 top-3 h-20 w-20 text-gold/50 sm:right-8 sm:top-8 sm:h-28 sm:w-28"
      />
      <FloralCorner className="absolute bottom-3 right-3 h-20 w-20 rotate-180 text-gold/40 sm:bottom-8 sm:right-8 sm:h-28 sm:w-28" />
      <FloralCorner
        flip
        className="absolute bottom-3 left-3 h-20 w-20 rotate-180 text-gold/40 sm:bottom-8 sm:left-8 sm:h-28 sm:w-28"
      />

      <MandalaMotif className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 text-gold/25" />

      <div className="relative mx-4 my-8 w-full max-w-lg ornament-border bg-ivory/90 px-6 py-8 text-center shadow-sm backdrop-blur-[2px] sm:px-10 sm:py-12">
        <ArchFrame className="pointer-events-none absolute inset-x-6 top-4 mx-auto h-[88%] w-[calc(100%-3rem)] text-gold/35" />

        <p className="relative font-[family-name:var(--font-noto-devanagari)] text-base text-wine/80 sm:text-lg">
          {wedding.sanskritInvocation}
        </p>

        <p className="relative mt-5 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.22em] uppercase text-ink-soft sm:text-base">
          {wedding.togetherLine}
        </p>

        <h1 className="relative mt-4 font-[family-name:var(--font-playfair)] text-4xl leading-tight text-wine sm:text-5xl md:text-6xl">
          {wedding.coupleNames}
        </h1>

        <p className="relative mx-auto mt-4 max-w-sm font-[family-name:var(--font-cormorant)] text-lg italic leading-relaxed text-ink-soft sm:text-xl">
          {wedding.supportingLine}
        </p>

        <div className="relative mx-auto mt-5 h-px w-16 bg-gold/50" />

        <p className="relative mt-5 font-[family-name:var(--font-cormorant)] text-lg tracking-wide text-ink sm:text-xl">
          {wedding.celebrationShort}
        </p>

        <div className="relative">
          <ScratchCard
            revealText="04 December 2026"
            onInteract={onUnlockMusic}
          />
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className="relative mt-8 inline-flex items-center justify-center border border-gold/50 bg-champagne/40 px-8 py-3 font-[family-name:var(--font-cormorant)] text-lg tracking-[0.18em] uppercase text-wine transition hover:bg-champagne/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
          aria-label="Open the wedding invitation"
        >
          Open Invitation
        </button>
      </div>
    </motion.div>
  );
}
