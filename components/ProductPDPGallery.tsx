"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProductPDPGalleryProps {
  images: string[];
  altFor: (index: number) => string;
  /** Tags / fulfillment pills — top-start overlay */
  overlay?: React.ReactNode;
}

export default function ProductPDPGallery({ images, altFor, overlay }: ProductPDPGalleryProps) {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (i: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (!w) return;
      const idx = Math.max(0, Math.min(i, images.length - 1));
      el.scrollTo({ left: idx * w, behavior: "smooth" });
      setActive(idx);
    },
    [images.length]
  );

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (!w) return;
    const idx = Math.round(el.scrollLeft / w);
    const clamped = Math.max(0, Math.min(idx, images.length - 1));
    setActive((prev) => (prev === clamped ? prev : clamped));
  }, [images.length]);

  useEffect(() => {
    const onResize = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (!w) return;
      const idx = Math.round(el.scrollLeft / w);
      el.scrollTo({ left: idx * w, behavior: "auto" });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="flex w-full max-w-full flex-col gap-3 self-start lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)]">
      <div className="relative -mx-4 w-[calc(100%+2rem)] overflow-hidden bg-[#ebe8e4] sm:mx-0 sm:w-full sm:rounded-2xl lg:rounded-2xl">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        >
          {images.map((src, i) => (
            <div key={src + i} className="relative min-w-full shrink-0 snap-center snap-always">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={src}
                  alt={altFor(i)}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {overlay ? (
          <div className="pointer-events-none absolute start-0 top-0 z-[1] w-full max-w-[calc(100%-4rem)] p-3 sm:p-4">
            <div className="pointer-events-auto flex flex-wrap gap-2">{overlay}</div>
          </div>
        ) : null}

        <div
          className="pointer-events-none absolute end-3 top-3 z-[1] rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm"
          aria-live="polite"
        >
          {active + 1}/{images.length}
        </div>

        {images.length > 1 ? (
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-[1] flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}`}
                aria-pressed={i === active}
                className={`pointer-events-auto h-1.5 rounded-full transition-all duration-200 ${
                  i === active ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/45 hover:bg-white/70"
                }`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:gap-2.5"
          role="tablist"
          aria-label="Product thumbnails"
        >
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => goTo(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-[4.25rem] sm:w-[4.25rem] ${
                active === i ? "border-[#C9A962] ring-2 ring-[#C9A962]/25" : "border-transparent hover:border-foreground/15"
              }`}
            >
              <Image src={src} alt={altFor(i)} fill unoptimized className="object-cover" sizes="72px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
