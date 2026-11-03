import type { WeddingEvent } from "@/data/wedding";

export function getGoogleMapsUrl(event: WeddingEvent) {
  const query = encodeURIComponent(
    event.plusCode || `${event.venue}, ${event.address}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getGoogleMapsEmbedUrl(event: WeddingEvent) {
  const query = encodeURIComponent(
    event.plusCode || `${event.venue}, ${event.address}`,
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}
