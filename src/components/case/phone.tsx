import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A clean iPhone frame: titanium edge, Dynamic Island, side buttons and a
 * screen that scrolls the full page inside it.
 */
export function IPhone({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-[290px]", className)}>
      {/* Side buttons */}
      <span aria-hidden className="absolute top-[110px] -left-[3px] h-7 w-[3px] rounded-l bg-zinc-700" />
      <span aria-hidden className="absolute top-[160px] -left-[3px] h-12 w-[3px] rounded-l bg-zinc-700" />
      <span aria-hidden className="absolute top-[222px] -left-[3px] h-12 w-[3px] rounded-l bg-zinc-700" />
      <span aria-hidden className="absolute top-[180px] -right-[3px] h-20 w-[3px] rounded-r bg-zinc-700" />
      <div className="rounded-[3.1rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-700 p-[3px] shadow-[0_50px_100px_-40px_rgba(20,15,60,0.7)]">
        <div className="rounded-[2.95rem] bg-black p-[10px]">
          <div className="relative h-[580px] overflow-hidden rounded-[2.4rem] bg-white">
            <span aria-hidden className="absolute top-2.5 left-1/2 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
            <div className="h-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Image alt={alt} className="block h-auto w-full pt-9" height={height} sizes="270px" src={src} width={width} />
            </div>
            <span aria-hidden className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-black/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
