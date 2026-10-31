import { Reveal } from "@/components/motion/reveal";
import { MessageSheet } from "./message-sheet";

export function CtaBand() {
  return (
    // Ink in light mode; a raised navy panel in dark mode instead of an inverted, light one.
    <section className="relative overflow-hidden bg-ink text-paper dark:border-rule dark:border-t dark:bg-paper-2 dark:text-ink">
      <div aria-hidden className="pointer-events-none absolute -right-72 -bottom-96 size-[820px] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--glow)_34%,transparent),transparent)]" />
      <Reveal className="relative mx-auto flex max-w-[1240px] flex-col items-start gap-12 px-4 py-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow !text-paper/60 dark:!text-ink-soft">Available for select projects</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02]">
            Have a tangled product? <em className="text-[#a596ff]">Let’s straighten it out.</em>
          </h2>
        </div>
        <MessageSheet className="shrink-0" />
      </Reveal>
    </section>
  );
}
