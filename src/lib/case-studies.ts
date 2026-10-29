// Case studies. Leili's text comes from its Framer case study; the others are
// written only from Sudabeh's resume (V2.8): no invented research or metrics.
// Product screens are coded, illustrative recreations (see mockups.tsx) until
// the final designs are added; every page says so in a note at the top.

import type { ScreenId } from "@/components/case/mockups";

export type Layout = "split" | "duo" | "journey" | "editorial" | "system" | "novin";

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

export const caseStudies: CaseStudy[] = [
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
    slug: "leili",
    name: "Leili",
    layout: "split",
    hue: "#3d5a80",
    tagline: "Designing a structured evaluation experience for two very different ways of working.",
    summary:
      "Leili is an evaluation and inspection management platform for admins who set up and oversee evaluations on desktop, and inspectors who complete them in the field on mobile.",
    category: "B2B SaaS · Inspection platform",
    status: "Product design case study",
    meta: {
      role: "Product Designer",
      engagement: "Redesign of an existing MVP",
      platform: "Web (admin) · Mobile (inspector)",
      tools: ["Figma", "FigJam"],
    },
    cover: "leili-admin-home",
    context:
      "The workflow existed as checklist-based inspection work before the product. The design challenge was to turn that paper-born workflow and an early digital MVP into a clearer product experience for both roles.",
    scope: [
      "Admins plan and monitor evaluation activity",
      "Inspectors open assigned work, answer questions, review progress and submit",
      "One shared evaluation structure from setup to submission",
    ],
    highlights: [
      { title: "One system, two work modes", body: "The same evaluation structure runs from the administrator’s setup work through the inspector’s focused execution." },
      { title: "Flexible question model", body: "An adaptable evaluation structure that holds different question types while keeping the inspector’s task focused and clear." },
      { title: "Completion states", body: "Progress, review and submit-warning states so inspectors always know what’s left before they submit." },
    ],
    screens: [
      { id: "leili-admin-home", title: "Admin home", caption: "A planning and monitoring surface for the people responsible for evaluation structure and activity." },
      { id: "leili-builder", title: "Evaluation creation", caption: "Creating an evaluation step by step: details, questions, assignment." },
      { id: "leili-inspector-list", title: "Inspector: evaluation list", caption: "Opening assigned evaluations and continuing incomplete work." },
      { id: "leili-question", title: "Inspector: question", caption: "Answering one question at a time, whatever its type." },
      { id: "leili-review", title: "Inspector: review & submit", caption: "Reviewing completion, with a warning before submitting incomplete work." },
    ],
    facts: [
      { value: "2", label: "Work contexts: setup & oversight, field execution" },
      { value: "1", label: "Shared evaluation structure across both roles" },
    ],
  },
  {
    slug: "azman",
    name: "AzMan",
    layout: "editorial",
    hue: "#1f7a5a",
    tagline: "Three products, three kinds of work: a services marketplace, an operations tool and an ERP.",
    summary:
      "For AzMan I’m designing three separate products, AzMan, Hamgam Saz and an ERP, each with its own users and workflows across service, operations and personnel management.",
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
        body: "The core product experience connecting customers with service providers, covering service requests, expert interactions and key marketplace workflows across web and mobile.",
        points: ["Service requests", "Expert interactions", "Marketplace workflows", "Web & mobile"],
        screen: "azman-request",
      },
      {
        name: "Hamgam Saz",
        body: "An operational product for managing and synchronising call reports, follow-ups, contact history and privacy-related workflows, helping teams keep customer interactions structured and traceable.",
        points: ["Call reports", "Follow-ups", "Contact history", "Privacy workflows"],
        screen: "hamgam-calls",
      },
      {
        name: "ERP",
        body: "Complex internal personnel-management workflows, including roles and access levels, operational scopes, document collection, contracts, guarantees, permissions and organisational access.",
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
    hue: "#c4572b",
    tagline: "A fintech app for smart subscription and wallet management.",
    summary:
      "Tamdid helps people keep their subscriptions under control: see every renewal, pay from a wallet, and stay motivated with gamification. I designed the product and its custom design system.",
    category: "Fintech · Mobile app",
    period: { start: "2025-08", end: "2026-06" },
    status: "Design completed · in development",
    meta: {
      role: "Product Designer",
      engagement: "Remote",
      platform: "Mobile",
      tools: ["Figma", "FigJam"],
    },
    cover: "tamdid-home",
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
      { value: "3", label: "Core areas: payments, wallets, gamification" },
      { value: "Custom", label: "Design system built for the product" },
      { value: "Designed", label: "Design completed; in development" },
    ],
  },
  {
    slug: "novaday",
    name: "Novaday",
    layout: "duo",
    hue: "#4a4fb0",
    tagline: "Two B2B products, one Tailwind-based design system.",
    summary:
      "At Novaday I designed two B2B products, Kudos and Remeet, on a Tailwind-based design system to improve consistency and streamline admin workflows.",
    category: "B2B SaaS · Admin & access",
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
    layout: "system",
    hue: "#b03a5b",
    tagline: "A full website redesign for a social-impact design studio.",
    summary:
      "I redesigned the full Studio Kaaryar website, improving information architecture, visual storytelling, accessibility and clarity, and built a custom design system for it.",
    category: "Website · Design system",
    period: { start: "2025-09", end: "2026-01" },
    status: "Design completed · in development",
    meta: {
      role: "Product Designer",
      engagement: "Remote",
      platform: "Responsive web",
      tools: ["Figma", "FigJam"],
    },
    links: [{ label: "studio.kaaryar.ir", href: "https://studio.kaaryar.ir/" }],
    cover: "kaaryar-home",
    context:
      "A studio whose work has social impact needs a website that tells those stories clearly and is accessible to everyone. The redesign covered the whole site, from structure to visual language.",
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
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const otherCaseStudies = (slug: string) => caseStudies.filter((c) => c.slug !== slug);
