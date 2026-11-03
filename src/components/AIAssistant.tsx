"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "What time is the Haldi ceremony?",
  "Where is the wedding venue?",
  "What happens during Saat Phere?",
  "How do I reach Hotel Gayatri Palace?",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Welcome! I'm here to help with ${wedding.coupleNames}'s celebrations — timings, venues, rituals, and directions.`,
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  const ask = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setError("");
    setInput("");
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages
            .filter((m) => m.id !== "welcome")
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        throw new Error(data.error || "I couldn't answer just now. Please try again.");
      }
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: data.reply! },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-champagne bg-wine px-4 py-3 text-sm text-ivory shadow-lg transition hover:bg-wine/90 sm:bottom-8 sm:right-8"
        aria-label="Open Ask Arpit & Muskan assistant"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">{wedding.assistant.name}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-end p-0 sm:items-end sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/25 sm:bg-ink/20"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-label={wedding.assistant.name}
              className="relative flex h-[min(92vh,640px)] w-full flex-col border border-champagne bg-ivory shadow-2xl sm:h-[min(80vh,620px)] sm:max-w-md sm:rounded-sm"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <header className="flex items-start justify-between border-b border-champagne px-5 py-4">
                <div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl text-wine">
                    {wedding.assistant.name}
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    {wedding.assistant.supportingText}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 text-ink-soft hover:bg-blush"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-sm px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-wine text-ivory"
                          : "bg-blush/70 text-ink"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading ? (
                  <p className="text-sm text-ink-soft" aria-live="polite">
                    Thinking…
                  </p>
                ) : null}
                {error ? (
                  <p className="text-sm text-wine" role="alert">
                    {error}
                  </p>
                ) : null}
                <div ref={endRef} />
              </div>

              {messages.length <= 1 ? (
                <div className="flex flex-wrap gap-2 border-t border-champagne/70 px-4 py-3">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="rounded-full border border-champagne bg-paper px-3 py-1.5 text-left text-xs text-ink-soft transition hover:border-gold hover:text-wine"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}

              <form
                className="flex gap-2 border-t border-champagne p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about timings, venues, rituals…"
                  className="flex-1 border border-champagne bg-paper px-3 py-2.5 text-sm outline-none focus:border-gold"
                  disabled={loading}
                  aria-label="Your question"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-wine px-3 text-ivory disabled:opacity-50"
                  aria-label="Send question"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
