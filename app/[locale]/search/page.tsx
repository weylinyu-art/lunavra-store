"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/search";

function SearchContent() {
  const { t, path, locale } = useLocale();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const results = q.trim() ? searchProducts(q, locale) : [];

  if (!q.trim()) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-foreground/80">{t.search.enterQuery}</p>
        <Link
          href={path("/shop")}
          className="mt-4 inline-block text-neutral-900 font-medium hover:underline"
        >
          {t.search.browseAll}
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-foreground/70 sm:text-base">
        {t.search.resultsFor} &quot;{q}&quot;: {results.length} {t.search.items}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {results.length === 0 && (
        <div className="mt-12 rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-foreground/80">{t.search.noResults}</p>
          <Link
            href={path("/shop")}
            className="mt-4 inline-block rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-foreground/90"
          >
            {t.search.browseAll}
          </Link>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-7xl bg-neutral-100 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8">
        <h1 className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl">
          {t.search.title}
        </h1>
      </header>
      <Suspense fallback={<div className="animate-pulse h-32 bg-white rounded-xl" />}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
