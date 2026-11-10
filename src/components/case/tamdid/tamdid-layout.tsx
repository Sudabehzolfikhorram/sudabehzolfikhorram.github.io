// Tamdid: a fintech product for renewals (mobile charge, internet, game
// credit), wallets and the people who pay for each other. Told as a story
// (NN/g story mountain): who it's for → what made it hard → the insight →
// how the design answers it → where it stands. Every screen is Sudabeh's own
// Figma work; nothing here claims results the product hasn't had yet.

import { Vazirmatn } from "next/font/google";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { periodLabel, wrap } from "../blocks";
import { IPhoneShot, MacBook } from "../devices";
import { BeforeAfter, type PageTab, PageSwitcher } from "../novin/interactive";
import { ReadingProgress } from "../novin/reading-progress";
import { type FlowStep, FlowStepper } from "./flow";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"] });
const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work/tamdid`;

// Brand values from the Tamdid Figma file (Color palette page).
const C = { primary: "#6179D9", active: "#3A58D0", hover: "#2E46A6", mint: "#7AC6D3", night: "#141a3a" };

const Chapter = ({ n, label, title, children, dark }: { n: string; label: string; title: React.ReactNode; children?: React.ReactNode; dark?: boolean }) => (
  <Reveal className="grid gap-6 lg:grid-cols-12">
    <div className="lg:col-span-7">
      <p className={cn("font-mono text-[0.78rem] uppercase tracking-[0.06em]", dark ? "text-[#9fb0f0]" : "text-ink-soft")}>
        <span className={dark ? "text-white" : "text-signal"}>{n}</span> · {label}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
    </div>
    {children && <div className={cn("space-y-3 self-end leading-relaxed lg:col-span-4 lg:col-start-9", dark ? "text-white/75" : "text-ink-soft")}>{children}</div>}
  </Reveal>
);

const Phone = ({ src, alt, w = 750, h = 1624, label, className, priority }: { src: string; alt: string; w?: number; h?: number; label?: string; className?: string; priority?: boolean }) => (
  <figure className={className}>
    <IPhoneShot alt={alt} height={h} priority={priority} sizes="(min-width: 640px) 280px, 60vw" src={`${IMG}/${src}.webp`} width={w} />
    {label && <figcaption className="mt-4 text-center font-mono text-[0.72rem] text-ink-soft uppercase">{label}</figcaption>}
  </figure>
);

/** A tall phone screen cropped to the device, the way it looks on first open. */
const PhoneTop = ({ src, alt, label, className }: { src: string; alt: string; label?: string; className?: string }) => (
  <figure className={className}>
    <div className="relative">
      <IPhoneShot alt={alt} className="[&_img]:aspect-[375/812] [&_img]:object-cover [&_img]:object-top" height={1624} sizes="(min-width: 640px) 280px, 60vw" src={`${IMG}/${src}.webp`} width={750} />
    </div>
    {label && <figcaption className="mt-4 text-center font-mono text-[0.72rem] text-ink-soft uppercase">{label}</figcaption>}
  </figure>
);

/* ───────────── content ───────────── */

const roles = [
  {
    tag: "Role 01",
    name: "The person renewing",
    body: "Tops up mobile charge, internet or UC (PUBG game credit) for themselves, or sends it to someone as a gift. They want it done in seconds and want to know it worked.",
    needs: ["Find the number fast", "Repeat last month’s package", "A clear receipt"],
  },
  {
    tag: "Role 02",
    name: "The manager",
    body: "Funds the wallets of a group of contacts, approves their top-up requests, records money received and paid, and earns a commission on their purchases.",
    needs: ["Who owes, who’s in credit, who’s settled", "Requests in one place", "A record of every payment"],
  },
];

const tensions = [
  { title: "Two jobs, one interface", body: "A manager is also an everyday buyer. Their tools had to sit beside quick purchases without turning the app into accounting software." },
  { title: "Money in more than one pocket", body: "A contact can hold credit in their own wallet and in wallets their managers fund. Paying had to make that obvious, not confusing." },
  { title: "A chore people put off", body: "Renewing is repetitive and easy to forget until the data runs out. The product needed a reason to come back before that moment." },
];

const answers = [
  { n: "01", title: "Repeat in one tap", body: "Previous purchases sit at the top of every buy screen, each with a Renew button. Same number, same package, done.", img: "f-buy" },
  { n: "02", title: "Pay from where the money is", body: "The payment screen shows the total across wallets, lets you tick which to use, and spells out the order they’ll be charged in.", img: "f-pay" },
  { n: "03", title: "Reward the real task", body: "Points, challenges and missions are earned by doing what Tamdid is for: buying, recording payments, inviting people.", img: "m-league" },
];

const flow: FlowStep[] = [
  { id: "who", n: "1", title: "Choose who", body: "Search by name or number, switch between Tamdid contacts and phone contacts, or tap Renew on a previous purchase.", shot: { src: `${IMG}/f-buy.webp`, alt: "Buy internet: search, contact tabs and previous purchases, each with a Renew button", width: 750, height: 1624 } },
  { id: "sub", n: "1b", branch: true, title: "No subscription yet", body: "Premium features open a friendly sheet that explains the subscription, with an equally clear way back.", shot: { src: `${IMG}/f-pkg.webp`, alt: "A bottom sheet inviting the user to activate a subscription, with a Back button", width: 750, height: 1624 } },
  { id: "pkg", n: "2", title: "Pick a package", body: "Once the number is recognised, packages appear in that operator’s colours, so the right network is obvious at a glance." },
  { id: "pay", n: "3", title: "Pay", body: "The total available, which wallets to use and the order they’ll be charged in. A small note shows the points this payment earns.", shot: { src: `${IMG}/f-pay.webp`, alt: "Payment: operator, package, wallets to pay from with checkboxes, the charge order and a points note", width: 750, height: 1624 } },
  { id: "low", n: "3b", branch: true, title: "Not enough balance", body: "Top up right there in a sheet, with preset amounts, instead of leaving the purchase half done.", shot: { src: `${IMG}/f-low.webp`, alt: "A top-up sheet over the payment screen, with preset amounts and a keypad", width: 750, height: 1624 } },
  { id: "receipt", n: "4", title: "Receipt", body: "Success or failure, the balance after the payment, whether it counts in the account between you and the contact, and the points earned.", shot: { src: `${IMG}/f-receipt.webp`, alt: "An internet purchase receipt with payment status, contact balance, account toggles and points earned", width: 750, height: 1832 } },
];

const ia = [
  { group: "Get in", items: ["Onboarding", "Sign up & log in", "Phone or email code", "Google · Apple"] },
  { group: "Buy", items: ["Mobile charge", "Internet packages", "UC game credit", "Receipts"] },
  { group: "Money", items: ["Wallet & top-up", "Transfer credit", "Top-up requests", "Transactions", "Live rates", "Commission"] },
  { group: "People", items: ["Contacts", "Managers", "Invitations", "Renewal link"] },
  { group: "Play", items: ["Levels", "Tamdid League", "Daily challenge", "Missions", "Achievements"] },
  { group: "You", items: ["Profile", "Gold subscription", "Notifications", "Settings & support"] },
];

const roleDetails = [
  { title: "Requests, not chasing", body: "Contacts ask for a wallet top-up from inside the app. Managers see every request in their wallet and approve it, or open it for review." },
  { title: "Balances by person", body: "Contact and manager lists show at a glance who is in credit, who owes and who is settled." },
  { title: "Two names for one person", body: "Everyone keeps their own name, and a manager can save them under another: “Roya” can also be “Roya, colleague at Asad”." },
  { title: "Every payment on the record", body: "Receipts say whether a purchase counts in the account between you and that contact, so the books keep themselves." },
];

const game = [
  { title: "Levels", body: "A progress bar to the next level, with a short nudge: “Halfway there. Keep going!”" },
  { title: "Tamdid League", body: "Bronze, Silver, Gold and Diamond. Your points this month, your rank, and whether you’re in the promotion or relegation zone. It resets every month." },
  { title: "Daily challenge", body: "Three real tasks on a 24-hour timer: buy charge or internet, record a payment, check live rates." },
  { title: "Missions & badges", body: "Invite friends, buy UC, transfer credit to contacts. Robot badges such as Invite Champion and Billionaire mark the milestones." },
];

const leagues = [
  { name: "Bronze", from: "#c98a5a", to: "#8e5a36" },
  { name: "Silver", from: "#d7dbe4", to: "#8c93a3" },
  { name: "Gold", from: "#ffd76a", to: "#d39b00" },
  { name: "Diamond", from: "#c9d3ff", to: "#8a7ce8" },
];

const webPages: PageTab[] = [
  {
    id: "home",
    label: "Home",
    src: `${IMG}/d-dashboard.webp`,
    width: 1440,
    height: 1133,
    notes: [
      "Bottom navigation becomes tabs across the top: Home, Wallet, Contacts, Managers, Tamdid League, Invitations.",
      "Quick buys, the daily challenge and live rates move to a side panel that stays put on every tab.",
      "The transactions list becomes a full table with columns and pagination.",
    ],
  },
  {
    id: "wallet",
    label: "Wallet",
    src: `${IMG}/d-wallet.webp`,
    width: 1440,
    height: 1133,
    notes: [
      "Commission and wallet balance side by side, each with its own actions.",
      "Top-up requests get a table with Received and Sent tabs, and Approve or Review on each row.",
      "Requests sit above transactions, because they need an answer and transactions don’t.",
    ],
  },
  {
    id: "profile",
    label: "Profile & league",
    src: `${IMG}/d-gamification.webp`,
    width: 1440,
    height: 1448,
    notes: [
      "Profile facts (level, league, total points) as a row of tiles.",
      "League, daily challenge and missions reuse the mobile components, laid out wider.",
      "Badges get room to breathe: the robot mascot in each achievement.",
    ],
  },
  {
    id: "onboarding",
    label: "Sign in",
    src: `${IMG}/d-onboarding.webp`,
    width: 1440,
    height: 1024,
    notes: [
      "One card: the promise on the left, the phone number on the right.",
      "“All your financial needs in one app”, then two reasons why: instant renewal, everything in one place.",
      "Google and Apple sign-in under the phone field, with the terms in one line.",
    ],
  },
];

const labels = [
  { fa: "انتقال اعتبار", en: "Transfer Credit" },
  { fa: "قیمت لحظه‌ای", en: "Live Rates" },
  { fa: "اشتراک طلایی", en: "Gold Subscription" },
  { fa: "افزایش موجودی", en: "Top Up" },
  { fa: "لینک تمدید", en: "Renewal Link" },
  { fa: "موجودی کیف پول", en: "Wallet Balance" },
];

const light = [
  { name: "Primary", hex: "#6179D9" },
  { name: "Active button", hex: "#3A58D0" },
  { name: "Hover", hex: "#2E46A6" },
  { name: "Secondary", hex: "#3D8FD8" },
  { name: "Mint", hex: "#7AC6D3" },
  { name: "Background", hex: "#F5F7FA" },
];
const dark = [
  { name: "Background", hex: "#1D1D1D" },
  { name: "Surface", hex: "#262626" },
  { name: "Raised", hex: "#323232" },
  { name: "Primary text", hex: "#899BE3" },
];
const status = [
  { name: "Success", hex: "#2ECC71" },
  { name: "Info", hex: "#2D9CCF" },
  { name: "Warning", hex: "#FFCC00" },
  { name: "Danger", hex: "#E6352B" },
];

/* ───────────── page ───────────── */

export function TamdidLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative">
      <ReadingProgress />

      {/* 00 · Hero */}
      <section className="relative overflow-hidden pt-14 pb-0 text-white" style={{ background: `linear-gradient(135deg, ${C.active} 0%, ${C.primary} 55%, #7d93e4 100%)` }}>
        <div aria-hidden className="absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(122_198_211/0.55),transparent)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.1]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse at 30% 20%, #000 25%, transparent 70%)" }}
        />
        <div className={cn(wrap, "relative")}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-white px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.08em]" style={{ color: C.active }}>Fintech · 0 → 1</span>
              <span className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.06em]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#7AC6D3]" /> {cs.status}
              </span>
            </div>
            <h1 className="mt-8 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] tracking-tight">Tamdid</h1>
            <p className="mt-6 max-w-3xl font-display text-2xl text-white/90 leading-snug sm:text-[2.1rem]">
              Topping up a phone takes a minute. Doing it for a whole group, and keeping track of who owes what, takes a lot longer. Tamdid handles both.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-white/25 border-y py-6 sm:grid-cols-4">
            {[
              ["Role", "Sole product designer"],
              ["Timeline", periodLabel(cs) ?? "—"],
              ["Platforms", "Mobile, web, tablet"],
              ["Languages", "Persian (RTL) & English"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.72rem] text-white/60 uppercase tracking-[0.06em]">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Three real screens, fanned, rising out of the hero. */}
          <div className="mx-auto mt-16 flex max-w-4xl items-end justify-center gap-4 sm:gap-8">
            <Reveal className="hidden w-1/4 translate-y-10 -rotate-6 sm:block" delay={0.15}>
              <PhoneTop alt="Tamdid profile with level, Tamdid League card, daily challenge and missions" src="m-league" />
            </Reveal>
            <Reveal className="w-[62%] translate-y-6 sm:w-1/3" delay={0.05}>
              <PhoneTop alt="Tamdid home: wallet balance, quick actions, live rates and transactions" src="m-dashboard" />
            </Reveal>
            <Reveal className="hidden w-1/4 translate-y-10 rotate-6 sm:block" delay={0.25}>
              <PhoneTop alt="Tamdid payment: choosing which wallets to pay from" src="f-pay" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* In short: front-loaded for people who skim. */}
      <section className={cn(wrap, "relative z-10 -mt-6 pb-8")}>
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule shadow-[0_30px_60px_-40px_rgb(20_30_90/0.5)] md:grid-cols-3">
          {[
            ["The product", "Mobile charge, internet packages and game credit, for yourself or for others, paid from one wallet, with a monthly league that rewards keeping up."],
            ["My role", "The only designer, from the first idea to developer handoff: flows, information architecture, UI, design system, then web, tablet and English."],
            ["Where it is", "Design complete across twelve feature areas, in light and dark. Now in development."],
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
        <Chapter label="Who it’s for" n="01" title="Two people, one app.">
          <p>
            <em>Tamdid</em> means “renewal” in Persian. It’s for the small purchases that come round every month, and for the people who
            make them on someone else’s behalf.
          </p>
        </Chapter>
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {roles.map((r, i) => (
            <RevealItem className="relative overflow-hidden rounded-3xl border border-rule bg-paper p-8" key={r.name}>
              <span aria-hidden className="absolute -top-16 -right-16 size-44 rounded-full opacity-20" style={{ background: i ? C.mint : C.primary }} />
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase">{r.tag}</p>
              <p className="mt-4 font-display text-3xl">{r.name}</p>
              <p className="mt-3 text-ink-soft leading-relaxed">{r.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {r.needs.map((n) => (
                  <li className="rounded-full bg-paper-2 px-3 py-1.5 text-sm" key={n}>{n}</li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 02 · What made it hard (rising action) */}
      <section className="py-24 text-white" style={{ background: C.night }}>
        <div className={wrap}>
          <Chapter dark label="The challenge" n="02" title="Small payments. Lots of them. From more than one pocket.">
            <p>Each purchase is simple. What makes Tamdid hard is everything around it: who pays, from which wallet, and why anyone would open the app before they have to.</p>
          </Chapter>
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
            {tensions.map((t, i) => (
              <RevealItem className="rounded-2xl border border-white/12 bg-white/[0.04] p-7" key={t.title}>
                <p className="font-mono text-[#9fb0f0] text-xs">0{i + 1}</p>
                <p className="mt-6 font-display text-2xl leading-tight">{t.title}</p>
                <p className="mt-3 text-white/70 leading-relaxed">{t.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 · The insight (climax) */}
      <section className="relative overflow-hidden py-28" style={{ background: `color-mix(in oklab, ${C.primary} 12%, var(--paper))` }}>
        <div className={wrap}>
          <Reveal>
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">03</span> · The insight</p>
            <p className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
              Nobody renews <span style={{ color: C.active }}>once</span>. So I designed for the second purchase, not the first.
            </p>
            <p className="mt-6 max-w-2xl text-ink-soft text-lg leading-relaxed">
              Most purchases are repeats: the same number, the same package, often for the same person, month after month. That one idea
              shaped the buy screens, the wallet and the game.
            </p>
          </Reveal>
          <RevealGroup className="mt-16 grid gap-10 md:grid-cols-3">
            {answers.map((a) => (
              <RevealItem key={a.n}>
                <PhoneTop alt={a.title} className="mx-auto w-[220px]" src={a.img} />
                <p className="mt-8 font-mono text-signal text-sm">{a.n}</p>
                <p className="mt-2 font-display text-2xl">{a.title}</p>
                <p className="mt-2 text-ink-soft leading-relaxed">{a.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 · Information architecture */}
      <section className={cn(wrap, "py-24")}>
        <Chapter label="Structure" n="04" title="Twelve areas. One home screen.">
          <p>I mapped the product as a sitemap in FigJam. The home screen’s quick actions are the map’s main branches, so everything is one tap from home.</p>
        </Chapter>
        <Reveal className="mt-14">
          <div className="flex justify-center">
            <span className="rounded-2xl px-6 py-3 font-medium text-white shadow-[0_14px_30px_-14px_rgb(58_88_208/0.8)]" style={{ background: C.active }}>Home</span>
          </div>
          <div aria-hidden className="mx-auto h-8 w-px bg-rule" />
          <div aria-hidden className="mx-auto hidden h-px w-[calc(100%-16.66%)] bg-rule lg:block" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ia.map((g) => (
              <div className="relative pt-6" key={g.group}>
                <span aria-hidden className="absolute top-0 left-1/2 hidden h-6 w-px bg-rule lg:block" />
                <div className="h-full rounded-2xl border border-rule bg-paper p-4">
                  <p className="font-medium">{g.group}</p>
                  <ul className="mt-3 space-y-1.5 text-ink-soft text-sm">
                    {g.items.map((it) => (
                      <li className="flex items-center gap-2" key={it}>
                        <span className="size-1 shrink-0 rounded-full" style={{ background: C.primary }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 05 · The core flow */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Core flow" n="05" title="Buying internet for someone else.">
            <p>Pick a step to see the screen. Charge and UC follow the same pattern, each with side paths for adding a new contact and running out of balance, on mobile and desktop.</p>
          </Chapter>
          <div className="mt-14">
            <FlowStepper accent={C.active} steps={flow} />
          </div>
        </div>
      </section>

      {/* 06 · Two roles */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="The manager’s side" n="06" title="One app. Two jobs.">
            <p>Managers don’t get a separate app. Their tools appear where the money already is: in the wallet, the contact list and the receipt.</p>
          </Chapter>
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
            <div className="flex justify-center gap-5 lg:col-span-6">
              <PhoneTop alt="Home for a manager: wallet balance and quick actions for contacts and managers" className="w-[46%] max-w-[250px] translate-y-8" label="Home" src="m-dashboard" />
              <PhoneTop alt="Wallet with contacts’ top-up requests waiting for approval" className="w-[46%] max-w-[250px]" label="Wallet · requests" src="m-wallet" />
            </div>
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {roleDetails.map((d, i) => (
                <RevealItem className="rounded-2xl border border-rule bg-paper p-6" key={d.title}>
                  <p className="font-mono text-signal text-xs">0{i + 1}</p>
                  <p className="mt-3 font-medium text-lg">{d.title}</p>
                  <p className="mt-2 text-ink-soft text-sm leading-relaxed">{d.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* 07 · Gamification */}
      <section className="relative overflow-hidden py-24 text-white" style={{ background: `linear-gradient(160deg, ${C.night} 0%, #1f2a66 100%)` }}>
        <div aria-hidden className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(97_121_217/0.45),transparent)]" />
        <div className={cn(wrap, "relative")}>
          <Chapter dark label="Motivation" n="07" title="A monthly league for everyday payments.">
            <p>The game only rewards things people already come to Tamdid to do, so playing it and using the product are the same thing.</p>
          </Chapter>

          <RevealGroup className="mt-12 flex flex-wrap gap-3">
            {leagues.map((l) => (
              <RevealItem className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pr-5 pl-2" key={l.name}>
                <span className="size-8 rounded-full shadow-inner" style={{ background: `linear-gradient(135deg, ${l.from}, ${l.to})` }} />
                <span>{l.name}</span>
              </RevealItem>
            ))}
            <RevealItem className="flex items-center gap-2 rounded-full px-4 py-2 font-mono text-white/60 text-xs uppercase">Resets monthly</RevealItem>
          </RevealGroup>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
            <div className="flex justify-center gap-5 lg:col-span-5">
              <Phone alt="Silver league card in the promotion zone, with daily challenge, missions and badges" className="w-[46%] max-w-[230px]" h={2164} label="Silver · promotion zone" src="m-league" />
              <Phone alt="Diamond league card in the relegation zone, with a daily challenge in progress" className="w-[46%] max-w-[230px] translate-y-10" h={2208} label="Diamond · relegation zone" src="m-profile" />
            </div>
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {game.map((g, i) => (
                <RevealItem className="rounded-2xl border border-white/12 bg-white/[0.04] p-6" key={g.title}>
                  <p className="font-mono text-[#9fb0f0] text-xs">0{i + 1}</p>
                  <p className="mt-3 font-display text-2xl">{g.title}</p>
                  <p className="mt-2 text-white/70 leading-relaxed">{g.body}</p>
                </RevealItem>
              ))}
              <RevealItem className="rounded-2xl bg-gradient-to-r from-[#FFCC00]/16 to-[#FFCC00]/4 p-6 sm:col-span-2">
                <p className="flex items-center gap-3 font-medium">
                  <span className="grid size-8 place-items-center rounded-full bg-[#FFCC00] text-[#5b4300]">★</span>
                  Points show up where they’re earned
                </p>
                <p className="mt-2 text-white/75 leading-relaxed">
                  The payment screen says how many points the purchase will earn, and the receipt confirms them. The reward sits next to the action, not
                  buried in a separate rewards tab.
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* 08 · Web */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Mobile first, then web" n="08" title="Same product, bigger canvas.">
            <p>The web version came after mobile and reuses its components. What changes is layout: what was stacked on a phone sits side by side on a laptop.</p>
          </Chapter>
          <div className="mt-12">
            <PageSwitcher accent={C.active} altSuffix="on the web" pages={webPages} />
          </div>
        </div>
      </section>

      {/* 08b · Light and dark */}
      <section className="py-24 text-white" style={{ background: C.night }}>
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[#9fb0f0] text-[0.78rem] uppercase tracking-[0.06em]"><span className="text-white">08b</span> · Themes</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05]">Light, dark, or follow the system.</h2>
            <p className="mt-6 text-white/70 leading-relaxed">Every screen has both themes, built from the same tokens. Drag to compare.</p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <BeforeAfter
              accent={C.primary}
              after={`${IMG}/web-dark.webp`}
              afterAlt="Tamdid web home in dark mode"
              afterLabel="Dark"
              before={`${IMG}/web-light.webp`}
              beforeAlt="Tamdid web home in light mode"
              beforeLabel="Light"
              height={1133}
              width={1440}
            />
          </Reveal>
        </div>
      </section>

      {/* 09 · Tablet and English */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Tablet & English" n="09" title="Not a stretched phone. Not a shrunken desktop.">
            <p>Alongside the screens, I wrote the rules for two more versions, so engineering could build them without a new design for every screen.</p>
          </Chapter>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-3xl border border-rule bg-paper p-7">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase">Tablet grid</p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Mobile", cols: 4 },
                  { label: "Tablet", cols: 8, split: 5 },
                  { label: "Desktop", cols: 12 },
                ].map((g) => (
                  <div className="flex items-center gap-4" key={g.label}>
                    <span className="w-16 shrink-0 text-ink-soft text-sm">{g.label}</span>
                    <div className="grid flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${g.cols}, minmax(0, 1fr))` }}>
                      {Array.from({ length: g.cols }, (_, i) => (
                        <span
                          className="h-9 rounded-md"
                          key={`${g.label}-${i}`}
                          style={{ background: g.split ? (i < g.split ? C.primary : C.mint) : `color-mix(in oklab, ${C.primary} 30%, transparent)` }}
                        />
                      ))}
                    </div>
                    <span className="w-6 shrink-0 text-right font-mono text-ink-soft text-xs">{g.cols}</span>
                  </div>
                ))}
              </div>
              <ul className="mt-7 space-y-2 text-ink-soft text-sm leading-relaxed">
                <li><span className="text-ink">5 + 3 columns</span> on tablet: main content and a supporting panel.</li>
                <li><span className="text-ink">A hamburger menu</span> instead of the bottom navigation.</li>
                <li><span className="text-ink">One spacing scale</span>: 4, 8, 12, 16, 20, 24.</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-3xl border border-rule bg-paper p-7" delay={0.08}>
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase">English (LTR)</p>
              <p className="mt-4 leading-relaxed">Mirror only what depends on direction, never the structure. Keep font sizes. Translate labels by meaning, not word for word:</p>
              <div className="mt-5 divide-y divide-rule border-rule border-y">
                {labels.map((l) => (
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-2.5" key={l.en}>
                    <span className={cn("text-right", vazir.className)} dir="rtl">{l.fa}</span>
                    <span aria-hidden className="text-ink-soft">→</span>
                    <span className="font-medium">{l.en}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 flex flex-wrap gap-2">
                {["فارسی", "English", "Türkçe", "پښتو"].map((l) => (
                  <span className="rounded-full bg-paper-2 px-3 py-1 text-sm" key={l}>{l}</span>
                ))}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 · Design system */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Design system" n="10" title="Built once, used three times.">
            <p>A UI kit, an icon set (vuesax) and colour tokens in light and dark. The web and tablet versions are the same components in new layouts.</p>
          </Chapter>
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase">Brand · light</p>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {light.map((t) => (
                  <div key={t.name}>
                    <div className="aspect-square rounded-xl ring-1 ring-rule" style={{ background: t.hex }} />
                    <p className="mt-2 text-xs">{t.name}</p>
                    <p className="font-mono text-[0.68rem] text-ink-soft">{t.hex}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-mono text-[0.72rem] text-ink-soft uppercase">Status</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {status.map((t) => (
                  <div className="flex items-center gap-2" key={t.name}>
                    <span className="size-6 shrink-0 rounded-full" style={{ background: t.hex }} />
                    <span className="text-xs">{t.name}<br /><span className="font-mono text-[0.68rem] text-ink-soft">{t.hex}</span></span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="rounded-3xl bg-[#1D1D1D] p-6 text-white lg:col-span-5" delay={0.08}>
              <p className="font-mono text-[0.72rem] text-white/50 uppercase">Dark</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {dark.map((t) => (
                  <div key={t.name}>
                    <div className="aspect-square rounded-xl ring-1 ring-white/10" style={{ background: t.hex }} />
                    <p className="mt-2 text-xs">{t.name}</p>
                    <p className="font-mono text-[0.68rem] text-white/50">{t.hex}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl p-4" style={{ background: "#262626" }}>
                <p className="text-sm" style={{ color: "#899BE3" }}>Wallet balance</p>
                <p className={cn("mt-1 text-2xl", vazir.className)} dir="rtl">۱۰٬۲۵۶٬۴۵۲٬۵۶۷ <span className="text-sm text-white/50">تومان</span></p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-lg px-3 py-1.5 text-sm" style={{ background: C.active }}>Top Up</span>
                  <span className="rounded-lg px-3 py-1.5 text-sm" style={{ background: "#323232" }}>Transfer Credit</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11 · First minute */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="First minute" n="11" title="A promise, then a phone number.">
            <p>Onboarding says what Tamdid does in one line (“Instant, simple renewal”), then asks for a single thing. A code by text or email, or Google or Apple, gets people in.</p>
          </Chapter>
          <div className="mt-14 grid items-end gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <MacBook>
                <Image alt="Tamdid sign-in on the web: the promise beside the phone number field" className="block h-auto w-full" height={1024} sizes="(min-width: 1024px) 60vw, 100vw" src={`${IMG}/d-onboarding.webp`} width={1440} />
              </MacBook>
            </Reveal>
            <div className="flex justify-center gap-4 lg:col-span-4">
              <Phone alt="Onboarding: the Tamdid robot and “Instant, simple renewal”" className="w-1/2 max-w-[180px]" label="Onboarding" src="m-onboarding" />
              <Phone alt="Log in with a phone number, Google or Apple" className="w-1/2 max-w-[180px]" label="Log in" src="m-login" />
            </div>
          </div>
        </div>
      </section>

      {/* 12 · Where it stands (resolution) */}
      <section className="py-24 text-white" style={{ background: C.active }}>
        <div className={wrap}>
          <Chapter dark label="Where it stands" n="12" title="Designed solo. Now in development.">
            <p>There are no launch numbers yet, so I won’t pretend otherwise. Here’s what’s done, and what I’d test first once real people use it.</p>
          </Chapter>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-2xl border border-white/25 p-7">
              <p className="font-mono text-white/70 text-xs uppercase">Done</p>
              <ul className="mt-4 space-y-2 text-white/90">
                <li>12 feature areas, mobile and web</li>
                <li>Light and dark themes</li>
                <li>Tablet and English rules for handoff</li>
                <li>UI kit, icons and colour tokens</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/25 p-7" delay={0.08}>
              <p className="font-mono text-white/70 text-xs uppercase">Test first</p>
              <ul className="mt-4 space-y-2 text-white/90">
                <li>Do people understand which wallet pays first?</li>
                <li>How quickly do managers find and approve requests?</li>
                <li>Does Renew get used more than a fresh search?</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl bg-white p-7 text-[#141a3a]" delay={0.16}>
              <p className="font-mono text-xs uppercase" style={{ color: C.active }}>What I took away</p>
              <p className="mt-4 leading-relaxed">
                As the only designer, I owned every decision, from the sitemap to the dark-mode tokens. Writing rules for tablet and English, rather than
                drawing every screen twice, made the system something engineers can extend on their own.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
