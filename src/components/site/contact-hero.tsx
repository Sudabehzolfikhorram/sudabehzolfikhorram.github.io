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
      // Dots at half strength so they texture the page without competing with the chat.
      className="min-h-[calc(100svh-4rem)] bg-transparent text-signal/45 dark:bg-transparent dark:text-signal/35"
      seed={11}
      spacing={16}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-12 px-4 py-16 text-ink sm:px-8 lg:grid-cols-12">
        <div className="text-center lg:col-span-6 lg:text-left">
          <p className="eyebrow">Contact · {site.location}</p>
          <div className="w-full max-w-md font-display max-lg:mx-auto">
            <CradleText bounce={0.93} text="Let’s talk" />
          </div>
          <p className="eyebrow -mt-2 mb-8">Knock a letter ↔</p>
          <div className="flex w-full flex-col items-center font-display text-2xl sm:text-3xl lg:items-start">
            <span>I can help with</span>
            <TypewriterTitle
              // Its own line: the component is a size container, so it can't sit inline.
              className="font-display text-signal dark:text-signal"
              textClassName="!text-3xl sm:!text-4xl"
              deleteMode="select"
              sequences={helpWith}
              typos
            />
          </div>
        </div>

        <ContactComposer className="justify-self-center lg:col-span-6 lg:justify-self-end" />
      </div>
    </DotField>
  );
}
