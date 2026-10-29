import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { stats } from "@/lib/content";

// From the resume's highlights.
const highlights = [
  "B2B and B2C products, fintech, operational tools and complex systems",
  "End-to-end: flows and UI through design systems and developer handoff",
  "AI-assisted workflow: faster exploration, same human judgment",
];

export function Stats() {
  return (
    <section className="border-rule border-y bg-paper-2/60">
      <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">02 — By the numbers</p>
            <h2 className="mt-4 font-display text-5xl leading-[1.02]">
              Four years of making <em className="text-signal">complex things clear.</em>
            </h2>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-3">
          {stats.map((s) => (
            <RevealItem className="bg-paper p-8" key={s.label}>
              <p className="font-display text-7xl leading-none tabular-nums">
                {s.value}
                <span className="ml-1 align-top font-mono text-lg text-signal">{s.suffix}</span>
              </p>
              <p className="eyebrow mt-6">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup as="ul" className="mt-10 grid gap-6 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <RevealItem as="li" className="flex gap-4" key={h}>
              <span className="font-mono text-signal text-sm">0{i + 1}</span>
              <span className="leading-relaxed">{h}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
