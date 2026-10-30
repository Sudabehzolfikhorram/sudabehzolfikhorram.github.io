import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { ProjectCard } from "@/components/site/project-card";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work · Sudabeh",
  description: "Case studies: Atlas, Tamdid, Kudos, Remeet, AzMan, Novin Host, Studio Kaaryar and Nan va Namak.",
};

export default function WorkPage() {
  // One lead project, then everything else at the same size, so the whole list is visible at a glance.
  const [lead, ...rest] = caseStudies;

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-4 pt-16 pb-24 sm:px-8">
        <Reveal className="grid gap-6 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Work</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
              Products I helped <em className="text-signal">make sense.</em>
            </h1>
          </div>
          <p className="max-w-md self-end text-ink-soft lg:col-span-4 lg:col-start-9">
            Enterprise AI, fintech, B2B SaaS and operational tools. The current lead project first, then every case study.
          </p>
        </Reveal>

        <p className="eyebrow mb-6">Lead project</p>
        <Reveal>
          <ProjectCard cs={lead} size="lg" />
        </Reveal>

        <Reveal className="mt-24 mb-8 flex flex-wrap items-end justify-between gap-4 border-rule border-t pt-10">
          <h2 className="font-display text-3xl sm:text-4xl">All projects</h2>
          <p className="max-w-sm text-ink-soft text-sm">Fintech, HR, an award winner, AzMan’s three products, two redesigns and the startup that changed my direction.</p>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {rest.map((cs) => (
            <RevealItem key={cs.slug}>
              <ProjectCard cs={cs} size="sm" />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <CtaBand />
    </>
  );
}
