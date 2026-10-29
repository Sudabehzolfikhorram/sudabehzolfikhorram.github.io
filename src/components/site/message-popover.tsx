"use client";

import MorphPopover, { type MorphContact } from "@/components/kokonutui/morph-popover";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

const SUBJECT = "Project enquiry from your portfolio";

/** Opens the visitor's mail app with their message addressed to Sudabeh. */
export function sendByEmail(message: string) {
  const subject = encodeURIComponent(SUBJECT);
  const body = encodeURIComponent(message);
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/** Posts the message to Formspree, which emails it to Sudabeh. Throws on failure. */
export async function sendByFormspree(message: string, { name, email }: MorphContact) {
  const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    // Formspree uses `email` as the reply-to address, so Sudabeh can answer directly.
    body: JSON.stringify({ name, email, message, _subject: `${SUBJECT}: ${name}`, page: window.location.href }),
  });
  if (!res.ok) {
    throw new Error(`Formspree responded ${res.status}`);
  }
}

/**
 * Kokonut's morph popover: the button grows into a message box. Scaled up
 * with CSS zoom so it holds its own next to display type.
 */
export function MessagePopover({ className, align = "end" }: { className?: string; align?: "start" | "end" }) {
  const viaForm = Boolean(site.formspreeId);
  return (
    <div className={cn("[zoom:1.3]", className)}>
      <MorphPopover
        align={align}
        label="Write me a message"
        onSubmit={viaForm ? sendByFormspree : sendByEmail}
        placeholder="Tell me about your product and where it feels tangled…"
        sentLabel={viaForm ? "Sent, thank you!" : "Opening your email…"}
        width={360}
        withContact={viaForm}
      />
    </div>
  );
}
