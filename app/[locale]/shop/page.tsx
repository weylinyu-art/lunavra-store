"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data/products";

function ShopContent() {
  const { t, path } = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const filteredProducts = categoryParam
    ? products.filter((p) => p.category === categoryParam)
    : products;

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
          className={`min-h-[44px] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:min-h-0 ${!categoryParam ? "border-transparent bg-foreground text-[#FFFEF9] shadow-sm" : "border-transparent bg-[#FFFEF9] text-foreground shadow-sm hover:border-[#C9A962] hover:bg-[#C9A962]/10 hover:text-[#C9A962]"}`}
        >
          {t.shop.all}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={path(`/shop?category=${cat.slug}`)}
            className={`min-h-[44px] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:min-h-0 ${categoryParam === cat.slug ? "border-[#C9A962] bg-[#C9A962]/10 text-[#C9A962]" : "border-transparent bg-[#FFFEF9] text-foreground shadow-sm hover:border-[#C9A962] hover:bg-[#C9A962]/10 hover:text-[#C9A962]"}`}
          >
            {categoryLabels[cat.slug] || cat.slug}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-12 text-center text-foreground/70">
          No products found in this category.
        </p>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl bg-[#FDF2F4] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 sm:mb-12">
        <h1 className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-4xl">
          <ShopPageTitle />
        </h1>
        <p className="mt-1.5 text-sm text-foreground/70 sm:mt-2 sm:text-base">
          <ShopPageSubtitle />
        </p>
      </header>

      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </div>
  );
}

function ShopPageTitle() {
  const { t } = useLocale();
  return <>{t.shop.title}</>;
}

function ShopPageSubtitle() {
  const { t } = useLocale();
  return <>{t.shop.filterBy}</>;
}
