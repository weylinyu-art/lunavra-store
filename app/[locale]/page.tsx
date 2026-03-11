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
      {/* 1. Hero Banner - mobile: compact height, bottom-aligned content */}
      <section
        className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden px-4 pb-8 pt-20 sm:min-h-[80vh] sm:pb-12 sm:pt-24 md:min-h-[88vh] md:justify-center md:pb-24 md:pt-32"
        aria-labelledby="hero-heading"
      >
        <Image
          src={HERO_BG}
          alt=""
          fill
          unoptimized
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent md:from-black/50 md:via-black/25 md:to-black/20" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <div className="mb-2 flex flex-wrap gap-2 sm:mb-3">
            <span className="rounded px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white/90 sm:px-3">
              {t.hero.badgeNew}
            </span>
            <span className="rounded px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[#C9A962] sm:px-3">
              {t.hero.badgeTrending}
            </span>
          </div>
          <h1 id="hero-heading" className="font-heading text-2xl font-light leading-[1.25] tracking-wide text-white sm:text-4xl md:text-5xl md:leading-[1.15] lg:text-6xl">
            {t.hero.headline}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:mt-4 sm:text-base md:text-lg lg:text-xl">
            {t.hero.subheadline}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href={path("/shop")}
              className="flex min-h-[48px] items-center justify-center rounded-lg bg-[#FFFEF9] px-8 py-3.5 text-base font-medium text-foreground transition-all duration-300 active:scale-[0.98] sm:inline-flex sm:min-h-0 sm:py-3 sm:text-sm hover:bg-white hover:shadow-lg"
            >
              {t.hero.shopNow}
            </Link>
            <Link
              href={path("/gift")}
              className="flex min-h-[48px] items-center justify-center rounded-lg border border-white/60 px-8 py-3.5 text-base font-medium text-white transition-all duration-300 active:scale-[0.98] sm:inline-flex sm:min-h-0 sm:py-3 sm:text-sm hover:border-white hover:bg-white/10"
            >
              {t.hero.giftForWife}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Quick Categories - mobile: 2 cols, larger tap targets */}
      <section className="bg-[#FDF2F4] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
          {t.categories.title}
        </h2>
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {[
            { slug: "lingerie-sets", name: t.categories.lingerieSets },
            { slug: "bras", name: t.categories.bras },
            { slug: "panties", name: t.categories.panties },
            { slug: "sleepwear", name: t.categories.sleepwear },
            { slug: "bridal", name: t.categories.bridal },
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

      {/* 3. Flash Picks / New Arrivals */}
      <section className="bg-gradient-to-b from-[#FFFEF9] to-[#FAF8F5] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="flash-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="flash-heading" className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
            {t.flashPicks.title}
          </h2>
          <p className="mt-1.5 text-sm text-foreground/70 sm:mt-2 sm:text-base">{t.flashPicks.subtitle}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            {(newArrivals.length >= 6 ? newArrivals : products.slice(0, 8)).map((product) => (
              <ProductCard key={product.id} product={product} showNewBadge />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Now / Best Sellers */}
      <section className="bg-[#FDF2F4] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="trending-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="trending-heading" className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
            {t.bestSellers.title}
          </h2>
          <p className="mt-1.5 text-sm text-foreground/70 sm:mt-2 sm:text-base">{t.bestSellers.subtitle}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            {bestSellers.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:mt-10">
            <Link
              href={path("/shop")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#C9A962]/50 px-8 py-3 text-base font-medium text-foreground transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:py-2.5 sm:text-sm hover:-translate-y-0.5 hover:border-[#C9A962] hover:bg-[#C9A962]/5"
            >
              {t.hero.shopNow}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Gift Picks / Gift for Wife */}
      <section className="bg-gradient-to-b from-[#FAF8F5] to-[#FFFEF9] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="gifts-heading">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl bg-[#FDF2F4] p-6 text-center sm:rounded-2xl sm:p-8 md:p-12">
            <h2 id="gifts-heading" className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-4xl">
              {t.romanticGifts.title}
            </h2>
            <p className="mt-3 text-base text-foreground/80 sm:mt-4 sm:text-lg">{t.romanticGifts.banner}</p>
            <p className="mt-1.5 text-sm text-foreground/70 sm:mt-2 sm:text-base">{t.romanticGifts.message}</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            {giftProducts.map((product) => (
              <ProductCard key={product.id} product={product} giftMode />
            ))}
          </div>
          <div className="mt-8 text-center sm:mt-10">
            <Link
              href={path("/gift")}
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-foreground px-8 py-3.5 text-base font-medium text-[#FFFEF9] shadow-sm transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:text-sm hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md"
            >
              {t.romanticGifts.exploreGifts}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Product Grid */}
      <section className="bg-[#FDF2F4] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="more-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="more-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
            {t.shop.title}
          </h2>
          <p className="mt-1.5 text-center text-sm text-foreground/70 sm:mt-2 sm:text-base">{t.shop.filterBy}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:mt-10">
            <Link
              href={path("/shop")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#C9A962]/50 px-8 py-3 text-base font-medium text-foreground transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:py-2.5 sm:text-sm hover:-translate-y-0.5 hover:border-[#C9A962] hover:bg-[#C9A962]/5"
            >
              {t.hero.shopNow}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Shop the Look */}
      <section className="bg-[#FAF8F5] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="look-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="look-heading" className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
            {t.shopTheLook.title}
          </h2>
          <p className="mt-1.5 text-sm text-foreground/70 sm:mt-2 sm:text-base">{t.shopTheLook.subtitle}</p>
          <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2">
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
              <h3 className="font-heading text-lg font-medium text-foreground sm:text-xl">{featuredLook.name}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-3">
                {lookProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Link
                href={path(`/shop?category=${lookProducts[0]?.category ?? "lingerie-sets"}`)}
                className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-foreground px-6 py-3 text-base font-medium text-[#FFFEF9] transition-all duration-300 active:scale-[0.98] sm:mt-6 sm:min-h-0 sm:text-sm hover:-translate-y-0.5 hover:bg-foreground/90"
              >
                {t.shopTheLook.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why Choose NileChic Trust */}
      <section className="bg-[#FFFEF9] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
          {t.trust.title}
        </h2>
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="hover-lift rounded-2xl border border-[#E8C4C4]/50 bg-[#FDF2F4] p-6 text-center transition-all duration-300">
            <span className="text-4xl">📦</span>
            <h3 className="font-heading mt-4 text-lg font-medium text-foreground">{t.trust.discreet}</h3>
            <p className="mt-2 text-sm text-foreground/80">{t.trust.discreetDesc}</p>
          </div>
          <div className="hover-lift rounded-2xl border border-[#C9A962]/30 bg-[#FAF8F5] p-6 text-center transition-all duration-300">
            <span className="text-4xl">💵</span>
            <h3 className="font-heading mt-4 text-lg font-medium text-foreground">{t.trust.cod}</h3>
            <p className="mt-2 text-sm text-foreground/80">{t.trust.codDesc}</p>
          </div>
          <div className="hover-lift rounded-2xl border border-[#E8C4C4]/50 bg-[#FDF2F4] p-6 text-center transition-all duration-300">
            <span className="text-4xl">📋</span>
            <h3 className="font-heading mt-4 text-lg font-medium text-foreground">{t.trust.localStock}</h3>
            <p className="mt-2 text-sm text-foreground/80">{t.trust.localStockDesc}</p>
          </div>
          <div className="hover-lift rounded-2xl border border-[#C9A962]/30 bg-[#FAF8F5] p-6 text-center transition-all duration-300">
            <span className="text-4xl">🚚</span>
            <h3 className="font-heading mt-4 text-lg font-medium text-foreground">{t.trust.fastDelivery}</h3>
            <p className="mt-2 text-sm text-foreground/80">{t.trust.fastDeliveryDesc}</p>
          </div>
          <div className="hover-lift rounded-2xl border border-[#E8C4C4]/50 bg-[#FDF2F4] p-6 text-center transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <span className="text-4xl">🌍</span>
            <h3 className="font-heading mt-4 text-lg font-medium text-foreground">{t.trust.regions}</h3>
            <p className="mt-2 text-sm text-foreground/80">{t.trust.regionsDesc}</p>
          </div>
        </div>
      </section>

      {/* 9. Instagram Horizontal Scroll */}
      <section className="bg-[#FAF8F5] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="instagram-heading">
        <h2 id="instagram-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
          {t.instagram.title}
        </h2>
        <p className="mt-1.5 text-center text-sm text-foreground/80 sm:mt-2 sm:text-base">{t.instagram.handle}</p>
        <div className="mx-auto -mx-4 mt-8 flex max-w-full overflow-x-auto gap-3 px-4 pb-4 sm:mx-0 sm:mt-12 sm:gap-4 sm:px-0 scrollbar-hide">
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
                className="h-48 w-48 shrink-0 object-cover transition-transform duration-500 sm:h-64 sm:w-64 group-hover:scale-105 md:h-72 md:w-72"
              />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
