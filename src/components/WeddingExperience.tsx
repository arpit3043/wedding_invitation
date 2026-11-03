"use client";

import { useCallback, useRef, useState } from "react";
import { AIAssistant } from "@/components/AIAssistant";
import { Countdown } from "@/components/Countdown";
import { EventsTimeline } from "@/components/EventsTimeline";
import { FallingPetals } from "@/components/FallingPetals";
import { GaneshaBlessing } from "@/components/GaneshaBlessing";
import { HeroSection } from "@/components/HeroSection";
import { LoveStoryPhotos } from "@/components/LoveStoryPhotos";
import { MusicToggle, type MusicController } from "@/components/MusicToggle";
import { OpeningInvitation } from "@/components/OpeningInvitation";
import { RSVPSection } from "@/components/RSVPSection";
import { SiteFooter } from "@/components/SiteFooter";
import { StorySection } from "@/components/StorySection";

export function WeddingExperience() {
  const [opened, setOpened] = useState(false);
  const musicRef = useRef<MusicController>(null);

  const unlockMusic = useCallback(() => {
    void musicRef.current?.play();
  }, []);

  return (
    <>
      {/* Keep audio mounted from first paint so open-click can start it. */}
      <MusicToggle ref={musicRef} visible={opened} />

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
