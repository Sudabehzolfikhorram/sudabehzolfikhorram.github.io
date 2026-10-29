"use client";

import { ArrowUpRight, AtSign, Mail, Phone, Send } from "lucide-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { EASE_OUT } from "@/components/motion/reveal";
import { type ContactKind, checkContact, MIN_LENGTH, sendMessage } from "@/lib/contact";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

type Phase = "idle" | "sending" | "sent" | "error";

// The same snappy spring as the copy pill, so small swaps feel related.
const POP: Transition = { type: "spring", stiffness: 500, damping: 32 };
const MORPH: Transition = { type: "spring", duration: 0.5, bounce: 0.15 };

const KINDS: Record<ContactKind, { label: string; Icon: typeof Mail }> = {
  email: { label: "Email", Icon: Mail },
  phone: { label: "Phone", Icon: Phone },
  telegram: { label: "Telegram", Icon: Send },
};

const noop = () => () => {};
const useShortcut = () =>
  useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "Ctrl"
  );

/** Fills as the message reaches its minimum length, then turns into a tick. */
function LengthRing({ length }: { length: number }) {
  const done = length >= MIN_LENGTH;
  return (
    <span className="flex items-center gap-2 font-mono text-[11px] text-ink-soft uppercase tracking-[0.06em]">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          initial={{ y: 10, opacity: 0 }}
          key={done ? "ready" : "count"}
          transition={POP}
        >
          {done ? "Ready" : `${length}/${MIN_LENGTH}`}
        </motion.span>
      </AnimatePresence>
      <svg aria-hidden className="size-6 -rotate-90" viewBox="0 0 24 24">
        <circle className="stroke-rule" cx="12" cy="12" fill="none" r="10" strokeWidth="2" />
        <motion.circle
          animate={{ pathLength: Math.min(length / MIN_LENGTH, 1) }}
          className="stroke-signal"
          cx="12"
          cy="12"
          fill={done ? "var(--signal)" : "none"}
          initial={false}
          r="10"
          strokeLinecap="round"
          strokeWidth="2"
          transition={POP}
        />
        <AnimatePresence>
          {done ? (
            <motion.path
              animate={{ pathLength: 1 }}
              className="rotate-90 stroke-paper"
              d="M7.5 12.5 10.5 15.5 16.5 9"
              exit={{ opacity: 0 }}
              fill="none"
              initial={{ pathLength: 0 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              style={{ transformOrigin: "12px 12px" }}
              transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.1 }}
            />
          ) : null}
        </AnimatePresence>
      </svg>
    </span>
  );
}

/**
 * The contact page's message box: write first, then say how to reply.
 * Sits in the page flow, so opening and sending grow the hero instead of
 * floating over it.
 */
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
  const shortcut = useShortcut();
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [contactTouched, setContactTouched] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [sentTo, setSentTo] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const length = message.trim().length;
  const check = checkContact(contact);
  const { kind } = check;
  const ready = length >= MIN_LENGTH && check.valid;
  // Judged once the visitor leaves the field (or tries to send), not mid-typing.
  const contactError =
    contactTouched && !check.valid
      ? (check.error ?? "Add how I can reach you: email, phone or Telegram.")
      : undefined;
  const KindIcon = kind ? KINDS[kind].Icon : AtSign;

  useEffect(() => {
    if (autoFocus) {
      // After the sheet's slide-in, so the keyboard doesn't fight the animation.
      const t = window.setTimeout(() => textRef.current?.focus({ preventScroll: true }), 350);
      return () => window.clearTimeout(t);
    }
  }, [autoFocus]);

  // The textarea grows with the message instead of scrolling inside itself.
  useLayoutEffect(() => {
    const el = textRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [message]);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (phase === "sending") {
      return;
    }
    if (!ready) {
      setContactTouched(true);
      return;
    }
    setPhase("sending");
    try {
      await sendMessage(message.trim(), contact.trim());
      setSentTo(check.value);
      setMessage("");
      setContact("");
      setContactTouched(false);
      setPhase("sent");
    } catch {
      setPhase("error");
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
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
          : "rounded-[28px] border border-rule bg-paper/85 shadow-[0_40px_90px_-50px_rgba(23,20,15,0.55)] backdrop-blur-md",
        className
      )}
      initial={bare ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      layout
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35, layout: MORPH }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {phase === "sent" ? (
          <motion.div
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            className="flex flex-col items-center px-8 py-12 text-center"
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            key="sent"
            role="status"
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <svg aria-hidden className="size-14 text-signal" fill="none" viewBox="0 0 56 56">
              <motion.circle
                animate={{ scale: 1, opacity: 0.14 }}
                cx="28"
                cy="28"
                fill="currentColor"
                initial={{ scale: 0.4, opacity: 0 }}
                r="28"
                style={{ transformOrigin: "28px 28px" }}
                transition={POP}
              />
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
            <h3 className="mt-6 font-display text-4xl">Message sent</h3>
            <p className="mt-3 max-w-sm text-ink-soft">
              Thank you! I’ll get back to you at <span className="font-mono text-ink">{sentTo}</span>.
            </p>
            <button
              className="mt-8 h-11 rounded-full border border-ink/15 px-5 text-sm transition-colors hover:border-signal hover:text-signal"
              onClick={() => {
                setPhase("idle");
                requestAnimationFrame(() => textRef.current?.focus());
              }}
              type="button"
            >
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            animate={{ opacity: 1 }}
            aria-label="Write me a message"
            exit={{ opacity: 0, filter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            key="form"
            noValidate
            onSubmit={submit}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <div className="flex items-center justify-between gap-4 px-6 pt-5">
              <span className="eyebrow">To · {site.shortName}</span>
              <LengthRing length={length} />
            </div>

            <label className="sr-only" htmlFor={`${id}-message`}>
              Your message, at least {MIN_LENGTH} characters
            </label>
            <textarea
              className="block max-h-[320px] min-h-[136px] w-full resize-none bg-transparent px-6 pt-3 pb-4 font-display text-xl leading-snug outline-none placeholder:text-ink-soft/60 disabled:opacity-60 sm:text-2xl"
              disabled={phase === "sending"}
              id={`${id}-message`}
              onChange={(e) => {
                setMessage(e.target.value);
                if (phase === "error") {
                  setPhase("idle");
                }
              }}
              onKeyDown={onKeyDown}
              placeholder="Tell me about your product and where it feels tangled…"
              ref={textRef}
              rows={3}
              value={message}
            />

            <div className="px-3 pb-3 sm:px-4">
              <div
                className={cn(
                  "flex h-14 items-center gap-3 rounded-2xl border bg-paper-2/70 pr-3 pl-2 transition-colors duration-300 focus-within:border-signal",
                  contactError ? "border-destructive" : "border-rule"
                )}
              >
                <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-paper text-ink-soft">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      className={kind ? "text-signal" : undefined}
                      exit={{ scale: 0.4, rotate: 30, opacity: 0 }}
                      initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                      key={kind ?? "none"}
                      transition={POP}
                    >
                      <KindIcon className="size-[18px]" strokeWidth={1.75} />
                    </motion.span>
                  </AnimatePresence>
                </span>
                <label className="sr-only" htmlFor={`${id}-contact`}>
                  How can I reach you? Email, phone or Telegram ID
                </label>
                <input
                  aria-describedby={contactError ? `${id}-contact-error` : undefined}
                  aria-invalid={Boolean(contactError)}
                  autoComplete="email"
                  className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-soft/70 disabled:opacity-60"
                  disabled={phase === "sending"}
                  id={`${id}-contact`}
                  onBlur={() => setContactTouched(contact.trim() !== "")}
                  onChange={(e) => setContact(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Email, phone or Telegram ID"
                  value={contact}
                />
                <AnimatePresence initial={false}>
                  {kind && check.valid ? (
                    <motion.span
                      animate={{ opacity: 1, x: 0 }}
                      className="shrink-0 rounded-full bg-blush px-2.5 py-1 font-mono text-[10px] text-signal uppercase tracking-[0.08em]"
                      exit={{ opacity: 0, x: 8 }}
                      initial={{ opacity: 0, x: 8 }}
                      key={kind}
                      transition={POP}
                    >
                      {KINDS[kind].label}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
              <AnimatePresence initial={false}>
                {contactError || check.suggestion ? (
                  <motion.p
                    animate={{ height: "auto", opacity: 1 }}
                    className={cn("overflow-hidden px-2 text-sm", contactError ? "text-destructive" : "text-ink-soft")}
                    exit={{ height: 0, opacity: 0 }}
                    id={`${id}-contact-error`}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <span className="block pt-2">
                      {contactError ?? (
                        <>
                          Did you mean{" "}
                          <button
                            className="font-mono text-signal underline underline-offset-2"
                            onClick={() => setContact(check.suggestion ?? contact)}
                            type="button"
                          >
                            {check.suggestion}
                          </button>
                          ?
                        </>
                      )}
                    </span>
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 border-rule border-t bg-paper-2/40 px-6 py-4">
              <AnimatePresence initial={false} mode="popLayout">
                {phase === "error" ? (
                  <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-sm"
                    initial={{ opacity: 0, y: 6 }}
                    key="error"
                    role="alert"
                    transition={POP}
                  >
                    Couldn’t send it. Try again, or email{" "}
                    <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </motion.p>
                ) : (
                  <motion.span
                    animate={{ opacity: 1 }}
                    className="hidden items-center gap-1 text-ink-soft text-xs sm:flex"
                    initial={{ opacity: 0 }}
                    key="hint"
                  >
                    <kbd className="rounded border border-rule bg-paper px-1.5 font-sans text-[11px]">{shortcut}</kbd>
                    <kbd className="rounded border border-rule bg-paper px-1.5 font-sans text-[11px]">↵</kbd>
                    <span className="ml-1">to send</span>
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.button
                aria-disabled={!ready}
                className={cn(
                  "group relative ml-auto inline-flex h-12 shrink-0 items-center gap-2 overflow-hidden rounded-full px-6 font-medium transition-colors duration-300",
                  ready ? "bg-ink text-paper" : "cursor-not-allowed bg-ink/10 text-ink-soft"
                )}
                disabled={phase === "sending"}
                type="submit"
                whileTap={ready ? { scale: 0.97 } : undefined}
              >
                {/* Signal fill sweeps up on hover, like the social tiles below. */}
                {ready ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100"
                  />
                ) : null}
                <span className="relative">{phase === "sending" ? "Sending…" : "Send message"}</span>
                <motion.span
                  animate={phase === "sending" ? { x: 24, y: -24, opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
                  className="relative transition-transform duration-500 group-hover:rotate-45"
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <ArrowUpRight className="size-4" />
                </motion.span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
