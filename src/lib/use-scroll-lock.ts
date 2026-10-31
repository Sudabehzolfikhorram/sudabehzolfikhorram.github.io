"use client";

import { useEffect } from "react";

/**
 * Locks page scroll while a modal is open, without the page jumping: the body
 * is pinned at the current position (the only lock iOS Safari respects) and
 * put back exactly where it was on close.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { body, documentElement: html } = document;
    const y = window.scrollY;
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: html.style.overflow };
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    return () => {
      html.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo({ top: y, behavior: "instant" });
    };
  }, [active]);
}

/** True on touch-first devices, where focusing a field also opens the keyboard. */
export const isTouchFirst = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
