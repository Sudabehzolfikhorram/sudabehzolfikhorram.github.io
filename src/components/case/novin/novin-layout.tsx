// Novin Host: the flagship case study. Built around the client's one-line
// brief, "make it modern, but don't let customers feel we've changed", and
// told as a story: context → tension → turning point → solution → next.
// Everything shown is Sudabeh's own Figma work or the live novinhost.org site.

import { Vazirmatn } from "next/font/google";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { periodLabel, wrap } from "../blocks";
import { BeforeAfter, type Hotspot, Hotspots, type PageTab, PageSwitcher, TwinScroll } from "./interactive";
import { ReadingProgress } from "./reading-progress";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"] });
const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work/novinhost`;

const Chapter = ({ n, label, title, children, dark }: { n: string; label: string; title: React.ReactNode; children?: React.ReactNode; dark?: boolean }) => (
  <Reveal className="grid gap-6 lg:grid-cols-12">
    <div className="lg:col-span-7">
      <p className={cn("font-mono text-[0.78rem] uppercase tracking-[0.06em]", dark ? "text-[#7b9efe]" : "text-ink-soft")}>
        <span className={dark ? "text-white" : "text-signal"}>{n}</span> — {label}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-6xl">{title}</h2>
    </div>
    {children && <div className={cn("self-end leading-relaxed lg:col-span-4 lg:col-start-9", dark ? "text-white/70" : "text-ink-soft")}>{children}</div>}
  </Reveal>
);

/* ───────────── content ───────────── */

const beforeHotspots: Hotspot[] = [
  { x: 9, y: 84, title: "Overlays own the first screen", body: "A promo card, a chat greeting and a feedback tab all sit on top of the hero, so the first impression is about pop-ups, not hosting." },
  { x: 50, y: 40, title: "A slogan, not a proposition", body: "“Novin Host, your new partner” and “15 years of hosting” say who, but not what you can buy or why it’s reliable." },
  { x: 50, y: 63, title: "Services squeezed into tiles", body: "Four products sit as small tiles over the globe image, competing with it for attention." },
  { x: 50, y: 9, title: "Navigation in two places", body: "Products in one bar, company pages in a second bar above it, both in different styles." },
];

const audit = [
  { law: "Aesthetic & minimalist design", problem: "Three overlays on the first screen", impact: "The offer is hidden behind promotions and chat." },
  { law: "Hick’s law", problem: "An 8-plan VPS price table with 7 tabs on the homepage", impact: "Visitors face detailed choices before they know which service they need." },
  { law: "Recognition over recall", problem: "Server locations shown only as pins on a static map", impact: "Location, a key buying decision, can’t be acted on from the homepage." },
  { law: "Consistency & standards", problem: "Mixed button, card and icon styles across sections", impact: "The site feels assembled over time rather than designed as one." },
  { law: "Social proof", problem: "Clients like Bank Dey and Iran Khodro appear only in a testimonial section near the footer", impact: "The strongest trust signal is easy to miss." },
  { law: "Match with the real world", problem: "The hero headline doesn’t name the products", impact: "New visitors have to scroll to learn what Novin Host sells." },
];

const kept = [
  { title: "The logo", body: "Mark and wordmark unchanged, in the same place: top right." },
  { title: "Navy as the brand colour", body: "Live hero #192A56 → new primary token #11215D. Same family, more depth." },
  { title: "The words customers search for", body: "سرور مجازی، سرور اختصاصی، کولوکیشن، هاست، دامنه، نوین پلاس: same names, regrouped." },
  { title: "The header pattern", body: "Logo right, menu centre, account actions left: the RTL layout returning customers know." },
  { title: "Novin Plus", body: "The membership keeps its name and its place in the offer." },
  { title: "The same clients", body: "Bank Dey, Islamic Azad University and Pishgaman stay as proof, now near the top." },
];
const changed = [
  { title: "Hero", body: "From a slogan over a globe to a clear promise plus a live network status card." },
  { title: "Pricing", body: "Off the homepage and into comparison tables on each product page." },
  { title: "Locations", body: "From map pins to a filterable list with status and a “which location suits me?” guide." },
  { title: "One component system", body: "One card, button and icon style (vuesax) across every page; 16/20 px radii." },
  { title: "Type", body: "A Vazir FD scale from 12 to 32 for Persian, Montserrat for Latin." },
  { title: "Overlays", body: "Pop-ups leave the first screen; 24/7 support moves into a persistent top bar." },
];

const navMap = [
  { before: "سرور مجازی · VPS", after: "Products ▸ VPS, browsed by country" },
  { before: "هاست · Hosting", after: "Products ▸ Hosting & domain" },
  { before: "دامنه · Domain", after: "Products ▸ Hosting & domain" },
  { before: "سرور اختصاصی · Dedicated", after: "Dedicated infrastructure ▸ Dedicated servers" },
  { before: "کولوکیشن · Colocation", after: "Dedicated infrastructure ▸ Colocation" },
  { before: "سرویس کلود · Cloud (hero tile)", after: "Novin Cloud, now a top-level item" },
  { before: "—", after: "Network services ▸ IXP · FCP (new)", isNew: true },
  { before: "—", after: "Service status · Buying guide (utility bar, new)", isNew: true },
];

const tokens = [
  { name: "Theme / Primary", hex: "#11215D" },
  { name: "Theme / Tertiary", hex: "#214BBD" },
  { name: "Text on dark", hex: "#7B9EFE" },
  { name: "Theme / Secondary", hex: "#E0B245" },
  { name: "Status / Success", hex: "#2FB350" },
  { name: "Background / Page", hex: "#F6F8FB" },
];
const typeScale = [
  { size: 32, weight: 700, label: "32 · Bold" },
  { size: 24, weight: 700, label: "24 · Bold" },
  { size: 20, weight: 700, label: "20 · Bold" },
  { size: 18, weight: 500, label: "18 · Medium" },
  { size: 16, weight: 400, label: "16 · Regular" },
  { size: 14, weight: 400, label: "14 · Regular" },
  { size: 12, weight: 500, label: "12 · Medium" },
];

const afterHotspots: Hotspot[] = [
  { x: 90, y: 2.5, title: "Support, always visible", body: "“24/7 specialist support” with a live indicator sits in a slim top bar, replacing the chat pop-up." },
  { x: 58, y: 9.5, title: "Familiar menu, regrouped", body: "The same product names, grouped into Products, Dedicated infrastructure, Novin Cloud and Network services." },
  { x: 13, y: 9.5, title: "Two clear paths", body: "“Log in to panel” for existing customers and “Free consultation” for new ones." },
  { x: 74, y: 40, title: "A promise, not a slogan", body: "“Reliable infrastructure for your business’s sustainable growth”, followed by what Novin Host actually offers." },
  { x: 28, y: 52, title: "Proof instead of claims", body: "A live network status card: latency per location, 99.99% monthly uptime, 1.2 Tbps DDoS capacity, 24 points of presence." },
];

const pages: PageTab[] = [
  {
    id: "home",
    label: "Home",
    src: `${IMG}/after-full.webp`,
    width: 1200,
    height: 7248,
    notes: [
      "Services first: six product cards, each with one clear next step.",
      "Novin Host’s two Tehran datacenters get their own dark section, with colocation ordering.",
      "A location chooser replaces the map: filter by region, see status, open plans.",
      "Clients and testimonials move up the page, followed by the blog and Novin Plus.",
    ],
  },
  {
    id: "vps",
    label: "VPS",
    src: `${IMG}/vps.webp`,
    width: 1440,
    height: 2304,
    notes: [
      "“Choose the right VPS for your project, more simply”: the page states its job.",
      "A live config card (CPU, RAM, storage, resource bar) shows what you get.",
      "One comparison table with country tabs replaces scattered plan cards.",
      "Countries as a flag carousel, so location is recognised rather than read.",
    ],
  },
  {
    id: "dedicated",
    label: "Dedicated",
    src: `${IMG}/dedicated.webp`,
    width: 1440,
    height: 1559,
    notes: [
      "A breadcrumb (Dedicated / Iran) for orientation on deeper pages.",
      "Filters by type (economy, enterprise, GPU), datacenter and RAM, with a live count.",
      "The table shows datacenter, CPU, RAM, storage and network: the specs people compare.",
    ],
  },
  {
    id: "domains",
    label: "Domains",
    src: `${IMG}/domains.webp`,
    width: 1440,
    height: 1299,
    notes: [
      "Search first: the domain field is the hero.",
      "TLD cards explain who each ending is for: .ir for Iranian audiences, .com for a global presence.",
      "Register, renew and transfer prices in one filterable table, plus available/unavailable states.",
    ],
  },
  {
    id: "plus",
    label: "Novin Plus",
    src: `${IMG}/novinplus.webp`,
    width: 1440,
    height: 1240,
    notes: [
      "“The same Novin Host, with a valuable plus”: continuity is written into the copy.",
      "A membership card in gold and navy makes the subscription tangible.",
      "Benefits up front: up to 5% wallet cashback, 24/7 priority support, member discounts.",
    ],
  },
];

/* ───────────── page ───────────── */

export function NovinLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative">
      <ReadingProgress />

      {/* 00 — Hero: the brief, as something you can test yourself. */}
      <section className="relative overflow-hidden bg-[#070e2b] pt-14 pb-24 text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: "linear-gradient(#7b9efe 1px, transparent 1px), linear-gradient(90deg, #7b9efe 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)" }}
        />
        <div aria-hidden className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[#214bbd]/40 blur-[120px]" />
        <div className={cn(wrap, "relative")}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-[#a9c7ff] px-3 py-1 font-mono text-[#070e2b] text-[0.75rem] uppercase tracking-[0.08em] shadow-[3px_3px_0_#2b3a6b]">Re-design</span>
              <span className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.06em]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#2fb350]" /> {cs.status}
              </span>
            </div>
            <h1 className="mt-8 font-display text-[clamp(3.5rem,11vw,10rem)] uppercase leading-[0.9]">Novin Host</h1>
            <p className="mt-6 max-w-3xl font-display text-2xl text-white/85 leading-snug sm:text-4xl">
              A redesign you’re not supposed to notice. Until you try to buy something.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-white/15 border-y py-6 sm:grid-cols-4">
            {[
              ["Client", "Novin Host"],
              ["Role", cs.meta.role],
              ["Start", periodLabel(cs)?.split(" – ")[0] ?? "—"],
              ["Scope", "11 page types · desktop & mobile"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.72rem] text-[#7b9efe] uppercase tracking-[0.06em]">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>

          <Reveal className="mt-14">
            <BeforeAfter after={`${IMG}/after-hero.webp`} before={`${IMG}/before-hero.webp`} height={900} width={1440} />
            <p className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.75rem] text-white/60">
              <span>Drag the handle, or focus it and use ← →.</span>
              <span>Same logo. Same navy. Same words. A different experience.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 01 — Context. */}
      <section className={cn(wrap, "py-24")}>
        <Chapter label="Context" n="01" title="Fifteen years of trust, on a site that showed its age.">
          <p>{cs.summary}</p>
        </Chapter>
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["15+", "years of hosting, the company’s own headline"],
            ["12", "countries with server locations on the current site"],
            ["7", "product lines: VPS, dedicated, colocation, hosting, domain, SSL, email"],
            ["24/7", "technical support promised on every service"],
          ].map(([v, l]) => (
            <RevealItem className="bg-paper p-7" key={l}>
              <p className="font-display text-6xl leading-none">{v}</p>
              <p className="mt-4 text-ink-soft text-sm leading-snug">{l}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-4 font-mono text-[0.72rem] text-ink-soft">Figures from novinhost.org, October 2026.</p>
      </section>

      {/* 02 — The brief: the tension the whole project resolves. */}
      <section className="bg-[#11215d] py-28 text-white">
        <div className={wrap}>
          <Reveal>
            <p className="font-mono text-[#7b9efe] text-[0.78rem] uppercase tracking-[0.06em]"><span className="text-white">02</span> — The brief</p>
            <blockquote className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,5.5vw,4.75rem)] leading-[1.05]">
              “Make it modern. But don’t let our customers feel{" "}
              <span className="relative inline-block">
                Novin Host
                <span aria-hidden className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-[#e0b245]" />
              </span>{" "}
              has changed.”
            </blockquote>
          </Reveal>
          <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2">
            <RevealItem className="rounded-2xl border border-white/15 p-8">
              <p className="font-mono text-[#7b9efe] text-xs uppercase">Pull one way</p>
              <p className="mt-4 font-display text-3xl">Modern & easier to choose from</p>
              <p className="mt-3 text-white/70">Clearer offer, simpler comparison, one consistent system, mobile that works.</p>
            </RevealItem>
            <RevealItem className="rounded-2xl border border-white/15 p-8">
              <p className="font-mono text-[#e0b245] text-xs uppercase">Pull the other</p>
              <p className="mt-4 font-display text-3xl">Recognisably the same company</p>
              <p className="mt-3 text-white/70">Long-standing customers, including banks and universities, who already know where everything is.</p>
            </RevealItem>
          </RevealGroup>
          <Reveal className="mt-12 max-w-3xl border-[#e0b245] border-l-2 pl-6 text-white/80">
            <p>
              Research backs the caution. Nielsen Norman Group warns that a fresh design often performs worse simply because it breaks what users already know, and recommends{" "}
              changing only what the evidence says needs changing.
            </p>
            <p className="mt-3 font-mono text-[0.75rem] text-white/50">
              Sources: NN/g, “Fresh vs. Familiar: How Aggressively to Redesign” and “Radical Redesign or Incremental Change?”
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 — Audit of the live site. */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Audit" n="03" title="What the current site gets in the way of.">
            <p>A heuristic review of novinhost.org: what a first-time visitor meets, and what a returning customer has learned to work around.</p>
          </Chapter>
          <div className="mt-14">
            <Hotspots alt="The current Novin Host homepage, annotated" height={900} points={beforeHotspots} src={`${IMG}/before-hero.webp`} tone="red" width={1440} />
          </div>
          <RevealGroup className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audit.map((a) => (
              <RevealItem className="rounded-2xl bg-[#0b1433] p-6 text-white" key={a.law}>
                <p className="font-mono text-[#ff9b6b] text-[0.75rem] uppercase tracking-[0.08em]">{a.law}</p>
                <p className="mt-5 font-mono text-[0.68rem] text-white/45 uppercase">Problem</p>
                <p className="mt-1">{a.problem}</p>
                <p className="mt-4 font-mono text-[0.68rem] text-white/45 uppercase">Impact</p>
                <p className="mt-1 text-white/75 text-sm">{a.impact}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 — The turning point: a continuity contract. */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Strategy" n="04" title={<>Familiar on the surface. <em className="text-signal">Rebuilt underneath.</em></>}>
            <p>The redesign works like a contract: a short list of what stays so customers recognise the site, and what is free to change to make it easier to use.</p>
          </Chapter>
          <div className="relative mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
            <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px bg-rule md:block" />
            <div>
              <p className="flex items-center gap-3 font-display text-3xl"><span className="grid size-9 place-items-center rounded-full bg-[#11215d] text-base text-white">=</span> What stays</p>
              <RevealGroup as="ul" className="mt-8 space-y-3">
                {kept.map((k) => (
                  <RevealItem as="li" className="rounded-xl border border-rule bg-paper p-5" key={k.title}>
                    <p className="font-medium">{k.title}</p>
                    <p className={cn("mt-1 text-ink-soft text-sm leading-relaxed", vazir.className)}>{k.body}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
            <div>
              <p className="flex items-center gap-3 font-display text-3xl"><span className="grid size-9 place-items-center rounded-full bg-[#214bbd] text-base text-white">↻</span> What changes</p>
              <RevealGroup as="ul" className="mt-8 space-y-3">
                {changed.map((k) => (
                  <RevealItem as="li" className="rounded-xl border border-[#214bbd]/25 bg-paper p-5" key={k.title}>
                    <p className="font-medium">{k.title}</p>
                    <p className="mt-1 text-ink-soft text-sm leading-relaxed">{k.body}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
          <Reveal className="mt-14 flex flex-wrap items-center gap-6 rounded-2xl bg-paper p-6 ring-1 ring-rule">
            <p className="font-mono text-[0.75rem] text-ink-soft uppercase">Brand colour, measured</p>
            <div className="flex items-center gap-3"><span className="size-10 rounded-lg" style={{ background: "#192A56" }} /><span className="font-mono text-sm">#192A56<br /><span className="text-ink-soft">live hero</span></span></div>
            <span className="text-2xl text-ink-soft">→</span>
            <div className="flex items-center gap-3"><span className="size-10 rounded-lg" style={{ background: "#11215D" }} /><span className="font-mono text-sm">#11215D<br /><span className="text-ink-soft">new primary</span></span></div>
            <p className="text-ink-soft text-sm sm:ml-auto">Deeper, but the same navy: the change people feel as “cleaner”, not “different”.</p>
          </Reveal>
        </div>
      </section>

      {/* 05 — Information architecture. */}
      <section className={cn(wrap, "py-24")}>
        <Chapter label="Information architecture" n="05" title="Same words. Better shelves.">
          <p>Customers search for products by the names they already use. I kept every label and changed only where it lives, grouping six scattered items into four product families.</p>
        </Chapter>
        <Reveal className="mt-14 overflow-hidden rounded-2xl border border-rule">
          <div className="grid grid-cols-[1fr_auto_1.4fr] bg-[#11215d] px-6 py-3 font-mono text-[0.72rem] text-white uppercase tracking-[0.06em]">
            <span>Before · live menu</span>
            <span />
            <span>After · redesign</span>
          </div>
          {navMap.map((r) => (
            <div className="grid grid-cols-[1fr_auto_1.4fr] items-center gap-4 border-rule border-t px-6 py-4" key={r.after}>
              <span className={cn("text-[0.95rem]", vazir.className, r.before === "—" && "text-ink-soft")}>{r.before}</span>
              <span aria-hidden className="text-ink-soft">→</span>
              <span className="flex flex-wrap items-center gap-2">
                {r.after}
                {r.isNew && <span className="rounded-full bg-[#2fb350]/15 px-2 py-0.5 font-mono text-[#1f7a3a] text-[0.68rem] uppercase">New</span>}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 06 — Before/after, whole pages. */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Side by side" n="06" title="Two homepages, one company.">
            <p>The current homepage leads with a price table; the redesign leads with what Novin Host offers and why it’s reliable, then lets each product page do the comparing.</p>
          </Chapter>
          <div className="mt-14">
            <TwinScroll left={{ src: `${IMG}/before-full.webp`, label: "novinhost.org · today", height: 5182 }} right={{ src: `${IMG}/after-full.webp`, label: "Redesign", height: 7248 }} />
          </div>
        </div>
      </section>

      {/* 07 — The new hero, annotated. */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="The first screen" n="07" title="Every element earns its place.">
            <p>Hover the markers. Each one replaces something from the audit with a clearer equivalent, without moving the landmarks returning customers rely on.</p>
          </Chapter>
          <div className="mt-14">
            <Hotspots alt="The redesigned Novin Host homepage hero, annotated" height={900} points={afterHotspots} src={`${IMG}/after-hero.webp`} width={1440} />
          </div>
        </div>
      </section>

      {/* 08 — Design system, with the real tokens from the Figma file. */}
      <section className="bg-[#070e2b] py-24 text-white">
        <div className={wrap}>
          <Chapter dark label="Design system" n="08" title="One system under every page.">
            <p>Colour, type and radius tokens defined in Figma and used across all eleven page types. The values below are the actual variables.</p>
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
          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-[#7b9efe] text-[0.75rem] uppercase">Type · Vazir FD for Persian, Montserrat for Latin</p>
              <div className="mt-4 divide-y divide-white/10 border-white/10 border-y" dir="rtl">
                {typeScale.map((t) => (
                  <div className="flex items-baseline justify-between gap-6 py-3" key={t.label}>
                    <span className={cn("truncate", vazir.className)} style={{ fontSize: t.size, fontWeight: t.weight }}>
                      زیرساخت مطمئن برای رشد پایدار
                    </span>
                    <span className="shrink-0 font-mono text-[0.72rem] text-white/50" dir="ltr">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8 lg:col-span-4">
              <div>
                <p className="font-mono text-[#7b9efe] text-[0.75rem] uppercase">Radius</p>
                <div className="mt-4 flex gap-4">
                  {[16, 20].map((r) => (
                    <div className="grid size-24 place-items-center border border-[#7b9efe]/50 bg-white/5 font-mono text-sm" key={r} style={{ borderRadius: r }}>{r}px</div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[#7b9efe] text-[0.75rem] uppercase">Icons</p>
                <p className="mt-3 text-white/70">One icon family (vuesax), organised in the file by category: money, security, location, delivery, programming and more.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — Key pages. */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Key pages" n="09" title="Built to compare, not to scroll past.">
            <p>The product pages are where customers decide. Each one opens by saying what the page is for, then gives a single place to compare.</p>
          </Chapter>
          <div className="mt-12">
            <PageSwitcher pages={pages} />
          </div>
        </div>
      </section>

      {/* 10 — Home, section by section. */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Homepage sections" n="10" title="From map pins to decisions." />
          <div className="mt-14 space-y-16">
            {[
              { src: "locations", h: 1019, title: "Location chooser", body: "The live site shows server locations as pins on a static map. The redesign turns them into a filterable list (All, Iran, Europe, America, Middle East) with status and a link to plans, plus a short guide: user location, traffic type, service requirements." },
              { src: "datacenters", h: 879, title: "Two Tehran datacenters", body: "Dedicated infrastructure gets its own dark section: each datacenter with its location, connectivity and services, and two actions (view servers, order colocation)." },
              { src: "services", h: 739, title: "Services, one card each", body: "Six products in one card pattern: icon, two-line description, one action. The same card is reused across the site." },
            ].map((s, i) => (
              <div className="grid items-center gap-10 lg:grid-cols-12" key={s.src}>
                <Reveal className={cn("lg:col-span-8", i % 2 === 1 && "lg:order-2 lg:col-start-5")}>
                  <div className="overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgb(0_0_0/0.4)] ring-1 ring-black/10">
                    <Image alt={s.title} className="block h-auto w-full" height={s.h} sizes="(min-width: 1024px) 60vw, 100vw" src={`${IMG}/${s.src}.webp`} width={1440} />
                  </div>
                </Reveal>
                <Reveal className={cn("lg:col-span-4", i % 2 === 1 && "lg:order-1")}>
                  <p className="font-mono text-signal text-sm">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-3xl">{s.title}</h3>
                  <p className="mt-3 text-ink-soft leading-relaxed">{s.body}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Mobile. */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Mobile" n="11" title="The whole catalogue, one thumb away.">
            <p>On today’s mobile site the top links wrap onto two lines, the logo isn’t visible and two pop-ups cover the services. The redesign opens on the offer, and a full-screen menu groups every product, with VPS locations shown by flag.</p>
          </Chapter>
          <div className="mt-14 flex flex-wrap items-end justify-center gap-6 sm:gap-10">
            {[
              { src: "before-mobile", label: "Today", w: 780, h: 1688, dim: true },
              { src: "after-mobile", label: "Redesign · home", w: 750, h: 1624 },
              { src: "mobile-menu", label: "Redesign · menu", w: 750, h: 1624 },
            ].map((m) => (
              <Reveal className="w-[200px] sm:w-[240px]" key={m.src}>
                <div className={cn("rounded-[2.4rem] bg-zinc-900 p-2.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.4)]", m.dim && "opacity-80 grayscale-[35%]")}>
                  <div className="overflow-hidden rounded-[1.9rem] bg-white">
                    <Image alt={m.label} className="block h-auto w-full" height={m.h} sizes="240px" src={`${IMG}/${m.src}.webp`} width={m.w} />
                  </div>
                </div>
                <p className="mt-4 text-center font-mono text-[0.75rem] text-ink-soft uppercase">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Explorations. */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Explorations" n="12" title="Three directions before the final one.">
            <p>Earlier hero explorations from the Figma file, kept here to show the path to the final design.</p>
          </Chapter>
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { src: "explore-a", w: 1200, h: 1027, label: "Direction A", body: "Dark and globe-led, with services orbiting the planet." },
              { src: "explore-b", w: 1200, h: 1025, label: "Direction B", body: "Light, isometric servers on a data landscape, with key stats under the hero." },
              { src: "after-hero", w: 1440, h: 900, label: "Final", body: "Navy hero kept from today’s site, with a live network status card as proof." },
            ].map((e, i) => (
              <RevealItem key={e.src}>
                <div className={cn("overflow-hidden rounded-xl ring-1", i === 2 ? "ring-2 ring-[#214bbd]" : "ring-black/10")}>
                  <div className="relative aspect-[4/3]">
                    <Image alt={e.label} className="object-cover object-top" fill sizes="(min-width: 768px) 33vw, 100vw" src={`${IMG}/${e.src}.webp`} />
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 font-medium">
                  {e.label}
                  {i === 2 && <span className="rounded-full bg-[#214bbd] px-2 py-0.5 font-mono text-[0.65rem] text-white uppercase">Chosen</span>}
                </p>
                <p className="mt-1 text-ink-soft text-sm">{e.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 13 — Status and how success will be measured. */}
      <section className="bg-[#11215d] py-24 text-white">
        <div className={wrap}>
          <Chapter dark label="Where it stands" n="13" title="Designed. Next: proving it.">
            <p>The redesign is in progress since June 2026. Before launch, the plan is to test it with the people the brief protects: existing customers.</p>
          </Chapter>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-2xl border border-white/15 p-7">
              <p className="font-mono text-[#7b9efe] text-xs uppercase">Done</p>
              <ul className="mt-4 space-y-2 text-white/80">
                <li>11 page types, desktop and mobile</li>
                <li>Search, filter and compare states</li>
                <li>Design tokens and icon library</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/15 p-7" delay={0.08}>
              <p className="font-mono text-[#7b9efe] text-xs uppercase">Next · test top tasks</p>
              <ul className="mt-4 space-y-2 text-white/80">
                <li>Find a VPS in a given country</li>
                <li>Check if a domain is available</li>
                <li>Compare two dedicated servers</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-[#e0b245]/50 p-7" delay={0.16}>
              <p className="font-mono text-[#e0b245] text-xs uppercase">The real test of the brief</p>
              <p className="mt-4 text-white/80">Ask returning customers to find things they already use. Success means they get there faster, and don’t describe it as “a different company”.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
