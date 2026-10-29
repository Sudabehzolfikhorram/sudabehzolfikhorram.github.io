"use client";

import MorphPopover from "@/components/kokonutui/morph-popover";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

const SUBJECT = "Project enquiry from your portfolio";
const MIN_LENGTH = 10;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;
const TELEGRAM = /^(@|(https?:\/\/)?t\.me\/)[A-Za-z][\w]{3,31}$/;

/** An email address, a phone number or a Telegram handle. */
export function isContact(value: string) {
  return EMAIL.test(value) || TELEGRAM.test(value) || (PHONE.test(value) && value.replace(/\D/g, "").length >= 7);
}

/** Opens the visitor's mail app with their message addressed to Sudabeh. */
export function sendByEmail(message: string, contact: string) {
  const subject = encodeURIComponent(SUBJECT);
  const body = encodeURIComponent(`${message}\n\nReach me at: ${contact}`);
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/** Posts the message to the Apps Script endpoint, which emails it to Sudabeh. Throws on failure. */
export async function sendToInbox(message: string, contact: string) {
  // text/plain keeps this a simple request, so the browser skips a CORS preflight Apps Script can't answer.
  const res = await fetch(site.contactEndpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ message, contact, page: window.location.href }),
  });
  const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
  if (!res.ok || !data?.ok) {
    throw new Error("Message was not delivered");
  }
}

/**
 * Kokonut's morph popover: the button grows into a message box. Scaled up
 * with CSS zoom so it holds its own next to display type.
 */
export function MessagePopover({ className, align = "end" }: { className?: string; align?: "start" | "end" }) {
  const viaInbox = Boolean(site.contactEndpoint);
  return (
    <div className={cn("[zoom:1.3]", className)}>
      <MorphPopover
        align={align}
        contactPlaceholder="Your email, phone or Telegram ID"
        label="Write me a message"
        minLength={MIN_LENGTH}
        onSubmit={viaInbox ? sendToInbox : sendByEmail}
        placeholder="Tell me about your product and where it feels tangled…"
        sentLabel={viaInbox ? "Sent, thank you!" : "Opening your email…"}
        validateContact={isContact}
        width={360}
      />
    </div>
  );
}
