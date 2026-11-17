// Sarmayeh-Gozin (investment advisor) for Algonet: a before/after case study.
// Built from the project record only (brief, ~27 feedback rounds, the repo and
// the source HTML demo). All projects, amounts and returns on the screens are
// sample data, and contact details are blurred.

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { wrap } from "../blocks";
import { BeforeAfter, type PageTab, PageSwitcher, TwinScroll } from "../novin/interactive";
import { ReadingProgress } from "../novin/reading-progress";

const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work/advisor`;
const TEAL = "#00ADAB";
const TEAL_TEXT = "#007A78";
const BLUE = "#1E40AF";

const Chapter = ({ n, label, title, children, dark }: { n: string; label: string; title: React.ReactNode; children?: React.ReactNode; dark?: boolean }) => (
  <Reveal className="grid gap-6 lg:grid-cols-12">
    <div className="lg:col-span-7">
      <p className={cn("font-mono text-[0.78rem] uppercase tracking-[0.06em]", dark ? "text-[#7fe0de]" : "text-ink-soft")}>
        <span className={dark ? "text-white" : "text-signal"}>{n}</span> — {label}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
    </div>
    {children && <div className={cn("self-end leading-relaxed lg:col-span-4 lg:col-start-9", dark ? "text-white/70" : "text-ink-soft")}>{children}</div>}
  </Reveal>
);

/* ───────────── content ───────────── */

const audit = [
  { where: "Recommendation flow", problem: "Four steps and 15 to 25 fields before a single project appears.", impact: "Visitors have to commit before they see anything worth committing to." },
  { where: "Field weight", problem: "Optional fields look exactly like the essential ones.", impact: "Everything feels required, so the form feels longer than it is." },
  { where: "Entry points", problem: "Three doors (explore, advise, introduce) into overlapping lists, and about ten separate forms.", impact: "The same answer can be reached in several ways, none of them obvious." },
  { where: "Search", problem: "Province and project group are single-select dropdowns.", impact: "An investor open to three provinces has to search three times." },
  { where: "Project detail", problem: "Details open in a dialog over the list.", impact: "A dossier people read and compare is squeezed into a pop-up." },
  { where: "Saved items", problem: "Picks and drafts live only in one browser.", impact: "Nothing follows a visitor who comes back on another day or device." },
];

const decisions = [
  {
    title: "Results first, optional fields later",
    body: "Only route and amount are required. Results open straight away, and every optional field moves into an advanced filter beside them. A four-step intake and a one-sentence intake were both built and then removed.",
  },
  {
    title: "Keep every field, improve the component",
    body: "Nothing from the demo was dropped: 8 routes, 11 project groups, 78 subtypes and every standalone form. Province and city became multi-select, amounts became ranges. Merging categories was tried and reversed because it lost data.",
  },
  {
    title: "Explain every match",
    body: "Each project shows a match percentage with what fits, what doesn’t and what is unknown. An unknown value is never counted as zero; it gets half the score and a “needs review” label.",
  },
  {
    title: "Open site, login only to save",
    body: "No registration wall. Login is a small dialog that appears only when someone saves a project or a set of conditions, so they can come back to new matches later.",
  },
  {
    title: "A people contact, not a form",
    body: "Every project ends with the expert’s name and mobile, in the open. When a project has no expert, a guide file takes their place.",
  },
];

const copy = [
  { part: "Eyebrow", before: "Capital, expertise and assets, on the path to creating value", after: "Investment advisor" },
  { part: "Headline", before: "Become a partner in building the future.", after: "Take your capital in the right direction." },
  { part: "Subheadline", before: "Discover opportunities for investment, project delivery and asset development.", after: "Tell us what you want, and we’ll show you matching projects with a match percentage." },
  { part: "Main action", before: "Discover collaboration opportunities", after: "Get suggestions" },
];

const tokens = [
  { name: "Primary · actions", hex: "#00ADAB" },
  { name: "Primary · text", hex: "#007A78" },
  { name: "Dark actions", hex: "#005D5C" },
  { name: "Secondary · selection & data", hex: "#1E40AF" },
  { name: "Text", hex: "#2F3533" },
  { name: "Warnings only", hex: "#E0603F" },
];
const rejected = [
  { hex: "#0F766E", note: "starting teal, too green" },
  { hex: "#FF785A", note: "coral accent" },
  { hex: "#083B37", note: "dark green surface" },
  { hex: "#262C33", note: "charcoal surfaces" },
  { hex: "#1E3A8A", note: "read as near-black" },
];

const pages: PageTab[] = [
  {
    id: "home",
    label: "Landing",
    src: `${IMG}/after-full.webp`,
    width: 1200,
    height: 4830,
    notes: [
      "One prompt field in the hero, with a typing hint: say what you want in your own words.",
      "Eight routes up front, with a “what do you bring?” switch that highlights the ones that fit.",
      "The 11 project groups of the chosen route, with photos and subtype badges.",
      "“Why are we showing you these projects?” explains the matching in three steps.",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    src: `${IMG}/projects.webp`,
    width: 1440,
    height: 2251,
    notes: [
      "Opens straight on results: route, domain, location and budget sit as four filters in the top bar.",
      "The advanced filter sits beside the results and applies instantly, with removable chips.",
      "Filters can be saved and come back later, with sorting and 12 projects per page.",
    ],
  },
  {
    id: "detail",
    label: "Project dossier",
    src: `${IMG}/detail.webp`,
    width: 1440,
    height: 5855,
    notes: [
      "A full page, not a dialog, with one section order for every project type.",
      "Money over time, return compared with similar projects, risk and the full dossier.",
      "Empty fields read “not recorded” once, in one group, instead of scattered blanks.",
      "It ends with the expert’s name and mobile (blurred here), or a guide file.",
    ],
  },
  {
    id: "compare",
    label: "Compare",
    src: `${IMG}/compare.webp`,
    width: 1440,
    height: 1209,
    notes: [
      "Two to four projects side by side, with charts and a table.",
      "A small chat answers questions about the selection, built only from the data on screen.",
    ],
  },
  {
    id: "assistant",
    label: "Assistant",
    src: `${IMG}/assistant.webp`,
    width: 1440,
    height: 900,
    notes: [
      "Describe your conditions in a sentence and get up to ten projects, each with a match percentage.",
      "Saved conditions can be attached to a message instead of typed again.",
    ],
  },
];

/* ───────────── page ───────────── */

export function AdvisorLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative">
      <ReadingProgress />

      {/* 00 — Hero */}
      <section className="relative overflow-hidden bg-[#06302f] pt-14 pb-24 text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.1]"
          style={{ backgroundImage: "radial-gradient(#7fe0de 1.2px, transparent 1.2px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse at 70% 0%, #000 30%, transparent 75%)" }}
        />
        <div aria-hidden className="absolute -top-72 right-0 h-[760px] w-[1100px] bg-[radial-gradient(closest-side,rgb(0_173_171/0.35),transparent)]" />
        <div className={cn(wrap, "relative")}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md px-3 py-1 font-mono text-[#06302f] text-[0.75rem] uppercase tracking-[0.08em]" style={{ background: TEAL }}>Re-design</span>
              <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.06em]">{cs.status}</span>
            </div>
            <h1 className="mt-8 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95]">
              Investment Advisor
            </h1>
            <p className="mt-6 max-w-3xl font-display text-2xl text-white/85 leading-snug sm:text-4xl">{cs.tagline}</p>
          </Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-white/15 border-y py-6 sm:grid-cols-4">
            {[
              ["Client", "Algonet"],
              ["Role", cs.meta.role],
              ["Timeline", "7 days · Nov 2026"],
              ["Platform", cs.meta.platform],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[#7fe0de] text-[0.72rem] uppercase tracking-[0.06em]">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 01 — Context */}
      <section className={cn(wrap, "py-24")}>
        <Chapter label="Context" n="01" title="Many ways to invest. One place to start.">
          <p>{cs.summary}</p>
        </Chapter>
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["8", "routes in: invest, fund, contract, buy, lease, restore heritage, social projects, operate"],
            ["11 · 78", "project groups and subtypes, every one kept"],
            ["~27", "review rounds, each one a live build"],
            ["7 days", "from brief to the latest live version, 50 commits"],
          ].map(([v, l]) => (
            <RevealItem className="bg-paper p-7" key={l}>
              <p className="font-display text-5xl leading-none">{v}</p>
              <p className="mt-4 text-ink-soft text-sm leading-snug">{l}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-4 font-mono text-[0.72rem] text-ink-soft">All projects, amounts and returns on these screens are sample data, not real offers.</p>
      </section>

      {/* 01b — Before / after */}
      <section className="relative overflow-hidden bg-[#06302f] py-24 text-white">
        <div className={cn(wrap, "relative")}>
          <Chapter dark label="Before / after" n="01b" title="From a brochure to an advisor.">
            <p>Drag the handle across the first screen: the original HTML demo, and the redesign.</p>
          </Chapter>
          <Reveal className="mt-12">
            <BeforeAfter
              accent={TEAL}
              after={`${IMG}/after-hero.webp`}
              afterAlt="The redesigned investment advisor landing page"
              afterLabel="After · redesign"
              before={`${IMG}/before-hero.webp`}
              beforeAlt="The original HTML demo of the landing page"
              beforeLabel="Before · HTML demo"
              height={900}
              width={1440}
            />
            <p className="mt-4 font-mono text-[0.75rem] text-white/60">Drag the handle, or focus it and use ← →.</p>
          </Reveal>
        </div>
      </section>

      {/* 02 — The brief */}
      <section className="py-28" style={{ background: "#0b4a48" }}>
        <div className={cn(wrap, "text-white")}>
          <Reveal>
            <p className="font-mono text-[#7fe0de] text-[0.78rem] uppercase tracking-[0.06em]"><span className="text-white">02</span> — The brief</p>
            <blockquote className="mt-8 max-w-5xl font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.1]">
              Design an investment advisor that learns what an investor brings and expects, then answers with the projects that fit, with the clarity and polish serious investors expect.
            </blockquote>
          </Reveal>
          <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              ["Keep everything", "The demo is the source of every field, process and flow. Nothing dropped, nothing invented; only shortened, merged or improved."],
              ["Fewest clicks", "Simple components and ranges before typing. Basic information first, results next, optional fields beside them."],
              ["One system", "shadcn components, Vazirmatn, Iconsax, light mode, a small touch of the Algonet identity. Desktop only."],
            ].map(([t, b]) => (
              <RevealItem className="rounded-2xl border border-white/15 p-8" key={t}>
                <p className="font-display text-2xl">{t}</p>
                <p className="mt-3 text-white/70">{b}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 — Audit */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Audit" n="03" title={<>Fifteen fields <em className="text-signal">before the first project.</em></>}>
            <p>I audited the HTML demo for its information architecture and flows, not its visuals, and mapped every field, route and form it contained.</p>
          </Chapter>
          <Reveal className="mt-14 grid items-center gap-8 rounded-3xl bg-ink p-8 text-paper sm:p-12 lg:grid-cols-12 dark:bg-paper-2 dark:text-ink">
            <div className="lg:col-span-5">
              <p className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-none">4 → 0</p>
              <p className="mt-3 text-paper/70 dark:text-ink-soft">steps between arriving and seeing a project</p>
            </div>
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.72rem] text-paper/60 uppercase tracking-[0.06em] dark:text-ink-soft">Key finding</p>
              <p className="mt-3 font-display text-2xl leading-snug">Before seeing a single project, a visitor had to complete four steps and 15 to 25 fields, most of them optional but presented as required.</p>
            </div>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audit.map((a) => (
              <RevealItem className="rounded-2xl border border-rule bg-paper p-6" key={a.where}>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em]" style={{ color: TEAL_TEXT }}>{a.where}</p>
                <p className="mt-5 font-mono text-[0.68rem] text-ink-soft uppercase">Problem</p>
                <p className="mt-1">{a.problem}</p>
                <p className="mt-4 font-mono text-[0.68rem] text-ink-soft uppercase">Impact</p>
                <p className="mt-1 text-ink-soft text-sm">{a.impact}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 — Decisions */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Key decisions" n="04" title="Show first. Ask later. Explain always." />
          <RevealGroup as="ol" className="mt-14 grid gap-4 lg:grid-cols-2">
            {decisions.map((d, i) => (
              <RevealItem as="li" className={cn("rounded-2xl bg-paper p-7 ring-1 ring-rule", i === 0 && "lg:col-span-2")} key={d.title}>
                <p className="font-mono text-sm" style={{ color: TEAL_TEXT }}>0{i + 1}</p>
                <p className="mt-3 font-display text-2xl">{d.title}</p>
                <p className="mt-3 text-ink-soft leading-relaxed">{d.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 05 — Side by side */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Side by side" n="05" title="A catalogue, rebuilt around a question.">
            <p>The demo opens on a slogan and a grid of services. The redesign opens on one question, “what do you want?”, and every section after it helps answer it.</p>
          </Chapter>
          <div className="mt-14">
            <TwinScroll accent={TEAL_TEXT} left={{ src: `${IMG}/before-full.webp`, label: "HTML demo", height: 1983 }} right={{ src: `${IMG}/after-full.webp`, label: "Redesign", height: 4830 }} />
          </div>
        </div>
      </section>

      {/* 06 — Copy */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Words" n="06" title="From “discover opportunities” to “get suggestions”.">
            <p>The original hero spoke about the company. The new one speaks to the visitor and states exactly what happens next. The interface is in Persian; the copy is shown here in English.</p>
          </Chapter>
          <Reveal className="mt-14 overflow-hidden rounded-2xl border border-rule bg-paper">
            <div className="grid grid-cols-[7rem_1fr_1fr] bg-ink px-6 py-3 font-mono text-[0.72rem] text-paper uppercase tracking-[0.06em] dark:bg-paper-2 dark:text-ink">
              <span />
              <span>Before</span>
              <span>After</span>
            </div>
            {copy.map((c) => (
              <div className="grid grid-cols-[7rem_1fr_1fr] items-start gap-4 border-rule border-t px-6 py-5" key={c.part}>
                <span className="font-mono text-[0.72rem] text-ink-soft uppercase">{c.part}</span>
                <p className="text-ink-soft">{c.before}</p>
                <p className="font-medium">{c.after}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 07 — Key pages */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="The flow" n="07" title="From a question to a person to call.">
            <p>The landing is the first step of a short flow: results, a dossier for each project, a way to compare, and an assistant for people who would rather just describe what they want.</p>
          </Chapter>
          <div className="mt-12">
            <PageSwitcher accent={TEAL_TEXT} altSuffix="page" pages={pages} />
          </div>
        </div>
      </section>

      {/* 08 — Visual system */}
      <section className="bg-[#06302f] py-24 text-white">
        <div className={wrap}>
          <Chapter dark label="Visual system" n="08" title="Less green, more meaning.">
            <p>The early palette leaned too heavily on green and felt generic. Teal was reserved for primary actions, text moved to a neutral charcoal, and a blue took over selection, focus and data.</p>
          </Chapter>
          <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {tokens.map((t) => (
              <RevealItem key={t.name}>
                <div className="aspect-[4/3] rounded-xl ring-1 ring-white/10" style={{ background: t.hex }} />
                <p className="mt-3 text-sm">{t.name}</p>
                <p className="font-mono text-[0.75rem] text-white/50">{t.hex}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-12 rounded-2xl border border-white/15 p-6">
            <p className="font-mono text-[#7fe0de] text-[0.75rem] uppercase">Tried and left behind</p>
            <div className="mt-4 flex flex-wrap gap-5">
              {rejected.map((r) => (
                <div className="flex items-center gap-3" key={r.hex}>
                  <span className="size-8 rounded-lg opacity-70 ring-1 ring-white/10" style={{ background: r.hex }} />
                  <span className="font-mono text-[0.75rem] text-white/60">{r.hex}<br />{r.note}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-white/60">
              The blue is #1E40AF rather than #1E3A8A: livelier beside the teal, and it doesn’t read as near-black beside charcoal text. White on #00ADAB is only about 2.8:1, so teal text uses the darker #007A78.
            </p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Type", "Vazirmatn throughout, and one rule for every section head: kicker, title, one short subtitle, right-aligned."],
              ["Imagery", "Real photos with one black-and-grey treatment, a landmark photo per province, and an Iran map with real borders and no dots."],
              ["Identity", "The Algonet pattern of nodes, lines and dots as one faint layer, and a small mark before each section title."],
            ].map(([t, b]) => (
              <RevealItem className="rounded-2xl bg-white/5 p-6" key={t}>
                <p className="font-mono text-[#7fe0de] text-[0.75rem] uppercase">{t}</p>
                <p className="mt-3 text-white/75">{b}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 09 — Process */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Process" n="09" title="Directed by design, built with AI.">
            <p>I wrote the brief and the constraints, reviewed every round on the live site and made the calls. Claude produced the audit, the layout alternatives and the code from that direction, so each idea could be judged as a working page within hours.</p>
          </Chapter>
          <RevealGroup as="ol" className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-5">
            {[
              ["Nov 10", "Brief, and an audit of the demo’s structure: 8 routes, 11 groups, about 10 forms."],
              ["Nov 10–11", "A short flow: basic information, results, advanced filter beside them."],
              ["Nov 14", "Three live hero alternatives; the compass hero with the Iran map was chosen."],
              ["Nov 15", "Compare page, colour roles, and a QA pass that restored 73 sample projects."],
              ["Nov 16", "Intake page removed so results open straight away. Final product name chosen."],
            ].map(([d, b]) => (
              <RevealItem as="li" className="bg-paper p-6" key={d}>
                <p className="font-mono text-sm" style={{ color: TEAL_TEXT }}>{d}</p>
                <p className="mt-3 text-ink-soft text-sm leading-relaxed">{b}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 10 — Status */}
      <section className="py-24 text-white" style={{ background: BLUE }}>
        <div className={wrap}>
          <Chapter dark label="Where it stands" n="10" title="A working demo. Next: real data and real users.">
            <p>The redesign is live as a desktop demo on sample data, and the assistant is scripted. The site is planned to connect to a partner platform for real projects.</p>
          </Chapter>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-2xl border border-white/20 p-7">
              <p className="font-mono text-white/70 text-xs uppercase">Done</p>
              <ul className="mt-4 space-y-2 text-white/85">
                <li>Landing, projects, dossier, compare, assistant, saved</li>
                <li>Every route, group and form from the demo</li>
                <li>Login only on save, saved filters</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/20 p-7" delay={0.08}>
              <p className="font-mono text-white/70 text-xs uppercase">Next</p>
              <ul className="mt-4 space-y-2 text-white/85">
                <li>Real projects and a unique photo for each</li>
                <li>A real model behind the assistant</li>
                <li>A mobile version</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/40 p-7" delay={0.16}>
              <p className="font-mono text-white/70 text-xs uppercase">The test that matters</p>
              <p className="mt-4 text-white/85">Can a first-time investor, in under a minute, reach a short list of projects that fit them and know who to call?</p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
