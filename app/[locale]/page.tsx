"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import { products, categories, type Product } from "@/lib/data/products";
import { looks, getLookProducts } from "@/lib/data/looks";
import { featuredCopy, featuredProductIds } from "@/lib/content/featured-copy";

const HERO_BG =
  "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=1920&h=1080&fit=crop";

/** Six unique tiles for social strip (avoid duplicate assets). */
const SOCIAL_TILES = [
  "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1584137294091-5de5bcdf12c8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3d4460?w=400&h=400&fit=crop",
];

const PRODUCT_ROW = 4;

function pickNewArrivalsRow(): Product[] {
  const tagged = products.filter((p) => p.tags?.includes("new"));
  const row = tagged.slice(0, PRODUCT_ROW);
  if (row.length >= PRODUCT_ROW) return row;
  const ids = new Set(row.map((p) => p.id));
  for (const p of products) {
    if (row.length >= PRODUCT_ROW) break;
    if (!ids.has(p.id)) {
      row.push(p);
      ids.add(p.id);
    }
  }
  return row;
}

export default function HomePage() {
  const { t, path, locale } = useLocale();
  const newRow = pickNewArrivalsRow();

  const bestSellers = products
    .filter((p) => p.tags?.includes("best-seller") || p.tags?.includes("popular"))
    .slice(0, PRODUCT_ROW);

  const giftProducts = products.filter((p) => p.tags?.includes("romantic-gift")).slice(0, PRODUCT_ROW);
  const featuredLook = looks[0];
  const lookProducts = getLookProducts(featuredLook);
  const copyLocale = locale === "ar" ? "ar" : "en";
  const featuredItems = featuredProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const trustItems = [
    { title: t.trust.paymentSecurity, desc: t.trust.paymentSecurityDesc, mark: "01" },
    { title: t.trust.discreet, desc: t.trust.discreetDesc, mark: "02" },
    { title: t.trust.easyReturns, desc: t.trust.easyReturnsDesc, mark: "03" },
    { title: t.trust.sizeGuideTrust, desc: t.trust.sizeGuideTrustDesc, mark: "04" },
  ];

  return (
    <>
      {/* Hero — full-bleed mist: soft-blur photo + full-screen frosted veil (not a small glass card) */}
      <section
        className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-4 pb-10 pt-24 sm:min-h-[80vh] sm:pb-14 sm:pt-28 md:min-h-[88vh] md:pb-20 md:pt-32"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={HERO_BG}
            alt=""
            fill
            unoptimized
            className="scale-105 object-cover object-center blur-[2px] sm:blur-[3px]"
            priority
            sizes="100vw"
          />
        </div>
        {/* Full-area frosted veil: blurs + mutes the entire photo (reference: RodsHub-style mist) */}
        <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-md sm:backdrop-blur-lg" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/30" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.35)_100%)]" aria-hidden />
        <p className="sr-only">{t.hero.visualDescription}</p>

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-2 text-center sm:px-4">
          <div className="mb-4 flex flex-wrap justify-center gap-2 sm:mb-5">
            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/95 sm:px-3.5">
              {t.hero.badgeNew}
            </span>
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/95 sm:px-3.5">
              {t.hero.badgeTrending}
            </span>
          </div>
          <h1
            id="hero-heading"
            className="font-heading text-2xl font-light leading-[1.2] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl md:leading-[1.1] lg:text-6xl"
          >
            {t.hero.headline.split("\n").map((line, i) => (
              <span key={i} className={i > 0 ? "mt-1 block sm:mt-2" : "block"}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/88 sm:mt-5 sm:text-base md:text-lg md:leading-relaxed">
            {t.hero.subheadline}
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href={path("/shop")}
              className="flex min-h-[48px] items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-medium text-foreground shadow-lg shadow-black/20 transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:min-w-[200px] sm:py-3 sm:text-sm hover:bg-white"
            >
              {t.hero.shopNow}
            </Link>
            <Link
              href="#collections"
              className="flex min-h-[48px] items-center justify-center rounded-lg border border-white/60 bg-white/10 px-8 py-3.5 text-base font-medium text-white transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:min-w-[200px] sm:py-3 sm:text-sm hover:border-white hover:bg-white/20"
            >
              {t.hero.exploreCollection}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust — single compact band */}
      <section className="border-b border-neutral-200 bg-white py-8 sm:py-10" aria-labelledby="core-trust-heading">
        <h2 id="core-trust-heading" className="sr-only">
          {t.trust.title}
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:gap-4">
          {trustItems.map((item) => (
            <div
              key={item.mark}
              className="rounded-lg border border-neutral-200/90 bg-neutral-50/80 px-3 py-4 text-center sm:px-4"
            >
              <span className="font-heading text-lg font-light tabular-nums text-foreground/30">{item.mark}</span>
              <h3 className="font-heading mt-1 text-sm font-medium leading-snug text-foreground sm:text-base">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/65 sm:text-[13px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="collections" className="scroll-mt-20 bg-white px-4 py-12 sm:py-16 md:py-20" aria-labelledby="categories-heading">
        <h2
          id="categories-heading"
          className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl"
        >
          {t.categories.title}
        </h2>
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-4">
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
                className="hover-lift group relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300"
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

      {/* Unified shop highlights: featured + new + trending — one rhythm, no repeated full grids */}
      <section id="shop-highlights" className="bg-neutral-100 px-4 py-12 sm:py-16 md:py-20" aria-label={t.featured.title}>
        <div className="mx-auto max-w-6xl space-y-14 md:space-y-16">
          <div>
            <div className="text-center">
              <h2 className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">{t.featured.title}</h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-foreground/70 sm:text-base">{t.featured.subtitle}</p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {featuredItems.map((product) => {
                const fc = featuredCopy[copyLocale][product.id] ?? featuredCopy.en[product.id];
                if (!fc) return null;
                return (
                  <FeaturedProductCard key={product.id} product={product} teaser={fc.teaser} hoverHint={fc.hoverHint} />
                );
              })}
            </div>
          </div>

          <div className="border-t border-neutral-200/80 pt-14 md:pt-16">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">{t.flashPicks.title}</h2>
                <p className="mt-1 text-sm text-foreground/65 sm:text-base">{t.flashPicks.subtitle}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
              {newRow.map((product) => (
                <ProductCard key={`new-${product.id}`} product={product} showNewBadge />
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200/80 pt-14 md:pt-16">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">{t.bestSellers.title}</h2>
                <p className="mt-1 text-sm text-foreground/65 sm:text-base">{t.bestSellers.subtitle}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
              {bestSellers.map((product) => (
                <ProductCard key={`bs-${product.id}`} product={product} />
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200/80 pt-10 text-center">
            <Link
              href={path("/shop")}
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-foreground px-10 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-foreground/90"
            >
              {t.shop.title}
            </Link>
            <p className="mt-3 text-xs text-foreground/50">{t.shop.filterBy}</p>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="bg-white px-4 py-12 sm:py-16 md:py-20" aria-labelledby="brand-story-heading">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
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
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
              {t.brandStory.bodyShort.split("\n\n").map((block, i) => (
                <p key={i} className="whitespace-pre-line">
                  {block}
                </p>
              ))}
            </div>
            <Link
              href={path("/about")}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-foreground px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-foreground/90"
            >
              {t.brandStory.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Gifts — one row only */}
      <section className="border-y border-neutral-200 bg-neutral-50 px-4 py-12 sm:py-16" aria-labelledby="gifts-heading">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 id="gifts-heading" className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
              {t.romanticGifts.title}
            </h2>
            <p className="mt-2 text-sm text-foreground/65 sm:text-base">{t.romanticGifts.banner}</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
            {giftProducts.map((product) => (
              <ProductCard key={product.id} product={product} giftMode />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={path("/gift")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-neutral-300 bg-white px-8 py-3 text-sm font-medium text-foreground transition hover:border-neutral-400 hover:bg-neutral-50"
            >
              {t.romanticGifts.exploreGifts}
            </Link>
          </div>
        </div>
      </section>

      {/* Journal — two columns + third below on mobile, or 3 compact */}
      <section className="bg-white px-4 py-12 sm:py-16 md:py-20" aria-labelledby="journal-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="journal-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
            {t.blogSection.title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-foreground/70 sm:text-base">{t.blogSection.subtitle}</p>
          <p className="sr-only">{t.blogSection.metaSeoLine}</p>
          <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-3 md:gap-5">
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
                className="flex flex-col rounded-xl border border-neutral-200/90 bg-neutral-50/50 p-5 sm:p-6"
              >
                <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/45">{article.keyword}</p>
                <h3 className="font-heading mt-2 text-base font-medium leading-snug text-foreground sm:text-lg">{article.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70 line-clamp-4">{article.desc}</p>
                <Link
                  href={path(`/blog/${article.slug}`)}
                  className="mt-4 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {t.blogSection.readArticle}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={path("/blog")}
              className="inline-flex min-h-[44px] items-center justify-center text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              {t.blogSection.discoverMore} →
            </Link>
          </div>
        </div>
      </section>

      {/* Shop the Look */}
      <section className="border-t border-neutral-200 bg-neutral-100 px-4 py-12 sm:py-16 md:py-20" aria-labelledby="look-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="look-heading" className="font-heading text-xl font-light tracking-wide text-foreground sm:text-2xl md:text-3xl">
            {t.shopTheLook.title}
          </h2>
          <p className="mt-1.5 text-sm text-foreground/65 sm:mt-2 sm:text-base">{t.shopTheLook.subtitle}</p>
          <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-2 lg:gap-10 lg:items-start">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-200">
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
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {lookProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Link
                href={path(`/shop?category=${lookProducts[0]?.category ?? "lingerie-sets"}`)}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-white transition hover:bg-foreground/90"
              >
                {t.shopTheLook.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social strip — shorter, no endless scroll */}
      <section className="bg-white px-4 py-12 sm:py-16" aria-labelledby="instagram-heading">
        <h2 id="instagram-heading" className="font-heading text-center text-xl font-light tracking-wide text-foreground sm:text-2xl">
          {t.instagram.title}
        </h2>
        <p className="mt-1.5 text-center text-sm text-foreground/65">{t.instagram.handle}</p>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-2 sm:mt-10 sm:grid-cols-6 sm:gap-3">
          {SOCIAL_TILES.map((src, i) => (
            <a
              key={src}
              href="https://instagram.com/nilechic"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100"
            >
              <Image
                src={src}
                alt=""
                width={400}
                height={400}
                unoptimized
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <span className="sr-only">Instagram {i + 1}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
