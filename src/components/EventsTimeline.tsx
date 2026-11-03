"use client";

import { CalendarPlus, Info, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { events, type WeddingEvent } from "@/data/wedding";
import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getGoogleMapsUrl } from "@/lib/maps";
import { DividerOrnament } from "@/components/DecorativeElements";
import { RitualModal } from "@/components/RitualModal";
import { SectionReveal } from "@/components/SectionReveal";

const accentClass: Record<WeddingEvent["accent"], string> = {
  wine: "accent-wine",
  rose: "accent-rose",
  sage: "accent-sage",
  gold: "accent-gold",
  champagne: "accent-champagne",
};

function EventBlock({
  event,
  index,
  onInfo,
}: {
  event: WeddingEvent;
  index: number;
  onInfo: (event: WeddingEvent) => void;
}) {
  return (
    <SectionReveal delay={index * 0.05} className={`relative pl-8 sm:pl-12 ${accentClass[event.accent]}`}>
      <span
        className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-ivory"
        aria-hidden="true"
      />
      {index < events.length - 1 ? (
        <span
          className="absolute left-[5px] top-5 h-[calc(100%+2rem)] w-px bg-champagne"
          aria-hidden="true"
        />
      ) : null}

      <article className="rounded-sm border border-champagne/80 bg-[var(--accent-soft)]/60 p-4 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.18em] uppercase text-[var(--accent)]">
              {event.dateLabel}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-wine sm:text-3xl">
                {event.name}
              </h3>
              <button
                type="button"
                onClick={() => onInfo(event)}
                className="touch-target inline-flex items-center justify-center rounded-full p-2 text-[var(--accent)] transition hover:bg-ivory/80"
                aria-label={`Learn about ${event.name}`}
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 font-[family-name:var(--font-cormorant)] text-lg text-ink-soft">
              {event.timeLabel}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
          {event.description}
        </p>

        <div className="mt-5 flex gap-3 border-t border-champagne/70 pt-5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-lg text-ink">
              {event.venue}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{event.address}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
          <a
            href={getGoogleMapsUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-[var(--accent)]/40 bg-ivory/70 px-4 py-2.5 text-sm text-wine transition hover:bg-ivory"
          >
            <Navigation className="h-4 w-4" />
            Directions
          </a>
          <a
            href={getGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-gold/50 bg-champagne/30 px-4 py-2.5 text-sm text-wine transition hover:bg-champagne/55"
          >
            <CalendarPlus className="h-4 w-4" />
            Add to Calendar
          </a>
        </div>
      </article>
    </SectionReveal>
  );
}

export function EventsTimeline() {
  const [active, setActive] = useState<WeddingEvent | null>(null);

  return (
    <section
      id="celebrations"
      className="px-4 py-16 sm:px-6 sm:py-32"
      aria-labelledby="celebrations-heading"
    >
      <SectionReveal className="mx-auto max-w-2xl text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.28em] uppercase text-gold">
          Five days of joy
        </p>
        <h2
          id="celebrations-heading"
          className="mt-3 font-[family-name:var(--font-playfair)] text-4xl text-wine sm:text-5xl"
        >
          Wedding Celebrations
        </h2>
        <DividerOrnament className="mt-6" />
        <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
          From quiet devotion to sacred vows and joyful music — every gathering
          holds a meaning of its own. Tap the information icon on any event to
          learn about the ritual.
        </p>
      </SectionReveal>

      <div className="relative mx-auto mt-14 max-w-2xl space-y-10">
        {events.map((event, index) => (
          <EventBlock
            key={event.id}
            event={event}
            index={index}
            onInfo={setActive}
          />
        ))}
      </div>

      <RitualModal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        ritual={active?.ritual ?? null}
        eventName={active?.name ?? ""}
      />
    </section>
  );
}
