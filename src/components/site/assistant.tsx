"use client";

import { ArrowUp, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import Link from "next/link";
import { type FormEvent, type KeyboardEvent, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { answer, detectLang, type Lang, SUGGESTIONS } from "@/lib/assistant";
import { checkContact, sendMessage } from "@/lib/contact";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * "Ask about me": a small assistant that answers short questions in Persian
 * or English from Sudabeh's CV. It says so up front, never pretends to be her,
 * and when it isn't sure it offers to send the question to her, with an
 * optional way to reply, in one self-contained message.
 */

type Forward = { question: string; state: "offer" | "sending" | "sent" | "dismissed" | "failed" };
type Bubble = { id: number; from: "bot" | "me"; text: string; links?: { href: string; label: string }[]; forward?: Forward };
type Saved = { lang: Lang; bubbles: Bubble[]; forwards: number };

const KEY = "assistant-v1";
const MAX_FORWARDS = 5;
const MAX_LEN = 500;
const TYPING_MS = 550;
const POP: Transition = { type: "spring", stiffness: 520, damping: 34 };
const noop = () => () => {};

const UI: Record<Lang, Record<string, string>> = {
  en: {
    open: "Ask about me",
    title: "Ask about Sudabeh",
    subtitle: "An assistant · answers from her CV",
    hello: "Hi! I’m Sudabeh’s assistant. Ask me something short about her work, in English or Persian. If I’m not sure, I’ll pass your question to her.",
    placeholder: "Ask a short question…",
    forwardTitle: "Send this question to Sudabeh?",
    contact: "Email, phone or @telegram (optional)",
    contactHelp: "Leave it empty if you don’t need a reply.",
    send: "Send to Sudabeh",
    noThanks: "No thanks",
    sent: "Sent! Sudabeh will see your question",
    sentReply: "and can reply at",
    sentNoReply: "You didn’t leave a contact, so she can’t reply, but she’ll read it.",
    failed: `That didn’t go through. You can email her at ${site.email}.`,
    limit: "You’ve sent several questions already. For more, please email her directly.",
    dismissed: "No problem. Anything else?",
    close: "Close",
    lang: "فارسی",
  },
  fa: {
    open: "از من بپرسید",
    title: "درباره‌ی سودابه بپرسید",
    subtitle: "دستیار · پاسخ از روی رزومه",
    hello: "سلام! من دستیار سودابه هستم. سؤال کوتاهی درباره‌ی کارش بپرسید، فارسی یا انگلیسی. اگر مطمئن نباشم، سؤال‌تان را برای خودش می‌فرستم.",
    placeholder: "سؤال کوتاه‌تان را بنویسید…",
    forwardTitle: "این سؤال برای سودابه فرستاده شود؟",
    contact: "ایمیل، شماره یا آیدی تلگرام (اختیاری)",
    contactHelp: "اگر جواب لازم ندارید، خالی بگذارید.",
    send: "ارسال برای سودابه",
    noThanks: "نه، ممنون",
    sent: "ارسال شد! سودابه سؤال‌تان را می‌بیند",
    sentReply: "و می‌تواند جواب را بفرستد به",
    sentNoReply: "راه ارتباطی نگذاشتید، پس نمی‌تواند جواب بدهد؛ ولی سؤال را می‌خواند.",
    failed: `ارسال نشد. می‌توانید به ${site.email} ایمیل بزنید.`,
    limit: "چند سؤال فرستاده‌اید. برای سؤال‌های بیشتر لطفاً مستقیم ایمیل بزنید.",
    dismissed: "باشه. سؤال دیگری دارید؟",
    close: "بستن",
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
    if (!empty && !check.valid) {
      setTouched(true);
      return;
    }
    onSend(empty ? "" : contact.trim());
  };
  if (f.state !== "offer" && f.state !== "sending") return null;
  return (
    <motion.form
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 grid gap-2 rounded-2xl border border-rule bg-paper p-3"
      dir={lang === "fa" ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 6 }}
      noValidate
      onSubmit={submit}
    >
      <p className="font-medium text-sm">{t.forwardTitle}</p>
      <input
        aria-invalid={Boolean(error)}
        aria-label={t.contact}
        className={cn("h-10 rounded-xl border bg-paper-2/60 px-3 text-sm outline-none focus:border-signal", error ? "border-destructive" : "border-rule")}
        dir="ltr"
        disabled={f.state === "sending"}
        onBlur={() => setTouched(true)}
        onChange={(e) => setContact(e.target.value)}
        placeholder={t.contact}
        value={contact}
      />
      <p className={cn("text-xs", error ? "text-destructive" : "text-ink-soft")}>{error ?? t.contactHelp}</p>
      <div className="flex gap-2">
        <button
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-signal px-4 font-medium text-sm text-on-signal disabled:opacity-60"
          disabled={f.state === "sending"}
          type="submit"
        >
          <Send className="size-3.5" />
          {f.state === "sending" ? "…" : t.send}
        </button>
        <button className="h-9 rounded-full px-3 text-ink-soft text-sm hover:text-ink" disabled={f.state === "sending"} onClick={onDismiss} type="button">
          {t.noThanks}
        </button>
      </div>
    </motion.form>
  );
}

export function Assistant() {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [forwards, setForwards] = useState(0);
  const [restored, setRestored] = useState(false);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const t = UI[lang];

  // Restore the conversation for this tab, so moving between pages keeps it.
  useEffect(() => {
    const saved = load();
    const raf = requestAnimationFrame(() => {
      if (saved) {
        setLang(saved.lang);
        // A send interrupted by a page change can be retried rather than stuck on "sending".
        setBubbles(saved.bubbles.map((b) => (b.forward?.state === "sending" ? { ...b, forward: { ...b.forward, state: "offer" } } : b)));
        setForwards(saved.forwards);
        nextId.current = Math.max(0, ...saved.bubbles.map((b) => b.id)) + 1;
      } else if (navigator.language?.toLowerCase().startsWith("fa")) {
        setLang("fa");
      }
      setRestored(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ lang, bubbles, forwards } satisfies Saved));
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
    const focus = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
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

  const ask = (raw: string) => {
    const q = raw.trim().slice(0, MAX_LEN);
    if (!q || typing) return;
    const qLang = /[؀-ۿ]/.test(q) ? "fa" : /[a-z]/i.test(q) ? "en" : lang;
    setLang(qLang);
    setInput("");
    // Any offer still open is now stale: only the newest question can be forwarded.
    setBubbles((all) => all.map((b) => (b.forward?.state === "offer" ? { ...b, forward: { ...b.forward, state: "dismissed" } } : b)));
    push({ from: "me", text: q });
    setTyping(true);
    window.setTimeout(() => {
      const r = answer(q, qLang === detectLang(q) ? undefined : qLang);
      const canForward = r.offerForward && forwards < MAX_FORWARDS;
      push({
        from: "bot",
        text: r.offerForward && !canForward ? `${r.text}\n\n${UI[qLang].limit}` : r.text,
        links: r.links,
        forward: canForward ? { question: q, state: "offer" } : undefined,
      });
      setTyping(false);
    }, TYPING_MS);
  };

  const forward = async (bubbleId: number, question: string, contact: string) => {
    patchForward(bubbleId, "sending");
    // Send the question with the conversation so far, so Sudabeh has the context.
    const transcript = bubbles
      .slice(-8)
      .map((b) => `${b.from === "me" ? "Visitor" : "Assistant"}: ${b.text}`)
      .join("\n");
    try {
      await sendMessage({ message: `Question from the assistant:\n${question}\n\n— Conversation —\n${transcript}`, contact, topic: "Assistant question" });
      patchForward(bubbleId, "sent");
      setForwards((n) => n + 1);
      const value = contact ? checkContact(contact).value : "";
      push({ from: "bot", text: value ? `${t.sent} ${t.sentReply} ${value}.` : `${t.sent}. ${t.sentNoReply}` });
    } catch {
      patchForward(bubbleId, "failed");
      push({ from: "bot", text: t.failed });
    }
  };

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
          "fixed right-4 bottom-4 z-[90] inline-flex h-12 items-center gap-2 rounded-full bg-ink pr-5 pl-4 font-medium text-paper text-sm shadow-[0_20px_40px_-15px_rgba(40,30,120,0.6)] transition-all duration-300 hover:bg-signal hover:text-on-signal sm:right-6 sm:bottom-6",
          open && "pointer-events-none translate-y-4 opacity-0"
        )}
        onClick={() => setOpen(true)}
        ref={launcherRef}
        type="button"
      >
        <Sparkles className="size-4" />
        {t.open}
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
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {b.links.map((l) =>
                              l.href.endsWith(".pdf") ? (
                                <a className="rounded-full border border-rule px-3 py-1 text-signal text-xs hover:border-signal" download href={l.href} key={l.href}>
                                  {l.label} ↓
                                </a>
                              ) : (
                                <Link className="rounded-full border border-rule px-3 py-1 text-signal text-xs hover:border-signal" href={l.href} key={l.href} onClick={() => setOpen(false)}>
                                  {l.label} →
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
                              patchForward(b.id, "dismissed");
                              push({ from: "bot", text: t.dismissed });
                            }}
                            onSend={(contact) => b.forward && forward(b.id, b.forward.question, contact)}
                          />
                        )}
                      </motion.div>
                    ))}
                    {typing && (
                      <motion.div animate={{ opacity: 1 }} className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-paper-2 px-3.5 py-3" exit={{ opacity: 0 }} initial={{ opacity: 0 }} key="typing">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                            className="size-1.5 rounded-full bg-ink-soft"
                            key={i}
                            transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: i * 0.15 }}
                          />
                        ))}
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
                    aria-label="Send"
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
