import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ContactHero } from "@/components/site/contact-hero";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Contact · Sudabeh" };

const fit = [
  "SaaS products whose flows and roles have outgrown the first design",
  "Data-heavy dashboards that need to be scanned, not studied",
  "Internal tools and B2B workflows teams live in all day",
  "Fintech and operational products with complex rules",
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="border-rule border-t">
        <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Elsewhere</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Find me online</h2>
            </div>
            <p className="max-w-sm text-ink-soft">Shots, updates and the long version of my story, wherever you prefer.</p>
          </Reveal>

          {/* Social tiles: a fill sweeps up on hover, the arrow turns to point out. */}
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {site.socials.map((s) => (
              <RevealItem key={s.href}>
                <a
                  className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden bg-paper p-7 transition-colors duration-300 hover:text-paper"
                  href={s.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                  <span className="relative flex items-start justify-between">
                    <span className="font-mono text-[0.75rem] uppercase tracking-[0.06em] opacity-70">{s.handle}</span>
                    <span aria-hidden className="text-2xl transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                  </span>
                  <span className="relative font-display text-4xl">{s.label}</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-rule border-t bg-paper-2/60">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-20 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">A good fit</p>
            <h2 className="mt-3 font-display text-4xl">What I’m best at</h2>
          </Reveal>
          <RevealGroup as="ul" className="divide-y divide-rule border-rule border-y lg:col-span-8">
            {fit.map((f, i) => (
              <RevealItem as="li" className="flex gap-4 py-5" key={f}>
                <span className="font-mono text-signal text-sm">0{i + 1}</span>
                <span>{f}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
