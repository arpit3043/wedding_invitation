"use client";

import { useEffect, useState } from "react";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
  ready: boolean;
};

function compute(target: Date): Omit<CountdownParts, "ready"> {
  const diff = Math.max(0, target.getTime() - Date.now());
  const complete = diff === 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, complete };
}

const initial: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  complete: false,
  ready: false,
};

export function useCountdown(targetIso: string): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(initial);

  useEffect(() => {
    const target = new Date(targetIso);
    const tick = () => setParts({ ...compute(target), ready: true });
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  return parts;
}
