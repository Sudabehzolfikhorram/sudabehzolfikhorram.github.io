import { ArrowDownToLine } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { CareerStory } from "@/components/site/career-story";
import { CtaBand } from "@/components/site/cta-band";
import { MessageSheet } from "@/components/site/message-sheet";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About · Sudabeh",
  description:
    "Sudabeh Zolfi Khorram: product designer in Tehran, open to remote. A law graduate who designs fintech, B2B and enterprise AI products, with AI as a thinking partner.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 overflow-x-clip px-4 pt-16 pb-20 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
            Hi, I’m Sudabeh. <em className="text-signal">I make complicated things feel simple.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft leading-relaxed">
            Product designer in Tehran, open to remote. Law graduate by degree, untangler by habit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MessageSheet
              className="inline-flex h-10 items-center rounded-full bg-ink px-5 font-medium text-paper text-sm transition-colors hover:bg-signal hover:text-white"
              unstyled
            >
              Say hello →
            </MessageSheet>
            <a
              className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-5 font-medium text-sm transition-colors hover:border-signal hover:text-signal"
              download
              href={site.resume}
            >
              <ArrowDownToLine className="size-4" />
              Download CV
            </a>
          </div>
        </Reveal>

        <Reveal className="relative lg:col-span-5 lg:col-start-8" delay={0.15}>
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-glow/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-rule">
            <Image
              alt="Sudabeh Zolfi Khorram, smiling, sitting at a desk"
              className="h-auto w-full grayscale"
              height={596}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              src={`${BASE}/about/sudabeh.webp`}
              width={688}
            />
          </div>
          <div className="absolute -bottom-5 left-5 rounded-2xl border border-rule bg-paper px-4 py-3 shadow-lg sm:left-8">
            <p className="font-mono text-[11px] text-ink-soft uppercase tracking-wider">Now</p>
            <p className="font-medium text-sm">Designing Atlas at Algonet</p>
          </div>
        </Reveal>
      </section>

      <section className="border-rule border-y bg-paper-2/40">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-24 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <p className="eyebrow">The story so far</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
              A tangled start, <em className="text-signal">a clear direction.</em>
            </h2>
            <p className="mt-4 max-w-sm text-ink-soft">Eight chapters, from a law classroom to an AI that reads how companies work.</p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <CareerStory />
            {/* Side work, kept as a footnote so it doesn't compete with the main craft. */}
            <p className="mt-14 border-rule border-t pt-6 text-ink-soft text-sm leading-relaxed">
              <span className="text-signal">*</span> Out of curiosity I also design brands: Algonet’s visual identity,
              its logo, pattern and brochure among them. Product design stays the main craft.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
