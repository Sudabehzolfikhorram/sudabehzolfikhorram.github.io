"use client";

import { ArrowUp, AtSign, Mail, Phone, Send } from "lucide-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import Image from "next/image";
import { type FormEvent, type KeyboardEvent, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/components/motion/reveal";
import { type ContactKind, checkContact, sendMessage } from "@/lib/contact";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The contact form as a short chat: Sudabeh says hello, the visitor writes,
 * she asks how to reach them, and the message is sent. Two questions, one at
 * a time, so it never feels like a form.
 */

type Step = "message" | "contact" | "sending" | "sent";
type Bubble = { id: number; from: "bot" | "me"; text: string; error?: boolean };

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const POP: Transition = { type: "spring", stiffness: 520, damping: 34 };
const TYPING_MS = 650;

const KINDS: Record<ContactKind, { label: string; Icon: typeof Mail }> = {
  email: { label: "Email", Icon: Mail },
  phone: { label: "Phone", Icon: Phone },
  telegram: { label: "Telegram", Icon: Send },
};

const GREETING = "Hi, I’m Sudabeh 👋 What are you working on? Tell me as much or as little as you like.";
const ASK_CONTACT = "Thanks! How can I reach you? An email, a phone number or a Telegram username all work.";
const STARTERS = ["I’m hiring a product designer", "I have a product to untangle", "Just saying hi 👋"];

function Typing() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      aria-label="Sudabeh is typing"
      className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-paper-2 px-4 py-3"
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      initial={{ opacity: 0, y: 6 }}
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          className="size-1.5 rounded-full bg-ink-soft"
          key={i}
          transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

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
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(true);
  const [step, setStep] = useState<Step>("message");
  const [input, setInput] = useState("");
  const [draft, setDraft] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const say = useCallback((from: Bubble["from"], text: string, error?: boolean) => {
    nextId.current += 1;
    const bubble = { id: nextId.current, from, text, error };
    setBubbles((b) => [...b, bubble]);
  }, []);

  // Sudabeh "types" before each reply, like a person would.
  const reply = useCallback(
    (text: string, error?: boolean) =>
      new Promise<void>((resolve) => {
        setTyping(true);
        window.setTimeout(() => {
          setTyping(false);
          say("bot", text, error);
          resolve();
        }, TYPING_MS);
      }),
    [say]
  );

  useEffect(() => {
    const t = window.setTimeout(() => {
      setTyping(false);
      say("bot", GREETING);
    }, TYPING_MS);
    return () => window.clearTimeout(t);
  }, [say]);

  useEffect(() => {
    if (!autoFocus) return;
    // After a sheet's slide-in, so the keyboard doesn't fight the animation.
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
    return () => window.clearTimeout(t);
  }, [autoFocus]);

  // Keep the newest bubble in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && bubbles.length + Number(typing) > 0) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [bubbles, typing]);

  // The message box grows with its text, up to a point.
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  }, [input, step]);

  const check = checkContact(input);
  const contactError = step === "contact" && touched && input.trim() !== "" && !check.valid ? check.error : undefined;
  const canSend =
    !typing && (step === "message" ? input.trim() !== "" : step === "contact" ? check.valid : false);
  const KindIcon = check.kind ? KINDS[check.kind].Icon : AtSign;

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (step === "contact" && !check.valid) {
      setTouched(true);
      return;
    }
    if (!canSend) return;

    if (step === "message") {
      const text = input.trim();
      say("me", text);
      setDraft(text);
      setInput("");
      setStep("contact");
      await reply(ASK_CONTACT);
      inputRef.current?.focus({ preventScroll: true });
      return;
    }

    const contact = check.value;
    say("me", contact);
    setInput("");
    setTouched(false);
    setStep("sending");
    setTyping(true);
    try {
      await sendMessage(draft, contact);
      await reply(`Got it. I’ll get back to you at ${contact}. Talk soon!`);
      setStep("sent");
    } catch {
      await reply(`Hmm, that didn’t go through. Press send to try again, or email me at ${site.email}.`, true);
      setInput(contact);
      setStep("contact");
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Chat convention: Enter sends, Shift+Enter makes a new line.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  const restart = () => {
    setBubbles([]);
    setDraft("");
    setStep("message");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      say("bot", "Anything else? I’m listening.");
      inputRef.current?.focus({ preventScroll: true });
    }, TYPING_MS);
  };

  const editMessage = () => {
    // Drop the question and the visitor's message, and put the text back.
    setBubbles((b) => b.slice(0, -2));
    setInput(draft);
    setStep("message");
    setTouched(false);
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      className={cn(
        "relative flex w-full max-w-[600px] flex-col overflow-hidden text-left text-ink",
        bare
          ? "rounded-2xl"
          : "rounded-[28px] border border-rule bg-paper/90 shadow-[0_40px_90px_-50px_rgba(40,30,120,0.55)] backdrop-blur-md",
        className
      )}
      initial={bare ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
    >
      <div className="flex items-center gap-3 border-rule border-b px-5 py-4">
        <span className="relative size-10 shrink-0">
          <Image alt="" className="rounded-full object-cover grayscale" fill sizes="40px" src={`${BASE}/about/sudabeh.webp`} />
          <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-paper bg-signal" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold leading-tight">{site.name}</p>
          <p className="truncate text-ink-soft text-xs">Product designer · replies personally</p>
        </div>
      </div>

      <div
        aria-live="polite"
        className="flex max-h-[380px] min-h-[220px] flex-col gap-2.5 overflow-y-auto overscroll-contain px-5 py-5"
        ref={scrollRef}
      >
        <AnimatePresence initial={false}>
          {bubbles.map((b) => (
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 leading-relaxed",
                b.from === "me"
                  ? "self-end rounded-br-md bg-signal text-white"
                  : b.error
                    ? "rounded-bl-md bg-destructive/10 text-destructive"
                    : "rounded-bl-md bg-paper-2"
              )}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              key={b.id}
              style={{ originX: b.from === "me" ? 1 : 0, originY: 1 }}
              transition={POP}
            >
              {b.text}
            </motion.div>
          ))}
          {typing && <Typing key="typing" />}
        </AnimatePresence>

        {step === "message" && bubbles.length === 1 && !typing && input === "" && (
          <motion.div
            animate={{ opacity: 1 }}
            className="mt-1 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {STARTERS.map((s) => (
              <button
                className="rounded-full border border-rule px-3 py-1.5 text-sm transition-colors hover:border-signal hover:text-signal"
                key={s}
                onClick={() => {
                  setInput(s);
                  inputRef.current?.focus({ preventScroll: true });
                }}
                type="button"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}

        {step === "contact" && !typing && (
          <button className="self-end text-ink-soft text-xs underline-offset-2 hover:text-signal hover:underline" onClick={editMessage} type="button">
            Edit my message
          </button>
        )}
      </div>

      {step === "sent" ? (
        <div className="border-rule border-t px-5 py-4">
          <button
            className="h-11 w-full rounded-full border border-ink/15 text-sm transition-colors hover:border-signal hover:text-signal"
            onClick={restart}
            type="button"
          >
            Write another message
          </button>
        </div>
      ) : (
        <form className="border-rule border-t px-3 pt-3 pb-3 sm:px-4" noValidate onSubmit={submit}>
          <div
            className={cn(
              "flex items-end gap-2 rounded-3xl border bg-paper-2/60 py-1.5 pr-1.5 pl-3 transition-colors focus-within:border-signal",
              contactError ? "border-destructive" : "border-rule"
            )}
          >
            {step !== "message" && (
              <span className="mb-1.5 grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-paper text-ink-soft">
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
            )}
            <label className="sr-only" htmlFor={`${id}-input`}>
              {step === "message" ? "Your message" : "Your email, phone or Telegram username"}
            </label>
            <textarea
              aria-describedby={contactError ? `${id}-error` : undefined}
              aria-invalid={Boolean(contactError)}
              autoComplete={step === "message" ? "off" : "email"}
              className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-base leading-snug outline-none placeholder:text-ink-soft/70 disabled:opacity-60"
              disabled={step === "sending"}
              id={`${id}-input`}
              onBlur={() => setTouched(true)}
              onChange={(e) => {
                setInput(e.target.value);
                if (step === "contact") setTouched(false);
              }}
              onKeyDown={onKeyDown}
              placeholder={step === "message" ? "Write your message…" : "Email, phone or @telegram"}
              ref={inputRef}
              rows={1}
              value={input}
            />
            <AnimatePresence initial={false}>
              {step === "contact" && check.valid && check.kind && (
                <motion.span
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-3 hidden shrink-0 rounded-full bg-blush px-2.5 py-1 font-mono text-[10px] text-signal uppercase tracking-[0.08em] sm:inline"
                  exit={{ opacity: 0, x: 8 }}
                  initial={{ opacity: 0, x: 8 }}
                  transition={POP}
                >
                  {KINDS[check.kind].label}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.button
              aria-label="Send"
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-300",
                canSend ? "bg-signal text-white" : "bg-ink/10 text-ink-soft"
              )}
              disabled={step === "sending"}
              type="submit"
              whileTap={canSend ? { scale: 0.9 } : undefined}
            >
              <ArrowUp className="size-5" />
            </motion.button>
          </div>
          <AnimatePresence initial={false}>
            {(contactError || check.suggestion) && step === "contact" && (
              <motion.p
                animate={{ height: "auto", opacity: 1 }}
                className={cn("overflow-hidden px-3 text-sm", contactError ? "text-destructive" : "text-ink-soft")}
                exit={{ height: 0, opacity: 0 }}
                id={`${id}-error`}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <span className="block pt-2">
                  {contactError ?? (
                    <>
                      Did you mean{" "}
                      <button
                        className="font-mono text-signal underline underline-offset-2"
                        onClick={() => setInput(check.suggestion ?? input)}
                        type="button"
                      >
                        {check.suggestion}
                      </button>
                      ?
                    </>
                  )}
                </span>
              </motion.p>
            )}
          </AnimatePresence>
          <p className="hidden px-3 pt-2 text-[11px] text-ink-soft sm:block">Enter to send · Shift + Enter for a new line</p>
        </form>
      )}
    </motion.div>
  );
}
