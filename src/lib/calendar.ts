import type { WeddingEvent } from "@/data/wedding";
import { wedding } from "@/data/wedding";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/** Format as Google Calendar floating local time: YYYYMMDDTHHMMSS */
function toGCalLocal(date: string, hour: number, minute: number) {
  const [year, month, day] = date.split("-");
  return `${year}${month}${day}T${pad(hour)}${pad(minute)}00`;
}

function toGCalEnd(date: string, hour: number, minute: number, durationHours = 3) {
  const endHour = hour + durationHours;
  const dayOffset = Math.floor(endHour / 24);
  const finalHour = endHour % 24;
  const base = new Date(`${date}T00:00:00`);
  base.setDate(base.getDate() + dayOffset);
  const y = base.getFullYear();
  const m = pad(base.getMonth() + 1);
  const d = pad(base.getDate());
  return `${y}${m}${d}T${pad(finalHour)}${pad(minute)}00`;
}

export function getGoogleCalendarUrl(event: WeddingEvent) {
  const start = toGCalLocal(event.date, event.startHour, event.startMinute);
  const end = toGCalEnd(event.date, event.startHour, event.startMinute);
  const details = [
    event.description,
    "",
    `Venue: ${event.venue}`,
    `Address: ${event.address}`,
    "",
    `${wedding.coupleNames} — Wedding Celebrations`,
  ].join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.name} — ${wedding.coupleNames}`,
    dates: `${start}/${end}`,
    details,
    location: `${event.venue}, ${event.address}`,
    ctz: wedding.timezone,
    // Reminder 24 hours before (Google Calendar URL supports reminders via sf/output;
    // guests can adjust; we also note it in details)
  });

  // Google Calendar web "TEMPLATE" supports `remind` is not officially documented
  // for URL creation; we encode a clear reminder note instead.
  params.set(
    "details",
    `${details}\n\nReminder: Please set a reminder for 24 hours before the event.`,
  );

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
