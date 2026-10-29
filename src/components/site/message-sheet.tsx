"use client";

import { MessageSquare, X } from "lucide-react";
import { AnimatePresence, motion, type PanInfo, useDragControls } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { ContactComposer } from "./contact-composer";

const SHEET = { type: "spring", duration: 0.5, bounce: 0.12 } as const;
const noop = () => () => {};

/**
 * A pill that opens the chat composer: a bottom sheet on phones (drag it
 * down to close) and a centred dialog on larger screens. Tapping outside or
 * pressing Escape closes either.
 */
export function MessageSheet({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Only the handle drags, so the fields inside keep their own touch gestures.
  const drag = useDragControls();
  // Portalled to <body> so no transformed ancestor can trap the fixed sheet.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    if (!open) {
      return;
    }
    const trigger = triggerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "inline-flex h-12 items-center gap-2.5 rounded-full bg-paper px-6 font-medium text-ink transition-transform active:scale-[0.97]",
          className
        )}
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <MessageSquare className="size-4 text-ink-soft" strokeWidth={1.75} />
        Write me a message
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                // Bottom sheet on phones, a centred dialog from sm up.
                <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
                  <motion.button
                    animate={{ opacity: 1 }}
                    aria-label="Close"
                    className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    onClick={() => setOpen(false)}
                    tabIndex={-1}
                    type="button"
                  />
                  <motion.div
                    animate={{ y: 0, opacity: 1 }}
                    aria-label="Write me a message"
                    aria-modal="true"
                    className="relative flex max-h-[92dvh] w-full flex-col rounded-t-[28px] bg-paper text-ink shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.5)] sm:max-w-[560px] sm:rounded-[28px] sm:shadow-2xl"
                    drag="y"
                    dragControls={drag}
                    dragListener={false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{ top: 0, bottom: 0.6 }}
                    exit={{ y: "100%", opacity: 0 }}
                    initial={{ y: "100%", opacity: 0 }}
                    onDragEnd={onDragEnd}
                    role="dialog"
                    transition={SHEET}
                  >
                    <div
                      className="flex shrink-0 cursor-grab touch-none items-center justify-between px-5 pt-3 pb-1 active:cursor-grabbing"
                      onPointerDown={(e) => drag.start(e)}
                    >
                      <span className="w-8" />
                      <span aria-hidden className="h-1.5 w-11 rounded-full bg-rule sm:invisible" />
                      <button
                        aria-label="Close"
                        className="grid size-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-2"
                        onClick={() => setOpen(false)}
                        type="button"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="overflow-y-auto overscroll-contain px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                      <ContactComposer autoFocus bare />
                    </div>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
