import CardFlip from "@/components/kokonutui/card-flip";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { capabilities } from "@/lib/content";

export function Capabilities() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">03 — Capabilities</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight">
            Support for products that got <em className="text-signal">complicated.</em>
          </h2>
        </div>
        <p className="max-w-md self-end text-ink-soft lg:col-span-5 lg:col-start-8">
          From early structure and user flows to polished interfaces and scalable design systems.
          Flip a card (drag, flick or click) for the detail.
        </p>
      </div>

      <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
        {capabilities.map((c, i) => (
          <RevealItem className="flex justify-center" key={c.title}>
            <CardFlip
              back={
                <div className="flex h-full flex-col justify-between p-7">
                  <span className="eyebrow">{c.tag}</span>
                  <p className="font-display text-[1.7rem] leading-snug">{c.body}</p>
                  <span className="eyebrow text-signal">0{i + 1}</span>
                </div>
              }
              className="aspect-[4/5] w-full max-w-[360px]"
              faceClassName="rounded-xl border-rule bg-paper text-ink dark:border-rule dark:bg-paper-2 dark:text-ink"
              front={
                <div className="flex h-full flex-col justify-between p-7">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">0{i + 1} / {c.tag}</span>
                    <span aria-hidden className="eyebrow">↻ flip</span>
                  </div>
                  <h3 className="font-display text-5xl leading-[1.02] tracking-tight">{c.title}</h3>
                </div>
              }
              label={c.title}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
