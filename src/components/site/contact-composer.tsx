"use client";

import { ArrowUpRight, AtSign, Mail, Phone, Send } from "lucide-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import Image from "next/image";
import { type FormEvent, type KeyboardEvent, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/components/motion/reveal";
import { type ContactKind, checkContact, sendMessage } from "@/lib/contact";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * One short form, sent in one go: an optional topic, the message, and an
 * optional way to reply. Every submission is complete on its own, so
 * messages from different visitors can never get mixed up, and nothing is
 * lost when someone doesn't leave a contact.
 */

type Phase = "idle" | "sending" | "sent" | "error";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const POP: Transition = { type: "spring", stiffness: 520, damping: 34 };
const TOPICS = ["Hiring", "A project", "A question", "Just saying hi"];

const KINDS: Record<ContactKind, { label: string; Icon: typeof Mail }> = {
  email: { label: "Email", Icon: Mail },
  phone: { label: "Phone", Icon: Phone },
  telegram: { label: "Telegram", Icon: Send },
};

export function ContactComposer({
  className,
  bare = false,
  autoFocus = false,
}: {
  className?: string;
  /** Drops the card chrome, for when a sheet already frames it. */
  bare?: boolean;
  autoFocus?: boolean;
}) {
  const id = useId();
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [contactTouched, setContactTouched] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [sentTo, setSentTo] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const check = checkContact(contact);
  const contactEmpty = contact.trim() === "";
  const contactError = contactTouched && !contactEmpty && !check.valid ? check.error : undefined;
  const ready = message.trim() !== "" && (contactEmpty || check.valid);
  const KindIcon = check.kind ? KINDS[check.kind].Icon : AtSign;

  useEffect(() => {
    if (!autoFocus) return;
    // After a sheet's slide-in, so the keyboard doesn't fight the animation.
    const t = window.setTimeout(() => messageRef.current?.focus({ preventScroll: true }), 350);
    return () => window.clearTimeout(t);
  }, [autoFocus]);

  // The message box grows with its text, up to a point.
  useLayoutEffect(() => {
    const el = messageRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
    }
  }, [message, phase]);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (phase === "sending") return;
    if (!ready) {
      setContactTouched(true);
      if (message.trim() === "") messageRef.current?.focus();
      return;
    }
    setPhase("sending");
    try {
      await sendMessage({ message: message.trim(), contact: contactEmpty ? "" : contact.trim(), topic });
      setSentTo(contactEmpty ? "" : check.value);
      setMessage("");
      setContact("");
      setTopic("");
      setContactTouched(false);
      setPhase("sent");
    } catch {
      setPhase("error");
    }
  };

  const onMessageKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      className={cn(
        "relative w-full max-w-[600px] overflow-hidden text-left text-ink",
        bare
          ? "rounded-2xl"
          : "rounded-[28px] border border-rule bg-paper/90 shadow-[0_40px_90px_-50px_rgba(40,30,120,0.55)] backdrop-blur-md",
        className
      )}
      initial={bare ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      layout
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3, layout: { type: "spring", duration: 0.5, bounce: 0.12 } }}
    >
      <div className="flex items-center gap-3 border-rule border-b px-5 py-4 sm:px-6">
        <span className="relative size-10 shrink-0">
          <Image alt="" className="rounded-full object-cover grayscale" fill sizes="40px" src={`${BASE}/about/sudabeh.webp`} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold leading-tight">Write to {site.shortName}</p>
          <p className="truncate text-ink-soft text-xs">Goes straight to my inbox. I read every message myself.</p>
        </div>
      </div>

      <AnimatePresence initial={false} mode="popLayout">
        {phase === "sent" ? (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center px-8 py-12 text-center"
            exit={{ opacity: 0, scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.98 }}
            key="sent"
            role="status"
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <svg aria-hidden className="size-14 text-signal" fill="none" viewBox="0 0 56 56">
              <motion.circle animate={{ scale: 1, opacity: 0.14 }} cx="28" cy="28" fill="currentColor" initial={{ scale: 0.4, opacity: 0 }} r="28" style={{ transformOrigin: "28px 28px" }} transition={POP} />
              <motion.path
                animate={{ pathLength: 1 }}
                d="M18 29 25 36 39 21"
                initial={{ pathLength: 0 }}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.15 }}
              />
            </svg>
            <h3 className="mt-6 font-display text-3xl">Message sent</h3>
            <p className="mt-3 max-w-sm text-ink-soft">
              {sentTo ? (
                <>
                  Thank you! I’ll reply at <span className="font-mono text-ink">{sentTo}</span>.
                </>
              ) : (
                "It’s in my inbox. You didn’t leave a way to reach you, so I can’t reply this time, and that’s fine."
              )}
            </p>
            <button
              className="mt-8 h-11 rounded-full border border-ink/15 px-5 text-sm transition-colors hover:border-signal hover:text-signal"
              onClick={() => {
                setPhase("idle");
                requestAnimationFrame(() => messageRef.current?.focus());
              }}
              type="button"
            >
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            animate={{ opacity: 1 }}
            aria-label={`Write to ${site.shortName}`}
            className="grid gap-5 px-5 pt-5 pb-5 sm:px-6"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key="form"
            noValidate
            onSubmit={submit}
          >
            <fieldset>
              <legend className="mb-2 font-medium text-sm">
                What’s it about? <span className="font-normal text-ink-soft">Optional</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => {
                  const on = topic === t;
                  return (
                    <button
                      aria-pressed={on}
                      className={cn(
                        "relative rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                        on ? "border-signal text-on-signal" : "border-rule hover:border-signal hover:text-signal"
                      )}
                      key={t}
                      onClick={() => setTopic(on ? "" : t)}
                      type="button"
                    >
                      {on && <motion.span className="absolute inset-0 rounded-full bg-signal" layoutId={`${id}-topic`} transition={POP} />}
                      <span className="relative">{t}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label className="mb-2 block font-medium text-sm" htmlFor={`${id}-message`}>
                Your message
              </label>
              <textarea
                className="block min-h-[112px] w-full resize-none rounded-2xl border border-rule bg-paper-2/60 px-4 py-3 text-base leading-relaxed outline-none transition-colors placeholder:text-ink-soft/70 focus:border-signal disabled:opacity-60"
                disabled={phase === "sending"}
                id={`${id}-message`}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (phase === "error") setPhase("idle");
                }}
                onKeyDown={onMessageKey}
                placeholder="Ask me anything, or tell me about your product and where it feels tangled…"
                ref={messageRef}
                required
                rows={4}
                value={message}
              />
            </div>

            <div>
              <label className="mb-2 flex items-baseline justify-between gap-3 font-medium text-sm" htmlFor={`${id}-contact`}>
                <span>
                  How can I reach you? <span className="font-normal text-ink-soft">Optional</span>
                </span>
              </label>
              <div
                className={cn(
                  "flex h-12 items-center gap-2 rounded-2xl border bg-paper-2/60 pr-3 pl-2 transition-colors focus-within:border-signal",
                  contactError ? "border-destructive" : "border-rule"
                )}
              >
                <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-xl bg-paper text-ink-soft">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      className={check.valid ? "text-signal" : undefined}
                      exit={{ scale: 0.4, rotate: 30, opacity: 0 }}
                      initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                      key={check.kind ?? "none"}
                      transition={POP}
                    >
                      <KindIcon className="size-4" strokeWidth={1.75} />
                    </motion.span>
                  </AnimatePresence>
                </span>
                <input
                  aria-describedby={`${id}-contact-help`}
                  aria-invalid={Boolean(contactError)}
                  autoComplete="email"
                  className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-soft/70 disabled:opacity-60"
                  disabled={phase === "sending"}
                  id={`${id}-contact`}
                  onBlur={() => setContactTouched(true)}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email, phone or @telegram"
                  value={contact}
                />
                <AnimatePresence initial={false}>
                  {check.valid && check.kind && (
                    <motion.span
                      animate={{ opacity: 1, x: 0 }}
                      className="shrink-0 rounded-full bg-blush px-2.5 py-1 font-mono text-[10px] text-signal uppercase tracking-[0.08em]"
                      exit={{ opacity: 0, x: 8 }}
                      initial={{ opacity: 0, x: 8 }}
                      transition={POP}
                    >
                      {KINDS[check.kind].label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className={cn("mt-2 text-sm", contactError ? "text-destructive" : "text-ink-soft")} id={`${id}-contact-help`}>
                {contactError ??
                  (check.suggestion ? (
                    <>
                      Did you mean{" "}
                      <button className="font-mono text-signal underline underline-offset-2" onClick={() => setContact(check.suggestion ?? contact)} type="button">
                        {check.suggestion}
                      </button>
                      ?
                    </>
                  ) : (
                    "Just asking something? Leave it empty. I only need it to reply."
                  ))}
              </p>
            </div>

            <AnimatePresence initial={false}>
              {phase === "error" && (
                <motion.p
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden text-destructive text-sm"
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  role="alert"
                >
                  That didn’t go through. Your text is still here: try again, or email{" "}
                  <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between gap-4 border-rule border-t pt-4">
              <span className="hidden text-ink-soft text-xs sm:inline">Ctrl / ⌘ + Enter to send</span>
              <motion.button
                aria-disabled={!ready}
                className={cn(
                  "group relative ml-auto inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 font-medium transition-colors duration-300",
                  ready ? "bg-ink text-paper" : "cursor-not-allowed bg-ink/10 text-ink-soft"
                )}
                disabled={phase === "sending"}
                type="submit"
                whileTap={ready ? { scale: 0.97 } : undefined}
              >
                {ready && (
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100"
                  />
                )}
                <span className="relative">{phase === "sending" ? "Sending…" : "Send message"}</span>
                <ArrowUpRight className="relative size-4 transition-transform duration-500 group-hover:rotate-45" />
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
