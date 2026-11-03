"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { wedding, type AttendanceStatus } from "@/data/wedding";
import { DividerOrnament } from "@/components/DecorativeElements";
import { SectionReveal } from "@/components/SectionReveal";

type Phase = "form" | "success";

const LOCAL_KEY = "wedding-rsvp-submitted";

export function RSVPSection() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<AttendanceStatus | null>(null);
  const [phase, setPhase] = useState<Phase>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedStatus, setSavedStatus] = useState<AttendanceStatus | null>(null);

  const submit = async (attendance: AttendanceStatus) => {
    const trimmed = name.trim();
    const trimmedContact = contact.trim();
    const trimmedNote = note.trim();

    if (trimmed.length < 2) {
      setError("Please share your name so we know who to welcome.");
      return;
    }
    if (trimmed.length > 80) {
      setError("Please use a shorter name (under 80 characters).");
      return;
    }
    if (trimmedContact.length < 7) {
      setError("Please share a contact number so we can reach you.");
      return;
    }
    if (trimmedContact.length > 20) {
      setError("Please enter a valid contact number.");
      return;
    }
    if (!/^[\d\s+\-()]+$/.test(trimmedContact)) {
      setError("Please enter a valid contact number.");
      return;
    }
    if (trimmedNote.length > 500) {
      setError("Please keep your message under 500 characters.");
      return;
    }

    const prior = typeof window !== "undefined" ? localStorage.getItem(LOCAL_KEY) : null;
    if (prior) {
      try {
        const parsed = JSON.parse(prior) as { name: string; status: AttendanceStatus };
        if (parsed.name.toLowerCase() === trimmed.toLowerCase()) {
          setSavedStatus(parsed.status);
          setPhase("success");
          return;
        }
      } catch {
        // ignore corrupt local state
      }
    }

    setLoading(true);
    setError("");
    setStatus(attendance);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: trimmed,
          contact_number: trimmedContact,
          message: trimmedNote || null,
          attendance_status: attendance,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        attendance_status?: AttendanceStatus;
      };

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      const finalStatus = data.attendance_status || attendance;
      localStorage.setItem(
        LOCAL_KEY,
        JSON.stringify({ name: trimmed, status: finalStatus }),
      );
      setSavedStatus(finalStatus);
      setPhase("success");
    } catch (err) {
      setPhase("form");
      setError(err instanceof Error ? err.message : "Unable to save your RSVP.");
    } finally {
      setLoading(false);
    }
  };

  const confirmation =
    savedStatus === "unable"
      ? wedding.rsvp.decliningMessage
      : wedding.rsvp.attendingMessage;

  return (
    <section
      id="rsvp"
      className="border-t border-champagne/80 bg-gradient-to-b from-ivory via-blush/35 to-champagne/40 px-4 py-16 sm:px-6 sm:py-32"
      aria-labelledby="rsvp-heading"
    >
      <SectionReveal className="mx-auto max-w-xl text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.28em] uppercase text-gold">
          A personal note
        </p>
        <h2
          id="rsvp-heading"
          className="mt-3 font-[family-name:var(--font-playfair)] text-3xl text-wine sm:text-4xl"
        >
          {wedding.rsvp.heading}
        </h2>
        <DividerOrnament className="mt-6" />
        <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
          {wedding.rsvp.description}
        </p>

        <AnimatePresence mode="wait">
          {phase === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 rounded-sm border border-gold/40 bg-ivory/80 p-6 text-left sm:p-8"
            >
              <p className="font-[family-name:var(--font-cormorant)] text-xl leading-relaxed text-wine sm:text-2xl">
                {confirmation}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="mt-10 space-y-5 text-left"
              onSubmit={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <label className="block">
                <span className="font-[family-name:var(--font-cormorant)] text-sm tracking-wide text-ink">
                  Your name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="How should we address you?"
                  className="mt-2 w-full border border-champagne bg-ivory/90 px-4 py-3.5 text-base text-ink outline-none transition focus:border-gold"
                  disabled={loading}
                  required
                  enterKeyHint="next"
                />
              </label>

              <label className="block">
                <span className="font-[family-name:var(--font-cormorant)] text-sm tracking-wide text-ink">
                  Contact number
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  autoComplete="tel"
                  placeholder="So we can reach you"
                  className="mt-2 w-full border border-champagne bg-ivory/90 px-4 py-3.5 text-base text-ink outline-none transition focus:border-gold"
                  disabled={loading}
                  required
                  enterKeyHint="next"
                />
              </label>

              <label className="block">
                <span className="font-[family-name:var(--font-cormorant)] text-sm tracking-wide text-ink">
                  A message for the couple
                  <span className="ml-1 text-ink-soft">(optional)</span>
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Share a wish, blessing, or note for Arpit & Muskan"
                  className="mt-2 w-full resize-y border border-champagne bg-ivory/90 px-4 py-3.5 text-base text-ink outline-none transition focus:border-gold"
                  disabled={loading}
                />
              </label>

              <div className="grid gap-2.5 pt-1 sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => submit("attending")}
                  className="min-h-12 border border-wine/30 bg-wine px-3 py-3.5 text-sm tracking-wide text-ivory transition hover:bg-wine/90 active:scale-[0.99] disabled:opacity-60"
                >
                  {loading && status === "attending"
                    ? "Saving…"
                    : "YES, I'LL BE THERE!"}
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => submit("unable")}
                  className="min-h-12 border border-ink-soft/25 bg-ivory px-3 py-3.5 text-sm leading-snug tracking-wide text-ink-soft transition hover:bg-blush/60 active:scale-[0.99] disabled:opacity-60"
                >
                  {loading && status === "unable"
                    ? "Saving…"
                    : "SORRY, I WON'T BE ABLE TO MAKE IT."}
                </button>
              </div>

              {error ? (
                <p className="text-sm text-wine" role="alert">
                  {error}
                </p>
              ) : null}
            </motion.form>
          )}
        </AnimatePresence>
      </SectionReveal>
    </section>
  );
}
