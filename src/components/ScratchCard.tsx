"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  revealText?: string;
  onReveal?: () => void;
  onInteract?: () => void;
};

export function ScratchCard({
  revealText = "04 December 2026",
  onReveal,
  onInteract,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scratching = useRef(false);
  const revealed = useRef(false);
  const interacted = useRef(false);
  const [done, setDone] = useState(false);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#c9b07a");
    gradient.addColorStop(0.45, "#e8d9b5");
    gradient.addColorStop(1, "#b69a68");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Soft foil texture
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let i = 0; i < 40; i += 1) {
      const x = (i * 37) % rect.width;
      const y = (i * 53) % rect.height;
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(113, 61, 74, 0.72)";
    ctx.font = "600 14px Cormorant Garamond, Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch to reveal our wedding day", rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    paintCover();
    const onResize = () => {
      if (!revealed.current) paintCover();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paintCover]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!interacted.current) {
      interacted.current = true;
      onInteract?.();
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const radius = Math.max(18, rect.width * 0.06);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Sample cleared percentage
    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    const step = 16;
    for (let i = 3; i < sample.length; i += 4 * step) {
      if (sample[i] < 128) cleared += 1;
    }
    const total = sample.length / (4 * step);
    if (cleared / total > 0.45) {
      revealed.current = true;
      setDone(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onReveal?.();
    }
  };

  const getPoint = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return touch ? { x: touch.clientX, y: touch.clientY } : null;
    }
    return { x: e.clientX, y: e.clientY };
  };

  return (
    <div className="relative mx-auto mt-8 w-full max-w-xs">
      <p className="mb-2 text-center font-[family-name:var(--font-cormorant)] text-xs tracking-[0.18em] uppercase text-gold">
        A little surprise
      </p>
      <div
        ref={containerRef}
        className="relative h-24 overflow-hidden rounded-sm border border-gold/45 bg-blush/70 shadow-inner select-none"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
          <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.16em] uppercase text-ink-soft">
            Main wedding ceremony
          </p>
          <p className="mt-1 font-[family-name:var(--font-playfair)] text-xl text-wine sm:text-2xl">
            {revealText}
          </p>
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full touch-none ${done ? "pointer-events-none opacity-0" : "cursor-grab active:cursor-grabbing"}`}
          aria-label="Scratch card to reveal the wedding date"
          onMouseDown={(e) => {
            scratching.current = true;
            scratchAt(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => {
            if (!scratching.current) return;
            scratchAt(e.clientX, e.clientY);
          }}
          onMouseUp={() => {
            scratching.current = false;
          }}
          onMouseLeave={() => {
            scratching.current = false;
          }}
          onTouchStart={(e) => {
            scratching.current = true;
            const point = getPoint(e);
            if (point) scratchAt(point.x, point.y);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            if (!scratching.current) return;
            const point = getPoint(e);
            if (point) scratchAt(point.x, point.y);
          }}
          onTouchEnd={() => {
            scratching.current = false;
          }}
        />
      </div>
      {done ? (
        <p className="mt-2 text-center font-[family-name:var(--font-cormorant)] text-sm italic text-wine/80">
          Our forever begins on this day
        </p>
      ) : (
        <p className="mt-2 text-center text-xs text-ink-soft">
          Swipe across the foil to uncover the date
        </p>
      )}
    </div>
  );
}
