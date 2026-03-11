"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data/products";

export default function GiftPage() {
  const { t, path } = useLocale();
  const featuredProducts = products.filter((p) => p.featured);
  const giftProducts = products.filter((p) => p.tags?.includes("romantic-gift"));
  const displayProducts = giftProducts.length >= 4 ? giftProducts : featuredProducts;

  const giftCategories = [
    { name: t.gift.forHer, slug: "for-her" },
    { name: t.gift.forYourself, slug: "for-yourself" },
    { name: t.gift.anniversary, slug: "anniversary" },
    { name: t.gift.birthday, slug: "birthday" },
  ];

  return (
    <div className="bg-[#FDF2F4]">
      {/* Hero - full romantic copy restored */}
      <section className="bg-gradient-to-b from-[#FAE8EC] via-[#FDF2F4] to-[#FFFEF9] px-4 py-12 text-center sm:py-20">
        <h1 className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-5xl">
          {t.gift.heroTitle}
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base text-foreground/85 sm:mt-6 sm:text-lg">
          {t.romanticGifts.banner}
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-foreground/70 sm:mt-4 sm:text-base">
          {t.romanticGifts.message}
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Gift categories - mobile: 2 cols, touch-friendly */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {giftCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={path(`/shop?gift=${cat.slug}`)}
              className="hover-lift flex min-h-[80px] flex-col items-center justify-center rounded-xl bg-[#FFFEF9] p-6 shadow-sm transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:p-8"
            >
              <span className="font-medium text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* Gift products with distinctive styling */}
        <section className="mt-10 sm:mt-16" aria-labelledby="gift-products-heading">
          <h2 id="gift-products-heading" className="font-heading text-2xl font-light tracking-wide text-foreground">
            {t.romanticGifts.title}
          </h2>
          <p className="mt-4 text-lg text-foreground/80">{t.romanticGifts.banner}</p>
          <p className="mt-2 text-foreground/70">{t.romanticGifts.message}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} giftMode />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={path("/shop")}
              className="inline-block rounded-lg bg-foreground px-8 py-3.5 text-sm font-medium text-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md"
            >
              {t.hero.shopNow}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
