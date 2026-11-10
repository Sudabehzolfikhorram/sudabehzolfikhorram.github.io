// Kudos: employee-recognition software built at Novaday. Told as a story
// (NN/g story mountain): who it's for → why a product this size is hard →
// the insight (a screen isn't done until its rules are written) → the
// employee side, the HR side and the system → where it stands. Every screen
// is from the Kudos Figma file; Persian copy is translated, not invented.

import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { periodLabel, wrap } from "../blocks";
import { IPhoneShot, MacBook } from "../devices";
import { BeforeAfter, type Hotspot, Hotspots, type PageTab, PageSwitcher } from "../novin/interactive";
import { ReadingProgress } from "../novin/reading-progress";
import { ScreenTour, type TourScreen } from "./screen-tour";

const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work/kudos`;

// Kudos red, sampled from the file's thumbnail and logo.
const C = { red: "#E6294D", deep: "#B5153A", ink: "#2a0a12", blush: "#FDEEF1" };

const Chapter = ({ n, label, title, children, dark }: { n: string; label: string; title: React.ReactNode; children?: React.ReactNode; dark?: boolean }) => (
  <Reveal className="grid gap-6 lg:grid-cols-12">
    <div className="lg:col-span-7">
      <p className={cn("font-mono text-[0.78rem] uppercase tracking-[0.06em]", dark ? "text-[#ffb3c0]" : "text-ink-soft")}>
        <span className={dark ? "text-white" : "text-signal"}>{n}</span> · {label}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
    </div>
    {children && <div className={cn("space-y-3 self-end leading-relaxed lg:col-span-4 lg:col-start-9", dark ? "text-white/75" : "text-ink-soft")}>{children}</div>}
  </Reveal>
);

/* ───────────── content ───────────── */

const roles = [
  {
    tag: "Employees",
    body: "Send a colleague a gift card with coins and a note, vote in surveys, sign up for volunteer events, take on challenges, then spend coins in the company marketplace or withdraw them as rials.",
  },
  {
    tag: "HR & managers",
    body: "Run surveys, events, challenges and gift cards, onboard new hires with a checklist, manage colleagues, groups and access, and see who is taking part and how the team feels.",
  },
  {
    tag: "Novaday",
    body: "A super-admin side for the team behind Kudos, plus pricing and subscription pages for the companies that sign up.",
  },
];

const tensions = [
  { title: "A whole HR product", body: "Recognition, surveys, events, challenges, a marketplace, a wallet, onboarding, reports and settings: dozens of pages, each with its own states." },
  { title: "Many companies, one app", body: "Each company configures Kudos its own way, and one person can belong to several companies and switch between them." },
  { title: "Worthless if unused", body: "Recognition only works if people actually send it. Every feature had to be easy to start and visible to the HR team when it wasn’t working." },
];


const feedPoints: Hotspot[] = [
  { x: 90, y: 5, title: "The company, not the vendor", body: "The company’s own logo and name lead the header. Tap the arrow to switch between companies you belong to; the moon switches to dark mode, where the logo sits on a white chip to stay legible." },
  { x: 64, y: 13, title: "Thank someone first", body: "One composer with three modes: Appreciation, Post and Announcement. Recognition is the first option, not a feature three menus deep." },
  { x: 88, y: 16, title: "Your balance", body: "Coins and their value in rials. If the company turns rial balances off, that line simply disappears." },
  { x: 20, y: 25, title: "How are you today?", body: "A month of moods, one emoji per day. Missed days are greyed out, and once the daily limit is reached the badge shows a timer and a tooltip instead." },
  { x: 50, y: 30, title: "Announcements", body: "Company news in a carousel above the feed, so it never buries people’s posts." },
  { x: 88, y: 38, title: "Workspace", body: "Every older feature, one tap away: top achievers, surveys, events, challenges, marketplace and albums." },
  { x: 20, y: 50, title: "Starting soon", body: "Surveys and events that are live or start within 24 hours, live ones first. Anything further out stays off the home screen." },
  { x: 52, y: 58, title: "Moments of empathy", body: "The feed itself: thank-yous, congratulations and posts from colleagues, with likes and comments." },
  { x: 88, y: 64, title: "Occasions this month", body: "Birthdays, work anniversaries and new colleagues. Past three people it reads “Roya and 4 others”; with nothing to celebrate, the card hides." },
  { x: 20, y: 66, title: "Top achievers", body: "Ranked by coins earned, not coins held, so spending your rewards never costs you your place." },
  { x: 20, y: 83, title: "Someone to thank", body: "The colleagues who’ve had the fewest gift cards from you, starting with your own groups, so recognition reaches the quiet people too." },
  { x: 88, y: 84, title: "Best sellers", body: "Popular marketplace rewards, each a tap from its details page." },
];

// Screens collected per product and area in the competitive analysis (1 = collected).
const research = {
  areas: ["Dashboard", "Posts", "Gift cards & rewards", "Marketplace", "Surveys", "Group events", "Other"],
  rows: [
    { name: "Motivosity", has: [1, 1, 1, 1, 1, 1, 0] },
    { name: "Bonusly", has: [1, 1, 1, 1, 0, 0, 0] },
    { name: "Empuls", has: [1, 1, 1, 1, 1, 1, 1] },
    { name: "Awardco", has: [1, 1, 1, 1, 0, 0, 1] },
    { name: "Kudos (Canada)", has: [1, 1, 1, 0, 1, 1, 1] },
    { name: "WorkTango", has: [1, 1, 1, 0, 1, 0, 1] },
    { name: "Bucketlist Rewards", has: [1, 1, 1, 1, 0, 0, 0] },
    { name: "Achievers", has: [1, 1, 1, 1, 0, 0, 1] },
  ],
};

const shifts = [
  { from: "A dashboard of widgets", to: "A feed of people", body: "Version 1 showed rows of surveys, events and cards to look at. Version 2 opens on what colleagues are saying to each other." },
  { from: "Recognition as one section", to: "Recognition as the first action", body: "Gift cards were one row among four. Now “Appreciation” is the first button on the page." },
  { from: "Everything, always", to: "Only what’s relevant", body: "Events show up a day before they start, occasions only when there are some, rial balances only if the company uses them." },
  { from: "Kudos’ brand", to: "The company’s brand", body: "The header now carries each company’s logo and name, and lets people who work for several companies switch between them." },
];







const adminPages: PageTab[] = [
  { id: "survey", label: "Survey results", src: `${IMG}/v2-d-survey-results.webp`, width: 2684, height: 1800, notes: ["Building a survey and reading it happen in one place: settings, questions, a results table, and analysis.", "Each question’s answers as a chart, with percentages.", "Inside the same management menu as everything else."] },
  { id: "events", label: "Events", src: `${IMG}/v2-d-events-admin.webp`, width: 2684, height: 1800, notes: ["Every event with its winner, participants, status, start and end.", "Prizes are free or paid in coins.", "Pick a winner straight from the row once an event ends."] },
  { id: "colleagues", label: "Colleagues", src: `${IMG}/admin-colleagues.webp`, width: 2684, height: 1800, notes: ["Everyone in the company, with their groups, coins and balance.", "A row menu for the four things HR does most: edit, add to a group, adjust coins or balance, remove.", "Add a colleague from the top of the table."] },
  { id: "groups", label: "Groups", src: `${IMG}/admin-groups.webp`, width: 2684, height: 1800, notes: ["Teams such as Technical, Finance, Development and Sales.", "Each group shows its head, its members and what it’s allowed to do.", "Permissions as chips, readable at a glance."] },
  { id: "access", label: "Access", src: `${IMG}/admin-access.webp`, width: 2684, height: 2218, notes: ["About eighteen permissions, from the social feed to the marketplace and medals.", "Grant each one to groups, not people, so access follows the org chart.", "One list to audit who can do what."] },
  { id: "mood", label: "Team mood", src: `${IMG}/admin-thermometer.webp`, width: 2684, height: 2172, notes: ["How the company feels, as a chart over time.", "How many colleagues took part.", "Each answer with its mood, tags and time, for HR to follow up."] },
];


const composerRules = [
  { k: "Recipient", v: "Anyone in the company. From an occasion card, it’s already filled in." },
  { k: "Message", v: "10 to 300 characters: long enough to be specific, short enough to read in the feed." },
  { k: "Values", v: "The company’s own values as hashtags, so thanks connect to what the company cares about." },
  { k: "Badge & coins", v: "An optional badge such as “Most committed”, and 5 to 30 coins." },
  { k: "Private", v: "A switch for thanks that shouldn’t be public: only the recipient and their manager see it." },
];

const socialRules = [
  { t: "Posts that write themselves", b: "Birthdays, new colleagues and work anniversaries post to the feed automatically, so nobody’s milestone depends on someone remembering." },
  { t: "Who can do what", b: "Everyone can reply to and report comments, and delete their own. Social-network admins can delete or report any post or comment." },
  { t: "Announcements stay announcements", b: "Company news can be liked but not commented on, so it never turns into a thread." },
  { t: "Likes you can see", b: "The heart turns red once you’ve liked a post; tap the count to see who. Admins also see view counts per post." },
  { t: "Challenges that update themselves", b: "A challenge post keeps its progress live; when it ends, Claim points opens the reward." },
];

const tour: TourScreen[] = [
  { src: `${IMG}/v2-m-feed.webp`, width: 750, height: 1624, label: "Feed", title: "The feed, one thumb wide.", body: "Announcements on top, then moments from colleagues, filterable by your groups. The red button starts a post or a thank-you from anywhere." },
  { src: `${IMG}/v2-m-appreciate.webp`, width: 750, height: 1652, label: "Appreciation", title: "Saying thanks, in one screen.", body: "Recipient, a message, company values, a badge, coins, and a private switch, all on one scroll, with limits written right under each field." },
  { src: `${IMG}/v2-m-post-comments.webp`, width: 750, height: 1612, label: "Post", title: "A post and its conversation.", body: "Likes, comments and quoted replies under a work-anniversary post. Deleting your own comment confirms with a quiet toast." },
  { src: `${IMG}/v2-m-profile.webp`, width: 750, height: 1624, label: "Profile", title: "A colleague, at a glance.", body: "Birthday, rank, coins, work anniversary, events and surveys in six tiles, then badges and trophy cups under Achievements." },
  { src: `${IMG}/v2-m-mood-checkin.webp`, width: 750, height: 1624, label: "Mood", title: "How are you, really?", body: "Five faces from great to very bad, optional reasons such as commute or team relations, and a single button: Submit confidentially." },
  { src: `${IMG}/v2-m-workspace.webp`, width: 750, height: 1624, label: "Workspace", title: "Everything else, one tap away.", body: "Marketplace, mood, challenges, events and surveys as tiles, with your mood calendar and what’s starting soon underneath." },
  { src: `${IMG}/v2-m-notifications.webp`, width: 750, height: 1622, label: "Notifications", title: "Act on it right there.", body: "Requests to join the company come with Approve and Reject in the notification itself, next to plain company notices." },
  { src: `${IMG}/v2-m-achievers.webp`, width: 750, height: 1624, label: "Top achievers", title: "Recognition, ranked fairly.", body: "Everyone’s trophies and coins earned, searchable and filterable. Earned, not held, so spending never costs anyone their place." },
];

const templates = [
  { k: "Birthday", t: "Happy birthday, {name}! {x} coins have been added to your wallet." },
  { k: "Anniversary", t: "To mark the {hiring / company} anniversary, {x} coins have been added to your wallet." },
  { k: "Joining Kudos", t: "Welcome to {company}! {x} coins have been added to your wallet." },
  { k: "Special gift", t: "{name}, for {reason}, you’ve been given {x} coins." },
  { k: "Auto top-up", t: "Your wallet was topped up automatically with {x}." },
  { k: "Deduction", t: "Because of {reason}, {x} was deducted from your wallet." },
];

const pricingRules = [
  { range: "1–50 users", rule: "Confirm and go straight to payment." },
  { range: "51–200 users", rule: "Pay now, or after a consultation and demo." },
  { range: "200+ users", rule: "The price is set after a consultation." },
];


const components = ["Button", "Text field", "Persian calendar", "Checkbox & radio", "Tooltip", "Snackbar", "Modal", "Empty state", "Skeleton", "Pagination", "Badge", "Toolbar", "Menu & header"];

const comingSoonList = ["Performance reviews", "Photo albums", "Petty cash", "Subscription management", "Marketplace", "Donations", "Integrations"];

/* ───────────── page ───────────── */

export function KudosLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative">
      <ReadingProgress />

      {/* 00 · Hero */}
      <section className="relative overflow-hidden pt-14 pb-0 text-white" style={{ background: `linear-gradient(135deg, ${C.deep} 0%, ${C.red} 60%, #f04b67 100%)` }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "radial-gradient(#fff 1.2px, transparent 1.4px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse at 25% 25%, #000 20%, transparent 70%)" }} />
        <div className={cn(wrap, "relative")}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-white px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.08em]" style={{ color: C.deep }}>B2B SaaS · HR</span>
              <span className="flex items-center gap-2 rounded-full border border-white/35 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.06em]">
                <span className="size-1.5 rounded-full bg-[#ffd166]" /> Live with real companies
              </span>
            </div>
            <h1 className="mt-8 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] tracking-tight">Kudos</h1>
            <p className="mt-6 max-w-3xl font-display text-2xl text-white/90 leading-snug sm:text-[2.1rem]">
              A thank-you at work is easy to say and easy to forget. Kudos makes it visible, gives it value, and shows HR whether it’s happening.
            </p>
          </Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-white/30 border-y py-6 sm:grid-cols-4">
            {[
              ["Role", "Product Designer, Novaday"],
              ["Timeline", periodLabel(cs) ?? "—"],
              ["Platform", "Web, responsive to mobile"],
              ["Team", "PM, QA and engineering"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.72rem] text-white/65 uppercase tracking-[0.06em]">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>
          <Reveal className="relative mx-auto mt-14 max-w-5xl translate-y-10" delay={0.1}>
            <MacBook>
              <Image alt="The Kudos feed: appreciation posts, announcements, a mood calendar, balances and occasions" className="block h-auto w-full" height={2140} priority sizes="(min-width: 1024px) 70vw, 100vw" src={`${IMG}/feed.webp`} width={2684} />
            </MacBook>
          </Reveal>
        </div>
      </section>

      {/* In short */}
      <section className={cn(wrap, "relative z-10 pt-24 pb-8")}>
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-3">
          {[
            ["The product", "Employee-recognition software: colleagues thank each other with gift cards and coins, and HR runs surveys, events, challenges and onboarding in the same place."],
            ["My role", "Product designer at Novaday: the redesign from a dashboard to a social network, the employee side and the HR admin, and the shared design system."],
            ["Where it is", "Live, used by real companies. By my count, around 500 people use it."],
          ].map(([k, v]) => (
            <RevealItem className="bg-paper p-7" key={k}>
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">{k}</p>
              <p className="mt-3 leading-relaxed">{v}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 01 · Who it's for */}
      <section className={cn(wrap, "py-24")}>
        <Chapter label="Who it’s for" n="01" title="Three sides of one thank-you.">
          <p>Kudos sits between the people who recognise each other, the HR team that wants a culture of it, and the company that runs the product.</p>
        </Chapter>
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {roles.map((r, i) => (
            <RevealItem className="relative overflow-hidden rounded-3xl border border-rule bg-paper p-8" key={r.tag}>
              <span aria-hidden className="absolute -top-14 -right-14 size-36 rounded-full opacity-15" style={{ background: i === 1 ? C.deep : C.red }} />
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase">0{i + 1}</p>
              <p className="mt-4 font-display text-3xl">{r.tag}</p>
              <p className="mt-3 text-ink-soft leading-relaxed">{r.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 02 · The challenge */}
      <section className="py-24 text-white" style={{ background: C.ink }}>
        <div className={wrap}>
          <Chapter dark label="The challenge" n="02" title="A big product, with many hands on it.">
            <p>The Figma file runs to more than seventy pages. Engineers, a PM and QA all worked from it, so anything left unclear on a screen became a question, a guess or a bug.</p>
          </Chapter>
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
            {tensions.map((t, i) => (
              <RevealItem className="rounded-2xl border border-white/12 bg-white/[0.04] p-7" key={t.title}>
                <p className="font-mono text-[#ffb3c0] text-xs">0{i + 1}</p>
                <p className="mt-6 font-display text-2xl leading-tight">{t.title}</p>
                <p className="mt-3 text-white/70 leading-relaxed">{t.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 · The redesign */}
      <section className="relative overflow-hidden py-28" style={{ background: `color-mix(in oklab, ${C.red} 9%, var(--paper))` }}>
        <div className={wrap}>
          <Reveal>
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">03</span> · The turning point</p>
            <p className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
              Recognition is social. So the home screen stopped being a <span className="line-through decoration-[#E6294D]/60">dashboard</span> and became a{" "}
              <span style={{ color: C.red }}>social network</span>.
            </p>
            <p className="mt-6 max-w-2xl text-ink-soft text-lg leading-relaxed">
              Version 1 worked, but it treated a thank-you as one widget among many: something to look at, not something to join. For version 2 I
              redesigned the home screen around people talking to each other, and moved everything else one tap away.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <BeforeAfter
              accent={C.red}
              after={`${IMG}/ba-v2.webp`}
              afterAlt="Kudos version 2: a social feed with a composer, announcements, posts, moods and occasions"
              afterLabel="v2 · Social"
              before={`${IMG}/ba-v1.webp`}
              beforeAlt="Kudos version 1: a dashboard of balances, surveys, events, gift cards and challenge prizes"
              beforeLabel="v1 · Dashboard"
              height={1800}
              width={2560}
            />
            <p className="mt-4 font-mono text-[0.75rem] text-ink-soft">Drag the handle, or focus it and use ← →.</p>
          </Reveal>

          {/* The research that pointed there. */}
          <div className="mt-20 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase">Competitive analysis</p>
              <h3 className="mt-3 font-display text-3xl leading-tight">Eight products, seven areas.</h3>
              <p className="mt-4 text-ink-soft leading-relaxed">
                I collected screens from eight recognition products, area by area. Every one of them had a place to post and see recognition in
                public. Only three ran group events. The feed wasn’t a trend to copy; it was the core of the category, and version 1’s home didn’t have one.
              </p>
            </Reveal>
            <Reveal className="overflow-x-auto lg:col-span-8" delay={0.06}>
              <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-transparent p-2 text-left font-normal text-ink-soft" />
                    {research.areas.map((a) => (
                      <th className={cn("p-2 text-center font-mono text-[0.68rem] uppercase leading-tight", a === "Posts" ? "text-signal" : "text-ink-soft")} key={a}>{a}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {research.rows.map((r) => (
                    <tr key={r.name}>
                      <td className="whitespace-nowrap border-rule border-t py-2.5 pr-3">{r.name}</td>
                      {r.has.map((h, i) => (
                        <td className={cn("border-rule border-t p-2 text-center", research.areas[i] === "Posts" && "bg-[#E6294D]/8")} key={`${r.name}-${research.areas[i]}`}>
                          {h ? <span className="inline-block size-3 rounded-full" style={{ background: research.areas[i] === "Posts" ? C.red : "color-mix(in oklab, var(--ink) 55%, transparent)" }} /> : <span className="text-ink-soft/40">·</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 font-mono text-[0.68rem] text-ink-soft">● screens collected for that area · Posts highlighted</p>
            </Reveal>
          </div>

          <RevealGroup className="mt-20 grid gap-4 md:grid-cols-2">
            {shifts.map((x) => (
              <RevealItem className="rounded-2xl border border-rule bg-paper p-6" key={x.to}>
                <p className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-ink-soft line-through">{x.from}</span>
                  <span aria-hidden className="text-ink-soft">→</span>
                  <span className="font-medium" style={{ color: C.red }}>{x.to}</span>
                </p>
                <p className="mt-3 text-ink-soft leading-relaxed">{x.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 · Employee home */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="The new home" n="04" title="Every block has a rule behind it.">
            <p>A feed looks simple. What makes it work is what each block decides to show, and when. Hover the markers for the rules I wrote beside each one.</p>
          </Chapter>
          <div className="mt-14">
            <Hotspots alt="The Kudos feed, annotated" height={2140} points={feedPoints} src={`${IMG}/feed.webp`} tone="red" width={2684} />
          </div>
        </div>
      </section>

      {/* Composer */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-12")}>
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">05</span> · Appreciation</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">A thank-you worth reading.</h2>
            <p className="mt-6 max-w-xl text-ink-soft leading-relaxed">
              Generic thanks are easy to ignore. The composer nudges people to be specific and ties each thank-you to something the company values.
            </p>
            <RevealGroup className="mt-8 divide-y divide-rule border-rule border-y">
              {composerRules.map((r) => (
                <RevealItem className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-6" key={r.k}>
                  <p className="font-medium" style={{ color: C.red }}>{r.k}</p>
                  <p className="text-ink-soft leading-relaxed">{r.v}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
          <Reveal className="order-1 mx-auto w-[250px] sm:w-[290px] lg:order-2 lg:col-span-4 lg:col-start-9" delay={0.08}>
            <IPhoneShot alt="The appreciation composer: recipient, message, values, badge, coins and a private switch" className="[&_img]:aspect-[375/812] [&_img]:object-cover [&_img]:object-top" height={1652} sizes="290px" src={`${IMG}/v2-m-appreciate.webp`} width={750} />
          </Reveal>
        </div>
      </section>

      {/* Social layer */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="The social layer" n="06" title="A feed needs rules, not just posts.">
            <p>Once people can post and comment at work, every interaction needs a clear owner. These are the rules I wrote beside the screens.</p>
          </Chapter>
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-7">
              <MacBook>
                <div className="relative aspect-[16/10] overflow-y-auto overscroll-contain">
                  <Image alt="A post opened in the feed, with comments, a quoted reply and emoji reactions" className="block h-auto w-full" height={2140} sizes="(min-width: 1024px) 55vw, 100vw" src={`${IMG}/v2-d-post-comments.webp`} width={2684} />
                </div>
              </MacBook>
              <p className="mt-3 font-mono text-[0.7rem] text-ink-soft">Scroll inside the screen.</p>
            </Reveal>
            <RevealGroup className="space-y-3 lg:col-span-5">
              {socialRules.map((r, i) => (
                <RevealItem className="rounded-2xl border border-rule bg-paper p-5" key={r.t}>
                  <p className="flex items-baseline gap-3 font-medium"><span className="font-mono text-signal text-xs">0{i + 1}</span>{r.t}</p>
                  <p className="mt-2 text-ink-soft text-sm leading-relaxed">{r.b}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Dark mode */}
      <section className="py-24 text-white" style={{ background: "#0F1922" }}>
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[#ffb3c0] text-[0.78rem] uppercase tracking-[0.06em]"><span className="text-white">06b</span> · Dark mode</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05]">The same feed, after hours.</h2>
            <p className="mt-6 text-white/70 leading-relaxed">
              Version 2 added a dark theme, switched from the moon in the header. Each company’s logo sits on a white chip so it stays legible on navy.
              Drag to compare.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <BeforeAfter accent={C.red} after={`${IMG}/v2-d-dark-mode.webp`} afterAlt="The Kudos feed in dark mode" afterLabel="Dark" before={`${IMG}/feed.webp`} beforeAlt="The Kudos feed in light mode" beforeLabel="Light" height={2140} width={2684} />
          </Reveal>
        </div>
      </section>

      {/* 05b · One dialog, many moments */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Rewards" n="06b" title="One dialog, many moments.">
            <p>Coins arrive for many reasons. Instead of a screen for each, I designed one congratulations dialog for web and mobile, with a message template per occasion and an image each company can swap for its own coin or medal.</p>
          </Chapter>
          <Reveal className="mt-12 overflow-hidden rounded-3xl bg-[#3a3a3c] p-4 sm:p-8">
            <Image alt="Congratulations dialogs for a mood check, survey votes, a Commitment badge and a company anniversary" className="mx-auto block h-auto w-full max-w-5xl" height={968} sizes="(min-width: 1024px) 70vw, 100vw" src={`${IMG}/congrats.webp`} width={3032} />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <RevealItem className="rounded-2xl border border-rule bg-paper p-5" key={t.k}>
                <p className="font-mono text-[0.7rem] text-ink-soft uppercase">{t.k}</p>
                <p className="mt-2 leading-relaxed">
                  {t.t.split(/(\{[^}]+\})/).map((part, i) =>
                    part.startsWith("{") ? (
                      <span className="rounded bg-[#E6294D]/12 px-1 font-mono text-[0.85em] text-[#B5153A] dark:text-[#ff8da0]" key={`${t.k}-${i}`}>{part}</span>
                    ) : (
                      part
                    )
                  )}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-4 font-mono text-[0.72rem] text-ink-soft">Templates from my note in the file, translated. Anything else falls back to a plain version of the same dialog.</p>
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h3 className="font-display text-3xl leading-tight">And somewhere to spend them.</h3>
              <p className="mt-4 text-ink-soft leading-relaxed">Coins turn into real rewards in the company marketplace: photos, what you get, how long it’s valid, how many are left, and the price in coins on one red button.</p>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.08}>
              <MacBook>
                <Image alt="A marketplace item: a park ticket with photos, validity, stock and a Buy with 10 coins button" className="block h-auto w-full" height={1800} sizes="(min-width: 1024px) 60vw, 100vw" src={`${IMG}/v2-d-marketplace-product.webp`} width={2684} />
              </MacBook>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Admin */}
      {
        <section className="py-24">
          <div className={wrap}>
            <Chapter label="Admin" n="10" title="Running it: the admin side.">
              <p>Behind every feature sits a module HR controls, plus the pages that decide who can do what. Pick a page.</p>
            </Chapter>
            <div className="mt-12">
              <PageSwitcher accent={C.red} altSuffix="in the Kudos admin" pages={adminPages} />
            </div>
          </div>
        </section>
      }

      {/* 09b · Pricing rules */}
      <section className="border-rule border-t py-24">
        <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">10b</span> · Pricing</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05]">One form, three paths.</h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Companies sign up through a single setup form. The plan period defaults to a year and the per-user price updates live as you change it.
              What happens next depends on the size of the company:
            </p>
            <ol className="mt-6 space-y-3">
              {pricingRules.map((r, i) => (
                <li className="flex items-start gap-4 rounded-2xl border border-rule bg-paper p-4" key={r.range}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full font-mono text-sm text-white" style={{ background: C.red }}>{i + 1}</span>
                  <span><span className="block font-medium">{r.range}</span><span className="text-ink-soft text-sm">{r.rule}</span></span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <MacBook>
              <Image alt="The Kudos consultation and setup form, with plan periods and a live per-user price" className="block h-auto w-full" height={1800} sizes="(min-width: 1024px) 55vw, 100vw" src={`${IMG}/pricing.webp`} width={2684} />
            </MacBook>
          </Reveal>
        </div>
      </section>

      {/* Mobile */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Mobile" n="11" title="Version 2, in your pocket.">
            <p>The latest mobile app: a three-tab bar, a floating button for posting and saying thanks, and every feature from the web. Pick a screen.</p>
          </Chapter>
          <div className="mt-14">
            <ScreenTour accent={C.red} screens={tour} />
          </div>
        </div>
        <div className={cn(wrap, "mt-24")}>
          <Reveal>
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">11b</span> · The unhappy paths</p>
            <h3 className="mt-4 font-display text-3xl">Designed too: what people see when things go wrong.</h3>
          </Reveal>
          <div className="mt-10 grid items-end gap-8 md:grid-cols-[2fr_1fr]">
            <Reveal>
              <MacBook>
                <Image alt="A 404 page: the page you’re looking for wasn’t found, with a button back home" className="block h-auto w-full" height={1800} sizes="(min-width: 768px) 45vw, 100vw" src={`${IMG}/error-404.webp`} width={2880} />
              </MacBook>
              <p className="mt-3 font-mono text-[0.7rem] text-ink-soft uppercase">Not found</p>
            </Reveal>
            <Reveal className="mx-auto w-[200px]" delay={0.06}>
              <IPhoneShot alt="Offline screen: your device isn’t connected to the internet, with a Retry button" height={1852} sizes="200px" src={`${IMG}/error-offline-mobile.webp`} width={856} />
              <p className="mt-3 text-center font-mono text-[0.7rem] text-ink-soft uppercase">Offline</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11 · Design system */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Design system" n="12" title="One kit for two products.">
            <p>Kudos runs on a Tailwind-based system with a shared UI kit and variables. The same foundation also carried Remeet, the team’s access and meeting product, which won at Tehran Design Week.</p>
          </Chapter>
          <RevealGroup className="mt-12 flex flex-wrap gap-2">
            {components.map((c) => (
              <RevealItem className="rounded-full border border-rule bg-paper px-4 py-2 text-sm" key={c}>{c}</RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-3xl border border-rule bg-[#FAFAFA] p-6 text-[#1d1d1f]">
              <p className="font-mono text-[0.72rem] text-[#6e6e73] uppercase">Light</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[["Primary", "#E6294D"], ["Background", "#FAFAFA"], ["Surface", "#FFFFFF"], ["Subtle", "#F6F6F6"]].map(([n, h]) => (
                  <div key={n}><div className="aspect-square rounded-xl ring-1 ring-black/10" style={{ background: h }} /><p className="mt-2 text-xs">{n}</p><p className="font-mono text-[0.65rem] text-[#6e6e73]">{h}</p></div>
                ))}
              </div>
            </Reveal>
            <Reveal className="rounded-3xl bg-[#0F1922] p-6 text-white" delay={0.06}>
              <p className="font-mono text-[0.72rem] text-white/50 uppercase">Dark</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[["Primary", "#E6294D"], ["Background", "#0F1922"], ["Surface", "#243443"], ["Text", "#FFFFFF"]].map(([n, h]) => (
                  <div key={n}><div className="aspect-square rounded-xl ring-1 ring-white/15" style={{ background: h }} /><p className="mt-2 text-xs">{n}</p><p className="font-mono text-[0.65rem] text-white/50">{h}</p></div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-6 flex flex-wrap gap-6">
            {[["Success", "#34C759"], ["Info", "#00C7BE"], ["Warning", "#FFCC00"], ["Danger", "#FF3B30"]].map(([n, h]) => (
              <span className="flex items-center gap-2 text-sm" key={n}><span className="size-5 rounded-full" style={{ background: h }} />{n} <span className="font-mono text-ink-soft text-xs">{h}</span></span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 12 · Where it stands */}
      <section className="py-24 text-white" style={{ background: C.red }}>
        <div className={wrap}>
          <Chapter dark label="Where it stands" n="13" title="Shipped, and in use.">
            <p>Kudos is live with real companies; by my count, around 500 people use it. I can’t attribute numbers to single design decisions, so I won’t.</p>
          </Chapter>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-2xl border border-white/30 p-7">
              <p className="font-mono text-white/75 text-xs uppercase">Shipped</p>
              <ul className="mt-4 space-y-2 text-white/95">
                <li>Version 2: the social-network redesign</li>
                <li>Employee side, web and mobile</li>
                <li>HR admin and dashboard</li>
                                <li>Design system and handoff notes</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/30 p-7" delay={0.08}>
              <p className="font-mono text-white/75 text-xs uppercase">Designed for later</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {comingSoonList.map((c) => (
                  <li className="rounded-full bg-white/15 px-3 py-1 text-sm" key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl bg-white p-7 text-[#2a0a12]" delay={0.16}>
              <p className="font-mono text-xs uppercase" style={{ color: C.deep }}>What I took away</p>
              <p className="mt-4 leading-relaxed">
                In a product this size, the design file is a shared workspace, not a gallery. Writing the rules beside the screens made the handoff
                calmer for everyone, and it’s a habit I’ve kept on every project since.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
