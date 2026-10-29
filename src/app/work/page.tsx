import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { ProjectCard } from "@/components/site/project-card";
import { caseStudies } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work · Sudabeh",
  description: "Case studies: Tamdid, Kudos, Atlas, Access, AzMan, Novin Host, Studio Kaaryar and Nan va Namak.",
};

export default function WorkPage() {
  const featured = caseStudies.filter((c) => c.featured);
  const more = caseStudies.filter((c) => !c.featured);

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
            Fintech, B2B SaaS, enterprise and operational tools. Three lead projects first, then the rest of the story.
          </p>
        </Reveal>

        <p className="eyebrow mb-6">Lead projects</p>
        <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2" stagger={0.1}>
          {featured.map((cs, i) => (
            <RevealItem className={cn(i === 0 && "md:col-span-2")} key={cs.slug}>
              <ProjectCard cs={cs} size={i === 0 ? "lg" : "md"} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-28 mb-8 flex flex-wrap items-end justify-between gap-4 border-rule border-t pt-10">
          <h2 className="font-display text-3xl sm:text-4xl">More projects</h2>
          <p className="max-w-sm text-ink-soft text-sm">An award winner, three products for AzMan, two redesigns, and the startup that changed my direction.</p>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {more.map((cs) => (
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
