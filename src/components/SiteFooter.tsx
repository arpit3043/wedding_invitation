import { wedding } from "@/data/wedding";
import { DividerOrnament } from "@/components/DecorativeElements";

export function SiteFooter() {
  return (
    <footer className="border-t border-champagne bg-wine px-4 py-10 text-center text-blush sm:px-6 sm:py-14" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>
      <p className="font-[family-name:var(--font-noto-devanagari)] text-sm opacity-80">
        {wedding.sanskritInvocation}
      </p>
      <p className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-ivory">
        {wedding.coupleNames}
      </p>
      <DividerOrnament className="mt-5 text-gold" />
      <p className="mt-5 font-[family-name:var(--font-cormorant)] text-lg text-champagne">
        {wedding.celebrationRange}
      </p>
      <p className="mt-8 text-xs tracking-wide text-blush/70">
        With love, from our families to yours
      </p>
    </footer>
  );
}
