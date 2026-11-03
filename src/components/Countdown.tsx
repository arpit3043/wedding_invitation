"use client";

import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { useCountdown } from "@/hooks/useCountdown";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SectionReveal } from "@/components/SectionReveal";

function Digit({ value, label }: { value: number; label: string }) {
  const reduce = usePrefersReducedMotion();
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex min-w-[4.5rem] flex-col items-center sm:min-w-[5.5rem]">
      <div className="relative overflow-hidden rounded-sm bg-blush/60 px-3 py-4 sm:px-4 sm:py-5">
        <motion.span
          key={display}
          initial={reduce ? false : { y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="block font-[family-name:var(--font-playfair)] text-3xl text-wine sm:text-5xl"
        >
          {display}
        </motion.span>
      </div>
      <span className="mt-3 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.2em] uppercase text-ink-soft sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, complete, ready } = useCountdown(
    wedding.countdownTarget,
  );

  return (
    <section
      id="countdown"
      className="border-y border-champagne/80 bg-gradient-to-b from-blush/40 via-ivory to-champagne/30 px-6 py-20 sm:py-24"
      aria-labelledby="countdown-heading"
    >
      <SectionReveal className="mx-auto max-w-3xl text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.28em] uppercase text-gold">
          Until we say Saat Phere
        </p>
        <h2
          id="countdown-heading"
          className="mt-3 font-[family-name:var(--font-playfair)] text-3xl text-wine sm:text-4xl"
        >
          Wedding Countdown
        </h2>
        <p className="mt-3 text-sm text-ink-soft sm:text-base">
          Main ceremony · 04 December 2026
        </p>

        {ready && complete ? (
          <p className="mt-10 font-[family-name:var(--font-cormorant)] text-2xl italic text-wine">
            The celebration has begun.
          </p>
        ) : (
          <div className="mt-10 flex flex-wrap items-start justify-center gap-3 sm:gap-5" aria-live="polite">
            <Digit value={ready ? days : 0} label="Days" />
            <Digit value={ready ? hours : 0} label="Hours" />
            <Digit value={ready ? minutes : 0} label="Minutes" />
            <Digit value={ready ? seconds : 0} label="Seconds" />
          </div>
        )}
      </SectionReveal>
    </section>
  );
}
