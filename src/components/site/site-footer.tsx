import Link from "next/link";
import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-rule border-t">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl leading-tight">
            From complexity <em className="text-signal">toward clarity.</em>
          </p>
          <p className="mt-3 max-w-sm text-ink-soft text-sm">
            Product design for SaaS, dashboards and internal tools.
          </p>
          <a className="mt-5 inline-block font-mono text-sm underline-offset-4 hover:text-signal hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p className="mt-1 text-ink-soft text-sm">{site.location}</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 text-sm">
          <span className="eyebrow mb-1">Pages</span>
          <Link className="hover:text-signal" href="/">Hello</Link>
          <Link className="hover:text-signal" href="/work">Work</Link>
          <Link className="hover:text-signal" href="/experience">Career</Link>
          <Link className="hover:text-signal" href="/about">About</Link>
          <Link className="hover:text-signal" href="/contact">Contact</Link>
          <a className="hover:text-signal" download href={site.resume}>Resume (PDF) ↓</a>
        </nav>
        {site.socials.length > 0 && (
          <nav aria-label="Social" className="grid content-start gap-2 text-sm">
            <span className="eyebrow mb-1">Elsewhere</span>
            {site.socials.map((s) => (
              <a className="hover:text-signal" href={s.href} key={s.href} rel="noreferrer" target="_blank">
                {s.label}
              </a>
            ))}
          </nav>
        )}
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-4 pb-24 sm:flex-row sm:justify-between font-mono text-[0.7rem] text-ink-soft uppercase tracking-[0.08em] sm:px-8">
        <span>© 2026 Sudabeh Zolfi Khorram</span>
        <span>Designed with intent</span>
      </div>
    </footer>
  );
}
