"use client";

import { useMemo, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Particle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  kind: "petal" | "heart";
  opacity: number;
};

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => {
    const kind: Particle["kind"] = id % 3 === 0 ? "heart" : "petal";
    return {
      id,
      left: (id * 17 + 11) % 100,
      delay: ((id * 0.37) % 8),
      duration: 9 + (id % 7),
      size: kind === "heart" ? 10 + (id % 8) : 12 + (id % 10),
      drift: ((id % 5) - 2) * 18,
      kind,
      opacity: kind === "heart" ? 0.35 + (id % 4) * 0.08 : 0.28 + (id % 5) * 0.07,
    };
  });
}

function PetalIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4.5 9 4.5C10.4 4.5 11.4 5.1 12 6C12.6 5.1 13.6 4.5 15 4.5C17.5 4.5 20 6.5 20 9.5C20 14.5 12 21 12 21Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function HeartIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.5S3.5 14.2 3.5 8.8C3.5 6.1 5.6 4.2 8.2 4.2c1.5 0 2.8.7 3.8 1.8 1-1.1 2.3-1.8 3.8-1.8 2.6 0 4.7 1.9 4.7 4.6 0 5.4-8.5 11.7-8.5 11.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FallingPetals({ active = true }: { active?: boolean }) {
  const reduce = usePrefersReducedMotion();
  const particles = useMemo(() => buildParticles(22), []);

  if (!active || reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[35] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`falling-particle absolute top-[-10%] ${
            p.kind === "heart" ? "text-dusty-rose" : "text-gold"
          }`}
          style={
            {
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
              ["--drift" as string]: `${p.drift}px`,
            } as CSSProperties
          }
        >
          {p.kind === "heart" ? (
            <HeartIcon size={p.size} />
          ) : (
            <PetalIcon size={p.size} />
          )}
        </span>
      ))}
    </div>
  );
}
