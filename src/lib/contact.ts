// Sending contact messages, shared by the contact page composer and the
// message popover.
import { site } from "@/lib/content";

export const SUBJECT = "Project enquiry from your portfolio";
export const MIN_LENGTH = 10;

export type ContactKind = "email" | "phone" | "telegram";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;
const TELEGRAM = /^(@|(https?:\/\/)?t\.me\/)[A-Za-z]\w{3,31}$/;

/** What kind of contact the visitor typed, or null when it isn't one yet. */
export function contactKind(value: string): ContactKind | null {
  const v = value.trim();
  if (EMAIL.test(v)) {
    return "email";
  }
  if (TELEGRAM.test(v)) {
    return "telegram";
  }
  if (PHONE.test(v) && v.replace(/\D/g, "").length >= 7) {
    return "phone";
  }
  return null;
}

export const isContact = (value: string) => contactKind(value) !== null;

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

export const viaInbox = Boolean(site.contactEndpoint);
export const sendMessage = viaInbox ? sendToInbox : sendByEmail;
