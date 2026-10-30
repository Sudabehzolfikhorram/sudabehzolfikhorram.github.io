import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Assistant } from "@/components/site/assistant";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Providers } from "@/components/motion/providers";
import { experience, site, skills } from "@/lib/content";
import "./globals.css";

// One family for text and titles: Plus Jakarta Sans has open counters and a
// tall x-height, so it stays readable at 14px on a phone and still has
// character at display sizes. Geist Mono carries the small labels.
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Sudabeh Zolfi Khorram, product designer for SaaS, fintech and internal tools. Case studies, career and resume. Based in Tehran, open to remote.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Sudabeh Zolfi Khorram · Product Designer", template: "%s" },
  description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: "Sudabeh Zolfi Khorram · Product Designer",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sudabeh Zolfi Khorram, product designer" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

// Structured data for search engines and recruiting tools.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
  worksFor: experience.filter((r) => !r.end).map((r) => ({ "@type": "Organization", name: r.company })),
  alumniOf: { "@type": "CollegeOrUniversity", name: "Payame Noor University" },
  knowsAbout: skills,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} h-full`}
    >
      <body className="grain flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
          type="application/ld+json"
        />
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Assistant />
        </Providers>
      </body>
    </html>
  );
}
