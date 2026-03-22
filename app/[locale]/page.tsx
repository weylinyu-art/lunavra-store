"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import { products, categories } from "@/lib/data/products";
import { looks, getLookProducts } from "@/lib/data/looks";
import { featuredCopy, featuredProductIds } from "@/lib/content/featured-copy";

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
  const { t, path, locale } = useLocale();
  const newArrivals = products.filter((p) => p.tags?.includes("new")).slice(0, 8);
  const bestSellers = products.filter((p) => p.tags?.includes("best-seller") || p.tags?.includes("popular"));
  const giftProducts = products.filter((p) => p.tags?.includes("romantic-gift")).slice(0, 8);
  const allProducts = products.slice(0, 28);
  const featuredLook = looks[0];
  const lookProducts = getLookProducts(featuredLook);
  const copyLocale = locale === "ar" ? "ar" : "en";
  const featuredItems = featuredProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

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
        <p className="sr-only">{t.hero.visualDescription}</p>
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
              href={path("/shop")}
              className="flex min-h-[48px] items-center justify-center rounded-lg border border-white/60 px-8 py-3.5 text-base font-medium text-white transition-all duration-300 active:scale-[0.98] sm:inline-flex sm:min-h-0 sm:py-3 sm:text-sm hover:border-white hover:bg-white/10"
            >
              {t.hero.exploreCollection}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core trust — payment, discreet, returns, size guide */}
      <section className="bg-[#FFFEF9] px-4 py-10 sm:py-14 md:py-20" aria-labelledby="core-trust-heading">
        <h2 id="core-trust-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
          {t.trust.title}
        </h2>
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {[
            { title: t.trust.paymentSecurity, desc: t.trust.paymentSecurityDesc, emoji: "🔒" },
            { title: t.trust.discreet, desc: t.trust.discreetDesc, emoji: "📦" },
            { title: t.trust.easyReturns, desc: t.trust.easyReturnsDesc, emoji: "↩" },
            { title: t.trust.sizeGuideTrust, desc: t.trust.sizeGuideTrustDesc, emoji: "📏" },
          ].map((item) => (
            <div
              key={item.title}
              className="hover-lift rounded-2xl border border-[#E8C4C4]/40 bg-[#FDF2F4]/80 p-6 text-center transition-all duration-300"
            >
              <span className="text-3xl" aria-hidden>
                {item.emoji}
              </span>
              <h3 className="font-heading mt-3 text-lg font-medium text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured products */}
      <section className="bg-gradient-to-b from-[#FAF8F5] to-[#FFFEF9] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="featured-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
            {t.featured.title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-foreground/75 sm:text-base">{t.featured.subtitle}</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {featuredItems.map((product) => {
              const fc = featuredCopy[copyLocale][product.id] ?? featuredCopy.en[product.id];
              if (!fc) return null;
              return (
                <FeaturedProductCard key={product.id} product={product} teaser={fc.teaser} hoverHint={fc.hoverHint} />
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Category quick links (four) */}
      <section className="bg-[#FDF2F4] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
          {t.categories.title}
        </h2>
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4">
          {[
            { slug: "lingerie-sets", name: t.categories.lingerieSets },
            { slug: "bras", name: t.categories.bras },
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

      {/* 5. Brand story */}
      <section className="bg-[#FFFEF9] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="brand-story-heading">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#FDF2F4]">
            <Image
              src="https://images.unsplash.com/photo-1584137294091-5de5bcdf12c8?w=1200&h=900&fit=crop&q=80"
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <p className="sr-only">{t.brandStory.visualDescription}</p>
          </div>
          <div>
            <h2 id="brand-story-heading" className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl">
              {t.brandStory.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">{t.brandStory.body}</p>
            <Link
              href={path("/about")}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-foreground px-8 py-3 text-sm font-medium text-[#FFFEF9] transition-colors hover:bg-foreground/90"
            >
              {t.brandStory.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Blog / style guide highlights */}
      <section className="bg-gradient-to-b from-[#FAF8F5] to-[#FDF2F4] px-4 py-10 sm:py-16 md:py-24" aria-labelledby="journal-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="journal-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
            {t.blogSection.title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-foreground/75 sm:text-base">{t.blogSection.subtitle}</p>
          <p className="sr-only">{t.blogSection.metaSeoLine}</p>
          <div className="mt-8 grid gap-6 sm:mt-12 md:grid-cols-3">
            {[
              {
                title: t.blogHighlights.oneTitle,
                keyword: t.blogHighlights.oneKeyword,
                desc: t.blogHighlights.oneDesc,
                slug: t.blogHighlights.oneSlug,
              },
              {
                title: t.blogHighlights.twoTitle,
                keyword: t.blogHighlights.twoKeyword,
                desc: t.blogHighlights.twoDesc,
                slug: t.blogHighlights.twoSlug,
              },
              {
                title: t.blogHighlights.threeTitle,
                keyword: t.blogHighlights.threeKeyword,
                desc: t.blogHighlights.threeDesc,
                slug: t.blogHighlights.threeSlug,
              },
            ].map((article) => (
              <article
                key={article.slug}
                className="flex flex-col rounded-2xl border border-[#E8C4C4]/40 bg-[#FFFEF9] p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#C9A962]">{article.keyword}</p>
                <h3 className="font-heading mt-2 text-lg font-medium leading-snug text-foreground">{article.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">{article.desc}</p>
                <Link
                  href={path(`/blog/${article.slug}`)}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center text-sm font-medium text-[#C9A962] hover:underline"
                >
                  {t.blogSection.readArticle}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={path("/blog")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#C9A962]/50 px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-[#C9A962] hover:bg-[#C9A962]/10"
            >
              {t.blogSection.discoverMore}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Flash Picks / New Arrivals */}
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
          <div className="text-center">
            <h2 id="gifts-heading" className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-4xl">
              {t.romanticGifts.title}
            </h2>
            <p className="mt-2 text-sm text-foreground/70 sm:text-base">{t.romanticGifts.banner}</p>
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

      {/* Instagram Horizontal Scroll */}
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
