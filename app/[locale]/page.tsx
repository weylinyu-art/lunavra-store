"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data/products";

export default function HomePage() {
  const { t, path } = useLocale();
  const bestSellers = products.filter((p) => p.featured);

  const trustItems = [
    { title: t.trust.discreet, desc: t.trust.discreetDesc, icon: "📦" },
    { title: t.trust.cod, desc: t.trust.codDesc, icon: "💵" },
    { title: t.trust.design, desc: t.trust.designDesc, icon: "✨" },
    { title: t.trust.fabric, desc: t.trust.fabricDesc, icon: "🌿" },
  ];

  const instagramImages = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    src: `https://placehold.co/300x300/F8E8E8/D4A5A5?text=${i + 1}`,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center bg-gradient-to-b from-[#FAE8EC] via-[#FDF2F4] to-[#FFFEF9] px-4 py-20 text-center">
        <h1 className="font-heading max-w-3xl text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl">
          {t.hero.headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-foreground/80 md:text-xl">
          {t.hero.subheadline}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={path("/shop")}
            className="rounded-lg bg-foreground px-8 py-3.5 text-sm font-medium text-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md"
          >
            {t.hero.shopNow}
          </Link>
          <Link
            href={path("/gift")}
            className="rounded-lg border border-[#C9A962]/50 bg-transparent px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A962] hover:bg-[#C9A962]/5 hover:shadow-sm"
          >
            {t.hero.giftForWife}
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#FDF2F4] px-4 py-16 md:py-24" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {t.categories.title}
        </h2>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
          {[
            { slug: "lingerie-sets", name: t.categories.lingerieSets },
            { slug: "bras", name: t.categories.bras },
            { slug: "sleepwear", name: t.categories.sleepwear },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={path(`/shop?category=${cat.slug}`)}
              className="hover-lift flex aspect-square flex-col items-center justify-center rounded-lg bg-[#FFFEF9] p-4 shadow-sm transition-all duration-300"
            >
              <span className="text-center font-medium text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-gradient-to-b from-[#FFFEF9] to-[#FAF8F5] px-4 py-16 md:py-24" aria-labelledby="bestsellers-heading">
        <h2 id="bestsellers-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {t.bestSellers.title}
        </h2>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={path("/shop")}
            className="inline-block rounded-lg border border-[#C9A962]/50 px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A962] hover:bg-[#C9A962]/5"
          >
            {t.hero.shopNow}
          </Link>
        </div>
      </section>

      {/* Romantic Gifts */}
      <section className="bg-[#FDF2F4] px-4 py-16 md:py-24" aria-labelledby="gifts-heading">
        <div className="mx-auto max-w-3xl rounded-xl bg-[#FFFEF9] p-8 text-center shadow-sm md:p-12">
          <h2 id="gifts-heading" className="font-heading text-2xl font-light tracking-wide text-foreground md:text-3xl">
            {t.romanticGifts.title}
          </h2>
          <p className="mt-4 text-foreground/80">{t.romanticGifts.subtitle}</p>
          <p className="mt-4 text-foreground/80/90">{t.romanticGifts.message}</p>
          <Link
            href={path("/gift")}
            className="mt-8 inline-block rounded-lg bg-foreground px-8 py-3.5 text-sm font-medium text-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md"
          >
            {t.romanticGifts.exploreGifts}
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-[#FAF8F5] px-4 py-16 md:py-24" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {t.trust.title}
        </h2>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="hover-lift rounded-xl bg-[#FFFEF9] p-6 text-center shadow-sm transition-all duration-300"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-heading mt-3 font-medium text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-foreground/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Discreet Packaging */}
      <section className="bg-[#FDF2F4] px-4 py-16 md:py-24" aria-labelledby="discreet-heading">
        <div className="mx-auto max-w-2xl rounded-xl bg-[#FFFEF9] p-8 text-center shadow-sm md:p-10">
          <h2 id="discreet-heading" className="font-heading text-2xl font-light tracking-wide text-foreground md:text-3xl">
            {t.discreetSection.title}
          </h2>
          <p className="mt-6 leading-relaxed text-foreground/80">
            {t.discreetSection.description}
          </p>
        </div>
      </section>

      {/* Cash on Delivery */}
      <section className="bg-[#FAF8F5] px-4 py-16 md:py-24" aria-labelledby="cod-heading">
        <div className="mx-auto max-w-2xl rounded-xl bg-[#FFFEF9] p-8 text-center shadow-sm md:p-10">
          <h2 id="cod-heading" className="font-heading text-2xl font-light tracking-wide text-foreground md:text-3xl">
            {t.codSection.title}
          </h2>
          <p className="mt-6 leading-relaxed text-foreground/80">
            {t.codSection.description}
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#FDF2F4] px-4 py-16 md:py-24" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {t.reviews.title}
        </h2>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {[t.reviews.review1, t.reviews.review2, t.reviews.review3].map((review, i) => (
            <blockquote
              key={i}
              className="hover-lift rounded-xl bg-[#FFFEF9] p-6 shadow-sm transition-all duration-300"
            >
              <p className="text-foreground/90">"{review.text}"</p>
              <cite className="mt-4 block text-sm font-medium not-italic text-[#C9A962]">
                — {review.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-[#FAF8F5] px-4 py-16 md:py-24" aria-labelledby="instagram-heading">
        <h2 id="instagram-heading" className="font-heading text-center text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {t.instagram.title}
        </h2>
        <p className="mt-2 text-center text-foreground/80">{t.instagram.handle}</p>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3">
          {instagramImages.map((img) => (
            <a
              key={img.id}
              href="https://instagram.com/lunavra.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="group aspect-square overflow-hidden rounded-lg shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={img.src}
                alt={`Instagram ${img.id}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
