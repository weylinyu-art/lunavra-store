"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data/products";
import { getProductSchema } from "@/lib/seo/structured-data";
import SizeGuideModal from "@/components/SizeGuideModal";
import ShareButtons from "@/components/ShareButtons";
import ProductReviews from "@/components/ProductReviews";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale, path } = useLocale();
  const { addItem } = useCart();
  const productId = typeof params.id === "string" ? params.id : params.id?.[0];
  const product = products.find((p) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState(0);
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

  return (
    <div className="mx-auto max-w-7xl bg-[#FAF8F5] px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-foreground/70">
        <Link href={path("/")} className="transition-colors hover:text-[#C9A962]">
          {t.nav.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href={path("/shop")} className="transition-colors hover:text-[#C9A962]">
          {t.nav.shop}
        </Link>
        <span className="mx-2">/</span>
        <span>{name}</span>
      </nav>

      <article className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Image gallery */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-col sm:overflow-visible">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(i)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20 ${
                  selectedImage === i ? "border-[#C9A962]" : "border-transparent hover:border-foreground/20"
                }`}
              >
                <Image
                  src={src}
                  alt={`${name} ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
          <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-xl bg-[#FFFEF9] shadow-sm">
            <Image
              src={images[selectedImage]}
              alt={name}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute top-3 start-3 flex flex-wrap gap-2">
              {product.tags?.includes("new") && (
                <span className="rounded-full bg-[#E8C4C4] px-3 py-1 text-xs font-medium text-foreground">✨ New</span>
              )}
              {product.tags?.includes("best-seller") && (
                <span className="rounded-full bg-[#C9A962] px-3 py-1 text-xs font-medium text-white">🔥 Best Seller</span>
              )}
              {product.tags?.includes("romantic-gift") && (
                <span className="rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-white">{t.romanticGifts.tag}</span>
              )}
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <h1 className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl">
            {name}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-[#C9A962]">${product.price}</p>
          <p className="mt-4 text-foreground/80 leading-relaxed">{description}</p>

          {/* Size selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">{t.product.selectSize}</label>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs text-[#C9A962] hover:underline"
              >
                {t.product.sizeGuide}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(product.sizes || t.product.sizes).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[2.75rem] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "border-[#C9A962] bg-[#C9A962]/15 text-[#C9A962]"
                      : "border-foreground/25 hover:border-[#C9A962] hover:bg-[#C9A962]/5"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`mt-6 w-full rounded-lg bg-foreground py-4 text-sm font-medium text-[#FFFEF9] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto sm:px-12 ${
              addToCartAnimating ? "scale-95 animate-add-to-cart" : ""
            }`}
          >
            {addToCartAnimating ? t.product.addedToCart : t.product.addToCart}
          </button>

          {/* Trust badges */}
          <div className="mt-6 space-y-3 rounded-lg bg-[#FFFEF9] p-4 text-sm">
            <p className="flex items-center gap-2 text-foreground/80">
              <span className="text-[#C9A962]">✓</span>
              {t.product.codNotice}
            </p>
            <p className="flex items-center gap-2 text-foreground/80">
              <span className="text-[#C9A962]">✓</span>
              {t.product.shippingInfo}
            </p>
            <p className="flex items-center gap-2 text-foreground/80">
              <span className="text-[#C9A962]">✓</span>
              {t.product.giftSuggestion}
            </p>
          </div>

          <Link href={path("/gift")} className="mt-4 text-sm text-[#C9A962] hover:underline">
            {t.romanticGifts.exploreGifts}
          </Link>

          {/* Share */}
          <div className="mt-6">
            <ShareButtons url={shareUrl} title={shareTitle} />
          </div>

          {/* Product details accordion-style */}
          <div className="mt-8 border-t border-rose-200/50 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.product.details}
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-foreground/70">{t.product.material}</dt>
                <dd className="mt-0.5 text-foreground/80">{material}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground/70">{t.product.care}</dt>
                <dd className="mt-0.5 text-foreground/80">{care}</dd>
              </div>
            </dl>
          </div>

          {/* Reviews */}
          <ProductReviews productId={product.id} />
        </div>
      </article>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
