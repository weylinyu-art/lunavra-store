"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, path, t } = useLocale();
  const name = locale === "ar" ? product.nameAr : product.name;

  return (
    <article className="group">
      <Link
        href={path(`/product/${product.id}`)}
        className="block overflow-hidden rounded-lg bg-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(201,169,98,0.15)]"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
          <Image
            src={product.image}
            alt={name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute top-3 start-3 flex flex-wrap gap-2">
            {product.tags?.includes("best-seller") && (
              <span className="rounded-full bg-[#C9A962] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
                {t.bestSellers.tag}
              </span>
            )}
            {product.tags?.includes("romantic-gift") && (
              <span className="rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
                {t.romanticGifts.tag}
              </span>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-heading text-lg font-medium text-foreground transition-colors group-hover:text-[#C9A962]">
            {name}
          </h3>
          <p className="mt-2 font-semibold text-[#C9A962]">${product.price}</p>
        </div>
      </Link>
    </article>
  );
}
