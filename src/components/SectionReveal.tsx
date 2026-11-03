"use client";

import type { ReactNode } from "react";

/** Lightweight reveal wrapper — avoids framer-motion SSR edge cases. */
export function SectionReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={`animate-in-section ${className}`}>{children}</div>;
}
