"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { products } from "@/lib/data/products";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale, path } = useLocale();
  const productId = typeof params.id === "string" ? params.id : params.id?.[0];
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-light text-foreground">Product not found</h1>
        <Link href={path("/shop")} className="mt-4 inline-block text-[#C9A962] hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const name = locale === "ar" ? product.nameAr : product.name;
  const description = locale === "ar" ? product.descriptionAr : product.description;

  return (
    <div className="mx-auto max-w-7xl bg-[#FDF2F4] px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-foreground/70">
        <Link href={path("/shop")} className="transition-colors hover:text-[#C9A962]">
          {t.nav.shop}
        </Link>
        <span className="mx-2">/</span>
        <span>{name}</span>
      </nav>

      <article className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#FFFEF9] shadow-sm">
          <Image
            src={product.image}
            alt={name}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute top-4 start-4 flex flex-wrap gap-2">
            {product.tags?.includes("best-seller") && (
              <span className="rounded-full bg-[#C9A962] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
                {t.bestSellers.tag}
              </span>
            )}
            {product.tags?.includes("romantic-gift") && (
              <span className="rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm">
                {t.romanticGifts.tag}
              </span>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-[#FFFEF9] p-6 shadow-sm lg:p-8">
          <h1 className="font-heading text-3xl font-light tracking-wide text-foreground md:text-4xl">
            {name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-[#C9A962]">${product.price}</p>
          <p className="mt-4 text-foreground/80">{description}</p>

          <div className="mt-8">
            <label className="block text-sm font-medium text-foreground">
              {t.product.selectSize}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(product.sizes || t.product.sizes).map((size) => (
                <button
                  key={size}
                  className="min-w-[2.5rem] rounded-lg border border-foreground/30 px-3 py-2 text-sm font-medium transition-all duration-200 hover:border-[#C9A962] hover:bg-[#C9A962]/10 hover:text-[#C9A962]"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => router.push(path("/checkout"))}
            className="mt-8 w-full rounded-lg bg-foreground py-4 text-sm font-medium text-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md sm:w-auto sm:px-12"
          >
            {t.product.addToCart}
          </button>

          <div className="mt-8 space-y-4 text-sm text-foreground/70">
            <p className="flex items-center gap-2">
              <span className="text-[#C9A962]">✓</span>
              {t.product.codNotice}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#C9A962]">✓</span>
              {t.product.giftSuggestion}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#C9A962]">✓</span>
              {t.product.shippingInfo}
            </p>
          </div>

          <Link
            href={path("/gift")}
            className="mt-6 inline-block text-sm text-[#C9A962] hover:underline"
          >
            {t.romanticGifts.exploreGifts}
          </Link>
        </div>
      </article>
    </div>
  );
}
