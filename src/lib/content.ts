// All site copy lives here so the pages stay layout-only.
// Text comes from the Framer site and Sudabeh's resume (V2.8).

export const site = {
  name: "Sudabeh Zolfi Khorram",
  shortName: "Sudabeh",
  role: "Product Designer",
  intro:
    "I’m Sudabeh, an AI-enabled Product Designer turning complex workflows into clear, thoughtful and user-friendly digital experiences.",
  location: "Tehran, Iran · Open to remote",
  email: "sudabeh.a.zolfikhorram@gmail.com",
  contactFallback: "mailto:sudabeh.a.zolfikhorram@gmail.com",
  // Web app URL of the Google Apps Script in docs/contact-form.gs, which
  // emails contact messages to Sudabeh. Empty falls back to opening the
  // visitor's mail app.
  contactEndpoint: "https://script.google.com/macros/s/AKfycbyNUnvUJUsH6wB81ULdBtibH3JAYypTpneB99kbQeDg8AzMCD0NH602HnhqP71L3D7R/exec",
  socials: [
    { label: "LinkedIn", handle: "sudabehzolfikhorram2001", href: "https://www.linkedin.com/in/sudabehzolfikhorram2001/" },
    { label: "Dribbble", handle: "SudabehZolfikhorram", href: "https://dribbble.com/SudabehZolfikhorram" },
    { label: "Instagram", handle: "@sudabehzolfi.design", href: "https://www.instagram.com/sudabehzolfi.design" },
    { label: "Telegram", handle: "@sudabehzolfikhorram", href: "https://t.me/sudabehzolfikhorram" },
  ],
};

export const stats = [
  { value: "18", suffix: "+", label: "Projects completed" },
  { value: "4", suffix: "yr+", label: "Years in product & UI/UX" },
  { value: "13", suffix: "+", label: "Happy clients" },
];

export const capabilities = [
  {
    title: "Product UX & Flows",
    tag: "Structure",
    body: "Structuring complex workflows into clear, usable journeys that help users move through the product with confidence.",
  },
  {
    title: "Dashboard & SaaS Design",
    tag: "Data",
    body: "Designing data-heavy dashboards and B2B product interfaces that are easier to scan, understand, and use.",
  },
  {
    title: "AI-enabled Design Workflow",
    tag: "Method",
    body: "Using AI to explore faster, organize ideas better, and support smarter design decisions without losing human judgment.",
  },
];

export const process = [
  {
    short: "Brief",
    title: "Finding the Real Brief",
    body: "Every project starts differently. I look at goals, constraints, existing flows, and hidden friction first, especially in redesigns where the real problem is rarely only visual.",
  },
  {
    short: "Research",
    title: "Looking Outside the Room",
    body: "Benchmarks, competitor analysis, product audits, and AI-assisted exploration to understand better patterns. Not to copy them, but to make sharper decisions.",
  },
  {
    short: "Structure",
    title: "Making Sense of the Mess",
    body: "Before polished UI, I map flows, content, states, and rough wireframes so the product has a clear structure before it becomes beautiful.",
  },
  {
    short: "Direction",
    title: "Giving Direction",
    body: "I shape the mood, layout, UX writing, and visual language based on the brand, product needs, and the kind of trust the experience should create.",
  },
  {
    short: "System",
    title: "Designing the Spine",
    body: "Components, patterns, responsive states, and design systems that help the product stay consistent as it grows. Never isolated screens.",
  },
  {
    short: "Handoff",
    title: "Closing the Gap",
    body: "Handoff notes, states, and edge cases for developers, then a review of the build and refined details after the design moves into production.",
  },
];

export const principles = [
  { title: "Beyond the Brief", body: "Finding the real problem behind the request, not just redesigning the surface." },
  { title: "AI With Judgment", body: "Using AI to explore, compare, write, and move faster without outsourcing product thinking." },
  { title: "Logic Into Journeys", body: "Turning complex product behavior into flows teams can understand and improve." },
  { title: "Ambiguity Into Direction", body: "Turning early ideas, scattered decisions, and complex flows into a clear structure the team can build from." },
  { title: "Systems Over Screens", body: "Connecting flows, rules, states, and patterns before screens multiply." },
  { title: "Teams, Not Just Users", body: "Balancing user needs, business goals, and development realities so the product moves in one clear direction." },
  { title: "One Logic, Many Surfaces", body: "Keeping mobile, web, tablet, and desktop connected to the same product logic." },
  { title: "Buildable by Design", body: "Documenting states, decisions, and edge cases so design moves smoothly into development." },
];

export type Role = {
  company: string;
  title: string;
  type?: "Full-time" | "Project-based";
  mode?: "On-site" | "Remote" | "Hybrid";
  start: string; // YYYY-MM
  end: string | null; // null = present
  /** What the role covered, from the resume. */
  about: string;
  /** Case study on this site, if there is one. */
  caseStudy?: string;
  /** Live product or shot, if public. */
  link?: { label: string; href: string };
};

export const experience: Role[] = [
  {
    // Started Khordad 1405 (≈ June 2026). Engagement type not specified yet.
    company: "Novin Host", title: "Product Designer", start: "2026-06", end: null,
    about: "Redesigning Novin Host’s current website: modern and easier to choose from, while staying recognisably Novin Host.",
    caseStudy: "novinhost",
    link: { label: "novinhost.org", href: "https://www.novinhost.org/" },
  },
  {
    company: "Algonet", title: "Product Designer", type: "Full-time", mode: "On-site", start: "2026-04", end: null,
    about: "Designing complex B2B and internal product experiences across dashboards, operational tools and system-level workflows. Built a custom design system with reusable, production-ready components with product and engineering.",
  },
  {
    company: "AzMan", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-10", end: null,
    about: "Designing three products, AzMan, Hamgam Saz and an ERP, each with distinct workflows across service, operations and personnel management.",
    caseStudy: "azman",
  },
  {
    company: "Studio Kaaryar", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-09", end: "2026-01",
    about: "Redesigned the full website for a social-impact design studio: information architecture, visual storytelling, accessibility, and a custom design system. Design completed; in development.",
    caseStudy: "kaaryar",
    link: { label: "studio.kaaryar.ir", href: "https://studio.kaaryar.ir/" },
  },
  {
    company: "Tamdid", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-08", end: "2026-06",
    about: "Designed a fintech product for smart subscription and wallet management, covering payments, wallets and gamification, with a custom design system. Design completed; in development.",
    caseStudy: "tamdid",
  },
  {
    company: "Novaday", title: "Product Designer", type: "Full-time", mode: "Hybrid", start: "2024-09", end: "2025-06",
    about: "Designed two B2B products, Kudos and Remeet, on a Tailwind-based design system to improve consistency and streamline admin workflows.",
    caseStudy: "novaday",
    link: { label: "novaday.ir", href: "https://novaday.ir/" },
  },
  {
    company: "ChapAgha", title: "UI/UX Designer", type: "Project-based", mode: "Remote", start: "2024-12", end: "2025-01",
    about: "Redesigned the responsive product listing page for business cards, with a clearer layout and stronger mobile usability.",
    link: { label: "Dribbble shot", href: "https://dribbble.com/shots/26236688-Business-Card-PLP" },
  },
  {
    company: "Nan va Namak", title: "UI/UX Designer", type: "Project-based", mode: "Remote", start: "2024-06", end: "2024-09",
    about: "Designed a responsive cooking platform for web, mobile and tablet, focused on accessibility, usability and clear content discovery.",
    link: { label: "Dribbble shot", href: "https://dribbble.com/shots/26277570-Cooking-Platform-Desktop-Experience" },
  },
  {
    company: "Jaygah", title: "UI / Visual Designer", type: "Project-based", mode: "Remote", start: "2024-03", end: "2024-06",
    about: "Collaborated on B2B and B2C marketing packages and digital content, improving visual communication across campaigns and social touchpoints.",
  },
  {
    company: "Alla Online School", title: "Educational Content Designer", type: "Full-time", mode: "Hybrid", start: "2021-08", end: "2023-04",
    about: "Worked with cross-functional teams to design and structure educational content, improving visual clarity, layout and the learning experience.",
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string | null) {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export const formatRange = (start: string, end: string | null) => `${formatMonth(start)} – ${formatMonth(end)}`;
