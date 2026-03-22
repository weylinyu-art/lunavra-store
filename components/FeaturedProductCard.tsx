"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Product } from "@/lib/data/products";
import FulfillmentBadge from "@/components/FulfillmentBadge";

interface FeaturedProductCardProps {
  product: Product;
  teaser: string;
  hoverHint: string;
}

export default function FeaturedProductCard({ product, teaser, hoverHint }: FeaturedProductCardProps) {
  const { locale, path, t } = useLocale();
  const name = locale === "ar" ? product.nameAr : product.name;
  const [isHovered, setIsHovered] = useState(false);
  const hasAlternate = product.images?.length > 1;
  const displayImage = hasAlternate && isHovered ? product.images[1] : product.image;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(201,169,98,0.18)]">
      <Link
        href={path(`/product/${product.id}`)}
        className="relative block aspect-[3/4] overflow-hidden bg-[#FAF8F5]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={displayImage}
          alt={name}
          fill
          unoptimized
          className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <div className="pointer-events-none absolute bottom-3 start-3 z-[5]">
          <FulfillmentBadge product={product} placement="card" />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-4 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        >
          <p className="text-center text-xs font-medium uppercase tracking-widest text-white/95">{hoverHint}</p>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-heading text-lg font-medium text-foreground">{name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/75">{teaser}</p>
        <p className="mt-3 font-semibold text-[#C9A962]">${product.price}</p>
        <Link
          href={path(`/product/${product.id}`)}
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#C9A962]/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-[#C9A962] hover:bg-[#C9A962]/10"
        >
          {t.featured.cta}
        </Link>
      </div>
    </article>
  );
}
