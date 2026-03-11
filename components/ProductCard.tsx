"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  showNewBadge?: boolean;
  giftMode?: boolean;
}

function GiftRibbon() {
  return (
    <div
      className="pointer-events-none absolute end-0 top-0 z-10"
      aria-hidden
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="drop-shadow-sm">
        <path
          d="M48 0v20c0 4-4 8-8 8H8c-4 0-8-4-8-8V0h48z"
          fill="#C9A962"
          fillOpacity={0.95}
        />
        <path
          d="M24 0v28M8 8h32"
          stroke="#FFFEF9"
          strokeWidth={1.5}
          strokeOpacity={0.9}
        />
        <circle cx="24" cy="10" r="3" fill="#FFFEF9" fillOpacity={0.9} />
      </svg>
    </div>
  );
}

export default function ProductCard({ product, showNewBadge, giftMode }: ProductCardProps) {
  const { locale, path, t } = useLocale();
  const name = locale === "ar" ? product.nameAr : product.name;
  const [isHovered, setIsHovered] = useState(false);
  const hasAlternate = product.images?.length > 1;
  const displayImage = hasAlternate && isHovered ? product.images[1] : product.image;

  return (
    <article className={`group ${giftMode ? "gift-card" : ""}`}>
      <Link
        href={path(`/product/${product.id}`)}
        className={`block overflow-hidden rounded-lg bg-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-1 ${
          giftMode
            ? "border-2 border-[#C9A962]/30 ring-2 ring-[#E8C4C4]/20 hover:border-[#C9A962]/50 hover:shadow-[0_12px_28px_rgba(201,169,98,0.2)]"
            : "hover:shadow-[0_12px_24px_rgba(201,169,98,0.15)]"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative aspect-[3/4] overflow-hidden bg-[#FAF8F5] ${giftMode ? "gift-card-image" : ""}`}>
          {giftMode && <GiftRibbon />}
          <Image
            src={displayImage}
            alt={name}
            fill
            unoptimized
            className={`object-cover transition-all duration-500 ease-out ${giftMode ? "group-hover:scale-[1.03]" : "group-hover:scale-105"}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className={`absolute flex flex-wrap gap-2 ${giftMode ? "top-10 start-3" : "top-3 start-3"}`}>
            {giftMode && (
              <span className="rounded-full bg-[#C9A962] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
                {t.romanticGifts.tag}
              </span>
            )}
            {!giftMode && (product.tags?.includes("new") || showNewBadge) && (
              <span className="rounded-full bg-[#E8C4C4] px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground shadow-sm">
                {t.newArrivals.tag}
              </span>
            )}
            {!giftMode && product.tags?.includes("popular") && (
              <span className="rounded-full bg-[#D4A5A5] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
                {t.bestSellers.tagPopular}
              </span>
            )}
            {!giftMode && product.tags?.includes("best-seller") && (
              <span className="rounded-full bg-[#C9A962] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
                {t.bestSellers.tag}
              </span>
            )}
            {!giftMode && product.tags?.includes("romantic-gift") && (
              <span className="rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
                {t.romanticGifts.tag}
              </span>
            )}
          </div>
        </div>
        <div className={`p-4 ${giftMode ? "border-t border-[#C9A962]/20 bg-gradient-to-b from-[#FFFEF9] to-[#FAF8F5]" : ""}`}>
          <h3 className="font-heading text-lg font-medium text-foreground transition-colors group-hover:text-[#C9A962]">
            {name}
          </h3>
          <p className="mt-2 font-semibold text-[#C9A962]">${product.price}</p>
        </div>
      </Link>
    </article>
  );
}
