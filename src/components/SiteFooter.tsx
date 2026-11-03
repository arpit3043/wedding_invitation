import { wedding } from "@/data/wedding";
import { DividerOrnament } from "@/components/DecorativeElements";

export function SiteFooter() {
  return (
    <footer className="border-t border-champagne bg-wine px-6 py-14 text-center text-blush">
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
