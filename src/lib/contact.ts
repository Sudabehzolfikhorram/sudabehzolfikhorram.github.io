// Validating and sending contact messages, shared by the contact page and the
// message dialog.
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { site } from "@/lib/content";

export const SUBJECT = "Project enquiry from your portfolio";

export type ContactKind = "email" | "phone" | "telegram";

export interface ContactCheck {
  /** What the visitor seems to be typing, valid or not; drives the field's icon. */
  kind: ContactKind | null;
  valid: boolean;
  /** Cleaned-up form to send: digits normalised, phone in international format. */
  value: string;
  /** Why it isn't valid yet, worded for the visitor. */
  error?: string;
  /** A likely fix for a mistyped email domain, e.g. gmial.com → gmail.com. */
  suggestion?: string;
}

// Persian and Arabic-Indic digits, so a phone typed on a Persian keyboard still parses.
const toLatinDigits = (v: string) =>
  v.replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0)).replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660));

// RFC 5321/5322 in practice: dot-atom local part, LDH domain labels, alphabetic or punycode TLD.
const EMAIL_LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;
const TLD = /^(?:[A-Za-z]{2,63}|xn--[A-Za-z0-9-]{1,59})$/;
const POPULAR_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "live.com", "proton.me", "protonmail.com", "aol.com", "mail.ru", "yandex.com", "ymail.com"];

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
  }
  return row[b.length];
}

function checkEmail(v: string): ContactCheck {
  const fail = (error: string, suggestion?: string): ContactCheck => ({ kind: "email", valid: false, value: v, error, suggestion });
  if (/\s/.test(v)) {
    return fail("An email can’t contain spaces.");
  }
  const parts = v.split("@");
  if (parts.length !== 2) {
    return fail("An email has exactly one @.");
  }
  const [local, domain] = parts;
  if (!local) {
    return fail("Add the part before the @.");
  }
  if (local.length > 64) {
    return fail("The part before the @ is too long (64 characters max).");
  }
  if (!EMAIL_LOCAL.test(local)) {
    return fail(
      /^\.|\.$|\.\./.test(local)
        ? "Dots can’t start, end or repeat before the @."
        : "The part before the @ has a character emails can’t use."
    );
  }
  if (!domain) {
    return fail("Add the domain after the @, like gmail.com.");
  }
  if (v.length > 254 || domain.length > 253) {
    return fail("That email is too long.");
  }
  const labels = domain.split(".");
  if (labels.length < 2) {
    return fail("The domain needs an ending, like .com.");
  }
  if (!labels.every((l) => DOMAIN_LABEL.test(l))) {
    return fail("The domain after the @ isn’t valid.");
  }
  if (!TLD.test(labels[labels.length - 1])) {
    return fail("The domain ending isn’t valid, like .com or .ir.");
  }
  const lower = domain.toLowerCase();
  const near = POPULAR_DOMAINS.find((d) => d !== lower && distance(lower, d) <= 2);
  return {
    kind: "email",
    valid: true,
    value: `${local}@${lower}`,
    suggestion: near && !POPULAR_DOMAINS.includes(lower) ? `${local}@${near}` : undefined,
  };
}

const TELEGRAM_PREFIX = /^(?:@|(?:https?:\/\/)?(?:www\.)?(?:t|telegram)\.me\/)/i;

// Telegram's own rules: 5–32 of a–z, 0–9 and _, starting with a letter, not ending in _ and no __.
function checkTelegram(v: string): ContactCheck {
  const name = v.replace(TELEGRAM_PREFIX, "").replace(/\/$/, "");
  const fail = (error: string): ContactCheck => ({ kind: "telegram", valid: false, value: v, error });
  if (!name) {
    return fail("Add your Telegram username after the @.");
  }
  if (!/^[A-Za-z0-9_]+$/.test(name)) {
    return fail("Telegram usernames use only English letters, numbers and _.");
  }
  if (!/^[A-Za-z]/.test(name)) {
    return fail("Telegram usernames start with a letter.");
  }
  if (name.length < 5 || name.length > 32) {
    return fail("Telegram usernames are 5 to 32 characters long.");
  }
  if (name.endsWith("_") || name.includes("__")) {
    return fail("Telegram usernames can’t end with _ or have __ in a row.");
  }
  return { kind: "telegram", valid: true, value: `@${name}` };
}

function checkPhone(v: string): ContactCheck {
  const fail = (error: string): ContactCheck => ({ kind: "phone", valid: false, value: v, error });
  const international = v.replace(/^00/, "+");
  const digits = international.replace(/\D/g, "");
  if (digits.length > 15) {
    return fail("Phone numbers have at most 15 digits.");
  }
  if (!international.startsWith("+")) {
    // Without a country code only Iran's own national format is accepted.
    if (!digits.startsWith("0")) {
      return fail("Add the country code, like +44 or +98.");
    }
    if (digits.startsWith("09") && digits.length !== 11) {
      return fail("Iranian mobile numbers have 11 digits, like 0912 345 6789.");
    }
  }
  const phone = parsePhoneNumberFromString(international, "IR");
  if (!phone?.isValid()) {
    if (phone?.country === "IR" || digits.startsWith("989")) {
      return fail("Iranian mobiles look like 0912 345 6789 or +98 912 345 6789.");
    }
    if (phone?.country) {
      return fail(`That doesn’t look like a complete number for ${regionName(phone.country)}.`);
    }
    return fail(
      phone?.countryCallingCode
        ? `Check the digits after +${phone.countryCallingCode}; the number looks incomplete.`
        : "Check the country code and the number of digits."
    );
  }
  return { kind: "phone", valid: true, value: phone.formatInternational() };
}

function regionName(code: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** Works out what the visitor typed and whether it can be used to reach them. */
export function checkContact(raw: string): ContactCheck {
  const v = toLatinDigits(raw).trim();
  if (!v) {
    return { kind: null, valid: false, value: "" };
  }
  if (TELEGRAM_PREFIX.test(v)) {
    return checkTelegram(v);
  }
  if (v.includes("@")) {
    return checkEmail(v);
  }
  if (/^[+\d(]/.test(v) && /^[+\d\s().-]+$/.test(v)) {
    return checkPhone(v);
  }
  return {
    kind: null,
    valid: false,
    value: v,
    error: "Add an email, a phone number, or a Telegram username starting with @.",
  };
}

export type Outgoing = { message: string; contact: string; topic: string };

/**
 * A short ID per browser (e.g. V-7K2Q), kept in localStorage, so messages from
 * the same visitor can be told apart from everyone else's. Falls back to a
 * fresh ID when storage is blocked.
 */
export function visitorId() {
  const make = () => {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    return `V-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
  };
  try {
    const saved = localStorage.getItem("visitor-id");
    if (saved) return saved;
    const id = make();
    localStorage.setItem("visitor-id", id);
    return id;
  } catch {
    return make();
  }
}

/** Opens the visitor's mail app with their message addressed to Sudabeh. */
export function sendByEmail({ message, contact, topic }: Outgoing) {
  const subject = encodeURIComponent(topic ? `${SUBJECT} · ${topic}` : SUBJECT);
  const body = encodeURIComponent(contact ? `${message}\n\nReach me at: ${contact}` : message);
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
}

async function post(payload: Record<string, string>) {
  // text/plain keeps this a simple request, so the browser skips a CORS preflight Apps Script can't answer.
  const res = await fetch(site.contactEndpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  return { ok: res.ok && Boolean(data?.ok), error: data?.error };
}

/** Posts one self-contained message to the Apps Script endpoint, which emails it to Sudabeh. Throws on failure. */
export async function sendToInbox({ message, contact, topic }: Outgoing) {
  const id = visitorId();
  const payload = { message, contact, topic, id, page: window.location.href };
  let result = await post(payload);
  if (!result.ok && result.error === "invalid" && !contact) {
    // An older deployment of the script still requires a contact: say so
    // explicitly, and carry the ID and topic in the text, rather than drop the message.
    result = await post({ ...payload, contact: `none (visitor ${id})`, message: `[${topic || "Message"} · ${id}]\n\n${message}` });
  }
  if (!result.ok) {
    throw new Error("Message was not delivered");
  }
}

export const viaInbox = Boolean(site.contactEndpoint);
const send = viaInbox ? sendToInbox : sendByEmail;
export const sendMessage = (out: Outgoing) => send({ ...out, contact: out.contact ? checkContact(out.contact).value : "" });
