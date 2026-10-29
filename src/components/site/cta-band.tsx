import { Reveal } from "@/components/motion/reveal";
import { MessagePopover } from "./message-popover";

export function CtaBand() {
  return (
    <section className="bg-ink text-paper">
      <Reveal className="mx-auto flex max-w-[1240px] flex-col items-start gap-12 px-4 py-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow !text-paper/60">Available for select projects</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.02]">
            Have a tangled product? <em className="text-signal">Let’s straighten it out.</em>
          </h2>
        </div>
        {/* Reserve the open panel's height so it never covers the heading. */}
        <div className="lg:min-h-[220px] lg:self-end">
          <MessagePopover />
        </div>
      </Reveal>
    </section>
  );
}
