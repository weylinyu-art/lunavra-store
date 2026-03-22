"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data/products";
import { getProductSchema } from "@/lib/seo/structured-data";
import SizeGuideModal from "@/components/SizeGuideModal";
import ShareButtons from "@/components/ShareButtons";
import ProductReviews from "@/components/ProductReviews";
import ProductCard from "@/components/ProductCard";
import FulfillmentBadge from "@/components/FulfillmentBadge";
import ProductPDPGallery from "@/components/ProductPDPGallery";
import { getFulfillmentOrigin } from "@/lib/data/products";

function AccordionChevron() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-200 group-open:rotate-180"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale, path } = useLocale();
  const { addItem } = useCart();
  const productId = typeof params.id === "string" ? params.id : params.id?.[0];
  const product = products.find((p) => p.id === productId);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addToCartAnimating, setAddToCartAnimating] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAddToCartAnimating(true);
    addItem(1);
    setTimeout(() => setAddToCartAnimating(false), 400);
    setTimeout(() => router.push(path("/checkout")), 350);
  };

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
  const material = product.material ? (locale === "ar" ? product.materialAr : product.material) : t.product.defaultMaterial;
  const care = product.care ? (locale === "ar" ? product.careAr : product.care) : t.product.defaultCare;
  const images = product.images?.length ? product.images : [product.image];
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://nilechic.com${path(`/product/${product.id}`)}`;
  const shareTitle = name;

  const productSchema = getProductSchema(product, locale);
  const notes = product.imageNotes;
  const altFor = (i: number) => {
    if (notes?.[i]) return `${name} — ${notes[i]}`;
    const slot =
      i === 0 ? t.product.imageAltFront : i === 1 ? t.product.imageAltBack : t.product.imageAltDetail;
    return `${name} — ${slot}`;
  };
  const related =
    product.relatedIds?.map((id) => products.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p)) ??
    [];

  const fulfillment = getFulfillmentOrigin(product);
  const isLocalFulfillment = fulfillment === "ksa-local";
  const fulfillmentPill = isLocalFulfillment ? t.product.fulfillment.ksaLocalBadge : t.product.fulfillment.intlBadge;
  const fulfillmentEta = isLocalFulfillment ? t.product.fulfillment.ksaLocalEta : t.product.fulfillment.intlEta;

  const galleryOverlay = (
    <>
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm sm:text-xs ${
          isLocalFulfillment ? "bg-emerald-900/92" : "bg-foreground/88"
        }`}
      >
        {fulfillmentPill}
      </span>
      {product.tags?.includes("new") && (
        <span className="rounded-full bg-[#E8C4C4] px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm sm:text-xs">
          ✨ New
        </span>
      )}
      {product.tags?.includes("best-seller") && (
        <span className="rounded-full bg-[#C9A962] px-2.5 py-1 text-[11px] font-medium text-white shadow-sm sm:text-xs">
          🔥 Best Seller
        </span>
      )}
      {product.tags?.includes("romantic-gift") && (
        <span className="rounded-full bg-foreground/80 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm sm:text-xs">
          {t.romanticGifts.tag}
        </span>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#eceae6] pb-28 lg:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="mx-auto max-w-6xl px-0 sm:px-4 lg:px-6">
        <nav className="mb-0 hidden px-4 py-4 text-sm text-foreground/65 sm:flex sm:px-0">
          <Link href={path("/")} className="transition-colors hover:text-[#C9A962]">
            {t.nav.home}
          </Link>
          <span className="mx-2">/</span>
          <Link href={path("/shop")} className="transition-colors hover:text-[#C9A962]">
            {t.nav.shop}
          </Link>
          <span className="mx-2">/</span>
          <span className="line-clamp-1 text-foreground/85">{name}</span>
        </nav>

        <article className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:gap-10 lg:items-start xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="lg:pt-0">
            <ProductPDPGallery images={images} altFor={altFor} overlay={galleryOverlay} />
            {notes && notes.length > 0 && (
              <ul className="sr-only px-4 lg:px-0">
                {notes.map((note, i) => (
                  <li key={i}>
                    {t.product.imageAltFront} {i + 1}: {note}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Buy box — Shein-style dense right column */}
          <div className="mt-0 border-t border-black/[0.06] bg-[#FFFEF9] px-4 py-6 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] sm:mt-0 sm:rounded-2xl sm:border sm:border-black/[0.06] sm:shadow-md lg:mt-0 lg:max-w-none lg:self-start lg:border lg:py-8">
            <h1 className="font-heading text-xl font-medium leading-snug tracking-wide text-foreground sm:text-2xl">
              {name}
            </h1>

            <div className="mt-3 flex flex-wrap items-end gap-2">
              <span className="text-2xl font-semibold tabular-nums text-[#C9A962] sm:text-3xl">${product.price}</span>
              <span className="text-xs text-foreground/50">USD</span>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-foreground/[0.04] px-3 py-2.5 text-sm text-foreground/80">
              <span
                className={`inline-block h-2 w-2 shrink-0 rounded-full ${isLocalFulfillment ? "bg-emerald-600" : "bg-foreground/50"}`}
                aria-hidden
              />
              <span className="leading-snug">{fulfillmentEta}</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 border-y border-dashed border-foreground/10 py-4 text-center text-[11px] leading-tight text-foreground/75 sm:text-xs">
              <div className="flex flex-col items-center gap-1 border-e border-foreground/10 pe-2">
                <span className="text-base" aria-hidden>
                  ✓
                </span>
                <span>{t.product.codNotice}</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-e border-foreground/10 px-1">
                <span className="text-base" aria-hidden>
                  ✈
                </span>
                <span>{t.product.shippingInfo}</span>
              </div>
              <div className="flex flex-col items-center gap-1 ps-1">
                <span className="text-base" aria-hidden>
                  🎁
                </span>
                <span>{t.product.giftSuggestion}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="size-row">
                  {t.product.selectSize}
                </label>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs font-medium text-[#C9A962] underline-offset-2 hover:underline"
                >
                  {t.product.sizeGuide}
                </button>
              </div>
              <div id="size-row" className="mt-2.5 flex flex-wrap gap-2">
                {(product.sizes || t.product.sizes).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex min-h-[44px] min-w-[2.75rem] items-center justify-center rounded-lg border px-3.5 py-2 text-sm font-medium transition-all sm:min-h-0 ${
                      selectedSize === size
                        ? "border-[#C9A962] bg-[#C9A962]/12 text-[#9a7b32]"
                        : "border-foreground/15 bg-white hover:border-[#C9A962]/60"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-foreground/55">{t.product.sizeReminder}</p>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`mt-6 hidden min-h-[50px] w-full items-center justify-center rounded-xl bg-foreground py-3.5 text-base font-semibold text-[#FFFEF9] shadow-sm transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 lg:flex ${
                addToCartAnimating ? "scale-[0.98]" : "hover:bg-foreground/92"
              }`}
            >
              {addToCartAnimating ? t.product.addedToCart : t.product.addToCart}
            </button>

            <Link
              href={path("/gift")}
              className="mt-4 hidden text-center text-sm text-[#C9A962] underline-offset-2 hover:underline lg:block"
            >
              {t.romanticGifts.exploreGifts}
            </Link>

            <div className="mt-6 border-t border-foreground/10 pt-5">
              <ShareButtons url={shareUrl} title={shareTitle} />
            </div>

            <div className="mt-2 divide-y divide-foreground/10">
              <details className="group" open>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  <span>{t.product.pdpSectionDescription}</span>
                  <AccordionChevron />
                </summary>
                <div className="pb-4 text-sm leading-relaxed text-foreground/75">{description}</div>
              </details>

              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  <span>{t.product.pdpSectionDelivery}</span>
                  <AccordionChevron />
                </summary>
                <div className="pb-4">
                  <FulfillmentBadge product={product} placement="detail" />
                </div>
              </details>

              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  <span>{t.product.pdpSectionFabric}</span>
                  <AccordionChevron />
                </summary>
                <div className="pb-4 space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground/70">{t.product.material}</p>
                    <p className="mt-1 leading-relaxed text-foreground/75">{material}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground/70">{t.product.care}</p>
                    <p className="mt-1 leading-relaxed text-foreground/75">{care}</p>
                  </div>
                </div>
              </details>
            </div>

            <div className="mt-6 lg:mt-8">
              <ProductReviews productId={product.id} />
            </div>

            <Link
              href={path("/gift")}
              className="mt-6 block text-center text-sm text-[#C9A962] underline-offset-2 hover:underline lg:hidden"
            >
              {t.romanticGifts.exploreGifts}
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-10 px-4 pb-8 sm:px-0" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-heading text-lg font-medium text-foreground sm:text-xl">
              {t.product.relatedTitle}
            </h2>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:gap-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
              {related.map((p) => (
                <div key={p.id} className="w-[46vw] max-w-[12.5rem] shrink-0 sm:w-44 lg:max-w-none lg:w-auto">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky buy bar — Shein-style */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[#FFFEF9]/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-lg items-stretch gap-3 px-4 pt-3">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <span className="line-clamp-1 text-xs text-foreground/55">{name}</span>
            <span className="text-lg font-semibold tabular-nums text-[#C9A962]">${product.price}</span>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            title={!selectedSize ? t.product.selectSizeFirst : undefined}
            className={`flex min-h-[48px] min-w-[10rem] flex-[1.2] items-center justify-center rounded-xl bg-foreground px-4 text-sm font-semibold text-[#FFFEF9] shadow-sm transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 ${
              addToCartAnimating ? "scale-[0.98]" : ""
            }`}
          >
            {addToCartAnimating ? t.product.addedToCart : t.product.addToCart}
          </button>
        </div>
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
