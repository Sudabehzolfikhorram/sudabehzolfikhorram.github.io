import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb, MoreProjects, ScreensNote } from "@/components/case/blocks";
import { AtlasLayout } from "@/components/case/layouts/atlas";
import { BriefLayout } from "@/components/case/layouts/brief";
import { DuoLayout } from "@/components/case/layouts/duo";
import { EditorialLayout } from "@/components/case/layouts/editorial";
import { JourneyLayout } from "@/components/case/layouts/journey";
import { KaaryarLayout } from "@/components/case/layouts/kaaryar";
import { SplitLayout } from "@/components/case/layouts/split";
import { SystemLayout } from "@/components/case/layouts/system";
import { NovinLayout } from "@/components/case/novin/novin-layout";
import { type CaseStudy, caseStudies, getCaseStudy, type Layout } from "@/lib/case-studies";

// Each project gets its own page structure, chosen by `layout` in the data.
const layouts: Record<Layout, (p: { cs: CaseStudy }) => React.ReactNode> = {
  split: SplitLayout,
  duo: DuoLayout,
  journey: JourneyLayout,
  editorial: EditorialLayout,
  system: SystemLayout,
  novin: NovinLayout,
  brief: BriefLayout,
  kaaryar: KaaryarLayout,
  atlas: AtlasLayout,
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  return cs ? { title: `${cs.name} · Case study · Sudabeh`, description: cs.tagline } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const cs = getCaseStudy((await params).slug);
  if (!cs) notFound();
  const Body = layouts[cs.layout];
  return (
    <>
      <Breadcrumb cs={cs} />
      <Body cs={cs} />
      {/* Honest, but at the end: it shouldn't be the first thing anyone reads. */}
      {typeof cs.cover !== "object" && !cs.gallery && <ScreensNote />}
      <MoreProjects cs={cs} />
    </>
  );
}
