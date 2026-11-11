"use client";

import { ArrowUp, Check, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import Link from "next/link";
import { type FormEvent, type KeyboardEvent, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { answer, detectLang, type Lang, SUGGESTIONS } from "@/lib/assistant";
import { askRemote, type Turn } from "@/lib/assistant-remote";
import { checkContact, sendInBackground, sendMessage } from "@/lib/contact";
import { site } from "@/lib/content";
import { isTouchFirst, useScrollLock } from "@/lib/use-scroll-lock";
import { cn } from "@/lib/utils";

/**
 * "Ask about me": an assistant that answers questions about Sudabeh in Persian
 * or English, interview-style. Answers come from the AI backend when it's set
 * up (see docs/contact-form.gs), and from the built-in answers in assistant.ts
 * otherwise. Either way it says what it is, never pretends to be her, and when
 * it can't answer it sends the question to her, with an optional way to reply.
 */

// Unanswered questions go to Sudabeh straight away; the card only asks whether the visitor wants a reply.
type Forward = { question: string; state: "sending" | "sent" | "replying" | "done" | "failed" };
type Bubble = { id: number; from: "bot" | "me"; text: string; links?: { href: string; label: string }[]; forward?: Forward };
type Saved = { lang: Lang; bubbles: Bubble[]; forwards: number; synced?: number };

const KEY = "assistant-v2";
const MAX_FORWARDS = 5;
const MAX_LEN = 600;
// A short beat before a reply appears, so an instant built-in answer doesn't feel abrupt.
const TYPING_MS = 550;
// When the AI takes longer than this, say it's still working on it.
const SLOW_MS = 5000;
// The last few exchanges go along with each question, so follow-ups ("and how long did that take?") make sense.
const HISTORY_TURNS = 8;
const RTL = /[؀-ۿ]/;
const POP: Transition = { type: "spring", stiffness: 520, damping: 34 };
const noop = () => () => {};

const UI: Record<Lang, Record<string, string>> = {
  en: {
    open: "Ask about me",
    title: "Ask about Sudabeh",
    subtitle: "Answers from her portfolio",
    hello: "Hi! I’m Sudabeh’s assistant. Ask me anything about her work, the way you would in an interview, in English or Persian. If I don’t know the answer, I’ll pass your question to her.",
    placeholder: "Ask anything about her work…",
    slow: "Putting together a proper answer…",
    sending: "Sending your question to Sudabeh…",
    forwardTitle: "Sent to Sudabeh. Want her reply?",
    contact: "Email, phone or @telegram",
    send: "Send",
    noThanks: "No thanks",
    sentReply: "Thanks! She’ll reply at",
    failed: `That didn’t go through. You can email her at ${site.email}.`,
    limit: "You’ve sent several questions to her already. For anything else, email her directly.",
    dismissed: "No problem. What else would you like to know?",
    close: "Close",
    send_aria: "Send question",
    lang: "فارسی",
  },
  fa: {
    open: "از من بپرسید",
    title: "درباره‌ی سودابه بپرسید",
    subtitle: "پاسخ از روی رزومه و نمونه‌کارها",
    hello: "سلام! من دستیار سودابه هستم. هر سؤالی درباره‌ی کارش دارید، مثل یک مصاحبه بپرسید؛ فارسی یا انگلیسی. اگر جوابش را ندانم، سؤال‌تان را برای خودش می‌فرستم.",
    placeholder: "درباره‌ی کار و سوابقش بپرسید…",
    slow: "دارم جواب دقیقی آماده می‌کنم…",
    sending: "در حال فرستادن سؤال‌تان برای سودابه…",
    forwardTitle: "برای سودابه فرستاده شد. جوابش را می‌خواهید؟",
    contact: "ایمیل، شماره یا آیدی تلگرام",
    send: "ارسال",
    noThanks: "نه، ممنون",
    sentReply: "ممنون! جواب را می‌فرستد به",
    failed: `ارسال نشد. می‌توانید به ${site.email} ایمیل بزنید.`,
    limit: "چند سؤال برایش فرستاده‌اید. برای سؤال‌های بیشتر، لطفاً مستقیم ایمیل بزنید.",
    dismissed: "باشه. چه چیز دیگری می‌خواهید بدانید؟",
    close: "بستن",
    send_aria: "ارسال سؤال",
    lang: "English",
  },
};

function load(): Saved | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function ForwardCard({ f, lang, onSend, onDismiss }: { f: Forward; lang: Lang; onSend: (contact: string) => void; onDismiss: () => void }) {
  const t = UI[lang];
  const [contact, setContact] = useState("");
  const [touched, setTouched] = useState(false);
  const check = checkContact(contact);
  const empty = contact.trim() === "";
  const error = touched && !empty && !check.valid ? check.error : undefined;
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (empty || !check.valid) {
      setTouched(true);
      return;
    }
    onSend(contact.trim());
  };
  if (f.state === "sending") {
    return <p className="mt-2 px-1 text-ink-soft text-xs">{t.sending}</p>;
  }
  if (f.state !== "sent" && f.state !== "replying") return null;
  return (
    <motion.form
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 grid gap-2 rounded-2xl border border-rule bg-paper p-3"
      dir={lang === "fa" ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 6 }}
      noValidate
      onSubmit={submit}
    >
      <p className="flex items-center gap-2 font-medium text-sm">
        <Check className="size-4 text-signal" /> {t.forwardTitle}
      </p>
      <input
        aria-invalid={Boolean(error)}
        aria-label={t.contact}
        className={cn("h-10 rounded-xl border bg-paper-2/60 px-3 text-sm outline-none focus:border-signal", error ? "border-destructive" : "border-rule")}
        dir="ltr"
        disabled={f.state === "replying"}
        onBlur={() => setTouched(true)}
        onChange={(e) => setContact(e.target.value)}
        placeholder={t.contact}
        value={contact}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
      <div className="flex gap-2">
        <button
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-signal px-4 font-medium text-on-signal text-sm disabled:opacity-60"
          disabled={f.state === "replying" || empty}
          type="submit"
        >
          <Send className="size-3.5" />
          {f.state === "replying" ? "…" : t.send}
        </button>
        <button className="h-9 rounded-full px-3 text-ink-soft text-sm hover:text-ink" disabled={f.state === "replying"} onClick={onDismiss} type="button">
          {t.noThanks}
        </button>
      </div>
    </motion.form>
  );
}

export function Assistant() {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const [open, setOpen] = useState(false);
  // On phones the panel covers most of the screen, so the page behind it stays put.
  const [lockPage, setLockPage] = useState(false);
  useScrollLock(open && lockPage);
  const [lang, setLang] = useState<Lang>("en");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [slow, setSlow] = useState(false);
  const [input, setInput] = useState("");
  const [forwards, setForwards] = useState(0);
  const [restored, setRestored] = useState(false);
  // Read when a reply arrives, after an await: refs, not state, so the values are current.
  const forwardsRef = useRef(0);
  const nextId = useRef(1);
  // The last bubble Sudabeh has already received, so nothing is sent twice (kept across page loads).
  const synced = useRef(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const t = UI[lang];

  // Moving between pages keeps the conversation; reloading the page starts a fresh one.
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const saved = nav?.type === "reload" ? null : load();
    const raf = requestAnimationFrame(() => {
      if (saved) {
        setLang(saved.lang);
        // A send interrupted by a page change can be retried rather than stuck on "sending".
        setBubbles(saved.bubbles.map((b) => (b.forward && ["sending", "replying"].includes(b.forward.state) ? { ...b, forward: { ...b.forward, state: "sent" } } : b)));
        setForwards(saved.forwards);
        forwardsRef.current = saved.forwards;
        nextId.current = Math.max(0, ...saved.bubbles.map((b) => b.id)) + 1;
        // Without this, a restored chat would be emailed to Sudabeh again when the panel closes.
        synced.current = saved.synced ?? Math.max(0, ...saved.bubbles.map((b) => b.id));
      }
      setRestored(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ lang, bubbles, forwards, synced: synced.current } satisfies Saved));
    } catch {
      // Private mode: the chat just won't survive a page change.
    }
  }, [lang, bubbles, forwards, restored]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [bubbles, typing, open]);

  useEffect(() => {
    if (!open) return;
    const trigger = launcherRef.current;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    // Phones: no automatic keyboard; it would push the page and cover the answers.
    const focus = isTouchFirst() ? 0 : window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focus);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [input]);

  const push = useCallback((b: Omit<Bubble, "id">) => {
    const id = nextId.current++;
    setBubbles((all) => [...all, { ...b, id }]);
    return id;
  }, []);

  const patchForward = (id: number, state: Forward["state"]) =>
    setBubbles((all) => all.map((b) => (b.id === id && b.forward ? { ...b, forward: { ...b.forward, state } } : b)));

  // What's been said so far, for the message Sudabeh receives.
  const transcriptOf = (all: Bubble[]) => all.map((b) => `${b.from === "me" ? "Visitor" : "Assistant"}: ${b.text}`).join("\n");
  const bubblesRef = useRef<Bubble[]>([]);
  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

  const ask = async (raw: string) => {
    const q = raw.trim().slice(0, MAX_LEN);
    if (!q || typing) return;
    const qLang: Lang = /[؀-ۿ]/.test(q) ? "fa" : /[a-z]/i.test(q) ? "en" : lang;
    setLang(qLang);
    setInput("");
    // An open "want a reply?" card is stale once a new question is asked.
    setBubbles((all) => all.map((b) => (b.forward?.state === "sent" ? { ...b, forward: { ...b.forward, state: "done" } } : b)));
    const history: Turn[] = bubblesRef.current.slice(-HISTORY_TURNS).map((b) => ({ role: b.from === "me" ? "user" : "assistant", text: b.text }));
    push({ from: "me", text: q });
    setTyping(true);
    const slowTimer = window.setTimeout(() => setSlow(true), SLOW_MS);
    const [remote] = await Promise.all([askRemote(q, history, qLang), new Promise((done) => window.setTimeout(done, TYPING_MS))]);
    window.clearTimeout(slowTimer);
    // The AI's answer when it's available; the built-in answers otherwise.
    const local = remote ? null : answer(q, qLang === detectLang(q) ? undefined : qLang);
    const reply = remote ?? { text: local!.text, lang: local!.lang, forward: local!.offerForward, links: local!.links };
    const canForward = reply.forward && forwardsRef.current < MAX_FORWARDS;
    if (canForward) forwardsRef.current += 1;
    const id = push({
      from: "bot",
      text: reply.forward && !canForward ? `${reply.text}\n\n${UI[reply.lang].limit}` : reply.text,
      links: reply.links,
      forward: canForward ? { question: q, state: "sending" } : undefined,
    });
    setLang(reply.lang);
    setTyping(false);
    setSlow(false);
    // Sent straight away, with or without a contact: Sudabeh sees every question she needs to answer.
    if (canForward) void forward(id, q, reply.text, reply.lang);
  };

  const forward = async (bubbleId: number, question: string, said: string, qLang: Lang) => {
    const earlier = bubblesRef.current.filter((b) => b.id < bubbleId - 1).slice(-8);
    try {
      await sendMessage({
        message: `Question from the assistant:\n${question}\n\nThe assistant replied:\n${said}${earlier.length ? `\n\n— Earlier in the conversation —\n${transcriptOf(earlier)}` : ""}`,
        contact: "",
        topic: "Assistant question",
      });
      synced.current = Math.max(synced.current, bubbleId);
      patchForward(bubbleId, "sent");
      setForwards(forwardsRef.current);
    } catch {
      forwardsRef.current -= 1;
      patchForward(bubbleId, "failed");
      push({ from: "bot", text: UI[qLang].failed });
    }
  };

  // A way to reply, added after the question has already gone.
  const sendReply = async (bubbleId: number, question: string, contact: string) => {
    patchForward(bubbleId, "replying");
    const value = checkContact(contact).value;
    try {
      await sendMessage({ message: `Reply details for the question:\n${question}`, contact: value, topic: "Assistant question · reply" });
      patchForward(bubbleId, "done");
      push({ from: "bot", text: `${t.sentReply} ${value}.` });
    } catch {
      patchForward(bubbleId, "sent");
      push({ from: "bot", text: t.failed });
    }
  };

  // Whatever hasn't reached Sudabeh yet (answered questions too) goes when the panel closes or the
  // page is left, in the background, so she sees every conversation.
  const flush = useCallback(() => {
    const all = bubblesRef.current;
    const fresh = all.filter((b) => b.id > synced.current);
    if (!fresh.some((b) => b.from === "me")) return;
    synced.current = Math.max(...all.map((b) => b.id));
    sendInBackground({ message: `Conversation with the assistant:\n\n${transcriptOf(fresh)}`, contact: "", topic: "Assistant conversation" });
    // The page may be closing, so save the marker now rather than on the next render.
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) sessionStorage.setItem(KEY, JSON.stringify({ ...(JSON.parse(raw) as Saved), synced: synced.current }));
    } catch {
      // Private mode: nothing to keep in sync.
    }
  }, []);

  useEffect(() => {
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
    };
  }, [flush]);

  useEffect(() => {
    if (!open) flush();
  }, [open, flush]);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      ask(input);
    }
  };

  const showSuggestions = !typing && !bubbles.some((b) => b.from === "me");

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[90] inline-flex h-11 items-center gap-2 rounded-full bg-ink pr-4 pl-3.5 sm:h-12 sm:pr-5 sm:pl-4 font-medium text-paper text-sm shadow-[0_20px_40px_-15px_rgba(40,30,120,0.6)] transition-all duration-300 hover:bg-signal hover:text-on-signal sm:right-6 sm:bottom-6",
          open && "pointer-events-none translate-y-4 opacity-0"
        )}
        onClick={() => {
          setLockPage(window.innerWidth < 640);
          setOpen(true);
        }}
        ref={launcherRef}
        type="button"
      >
        <Sparkles className="size-4" />
        {UI.en.open}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                animate={{ opacity: 1, y: 0, scale: 1 }}
                aria-label={t.title}
                aria-modal="false"
                className="fixed inset-x-2 bottom-2 z-[95] flex max-h-[85dvh] flex-col overflow-hidden rounded-[24px] border border-rule bg-paper text-ink shadow-[0_30px_80px_-30px_rgba(20,15,60,0.6)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[600px] sm:w-[400px]"
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                role="dialog"
                style={{ originX: 1, originY: 1 }}
                transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
              >
                <div className="flex items-center gap-3 border-rule border-b px-4 py-3">
                  <span className="grid size-9 place-items-center rounded-full bg-blush text-signal">
                    <Sparkles className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1" dir={lang === "fa" ? "rtl" : "ltr"}>
                    <p className="truncate font-semibold text-sm">{t.title}</p>
                    <p className="truncate text-ink-soft text-xs">{t.subtitle}</p>
                  </div>
                  <button
                    className="rounded-full border border-rule px-2.5 py-1 text-xs hover:border-signal hover:text-signal"
                    onClick={() => setLang(lang === "en" ? "fa" : "en")}
                    type="button"
                  >
                    {t.lang}
                  </button>
                  <button aria-label={t.close} className="grid size-8 place-items-center rounded-full text-ink-soft hover:bg-paper-2" onClick={() => setOpen(false)} type="button">
                    <X className="size-4" />
                  </button>
                </div>

                <div aria-live="polite" className="flex min-h-[220px] flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-4 py-4" ref={logRef} role="log">
                  <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-paper-2 px-3.5 py-2.5 text-sm leading-relaxed" dir="auto">
                    {t.hello}
                  </div>
                  <AnimatePresence initial={false}>
                    {bubbles.map((b) => (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("flex max-w-[88%] flex-col", b.from === "me" ? "items-end self-end" : "self-start")}
                        initial={{ opacity: 0, y: 8 }}
                        key={b.id}
                        transition={POP}
                      >
                        <div
                          className={cn(
                            "whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                            b.from === "me" ? "rounded-br-md bg-signal text-on-signal" : "rounded-bl-md bg-paper-2"
                          )}
                          dir="auto"
                        >
                          {b.text}
                        </div>
                        {b.links && b.links.length > 0 && (
                          // Follows the answer's language, so a Persian answer gets right-to-left buttons with arrows that point the right way.
                          <div className="mt-1.5 flex flex-wrap gap-1.5" dir={RTL.test(b.text) ? "rtl" : "ltr"}>
                            {b.links.map((l) =>
                              l.href.endsWith(".pdf") ? (
                                <a className="rounded-full border border-rule px-3 py-1 text-signal text-xs hover:border-signal" download href={l.href} key={l.href}>
                                  {l.label} ↓
                                </a>
                              ) : (
                                <Link className="rounded-full border border-rule px-3 py-1 text-signal text-xs hover:border-signal" href={l.href} key={l.href} onClick={() => setOpen(false)}>
                                  {l.label} {RTL.test(b.text) ? "←" : "→"}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                        {b.forward && (
                          <ForwardCard
                            f={b.forward}
                            lang={lang}
                            onDismiss={() => {
                              patchForward(b.id, "done");
                              push({ from: "bot", text: t.dismissed });
                            }}
                            onSend={(contact) => b.forward && sendReply(b.id, b.forward.question, contact)}
                          />
                        )}
                      </motion.div>
                    ))}
                    {typing && (
                      <motion.div animate={{ opacity: 1 }} className="flex w-fit items-center gap-2.5 rounded-2xl rounded-bl-md bg-paper-2 px-3.5 py-3" exit={{ opacity: 0 }} initial={{ opacity: 0 }} key="typing">
                        <span className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                              className="size-1.5 rounded-full bg-ink-soft"
                              key={i}
                              transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: i * 0.15 }}
                            />
                          ))}
                        </span>
                        {slow && (
                          <motion.span animate={{ opacity: 1 }} className="text-ink-soft text-xs" dir={lang === "fa" ? "rtl" : "ltr"} initial={{ opacity: 0 }}>
                            {t.slow}
                          </motion.span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {showSuggestions && (
                    <div className="mt-1 flex flex-wrap gap-1.5" dir={lang === "fa" ? "rtl" : "ltr"}>
                      {SUGGESTIONS[lang].map((s) => (
                        <button className="rounded-full border border-rule px-3 py-1.5 text-xs hover:border-signal hover:text-signal" key={s} onClick={() => ask(s)} type="button">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  className="flex items-end gap-2 border-rule border-t p-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                  }}
                >
                  <textarea
                    aria-label={t.placeholder}
                    className="max-h-[120px] min-h-[44px] flex-1 resize-none rounded-2xl border border-rule bg-paper-2/60 px-3.5 py-2.5 text-[16px] leading-snug outline-none focus:border-signal sm:text-sm"
                    dir="auto"
                    maxLength={MAX_LEN}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={t.placeholder}
                    ref={inputRef}
                    rows={1}
                    value={input}
                  />
                  <button
                    aria-label={t.send_aria}
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full transition-colors",
                      input.trim() && !typing ? "bg-signal text-on-signal" : "bg-ink/10 text-ink-soft"
                    )}
                    disabled={!input.trim() || typing}
                    type="submit"
                  >
                    <ArrowUp className="size-5" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
