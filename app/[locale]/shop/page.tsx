"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data/products";
import type { ProductTag } from "@/lib/data/products";

const VALID_TAGS: ProductTag[] = ["best-seller", "romantic-gift", "new", "popular"];

function filterProducts(categoryParam: string | null, tagParam: string | null) {
  let list = products;
  if (categoryParam) {
    list = list.filter((p) => p.category === categoryParam);
  }
  if (tagParam && VALID_TAGS.includes(tagParam as ProductTag)) {
    list = list.filter((p) => p.tags?.includes(tagParam as ProductTag));
  }
  return list;
}

function ShopContent() {
  const { t, path } = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const tagParam = searchParams.get("tag");

  const filteredProducts = filterProducts(categoryParam, tagParam);

  const categoryLabels: Record<string, string> = {
    "lingerie-sets": t.categories.lingerieSets,
    bras: t.categories.bras,
    panties: t.categories.panties,
    sleepwear: t.categories.sleepwear,
    bridal: t.categories.bridal,
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Link
          href={path("/shop")}
          className={`min-h-[44px] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:min-h-0 ${!categoryParam && !tagParam ? "border-transparent bg-foreground text-white shadow-sm" : "border-transparent bg-white text-foreground shadow-sm hover:border-neutral-400 hover:bg-neutral-900/10 hover:text-neutral-900"}`}
        >
          {t.shop.all}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={path(`/shop?category=${cat.slug}`)}
            className={`min-h-[44px] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:min-h-0 ${categoryParam === cat.slug && !tagParam ? "border-neutral-900 bg-neutral-900/10 text-neutral-900" : "border-transparent bg-white text-foreground shadow-sm hover:border-neutral-400 hover:bg-neutral-900/10 hover:text-neutral-900"}`}
          >
            {categoryLabels[cat.slug] || cat.slug}
          </Link>
        ))}
        <Link
          href={path("/shop?tag=romantic-gift")}
          className={`min-h-[44px] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:min-h-0 ${tagParam === "romantic-gift" ? "border-neutral-900 bg-neutral-900/10 text-neutral-900" : "border-transparent bg-white text-foreground shadow-sm hover:border-neutral-400 hover:bg-neutral-900/10 hover:text-neutral-900"}`}
        >
          {t.romanticGifts.tag}
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-12 text-center text-foreground/70">{t.shop.filteredEmpty}</p>
      )}
    </>
  );
}

function ShopPageHeader() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const tagParam = searchParams.get("tag");

  let title: string = t.shop.title;
  let subtitle: string = t.shop.filterBy;

  if (tagParam === "romantic-gift") {
    title = t.shop.romanticGiftTitle;
    subtitle = t.shop.romanticGiftSubtitle;
  } else if (categoryParam === "sleepwear" && !tagParam) {
    title = t.shop.sleepwearFocusTitle;
    subtitle = t.shop.sleepwearFocusSubtitle;
  } else if (categoryParam === "bridal" && !tagParam) {
    title = t.shop.bridalFocusTitle;
    subtitle = t.shop.bridalFocusSubtitle;
  } else if (categoryParam === "lingerie-sets" && !tagParam) {
    title = t.shop.lingerieSetsFocusTitle;
    subtitle = t.shop.lingerieSetsFocusSubtitle;
  }

  return (
    <header className="mb-8 sm:mb-12">
      <h1 className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-4xl">{title}</h1>
      <p className="mt-1.5 max-w-2xl text-sm text-foreground/70 sm:mt-2 sm:text-base">{subtitle}</p>
    </header>
  );
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl bg-neutral-100 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Suspense fallback={<div className="mb-8 h-24 animate-pulse rounded-xl bg-white/80" />}>
        <ShopPageHeader />
      </Suspense>

      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
