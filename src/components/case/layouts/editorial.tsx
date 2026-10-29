// AzMan: three products, told as a long-form article with one chapter per
// product. Reading column, chapter rail, figures that break out of the column.
import ScrollIndex from "@/components/kokonutui/scroll-index";
import { Reveal } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { CaseTitle, Facts, Figure, periodLabel, wrap } from "../blocks";
import { Screen, type ScreenId } from "../mockups";

const Chapter = ({ kicker, title, children }: { kicker?: string; title: string; children: React.ReactNode }) => (
  <section className="mt-20 first:mt-0">
    {kicker && <p className="eyebrow mb-2 text-signal">{kicker}</p>}
    <h2 className="font-display text-4xl leading-tight">{title}</h2>
    <div className="mt-6 space-y-5 text-[1.075rem] text-ink/90 leading-[1.8]">{children}</div>
  </section>
);

export function EditorialLayout({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <header className={cn(wrap, "pt-12 pb-14")}>
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-ink border-y py-3">
            <span className="eyebrow !text-ink">Case study</span>
            <span className="eyebrow">{cs.category}</span>
            <span className="eyebrow sm:ml-auto">{periodLabel(cs)} · {cs.status}</span>
          </div>
          <CaseTitle className="mt-10" cs={cs} size="xl" />
          <p className="mt-8 max-w-4xl font-display text-3xl leading-snug sm:text-[2.6rem]">{cs.tagline}</p>
          <p className="mt-8 font-mono text-[0.8rem] text-ink-soft">
            By Sudabeh · {cs.meta.role} · {cs.meta.engagement} · {cs.meta.platform}
          </p>
        </Reveal>
      </header>

      <Reveal className="px-4 sm:px-8">
        <figure className="mx-auto max-w-[1400px]">
          <Screen hue={cs.hue} id={cs.cover as ScreenId} />
          <figcaption className="mx-auto mt-4 max-w-[1240px] text-ink-soft text-sm">Fig. 1 · {cs.screens[0].caption}</figcaption>
        </figure>
      </Reveal>

      <div className={cn(wrap, "py-24")}>
        <ScrollIndex scroller="window" selector="h2">
          <article className="mx-auto max-w-[680px]">
            <Chapter title="The brief">
              <p className="first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:text-signal first-letter:leading-[0.8]">
                {cs.summary}
              </p>
              <p>{cs.context}</p>
              <aside className="rounded-xl border border-rule bg-paper-2/70 p-6 text-[0.95rem] leading-relaxed">
                <p className="eyebrow mb-3">Scope</p>
                <ol className="list-decimal space-y-1 pl-5">
                  {cs.scope.map((g) => <li key={g}>{g}</li>)}
                </ol>
              </aside>
            </Chapter>

            {cs.products?.map((p, i) => (
              <div key={p.name}>
                <Chapter kicker={`Product ${i + 1} of ${cs.products?.length}`} title={p.name}>
                  <p>{p.body}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {p.points.map((pt) => (
                      <li className="rounded-full border border-ink/15 px-3 py-1 text-[0.85rem] leading-normal" key={pt}>{pt}</li>
                    ))}
                  </ul>
                </Chapter>
                {/* Figures break out of the reading column. */}
                <div className="my-14 lg:-mx-40">
                  <Figure cs={cs} id={p.screen} />
                </div>
              </div>
            ))}

            <Chapter title="Across all three">
              {cs.highlights.map((h) => (
                <p key={h.title}>
                  <strong className="font-semibold">{h.title}.</strong> {h.body}
                </p>
              ))}
            </Chapter>

            <Chapter title="Where it stands">
              <p>The work is ongoing. Here’s the shape of it so far.</p>
            </Chapter>
            <div className="mt-8 lg:-mx-20">
              <Facts cs={cs} />
            </div>
          </article>
        </ScrollIndex>
      </div>
    </>
  );
}
