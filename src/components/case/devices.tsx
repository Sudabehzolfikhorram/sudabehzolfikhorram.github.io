import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Device frames for real design screens: a MacBook for desktop and an iPhone
 * for mobile. Both are drawn in CSS and scale with their container.
 */

/** A MacBook: black bezel with a camera, a silver base with the thumb notch. */
export function MacBook({ children, className, screenClassName }: { children: ReactNode; className?: string; screenClassName?: string }) {
  return (
    <div className={cn("mx-auto w-full", className)}>
      <div className="relative mx-[5%] rounded-t-[clamp(10px,1.6vw,20px)] rounded-b-[4px] bg-[#0c0c10] p-[1.4%] pb-[2%] shadow-[0_50px_90px_-50px_rgba(20,15,60,0.75)] ring-1 ring-white/10">
        <span aria-hidden className="absolute top-[0.55%] left-1/2 size-[clamp(3px,0.35vw,6px)] -translate-x-1/2 rounded-full bg-zinc-700" />
        <div className={cn("relative overflow-hidden rounded-[3px] bg-white", screenClassName)}>{children}</div>
      </div>
      <div aria-hidden className="relative h-[clamp(8px,1.3vw,16px)] rounded-b-[clamp(8px,1.4vw,18px)] bg-gradient-to-b from-[#d9dbe2] via-[#b9bcc6] to-[#8d909b] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.45)]">
        <span className="absolute top-0 left-1/2 h-[45%] w-[13%] -translate-x-1/2 rounded-b-[6px] bg-[#9fa2ad]" />
      </div>
    </div>
  );
}

/** An iPhone: titanium edge, side buttons, Dynamic Island. Any screen content goes inside. */
export function IPhoneFrame({ children, className, dim }: { children: ReactNode; className?: string; dim?: boolean }) {
  return (
    <div className={cn("relative", dim && "opacity-80 grayscale-[35%]", className)}>
      <span aria-hidden className="absolute top-[19%] -left-[1.2%] h-[5%] w-[1.2%] rounded-l bg-zinc-700" />
      <span aria-hidden className="absolute top-[27%] -left-[1.2%] h-[8.5%] w-[1.2%] rounded-l bg-zinc-700" />
      <span aria-hidden className="absolute top-[38%] -left-[1.2%] h-[8.5%] w-[1.2%] rounded-l bg-zinc-700" />
      <span aria-hidden className="absolute top-[31%] -right-[1.2%] h-[13%] w-[1.2%] rounded-r bg-zinc-700" />
      <div className="rounded-[15%/7%] bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-600 p-[1%] shadow-[0_40px_80px_-35px_rgba(20,15,60,0.7)]">
        <div className="rounded-[14.2%/6.6%] bg-black p-[3.2%]">
          <div className="relative overflow-hidden rounded-[11.5%/5.3%] bg-white">
            <span aria-hidden className="absolute top-[1.7%] left-1/2 z-10 h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/** A full page in an iPhone you can scroll with your thumb or the mouse wheel. */
export function IPhone({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) {
  return (
    <IPhoneFrame className={cn("mx-auto w-[290px]", className)}>
      <div className="aspect-[9/19.5] overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Image alt={alt} className="block h-auto w-full pt-[11%]" height={height} sizes="270px" src={src} width={width} />
      </div>
    </IPhoneFrame>
  );
}

/** A single phone screenshot in an iPhone, shown whole. */
export function IPhoneShot({ src, alt, width, height, sizes, priority, className, dim }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  dim?: boolean;
}) {
  return (
    <IPhoneFrame className={className} dim={dim}>
      <Image alt={alt} className="block h-auto w-full" height={height} priority={priority} sizes={sizes} src={src} width={width} />
    </IPhoneFrame>
  );
}
