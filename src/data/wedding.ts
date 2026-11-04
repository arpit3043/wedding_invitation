export type AttendanceStatus = "attending" | "unable";

export type RitualInfo = {
  title: string;
  what: string;
  why: string;
  whatHappens: string;
  significance: string;
};

export type WeddingEvent = {
  id: string;
  name: string;
  date: string; // ISO date YYYY-MM-DD
  dateLabel: string;
  timeLabel: string;
  startHour: number;
  startMinute: number;
  venue: string;
  address: string;
  plusCode: string;
  description: string;
  accent: "rose" | "sage" | "gold" | "wine" | "champagne";
  ritual: RitualInfo;
};

export const wedding = {
  groom: "Arpit",
  bride: "Muskan",
  coupleNames: "Arpit & Muskan",
  celebrationRange: "01 December – 05 December 2026",
  celebrationShort: "01 – 05 December 2026",
  mainCeremonyDate: "2026-12-04T11:00:00+05:30",
  countdownTarget: "2026-12-04T11:00:00+05:30",
  timezone: "Asia/Kolkata",
  sanskritInvocation: "॥ श्री गणेशाय नमः ॥",
  openingText:
    "Under the divine blessings of Lord Shiva and surrounded by the love of our families, we invite you to grace our wedding celebration and share in the joy of the beginning of our forever.",
  supportingLine: "Two families, two hearts, one beautiful beginning.",
  togetherLine: "Together with our families",
  story: {
    heading: "A New Chapter Begins",
    text: "Some journeys are written in the stars, while others begin with a beautiful meeting of hearts. With the blessings of our loved ones, we are beginning a new chapter, and it would mean the world to have you beside us.",
  },
  rsvp: {
    heading: "Will You Be Celebrating With Us?",
    description:
      "Your presence would make our celebrations even more special. We would love to know if you can join us for these memorable moments.",
    attendingMessage:
      "That makes us so happy! Keep your brightest smile ready. We cannot wait to welcome you with open hearts, endless happiness, and lots of love. Your presence will make our celebrations complete. Great Welcome from Arpit & Muskan",
    decliningMessage:
      "You are on Arpit's top priority list, and we feel truly sad that you won't be able to make it to this grand celebration. Let Arpit handle this over a call with you — he will connect with you soon !. Sending you lots of love and warm wishes!",
  },
  assistant: {
    name: "Ask Arpit & Muskan",
    supportingText: "Curious about the celebrations? We're here to help!",
  },
  siteUrl: "https://arpitwedsmuskan.com",
  metaDescription:
    "You are invited to celebrate the wedding of Arpit and Muskan — 01 to 05 December 2026 in Aligarh. Join us for Bhajan Sandhya, Haldi & Mehendi, Ghudchadhi, Saat Phere & Varmala, and Sangeet & Reception.",
} as const;

export const events: WeddingEvent[] = [
  {
    id: "bhajan-sandhya",
    name: "Bhajan Sandhya",
    date: "2026-12-01",
    dateLabel: "01 December 2026",
    timeLabel: "6:00 PM onwards",
    startHour: 18,
    startMinute: 0,
    venue: "Near Residence",
    address:
      "Bombay Wala Petch, Aligarh, Uttar Pradesh 202001",
    plusCode: "Aligarh, Uttar Pradesh",
    description:
      "An evening of devotion, melodies, and heartfelt prayers. Let us begin our celebrations by seeking divine blessings for a beautiful journey ahead.",
    accent: "wine",
    ritual: {
      title: "Bhajan Sandhya",
      what: "Bhajan Sandhya is a serene evening of collective devotion — families gather to sing bhajans (devotional songs) and offer prayers together before the wedding festivities begin.",
      why: "It is performed to invite divine blessings for the couple, purify the atmosphere with sacred sound, and begin the celebrations in gratitude and peace.",
      whatHappens:
        "Guests sit together as singers and musicians lead familiar bhajans. Soft lamps, incense, and shared singing create a calm, spiritual mood. Prayers are offered for the couple’s happiness and a harmonious married life.",
      significance:
        "In many North Indian families, starting a wedding week with devotion reminds everyone that a marriage is not only a celebration of two people, but a sacred beginning watched over by faith, family, and community.",
    },
  },
  {
    id: "haldi-mehendi",
    name: "Haldi & Mehendi",
    date: "2026-12-02",
    dateLabel: "02 December 2026",
    timeLabel: "11:00 AM onwards",
    startHour: 11,
    startMinute: 0,
    venue: "Near Residence",
    address:
      "Bombay Wala Petch, Aligarh, Uttar Pradesh 202001",
    plusCode: "Aligarh, Uttar Pradesh",
    description:
      "A beautiful day filled with traditions, laughter, colours, and togetherness. A celebration of love, friendship, and all things joyful.",
    accent: "gold",
    ritual: {
      title: "Haldi & Mehendi",
      what: "Haldi is the turmeric blessing ceremony; Mehendi is the application of intricate henna designs — often celebrated together as a joyful day of colour, music, and closeness.",
      why: "Haldi is believed to purify, protect, and bring auspicious glow to the bride and groom. Mehendi is cherished as a symbol of beauty, joy, and good wishes for married life.",
      whatHappens:
        "Family and friends lovingly apply a paste of turmeric, sandalwood, and oils on the couple. Later, mehendi artists adorn the bride’s (and often guests’) hands and feet with floral and bridal motifs while music and laughter fill the air.",
      significance:
        "Haldi represents blessing, radiance, and the community’s affectionate care. Mehendi’s deepening colour is playfully linked to the depth of love and the warmth awaiting married life — a day where ritual meets celebration.",
    },
  },
  {
    id: "ghudchadhi",
    name: "Ghudchadhi",
    date: "2026-12-03",
    dateLabel: "03 December 2026",
    timeLabel: "3:00 PM onwards",
    startHour: 15,
    startMinute: 0,
    venue: "Near Residence",
    address:
      "Bombay Wala Petch, Aligarh, Uttar Pradesh 202001",
    plusCode: "Aligarh, Uttar Pradesh",
    description:
      "The excitement is in the air! Join us as we celebrate this beautiful tradition and prepare for the grand wedding procession.",
    accent: "champagne",
    ritual: {
      title: "Ghudchadhi",
      what: "Ghudchadhi (also called Sehra Bandi in some traditions) is the groom’s ceremonial mounting of a decorated horse — the moment that marks the start of the Baraat procession.",
      why: "It celebrates the groom’s readiness for marriage and formally begins his joyful journey toward the wedding venue with family and friends.",
      whatHappens:
        "The groom is dressed in wedding attire, often with a sehra (veil of pearls or flowers). After blessings from elders, he mounts a decorated horse amid music, dancing, and cheering — and the Baraat sets off in celebration.",
      significance:
        "Ghudchadhi is a proud, festive rite of passage. It turns the groom’s departure into a community celebration, honouring family bonds and the grandeur with which a wedding journey traditionally begins.",
    },
  },
  {
    id: "saat-phere-varmala",
    name: "Saat Phere & Varmala",
    date: "2026-12-04",
    dateLabel: "04 December 2026",
    timeLabel: "11:00 AM onwards",
    startHour: 11,
    startMinute: 0,
    venue: "Hotel Gayatri Palace, Aligarh",
    address:
      "Gular Road, Aligarh, Uttar Pradesh 202001",
    plusCode: "Aligarh, Uttar Pradesh",
    description:
      "The day our forever begins. Witness the exchange of garlands and the sacred seven vows as two hearts unite in the presence of family, friends, and the Almighty.",
    accent: "rose",
    ritual: {
      title: "Saat Phere & Varmala",
      what: "Varmala is the exchange of floral garlands between bride and groom. Saat Phere are the seven sacred rounds taken around Agni (the holy fire), sealing the marriage vows.",
      why: "Varmala signifies mutual acceptance. Saat Phere solemnise the marriage before the divine fire, family, and witnesses — establishing the couple’s sacred commitments to one another.",
      whatHappens:
        "The couple first exchange varmalas amid celebration. During Saat Phere, they circumambulate the sacred fire seven times while mantras are chanted. Each phera embodies a vow — from nourishment and strength to prosperity, love, progeny, longevity, and lifelong friendship.",
      significance:
        "Together, these rituals mark the heart of a Hindu wedding: free acceptance of one another, and a covenant of companionship, duty, and devotion made in the presence of Agni and loved ones.",
    },
  },
  {
    id: "sangeet-reception",
    name: "Sangeet & Reception",
    date: "2026-12-05",
    dateLabel: "05 December 2026",
    timeLabel: "7:00 PM onwards",
    startHour: 19,
    startMinute: 0,
    venue: "Mantra Banquet Hall",
    address:
      "Gular Road, Aligarh, Uttar Pradesh 202001",
    plusCode: "Aligarh, Uttar Pradesh",
    description:
      "An evening to celebrate love, laughter, music, and new beginnings. Bring your smiles, your dancing shoes, and your blessings as we celebrate together!",
    accent: "sage",
    ritual: {
      title: "Sangeet & Reception",
      what: "Sangeet is a musical celebration of dance and song by both families. The reception welcomes guests to congratulate the newly married couple in a joyful evening gathering.",
      why: "It brings both families together in lighthearted celebration, honouring the union through performance, hospitality, and shared happiness after the sacred ceremonies.",
      whatHappens:
        "Relatives and friends often perform choreographed dances and songs. Guests enjoy music, dinner, and warm wishes for the couple — a night of laughter, photographs, and open celebration.",
      significance:
        "Sangeet and reception affirm that marriage is a coming together of communities. Music and dance soften formality into joy, while the reception publicly celebrates the couple’s new beginning.",
    },
  },
];

export function getEventById(id: string) {
  return events.find((event) => event.id === id);
}

export function buildKnowledgeBase() {
  const eventLines = events
    .map(
      (event) =>
        `- ${event.name} on ${event.dateLabel} at ${event.timeLabel}. Venue: ${event.venue}. Address: ${event.address}. ${event.description} Ritual: ${event.ritual.what} Why: ${event.ritual.why} What happens: ${event.ritual.whatHappens} Significance: ${event.ritual.significance}`,
    )
    .join("\n");

  return `
You are the wedding concierge for ${wedding.coupleNames}'s wedding invitation website.
Speak warmly, concisely, and helpfully — like a thoughtful wedding host, never a generic chatbot.
Answer only from the verified information below. If something is not listed, politely say that detail has not been provided.
Do not invent venues, times, dress codes, hotel bookings, gift registries, or travel arrangements.
Keep answers short (2–5 sentences) unless the guest asks for ritual detail.

Couple: ${wedding.groom} (groom) and ${wedding.bride} (bride)
Celebration dates: ${wedding.celebrationRange}
Main wedding ceremony: 04 December 2026 (Saat Phere & Varmala)
Location city: Aligarh, Uttar Pradesh, India
Timezone: IST (Asia/Kolkata)

Events:
${eventLines}
`.trim();
}
