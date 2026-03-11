"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data/products";
import { looks, getLookProducts } from "@/lib/data/looks";

const HERO_BG =
  "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=1920&h=1080&fit=crop";

const INSTAGRAM_IMAGES = [
  "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=300&h=300&fit=crop",
];

export default function HomePage() {
  const { t, path } = useLocale();
  const newArrivals = products.filter((p) => p.tags?.includes("new")).slice(0, 8);
  const bestSellers = products.filter((p) => p.tags?.includes("best-seller") || p.tags?.includes("popular"));
  const giftProducts = products.filter((p) => p.tags?.includes("romantic-gift")).slice(0, 8);
  const allProducts = products.slice(0, 28);
  const featuredLook = looks[0];
  const lookProducts = getLookProducts(featuredLook);

  return (
    <>
      {/* 1. Hero Banner */}
      <section
        className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center"
        aria-labelledby="hero-heading"
      >
        <Image
          src={HERO_BG}
          alt=""
          fill
          unoptimized
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10">
          <div className="mb-4 flex justify-center gap-3">
            <span className="rounded-full bg-[#FFFEF9]/90 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground">
              {t.hero.badgeNew}
            </span>
            <span className="rounded-full bg-[#C9A962]/90 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white">
              {t.hero.badgeTrending}
            </span>
          </div>
          <h1 id="hero-heading" className="font-heading max-w-3xl text-4xl font-light leading-tight tracking-wide text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            {t.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/95 drop-shadow md:text-xl">
            {t.hero.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={path("/shop")}
              className="rounded-lg bg-[#FFFEF9] px-8 py-3.5 text-sm font-medium text-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFFEF9]/95 hover:shadow-xl"
            >
              {t.hero.shopNow}
            </Link>
            <Link
              href={path("/gift")}
              className="rounded-lg border-2 border-[#C9A962] bg-transparent px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A962]/20"
            >
              {t.hero.giftForWife}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Quick Categories (4–5 cards) */}
      <section className="bg-[#FDF2F4] px-4 py-16 md:py-24" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {t.categories.title}
        </h2>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[
            { slug: "lingerie-sets", name: t.categories.lingerieSets },
            { slug: "bras", name: t.categories.bras },
            { slug: "panties", name: t.categories.panties },
            { slug: "sleepwear", name: t.categories.sleepwear },
          ].map((cat) => {
            const categoryData = categories.find((c) => c.slug === cat.slug);
            return (
              <Link
                key={cat.slug}
                href={path(`/shop?category=${cat.slug}`)}
                className="hover-lift group relative aspect-square overflow-hidden rounded-xl bg-[#FFFEF9] shadow-sm transition-all duration-300"
              >
                {categoryData?.image && (
                  <Image
                    src={categoryData.image}
                    alt={cat.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/40 font-medium text-white transition-colors group-hover:bg-foreground/50">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Flash Picks / New Arrivals (6–8 products, 3×2) */}
      <section className="bg-gradient-to-b from-[#FFFEF9] to-[#FAF8F5] px-4 py-16 md:py-24" aria-labelledby="flash-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="flash-heading" className="font-heading text-2xl font-light tracking-wide text-foreground md:text-3xl">
            {t.flashPicks.title}
          </h2>
          <p className="mt-2 text-foreground/70">{t.flashPicks.subtitle}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {(newArrivals.length >= 6 ? newArrivals : products.slice(0, 8)).map((product) => (
              <ProductCard key={product.id} product={product} showNewBadge />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Now / Best Sellers (4×2) */}
      <section className="bg-[#FDF2F4] px-4 py-16 md:py-24" aria-labelledby="trending-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="trending-heading" className="font-heading text-2xl font-light tracking-wide text-foreground md:text-3xl">
            {t.bestSellers.title}
          </h2>
          <p className="mt-2 text-foreground/70">{t.bestSellers.subtitle}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {bestSellers.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={path("/shop")}
              className="inline-block rounded-lg border border-[#C9A962]/50 px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A962] hover:bg-[#C9A962]/5"
            >
              {t.hero.shopNow}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Gift Picks / Gift for Wife */}
      <section className="bg-gradient-to-b from-[#FAF8F5] to-[#FFFEF9] px-4 py-16 md:py-24" aria-labelledby="gifts-heading">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-[#FDF2F4] p-8 text-center md:p-12">
            <h2 id="gifts-heading" className="font-heading text-2xl font-light tracking-wide text-foreground md:text-4xl">
              {t.romanticGifts.title}
            </h2>
            <p className="mt-4 text-lg text-foreground/80">{t.romanticGifts.banner}</p>
            <p className="mt-2 text-foreground/70">{t.romanticGifts.message}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {giftProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={path("/gift")}
              className="inline-block rounded-lg bg-foreground px-8 py-3.5 text-sm font-medium text-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md"
            >
              {t.romanticGifts.exploreGifts}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Product Grid (4×3–4 rows, 25–30 products) */}
      <section className="bg-[#FDF2F4] px-4 py-16 md:py-24" aria-labelledby="more-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="more-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
            {t.shop.title}
          </h2>
          <p className="mt-2 text-center text-foreground/70">{t.shop.filterBy}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={path("/shop")}
              className="inline-block rounded-lg border border-[#C9A962]/50 px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A962] hover:bg-[#C9A962]/5"
            >
              {t.hero.shopNow}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Shop the Look */}
      <section className="bg-[#FAF8F5] px-4 py-16 md:py-24" aria-labelledby="look-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="look-heading" className="font-heading text-2xl font-light tracking-wide text-foreground md:text-3xl">
            {t.shopTheLook.title}
          </h2>
          <p className="mt-2 text-foreground/70">{t.shopTheLook.subtitle}</p>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src={featuredLook.image}
                alt={featuredLook.name}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="font-heading text-xl font-medium text-foreground">{featuredLook.name}</h3>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {lookProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Link
                href={path(`/shop?category=${lookProducts[0]?.category ?? "lingerie-sets"}`)}
                className="mt-6 inline-block rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-[#FFFEF9] transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90"
              >
                {t.shopTheLook.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Discreet Packaging + COD Trust */}
      <section className="bg-[#FFFEF9] px-4 py-16 md:py-24" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {t.trust.title}
        </h2>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="hover-lift rounded-2xl border border-[#E8C4C4]/50 bg-[#FDF2F4] p-8 text-center transition-all duration-300">
            <span className="text-4xl">📦</span>
            <h3 className="font-heading mt-4 text-xl font-medium text-foreground">
              {t.trust.discreet}
            </h3>
            <p className="mt-2 text-foreground/80">{t.trust.discreetDesc}</p>
          </div>
          <div className="hover-lift rounded-2xl border border-[#C9A962]/30 bg-[#FAF8F5] p-8 text-center transition-all duration-300">
            <span className="text-4xl">💵</span>
            <h3 className="font-heading mt-4 text-xl font-medium text-foreground">
              {t.trust.cod}
            </h3>
            <p className="mt-2 text-foreground/80">{t.trust.codDesc}</p>
          </div>
        </div>
      </section>

      {/* 9. Instagram Horizontal Scroll */}
      <section className="bg-[#FAF8F5] px-4 py-16 md:py-24" aria-labelledby="instagram-heading">
        <h2 id="instagram-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {t.instagram.title}
        </h2>
        <p className="mt-2 text-center text-foreground/80">{t.instagram.handle}</p>
        <div className="mx-auto mt-12 flex max-w-full overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {INSTAGRAM_IMAGES.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/nilechic"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 overflow-hidden rounded-lg shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={src}
                alt={`Instagram ${i + 1}`}
                className="h-64 w-64 object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72 sm:w-72"
              />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
