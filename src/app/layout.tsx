import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Montserrat } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Providers } from "@/components/motion/providers";
import "./globals.css";

// Montserrat for text; Bricolage Grotesque for titles: characterful at display
// sizes but with open counters, so headlines stay easy to read.
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz", "wdth"] });

export const metadata: Metadata = {
  title: "Sudabeh · Product Designer",
  description:
    "AI-enabled product designer turning complex workflows, dashboards and SaaS products into clear, usable experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} ${bricolage.variable} h-full`}
    >
      <body className="grain flex min-h-full flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
