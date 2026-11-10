const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Case studies. Leili's text comes from its Framer case study; the others are
// written only from Sudabeh's resume (V2.8): no invented research or metrics.
// Product screens are coded, illustrative recreations (see mockups.tsx) until
// the final designs are added; every page says so in a note at the top.

import type { ScreenId } from "@/components/case/mockups";

export type Layout = "split" | "duo" | "journey" | "editorial" | "system" | "novin" | "brief" | "kaaryar" | "atlas" | "tamdid" | "kudos";

export type CaseStudy = {
  slug: string;
  name: string;
  layout: Layout;
  /** Product accent used in mockups and covers. */
  hue: string;
  tagline: string;
  summary: string;
  category: string;
  /** YYYY-MM; null end = ongoing. Omit when unknown. */
  period?: { start: string; end: string | null };
  status: string;
  meta: { role: string; engagement: string; platform: string; tools: string[] };
  links?: { label: string; href: string }[];
  /** A coded mockup, or a real image (path under /public). */
  cover: ScreenId | { image: string; alt: string };
  /** A finished project thumbnail; fills the card edge to edge when set. */
  thumbnail?: { image: string; alt: string };
  /** Lead projects, shown large on the home and work pages. */
  featured?: boolean;
  /** A short distinction shown on the card, e.g. an award. */
  badge?: string;
  /** For short "brief" pages: a few titled paragraphs instead of a full case study. */
  story?: { title: string; body: string }[];
  /** A full case study is still being written. */
  comingSoon?: boolean;
  /** Still in development: show a blurred preview instead of real screens. */
  confidential?: boolean;
  /** Screens for the peek lens (blurred, one small circle in focus at a time). */
  peek?: { label: string; image?: string; width?: number; height?: number }[];
  /** Real screens exported from Figma, in the order they should appear. */
  gallery?: { image: string; alt: string; device: "phone" | "web"; width: number; height: number; label?: string }[];
  context: string;
  /** What the work covered. */
  scope: string[];
  /** Key areas or decisions, each a short title and body. */
  highlights: { title: string; body: string }[];
  screens: { id: ScreenId; title: string; caption: string }[];
  /** Plain facts about the project (not measured outcomes). */
  facts: { value: string; label: string }[];
  /** Sibling products told on their own pages (AzMan, its ERP and Hamgam Saz). */
  family?: { label: string; slugs: string[] };
  /** For multi-product projects. */
  products?: { name: string; body: string; points: string[]; screen: ScreenId; link?: string }[];
};

const all: CaseStudy[] = [
  {
    slug: "novinhost",
    name: "Novin Host",
    layout: "novin",
    hue: "#11215d",
    tagline: "Modernising a 15-year-old hosting brand, without customers feeling it changed.",
    summary:
      "Novin Host has sold servers, hosting and domains to Iranian businesses for more than 15 years. I’m redesigning its website so it feels current and is easier to choose from, while staying unmistakably Novin Host.",
    category: "Website redesign · Hosting & cloud",
    period: { start: "2026-06", end: null },
    status: "In progress",
    meta: {
      role: "Product Designer",
      engagement: "Website redesign",
      platform: "Responsive web (RTL, Persian)",
      tools: ["Figma"],
    },
    links: [{ label: "Current site: novinhost.org", href: "https://www.novinhost.org/" }],
    cover: { image: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work/novinhost/after-hero.webp`, alt: "Redesigned Novin Host homepage hero with a live network status card" },
    context:
      "The brief: make the site modern and easier to use, but don’t let existing customers feel that Novin Host has changed.",
    scope: ["Homepage", "VPS", "Dedicated", "Colocation", "Hosting", "Domains", "Novin Plus", "About", "Contact", "Knowledge base", "Article"],
    highlights: [],
    screens: [],
    facts: [],
  },
  {
    slug: "atlas",
    name: "Atlas",
    layout: "atlas",
    hue: "#3b35b5",
    featured: true,
    tagline: "An AI platform that reads how a company really works, and shows a simpler way to run it.",
    summary:
      "Atlas analyses a company’s emails, chats and workflows to map how work actually moves. Then its AI points out a better way: if buying a marker takes steps A, B and C today, Atlas can show it can be done in two. I design it at Algonet.",
    category: "Enterprise AI · Algonet",
    period: { start: "2026-04", end: null },
    status: "In development",
    meta: { role: "Product Designer", engagement: "Algonet · Full-time", platform: "Web", tools: ["Figma", "AI tools"] },
    cover: { image: `${BASE}/work/atlas/thumb.svg`, alt: "Atlas: a globe of connected nodes, an enterprise twin in sync" },
    thumbnail: { image: `${BASE}/work/atlas/thumb.svg`, alt: "Atlas: a globe of connected nodes, an enterprise twin in sync" },
    context:
      "The deadline was days, not months. Working with AI end to end, our team took Atlas from brief to a live first version in two to three days.",
    scope: [],
    highlights: [
      { title: "A deadline measured in days", body: "Algonet needed Atlas up and running fast, with no room for a long design phase." },
      { title: "AI in every step", body: "We built it with AI end to end, so ideas went from a sketch to working screens in hours, and design and development moved together." },
      { title: "Live, then better", body: "The team had the first version live in two to three days. Since then it keeps growing, one improvement at a time." },
    ],
    screens: [],
    facts: [
      { value: "2–3 days", label: "From brief to a live first version" },
      { value: "AI", label: "In every step, from research to build" },
      { value: "1 team", label: "Design and engineering, side by side" },
    ],
    story: [
      { title: "Read", body: "Emails, chats and every workflow a company runs on become one map of how work really moves." },
      { title: "Compare", body: "The AI holds each process up against best practice and finds the extra steps, loops and waits." },
      { title: "Simplify", body: "It suggests the shorter path, so a three-step purchase can become a two-step one." },
    ],
    peek: [{ label: "Home" }],
    confidential: true,
  },
  {
    slug: "remeet",
    name: "Remeet",
    layout: "brief",
    hue: "#5a46e0",
    badge: "Winner · Tehran Design Week",
    tagline: "An access and meeting system, first called Access, that won at Tehran Design Week.",
    summary:
      "Remeet brings doors, meeting rooms and the people who use them into one flow: a multilingual web and mobile system with fingerprint and RFID check-in, synced with Outlook to automate bookings and make better use of rooms.",
    category: "Access & meetings · Web & mobile",
    period: { start: "2024-09", end: "2025-06" },
    status: "Award-winning",
    meta: { role: "Product Designer", engagement: "Novaday · Full-time", platform: "Web & mobile, multilingual", tools: ["Figma", "Tailwind-based design system"] },
    links: [{ label: "remeet.ir", href: "https://remeet.ir/" }],
    cover: { image: `${BASE}/work/remeet/thumb.svg`, alt: "Remeet: a fingerprint and a booked meeting-room card" },
    thumbnail: { image: `${BASE}/work/remeet/thumb.svg`, alt: "Remeet: a fingerprint and a booked meeting-room card" },
    context: "",
    scope: [],
    highlights: [],
    screens: [],
    facts: [],
    story: [
      { title: "The product", body: "Fingerprint and RFID access for doors and rooms, bookings that sync with Outlook, in more than one language, on web and mobile." },
      { title: "The work", body: "A design system, UI kit and variables on a Tailwind base, shaped by benchmarks, competitor analysis, a feature list and usability testing." },
      { title: "Recognition", body: "First shown as Access, it won at Tehran Design Week." },
    ],
    comingSoon: true,
  },
  {
    slug: "azman",
    name: "AzMan",
    layout: "editorial",
    hue: "#6b46d9",
    family: { label: "AzMan", slugs: ["azman", "azman-erp", "hamgam"] },
    tagline: "A marketplace where customers find a service, request it and follow it through with an expert.",
    summary:
      "AzMan connects customers with service experts. Customers describe what they need, compare experts and follow the request to completion, on web and mobile. It’s one of three connected products I designed for AzMan, with Hamgam Saz and the ERP behind them.",
    category: "Marketplace · Web & mobile",
    period: { start: "2025-10", end: null },
    status: "Product design",
    meta: { role: "Product Designer", engagement: "Project-based · Remote", platform: "Web & mobile", tools: ["Figma", "FigJam"] },
    cover: "azman-request",
    context:
      "The marketplace is where customers meet AzMan. It had to keep a request simple on a phone, from the first description to the finished job, while staying connected to the field tool and the ERP behind it.",
    scope: ["Service requests", "Expert interactions", "Marketplace workflows", "Responsive web and mobile"],
    highlights: [
      { title: "Service requests", body: "Customers describe what they need, compare experts and follow a request to completion." },
      { title: "One connected system", body: "What happens in the marketplace shows up in Hamgam Saz for the expert and in the ERP for the organisation." },
    ],
    screens: [{ id: "azman-request", title: "AzMan · service request", caption: "A customer request with matched experts and the steps to completion." }],
    facts: [
      { value: "Web + mobile", label: "Platforms" },
      { value: "1 of 3", label: "Connected AzMan products" },
    ],
  },
  {
    slug: "azman-erp",
    name: "AzMan ERP",
    layout: "editorial",
    hue: "#3346b8",
    family: { label: "AzMan", slugs: ["azman", "azman-erp", "hamgam"] },
    tagline: "The system behind AzMan and Hamgam Saz: people, roles, access, documents and contracts.",
    summary:
      "The ERP runs AzMan from the inside: personnel, roles and access levels, operational scopes, documents, contracts and guarantees. It’s one of three connected products I designed for AzMan.",
    category: "ERP · Internal tool",
    period: { start: "2025-10", end: null },
    status: "Product design",
    meta: { role: "Product Designer", engagement: "Project-based · Remote", platform: "Web", tools: ["Figma", "FigJam"] },
    cover: "erp-access",
    thumbnail: { image: `${BASE}/work/azman/thumb.webp`, alt: "ERP AzMan: product thumbnail with the AzMan mark" },
    context:
      "Inside the organisation, every action depends on who you are and what you’re allowed to touch. The ERP had to make roles, access levels and scopes clear enough to manage, and the paperwork behind them easy to find.",
    scope: ["Roles & access levels", "Operational scopes", "Documents & contracts", "Guarantees & permissions"],
    highlights: [
      { title: "Access by role and scope", body: "Roles, access levels and operational scopes decide who can see and approve what." },
      { title: "Paperwork in one place", body: "Documents, contracts and guarantees sit next to the people and permissions they belong to." },
    ],
    screens: [{ id: "erp-access", title: "ERP · roles & access", caption: "Roles, access levels and operational scopes for personnel management." }],
    facts: [
      { value: "Web", label: "Platform" },
      { value: "1 of 3", label: "Connected AzMan products" },
    ],
  },
  {
    slug: "hamgam",
    name: "Hamgam Saz",
    layout: "editorial",
    hue: "#1f9d6b",
    family: { label: "AzMan", slugs: ["azman", "azman-erp", "hamgam"] },
    tagline: "The tool AzMan’s field experts work in: call reports, follow-ups and contact history, always in sync.",
    summary:
      "Hamgam Saz is where AzMan’s field experts log calls, follow up and keep in touch with customers, so every conversation is traceable. It’s one of three connected products I designed for AzMan.",
    category: "Operations tool · Field experts",
    period: { start: "2025-10", end: null },
    status: "Product design",
    meta: { role: "Product Designer", engagement: "Project-based · Remote", platform: "Web & mobile", tools: ["Figma", "FigJam"] },
    cover: "hamgam-calls",
    context:
      "Field experts juggle many customers at once. Call reports, follow-ups and contact history had to stay in sync with the marketplace and the ERP, without slowing the expert down.",
    scope: ["Call reports", "Follow-ups", "Contact history", "Privacy workflows"],
    highlights: [
      { title: "Traceable follow-ups", body: "Call reports, follow-ups and contact history stay synchronised so teams can see what happened and what’s next." },
      { title: "One connected system", body: "Requests arrive from the AzMan marketplace, and the ERP decides who can see and do what." },
    ],
    screens: [{ id: "hamgam-calls", title: "Hamgam Saz · call reports", caption: "Call reports, follow-ups and contact history in one synchronised view." }],
    facts: [
      { value: "Web + mobile", label: "Platforms" },
      { value: "1 of 3", label: "Connected AzMan products" },
    ],
  },
  {
    slug: "tamdid",
    name: "Tamdid",
    layout: "tamdid",
    featured: true,
    hue: "#6179d9",
    tagline: "Renewals, wallets and a monthly league, for people who top up for themselves and for everyone else.",
    summary:
      "Tamdid sells mobile charge, internet packages and game credit, for yourself or for others, paid from one wallet. Managers fund their contacts’ wallets, approve requests and keep track of who owes what, and a monthly league rewards keeping up. I was its only designer, from the first idea to development: mobile first, then web, tablet and English, on a design system of its own.",
    category: "Fintech · Mobile & web",
    period: { start: "2025-08", end: "2026-06" },
    status: "In development",
    meta: {
      role: "Solo product designer",
      engagement: "Remote",
      platform: "Mobile first, then web and tablet",
      tools: ["Figma", "FigJam"],
    },
    cover: { image: `${BASE}/work/tamdid/cover.webp`, alt: "Tamdid: three phone screens on a blue gradient, showing the league, home and payment" },
    thumbnail: { image: `${BASE}/work/tamdid/cover.webp`, alt: "Tamdid: three phone screens on a blue gradient, showing the league, home and payment" },
    gallery: [
      { image: `${BASE}/work/tamdid/m-dashboard.webp`, alt: "Tamdid home on mobile: wallet balance, quick actions, live rates and transactions", device: "phone", width: 750, height: 2056, label: "Home" },
      { image: `${BASE}/work/tamdid/f-pay.webp`, alt: "Paying from several wallets, in a set order", device: "phone", width: 750, height: 1624, label: "Payment" },
      { image: `${BASE}/work/tamdid/m-league.webp`, alt: "Profile with the Tamdid League, daily challenge and missions", device: "phone", width: 750, height: 2164, label: "League" },
      { image: `${BASE}/work/tamdid/web-light.webp`, alt: "Tamdid web dashboard in light mode", device: "web", width: 1440, height: 1133, label: "Web · light" },
      { image: `${BASE}/work/tamdid/web-dark.webp`, alt: "Tamdid web dashboard in dark mode", device: "web", width: 1440, height: 1133, label: "Web · dark" },
    ],
    context:
      "Most purchases are repeats: the same number, the same package, often for the same person. Tamdid is designed for the second purchase, not the first.",
    scope: ["Information architecture", "Purchase flows", "Wallet & payments", "Contact accounts & commission", "Gamification", "Design system", "Web, tablet & English"],
    highlights: [
      { title: "Repeat in one tap", body: "Previous purchases sit at the top of every buy screen, each with a Renew button." },
      { title: "Pay from several wallets", body: "Choose which wallets to use and see the order they’ll be charged in." },
      { title: "A monthly league", body: "Points, challenges and missions earned by doing what Tamdid is for." },
      { title: "Bookkeeping built in", body: "A running account with every contact, automatic and manual entries, in any currency, plus commission." },
    ],
    screens: [],
    facts: [
      { value: "Solo", label: "Designer, from idea to development" },
      { value: "12", label: "Feature areas designed" },
      { value: "3", label: "Layouts: mobile, web, tablet" },
    ],
  },
  {
    slug: "kudos",
    name: "Kudos",
    layout: "kudos",
    hue: "#e6294d",
    featured: true,
    tagline: "Employee recognition that people actually use, and that HR can see working.",
    summary:
      "Kudos is employee-recognition software: colleagues thank each other with gift cards and coins, and HR runs surveys, events, challenges and onboarding in the same place. At Novaday I redesigned its home from a dashboard into a social network, designed the employee side and the HR admin on a shared Tailwind-based design system, and documented every page’s logic for engineering alongside PM and QA.",
    category: "B2B SaaS · HR",
    period: { start: "2024-09", end: "2025-06" },
    status: "Live",
    meta: {
      role: "Product Designer",
      engagement: "Novaday · Full-time · Hybrid",
      platform: "Web, responsive to mobile",
      tools: ["Figma", "Tailwind-based design system"],
    },
    links: [
      { label: "kudos.ir", href: "https://kudos.ir/" },
      { label: "novaday.ir", href: "https://novaday.ir/" },
    ],
    cover: { image: `${BASE}/work/kudos/cover.webp`, alt: "Kudos: the social feed on desktop and mobile, on a red background" },
    thumbnail: { image: `${BASE}/work/kudos/cover.webp`, alt: "Kudos: the social feed on desktop and mobile, on a red background" },
    gallery: [
      { image: `${BASE}/work/kudos/feed.webp`, alt: "The Kudos feed", device: "web", width: 2684, height: 2140, label: "Feed" },
      { image: `${BASE}/work/kudos/feed-mobile.webp`, alt: "The Kudos feed on mobile", device: "phone", width: 750, height: 1624, label: "Mobile" },
    ],
    context:
      "A screen isn’t finished until its rules are written down. In a product this size, the design file had to work as a shared workspace for engineering, PM and QA.",
    scope: ["Dashboard → social network redesign", "Employee side", "HR admin", "Competitive analysis", "Tailwind-based design system"],
    highlights: [
      { title: "Dashboard to social network", body: "A home screen rebuilt around people thanking each other, backed by research into eight recognition products." },
      { title: "Rules behind the feed", body: "Who to thank, what’s starting soon, who ranks first: each block decides what to show, and when." },
      { title: "A self-serve start", body: "A five-step guide that gets a company set up without help." },
      { title: "A dashboard for HR", body: "Take-up, morale, money and trends, on one screen." },
    ],
    screens: [],
    facts: [
      { value: "~500", label: "People using it, by my count" },
      { value: "70+", label: "Pages in the design file" },
      { value: "2", label: "Products on one design system" },
    ],
  },
  {
    slug: "kaaryar",
    name: "Studio Kaaryar",
    layout: "kaaryar",
    hue: "#03703a",
    tagline: "Selling a new kind of product team in four pages, and keeping it simple on purpose.",
    summary:
      "I redesigned the full Studio Kaaryar website, improving information architecture, visual storytelling, accessibility and clarity, and built a custom design system for it.",
    category: "Website redesign · Social impact",
    period: { start: "2025-09", end: "2026-01" },
    status: "Design completed · in development",
    meta: {
      role: "Product Designer",
      engagement: "Remote",
      platform: "Responsive web",
      tools: ["Figma", "FigJam"],
    },
    links: [{ label: "studio.kaaryar.ir", href: "https://studio.kaaryar.ir/" }],
    // Real screens from Figma, so no coded mockup (and no "illustrative" note).
    cover: { image: `${BASE}/work/kaaryar/home.webp`, alt: "Studio Kaaryar home page, redesigned" },
    thumbnail: { image: `${BASE}/work/kaaryar/thumb.webp`, alt: "Studio Kaaryar redesign: the studio’s K mark in green and orange" },
    context:
      "Kaaryar trains programmers and designers from across Iran. Kaaryar Studio is where its graduates build real products for clients, reviewed by experienced mentors. Every project becomes a real job for a young person.",
    scope: ["Information architecture", "Visual storytelling", "Accessibility", "Clarity of content", "Custom design system"],
    highlights: [
      { title: "Information architecture", body: "A restructured site so visitors find projects, services and the studio’s story quickly." },
      { title: "Visual storytelling", body: "Pages that lead with the work and the people it’s for." },
      { title: "Accessibility", body: "Contrast, type sizes and structure designed so the site works for more people." },
      { title: "Custom design system", body: "Tokens and components built for the site, so new pages stay consistent." },
    ],
    screens: [
      { id: "kaaryar-home", title: "Home", caption: "The studio’s story and work up front." },
      { id: "kaaryar-projects", title: "Projects", caption: "Projects organised so they’re easy to browse." },
      { id: "kaaryar-mobile", title: "Mobile", caption: "The same structure on small screens." },
    ],
    facts: [
      { value: "Full site", label: "Redesigned end to end" },
      { value: "Custom", label: "Design system built for the site" },
      { value: "Designed", label: "Design completed; in development" },
    ],
  },
  {
    slug: "nanvanamak",
    name: "Nan va Namak",
    layout: "brief",
    hue: "#b5702a",
    badge: "The turning point",
    tagline: "A startup of our own. It didn’t launch, and it made me a product designer.",
    summary:
      "Nan va Namak was meant to be our own startup: a cooking platform for web, tablet and mobile that we planned to launch ourselves. I designed its interface with a focus on accessibility, usability and clear content discovery.",
    category: "Cooking platform · Web, tablet, mobile",
    period: { start: "2024-06", end: "2024-09" },
    status: "Didn’t launch",
    meta: { role: "UI/UX Designer", engagement: "Own startup", platform: "Web, tablet & mobile", tools: ["Figma", "FigJam"] },
    links: [{ label: "Dribbble shot", href: "https://dribbble.com/shots/26277570-Cooking-Platform-Desktop-Experience" }],
    cover: { image: `${BASE}/work/nanvanamak/thumb.svg`, alt: "Nan va Namak: a loaf of bread and a salt shaker" },
    thumbnail: { image: `${BASE}/work/nanvanamak/thumb.svg`, alt: "Nan va Namak: a loaf of bread and a salt shaker" },
    context: "",
    scope: [],
    highlights: [],
    screens: [],
    facts: [],
    story: [
      { title: "The plan", body: "Build and launch a product of our own, not a client brief. I designed the experience across web, tablet and mobile, with accessibility and easy recipe discovery at its core." },
      { title: "What happened", body: "It never launched. We came out of it with a lot of experience and no product." },
      { title: "Why it matters", body: "Owning the whole product, not just its screens, showed me where I wanted to go. It’s the project that moved me from UI/UX specialist toward product design." },
    ],
  },
];

// The order projects appear in: the three lead projects, then the rest.
const ORDER = ["atlas", "tamdid", "kudos", "remeet", "azman", "azman-erp", "hamgam", "novinhost", "kaaryar", "nanvanamak"];
export const caseStudies = [...all].sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const otherCaseStudies = (slug: string) => caseStudies.filter((c) => c.slug !== slug);
