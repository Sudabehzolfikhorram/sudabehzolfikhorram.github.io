"use client";

import MorphPopover from "@/components/kokonutui/morph-popover";
import { isContact, MIN_LENGTH, sendMessage, viaInbox } from "@/lib/contact";
import { cn } from "@/lib/utils";

/**
 * Kokonut's morph popover: the button grows into a message box. Scaled up
 * with CSS zoom so it holds its own next to display type.
 */
export function MessagePopover({ className, align = "end" }: { className?: string; align?: "start" | "end" }) {
  return (
    <div className={cn("[zoom:1.3]", className)}>
      <MorphPopover
        align={align}
        contactPlaceholder="Your email, phone or Telegram ID"
        label="Write me a message"
        minLength={MIN_LENGTH}
        onSubmit={sendMessage}
        placeholder="Tell me about your product and where it feels tangled…"
        sentLabel={viaInbox ? "Sent, thank you!" : "Opening your email…"}
        validateContact={isContact}
        width={360}
      />
    </div>
  );
}
