"use client";

import MorphPopover from "@/components/kokonutui/morph-popover";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Opens the visitor's mail app with their message addressed to Sudabeh. */
export function sendByEmail(message: string) {
  const subject = encodeURIComponent("Project enquiry from your portfolio");
  const body = encodeURIComponent(message);
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/**
 * Kokonut's morph popover: the button grows into a message box. Scaled up
 * with CSS zoom so it holds its own next to display type.
 */
export function MessagePopover({ className, align = "end" }: { className?: string; align?: "start" | "end" }) {
  return (
    <div className={cn("[zoom:1.3]", className)}>
      <MorphPopover
        align={align}
        label="Write me a message"
        onSubmit={(v) => sendByEmail(v)}
        placeholder="Tell me about your product and where it feels tangled…"
        sentLabel="Opening your email…"
        width={360}
      />
    </div>
  );
}
