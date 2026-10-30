import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { ProjectCard } from "@/components/site/project-card";
import { Proof } from "@/components/site/proof";
import { UntangleStory } from "@/components/site/untangle-story";
import { WhatIDo } from "@/components/site/what-i-do";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Home() {
  const featured = caseStudies.filter((c) => c.featured);

  return (
    <>
      <Hero />

      {/* The work comes first: it's what a recruiter came for. */}
      <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
              Three products, <em className="text-signal">untangled.</em>
            </h2>
          </div>
          <SlideTextButton
            animateIn={false}
            className="rounded-full border-ink/20 text-ink"
            href="/work"
            hoverText={`See all ${caseStudies.length} →`}
            text="All projects"
            variant="ghost"
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2" stagger={0.1}>
          {featured.map((cs, i) => (
            <RevealItem className={cn(i === 0 && "md:col-span-2")} key={cs.slug}>
              <ProjectCard cs={cs} size={i === 0 ? "lg" : "md"} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-rule border-t">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
          <Reveal className="mb-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">What I do</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
                The whole product, <em className="text-signal">not just its screens.</em>
              </h2>
            </div>
            <p className="max-w-md self-end text-ink-soft lg:col-span-4 lg:col-start-9">
              Fintech, B2B SaaS, ERP and enterprise AI: products with many roles, rules and edge cases.
            </p>
          </Reveal>
          <WhatIDo />
        </div>
      </section>

      <UntangleStory />

      <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
        <Reveal className="mb-10">
          <p className="eyebrow">By the numbers</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
            Proof, <em className="text-signal">not adjectives.</em>
          </h2>
        </Reveal>
        <Proof />
      </section>

      <section className="border-rule border-t">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-24 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">About</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
              Law degree, <em className="text-signal">designer’s habits.</em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="text-lg leading-relaxed">
              The same term I started my law degree, I started designing. A startup of our own that never launched
              turned a UI designer into a product designer.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Today I design Atlas at Algonet, an AI platform that reads how a company really works.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-10 items-center rounded-full bg-ink px-5 font-medium text-paper text-sm transition-colors hover:bg-signal hover:text-white"
                href="/about"
              >
                More about me →
              </Link>
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
        </div>
      </section>

      <CtaBand />
    </>
  );
}
