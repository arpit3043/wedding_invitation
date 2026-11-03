export function ChakraMotif({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 16;
    return {
      x1: Number((100 + Math.cos(angle) * 34).toFixed(2)),
      y1: Number((100 + Math.sin(angle) * 34).toFixed(2)),
      x2: Number((100 + Math.cos(angle) * 88).toFixed(2)),
      y2: Number((100 + Math.sin(angle) * 88).toFixed(2)),
    };
  });

  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 8;
    return {
      cx: Number((100 + Math.cos(angle) * 58).toFixed(2)),
      cy: Number((100 + Math.sin(angle) * 58).toFixed(2)),
    };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="52" stroke="currentColor" strokeWidth="0.5" opacity="0.28" />
      <circle cx="100" cy="100" r="28" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />

      {rays.map((ray, i) => (
        <line
          key={`ray-${i}`}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke="currentColor"
          strokeWidth="0.45"
          opacity="0.28"
        />
      ))}

      {petals.map((petal, i) => (
        <circle
          key={`petal-${i}`}
          cx={petal.cx}
          cy={petal.cy}
          r="5.5"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.32"
        />
      ))}

      {/* Inner lotus-like tips */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 8 + Math.PI / 8;
        const x = Number((100 + Math.cos(angle) * 40).toFixed(2));
        const y = Number((100 + Math.sin(angle) * 40).toFixed(2));
        return (
          <circle
            key={`inner-${i}`}
            cx={x}
            cy={y}
            r="2.2"
            fill="currentColor"
            opacity="0.22"
          />
        );
      })}

      <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
