"use client";

import CradleText from "@/components/kokonutui/cradle-text";
import DotField from "@/components/kokonutui/dot-field";
import TypewriterTitle from "@/components/kokonutui/type-writer";
import { site } from "@/lib/content";
import { ContactComposer } from "./contact-composer";

const helpWith = [
  { text: "a SaaS dashboard.", deleteAfter: true },
  { text: "an internal tool.", deleteAfter: true },
  { text: "a fintech app.", deleteAfter: true },
  { text: "a design system.", deleteAfter: true },
  { text: "a website redesign.", deleteAfter: true },
];

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

        <ContactComposer className="mt-12" />
      </div>
    </DotField>
  );
}
