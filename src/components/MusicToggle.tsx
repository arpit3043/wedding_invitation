"use client";

import { Volume2, VolumeX } from "lucide-react";

type Props = {
  visible?: boolean;
  playing?: boolean;
  onToggle?: () => void;
};

/** Simple mute control — playback is owned by WeddingExperience. */
export function MusicToggle({
  visible = true,
  playing = false,
  onToggle,
}: Props) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed z-40 flex h-12 w-12 items-center justify-center rounded-full border border-champagne bg-ivory/95 text-wine shadow-md backdrop-blur transition hover:bg-blush active:scale-95 sm:h-11 sm:w-11"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        left: "max(1rem, env(safe-area-inset-left))",
      }}
      aria-label={playing ? "Mute music" : "Play wedding music"}
      title={playing ? "Mute music" : "Play music"}
    >
      {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
