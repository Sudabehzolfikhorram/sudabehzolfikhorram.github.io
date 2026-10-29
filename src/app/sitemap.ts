import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/content";

// Required with `output: "export"`: generate the file once, at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/experience", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}/`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const work = caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}/`, changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...pages, ...work];
}
