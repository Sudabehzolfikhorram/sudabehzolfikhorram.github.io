import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { process } from "@/lib/content";

export function ProcessSteps() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow">05 — Process</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight">
            From problem to <em className="text-signal">product experience.</em>
          </h2>
        </div>
        <p className="max-w-md self-end text-ink-soft lg:col-span-5 lg:col-start-8">
          I don’t follow one fixed process for every project. I adapt to the product stage, team,
          timeline and what we know, but always move from complexity toward clarity.
        </p>
      </div>

      <RevealGroup as="ol" className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {process.map((step, i) => (
          <RevealItem as="li" className="border-ink border-t pt-5 pb-12" key={step.title}>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-signal text-sm">{String(i + 1).padStart(2, "0")}</span>
              <span className="eyebrow">{step.short}</span>
            </div>
            <h3 className="mt-6 font-display text-3xl leading-tight">{step.title}</h3>
            <p className="mt-3 text-ink-soft leading-relaxed">{step.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
