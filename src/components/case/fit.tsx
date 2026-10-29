"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

/**
 * Renders children at a fixed design size (w × h) and scales them to fit the
 * available width, so a mockup looks identical at any viewport.
 */
export function Fit({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div className="relative w-full overflow-hidden" ref={ref} style={{ aspectRatio: `${w} / ${h}` }}>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: w, height: h, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
