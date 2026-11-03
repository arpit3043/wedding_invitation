import { generateText, gateway } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildKnowledgeBase, events, wedding } from "@/data/wedding";

const schema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(1000),
      }),
    )
    .max(8)
    .optional(),
});

function localFallbackReply(message: string): string {
  const q = message.toLowerCase();

  if (q.includes("haldi") || q.includes("mehendi") || q.includes("mehndi")) {
    const e = events.find((ev) => ev.id === "haldi-mehendi")!;
    return `${e.name} is on ${e.dateLabel}, ${e.timeLabel}, at ${e.venue} (${e.address}). ${e.ritual.what}`;
  }
  if (q.includes("saat") || q.includes("phere") || q.includes("varmala") || q.includes("wedding venue") || q.includes("gayatri")) {
    const e = events.find((ev) => ev.id === "saat-phere-varmala")!;
    return `${e.name} is on ${e.dateLabel}, ${e.timeLabel}, at ${e.venue}. Address: ${e.address}. ${e.description}`;
  }
  if (q.includes("sangeet") || q.includes("reception") || q.includes("mantra")) {
    const e = events.find((ev) => ev.id === "sangeet-reception")!;
    return `${e.name} is on ${e.dateLabel}, ${e.timeLabel}, at ${e.venue}. Address: ${e.address}.`;
  }
  if (q.includes("ghudchadhi") || q.includes("ghodi") || q.includes("baraat")) {
    const e = events.find((ev) => ev.id === "ghudchadhi")!;
    return `${e.name} is on ${e.dateLabel}, ${e.timeLabel}, near the residence. ${e.ritual.what}`;
  }
  if (q.includes("bhajan")) {
    const e = events.find((ev) => ev.id === "bhajan-sandhya")!;
    return `${e.name} is on ${e.dateLabel}, ${e.timeLabel}. ${e.description}`;
  }
  if (q.includes("2 december") || q.includes("02 december") || q.includes("december 2")) {
    return "On 02 December 2026 we celebrate Haldi & Mehendi from 11:00 AM onwards near the residence in Goriabad, Aligarh.";
  }
  if (q.includes("when") && q.includes("sangeet")) {
    return "Sangeet & Reception is on 05 December 2026, 7:00 PM onwards at Mantra Banquet Hall.";
  }
  if (q.includes("reach") || q.includes("direction") || q.includes("maps") || q.includes("address")) {
    return "Main wedding venue is Hotel Gayatri Palace, Aligarh (Shakti Nagar, Gular Road). Residence events use Bombay Wala Petch, Aligarh. Use the Directions button on each event card for Google Maps.";
  }

  return `I'd love to help with ${wedding.coupleNames}'s celebrations. You can ask about event timings, venues, directions, or rituals like Haldi, Mehendi, Ghudchadhi, Saat Phere, and Sangeet. If a detail hasn't been shared on the invitation, I'll let you know.`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid question." }, { status: 400 });
  }

  const { message, history = [] } = parsed.data;
  const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ reply: localFallbackReply(message), mode: "local" });
  }

  try {
    const historyText = history
      .map((h) => `${h.role === "user" ? "Guest" : "Assistant"}: ${h.content}`)
      .join("\n");

    const { text } = await generateText({
      model: gateway(process.env.AI_GATEWAY_MODEL || "openai/gpt-4o-mini"),
      system: buildKnowledgeBase(),
      prompt: `${historyText ? `Recent conversation:\n${historyText}\n\n` : ""}Guest question: ${message}`,
    });

    return NextResponse.json({ reply: text.trim(), mode: "ai" });
  } catch {
    return NextResponse.json({
      reply: localFallbackReply(message),
      mode: "local-fallback",
    });
  }
}
