const MANDALA_RAYS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * Math.PI * 2) / 12;
  return {
    x1: Number((100 + Math.cos(angle) * 36).toFixed(2)),
    y1: Number((100 + Math.sin(angle) * 36).toFixed(2)),
    x2: Number((100 + Math.cos(angle) * 78).toFixed(2)),
    y2: Number((100 + Math.sin(angle) * 78).toFixed(2)),
  };
});

const MANDALA_PETALS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI * 2) / 8;
  return {
    cx: Number((100 + Math.cos(angle) * 58).toFixed(2)),
    cy: Number((100 + Math.sin(angle) * 58).toFixed(2)),
  };
});

export function MandalaMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="36" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      {MANDALA_RAYS.map((ray, i) => (
        <line
          key={i}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.35"
        />
      ))}
      {MANDALA_PETALS.map((petal, i) => (
        <circle
          key={`petal-${i}`}
          cx={petal.cx}
          cy={petal.cy}
          r="5"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.4"
        />
      ))}
      <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function FloralCorner({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M12 108C28 92 36 72 34 52c18 8 34 8 50-2-12 22-8 42 6 58"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M34 52c-6-14 2-28 18-34-4 14 2 26 14 34"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle cx="52" cy="28" r="3.5" fill="currentColor" opacity="0.35" />
      <circle cx="78" cy="48" r="2.5" fill="currentColor" opacity="0.3" />
      <path
        d="M48 70c8-4 14-2 20 4"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.4"
      />
    </svg>
  );
}

export function ArchFrame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 420" className={className} aria-hidden="true" fill="none">
      <path
        d="M40 400V160C40 80 100 30 160 30s120 50 120 130v240"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.45"
      />
      <path
        d="M52 400V162C52 92 105 42 160 42s108 50 108 120v238"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.3"
      />
      <circle cx="160" cy="30" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function DividerOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gold/40 sm:w-16" />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 1.5C9.8 4.2 11.8 6.2 14.5 7C11.8 7.8 9.8 9.8 9 12.5C8.2 9.8 6.2 7.8 3.5 7C6.2 6.2 8.2 4.2 9 1.5Z"
          fill="currentColor"
          className="text-gold/70"
        />
      </svg>
      <span className="h-px w-12 bg-gold/40 sm:w-16" />
    </div>
  );
}
