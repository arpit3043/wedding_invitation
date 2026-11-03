"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";
import { Countdown } from "@/components/Countdown";
import { EventsTimeline } from "@/components/EventsTimeline";
import { FallingPetals } from "@/components/FallingPetals";
import { GaneshaBlessing } from "@/components/GaneshaBlessing";
import { HeroSection } from "@/components/HeroSection";
import { LoveStoryPhotos } from "@/components/LoveStoryPhotos";
import { OpeningInvitation } from "@/components/OpeningInvitation";
import { RSVPSection } from "@/components/RSVPSection";
import { SiteFooter } from "@/components/SiteFooter";
import { StorySection } from "@/components/StorySection";

export function WeddingExperience() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.45;
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  const unlockMusic = useCallback(() => {
    void audioRef.current?.play().catch(() => setPlaying(false));
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    void audio.play().catch(() => setPlaying(false));
  }, []);

  return (
    <>
      {opened ? (
        <button
          type="button"
          onClick={toggleMusic}
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
      ) : null}

      <FallingPetals active />

      {!opened ? (
        <OpeningInvitation
          onOpened={() => setOpened(true)}
          onUnlockMusic={unlockMusic}
        />
      ) : null}

      <main
        className={`transition-opacity duration-700 ${opened ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!opened}
      >
        <HeroSection />
        <GaneshaBlessing />
        <StorySection />
        <Countdown />
        <EventsTimeline />
        <LoveStoryPhotos />
        <RSVPSection />
        <SiteFooter />
      </main>

      {opened ? <AIAssistant /> : null}
    </>
  );
}
