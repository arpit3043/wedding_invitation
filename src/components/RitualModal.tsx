"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import type { RitualInfo } from "@/data/wedding";

type Props = {
  open: boolean;
  onClose: () => void;
  ritual: RitualInfo | null;
  eventName: string;
};

export function RitualModal({ open, onClose, ritual, eventName }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !ritual) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
        aria-label="Close ritual information"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ritual-title"
        className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-sm border border-champagne bg-ivory p-6 shadow-xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-ink-soft transition hover:bg-blush hover:text-wine"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.22em] uppercase text-gold">
          About this ritual
        </p>
        <h3
          id="ritual-title"
          className="mt-2 font-[family-name:var(--font-playfair)] text-2xl text-wine sm:text-3xl"
        >
          {ritual.title || eventName}
        </h3>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink-soft sm:text-base">
          <div>
            <h4 className="font-[family-name:var(--font-cormorant)] text-base tracking-wide text-wine">
              What is this ritual?
            </h4>
            <p className="mt-1.5">{ritual.what}</p>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-cormorant)] text-base tracking-wide text-wine">
              Why is it performed?
            </h4>
            <p className="mt-1.5">{ritual.why}</p>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-cormorant)] text-base tracking-wide text-wine">
              What happens during it?
            </h4>
            <p className="mt-1.5">{ritual.whatHappens}</p>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-cormorant)] text-base tracking-wide text-wine">
              Cultural significance
            </h4>
            <p className="mt-1.5">{ritual.significance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
