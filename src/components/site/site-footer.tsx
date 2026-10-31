import Link from "next/link";
import { site } from "@/lib/content";

const LINK = "flex min-h-11 items-center hover:text-signal md:min-h-0 md:py-1";

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
        {/* Two columns on phones, each link a full 44px tap target. */}
        <div className="grid grid-cols-2 gap-6 md:contents">
          <nav aria-label="Footer" className="grid content-start text-sm">
            <span className="eyebrow mb-2">Pages</span>
            {[
              ["/", "Hello"],
              ["/work", "Work"],
              ["/experience", "Career"],
              ["/about", "About"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <Link className={LINK} href={href} key={href}>
                {label}
              </Link>
            ))}
            <a className={LINK} download href={site.resume}>
              Resume (PDF) ↓
            </a>
          </nav>
          {site.socials.length > 0 && (
            <nav aria-label="Social" className="grid content-start text-sm">
              <span className="eyebrow mb-2">Elsewhere</span>
              {site.socials.map((s) => (
                <a className={LINK} href={s.href} key={s.href} rel="noreferrer" target="_blank">
                  {s.label} ↗
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
      {/* Room below for the assistant button and, on phones, the bottom bar. */}
      <div className="mx-auto max-w-[1240px] px-4 pb-[calc(9.5rem+env(safe-area-inset-bottom))] font-mono text-[0.7rem] text-ink-soft uppercase tracking-[0.08em] sm:px-8 sm:pb-24">
        © 2026 Sudabeh Zolfi Khorram
      </div>
    </footer>
  );
}
