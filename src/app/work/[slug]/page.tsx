import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb, MoreProjects, ScreensNote } from "@/components/case/blocks";
import { BriefLayout } from "@/components/case/layouts/brief";
import { DuoLayout } from "@/components/case/layouts/duo";
import { EditorialLayout } from "@/components/case/layouts/editorial";
import { JourneyLayout } from "@/components/case/layouts/journey";
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
      {typeof cs.cover !== "object" && <ScreensNote />}
      <Body cs={cs} />
      <MoreProjects cs={cs} />
    </>
  );
}
