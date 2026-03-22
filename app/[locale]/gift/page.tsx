"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data/products";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&h=960&fit=crop&q=80";

export default function GiftPage() {
  const { t, path } = useLocale();
  const giftProducts = products.filter((p) => p.tags?.includes("romantic-gift"));
  const displayProducts = giftProducts.length >= 4 ? giftProducts : products.filter((p) => p.featured).slice(0, 12);

  const occasions: { href: string; title: string; desc: string; accent: string }[] = [
    {
      href: path("/shop?tag=romantic-gift"),
      title: t.gift.forHer,
      desc: t.gift.forHerDesc,
      accent: "I",
    },
    {
      href: path("/shop?category=sleepwear"),
      title: t.gift.forYourself,
      desc: t.gift.forSelfDesc,
      accent: "II",
    },
    {
      href: path("/shop?category=bridal"),
      title: t.gift.anniversary,
      desc: t.gift.anniversaryDesc,
      accent: "III",
    },
    {
      href: path("/shop?category=lingerie-sets"),
      title: t.gift.birthday,
      desc: t.gift.birthdayDesc,
      accent: "IV",
    },
  ];

  const trust = [
    { body: t.gift.trustDiscreet },
    { body: t.gift.trustSize },
    { body: t.gift.trustCare },
  ];

  return (
    <div className="bg-neutral-50">
      {/* Hero — editorial band + image */}
      <section className="relative overflow-hidden" aria-labelledby="gift-hero-heading">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            unoptimized
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C2C2C]/88 via-[#2C2C2C]/55 to-[#2C2C2C]/25" aria-hidden />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-900">{t.gift.heroSubtitle}</p>
            <h1 id="gift-hero-heading" className="font-heading mt-4 text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.15] tracking-wide text-white">
              {t.gift.heroTitle}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/88 sm:text-lg">{t.gift.heroLead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={path("/shop?tag=romantic-gift")}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-white px-8 py-3.5 text-sm font-medium text-foreground shadow-lg transition-all hover:bg-white hover:shadow-xl"
              >
                {t.gift.ctaShopAll}
              </Link>
              <Link
                href={path("/blog/anniversary-gifting-lingerie")}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/50 px-8 py-3.5 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10"
              >
                {t.gift.ctaJournal}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions — modular grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="gift-occasions-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="gift-occasions-heading" className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl">
            {t.gift.occasionIntro}
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {occasions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_12px_40px_rgba(201,169,98,0.12)]"
            >
              <span className="font-heading text-xs font-medium tabular-nums text-neutral-900/80">{item.accent}</span>
              <h3 className="font-heading mt-3 text-lg font-medium text-foreground transition-colors group-hover:text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">{item.desc}</p>
              <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-neutral-900">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust — slim band */}
      <section className="border-y border-neutral-200/60 bg-white/90" aria-labelledby="gift-trust-heading">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 id="gift-trust-heading" className="text-center font-heading text-lg font-light text-foreground sm:text-xl">
            {t.gift.trustTitle}
          </h2>
          <ul className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-3 sm:gap-8">
            {trust.map((item, i) => (
              <li key={i} className="text-center">
                <p className="text-sm leading-relaxed text-foreground/80 sm:text-[0.9375rem]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Curated products */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="gift-products-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="gift-products-heading" className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl">
              {t.gift.curatedTitle}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/72 sm:text-base">{t.gift.curatedSubtitle}</p>
          </div>
          <Link
            href={path("/shop?tag=romantic-gift")}
            className="mt-2 shrink-0 text-sm font-medium text-neutral-900 hover:underline sm:mt-0"
          >
            {t.gift.ctaShopAll} →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} giftMode />
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={path("/shop")}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-foreground px-10 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-foreground/90 sm:w-auto"
          >
            {t.gift.ctaExplore}
          </Link>
        </div>
      </section>
    </div>
  );
}
