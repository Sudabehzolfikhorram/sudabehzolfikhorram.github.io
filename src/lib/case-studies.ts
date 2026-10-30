const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Case studies. Leili's text comes from its Framer case study; the others are
// written only from Sudabeh's resume (V2.8): no invented research or metrics.
// Product screens are coded, illustrative recreations (see mockups.tsx) until
// the final designs are added; every page says so in a note at the top.

import type { ScreenId } from "@/components/case/mockups";

export type Layout = "split" | "duo" | "journey" | "editorial" | "system" | "novin" | "brief" | "kaaryar";

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
    layout: "brief",
    hue: "#3b35b5",
    featured: true,
    tagline: "An AI platform that reads how a company really works, and shows a simpler way to run it.",
    summary:
      "Atlas analyses a company’s emails, chats and workflows to map how work actually moves. Then its AI points out a better way: if buying a marker takes steps A, B and C today, Atlas can show it can be done in two. I design it at Algonet.",
    category: "Enterprise AI · Algonet",
    period: { start: "2026-04", end: null },
    status: "In development",
    meta: { role: "Product Designer", engagement: "Algonet · Full-time", platform: "Web", tools: ["Figma"] },
    links: [{ label: "aix2atlas.com", href: "https://aix2atlas.com/" }],
    cover: { image: `${BASE}/work/atlas/thumb.svg`, alt: "Atlas: a globe of connected nodes, an enterprise twin in sync" },
    thumbnail: { image: `${BASE}/work/atlas/thumb.svg`, alt: "Atlas: a globe of connected nodes, an enterprise twin in sync" },
    context: "",
    scope: [],
    highlights: [],
    screens: [],
    facts: [],
    story: [
      { title: "Read", body: "Emails, chats and every workflow a company runs on become one map of how work really moves." },
      { title: "Compare", body: "The AI holds each process up against best practice and finds the extra steps, loops and waits." },
      { title: "Simplify", body: "It suggests the shorter path, so a three-step purchase can become a two-step one." },
    ],
    confidential: true,
    comingSoon: true,
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
    hue: "#1f7a5a",
    tagline: "Three connected products: a marketplace, a tool for the experts in the field, and the ERP that runs them both.",
    summary:
      "AzMan is the marketplace where customers find services. Hamgam Saz is where the field experts work and keep in touch with customers. The ERP runs both, from roles and permissions to contracts and documents. I design all three.",
    category: "Marketplace · Operations · ERP",
    period: { start: "2025-10", end: null },
    status: "Ongoing",
    meta: {
      role: "Product Designer",
      engagement: "Remote",
      platform: "Web & mobile",
      tools: ["Figma", "FigJam"],
    },
    cover: "azman-request",
    thumbnail: { image: `${BASE}/work/azman/thumb.webp`, alt: "ERP AzMan: product thumbnail with the AzMan mark" },
    context:
      "Three products with very different jobs: one connects customers with service providers, one keeps call follow-ups traceable, and one manages people, permissions and paperwork inside the organisation. Each needed its own clear structure.",
    scope: [
      "AzMan: the core marketplace experience across web and mobile",
      "Hamgam Saz: an operational tool for call reports and follow-ups",
      "ERP: internal personnel-management workflows",
    ],
    highlights: [
      { title: "Service requests", body: "Customers describe what they need, compare experts and follow a request to completion." },
      { title: "Traceable follow-ups", body: "Call reports, follow-ups and contact history stay synchronised so teams can see what happened and what’s next." },
      { title: "Access by role and scope", body: "Roles, access levels and operational scopes decide who can see and approve what." },
    ],
    products: [
      {
        name: "AzMan",
        body: "The marketplace itself: customers find a service, request it and follow it with an expert, on web and mobile.",
        points: ["Service requests", "Expert interactions", "Marketplace workflows", "Web & mobile"],
        screen: "azman-request",
      },
      {
        name: "Hamgam Saz",
        body: "The tool the field experts work in: call reports, follow-ups and contact history kept in sync, so every customer conversation is traceable.",
        points: ["Call reports", "Follow-ups", "Contact history", "Privacy workflows"],
        screen: "hamgam-calls",
      },
      {
        name: "ERP",
        body: "The system behind AzMan and Hamgam Saz: people, roles and access levels, operational scopes, documents, contracts and guarantees.",
        points: ["Roles & access levels", "Operational scopes", "Documents & contracts", "Guarantees & permissions"],
        screen: "erp-access",
      },
    ],
    screens: [
      { id: "azman-request", title: "AzMan · service request", caption: "A customer request with matched experts and the steps to completion." },
      { id: "hamgam-calls", title: "Hamgam Saz · call reports", caption: "Call reports, follow-ups and contact history in one synchronised view." },
      { id: "erp-access", title: "ERP · roles & access", caption: "Roles, access levels and operational scopes for personnel management." },
    ],
    facts: [
      { value: "3", label: "Products designed in parallel" },
      { value: "Web + mobile", label: "Platforms for the marketplace" },
      { value: "Ongoing", label: "Since October 2025" },
    ],
  },
  {
    slug: "tamdid",
    name: "Tamdid",
    layout: "journey",
    featured: true,
    hue: "#5b6fd6",
    tagline: "Subscriptions, wallet and payments in one app, with a little game that keeps people on top of their renewals.",
    summary:
      "Tamdid brings subscriptions, a wallet and payments into one product, with gamification that makes staying on top of renewals feel rewarding. I was its only designer, from the first idea to development: mobile first, then web, on a design system of its own.",
    category: "Fintech · Mobile & web",
    period: { start: "2025-08", end: "2026-06" },
    status: "In development",
    meta: {
      role: "Solo product designer",
      engagement: "Remote",
      platform: "Mobile first, then web",
      tools: ["Figma", "FigJam"],
    },
    cover: "tamdid-home",
    gallery: [
      { image: `${BASE}/work/tamdid/mobile-home.webp`, alt: "Tamdid home on mobile: wallet balance, quick actions, live prices and recent transactions", device: "phone", width: 375, height: 1028, label: "Home" },
      { image: `${BASE}/work/tamdid/mobile-wallet.webp`, alt: "Tamdid wallet breakdown in a bottom sheet, by person", device: "phone", width: 375, height: 812, label: "Wallet breakdown" },
      { image: `${BASE}/work/tamdid/mobile-points.webp`, alt: "Tamdid points balance with the Tamdid League rewards card", device: "phone", width: 375, height: 812, label: "Points & league" },
      { image: `${BASE}/work/tamdid/web-light.webp`, alt: "Tamdid web dashboard in light mode with balances and a transactions table", device: "web", width: 1440, height: 1133, label: "Web · light" },
      { image: `${BASE}/work/tamdid/web-dark.webp`, alt: "Tamdid web dashboard in dark mode", device: "web", width: 1440, height: 1133, label: "Web · dark" },
    ],
    thumbnail: { image: `${BASE}/work/tamdid/thumb.webp`, alt: "Tamdid: the product’s Persian wordmark" },
    context:
      "Subscriptions renew quietly and payments are scattered across cards and services. Tamdid brings subscriptions, wallet and payments into one place, and uses gamification to make staying on top of them feel rewarding.",
    scope: ["Subscriptions overview & renewals", "Wallet & top-ups", "Payments", "Gamification", "Custom design system"],
    highlights: [
      { title: "Subscriptions in one view", body: "Every active subscription, its cost and its next renewal date on a single screen." },
      { title: "Wallet-first payments", body: "Top up once and pay renewals from the wallet, with clear confirmation at each step." },
      { title: "Gamification", body: "Streaks and rewards that make managing money feel like progress, not a chore." },
    ],
    screens: [
      { id: "tamdid-home", title: "Home", caption: "Monthly spend and upcoming renewals at a glance." },
      { id: "tamdid-sub", title: "Subscription", caption: "One subscription’s plan, history and renewal settings." },
      { id: "tamdid-wallet", title: "Wallet", caption: "Balance, top-ups and recent activity." },
      { id: "tamdid-pay", title: "Payment", caption: "Paying a renewal from the wallet, with a clear confirmation." },
      { id: "tamdid-rewards", title: "Rewards", caption: "Gamification: streaks, levels and rewards." },
    ],
    facts: [
      { value: "Solo", label: "Designer, from idea to development" },
      { value: "2", label: "Platforms: mobile first, then web" },
      { value: "Light + dark", label: "Themes in its own design system" },
    ],
  },
  {
    slug: "kudos",
    name: "Kudos",
    layout: "duo",
    hue: "#e08a1e",
    featured: true,
    tagline: "An HR and employee-engagement platform, with an admin side engineers could build without guessing.",
    summary:
      "Kudos helps companies engage and reward their people. At Novaday I designed its B2B admin panel on a Tailwind-based design system, documented every flow and page’s logic for engineering, and worked closely with PM and QA. The same team also built Remeet, which I designed too.",
    category: "B2B SaaS · HR",
    period: { start: "2024-09", end: "2025-06" },
    status: "Shipped",
    meta: {
      role: "Product Designer",
      engagement: "Full-time · Hybrid",
      platform: "Web & mobile",
      tools: ["Figma", "Tailwind-based design system"],
    },
    links: [
      { label: "novaday.ir", href: "https://novaday.ir/" },
      { label: "Kudos panel", href: "https://panel.kudos.ir/" },
      { label: "remeet.ir", href: "https://remeet.ir/" },
    ],
    cover: "kudos-panel",
    thumbnail: { image: `${BASE}/work/kudos/thumb.svg`, alt: "Kudos: a recognition card and a leaderboard of the most recognised teams" },
    context:
      "Two products for business customers, built by the same team. A shared, Tailwind-based design system kept them consistent and made admin workflows faster to design and build.",
    scope: ["Kudos admin panel", "Remeet web & mobile", "Flow and page-logic documentation", "Close work with PM and QA"],
    highlights: [
      { title: "Documented page logic", body: "Clear documentation of flows and page logic improved coordination between design and development." },
      { title: "Biometric access", body: "Fingerprint and RFID access for meetings and spaces, in a multilingual product." },
      { title: "Outlook integration", body: "Bookings sync with Outlook, automating reservations and making better use of resources." },
    ],
    products: [
      {
        name: "Kudos",
        body: "Kudos is an employee recognition and engagement platform. On its B2B admin panel I created clear documentation of flows and page logic to improve coordination between design and development, enhanced the UI with refined visuals, and aligned closely with PM and QA for smooth delivery.",
        points: ["Flow documentation", "Page logic", "Refined UI", "PM & QA alignment"],
        screen: "kudos-panel",
        link: "https://panel.kudos.ir/",
      },
      {
        name: "Remeet",
        body: "A multilingual web and mobile access system with biometric (fingerprint/RFID) features for meeting and access management, integrated with Outlook to automate bookings and optimise resource usage.",
        points: ["Multilingual", "Fingerprint & RFID", "Meeting rooms", "Outlook sync"],
        screen: "remeet-booking",
        link: "https://remeet.ir/",
      },
    ],
    screens: [
      { id: "kudos-panel", title: "Kudos · admin panel", caption: "Admin workflows on the shared Tailwind-based system." },
      { id: "remeet-booking", title: "Remeet · bookings", caption: "Room bookings synced with Outlook." },
      { id: "remeet-access", title: "Remeet · access", caption: "Fingerprint and RFID check-in on mobile." },
    ],
    facts: [
      { value: "2", label: "B2B products designed" },
      { value: "1", label: "Tailwind-based design system across both" },
      { value: "Web + mobile", label: "Multilingual access system" },
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
const ORDER = ["tamdid", "kudos", "atlas", "remeet", "azman", "novinhost", "kaaryar", "nanvanamak"];
export const caseStudies = [...all].sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const otherCaseStudies = (slug: string) => caseStudies.filter((c) => c.slug !== slug);
