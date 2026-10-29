"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import CradleText from "@/components/kokonutui/cradle-text";
import DotField from "@/components/kokonutui/dot-field";
import TypewriterTitle from "@/components/kokonutui/type-writer";
import { site } from "@/lib/content";
import { MessagePopover } from "./message-popover";

const helpWith = [
  { text: "a SaaS dashboard.", deleteAfter: true },
  { text: "an internal tool.", deleteAfter: true },
  { text: "a fintech app.", deleteAfter: true },
  { text: "a design system.", deleteAfter: true },
  { text: "a website redesign.", deleteAfter: true },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="group inline-flex h-11 items-center gap-3 rounded-full border border-ink/15 bg-paper/80 px-5 text-sm backdrop-blur transition-colors hover:border-signal"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${site.email}`;
        }
      }}
      type="button"
    >
      <span className="font-mono">{site.email}</span>
      <span className="relative grid h-5 w-14 place-items-center overflow-hidden rounded-full bg-ink text-[11px] text-paper">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            initial={{ y: 14, opacity: 0 }}
            key={copied ? "c" : "n"}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
          >
            {copied ? "Copied ✓" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

export function ContactHero() {
  return (
    <DotField
      className="min-h-[calc(100svh-4rem)] bg-transparent text-signal dark:bg-transparent dark:text-signal"
      seed={11}
      spacing={14}
    >
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4 py-20 text-center text-ink">
        <p className="eyebrow">Contact · {site.location}</p>
        <div className="w-full font-display">
          <CradleText bounce={0.93} text="Let’s talk" />
        </div>
        <p className="eyebrow -mt-2 mb-8">Knock a letter ↔</p>

        <div className="flex w-full flex-col items-center font-display text-2xl sm:text-4xl">
          <span>I can help with</span>
          <TypewriterTitle
            // Its own line: the component is a size container, so it can't sit inline.
            className="font-display text-signal dark:text-signal"
            textClassName="!text-3xl sm:!text-5xl"
            deleteMode="select"
            sequences={helpWith}
            typos
          />
        </div>

        <div className="mt-12 flex min-h-[200px] flex-col items-center gap-4 sm:flex-row sm:items-start">
          <MessagePopover align="start" />
          <CopyEmail />
        </div>
      </div>
    </DotField>
  );
}
