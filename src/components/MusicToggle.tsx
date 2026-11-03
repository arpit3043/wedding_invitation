"use client";

import { Volume2, VolumeX } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type MusicController = {
  play: () => Promise<void>;
  pause: () => void;
};

type Props = {
  visible?: boolean;
};

/**
 * Wedding music controller.
 * Call `play()` from a user gesture (opening the invite) so browsers allow audio.
 */
export const MusicToggle = forwardRef<MusicController, Props>(
  function MusicToggle({ visible = true }, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [available, setAvailable] = useState(true);

    useEffect(() => {
      const audio = new Audio("/audio/music.mp3");
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.45;
      audioRef.current = audio;

      const onError = () => setAvailable(false);
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      audio.addEventListener("error", onError);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);

      return () => {
        audio.pause();
        audio.removeEventListener("error", onError);
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
        audioRef.current = null;
      };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        play: async () => {
          const audio = audioRef.current;
          if (!audio || !available) return;
          try {
            await audio.play();
          } catch {
            setPlaying(false);
          }
        },
        pause: () => {
          audioRef.current?.pause();
        },
      }),
      [available],
    );

    const toggle = async () => {
      const audio = audioRef.current;
      if (!audio || !available) return;

      if (!audio.paused) {
        audio.pause();
        return;
      }

      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    };

    if (!available || !visible) return null;

    return (
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-champagne bg-ivory/90 text-wine shadow-md backdrop-blur transition hover:bg-blush sm:bottom-8 sm:left-8"
        aria-label={playing ? "Mute music" : "Play wedding music"}
        title={playing ? "Mute music" : "Play music"}
      >
        {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    );
  },
);
