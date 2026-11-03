export function GaneshaMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      role="img"
      aria-label="Lord Ganesha illustration"
      fill="none"
    >
      {/* Soft aura */}
      <circle cx="100" cy="108" r="78" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
      <circle cx="100" cy="108" r="68" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

      {/* Crown */}
      <path
        d="M72 58c8-18 20-28 28-32 8 4 20 14 28 32"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M84 54c5-8 11-13 16-15 5 2 11 7 16 15"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="100" cy="34" r="3.2" fill="currentColor" opacity="0.55" />
      <path d="M100 37v8" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Ears */}
      <path
        d="M58 92c-16 4-24 18-18 34 5 12 18 16 28 10"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M142 92c16 4 24 18 18 34-5 12-18 16-28 10"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M62 100c-8 4-12 14-8 24"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.45"
      />
      <path
        d="M138 100c8 4 12 14 8 24"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.45"
      />

      {/* Head */}
      <path
        d="M70 86c0-18 13-34 30-34s30 16 30 34c0 10-3 18-8 26-4 6-12 14-22 22-10-8-18-16-22-22-5-8-8-16-8-26Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Eyes */}
      <path d="M86 96c3-4 8-4 11 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M103 96c3-4 8-4 11 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="91.5" cy="98" r="1.4" fill="currentColor" />
      <circle cx="108.5" cy="98" r="1.4" fill="currentColor" />

      {/* Tilak / trunk start */}
      <path d="M100 78v10" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="100" cy="74" r="2" fill="currentColor" opacity="0.45" />

      {/* Trunk */}
      <path
        d="M100 108c2 10 1 18-4 24-6 8-4 16 4 20 7 4 14-2 12-10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M98 112c3 8 2 14-2 19"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* Tusk */}
      <path
        d="M92 112c-4 2-8 1-10-2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Neck / shoulders */}
      <path
        d="M78 138c6 10 14 16 22 18 8-2 16-8 22-18"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Belly / torso */}
      <path
        d="M74 148c-2 18 8 34 26 38 18-4 28-20 26-38"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M86 168c6 6 12 8 14 8s8-2 14-8"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.5"
      />

      {/* Hands */}
      <path
        d="M74 152c-14 2-22 12-20 22 2 8 12 10 20 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M126 152c14 2 22 12 20 22-2 8-12 10-20 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Modak in left hand suggestion */}
      <ellipse cx="148" cy="168" rx="6" ry="5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path d="M148 163v-4" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />

      {/* Lotus base */}
      <path
        d="M60 198c12-10 28-14 40-14s28 4 40 14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M72 198c8-6 18-9 28-9s20 3 28 9"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <path d="M100 184v14" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
    </svg>
  );
}

/** Elegant side-profile Ganesha — for flanking motion accents */
export function GaneshaSideProfile({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
      aria-hidden="true"
      fill="none"
    >
      {/* Crown */}
      <path
        d="M58 28c6-14 16-22 22-24 4 6 10 16 12 28"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="80" cy="18" r="2.4" fill="currentColor" opacity="0.5" />

      {/* Large ear */}
      <path
        d="M42 62c-18 2-28 18-20 36 6 14 22 18 32 8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M46 70c-10 4-14 14-10 24"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.45"
      />

      {/* Head profile */}
      <path
        d="M54 48c8-12 22-16 34-8 10 7 12 22 6 34-4 8-12 16-22 24"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />

      {/* Eye */}
      <path d="M72 68c4-3 9-2 11 2" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      <circle cx="78" cy="70" r="1.3" fill="currentColor" />

      {/* Trunk curling forward */}
      <path
        d="M78 88c8 6 14 8 18 6 6-2 8-10 2-14-4-3-10-1-12 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M86 94c4 8 2 14-4 18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Tusk */}
      <path
        d="M74 86c-5 1-8-1-9-4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* Neck & shoulder */}
      <path
        d="M58 108c4 10 12 18 24 22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M52 118c10 14 24 22 38 20"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Soft lotus hint */}
      <path
        d="M48 148c10-8 22-10 34-8"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.45"
        strokeLinecap="round"
      />
    </svg>
  );
}
